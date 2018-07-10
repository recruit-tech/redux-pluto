/* @flow */
import { createAction, handleActions, type Reducer } from "redux-actions";

/**
 * Action types
 */
const RECORDER = "redux-proto/recorder";
export const RECORD = `${RECORDER}/record`;

/**
 * Action creators
 */
export const record = createAction(RECORD);


/**
 * Initial state
 */

export type State = boolean;
const INITIAL_STATE: State = {};

/**
 * Reducer
 */
export default (handleActions(
  {
    [RECORD]: () => true,
  },
  INITIAL_STATE,
): Reducer<State, *>);
