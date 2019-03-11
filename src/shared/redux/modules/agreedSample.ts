import { createAction } from "redux-actions";
import { fetchrRead } from "redux-effects-fetchr";
import { steps } from "redux-effects-steps";

/**
 * Action types
 */

const AGREED_SAMPLE_GET_TEXT_REQUEST =
  "redux-proto/agreedsample/get-text-request";
const AGREED_SAMPLE_GET_TEXT_SUCCESS =
  "redux-proto/agreedsample/get-text-success";
const AGREED_SAMPLE_GET_TEXT_FAIL = "redux-proto/agreedsample/get-text-fail";

interface GetTextRequestAction {
  type: typeof AGREED_SAMPLE_GET_TEXT_REQUEST;
}

interface GetTextSuccessAction {
  type: typeof AGREED_SAMPLE_GET_TEXT_SUCCESS;
}

interface GetTextFailAction {
  type: typeof AGREED_SAMPLE_GET_TEXT_FAIL;
}

type Action = GetTextRequestAction | GetTextSuccessAction | GetTextFailAction;

/**
 * Action creators
 */
export const getTextRequest = createAction(AGREED_SAMPLE_GET_TEXT_REQUEST);
export const getTextSuccess = createAction(AGREED_SAMPLE_GET_TEXT_SUCCESS);
export const getTextFail = createAction(AGREED_SAMPLE_GET_TEXT_FAIL);

export function getText(status?: string | null): Promise<{ text: string }> {
  return steps(
    getTextRequest(),
    fetchrRead({
      resource: "agreedSample",
      params: { status },
    }),
    [getTextSuccess, getTextFail] as any, // TODO: Add better types
  );
}

/**
 * Initial state
 **/

export type State = {
  loading: boolean;
  loaded: boolean;
  text: string;
  error?: any;
};

const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  text: "",
};

export default (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case AGREED_SAMPLE_GET_TEXT_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case AGREED_SAMPLE_GET_TEXT_SUCCESS: {
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
    }
    case AGREED_SAMPLE_GET_TEXT_FAIL: {
      const { error } = action as any;
      return {
        ...state,
        error,
        loading: false,
        loaded: false,
      };
    }
  }
  return state;
};
