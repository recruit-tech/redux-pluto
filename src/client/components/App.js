/* @flow */
import React from "react";
import { Provider } from "react-redux";
import Router from "react-router/lib/Router";
import applyRouterMiddleware from "react-router/lib/applyRouterMiddleware";
import { useScroll } from "react-router-scroll";
import { useAsyncLoader } from "redux-async-loader";
import { AppContainer } from "react-hot-loader";

export default function App({ store, ...renderProps }: any) {
  const RenderWithMiddleware = applyRouterMiddleware(
    useAsyncLoader(),
    useScroll((prevRouterProps, { location, routes }) => {
      if (
        routes.some(route => route.ignoreScrollBehavior && route.ignoreScrollBehavior(location))
      ) {
        return false;
      }

      return true;
    })
  );

  return (
    <AppContainer>
      <Provider store={store} key="provider">
        <Router {...renderProps} render={props => <RenderWithMiddleware {...props} />} />
      </Provider>
    </AppContainer>
  );
}
