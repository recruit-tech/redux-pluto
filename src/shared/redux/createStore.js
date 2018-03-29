import { routerMiddleware } from "react-router-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { BEGIN_ASYNC_LOAD, END_ASYNC_LOAD } from "redux-async-loader";
import pageScopeMiddleware from "redux-page-scope";
import steps from "redux-effects-steps";
import cookie from "redux-effects-universal-cookie";
import fetchr from "redux-effects-fetchr";
import fetchrCache from "redux-effects-fetchr-cache";
import { analyticsMiddleware } from "react-redux-analytics";
import { siteCatalystMiddleware } from "react-redux-analytics-sitecatalyst";
import { filter } from "lodash/fp";
import apiError from "./middleware/apiErrorMiddleware";
import auth from "./middleware/authMiddleware";
import loading from "./middleware/loadingMiddleware";
import uploader from "./middleware/uploader";
import reducer from "./modules/reducer";

export default function(initialState, options = {}) {
  const middlewares = filter(Boolean)([
    steps,
    auth(),
    cookie(...options.cookie),
    options.fetchrCache ? fetchrCache(options.fetchrCache) : null,
    apiError(),
    options.csrfToken ? uploader(options.csrfToken) : null,
    fetchr(options.fetchr),
    pageScopeMiddleware(),
    loading({ start: BEGIN_ASYNC_LOAD, stop: END_ASYNC_LOAD, delay: 500 }),
    routerMiddleware(options.history),
    options.analytics ? analyticsMiddleware({ ...options.analytics }) : null,
    options.siteCatalyst
      ? siteCatalystMiddleware({
          ...options.siteCatalyst,
          debug: __DEVELOPMENT__
        })
      : null,
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
