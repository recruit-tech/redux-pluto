/* @flow */
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reduxAsyncLoader } from "redux-async-loader";
import { reducer as formReducer } from "redux-form";
import { pageScopeReducer } from "redux-page-scope";
import { analyticsReducer } from "react-redux-analytics";
import agreedSample from "./agreedSample";
import alert from "./alert";
import auth from "./auth";
import counter from "./counter";
import loading from "./loading";
import masters from "./masters";
import salon, { type State as SalonState } from "./salon";
import agreedSalon, { type State as AgreedSalonState } from "./agreedSalon";
import salonList from "./salonList";
import agreedSalonList from "./agreedSalonList";
import style from "./style";
import uploadSample from "./uploadSample";

export type State = {
  app: {
    masters: $FIXME,
    auth: $FIXME,
    counter: $FIXME,
    alert: $FIXME,
    loading: $FIXME
  },
  page: {
    agreedSalon: AgreedSalonState,
    agreedSalonList: $FIXME,
    salon: SalonState,
    salonList: $FIXME,
    style: $FIXME
  },
  form: $FIXME,
  reduxAsyncLoader: $FIXME,
  routing: $FIXME,
  analytics: $FIXME
};

export default combineReducers({
  app: combineReducers({
    masters,
    auth,
    counter,
    alert,
    loading
  }),
  page: pageScopeReducer(
    combineReducers({
      agreedSample,
      salon,
      agreedSalon,
      salonList,
      agreedSalonList,
      style,
      uploadSample
    })
  ),
  form: formReducer,
  reduxAsyncLoader,
  routing: routerReducer,
  analytics: analyticsReducer
});

/**
 * Selectors
 */
export function mastersSelector(state: State) {
  return state.app.masters;
}

export function authSelector(state: State) {
  return state.app.auth;
}

export function counterSelector(state: State) {
  return state.app.counter;
}

export function alertSelector(state: State) {
  return state.app.alert;
}

export function loadingSelector(state: State) {
  return state.app.loading;
}

export function salonSelector(state: State): SalonState {
  return state.page.salon;
}

export function agreedSalonSelector(state: State): AgreedSalonState {
  return state.page.agreedSalon;
}

export function salonListSelector(state: State) {
  return state.page.salonList;
}

export function agreedSalonListSelector(state: State) {
  return state.page.agreedSalonList;
}

export function styleSelector(state: State) {
  return state.page.style;
}

export function routingSelector(state: State) {
  return state.routing;
}

export function globalFormDisabledSelector(state: State) {
  return state.reduxAsyncLoader.onServer;
}
