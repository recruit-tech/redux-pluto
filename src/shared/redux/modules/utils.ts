/* eslint-disable import/prefer-default-export */

export function createAsyncActionTypes(
  namespace: string,
): [string, string, string] {
  return [`${namespace}/request`, `${namespace}/success`, `${namespace}/fail`];
}
