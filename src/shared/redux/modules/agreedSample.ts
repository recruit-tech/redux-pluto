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

type GetTextRequestPayload = {
  resource: string;
  params: { status: string | null };
};

type GetAgreedSampleType = {
  data: {
    text: string;
  };
};

type GetTextRequestAction = {
  type: typeof AGREED_SAMPLE_GET_TEXT_REQUEST;
  payload: GetTextRequestPayload;
};

type GetTextSuccessAction = {
  type: typeof AGREED_SAMPLE_GET_TEXT_SUCCESS;
  payload: GetAgreedSampleType;
};

type GetTextFailAction = {
  type: typeof AGREED_SAMPLE_GET_TEXT_FAIL;
  payload: Error;
  error: boolean;
};

type Action = GetTextRequestAction | GetTextSuccessAction | GetTextFailAction;

/**
 * Action creators
 */
export function getTextRequest(
  payload: GetTextRequestPayload,
): GetTextRequestAction {
  return {
    type: AGREED_SAMPLE_GET_TEXT_REQUEST,
    payload,
  };
}
export function getTextSuccess(res: GetAgreedSampleType): GetTextSuccessAction {
  return {
    type: AGREED_SAMPLE_GET_TEXT_SUCCESS,
    payload: res,
  };
}
export function getTextFail(error: Error): GetTextFailAction {
  return {
    type: AGREED_SAMPLE_GET_TEXT_FAIL,
    payload: error,
    error: true,
  };
}

export function getText(
  status: string | null,
): Promise<GetTextSuccessAction | GetTextFailAction> {
  return steps(
    getTextRequest({
      resource: "agreedSample",
      params: { status },
    }),
    ({ payload }) => fetchrRead(payload) as any,
    [getTextSuccess, getTextFail],
  );
}

/**
 * Initial state
 **/

export type State = {
  loading: boolean;
  loaded: boolean;
  text: string;
  error?: boolean;
};

const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  text: "",
};

export default function(state: State = INITIAL_STATE, action: Action): State {
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
      } = action;
      return {
        ...state,
        text,
        loading: false,
        loaded: true,
      };
    }
    case AGREED_SAMPLE_GET_TEXT_FAIL: {
      const { error } = action;
      return {
        ...state,
        error,
        loading: false,
        loaded: false,
      };
    }
    default: {
      return state;
    }
  }
}
