import React from 'react';
import { routerMiddleware } from 'react-router-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { BEGIN_ASYNC_LOAD, END_ASYNC_LOAD } from 'redux-async-loader';
import steps from 'redux-effects-steps';
import cookie from 'redux-effects-universal-cookie';
import fetchr from 'redux-effects-fetchr';
import fetchrCache from 'redux-effects-fetchr-cache';
import filter from 'lodash/fp/filter';
import apiError from './middleware/apiErrorMiddleware';
import auth from './middleware/authMiddleware';
import loading from './middleware/loadingMiddleware';
import reducer from './modules/reducer';

export default function (initialState, options = {}) {
  const middlewares = filter(Boolean)([
    steps,
    auth(),
    cookie(...options.cookie),
    options.fetchrCache ? fetchrCache(options.fetchrCache) : null,
    apiError(),
    fetchr(options.fetchr),
    loading({ start: BEGIN_ASYNC_LOAD, stop: END_ASYNC_LOAD, delay: 500 }),
    routerMiddleware(options.history),
    options.logger,
  ]);

  const devTools = [];
  if (__DEVELOPMENT__) {
    if (options.devTools) {
      const DevTools = require('../components/utils/DevTools').default;
      devTools.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
    }
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
