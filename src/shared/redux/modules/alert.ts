/**
 * Action types
 */
// export const ALERT = "redux-proto/app/alert";
// export const ALERT_SHOW = `${ALERT}/show`;
// export const ALERT_CLEAR = `${ALERT}/clear`;
export const ALERT_SHOW = "redux-proto/app/alert/show";
export const ALERT_CLEAR = "redux-proto/app/alert/clear";

type ShowAlert = {
  type: typeof ALERT_SHOW;
  payload: string;
};

type ClearAlert = {
  type: typeof ALERT_CLEAR;
};

/**
 * Action creators
 */
export function showAlert(message: string): ShowAlert {
  return {
    type: ALERT_SHOW,
    payload: message,
  };
}

export function clearAlert(): ClearAlert {
  return {
    type: ALERT_CLEAR,
  };
}

/**
 * Initial state
 */

export type State = {
  message: string;
};

const INITIAL_STATE: State = {
  message: "",
};

type Action = ShowAlert | ClearAlert;

/**
 * Reducer
 */
export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case ALERT_SHOW: {
      return {
        message: action.payload,
      };
    }
    case ALERT_CLEAR: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
}
