/* eslint-disable import/prefer-default-export */
import { AnyAction } from "redux";
import { PromisableType } from "redux-effects-steps";

export function createAsyncActionTypes(
  namespace: string,
): [string, string, string] {
  return [`${namespace}/request`, `${namespace}/success`, `${namespace}/fail`];
}
