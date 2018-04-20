import { routerMiddleware } from "react-router-redux";
import { createStore, compose, applyMiddleware } from "redux";
import pageScopeMiddleware from "redux-page-scope";
import steps from "redux-effects-steps";
import cookie from "redux-effects-universal-cookie";
import fetchr from "redux-effects-fetchr";
import fetchrCache from "redux-effects-fetchr-cache";
import { filter } from "lodash/fp";
import reducer from "./modules/reducer";

export default function(initialState, options = {}) {
  const middlewares = filter(Boolean)([
    steps,
    cookie(...options.cookie),
    options.fetchrCache ? fetchrCache(options.fetchrCache) : null,
    fetchr(options.fetchr),
    pageScopeMiddleware(),
    routerMiddleware(options.history),
    options.logger
  ]);

  const devTools = [];
  if (__DEVELOPMENT__) {
    if (options.devTools) {
      // eslint-disable-next-line global-require
      const DevTools = require("../components/utils/DevTools").default;
      devTools.push(
        window.devToolsExtension
          ? window.devToolsExtension()
          : DevTools.instrument()
      );
    }
  }

  const enhancer = compose(applyMiddleware(...middlewares), ...devTools);

  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./modules/reducer", () => {
      // eslint-disable-next-line global-require
      const nextReducer = require("./modules/reducer").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
