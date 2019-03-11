import DocumentTitle from "react-document-title";
import React from "react";
import { compose, shouldUpdate } from "recompose";

export default compose(shouldUpdate(() => false))(function Home(props: any) {
  return (
    <DocumentTitle title={props.route.title}>
      <div>Home!</div>
    </DocumentTitle>
  );
});
