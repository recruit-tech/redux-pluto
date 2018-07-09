/* @flow */
import React from "react";
import pure from "recompose/pure";

type Props = {
  loading: boolean,
  value: string,
  onInputFile: Function,
  onSubmitFile: Function,
};

export default pure(function UploadSample(props: Props) {
  const { loading, value, onInputFile, onSubmitFile } = props;

  return (
    <div>
      <div>
        <input type="file" onChange={onInputFile} value={value} />
      </div>
      <div>
        <button type="button" onClick={onSubmitFile} disabled={loading}>
          submit
        </button>
      </div>
    </div>
  );
});
