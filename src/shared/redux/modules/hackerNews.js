/* @flow */
import { createAction, handleActions, type Reducer } from "redux-actions";
import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { createAsyncActionTypes } from "./utils";

/**
 * Action types
 */
const HACKER_NEWS = "redux-proto/hackerNews";

export const [FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAIL] = createAsyncActionTypes(
  `${HACKER_NEWS}/fetch-items`
);

/**
 * Action creators
 */

const fetchItemsRequest = createAction(FETCH_ITEMS_REQUEST);
const fetchItemsSuccess = createAction(FETCH_ITEMS_SUCCESS);
const fetchItemsFail = createAction(FETCH_ITEMS_FAIL);

export function fetchItems(page: number = 1) {
  return steps(
    fetchItemsRequest({ resource: "hackerNews", params: { page } }),
    ({ payload }) => fetchrRead(payload),
    [fetchItemsSuccess, fetchItemsFail]
  );
}

/**
 * Initial state
 */

type Item = {
  by: string,
  descendants: string,
  id: number,
  kids: number[],
  score: number,
  time: number,
  title: string,
  type: string,
  url: string
};

export type State = {
  items: Item[],
  page: number,
  loading: boolean
};

export const INITIAL_STATE: State = {
  items: [],
  page: 1,
  loading: false
};

/**
 * Reducer
 */
export default (handleActions(
  {
    [FETCH_ITEMS_REQUEST]: state => ({
      ...state,
      loading: true
    }),

    [FETCH_ITEMS_SUCCESS]: (state, action) => {
      const {
        payload: { data }
      } = action;

      return {
        ...state,
        loading: false,
        items: data
      };
    },

    [FETCH_ITEMS_FAIL]: (state, { error }) => ({
      ...state,
      loading: false
    })
  },
  INITIAL_STATE
): Reducer<State, *>);
