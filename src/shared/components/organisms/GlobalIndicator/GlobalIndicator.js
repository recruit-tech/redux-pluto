import React from "react";
import PropTypes from "prop-types";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import Indicator from "shared/components/atoms/Indicator";

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    loading: PropTypes.bool.isRequired
  })
)(function GlobalIndicator(props) {
  const { loading } = props;

  return (
    <div>
      <Indicator loading={loading} />
    </div>
  );
});
