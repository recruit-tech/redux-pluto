import React from "react";
import DocumentTitle from "react-document-title";

const array = Array.from({ length: 500 }, (_, i) => i);

type Props = {
  onDataReady: boolean;
  route: {
    title: string;
  };
};

function Bar(props: Props) {
  return (
    <DocumentTitle title={props.route.title}>
      <main>
        {array.map(elm => (
          <div key={elm}>
            Bar![
            {elm}]
          </div>
        ))}
      </main>
    </DocumentTitle>
  );
}

export default Bar;
