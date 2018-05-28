/* @flow */
import { createAction, handleActions, type Reducer } from "redux-actions";
import { steps } from "redux-effects-steps";
import { createAsyncActionTypes } from "./utils";

/**
 * Action types
 */
const AUTH = "redux-proto/auth";

export const [
  AUTH_CHECK_LOGIN_REQUEST,
  AUTH_CHECK_LOGIN_SUCCESS,
  AUTH_CHECK_LOGIN_FAIL,
] = createAsyncActionTypes(`${AUTH}/check`);

export const [
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
] = createAsyncActionTypes(`${AUTH}/login`);

export const [
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
] = createAsyncActionTypes(`${AUTH}/logout`);

/**
 * Action creators
 */
const checkLoginRequest = createAction(AUTH_CHECK_LOGIN_REQUEST);

const checkLoginSuccess = createAction(AUTH_CHECK_LOGIN_SUCCESS);

const checkLoginFail = createAction(AUTH_CHECK_LOGIN_FAIL);

export function checkLogin() {
  return steps(checkLoginRequest(), [checkLoginSuccess, checkLoginFail]);
}

const loginRequest = createAction(AUTH_LOGIN_REQUEST);

const loginSuccess = createAction(AUTH_LOGIN_SUCCESS);

const loginFail = createAction(AUTH_LOGIN_FAIL);

export function login(username: string, password: string, location: *) {
  return steps(loginRequest({ params: { username, password }, location }), [
    loginSuccess,
    loginFail,
  ]);
}

const logoutRequest = createAction(AUTH_LOGOUT_REQUEST);

const logoutSuccess = createAction(AUTH_LOGOUT_SUCCESS);

const logoutFail = createAction(AUTH_LOGOUT_FAIL);

export function logout() {
  return steps(logoutRequest(), [logoutSuccess, logoutFail]);
}

/**
 * Initial state
 */

export type State = {
  login: any,
  username: ?string,
};
const INITIAL_STATE: State = {
  login: false,
  username: null,
};

/**
 * Reducer
 */
export default (handleActions(
  {
    [AUTH_CHECK_LOGIN_SUCCESS]: loggedIn,
    [AUTH_LOGIN_SUCCESS]: loggedIn,
    [AUTH_CHECK_LOGIN_FAIL]: loggedOut,
    [AUTH_LOGIN_FAIL]: loggedOut,
    [AUTH_LOGOUT_SUCCESS]: loggedOut,
  },
  INITIAL_STATE,
): Reducer<State, *>);

function loggedIn(state, action) {
  const {
    payload: { sub },
  } = action;

  return state.login && state.username === sub
    ? state
    : {
        login: true,
        username: sub,
      };
}

function loggedOut(state, action) {
  return INITIAL_STATE;
}
