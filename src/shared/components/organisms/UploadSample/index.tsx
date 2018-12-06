import { connect } from "react-redux";
import { inputFile, uploadFile } from "../../../redux/modules/uploadSample";
import UploadSample from "./UploadSample";
import { State as RootState } from "../../../redux/modules/reducer";

let file: any;
export default connect(
  (state: RootState) => ({
    loading: state.app.uploadSample.loading,
    path: state.app.uploadSample.path,
    cancelSource: state.app.uploadSample.cancelSource,
  }),
  dispatch => ({
    onInputFile: (e: any) => {
      dispatch(inputFile(e.target.value));
      file = e.target.files.item(0);
    },
    onSubmitFile: () => {
      if (!file) {
        return;
      }
      const uploadAction: any = uploadFile("/upload/uploadsample", file);
      dispatch(uploadAction).then(() => {
        file = null;
      });
    },
    onCancel: (cancelSource: any) => {
      cancelSource.cancel();
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onCancel: () => dispatchProps.onCancel(stateProps.cancelSource),
  }),
)(UploadSample);
