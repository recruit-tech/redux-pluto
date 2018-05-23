/* @flow */
import { createAction, handleActions, type Reducer } from "redux-actions";
import { steps } from "redux-effects-steps";
import { fetchrUpdate } from "redux-effects-fetchr";
import { createAsyncActionTypes } from "./utils";

/**
 * Action types
 */
export const [
  COUNTER_INCREMENT_REQUEST,
  COUNTER_INCREMENT_SUCCESS,
  COUNTER_INCREMENT_FAIL,
] = createAsyncActionTypes("redux-proto/counter/increment");

/**
 * Action creators
 */
const incrementRequest = createAction(COUNTER_INCREMENT_REQUEST);

const incrementSuccess = createAction(COUNTER_INCREMENT_SUCCESS);

const incrementFail = createAction(COUNTER_INCREMENT_FAIL);

export function increment() {
  return steps(
    incrementRequest({ resource: "counter" }),
    ({ payload }) => fetchrUpdate(payload),
    [incrementSuccess, incrementFail],
  );
}

/**
 * Initial state
 */

export type State = {
  value: number,
};
const INITIAL_STATE: State = {
  value: 0,
};

/**
 * Reducer
 */
export default (handleActions(
  {
    [COUNTER_INCREMENT_SUCCESS]: (state, action) => {
      const {
        payload: { data },
      } = action;

      return {
        value: data,
      };
    },
  },
  INITIAL_STATE,
): Reducer<State, *>);
