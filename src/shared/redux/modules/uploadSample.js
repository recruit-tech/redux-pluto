/* @flow */
import { createAction, handleActions, type Reducer } from "redux-actions";
import { steps } from "redux-effects-steps";
import { upload } from "../middleware/uploader";
import { createAsyncActionTypes } from "./utils";

/**
 * Action types
 */
const UPLOAD_SAMPLE = "redux-proto/uploadsample/";

const INPUT_FILE = `${UPLOAD_SAMPLE}input`;
const UPLOAD_FILE = `${UPLOAD_SAMPLE}upload`;

export const [
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
] = createAsyncActionTypes(UPLOAD_FILE);

/**
 * Action creators
 */

export const inputFile = createAction(INPUT_FILE);

const uploadFileRequest = createAction(UPLOAD_FILE_REQUEST);
const uploadFileSuccess = createAction(UPLOAD_FILE_SUCCESS);
const uploadFileFail = createAction(UPLOAD_FILE_FAIL);

export function uploadFile(file: *) {
  return steps(uploadFileRequest(), upload("/upload/uploadsample", file), [
    uploadFileSuccess,
    uploadFileFail,
  ]);
}

/**
 * Initial state
 */
export type State = {
  loading: boolean,
  loaded: boolean,
  value: string,
  error: ?Error,
};
export const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  value: "",
  path: "",
  error: null,
};

/**
 * Reducer
 */
export default (handleActions(
  {
    [INPUT_FILE]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        value: payload,
      };
    },
    [UPLOAD_FILE_REQUEST]: state => ({
      ...state,
      loading: true,
      loaded: false,
    }),
    [UPLOAD_FILE_SUCCESS]: (state, action) => ({
      ...state,
      path: action.payload.data.path,
      loading: false,
      loaded: true,
    }),
    [UPLOAD_FILE_FAIL]: (state, action) => {
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
): Reducer<State, *>);
