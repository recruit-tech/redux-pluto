import { createAction, handleActions } from 'redux-actions';
import { steps } from 'redux-effects-steps';
import { fetchrRead } from 'redux-effects-fetchr';
import { createAsyncActionTypes } from './utils';

/**
 * Action types
 */
const SALON = 'redux-proto/salon';

export const [
  FIND_SALON_BY_ID_REQUEST,
  FIND_SALON_BY_ID_SUCCESS,
  FIND_SALON_BY_ID_FAIL,
] = createAsyncActionTypes(`${SALON}/find_id`);

/**
 * Action creators
 */

const findSalonByIdRequest = createAction(FIND_SALON_BY_ID_REQUEST);
const findSalonByIdSuccess = createAction(FIND_SALON_BY_ID_SUCCESS);
const findSalonByIdFail = createAction(FIND_SALON_BY_ID_FAIL);

export function findSalonById(id) {
  return steps(
    findSalonByIdRequest({ resource: 'salon', params: { id } }),
    ({ payload }) => fetchrRead(payload),
    [findSalonByIdSuccess, findSalonByIdFail],
  );
}

/**
 * Initial state
 */
export const INITIAL_STATE = {
  loading: false,
  loaded: false,
  item: {},
};

/**
 * Reducer
 */
export default handleActions({
  [FIND_SALON_BY_ID_REQUEST]: (state) => ({
    ...state,
    loading: true,
    loaded: false,
  }),

  [FIND_SALON_BY_ID_SUCCESS]: (state, action) => {
    const { payload: { data: { salon: items } } } = action;

    return {
      ...state,
      loading: false,
      loaded: true,
      item: items[0],
    };
  },

  [FIND_SALON_BY_ID_FAIL]: (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  }),
}, INITIAL_STATE);
