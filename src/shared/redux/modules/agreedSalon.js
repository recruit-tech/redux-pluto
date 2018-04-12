/* @flow */
import { createAction, handleActions, type Reducer } from "redux-actions";
import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { createAsyncActionTypes } from "./utils";

/**
 * Action types
 */
const AGREED_SALON = "redux-proto/agreedSalon";

export const [
  FIND_AGREED_SALON_BY_ID_REQUEST,
  FIND_AGREED_SALON_BY_ID_SUCCESS,
  FIND_AGREED_SALON_BY_ID_FAIL
] = createAsyncActionTypes(`${AGREED_SALON}/find_id`);

type FindSalonByIdRequestAction = {
  type: typeof FIND_AGREED_SALON_BY_ID_REQUEST
};

type FindSalonByIdSuccessAction = {
  type: typeof FIND_AGREED_SALON_BY_ID_SUCCESS,
  payload: {
    data: {
      salon: Array<any>
    }
  }
};
type FindSalonByIdFailAction = {
  type: typeof FIND_AGREED_SALON_BY_ID_FAIL,
  error: {}
};

/**
 * Action creators
 */

const findSalonByIdRequest = createAction(FIND_AGREED_SALON_BY_ID_REQUEST);
const findSalonByIdSuccess = createAction(FIND_AGREED_SALON_BY_ID_SUCCESS);
const findSalonByIdFail = createAction(FIND_AGREED_SALON_BY_ID_FAIL);

export function findSalonById(id: string): Promise<FindSalonByIdSuccessAction> {
  return steps(
    findSalonByIdRequest({ resource: "agreedSalon", params: { id } }),
    ({ payload }) => fetchrRead(payload),
    [findSalonByIdSuccess, findSalonByIdFail]
  );
}

/**
 * Initial state
 */

export type State = {
  loading: boolean,
  loaded: boolean,
  item: ?{
    name: string,
    urls: {
      pc: string
    }
  }
};

export const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  item: null
};

/**
 * Reducer
 */
export default (handleActions(
  {
    [FIND_AGREED_SALON_BY_ID_REQUEST](state, _action: FindSalonByIdRequestAction) {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    },

    [FIND_AGREED_SALON_BY_ID_SUCCESS](state, action: FindSalonByIdSuccessAction) {
      const { payload: { data: { salon: items } } } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        item: items[0]
      };
    },

    [FIND_AGREED_SALON_BY_ID_FAIL](state, { error }: FindSalonByIdFailAction) {
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
  },
  INITIAL_STATE
): Reducer<State, *>);
