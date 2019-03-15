import React, { useMemo } from "react";
import DocumentTitle from "react-document-title";

function Home(props: any) {
  return (
    <DocumentTitle title={props.route.title}>
      <div>Home!</div>
    </DocumentTitle>
  );
}

// react-router v3 の props 経由で React.memo 相当のことをしたい場合
// useMemo を活用する, (基本的には, React.memo を活用する)
// 常に同じとなる値 ex. 1, 0, true, false を渡した場合
// shouldUpdate(() => false) と同等になる
const once = [true];
function MemoizedHome(props: any) {
  return useMemo(() => <Home {...props} />, once);
}

export default MemoizedHome;
