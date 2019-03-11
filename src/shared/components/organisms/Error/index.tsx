import React, { memo } from "react";

type Props = {};

export default memo(
  function Error(props: Props) {
    return <div>Error!</div>;
  },
  () => false,
);
