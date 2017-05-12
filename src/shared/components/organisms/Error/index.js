import React from 'react';
import { compose, shouldUpdate } from 'recompose';

export default compose(
  shouldUpdate(() => false),
)(function Error(props) {
  return (
    <div>Error!</div>
  );
});
