import { createAction, handleActions } from 'redux-actions';
import { compose } from 'recompose';
import { initialState } from './utils';

/**
 * Action types
 */
const LOADING = 'redux-proto/loading/';
export const START_LOADING = LOADING + 'start';
export const STOP_LOADING = LOADING + 'stop';

/**
 * Action creators
 */
export const startLoading = createAction(START_LOADING);

export const stopLoading = createAction(STOP_LOADING);

/**
 * Initial state
 */
const INITIAL_STATE = false;

/**
 * Reducer
 */
export default compose(
  initialState(INITIAL_STATE),
)(handleActions({
  [START_LOADING]: () => true,
  [STOP_LOADING]: () => false,
}, INITIAL_STATE));
