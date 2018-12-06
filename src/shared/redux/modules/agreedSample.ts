import { createAction, handleActions, Reducer } from "redux-actions";
import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { createAsyncActionTypes } from "./utils";

/**
 * Action types
 */
const AGREED_SAMPLE = "redux-proto/agreedsample";

export const [
  AGREED_SAMPLE_GET_TEXT_REQUEST,
  AGREED_SAMPLE_GET_TEXT_SUCCESS,
  AGREED_SAMPLE_GET_TEXT_FAIL,
] = createAsyncActionTypes(`${AGREED_SAMPLE}/get`);

/**
 * Action creators
 */
export const getTextRequest = createAction(AGREED_SAMPLE_GET_TEXT_REQUEST);
export const getTextSuccess = createAction(AGREED_SAMPLE_GET_TEXT_SUCCESS);
export const getTextFail = createAction(AGREED_SAMPLE_GET_TEXT_FAIL);

export function getText(status?: string | null): Promise<{ text: string }> {
  return steps(
    getTextRequest(),
    fetchrRead({ resource: "agreedSample", params: { status } }),
    [getTextSuccess, getTextFail],
  );
}

/**
 * Initial state
 */

export type State = {
  loading: boolean,
  loaded: boolean,
  text: string,
};

const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  text: "",
};

export default handleActions(
  {
    [AGREED_SAMPLE_GET_TEXT_REQUEST]: state => ({
      ...state,
      loading: true,
      loaded: false,
    }),
    [AGREED_SAMPLE_GET_TEXT_SUCCESS]: (state, action) => {
      const {
        payload: {
          data: { text },
        },
      } = action as any;
      return {
        ...state,
        text,
        loading: false,
        loaded: true,
      };
    },
    [AGREED_SAMPLE_GET_TEXT_FAIL]: (state, action) => {
      const { error } = action;
      return {
        ...state,
        error,
        loading: false,
        loaded: false,
      };
    },
  },
  INITIAL_STATE,
) as Reducer<State, any>;
