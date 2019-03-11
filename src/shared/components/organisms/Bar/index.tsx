import React from "react";
import { compose, shouldUpdate } from "recompose";

const array = Array.from({ length: 500 }, (_, i) => i);

type Props = { onDataReady: boolean };
export default compose<Props, {}>(shouldUpdate(() => false))(function Bar(
  props: Props,
) {
  return (
    <main>
      {array.map(elm => (
        <div key={elm}>
          Bar![
          {elm}]
        </div>
      ))}
    </main>
  );
});
