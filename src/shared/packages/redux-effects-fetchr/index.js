import { createAction } from 'redux-actions';

/**
 * Action types
 */
export const FETCHR = 'EFFECT_FETCHR';

/**
 * Action creators
 */
const fetchr = createAction(FETCHR, (type, resource, params = {}, config = {}) => ({
  type,
  resource,
  params,
  config,
}));

export const fetchrCreate = (resource, params, config) => fetchr('create', resource, params, config);

export const fetchrRead = (resource, params, config) => fetchr('read', resource, params, config);

export const fetchrUpdate = (resource, params, config) => fetchr('update', resource, params, config);

export const fetchrDelete = (resource, params, config) => fetchr('delete', resource, params, config);

/**
 * Fetchr middleware
 */
export default function fetchrMiddleware(fetchr) {
  return ({ dispatch }) => (next) => (action) => {
    if (action.type !== FETCHR) {
      return next(action);
    }

    const { type, resource, params, config } = action.payload;
    return fetchr[type](resource, params, config);
  };
}
