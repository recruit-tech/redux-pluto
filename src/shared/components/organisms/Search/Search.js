/* @flow */
import React, { Fragment } from "react";
import pure from "recompose/pure";
import { type State as SearchState } from "../../../redux/modules/search";

type Props = SearchState;

export default pure<Props>(function Search(props: Props) {
  const { item } = props;
  return (
    <div>
      {item && (
        <Fragment>
          {item.name}
          <a href={item.urls && item.urls.pc} target="blank">
            詳細のページヘ行く
          </a>
        </Fragment>
      )}
    </div>
  );
});
