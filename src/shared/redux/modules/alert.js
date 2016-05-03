import { createAction, handleActions } from 'redux-actions';
import { compose } from 'recompose';
import { initialState } from './utils';

/**
 * Action types
 */
const ALERT = 'redux-proto/app/alert/';
export const ALERT_SHOW = ALERT + 'show';
export const ALERT_CLEAR = ALERT + 'clear';

/**
 * Action creators
 */
export const showAlert = createAction(ALERT_SHOW, (message) => message);

export const clearAlert = createAction(ALERT_CLEAR);

/**
 * Initial state
 */
const INITIAL_STATE = {
  message: '',
};

/**
 * Reducer
 */
export default compose(
  initialState(INITIAL_STATE),
)(handleActions({
  [ALERT_SHOW]: (state, { payload }) => ({
    message: payload,
  }),

  [ALERT_CLEAR]: (state, action) => (INITIAL_STATE),
}));
