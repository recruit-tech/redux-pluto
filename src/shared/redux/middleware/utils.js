/* eslint-disable import/prefer-default-export */

export function handleActions(handlers) {
  return store => next => action => {
    const handler = handlers[action.type];
    return handler ? handler(store, next, action) : next(action);
  };
}
