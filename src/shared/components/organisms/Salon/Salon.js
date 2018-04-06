/* @flow */
import React, { Fragment } from "react";
import pure from "recompose/pure";
import { type State as SalonState } from "shared/redux/modules/salon";

type Props = SalonState;

export default pure(function Salon(props: Props) {
  const { item } = props;
  return (
    <div>
      {item && (
        <Fragment>
          {item.name}
          <a href={item.urls && item.urls.pc} target="blank">
            Hot peper beauty のページヘ行く
          </a>
        </Fragment>
      )}
    </div>
  );
});
