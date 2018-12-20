import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { range } from "lodash/fp";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

const actionCreator = actionCreatorFactory("redux-pluto/searchList");

export const SEARCH_MAX_COUNT = 50;

/**
 * Action creators
 */

const salonListSearch = actionCreator.async<
  {
    resource: string;
    params: {
      page: number;
    };
  },
  {
    data: {
      results_available: number;
      results_start: string;
      search: Array<{}>;
    };
  },
  Error
>("salon_list_search");

export function searchSearchList(params: { page: number }) {
  const ctx = { resource: "search", params };
  return steps(
    salonListSearch.started(ctx),
    ({ payload }: { payload: any }) => fetchrRead(payload),
    [
      (payload: any) =>
        salonListSearch.done({
          params: ctx,
          result: { params: params, data: payload.data },
        }),
      (error: Error) =>
        salonListSearch.failed({
          params: ctx,
          error,
        }),
    ],
  );
}

export const clearSearchSearchList = actionCreator<any>("clear_search");
export const SALON_LIST_CLEAR_SEARCH_REQUEST = clearSearchSearchList.type;

const searchMore = actionCreator.async<
  {
    resource: string;
    params: any;
  },
  {
    data: any; // TODO: SearchList
  },
  Error
>("search_more");

export function searchMoreSearchList(data: any) {
  const params = { resource: "search", params: data };
  return steps(
    searchMore.started(params),
    ({ payload }: { payload: any }) => fetchrRead(payload),
    [
      (payload: any) =>
        searchMore.done({ params, result: { params, data: payload.data } }),
      error => searchMore.failed({ error, params }),
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

export default reducerWithInitialState<State>(INITIAL_STATE)
  .case(salonListSearch.started, state => {
    return { ...state, loading: true, loaded: false };
  })
  .case(salonListSearch.done, (state, payload) => {
    const page: number = +payload.params.params.page || 0;
    const count = payload.result.data.results_available;
    const start = payload.result.data.results_available;
    const items = payload.result.data.search;
    return {
      ...state,
      loading: false,
      loaded: true,
      count: payload.result.data.results_available,
      page,
      pages: createPages(+count),
      items: { [page]: items || [] },
      canGetNext: canGetNext(count, start),
      canGetPrev: canGetPrev(page),
      forceScrollTo: page && page > 0 ? INITIAL_STATE.forceScrollTo : {},
    };
  })
  .case(
    salonListSearch.failed,
    (state: State, { error }: ReturnType<typeof salonListSearch.failed>) => {
      return {
        ...state,
        loading: false,
        loaded: false,
        count: 0,
        items: {},
        error,
      };
    },
  );

// export default (state: State, ): State => {

// }

// export default handleActions(
//   {
//     [SALON_LIST_CLEAR_SEARCH_REQUEST]: (state, action) => ({
//       ...INITIAL_STATE,
//       loaded: true,
//     }),

//     [SALON_LIST_SEARCH_MORE_REQUEST]: state => ({
//       ...state,
//       loading: true,
//       loaded: false,
//     }),

//     [SALON_LIST_SEARCH_MORE_SUCCESS]: (state, action) => {
//       const {
//         payload: {
//           params,
//           data: {
//             results_available: count,
//             results_start: start,
//             search: items,
//           },
//         },
//       } = action as any;

//       return {
//         ...state,
//         loading: false,
//         loaded: true,
//         count: +count,
//         page: +params.page,
//         pages: createPages(+count),
//         items: {
//           ...state.items,
//           [+params.page]: items || [],
//         },
//         item: {},
//         canGetNext: canGetNext(count, start),
//         canGetPrev: canGetPrev(+params.page),
//         shouldAdjustScroll:
//           state.page > +params.page && !(state.items as any)[+params.page],
//         forceScrollTo: {},
//       };
//     },

//     [SALON_LIST_SEARCH_MORE_FAIL]: (state, { error }) => ({
//       ...state,
//       loading: false,
//       loaded: false,
//       error,
//     }),
//   },
//   INITIAL_STATE,
// );

function canGetNext(count: number, start: number) {
  return +count > +start + SEARCH_MAX_COUNT;
}

function canGetPrev(page: number) {
  return +page > 0;
}

function createPages(count: number) {
  const maxPage = count / SEARCH_MAX_COUNT;
  return range(0, maxPage);
}
