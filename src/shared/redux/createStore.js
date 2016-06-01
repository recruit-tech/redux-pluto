import React from 'react';
import { routerMiddleware } from 'react-router-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import effects from 'redux-effects';
import cookie from 'redux-effects-cookie';
import { BEGIN_ASYNC_LOAD, END_ASYNC_LOAD } from '../packages/redux-async-loader';
import fetchr from '../packages/redux-effects-fetchr';
import fetchrCache from '../packages/redux-effects-fetchr-cache';
import reject from '../packages/redux-effects-reject';
import multi from '../packages/redux-effects-multi';
import filter from 'lodash/fp/filter';
import apiError from './middleware/apiErrorMiddleware';
import auth from './middleware/authMiddleware';
import loading from './middleware/loadingMiddleware';
import reducer from './modules/reducer';

export default function (initialState, options = {}) {
  const middlewares = filter(Boolean)([
    multi,
    reject,
    effects,
    auth(),
    cookie(options.cookie),
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
