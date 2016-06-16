/**
 * Action Types
 */

export const EFFECT_EXT = 'EFFECT_EXT';

/**
 * Action creators
 */
export function steps(action, ...steps) {
  return {
    type: EFFECT_EXT,
    payload: action,
    meta: {
      steps,
    },
  };
}

export function bind(action, ...step) {
  return steps(action, [...step]);
}

export function multi(...actions) {
  return steps([...actions]);
}

/**
 * Middleware
 */
export default function effectExtMiddleware({ dispatch }) {
  return (next) => (action) =>
    action.type === EFFECT_EXT
      ? composeEffect(action)
      : next(action);

  function composeEffect(action) {
    const promise = promisify(maybeDispatch(action.payload));
    return action.meta && action.meta.steps
      ? applySteps(promise, action.meta.steps)
      : promise;
  }

  function applySteps(promise, steps = []) {
    return steps
      .map((step) => Array.isArray(step) ? step : [step])
      .reduce((promise, [success = (val) => val, failure = (err) => Promise.reject(err)]) =>
        promise.then(
          (val) => promisify(maybeDispatch(createAction(success, val))),
          (err) => promisify(maybeDispatch(createAction(failure, err)))
        ), promise);
  }

  function maybeDispatch(action) {
    if (!action) {
      return;
    }

    if (Array.isArray(action)) {
      return action.filter(Boolean).map(dispatch);
    }

    return dispatch(action);
  }
}

function promisify(val) {
  if (Array.isArray(val)) {
    return Promise.all(val);
  }

  return !isErrorAction(val) ? Promise.resolve(val) : Promise.reject(val);
}

function createAction(actionOrCretor, param) {
  if (!actionOrCretor) {
    return;
  }

  if (typeof actionOrCretor === 'function') {
    return actionOrCretor(param);
  }

  return actionOrCretor;
}

function isErrorAction(val) {
  return val && typeof val === 'object' && typeof val.then !== 'function' && val.type && val.error;
}

function identity(val) {
  return val;
}

function reject(err) {
  return Promise.reject(err);
}
