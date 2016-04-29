import React, { Component, PropTypes, cloneElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default function deferLoader(loader) {
  return (WrappedComponent) => {
    class WrapperComponent extends Component {
      static contextTypes = {
        store: PropTypes.object.isRequired,
      };

      static displayName = `deferLoader(${getDisplayName(WrappedComponent)})`;

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

    return hoistStatics(WrapperComponent, WrappedComponent);
  };
}

function getDisplayName(Component) {
  return Component.displayName || Component.name;
}
