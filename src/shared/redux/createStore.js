import React from 'react';
import { routerMiddleware } from 'react-router-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import effects from 'redux-effects';
import location from 'redux-effects-location';
import fetchr from './middlewares/redux-effects-fetchr';
import errorPromise from './middlewares/redux-error-promise';
import multiPromise from './middlewares/redux-multi-promises';
import reducer from './modules/reducer';

export default function(initialState, options = {}) {
  const middlewares = [
    multiPromise,
    errorPromise,
    effects,
    fetchr(options.fetchr),
    location(options.location),
    routerMiddleware(options.history),
  ];

  if (options.logger) {
    middlewares.push(options.logger);
  }

  const devTools = [];
  if (options.devTools) {
    const DevTools = require('../components/utils/DevTools').default;
    devTools.push(DevTools.instrument());
  }

  const enhancer = compose(
    applyMiddleware(...middlewares),
    ...devTools
  );

  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules/reducer', () => {
      const nextReducer = require('./modules/reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
