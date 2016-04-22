import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import Header from '../../atoms/Header';

export default compose(
  asyncConnect([
    { promise: () => Promise.resolve() },
  ]),
  onlyUpdateForPropTypes,
)(class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    const { children } =  this.props;

    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }
});
