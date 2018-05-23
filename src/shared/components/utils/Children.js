import React from "react";
import PropTypes from "prop-types";
import { compose, pure, setPropTypes } from "recompose";

export default compose(
  pure,
  setPropTypes({
    children: PropTypes.node.isRequired,
  }),
)(function Children(props) {
  const { children, ...rest } = props;

  return React.cloneElement(children, { ...rest });
});
