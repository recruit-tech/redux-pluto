import React from "react";
import DocumentTitle from "react-document-title";

function Home(props: any) {
  return (
    <DocumentTitle title={props.route.title}>
      <div>Home!</div>
    </DocumentTitle>
  );
}

export default Home;
