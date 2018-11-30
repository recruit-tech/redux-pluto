/* @flow */
import { createAction, handleAction, Reducer } from "redux-actions";

/**
 * Action types
 */
const CSRF = "redux-proto/csrf";

/**
 * Action creators
 */
export const csrfAction = createAction(CSRF);

/**
 * Initial state
 */

export type State = {
  token: string | null,
};
const INITIAL_STATE: State = {
  token: null,
};

/**
 * Reducer
 */
export default (handleAction(
  CSRF,
  (state, action) => ({
    ...state,
    token: action.payload,
  }),
  INITIAL_STATE,
) as Reducer<State, any>);
