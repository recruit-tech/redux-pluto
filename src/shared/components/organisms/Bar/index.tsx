import React from "react";
import useDocumentTitle from "../../utils/useDocumentTitle";

const array = Array.from({ length: 500 }, (_, i) => i);

type Props = {
  onDataReady: boolean;
  route: {
    title: string;
  };
};

function Bar(props: Props) {
  useDocumentTitle(props.route.title);
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

export default Bar;
