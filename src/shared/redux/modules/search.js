/* @flow */
import { createAction, handleActions, type Reducer } from "redux-actions";
import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { createAsyncActionTypes } from "./utils";

/**
 * Action types
 */
const SALON = "redux-proto/search";

export const [
  FIND_SALON_BY_ID_REQUEST,
  FIND_SALON_BY_ID_SUCCESS,
  FIND_SALON_BY_ID_FAIL,
] = createAsyncActionTypes(`${SALON}/find_id`);

/**
 * Action creators
 */

const findSalonByIdRequest = createAction(FIND_SALON_BY_ID_REQUEST);
const findSalonByIdSuccess = createAction(FIND_SALON_BY_ID_SUCCESS);
const findSalonByIdFail = createAction(FIND_SALON_BY_ID_FAIL);

export function findSalonById(id: string) {
  return steps(
    findSalonByIdRequest({ resource: "search", params: { id } }),
    ({ payload }) => fetchrRead(payload),
    [findSalonByIdSuccess, findSalonByIdFail],
  );
}

/**
 * Initial state
 */

export type State = {
  loading: boolean,
  loaded: boolean,
  item: ?{
    name: string,
    urls: {
      pc: string,
    },
  },
};
export const INITIAL_STATE = {
  loading: false,
  loaded: false,
  item: null,
};

/**
 * Reducer
 */
export default (handleActions(
  {
    [FIND_SALON_BY_ID_REQUEST]: state => ({
      ...state,
      loading: true,
      loaded: false,
    }),

    [FIND_SALON_BY_ID_SUCCESS]: (state, action) => {
      const {
        payload: {
          data: { search: items },
        },
      } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        item: items[0],
      };
    },

    [FIND_SALON_BY_ID_FAIL]: (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    }),
  },
  INITIAL_STATE,
): Reducer<State, *>);
