import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';

export default compose(
  pure,
)(class Children extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return React.cloneElement(children, { ...rest });
  }
});
