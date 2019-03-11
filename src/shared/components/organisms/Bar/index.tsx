import React, { memo } from "react";

const array = Array.from({ length: 500 }, (_, i) => i);

type Props = { onDataReady: boolean };

function Bar(props: Props) {
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
}

export default memo(Bar, () => false);
