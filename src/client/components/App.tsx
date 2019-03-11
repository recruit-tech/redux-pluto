import React from "react";
import { Provider } from "react-redux";
import Router from "react-router/lib/Router";
import applyRouterMiddleware from "react-router/lib/applyRouterMiddleware";
import { useScroll } from "react-router-scroll";
import { useAsyncLoader } from "redux-async-loader";
import { Store } from "redux";
import { RootState } from "../../shared/redux/modules/reducer";

type Props = {
  store: Store<RootState>;
};

export default function App({ store, ...renderProps }: Props) {
  const RenderWithMiddleware: any = applyRouterMiddleware(
    useAsyncLoader(),
    useScroll((_prevRouterProps: any, { location, routes }: any) => {
      if (
        routes.some(
          (route: any) =>
            route.ignoreScrollBehavior && route.ignoreScrollBehavior(location),
        )
      ) {
        return false;
      }

      return true;
    }),
  );

  if (__DEVELOPMENT__) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { AppContainer } = require("react-hot-loader");
    return (
      <AppContainer>
        <Provider store={store} key="provider">
          <Router
            {...renderProps}
            render={(props: any) => <RenderWithMiddleware {...props} />}
          />
        </Provider>
      </AppContainer>
    );
  }
  return (
    <Provider store={store} key="provider">
      <Router
        {...renderProps}
        render={(props: any) => <RenderWithMiddleware {...props} />}
      />
    </Provider>
  );
}
