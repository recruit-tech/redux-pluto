/* @flow */
import { createAction, handleAction, type Reducer } from "redux-actions";

/**
 * Action types
 */
const CSRF = "redux-proto/csrf";

/**
 * Action creators
 */
export const csrfAction = createAction<string, *>(CSRF);

/**
 * Initial state
 */

export type State = {
  token: ?string,
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
): Reducer<State, *>);
