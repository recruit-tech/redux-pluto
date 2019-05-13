import { steps } from "redux-effects-steps";

/**
 * Action types
 */
export const AUTH_CHECK_LOGIN_REQUEST = "redux-proto/auth/check/requset";
export const AUTH_CHECK_LOGIN_SUCCESS = "redux-proto/auth/check/success";
export const AUTH_CHECK_LOGIN_FAIL = "redux-proto/auth/check/fail";

export const AUTH_LOGIN_REQUEST = "redux-proto/auth/login/request";
export const AUTH_LOGIN_SUCCESS = "redux-proto/auth/login/success";
export const AUTH_LOGIN_FAIL = "redux-proto/auth/login/fail";

export const AUTH_LOGOUT_REQUEST = "redux-proto/auth/logout/request";
export const AUTH_LOGOUT_SUCCESS = "redux-proto/auth/logout/success";
export const AUTH_LOGOUT_FAIL = "redux-proto/auth/logout/fail";

type GetCheckLoginType = {
  data: {
    sub: string;
  };
};

type LoginRequestPayload = {
  params: {
    username: string;
    password: string;
  };
  location: any;
};

type PostLoginType = {
  data: {
    username: string;
  };
};

type CheckLoginRequest = {
  type: typeof AUTH_CHECK_LOGIN_REQUEST;
};
type CheckLoginSuccess = {
  type: typeof AUTH_CHECK_LOGIN_SUCCESS;
  payload: GetCheckLoginType;
};
type CheckLoginFail = {
  type: typeof AUTH_CHECK_LOGIN_FAIL;
  payload: Error;
  error: boolean;
};

type LoginRequest = {
  type: typeof AUTH_LOGIN_REQUEST;
  payload: LoginRequestPayload;
};
type LoginSuccess = {
  type: typeof AUTH_LOGIN_SUCCESS;
  payload: PostLoginType;
};
type LoginFail = {
  type: typeof AUTH_LOGIN_FAIL;
  payload: Error;
  error: boolean;
};

type LogoutRequest = {
  type: typeof AUTH_LOGOUT_REQUEST;
};
type LogoutSuccess = {
  type: typeof AUTH_LOGOUT_SUCCESS;
};
type LogoutFail = {
  type: typeof AUTH_LOGOUT_FAIL;
  payload: Error;
  error: boolean;
};

/**
 * Action creators
 */
function checkLoginRequest(): CheckLoginRequest {
  return {
    type: AUTH_CHECK_LOGIN_REQUEST,
  };
}

function checkLoginSuccess(res: GetCheckLoginType): CheckLoginSuccess {
  return {
    type: AUTH_CHECK_LOGIN_SUCCESS,
    payload: res,
  };
}

function checkLoginFail(error: Error): CheckLoginFail {
  return {
    type: AUTH_CHECK_LOGIN_FAIL,
    payload: error,
    error: true,
  };
}

export function checkLogin() {
  return steps(checkLoginRequest(), [checkLoginSuccess, checkLoginFail]);
}

function loginRequest(payload: LoginRequestPayload): LoginRequest {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload,
  };
}

function loginSuccess(res: PostLoginType): LoginSuccess {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: res,
  };
}

function loginFail(error: Error): LoginFail {
  return {
    type: AUTH_LOGIN_FAIL,
    payload: error,
    error: true,
  };
}

export function login(username: string, password: string, location: string) {
  return steps(loginRequest({ params: { username, password }, location }), [
    loginSuccess,
    loginFail,
  ]);
}

function logoutRequest(): LogoutRequest {
  return {
    type: AUTH_LOGOUT_REQUEST,
  };
}

function logoutSuccess(): LogoutSuccess {
  return {
    type: AUTH_LOGOUT_SUCCESS,
  };
}

function logoutFail(error: Error): LogoutFail {
  return {
    type: AUTH_LOGOUT_FAIL,
    payload: error,
    error: true,
  };
}

export function logout() {
  return steps(logoutRequest(), [logoutSuccess, logoutFail]);
}

/**
 * Initial state
 */

export type State = {
  login: any;
  username: string | null;
};
const INITIAL_STATE: State = {
  login: false,
  username: null,
};

type Action =
  | CheckLoginRequest
  | CheckLoginSuccess
  | CheckLoginFail
  | LoginRequest
  | LoginSuccess
  | LoginFail
  | LogoutRequest
  | LogoutSuccess
  | LogoutFail;

/**
 * Reducer
 */
export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case AUTH_CHECK_LOGIN_SUCCESS: {
      return loggedIn(state, action);
    }
    case AUTH_LOGIN_SUCCESS: {
      return loggedInSuccess(state, action);
    }
    case AUTH_CHECK_LOGIN_FAIL: {
      return loggedOut(state);
    }
    case AUTH_LOGOUT_SUCCESS: {
      return loggedOut(state);
    }
    default: {
      return state;
    }
  }
}

function loggedIn(state: State, action: CheckLoginSuccess) {
  const {
    payload: {
      data: { sub },
    },
  } = action;

  return {
    ...state,
    username: sub,
  };
}

function loggedInSuccess(state: State, action: LoginSuccess) {
  const {
    payload: {
      data: { username },
    },
  } = action;

  return {
    login: true,
    username,
  };
}

function loggedOut(_state: any) {
  return INITIAL_STATE;
}
