import React, { memo } from "react";

export default memo(
  function NotFound() {
    return <div>NotFound!</div>;
  },
  () => false,
);
