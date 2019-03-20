/* eslint-disable import/prefer-default-export */
import { AnyAction } from "redux";
import { PromisableType } from "redux-effects-steps";

export function createAsyncActionTypes(
  namespace: string,
): [string, string, string] {
  return [`${namespace}/request`, `${namespace}/success`, `${namespace}/fail`];
}

// HACK: middlewareを経由したActionを型表現するためのHelper関数
export function withMiddleware<T>(action: AnyAction): PromisableType<T> {
  return (action as any) as PromisableType<T>;
}
