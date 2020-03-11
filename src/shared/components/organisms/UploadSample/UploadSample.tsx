import React, { memo } from "react";
import useDocumentTitle from "../../utils/useDocumentTitle";

type Props = {
  loading: boolean;
  path: string;
  onInputFile: Function;
  onSubmitFile: Function;
  onCancel: Function;
  title: string;
};

function UploadSample(props: Props) {
  const { loading, path, onInputFile, onSubmitFile, onCancel, title } = props;
  useDocumentTitle(title);

  return (
    <div>
      <div>{path && <img src={path} alt="" />}</div>
      <div>
        <input type="file" onChange={onInputFile as any} />
      </div>
      <div>
        <button
          type="button"
          onClick={onSubmitFile as any}
          disabled={loading}>
          submit
        </button>
        <button type="button" onClick={onCancel as any}>
          cancel
        </button>
      </div>
    </div>
  );
}

UploadSample.displayName = "UploadSample";

export default memo(UploadSample);
