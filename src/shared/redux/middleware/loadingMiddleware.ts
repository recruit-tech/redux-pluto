import { MiddlewareAPI, AnyAction } from "redux";
import { startLoading, stopLoading } from "../modules/loading";
import { handleActions } from "./utils";

type LoadingMiddlewareOption = {
  start: any;
  stop: any;
  delay: number;
};

export default function loadingMiddleware({
  start,
  stop,
  delay,
}: LoadingMiddlewareOption) {
  let timerId: any = null;

  return handleActions({
    [start]({ dispatch }: MiddlewareAPI, next: Function, action: any) {
      next(action); // eslint-disable-line callback-return

      if (timerId) {
        return;
      }

      timerId = setTimeout(() => {
        timerId = null;
        dispatch(startLoading());
      }, delay);
    },

    [stop]({ dispatch }: MiddlewareAPI, next: Function, action: AnyAction) {
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
