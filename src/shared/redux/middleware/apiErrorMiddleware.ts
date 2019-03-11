import { AnyAction } from "redux";
import { MiddlewareAPI } from "redux";
import { replace } from "react-router-redux";
import { FETCHR } from "redux-effects-fetchr";
import { showAlert } from "../modules/alert";
import { UPLOADER } from "./uploader";
import { handleActions } from "./utils";

export default function apiErrorMiddleware() {
  return handleActions({
    [UPLOADER]({ dispatch }: MiddlewareAPI, next: Function, action: AnyAction) {
      return next(action).catch((error: any) => {
        const { statusCode } = error;
        if (!statusCode || statusCode >= 500) {
          dispatch(showAlert("サービスに接続できませんでした。"));
        } else if (statusCode >= 400) {
          dispatch(showAlert(`${statusCode}: エラーが発生しました。`));
        }

        return Promise.reject(error);
      });
    },
    [FETCHR](
      { dispatch, getState }: MiddlewareAPI,
      next: Function,
      action: AnyAction,
    ) {
      return next(action).catch((error: any) => {
        const { statusCode } = error;
        if (!statusCode || statusCode >= 500) {
          dispatch(showAlert("サービスに接続できませんでした。"));
        } else if (statusCode === 400) {
          dispatch(showAlert("不正なリクエストが発生しました。"));
        } else if (statusCode === 401) {
          const { routing } = getState();
          const { locationBeforeTransitions } = routing;
          const { pathname } = locationBeforeTransitions;
          dispatch(replace(`/login?location=${pathname}`));
        } else if (statusCode === 403) {
          dispatch(showAlert("無効なリクエストが発生しました。"));
        } else if (statusCode === 404) {
          dispatch(showAlert("何も見つかりませんでした。"));
        }

        return Promise.reject(error);
      });
    },
  });
}
