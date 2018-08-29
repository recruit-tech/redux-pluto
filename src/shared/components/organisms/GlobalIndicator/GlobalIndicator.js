/* @flow */
import React from "react";
import pure from "recompose/pure";
import Indicator from "../../atoms/Indicator";

type Props = {|
  loading: boolean,
|};

export default pure(function GlobalIndicator(props: Props) {
  const { loading } = props;

  return (
    <div>
      <Indicator loading={loading} />
    </div>
  );
});
