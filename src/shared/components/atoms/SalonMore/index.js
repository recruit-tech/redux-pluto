import React from "react";
import PropTypes from "prop-types";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import { showOnScroll } from "shared/components/utils/scrollComponents";

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    children: PropTypes.node.isRequired,
    onShow: PropTypes.func.isRequired
  }),
  showOnScroll
)(function SalonMore(props) {
  const { children, onShow } = props;

  return <div onClick={onShow}>{children}</div>;
});
