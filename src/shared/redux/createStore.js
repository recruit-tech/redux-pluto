import { routerMiddleware } from "react-router-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { BEGIN_ASYNC_LOAD, END_ASYNC_LOAD } from "redux-async-loader";
import pageScopeMiddleware from "redux-page-scope";
import steps from "redux-effects-steps";
import cookie from "redux-effects-universal-cookie";
import fetchr from "redux-effects-fetchr";
import uploader from "redux-effects-formdata-uploader";
import fetchrCache from "redux-effects-fetchr-cache";
import { analyticsMiddleware } from "react-redux-analytics";
import { siteCatalystMiddleware } from "react-redux-analytics-sitecatalyst";
import { filter } from "lodash/fp";
import apiError from "./middleware/apiErrorMiddleware";
import auth from "./middleware/authMiddleware";
import loading from "./middleware/loadingMiddleware";
import reducer from "./modules/reducer";
import mockLoggingMiddleware from "./middleware/mockLoggingMiddleware";

export default function(initialState, options = {}) {
  const middlewares = filter(Boolean)([
    steps,
    auth(),
    cookie(...options.cookie),
    options.fetchrCache ? fetchrCache(options.fetchrCache) : null,
    apiError(),
    options.csrfToken ? uploader({ csrfToken: options.csrfToken }) : null,
    options.mockBuild ? mockLoggingMiddleware(options.mockBuild.axios) : null,
    fetchr(options.fetchr),
    pageScopeMiddleware(),
    loading({ start: BEGIN_ASYNC_LOAD, stop: END_ASYNC_LOAD, delay: 500 }),
    routerMiddleware(options.history),
    options.analytics ? analyticsMiddleware({ ...options.analytics }) : null,
    options.siteCatalyst
      ? siteCatalystMiddleware({
          ...options.siteCatalyst,
          debug: __DEVELOPMENT__,
        })
      : null,
    options.logger,
  ]);

  /* eslint-disable no-underscore-dangle */
  let composeEnhancers = compose;
  const devTools = [];
  if (__DEVELOPMENT__ && !__MOCK_BUILD__) {
    if (options.devTools && typeof window !== "undefined") {
      if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
      } else {
        /* eslint-disable-next-line global-require */
        const DevTools = require("../components/utils/DevTools").default;
        devTools.push(DevTools.instrument());
      }
    }
  }
  /* eslint-enable */

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    ...devTools,
  );

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
