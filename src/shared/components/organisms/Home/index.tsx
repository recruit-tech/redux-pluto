import React, { memo } from "react";

export default memo(
  function Home(props) {
    return <div>Home!</div>;
  },
  () => false,
);
