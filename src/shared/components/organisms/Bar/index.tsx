import DocumentTitle from "react-document-title";
import React from "react";
import { compose, shouldUpdate } from "recompose";

const array = Array.from({ length: 500 }, (_, i) => i);

type Props = { onDataReady: boolean; route: { title: string } };
export default compose<Props, {}>(shouldUpdate(() => false))(function Bar(
  props: Props,
) {
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
});
