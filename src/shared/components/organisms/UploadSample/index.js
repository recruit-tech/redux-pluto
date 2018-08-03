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
        dispatch(uploadFile(file)).then(() => {
          file = null;
        });
      },
    }),
  ),
)(UploadSample);
