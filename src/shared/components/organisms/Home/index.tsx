import React, { useMemo } from "react";
import useDocumentTitle from "../../utils/useDocumentTitle";

function Home(props: any) {
  useDocumentTitle(props.route.title);
  return (
    <div>Home!</div>
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
