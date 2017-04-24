import React, { Component } from 'react';
import { compose, shouldUpdate } from 'recompose';

export default compose(
  shouldUpdate(() => false),
)(class NotFound extends Component {
  render() {
    return (
      <div>NotFound!</div>
    );
  }
});
