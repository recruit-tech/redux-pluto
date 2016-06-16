import React, { Component, PropTypes, cloneElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default function deferLoader(loader) {
  return (WrappedComponent) => {
    class WrapperComponent extends Component {
      componentDidMount() {
        const { store } = this.context;
        loader(this.props, store);
      }

      componentWillReceiveProps(nextProps) {
        const { store } = this.context;
        loader(nextProps, store);
      }

      render() {
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }

    WrapperComponent.displayName = `deferLoader(${getDisplayName(WrappedComponent)})`;
    WrapperComponent.contextTypes = {
      store: PropTypes.object.isRequired,
    };
    return hoistStatics(WrapperComponent, WrappedComponent);
  };
}

function getDisplayName(Component) {
  return Component.displayName || Component.name;
}
