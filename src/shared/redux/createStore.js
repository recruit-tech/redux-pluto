import React from 'react';
import { routerMiddleware } from 'react-router-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import effects from 'redux-effects';
import fetchr from '../packages/redux-effects-fetchr';
import fetchrCache from '../packages/redux-effects-fetchr-cache';
import reject from '../packages/redux-effects-reject';
import multi from '../packages/redux-effects-multi';
import filter from 'lodash/fp/filter';
import reducer from './modules/reducer';

export default function (initialState, options = {}) {
  const middlewares = filter(Boolean)([
    multi,
    reject,
    effects,
    options.fetchrCache ? fetchrCache(options.fetchrCache) : null,
    fetchr(options.fetchr),
    routerMiddleware(options.history),
    options.logger,
  ]);

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
