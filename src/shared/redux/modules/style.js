import { createAction, handleActions } from 'redux-actions';
import { bind } from 'redux-effects';
import { fetchrRead } from '../middlewares/redux-effects-fetchr';

/**
 * Action types
 */
const SEARCH_STYLE = 'redux-proto/style/search/';
export const SEARCH_STYLE_REQUEST = SEARCH_STYLE + 'request';
export const SEARCH_STYLE_SUCCESS = SEARCH_STYLE + 'success';
export const SEARCH_STYLE_FAIL = SEARCH_STYLE + 'fail';

/**
 * Action creators
 */
const searchStyleRequest = createAction(SEARCH_STYLE_REQUEST);

const searchStyleSuccess = createAction(SEARCH_STYLE_SUCCESS);

const searchStyleFail = createAction(SEARCH_STYLE_FAIL);

export function searchStyle(params) {
  return [
    searchStyleRequest(params),
    bind(fetchrRead('style', params), searchStyleSuccess, searchStyleFail),
  ];
}

/**
 * Initial state
 */
const INITIAL_STATE = {
  loading: false,
  loaded: false,
  params: null,
  items: null,
};

/**
 * Reducer
 */
export default handleActions({
    [SEARCH_STYLE_REQUEST]: (state, { payload: { params } }) => ({
      loading: true,
      loaded: false,
      params,
      items: [],
    }),

    [SEARCH_STYLE_SUCCESS]: (state, { payload: { data: { results_available: count, style: items } } }) => ({
      ...state,
      loading: false,
      loaded: true,
      count,
      items,
    }),

    [SEARCH_STYLE_FAIL]: (state, { payload: { resource }, error }) => ({
      ...state,
      loading: false,
      loaded: false,
      items: [],
      error,
    }),
  },
  INITIAL_STATE
);
