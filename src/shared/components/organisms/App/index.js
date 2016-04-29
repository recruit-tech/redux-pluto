import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import Header from '../../atoms/Header';
import Counter from '../Counter';

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
        <Header />
        {children}
        <Counter />
      </div>
    );
  }
});
