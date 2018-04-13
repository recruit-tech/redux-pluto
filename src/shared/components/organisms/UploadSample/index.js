/* @flow */
import { connect } from "react-redux";
import { compose } from "recompose";
import { inputFile, uploadFile } from "../../../redux/modules/uploadSample";
import UploadSample from "./UploadSample";

let file;
export default compose(
  (connect: $FIXME)(
    state => ({
      loading: state.page.uploadSample.loading,
      value: state.page.uploadSample.value
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
      }
    })
  )
)(UploadSample);
