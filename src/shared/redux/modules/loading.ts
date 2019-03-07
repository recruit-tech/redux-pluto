import { createAction, handleActions } from "redux-actions";

/**
 * Action types
 */
const LOADING = "redux-proto/loading";
export const START_LOADING = `${LOADING}/start`;
export const STOP_LOADING = `${LOADING}/stop`;

/**
 * Action creators
 */
export const startLoading = createAction(START_LOADING);

export const stopLoading = createAction(STOP_LOADING);

/**
 * Initial state
 */

export type State = boolean;
const INITIAL_STATE: State = false;

/**
 * Reducer
 */
export default handleActions<State>(
  {
    [START_LOADING]: () => true,
    [STOP_LOADING]: () => false,
  },
  INITIAL_STATE,
);
