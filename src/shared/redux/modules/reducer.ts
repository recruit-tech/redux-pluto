/* @flow */
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
import masters, { State as MastersState } from "./masters";
import search, { State as SearchState } from "./search";
import searchList, { State as SearchListstate } from "./searchList";
import style, { State as StyleState } from "./style";
import hackerNews, { State as HackerNewsState } from "./hackerNews";
import uploadSample, { State as UploadSampleState } from "./uploadSample";

export type State = {
  app: {
    masters: MastersState,
    auth: AuthState,
    csrf: CsrfState,
    counter: CounterState,
    alert: AlertState,
    loading: LoadingState,
    agreedSample: AgreedSampleState,
    uploadSample: UploadSampleState,
  },
  page: {
    search: SearchState,
    searchList: SearchListstate,
    style: StyleState,
    hackerNews: HackerNewsState,
  },
  // libraries
  form: any,
  reduxAsyncLoader: any,
  routing: any,
  analytics: any,
};

export default combineReducers({
  app: combineReducers({
    masters,
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
      search,
      searchList,
      style,
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
export function mastersSelector(state: State): MastersState {
  return state.app.masters;
}

export function authSelector(state: State): AuthState {
  return state.app.auth;
}

export function counterSelector(state: State): CounterState {
  return state.app.counter;
}

export function alertSelector(state: State): AlertState {
  return state.app.alert;
}

export function loadingSelector(state: State): LoadingState {
  return state.app.loading;
}

export function searchSelector(state: State): SearchState {
  return state.page.search;
}

export function SearchListselector(state: State): SearchListstate {
  return state.page.searchList;
}

export function styleSelector(state: State): StyleState {
  return state.page.style;
}

export function routingSelector(state: State) {
  return state.routing;
}

export function globalFormDisabledSelector(state: State) {
  return state.reduxAsyncLoader.onServer;
}

export function hackerNewsSelector(state: State) {
  return state.page.hackerNews;
}
