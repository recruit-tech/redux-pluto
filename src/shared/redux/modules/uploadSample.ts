import { steps } from "redux-effects-steps";
import { upload } from "redux-effects-formdata-uploader";

/**
 * Action types
 */
const UPLOAD_SAMPLE = "redux-proto/uploadsample/";

const INPUT_FILE = `${UPLOAD_SAMPLE}input`;
const UPLOAD_FILE = `${UPLOAD_SAMPLE}upload`;
const UPLOAD_FILE_CANCEL = `${UPLOAD_SAMPLE}upload/cancel`;

export const UPLOAD_FILE_REQUEST = `${UPLOAD_FILE}/request`;
export const UPLOAD_FILE_SUCCESS = `${UPLOAD_FILE}/success`;
export const UPLOAD_FILE_FAIL = `${UPLOAD_FILE}/fail`;

type UploadResult = {
  data: {
    path: string
  }
}

interface InputFileAction {
  type: typeof INPUT_FILE;
  payload: string;
}

interface UploadFileRequestAction {
  type: typeof UPLOAD_FILE_REQUEST;
}

interface UploadFileCancelAction {
  type: typeof UPLOAD_FILE_CANCEL;
  payload: Object | null;
}

interface UploadFileSuccessAction {
  type: typeof UPLOAD_FILE_SUCCESS;
  payload: UploadResult;
}

interface UploadFileFailAction {
  type: typeof UPLOAD_FILE_FAIL;
  error: Error | null;
}

type Action =(
  | InputFileAction
  | UploadFileRequestAction
  | UploadFileCancelAction
  | UploadFileSuccessAction
  | UploadFileFailAction
);
/**
 * Action creators
 */

export function inputFile(filename: string ): InputFileAction {
  return {
    type: INPUT_FILE,
    payload: filename,
  }
};

function uploadFileRequest(): UploadFileRequestAction {
  return {
    type: UPLOAD_FILE_REQUEST,
  }
}
function uploadFileCancel(cancelSource: Object | null): UploadFileCancelAction {
  return {
    type: UPLOAD_FILE_CANCEL,
    payload: cancelSource,
  }
};
function uploadFileSuccess(res: UploadResult): UploadFileSuccessAction {
  return {
    type: UPLOAD_FILE_SUCCESS,
    payload: res,
  }
};
function uploadFileFail(why: Error | null): UploadFileFailAction {
  return {
    type: UPLOAD_FILE_FAIL,
    error: why,
  }
};

export function uploadFile(path: string, file: any) {
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
        value: (action as InputFileAction).payload,
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
        cancelSource: (action as UploadFileCancelAction).payload,
      };
    }
    case UPLOAD_FILE_SUCCESS: {
      return {
        ...state,
        path: (action as UploadFileSuccessAction).payload.data.path,
        loading: false,
        loaded: true,
      };
    }
    case UPLOAD_FILE_FAIL: {
      return {
        ...state,
        error: (action as UploadFileFailAction).error,
        loading: false,
        loaded: false,
      };
    }
  }
  return state;
};
