import { createAction } from 'redux-actions';
import { bind } from 'redux-effects';
import { fetchrCreate, fetchrRead, fetchrDelete } from '../middlewares/redux-effects-fetchr';

/**
 * Action types
 */
const AUTH = 'redux-proto/auth/';

const AUTH_CHECK_LOGIN = AUTH + 'check/';
export const AUTH_CHECK_LOGIN_REQUEST = AUTH_CHECK_LOGIN + 'request';
export const AUTH_CHECK_LOGIN_SUCCESS = AUTH_CHECK_LOGIN + 'success';
export const AUTH_CHECK_LOGIN_FAIL = AUTH_CHECK_LOGIN + 'fail';

const AUTH_LOGIN = AUTH + 'login/';
export const AUTH_LOGIN_REQUEST = AUTH_LOGIN + 'request';
export const AUTH_LOGIN_SUCCESS = AUTH_LOGIN + 'success';
export const AUTH_LOGIN_FAIL = AUTH_LOGIN + 'fail';

const AUTH_LOGOUT = AUTH + 'logout/';
export const AUTH_LOGOUT_REQUEST = AUTH_LOGOUT + 'request';
export const AUTH_LOGOUT_SUCCESS = AUTH_LOGOUT + 'success';
export const AUTH_LOGOUT_FAIL = AUTH_LOGOUT + 'fail';

/**
 * Action creators
 */
const checkLoginRequest = createAction(AUTH_CHECK_LOGIN_REQUEST);

const checkLoginSuccess = createAction(AUTH_CHECK_LOGIN_SUCCESS);

const checkLoginFail = createAction(AUTH_CHECK_LOGIN_FAIL);

export function checkLogin() {
  return [
    checkLoginRequest(),
    bind(fetchrRead('accessToken'), checkLoginSuccess, checkLoginFail),
  ];
}

const loginRequest = createAction(AUTH_LOGIN_REQUEST);

const loginSuccess = createAction(AUTH_LOGIN_SUCCESS);

const loginFail = createAction(AUTH_LOGIN_FAIL);

export function login(username, password) {
  return [
    loginRequest(username, password),
    bind(fetchrCreate('accessToken', { username, password }), loginSuccess, loginFail),
  ];
}

const logoutRequest = createAction(AUTH_LOGOUT_REQUEST);

const logoutSuccess = createAction(AUTH_LOGOUT_SUCCESS);

const logoutFail = createAction(AUTH_LOGOUT_FAIL);

export function logout() {
  return [
    logoutRequest(),
    bind(fetchrDelete('accessToken'), logoutSuccess, logoutFail),
  ];
}
