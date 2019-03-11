import DocumentTitle from "react-document-title";
import React from "react";

type Props = {
  text: string;
  title: string;
};

export default React.memo(function AgreedSample(props: Props) {
  const { text, title } = props;
  return (
    <DocumentTitle title={title}>
      <div>{text}</div>
    </DocumentTitle>
  );
});
