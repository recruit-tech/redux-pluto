import { createAction, handleActions } from "redux-actions";

/**
 * Action types
 */
const CANVAS = "redux-proto/app/canvas/";
export const CHANGE_COLOR = `${CANVAS}/color`;
export const CHANGE_MODE = `${CANVAS}/mode`;

/**
 * Action creators
 */
export const changeColor = createAction(CHANGE_COLOR, (color: string) => color);
export const changeMode = createAction(CHANGE_MODE, (mode: number) => mode);

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
export default handleActions(
  {
    [CHANGE_COLOR]: (_state: State, action: any) => {
      const { payload } = action;
      return {
        color: payload,
        mode: _state.mode
      };
    },
    [CHANGE_MODE]: (_state: State, action: any) => {
        const { payload } = action;
        return {
          color: _state.color,
          mode: payload
        };
      },
  },
  INITIAL_STATE,
);