import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import RouterContext from 'react-router/lib/RouterContext';
import { compose, setPropTypes } from 'recompose';

export default compose(
  setPropTypes({
    store: PropTypes.object.isRequired,
  }),
)(function App(props) {
  const { store, ...renderProps } = props;

  return (
    <Provider store={store} key="provider">
      <RouterContext {...renderProps} />
    </Provider>
  );
});
