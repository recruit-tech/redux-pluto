import React, { memo } from "react";
import DocumentTitle from "react-document-title";

type Props = {
  text: string;
  title: string;
};

export default memo(function AgreedSample(props: Props) {
  const { text, title } = props;
  return (
    <DocumentTitle title={title}>
      <div>{text}</div>
    </DocumentTitle>
  );
});
