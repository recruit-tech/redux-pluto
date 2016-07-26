import React, { Component } from 'react';
import { compose, shouldUpdate } from 'recompose';

export default compose(
  shouldUpdate(() => false),
)(class Foo extends Component {
  render(props = this.props) {
    return (
      <div>Foo!</div>
    );
  }
});
