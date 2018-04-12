/* @flow */
import { createAction, handleActions, type Reducer } from "redux-actions";
import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { range } from "lodash/fp";
import { createAsyncActionTypes } from "./utils";

export const SALON_SEARCH_MAX_COUNT = 50;

/**
 * Action types
 */
const SALON_LIST = "redux-proto/salonList";

export const [
  SALON_LIST_SEARCH_REQUEST,
  SALON_LIST_SEARCH_SUCCESS,
  SALON_LIST_SEARCH_FAIL
] = createAsyncActionTypes(`${SALON_LIST}/search`);

export const SALON_LIST_CLEAR_SEARCH_REQUEST = `${SALON_LIST}/clear_search/request`;

export const [
  SALON_LIST_SEARCH_MORE_REQUEST,
  SALON_LIST_SEARCH_MORE_SUCCESS,
  SALON_LIST_SEARCH_MORE_FAIL
] = createAsyncActionTypes(`${SALON_LIST}/search_more`);

/**
 * Action creators
 */

const searchSalonListRequest = createAction(SALON_LIST_SEARCH_REQUEST);
const searchSalonListSuccess = createAction(SALON_LIST_SEARCH_SUCCESS);
const searchSalonListFail = createAction(SALON_LIST_SEARCH_FAIL);

export function searchSalonList(params: *) {
  return steps(
    searchSalonListRequest({ resource: "salon", params }),
    ({ payload }) => fetchrRead(payload),
    [
      payload => searchSalonListSuccess({ params, data: payload.data }),
      error => searchSalonListFail({ params, error })
    ]
  );
}

export const clearSearchSalonList = createAction(SALON_LIST_CLEAR_SEARCH_REQUEST);

const searchMoreSalonListRequest = createAction(SALON_LIST_SEARCH_MORE_REQUEST);
const searchMoreSalonListSuccess = createAction(SALON_LIST_SEARCH_MORE_SUCCESS);
const searchMoreSalonListFail = createAction(SALON_LIST_SEARCH_MORE_FAIL);

export function searchMoreSalonList(params: *) {
  return steps(
    searchMoreSalonListRequest({ resource: "salon", params }),
    ({ payload }) => fetchrRead(payload),
    [
      payload => searchMoreSalonListSuccess({ params, data: payload.data }),
      error => searchMoreSalonListFail({ params, error })
    ]
  );
}

/**
 * Initial state
 */
export type State = {
  loading: boolean,
  loaded: boolean,
  params: Object,
  count: number,
  page: number,
  pages: Array<*>,
  items: Object,
  canGetNext: boolean,
  canGetPrev: boolean,
  shouldAdjustScroll: boolean,
  forceScrollTo: { x: number, y: number }
};
export const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  params: {},
  count: 0,
  page: 0,
  pages: [],
  items: {},
  canGetNext: false,
  canGetPrev: false,
  shouldAdjustScroll: false,
  forceScrollTo: { x: 0, y: 100 }
};

/**
 * Reducer
 */
export default (handleActions(
  {
    [SALON_LIST_SEARCH_REQUEST]: state => ({
      ...state,
      loading: true,
      loaded: false
    }),

    [SALON_LIST_SEARCH_SUCCESS]: (state, action) => {
      const {
        payload: { params, data: { results_available: count, results_start: start, salon: items } }
      } = action;
      const page = +params.page || 0;

      return {
        ...state,
        loading: false,
        loaded: true,
        count: +count,
        page,
        pages: createPages(+count),
        items: { [page]: items || [] },
        canGetNext: canGetNext(count, start),
        canGetPrev: canGetPrev(page),
        forceScrollTo: params.page && page > 0 ? INITIAL_STATE.forceScrollTo : {}
      };
    },

    [SALON_LIST_SEARCH_FAIL]: (state, action) => {
      const { error } = action;

      return {
        ...state,
        loading: false,
        loaded: false,
        count: 0,
        items: {},
        error
      };
    },

    [SALON_LIST_CLEAR_SEARCH_REQUEST]: (state, action) => ({
      ...INITIAL_STATE,
      loaded: true
    }),

    [SALON_LIST_SEARCH_MORE_REQUEST]: state => ({
      ...state,
      loading: true,
      loaded: false
    }),

    [SALON_LIST_SEARCH_MORE_SUCCESS]: (state, action) => {
      const {
        payload: { params, data: { results_available: count, results_start: start, salon: items } }
      } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        count: +count,
        page: +params.page,
        pages: createPages(+count),
        items: {
          ...state.items,
          [+params.page]: items || []
        },
        item: {},
        canGetNext: canGetNext(count, start),
        canGetPrev: canGetPrev(+params.page),
        shouldAdjustScroll: state.page > +params.page && !state.items[+params.page],
        forceScrollTo: {}
      };
    },

    [SALON_LIST_SEARCH_MORE_FAIL]: (state, action) => {
      const { error } = action;

      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
  },
  INITIAL_STATE
): Reducer<State, *>);

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
