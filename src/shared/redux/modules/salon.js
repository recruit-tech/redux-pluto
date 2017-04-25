import { createAction, handleActions } from 'redux-actions';
import { steps } from 'redux-effects-steps';
import { fetchrRead } from 'redux-effects-fetchr';
import range from 'lodash/fp/range';

export const SALON_SEARCH_MAX_COUNT = 50;

/**
 * Action types
 */
const SALON = 'redux-proto/salon/';
const SEARCH_SALON = SALON + 'search/';
export const SEARCH_SALON_REQUEST = SEARCH_SALON + 'request';
export const SEARCH_SALON_SUCCESS = SEARCH_SALON + 'success';
export const SEARCH_SALON_FAIL = SEARCH_SALON + 'fail';

const FIND_SALON_BY_ID = SALON + 'find_id/';
export const FIND_SALON_BY_ID_REQUEST = FIND_SALON_BY_ID + 'request';
export const FIND_SALON_BY_ID_SUCCESS = FIND_SALON_BY_ID + 'success';
export const FIND_SALON_BY_ID_FAIL = FIND_SALON_BY_ID + 'fail';

const CLEAR_SEARCH_SALON = SALON + 'clear_search/';
export const CLEAR_SEARCH_SALON_REQUEST = CLEAR_SEARCH_SALON + 'request';

const SEARCH_MORE_SALON = SALON + 'search_more/';
export const SEARCH_MORE_SALON_REQUEST = SEARCH_MORE_SALON + 'request';
export const SEARCH_MORE_SALON_SUCCESS = SEARCH_MORE_SALON + 'success';
export const SEARCH_MORE_SALON_FAIL = SEARCH_MORE_SALON + 'fail';

/**
 * Action creators
 */

const searchSalonRequest = createAction(SEARCH_SALON_REQUEST);
const searchSalonSuccess = createAction(SEARCH_SALON_SUCCESS,
  (params, data) => ({ params, data }));
const searchSalonFail = createAction(SEARCH_SALON_FAIL,
  (params, error) => ({ params, error }));

export function searchSalon(params) {
  return steps(
    searchSalonRequest(params),
    fetchrRead('salon', params),
    [
      (payload) => searchSalonSuccess(params, payload.data),
      (error) => searchSalonFail(params, error),
    ],
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

const searchMoreSalonRequest = createAction(SEARCH_MORE_SALON_REQUEST);
const searchMoreSalonSuccess = createAction(SEARCH_MORE_SALON_SUCCESS,
  (params, data) => ({ params, data }));
const searchMoreSalonFail = createAction(SEARCH_MORE_SALON_FAIL,
  (params, error) => ({ params, error }));

export function searchMoreSalon(params) {
  return steps(
    searchMoreSalonRequest(params),
    fetchrRead('salon', params),
    [
      (payload) => searchMoreSalonSuccess(params, payload.data),
      (error) => searchMoreSalonFail({ params, error }),
    ],
  );
}

/**
 * Initial state
 */
export const INITIAL_STATE = {
  loading: false,
  loaded: false,
  params: {},
  count: 0,
  page: 0,
  pages: [],
  items: {},
  item: {},
  canGetNext: false,
  canGetPrev: false,
  shouldAdjustScroll: false,
  forceScrollTo: { x: 0, y: 100 },
};

/**
 * Reducer
 */
export default handleActions({
  [SEARCH_SALON_REQUEST]: (state) => ({
    ...state,
    loading: true,
    loaded: false,
  }),

  [SEARCH_SALON_SUCCESS]: (state, action) => {
    const {
      payload: {
        params,
        data: {
          results_available: count,
          results_start: start,
          salon: items,
        },
      },
    } = action;

    return {
      ...state,
      loading: false,
      loaded: true,
      count: +count,
      page: +params.page || 0,
      pages: createPages(+count),
      items: { [+params.page || 0]: items || [] },
      canGetNext: canGetNext(count, start),
      canGetPrev: canGetPrev(+params.page || 0),
    };
  },

  [SEARCH_SALON_FAIL]: (state, action) => {
    const { error } = action;

    return {
      ...state,
      loading: false,
      loaded: false,
      count: 0,
      items: {},
      error,
    };
  },

  [CLEAR_SEARCH_SALON_REQUEST]: (state, action) => INITIAL_STATE,

  [FIND_SALON_BY_ID_SUCCESS]: (state, action) => {
    const { payload: { data: { salon: items } } } = action;

    return {
      ...state,
      loading: false,
      loaded: true,
      item: items[0],
    };
  },

  [FIND_SALON_BY_ID_FAIL]: (state, action) => INITIAL_STATE,

  [SEARCH_MORE_SALON_REQUEST]: (state) => ({
    ...state,
    loading: true,
    loaded: false,
  }),

  [SEARCH_MORE_SALON_SUCCESS]: (state, action) => {
    const {
      payload: {
        params,
        data: {
          results_available: count,
          results_start: start,
          salon: items,
        },
      },
    } = action;

    return {
      ...state,
      loading: false,
      loaded: true,
      count: +count,
      page: +params.page,
      pages: createPages(+count),
      items: { ...state.items, [+params.page]: items || [] },
      item: {},
      canGetNext: canGetNext(count, start),
      canGetPrev: canGetPrev(+params.page),
      shouldAdjustScroll: state.page > +params.page,
      forceScrollTo: {},
    };
  },

  [SEARCH_MORE_SALON_FAIL]: (state, action) => {
    const { error } = action;

    return {
      ...state,
      loading: false,
      loaded: false,
      error,
    };
  },
}, INITIAL_STATE);

function canGetNext(count, start) {
  return +count > +start + SALON_SEARCH_MAX_COUNT;
}

function canGetPrev(page) {
  return +page > 0;
}

function createPages(count) {
  const maxPage = count / SALON_SEARCH_MAX_COUNT;
  return range(0, maxPage);
}
