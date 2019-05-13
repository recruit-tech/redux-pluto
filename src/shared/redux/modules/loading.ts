/**
 * Action types
 */
export const START_LOADING = "redux-proto/loading/start";
export const STOP_LOADING = "redux-proto/loading/stop";

interface StartLoadingAction {
  type: typeof START_LOADING;
}

interface StopLoadingAction {
  type: typeof STOP_LOADING;
}

type Action = StartLoadingAction | StopLoadingAction;

/**
 * Action creators
 */
export function startLoading(): StartLoadingAction {
  return {
    type: START_LOADING,
  };
}

export function stopLoading(): StopLoadingAction {
  return {
    type: STOP_LOADING,
  };
}

/**
 * Initial state
 */

export type State = boolean;
const INITIAL_STATE: State = false;

/**
 * Reducer
 */
export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case START_LOADING: {
      return true;
    }
    case STOP_LOADING: {
      return false;
    }
  }
  return state;
}
