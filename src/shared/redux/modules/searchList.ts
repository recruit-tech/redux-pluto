import { createAction, handleActions } from "redux-actions";
import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { range } from "lodash/fp";
import { createAsyncActionTypes } from "./utils";

export const SEARCH_MAX_COUNT = 50;

/**
 * Action types
 */
const SALON_LIST = "redux-proto/searchList";

export const [
  SALON_LIST_SEARCH_REQUEST,
  SALON_LIST_SEARCH_SUCCESS,
  SALON_LIST_SEARCH_FAIL,
] = createAsyncActionTypes(`${SALON_LIST}/search`);

export const SALON_LIST_CLEAR_SEARCH_REQUEST = `${SALON_LIST}/clear_search/request`;

export const [
  SALON_LIST_SEARCH_MORE_REQUEST,
  SALON_LIST_SEARCH_MORE_SUCCESS,
  SALON_LIST_SEARCH_MORE_FAIL,
] = createAsyncActionTypes(`${SALON_LIST}/search_more`);

/**
 * Action creators
 */

const searchSearchListRequest = createAction(SALON_LIST_SEARCH_REQUEST);
const searchSearchListsuccess = createAction(SALON_LIST_SEARCH_SUCCESS);
const searchSearchListFail = createAction(SALON_LIST_SEARCH_FAIL);

export function searchSearchList(params: any) {
  return steps(
    searchSearchListRequest({ resource: "search", params }),
    ({ payload }) => fetchrRead(payload),
    [
      payload => searchSearchListsuccess({ params, data: payload.data }),
      searchSearchListFail,
    ],
  );
}

export const clearSearchSearchList = createAction(
  SALON_LIST_CLEAR_SEARCH_REQUEST,
);

const searchMoreSearchListRequest = createAction(
  SALON_LIST_SEARCH_MORE_REQUEST,
);
const searchMoreSearchListsuccess = createAction(
  SALON_LIST_SEARCH_MORE_SUCCESS,
);
const searchMoreSearchListFail = createAction(SALON_LIST_SEARCH_MORE_FAIL);

export function searchMoreSearchList(params: any) {
  return steps(
    searchMoreSearchListRequest({ resource: "search", params }),
    ({ payload }) => fetchrRead(payload),
    [
      payload => searchMoreSearchListsuccess({ params, data: payload.data }),
      searchMoreSearchListFail,
    ],
  );
}

/**
 * Initial state
 */
export type State = {
  loading: boolean;
  loaded: boolean;
  params: Object;
  count: number;
  page: number;
  pages: Array<any>;
  items: Object;
  canGetNext: boolean;
  canGetPrev: boolean;
  shouldAdjustScroll: boolean;
  forceScrollTo: { x: number; y: number };
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
  forceScrollTo: { x: 0, y: 100 },
};

/**
 * Reducer
 */
export default handleActions(
  {
    [SALON_LIST_SEARCH_REQUEST]: state => ({
      ...state,
      loading: true,
      loaded: false,
    }),

    [SALON_LIST_SEARCH_SUCCESS]: (state, action) => {
      const {
        payload: {
          params,
          data: {
            results_available: count,
            results_start: start,
            search: items,
          },
        },
      } = action as any;
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
        forceScrollTo:
          params.page && page > 0 ? INITIAL_STATE.forceScrollTo : {},
      };
    },

    [SALON_LIST_SEARCH_FAIL]: (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      count: 0,
      items: {},
      error,
    }),

    [SALON_LIST_CLEAR_SEARCH_REQUEST]: (state, action) => ({
      ...INITIAL_STATE,
      loaded: true,
    }),

    [SALON_LIST_SEARCH_MORE_REQUEST]: state => ({
      ...state,
      loading: true,
      loaded: false,
    }),

    [SALON_LIST_SEARCH_MORE_SUCCESS]: (state, action) => {
      const {
        payload: {
          params,
          data: {
            results_available: count,
            results_start: start,
            search: items,
          },
        },
      } = action as any;

      return {
        ...state,
        loading: false,
        loaded: true,
        count: +count,
        page: +params.page,
        pages: createPages(+count),
        items: {
          ...state.items,
          [+params.page]: items || [],
        },
        item: {},
        canGetNext: canGetNext(count, start),
        canGetPrev: canGetPrev(+params.page),
        shouldAdjustScroll:
          state.page > +params.page && !state.items[+params.page],
        forceScrollTo: {},
      };
    },

    [SALON_LIST_SEARCH_MORE_FAIL]: (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    }),
  },
  INITIAL_STATE,
);

function canGetNext(count, start) {
  return +count > +start + SEARCH_MAX_COUNT;
}

function canGetPrev(page) {
  return +page > 0;
}

function createPages(count) {
  const maxPage = count / SEARCH_MAX_COUNT;
  return range(0, maxPage);
}
