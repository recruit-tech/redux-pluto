import { createAction, handleActions } from "redux-actions";
import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { HackerNewsItem } from "../../types/HackerNews";
import { createAsyncActionTypes } from "./utils";

/**
 * Action types
 */
const HACKER_NEWS = "redux-proto/hackerNews";

export const [
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAIL,
] = createAsyncActionTypes(`${HACKER_NEWS}/fetch-items`);

/**
 * Action creators
 */

const fetchItemsRequest = createAction(FETCH_ITEMS_REQUEST);
const fetchItemsSuccess = createAction(FETCH_ITEMS_SUCCESS);
const fetchItemsFail = createAction(FETCH_ITEMS_FAIL);

export function fetchItems(page: number = 1) {
  return steps(
    fetchItemsRequest({ resource: "hackerNews", params: { page } }),
    ({ payload }: any) => fetchrRead(payload),
    [fetchItemsSuccess, fetchItemsFail],
  );
}

/**
 * Initial state
 */

export type State = {
  items: HackerNewsItem[];
  page: number;
  loading: boolean;
};

export const INITIAL_STATE: State = {
  items: [],
  page: 1,
  loading: false,
};

/**
 * Reducer
 */
export default handleActions<State>(
  {
    [FETCH_ITEMS_REQUEST]: state => ({
      ...state,
      loading: true,
    }),

    [FETCH_ITEMS_SUCCESS]: (state, action) => {
      const {
        payload: { data },
      } = action as any;

      return {
        ...state,
        loading: false,
        items: data,
      };
    },

    [FETCH_ITEMS_FAIL]: (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }),
  },
  INITIAL_STATE,
);
