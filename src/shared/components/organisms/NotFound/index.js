import React, { Component } from 'react';
import { compose, shouldUpdate } from 'recompose';

export default compose(
  shouldUpdate(() => false),
)(class NotFound extends Component {
  render(props = this.props) {
    return (
      <div>NotFound!</div>
    );
  }
});
