
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
        <input type="file" onChange={onInputFile as any} />
      </div>
      <div>
        <button type="button" onClick={onSubmitFile as any} disabled={loading}>
          submit
        </button>
        <button type="button" onClick={onCancel as any}>
          cancel
        </button>
      </div>
    </div>
  );
});
