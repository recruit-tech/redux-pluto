import { createAction, handleActions } from "redux-actions";
import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { createAsyncActionTypes } from "./utils";

/**
 * Action types
 */
export const [
  SEARCH_STYLE_REQUEST,
  SEARCH_STYLE_SUCCESS,
  SEARCH_STYLE_FAIL
] = createAsyncActionTypes("redux-proto/style/search");

/**
 * Action creators
 */
const searchStyleRequest = createAction(SEARCH_STYLE_REQUEST);

const searchStyleSuccess = createAction(SEARCH_STYLE_SUCCESS);

const searchStyleFail = createAction(SEARCH_STYLE_FAIL);

export function searchStyle(params) {
  return steps(
    searchStyleRequest({ resource: "style", params }),
    ({ payload }) => fetchrRead(payload),
    [searchStyleSuccess, searchStyleFail]
  );
}

/**
 * Initial state
 */
export const INITIAL_STATE = {
  loading: false,
  loaded: false,
  params: null,
  count: 0,
  items: []
};

/**
 * Reducer
 */
export default handleActions(
  {
    [SEARCH_STYLE_REQUEST]: (state, action) => {
      const { payload: { params } } = action;

      return {
        loading: true,
        loaded: false,
        params,
        count: state.count,
        items: state.items
      };
    },

    [SEARCH_STYLE_SUCCESS]: (state, action) => {
      const {
        payload: { data: { results_available: count, style: items } }
      } = action;

      return {
        loading: false,
        loaded: true,
        params: state.params,
        count: +count,
        items
      };
    },

    [SEARCH_STYLE_FAIL]: (state, action) => {
      const { error } = action;

      return {
        loading: false,
        loaded: false,
        params: state.params,
        count: 0,
        items: [],
        error
      };
    }
  },
  INITIAL_STATE
);
