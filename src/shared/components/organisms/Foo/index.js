import React from 'react';
import { compose, shouldUpdate } from 'recompose';

export default compose(
  shouldUpdate(() => false),
)(function Foo(props) {
  return (
    <div>Foo!</div>
  );
});
