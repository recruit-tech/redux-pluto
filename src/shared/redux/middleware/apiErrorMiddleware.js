/* @flow */
import { replace } from "react-router-redux";
import { FETCHR } from "redux-effects-fetchr";
import { showAlert } from "shared/redux/modules/alert";
import { UPLOADER } from "./uploader";
import { handleActions } from "./utils";

export default function apiErrorMiddleware() {
  return handleActions({
    [UPLOADER]({ dispatch }, next, action) {
      return next(action).catch(error => {
        const { statusCode } = error;
        if (!statusCode || statusCode >= 500) {
          dispatch(showAlert("サービスに接続できませんでした。"));
        } else if (statusCode >= 400) {
          dispatch(showAlert(`${statusCode}: エラーが発生しました。`));
        }

        return Promise.reject(error);
      });
    },
    [FETCHR]({ dispatch, getState }, next, action) {
      return next(action).catch(error => {
        const { statusCode } = error;
        if (!statusCode || statusCode >= 500) {
          dispatch(showAlert("サービスに接続できませんでした。"));
        } else if (statusCode === 401) {
          const { routing } = getState();
          const { locationBeforeTransitions } = routing;
          const { pathname } = locationBeforeTransitions;
          dispatch(replace(`/login?location=${pathname}`));
        }

        return Promise.reject(error);
      });
    },
  });
}
