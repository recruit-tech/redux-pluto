/* eslint-disable import/prefer-default-export */

export function createAsyncActionTypes(namespace) {
  return [`${namespace}/request`, `${namespace}/success`, `${namespace}/fail`];
}
