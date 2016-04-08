import React, { Component, PropTypes } from 'react';
import { compose, pure } from 'recompose';

export default compose(
  pure,
)(class Children extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return React.cloneElement(children, { ...rest });
  }
});
