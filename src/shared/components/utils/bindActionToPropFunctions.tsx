import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { isFunction, entries, reduce, filter } from "lodash/fp";
import hoistStatics from "hoist-non-react-statics";
import { MiddlewareAPI } from "redux";
// @ts-ignore
import { ReactReduxContext } from "react-redux";

const getDisplayName = (component: React.ComponentType<any>) =>
  component.displayName || component.name;

const isAction = (obj: any) =>
  obj.type && ["string", "symbol"].includes(typeof obj.type);

const decorateFunction = (
  decorator: any,
  props: any,
  { dispatch, getState }: MiddlewareAPI,
) => (func: Function) => (...args: any) => {
  const ret = func(...args);
  const decoratorRet = !isFunction(decorator)
    ? decorator
    : decorator(args, props, getState());
  // If prop function is a higher-order function,
  // apply this decorateFunction until the target function reaches to a simple function.
  if (isFunction(ret)) {
    return decorateFunction(decoratorRet, props, { dispatch, getState })(ret);
  }
  if (decoratorRet && isAction(decoratorRet)) {
    dispatch(decoratorRet);
  }
  return ret;
};

const getPropFunctionDecorator = (decorators: Array<Function>) => (
  props: any,
  { dispatch, getState }: MiddlewareAPI,
) =>
  reduce(
    (acc: { [key: string]: Function }, [key, mapFunc]: [string, Function]) => {
      const func = props[key];
      if (!isFunction(func)) {
        return acc;
      }
      acc[key] = (...args: any) =>
        decorateFunction(mapFunc, props, { dispatch, getState })(func)(...args);
      return acc;
    },
  )({} as { [key: string]: Function })(decorators);

/* eslint-disable react/prefer-stateless-function */
export default (mapPropsToActions = {}) => (
  WrappedComponent: React.ComponentType<any>,
) => {
  const getDecoratedPropFunctions: any = compose(
    getPropFunctionDecorator,
    filter(([_, v]: [string, string]) => isFunction(v)),
    entries,
  )(mapPropsToActions as any);

  class WrapperComponent extends Component {
    render() {
      return (
        <ReactReduxContext.Consumer>
          {({ store }: any) => {
            return (
              <WrappedComponent
                {...{
                  ...this.props,
                  ...getDecoratedPropFunctions(this.props, store),
                }}
              />
            );
          }}
        </ReactReduxContext.Consumer>
      );
    }
  }

  (WrapperComponent as any).displayName = `BindActionToPropFunctions(${getDisplayName(
    WrappedComponent,
  )})`;
  (WrapperComponent as any).contextTypes = {
    store: PropTypes.any.isRequired,
  };

  return hoistStatics(WrapperComponent, WrappedComponent);
};
