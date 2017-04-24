/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { compose, shouldUpdate } from 'recompose';

export default compose(
  shouldUpdate(() => false),
)(class Bar extends Component {
  render() {
    const array = new Array(500);
    array.fill(0);

    return (
      <main>
        {array.map((e, i) => (
          <div key={i}>Bar![{i}]</div>
        ))}
      </main>
    );
  }
});
