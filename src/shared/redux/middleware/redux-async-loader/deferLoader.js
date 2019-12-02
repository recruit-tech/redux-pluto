import React, {
  Component,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { ReactReduxContext } from "react-redux";
import hoistStatics from "hoist-non-react-statics";

export default function deferLoader(loader) {
  return WrappedComponent => {
    function WrapperComponent(props) {
      const { store } = useContext(ReactReduxContext);

      useLayoutEffect(() => {
        loader(props, store);
      });

      return <WrappedComponent {...props} />;
    }

    WrapperComponent.displayName = `deferLoader(${getDisplayName(
      WrappedComponent,
    )})`;

    return hoistStatics(WrapperComponent, WrappedComponent);
  };
}

function getDisplayName(component) {
  return component.displayName || component.name;
}
