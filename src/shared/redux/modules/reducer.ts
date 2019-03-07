import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reduxAsyncLoader } from "redux-async-loader";
import { reducer as formReducer } from "redux-form";
import { pageScopeReducer } from "redux-page-scope";
import { analyticsReducer } from "react-redux-analytics";
import agreedSample, { State as AgreedSampleState } from "./agreedSample";
import alert, { State as AlertState } from "./alert";
import auth, { State as AuthState } from "./auth";
import csrf, { State as CsrfState } from "./csrf";
import counter, { State as CounterState } from "./counter";
import loading, { State as LoadingState } from "./loading";
import hackerNews, { State as HackerNewsState } from "./hackerNews";
import uploadSample, { State as UploadSampleState } from "./uploadSample";

export type RootState = {
  app: {
    auth: AuthState;
    csrf: CsrfState;
    counter: CounterState;
    alert: AlertState;
    loading: LoadingState;
    agreedSample: AgreedSampleState;
    uploadSample: UploadSampleState;
  };
  page: {
    hackerNews: HackerNewsState;
  };
  // libraries
  form: any;
  reduxAsyncLoader: any;
  routing: any;
  analytics: any;
};

export default combineReducers({
  app: combineReducers({
    auth,
    csrf,
    counter,
    alert,
    loading,
    agreedSample,
    uploadSample,
  }),
  page: pageScopeReducer(
    combineReducers({
      hackerNews,
    }),
  ),
  form: formReducer,
  reduxAsyncLoader,
  routing: routerReducer,
  analytics: analyticsReducer,
});

/**
 * Selectors
 */
export function authSelector(state: RootState): AuthState {
  return state.app.auth;
}

export function counterSelector(state: RootState): CounterState {
  return state.app.counter;
}

export function alertSelector(state: RootState): AlertState {
  return state.app.alert;
}

export function loadingSelector(state: RootState): LoadingState {
  return state.app.loading;
}

export function routingSelector(state: RootState) {
  return state.routing;
}

export function globalFormDisabledSelector(state: RootState) {
  return state.reduxAsyncLoader.onServer;
}

export function hackerNewsSelector(state: RootState) {
  return state.page.hackerNews;
}
