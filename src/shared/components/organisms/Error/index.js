import React, { Component } from 'react';
import { compose, shouldUpdate } from 'recompose';

export default compose(
  shouldUpdate(() => false),
)(class Error extends Component {
  render(props = this.props) {
    return (
      <div>Error!</div>
    );
  }
});
