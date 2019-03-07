import { createAction, handleAction } from "redux-actions";

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
  token: string | null;
};
const INITIAL_STATE: State = {
  token: null,
};

/**
 * Reducer
 */
export default handleAction<State, any>(
  CSRF,
  (state, action) => ({
    ...state,
    token: action.payload,
  }),
  INITIAL_STATE,
);
