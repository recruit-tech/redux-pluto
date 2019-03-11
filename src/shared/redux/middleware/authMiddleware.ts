import { replace } from "react-router-redux";
import { fetchrCreate, fetchrRead, fetchrDelete } from "redux-effects-fetchr";
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
      return dispatch(fetchrRead("accessToken"));
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
      return dispatch(fetchrCreate("accessToken", params)).then(
        (payload: any) => {
          dispatch(replace(location || "/"));
          return payload;
        },
      );
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
