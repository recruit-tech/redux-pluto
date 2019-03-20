/**
 * Action types
 */
const CSRF = "redux-proto/csrf";

interface CSRFAction {
  type: typeof CSRF;
  payload: string | null;
}

type Action = CSRFAction;

/**
 * Action creators
 */
export function csrfAction(token: string | null): CSRFAction {
  return {
    type: CSRF,
    payload: token,
  };
}

/**
 * Initial state
 */
export type State = {
  token: string | null;
};
const INITIAL_STATE: State = {
  token: null,
};

/**
 * Reducer
 */
export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case CSRF: {
      return {
        ...state,
        token: action.payload,
      };
    }
  }
  return state;
}
