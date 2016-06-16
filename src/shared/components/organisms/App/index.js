import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    children: PropTypes.node.isRequired,
  })
)(class App extends Component {
  render() {
    const { children } =  this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
});
