import { createAction, handleActions } from 'redux-actions';
import { compose } from 'recompose';
import { steps } from '../../packages/redux-effects-ext';
import { fetchrRead } from '../../packages/redux-effects-fetchr';
import { initialState, filterActionType } from './utils';

/**
 * Action types
 */
const SEARCH_SALON = 'redux-proto/salon/search/';
export const SEARCH_SALON_REQUEST = SEARCH_SALON + 'request';
export const SEARCH_SALON_SUCCESS = SEARCH_SALON + 'success';
export const SEARCH_SALON_FAIL = SEARCH_SALON + 'fail';

const CLEAR_SEARCH_SALON = 'redux-proto/salon/clear/search/';
const CLEAR_SEARCH_SALON_REQUEST = CLEAR_SEARCH_SALON + 'request';

const FIND_SALON_BY_ID = 'redux-proto/salon/find_id/';
export const FIND_SALON_BY_ID_REQUEST = FIND_SALON_BY_ID + 'request';
export const FIND_SALON_BY_ID_SUCCESS = FIND_SALON_BY_ID + 'success';
export const FIND_SALON_BY_ID_FAIL = FIND_SALON_BY_ID + 'fail';

/**
 * Action creators
 */

const searchSalonRequest = createAction(SEARCH_SALON_REQUEST);
const searchSalonSuccess = createAction(SEARCH_SALON_SUCCESS);
const searchSalonFail = createAction(SEARCH_SALON_FAIL);

export function searchSalon(params) {
  return steps(
    searchSalonRequest(params),
    fetchrRead('salon', params),
    [searchSalonSuccess, searchSalonFail],
  );
}

const findSalonByIdRequest = createAction(FIND_SALON_BY_ID_REQUEST);
const findSalonByIdSuccess = createAction(FIND_SALON_BY_ID_SUCCESS);
const findSalonByIdFail = createAction(FIND_SALON_BY_ID_FAIL);

export function findSalonById(id) {
  return steps(
    findSalonByIdRequest(id),
    fetchrRead('salon', { id }),
    [findSalonByIdSuccess, findSalonByIdFail],
  );
}

export const clearSearchSalon = createAction(CLEAR_SEARCH_SALON_REQUEST);

/**
 * Initial state
 */
export const INITIAL_STATE = {
  loading: false,
  loaded: false,
  params: null,
  count: 0,
  items: [],
  item: {},
};

/**
 * Reducer
 */
export default compose(
  initialState(INITIAL_STATE),
  filterActionType(SEARCH_SALON, FIND_SALON_BY_ID, CLEAR_SEARCH_SALON),
)(handleActions({
  [SEARCH_SALON_REQUEST]: (state, { payload: { resource, params } }) => ({
    ...state,
    loading: true,
    loaded: false,
    params,
    count: state.count,
    items: state.items || [],
  }),

  [SEARCH_SALON_SUCCESS]: (state, { payload: { resource, data: { results_available: count, salon: items } } }) => ({
    ...state,
    loading: false,
    loaded: true,
    count: +count,
    items: items || [],
  }),

  [SEARCH_SALON_FAIL]: (state, { payload: { resource }, error }) => ({
    ...state,
    loading: false,
    loaded: false,
    count: 0,
    items: [],
    error,
  }),
  
  [CLEAR_SEARCH_SALON_REQUEST]: () => INITIAL_STATE,

  [FIND_SALON_BY_ID_SUCCESS]: (state, { payload: { resource, data: { salon: items } } }) => ({
    ...state,
    loading: false,
    loaded: true,
    item: items[0],
  }),

  [FIND_SALON_BY_ID_FAIL]: (state, { payload: { resource }, error }) => ({
    ...state,
    loading: false,
    loaded: false,
    item: {},
    error,
  }),
}));
