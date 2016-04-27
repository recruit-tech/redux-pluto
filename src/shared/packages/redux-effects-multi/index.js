import { createAction } from 'redux-actions';

/**
 * Action types
 */
export const MULTI = 'EFFECT_MULTI';

/**
 * Action creators
 */
export const multi = createAction(MULTI, (...args) => [...args]);

export default function multiMiddleware({ dispatch }) {
  return (next) => (action) => {
    if (action.type !== MULTI) {
      return next(action);
    }

    return Promise.all(action.payload.filter(Boolean).map(dispatch));
  };
}
