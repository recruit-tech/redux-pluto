import hoistNonReactStatics from "hoist-non-react-statics";
import universal from "react-universal-component";
import debugFactory from "debug";

const debug = debugFactory("app:shared:routes:createUniversalComponent");

const cssPromiseCache = {};

export default function createUniversalComponent(
  component,
  resolve,
  chunkName,
) {
  return Promise.all([
    component(),
    universal(component, { resolve, chunkName, loading: "loading..." }),
  ]).then(([sourceComponent, targetComponent]) =>
    hoistNonReactStatics(targetComponent, sourceComponent.default),
  );
}

