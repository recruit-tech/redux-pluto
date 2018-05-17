/* @flow */
/* eslint-disable import/prefer-default-export */

export function handleActions(handlers: { [string]: Function }) {
  return (store: any) => (next: Function) => (action: any) => {
    const handler = handlers[action.type];
    return handler ? handler(store, next, action) : next(action);
  };
}
