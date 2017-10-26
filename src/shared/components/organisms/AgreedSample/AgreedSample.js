import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    text: PropTypes.string.isRequired,
  }),
)(function AgreedSample(props) {
  const { text } = props;
  return (
    <div>{text}</div>
  );
});
