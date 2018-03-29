import React from "react";
import PropTypes from "prop-types";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    loading: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onInputFile: PropTypes.func.isRequired,
    onSubmitFile: PropTypes.func.isRequired
  })
)(function UploadSample(props) {
  const { loading, value, onInputFile, onSubmitFile } = props;

  return (
    <div>
      <div>
        <input type="file" onChange={onInputFile} value={value} />
      </div>
      <div>
        <button onClick={onSubmitFile} disabled={loading}>
          submit
        </button>
      </div>
    </div>
  );
});
