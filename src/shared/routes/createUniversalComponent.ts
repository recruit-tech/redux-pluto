import hoistNonReactStatics from "hoist-non-react-statics";
import universal from "react-universal-component";

export default function createUniversalComponent(
  component: any,
  resolve: Function,
  chunkName: string,
) {
  return Promise.all([
    component(),
    universal(component, { resolve, chunkName, loading: "loading..." } as any),
  ]).then(([sourceComponent, targetComponent]) =>
    hoistNonReactStatics(targetComponent, sourceComponent.default),
  );
}
