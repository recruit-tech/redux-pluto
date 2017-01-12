import { createAction, handleActions } from 'redux-actions';
import { compose } from 'recompose';
import { steps } from 'redux-effects-steps';
import { fetchrUpdate } from 'redux-effects-fetchr';
import { initialState } from './utils';

/**
 * Action types
 */
const COUNTER_INCREMENT = 'redux-proto/counter/increment/';
export const COUNTER_INCREMENT_REQUEST = COUNTER_INCREMENT + 'request';
export const COUNTER_INCREMENT_SUCCESS = COUNTER_INCREMENT + 'success';
export const COUNTER_INCREMENT_FAIL = COUNTER_INCREMENT + 'fail';

/**
 * Action creators
 */
const incrementRequest = createAction(COUNTER_INCREMENT_REQUEST);

const incrementSuccess = createAction(COUNTER_INCREMENT_SUCCESS);

const incrementFail = createAction(COUNTER_INCREMENT_FAIL);

export function increment() {
  return steps(
    incrementRequest(),
    fetchrUpdate('counter'),
    [incrementSuccess, incrementFail],
  );
}

/**
 * Initial state
 */
const INITIAL_STATE = {
  value: 0,
};

/**
 * Reducer
 */
export default compose(
  initialState(INITIAL_STATE),
)(handleActions({
  [COUNTER_INCREMENT_SUCCESS]: (state, { payload: { data } }) => ({
    value: data,
  }),
}, INITIAL_STATE));
