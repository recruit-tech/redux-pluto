import React from 'react';
import { compose, shouldUpdate } from 'recompose';
import range from 'lodash/fp/range';

const array = range(0, 500);

export default compose(
  shouldUpdate(() => false),
)(function Bar(props) {
  return (
    <main>
      {array.map((elm) => (
        <div key={elm}>Bar![{elm}]</div>
      ))}
    </main>
  );
});
