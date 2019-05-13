/**
 * Action types
 */
export const CHANGE_COLOR = "redux-proto/app/canvas/color";
export const CHANGE_MODE = "redux-proto/app/canvas/mode";

type ChangeColor = {
  type: typeof CHANGE_COLOR;
  payload: string;
};

type ChangeMode = {
  type: typeof CHANGE_MODE;
  payload: boolean;
};

type Action = ChangeColor | ChangeMode;

/**
 * Action creators
 */
export function changeColor(color: string): ChangeColor {
  return {
    type: CHANGE_COLOR,
    payload: color,
  };
}

export function changeMode(mode: boolean): ChangeMode {
  return {
    type: CHANGE_MODE,
    payload: mode,
  };
}

/**
 * Initial state
 */
export type State = {
  color: string;
  mode: boolean;
};

const INITIAL_STATE: State = {
  color: "#000",
  mode: false,
};

/**
 * Reducer
 */
export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case CHANGE_COLOR: {
      return {
        ...state,
        color: action.payload,
      };
    }
    case CHANGE_MODE: {
      return {
        ...state,
        mode: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
