import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';

export default function configureStore(history, initialState) {
  const reducer = combineReducers({ routing: routerReducer });

  let devTools = [];
  if (__DEVELOPMENT__ && __CLIENT__) {
    const DevTools = require('./containers/DevTools').default;
    devTools = [DevTools.instrument()];
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
      ...devTools
    )
  );

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextReducer = require('../reducers').default
  //     store.replaceReducer(nextReducer)
  //   })
  // }

  return store;
}
