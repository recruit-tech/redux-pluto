import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reduxAsyncLoader } from 'redux-async-loader';
import { reducer as formReducer } from 'redux-form';
import { pageScopeReducer } from 'redux-page-scope';
import alert from './alert';
import auth from './auth';
import masters from './masters';
import style from './style';
import salon from './salon';
import counter from './counter';
import loading from './loading';

export default combineReducers({
  app: combineReducers({
    masters,
    auth,
    counter,
    alert,
    loading,
  }),
  page: pageScopeReducer(combineReducers({
    salon,
    style,
  })),
  form: formReducer,
  reduxAsyncLoader,
  routing: routerReducer,
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

export function styleSelector(state) {
  return state.page.style;
}
