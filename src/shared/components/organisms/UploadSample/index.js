/* @flow */
import { connect } from "react-redux";
import { compose } from "recompose";
import { inputFile, uploadFile } from "../../../redux/modules/uploadSample";
import UploadSample from "./UploadSample";

let file;
export default compose(
  (connect: $FIXME)(
    state => ({
      loading: state.app.uploadSample.loading,
      path: state.app.uploadSample.path,
      cancelSource: state.app.uploadSample.cancelSource,
    }),
    (dispatch, ownProps) => ({
      onInputFile: e => {
        dispatch(inputFile(e.target.value));
        file = e.target.files.item(0);
      },
      onSubmitFile: () => {
        if (!file) {
          return;
        }
        const uploadAction = uploadFile("/upload/uploadsample", file);
        dispatch(uploadAction).then(() => {
          file = null;
        });
      }, 
      onCancel: (cancelSource) => {
        console.log("cancel");
        cancelSource.cancel();
      }
    }),
    (stateProps, dispatchProps, ownProps) => ({
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      onCancel: () => console.log("cancel!!") || dispatchProps.onCancel(stateProps.cancelSource),
    }),
  ),
)(UploadSample);
