import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { isFunction, entries, reduce, filter } from "lodash/fp";
import hoistStatics from "hoist-non-react-statics";

const { isRequired } = PropTypes.object;

const getDisplayName = component => component.displayName || component.name;

const isAction = obj =>
  obj.type && ["string", "symbol"].includes(typeof obj.type);

const decorateFunction = (decorator, props, { dispatch, getState }) => func => (
  ...args
) => {
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

const getPropFunctionDecorator = decorators => (
  props,
  { dispatch, getState },
) =>
  reduce((acc, [key, mapFunc]) => {
    const func = props[key];
    if (!isFunction(func)) {
      return acc;
    }
    acc[key] = (...args) =>
      decorateFunction(mapFunc, props, { dispatch, getState })(func)(...args);
    return acc;
  })({})(decorators);

/* eslint-disable react/prefer-stateless-function */
export default (mapPropsToActions = {}) => WrappedComponent => {
  const getDecoratedPropFunctions = compose(
    getPropFunctionDecorator,
    filter(([_, v]) => isFunction(v)),
    entries,
  )(mapPropsToActions);

  class WrapperComponent extends Component {
    render() {
      const props = {
        ...this.props,
        ...getDecoratedPropFunctions(this.props, this.context.store),
      };
      return <WrappedComponent {...props} />;
    }
  }

  WrapperComponent.displayName = `BindActionToPropFunctions(${getDisplayName(
    WrappedComponent,
  )})`;
  WrapperComponent.contextTypes = {
    store: isRequired,
  };

  return hoistStatics(WrapperComponent, WrappedComponent);
};
