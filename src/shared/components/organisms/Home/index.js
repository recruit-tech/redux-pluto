import React, { Component } from 'react';
import { compose, shouldUpdate } from 'recompose';

export default compose(
  shouldUpdate(() => false),
)(class Home extends Component {
  render(props = this.props) {
    return (
      <div>Home!</div>
    );
  }
});
