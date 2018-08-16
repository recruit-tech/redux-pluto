/* @flow */
import React from "react";
import pure from "recompose/pure";

type Props = {
  loading: boolean,
  path: string,
  onInputFile: Function,
  onSubmitFile: Function,
  onCancel: Function,
};

export default pure(function UploadSample(props: Props) {
  const { loading, path, onInputFile, onSubmitFile, onCancel } = props;

  return (
    <div>
      <div>{path && <img src={path} alt="" />}</div>
      <div>
        <input type="file" onChange={onInputFile} />
      </div>
      <div>
        <button type="button" onClick={onSubmitFile} disabled={loading}>
          submit
        </button>
        <button type="button" onClick={onCancel}>
          cancel
        </button>
      </div>
    </div>
  );
});
