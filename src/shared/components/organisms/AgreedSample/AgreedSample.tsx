import React, { memo } from "react";
import DocumentTitle from "react-document-title";

type Props = {
  text: string;
  title: string;
};

function AgreedSample(props: Props) {
  const { text, title } = props;
  return (
    <DocumentTitle title={title}>
      <div>{text}</div>
    </DocumentTitle>
  );
}

AgreedSample.displayName = "AgreedSample";

export default memo(AgreedSample);
