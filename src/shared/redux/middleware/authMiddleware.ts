import { replace } from "react-router-redux";
import { cookie } from "redux-effects-universal-cookie";
import { fetchrCreate, fetchrDelete } from "redux-effects-fetchr";
import decode from "jwt-decode";
import {
  AUTH_CHECK_LOGIN_REQUEST,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGOUT_REQUEST,
} from "../modules/auth";
import { handleActions } from "./utils";
import { MiddlewareAPI, AnyAction } from "redux";

export default function authMiddleware() {
  return handleActions({
    [AUTH_CHECK_LOGIN_REQUEST](
      { dispatch }: MiddlewareAPI,
      next: Function,
      action: any,
    ) {
      next(action); // eslint-disable-line callback-return
      return checkAccessToken(dispatch);
    },

    [AUTH_LOGIN_REQUEST](
      { dispatch }: MiddlewareAPI,
      next: Function,
      action: AnyAction,
    ) {
      next(action); // eslint-disable-line callback-return
      const {
        payload: { params, location },
      } = action;
      return dispatch(fetchrCreate("accessToken", params))
        .then(() => checkAccessToken(dispatch))
        .then((payload: any) => {
          dispatch(replace(location || "/"));
          return payload;
        });
    },

    [AUTH_LOGOUT_REQUEST](
      { dispatch }: MiddlewareAPI,
      next: Function,
      action: any,
    ) {
      next(action); // eslint-disable-line callback-return
      return dispatch(fetchrDelete("accessToken"));
    },
  });
}

function checkAccessToken(dispatch: any) {
  return dispatch(cookie("access-token")).then((token: string) => {
    if (!token) {
      return Promise.reject(new Error("no token"));
    }

    const payload: any = decode(token);
    if (!payload || payload.aud !== "redux-proto") {
      return Promise.reject(new Error("invalid token"));
    }

    return payload;
  });
}
