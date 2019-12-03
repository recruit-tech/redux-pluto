import { routerMiddleware } from "react-router-redux";
import { createStore, compose, applyMiddleware, Store, AnyAction } from "redux";
import {
  BEGIN_ASYNC_LOAD,
  END_ASYNC_LOAD,
} from "@recruit-tech/redux-async-loader";
import steps from "redux-effects-steps";
import fetchr from "redux-effects-fetchr";
import uploader from "redux-effects-formdata-uploader";
import fetchrCache from "redux-effects-fetchr-cache";
import apiError from "./middleware/apiErrorMiddleware";
import auth from "./middleware/authMiddleware";
import loading from "./middleware/loadingMiddleware";
import reducer from "./modules/reducer";
import mockLoggingMiddleware from "./middleware/mockLoggingMiddleware";
import { RootState } from "./modules/reducer";

// for hot loader patch
declare global {
  interface NodeModule {
    hot: any;
  }
}

export default function(
  initialState: RootState,
  options: {
    fetchrCache?: any;
    csrfToken?: any;
    mockBuild?: any;
    fetchr?: any;
    history?: any;
    logger?: any;
    devTools?: any;
  } = {},
): Store<RootState, AnyAction> {
  const middlewares = [
    steps,
    auth(),
    options.fetchrCache
      ? fetchrCache(options.fetchrCache, {
          resetCache: (action: any) => action.payload.type !== "read",
          excludes: options.fetchrCache.excludes,
        })
      : null,
    apiError(),
    options.csrfToken ? uploader({ csrfToken: options.csrfToken }) : null,
    options.mockBuild ? mockLoggingMiddleware(options.mockBuild.axios) : null,
    fetchr(options.fetchr),
    loading({ start: BEGIN_ASYNC_LOAD, stop: END_ASYNC_LOAD, delay: 500 }),
    routerMiddleware(options.history),
    options.logger,
  ].filter(Boolean);

  /* eslint-disable no-underscore-dangle */
  let composeEnhancers = compose;
  const devTools = [];
  if (__DEVELOPMENT__ && !__MOCK_BUILD__) {
    if (options.devTools && typeof window !== "undefined") {
      if (__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
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

  return store as Store<RootState, AnyAction>;
}
