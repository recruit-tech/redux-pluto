import React, { Component } from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";
import { Context } from "./context";

export default function deferLoader(loader) {
  return WrappedComponent => {
    class WrapperComponent extends Component {
      componentDidMount() {
        const { store } = this.props.ctx;
        loader(this.props, store);
      }

      componentWillReceiveProps(nextProps) {
        const { store } = this.props.ctx;
        loader(nextProps, store);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    WrapperComponent.displayName = `deferLoader(${getDisplayName(
      WrappedComponent,
    )})`;

    const WrapperComponentWithContext = () => (
      <Context.Consumer>
        {({ store }) => <WrapperComponent ctx={{ store }} />}
      </Context.Consumer>
    );

    return hoistStatics(WrapperComponentWithContext, WrappedComponent);
  };
}

function getDisplayName(component) {
  return component.displayName || component.name;
}
