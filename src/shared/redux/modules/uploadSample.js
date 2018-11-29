/* @flow */
import { createAction, handleActions, type Reducer } from "redux-actions";
import { steps } from "redux-effects-steps";
import { upload } from "redux-effects-formdata-uploader";
import { createAsyncActionTypes } from "./utils";

/**
 * Action types
 */
const UPLOAD_SAMPLE = "redux-proto/uploadsample/";

const INPUT_FILE = `${UPLOAD_SAMPLE}input`;
const UPLOAD_FILE = `${UPLOAD_SAMPLE}upload`;
const UPLOAD_FILE_CANCEL = `${UPLOAD_SAMPLE}upload/cancel`;

export const [
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
] = createAsyncActionTypes(UPLOAD_FILE);

/**
 * Action creators
 */

export const inputFile = createAction<string, *>(INPUT_FILE);

const uploadFileRequest = createAction<string, *>(UPLOAD_FILE_REQUEST);
const uploadFileCancel = createAction<string, *>(UPLOAD_FILE_CANCEL);
const uploadFileSuccess = createAction<string, *>(UPLOAD_FILE_SUCCESS);
const uploadFileFail = createAction<string, *>(UPLOAD_FILE_FAIL);

export function uploadFile(path: string, file: *) {
  return steps(
    uploadFileRequest(),
    upload({ path, name: "file", file, cancelAction: uploadFileCancel }),
    [uploadFileSuccess, uploadFileFail],
  );
}

/**
 * Initial state
 */
export type State = {
  loading: boolean,
  loaded: boolean,
  value: string,
  path: string,
  cancelSource: ?Object,
  error: ?Error,
};
export const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  value: "",
  path: "",
  cancelSource: null,
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
    [UPLOAD_FILE_CANCEL]: (state, action) => ({
      ...state,
      cancelSource: action.payload,
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
