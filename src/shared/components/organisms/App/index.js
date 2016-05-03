import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';

export default compose(
  onlyUpdateForPropTypes,
)(class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    const { children } =  this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
});
