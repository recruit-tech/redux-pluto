import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    children: PropTypes.node.isRequired,
  })
)(function App(props) {
  const { children } = props;

  return (
    <div>
      {children}
    </div>
  );
});
