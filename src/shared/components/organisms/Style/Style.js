/* @flow */
import React, { type Node } from "react";
import PropTypes from "prop-types";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import GenderMenu from "shared/components/molecules/GenderMenu";
import HairLengthMenu from "shared/components/molecules/HairLengthMenu";

type Props = {
  // from store
  genderItems: Object,
  hairLengthItems: Object,

  // from router
  children: ?Node,
  params: {
    gender: "man" | "woman",
    hairLength: string
  }
};

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    // from store
    genderItems: PropTypes.object.isRequired,
    hairLengthItems: PropTypes.object.isRequired,

    // from router
    children: PropTypes.object,
    params: PropTypes.shape({
      gender: PropTypes.string,
      hairLength: PropTypes.string
    })
  })
)(function Style(props: Props) {
  const { genderItems, hairLengthItems, children, params: { gender, hairLength } } = props;

  return (
    <div>
      <GenderMenu genderItems={genderItems} gender={gender} />
      <HairLengthMenu {...{ gender, hairLength, genderItems, hairLengthItems }} />
      <div>{children}</div>
    </div>
  );
});
