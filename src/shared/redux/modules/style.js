import { createAction, handleActions } from 'redux-actions';
import { bind } from 'redux-effects';
import { compose } from 'recompose';
import { fetchrRead } from '../../packages/redux-effects-fetchr';
import { multi } from '../../packages/redux-effects-multi';
import { initialState, filterActionType } from './utils';

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
  return multi(
    searchStyleRequest(params),
    bind(fetchrRead('style', params), searchStyleSuccess, searchStyleFail),
  );
}

/**
 * Initial state
 */
const INITIAL_STATE = {
  loading: false,
  loaded: false,
  params: null,
  count: 0,
  items: null,
};

/**
 * Reducer
 */
export default compose(
  initialState(INITIAL_STATE),
  filterActionType(SEARCH_STYLE),
)(handleActions({
  [SEARCH_STYLE_REQUEST]: (state, { payload: { params } }) => ({
    loading: true,
    loaded: false,
    params,
    count: state.count,
    items: state.items,
  }),

  [SEARCH_STYLE_SUCCESS]: (state, { payload: { data: { results_available: count, style: items } } }) => ({
    loading: false,
    loaded: true,
    params: state.params,
    count: +count,
    items,
  }),

  [SEARCH_STYLE_FAIL]: (state, { payload: { resource }, error }) => ({
    loading: false,
    loaded: false,
    params: state.params,
    count: 0,
    items: [],
    error,
  }),
}));
