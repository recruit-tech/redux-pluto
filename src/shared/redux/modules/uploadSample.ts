import { steps } from "redux-effects-steps";
import { upload } from "redux-effects-formdata-uploader";
import { withMiddleware } from "./utils";

/**
 * Action types
 */
const INPUT_FILE = "redux-proto/uploadsample/input";
const UPLOAD_FILE_CANCEL = "redux-proto/uploadsample/upload/cancel";

export const UPLOAD_FILE_REQUEST = "redux-proto/uploadsample/upload/request";
export const UPLOAD_FILE_SUCCESS = "redux-proto/uploadsample/upload/success";
export const UPLOAD_FILE_FAIL = "redux-proto/uploadsample/upload/fail";

type PostUploadFileType = {
  data: {
    path: string;
  };
};

type InputFile = {
  type: typeof INPUT_FILE;
  payload: string;
};

type UploadFileRequest = {
  type: typeof UPLOAD_FILE_REQUEST;
};

type UploadFileCancel = {
  type: typeof UPLOAD_FILE_CANCEL;
  payload: Object | null;
};

type UploadFileSuccess = {
  type: typeof UPLOAD_FILE_SUCCESS;
  payload: PostUploadFileType;
};

type UploadFileFail = {
  type: typeof UPLOAD_FILE_FAIL;
  error: Error | null;
};

type Action =
  | InputFile
  | UploadFileRequest
  | UploadFileCancel
  | UploadFileSuccess
  | UploadFileFail;
/**
 * Action creators
 */

export function inputFile(filename: string): InputFile {
  return {
    type: INPUT_FILE,
    payload: filename,
  };
}

function uploadFileRequest(): UploadFileRequest {
  return {
    type: UPLOAD_FILE_REQUEST,
  };
}
function uploadFileCancel(cancelSource: Object | null): UploadFileCancel {
  return {
    type: UPLOAD_FILE_CANCEL,
    payload: cancelSource,
  };
}
function uploadFileSuccess(res: PostUploadFileType): UploadFileSuccess {
  return {
    type: UPLOAD_FILE_SUCCESS,
    payload: res,
  };
}
function uploadFileFail(why: Error | null): UploadFileFail {
  return {
    type: UPLOAD_FILE_FAIL,
    error: why,
  };
}

export function uploadFile(
  path: string,
  file: any,
): Promise<UploadFileSuccess | UploadFileFail> {
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
  loading: boolean;
  loaded: boolean;
  value: string;
  path: string;
  cancelSource: Object | null;
  error: Error | null;
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
export default (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case INPUT_FILE: {
      return {
        ...state,
        value: action.payload,
      };
    }
    case UPLOAD_FILE_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case UPLOAD_FILE_CANCEL: {
      return {
        ...state,
        cancelSource: action.payload,
      };
    }
    case UPLOAD_FILE_SUCCESS: {
      const {
        payload: {
          data: { path },
        },
      } = action;
      return {
        ...state,
        path,
        loading: false,
        loaded: true,
      };
    }
    case UPLOAD_FILE_FAIL: {
      const { error } = action;
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
