/* @flow */
import { startLoading, stopLoading } from "shared/redux/modules/loading";
import { handleActions } from "./utils";

type LoadingMiddlewareOption = {
  start: any,
  stop: any,
  delay: number,
};

export default function loadingMiddleware({
  start,
  stop,
  delay,
}: LoadingMiddlewareOption) {
  let timerId = null;

  return handleActions({
    [start]({ dispatch }, next, action) {
      next(action); // eslint-disable-line callback-return

      if (timerId) {
        return;
      }

      timerId = setTimeout(() => {
        timerId = null;
        dispatch(startLoading());
      }, delay);
    },

    [stop]({ dispatch }, next, action) {
      next(action); // eslint-disable-line callback-return

      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
        return;
      }

      dispatch(stopLoading());
    },
  });
}
