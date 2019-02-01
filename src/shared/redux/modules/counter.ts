import { steps } from "redux-effects-steps";
import { fetchrUpdate } from "redux-effects-fetchr";

export const COUNTER_INCREMENT_REQUEST =
  "redux-proto/counter/increment/request";
export const COUNTER_INCREMENT_SUCCESS =
  "redux-proto/counter/increment/success";
export const COUNTER_INCREMENT_FAIL = "redux-proto/counter/increment/fail";

export type IncrementRequest = {
  type: typeof COUNTER_INCREMENT_REQUEST;
  payload: {
    resource: "counter";
  };
};

export type IncrementSuccess = {
  type: typeof COUNTER_INCREMENT_SUCCESS;
  payload: {
    data: number;
  };
};

export type IncrementFail = {
  type: typeof COUNTER_INCREMENT_FAIL;
  payload: Error;
  error: true;
};

/**
 * Action creators
 */

const incrementRequest = (): IncrementRequest => {
  return {
    type: COUNTER_INCREMENT_REQUEST,
    payload: {
      resource: "counter",
    },
  };
};

const incrementSuccess = (payload: { data: number }): IncrementSuccess => {
  return {
    type: COUNTER_INCREMENT_SUCCESS,
    payload,
  };
};

const incrementFail = (e: Error): IncrementFail => {
  return {
    type: COUNTER_INCREMENT_FAIL,
    payload: e,
    error: true,
  };
};

export function increment(): Promise<IncrementSuccess | IncrementFail> {
  // prettier-ignore
  return steps<IncrementSuccess, IncrementFail>(
    incrementRequest(),
    ({ payload }: IncrementRequest) => {
      return fetchrUpdate(payload)
    },
    [incrementSuccess, incrementFail]);
}

export type State = {
  value: number;
};

const INITIAL_STATE: State = {
  value: 0,
};

export type Action = IncrementRequest | IncrementSuccess | IncrementFail;

export default (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case COUNTER_INCREMENT_SUCCESS: {
      return {
        value: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
