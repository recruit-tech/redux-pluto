import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import { useScroll } from 'react-router-scroll';
import { useAsyncLoader } from 'redux-async-loader';
import { AppContainer } from 'react-hot-loader';
import { compose, setPropTypes } from 'recompose';

export default compose(
  setPropTypes({
    store: PropTypes.object.isRequired,
  }),
)(function App({ store, ...renderProps }) {
  const RenderWithMiddleware = applyRouterMiddleware(
    useAsyncLoader(),
    useScroll((prevRouterProps, { location, routes }) => {
      if (routes.some((route) =>
        route.ignoreScrollBehavior && route.ignoreScrollBehavior(location))) {
        return false;
      }

      return true;
    }),
  );

  return (
    <AppContainer>
      <Provider store={store} key="provider">
        <Router {...renderProps} render={(props) => <RenderWithMiddleware {...props} />} />
      </Provider>
    </AppContainer>
  );
});
