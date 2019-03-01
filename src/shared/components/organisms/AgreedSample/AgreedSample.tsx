import React from "react";

type Props = {
  text: string;
};

export default React.memo(function AgreedSample(props: Props) {
  const { text } = props;
  return <div>{text}</div>;
});
