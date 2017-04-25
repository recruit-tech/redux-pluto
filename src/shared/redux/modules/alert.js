import { createAction, handleActions } from 'redux-actions';

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
export default handleActions({
  [ALERT_SHOW]: (state, action) => {
    const { payload } = action;

    return {
      message: payload,
    };
  },

  [ALERT_CLEAR]: (state, action) => (INITIAL_STATE),
}, INITIAL_STATE);
