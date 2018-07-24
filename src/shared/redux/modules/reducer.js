/* @flow */
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reduxAsyncLoader } from "redux-async-loader";
import { reducer as formReducer } from "redux-form";
import { pageScopeReducer } from "redux-page-scope";
import { analyticsReducer } from "react-redux-analytics";
import agreedSample, { type State as AgreedSampleState } from "./agreedSample";
import alert, { type State as AlertState } from "./alert";
import auth, { type State as AuthState } from "./auth";
import counter, { type State as CounterState } from "./counter";
import loading, { type State as LoadingState } from "./loading";
import masters, { type State as MastersState } from "./masters";
import search, { type State as SearchState } from "./search";
import searchList, { type State as SearchListstate } from "./searchList";
import style, { type State as StyleState } from "./style";
import hackerNews, { type State as HackerNewsState } from "./hackerNews";
import uploadSample, { type State as UploadSampleState } from "./uploadSample";

export type State = {
  app: {
    masters: MastersState,
    auth: AuthState,
    counter: CounterState,
    alert: AlertState,
    loading: LoadingState,
  },
  page: {
    agreedSample: AgreedSampleState,
    search: SearchState,
    searchList: SearchListstate,
    style: StyleState,
    hackerNews: HackerNewsState,
    uploadSample: UploadSampleState,
  },
  // libraries
  form: *,
  reduxAsyncLoader: *,
  routing: *,
  analytics: *,
};

export default combineReducers({
  app: combineReducers({
    masters,
    auth,
    counter,
    alert,
    loading,
  }),
  page: pageScopeReducer(
    combineReducers({
      agreedSample,
      search,
      searchList,
      style,
      uploadSample,
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
