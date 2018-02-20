import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reduxAsyncLoader } from 'redux-async-loader';
import { reducer as formReducer } from 'redux-form';
import { pageScopeReducer } from 'redux-page-scope';
import { analyticsReducer } from 'react-redux-analytics';
import agreedSample from './agreedSample';
import alert from './alert';
import auth from './auth';
import counter from './counter';
import loading from './loading';
import masters from './masters';
import salon from './salon';
import agreedSalon from './agreedSalon';
import salonList from './salonList';
import agreedSalonList from './agreedSalonList';
import style from './style';
import uploadSample from './uploadSample';

export default combineReducers({
  app: combineReducers({
    masters,
    auth,
    counter,
    alert,
    loading,
  }),
  page: pageScopeReducer(combineReducers({
    agreedSample,
    salon,
    agreedSalon,
    salonList,
    agreedSalonList,
    style,
    uploadSample,
  })),
  form: formReducer,
  reduxAsyncLoader,
  routing: routerReducer,
  analytics: analyticsReducer,
});

/**
 * Selectors
 */
export function mastersSelector(state) {
  return state.app.masters;
}

export function authSelector(state) {
  return state.app.auth;
}

export function counterSelector(state) {
  return state.app.counter;
}

export function alertSelector(state) {
  return state.app.alert;
}

export function loadingSelector(state) {
  return state.app.loading;
}

export function salonSelector(state) {
  return state.page.salon;
}

export function agreedSalonSelector(state) {
  return state.page.agreedSalon;
}

export function salonListSelector(state) {
  return state.page.salonList;
}

export function agreedSalonListSelector(state) {
  return state.page.agreedSalonList;
}

export function styleSelector(state) {
  return state.page.style;
}

export function routingSelector(state) {
  return state.routing;
}

export function globalFormDisabledSelector(state) {
  return state.reduxAsyncLoader.onServer;
}
