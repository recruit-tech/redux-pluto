import React, { memo } from "react";
import useDocumentTitle from "../../utils/useDocumentTitle";

type Props = {
  text: string;
  title: string;
};

function AgreedSample(props: Props) {
  const { text, title } = props;
  useDocumentTitle(title);
  return (
    <div>{text}</div>
  );
}

AgreedSample.displayName = "AgreedSample";

export default memo(AgreedSample);
