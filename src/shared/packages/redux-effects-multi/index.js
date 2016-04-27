import isPromise from 'is-promise';

export default function multiPromises({ dispatch }) {
  function dispatchAll(actions) {
    return actions.filter(Boolean).map(dispatch);
  }

  return (next) => (actions) => Array.isArray(actions) ? toPromise(dispatchAll(actions)) : next(actions);
}

function toPromise(results) {
  return hasPromise(results) ? Promise.all(results) : results;
}

function hasPromise(results) {
  return results.some(isPromise);
}
