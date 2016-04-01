import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from '../shared/store';
import routes from '../shared/routes';
import 'babel-polyfill';

const store = createStore(browserHistory, window.__initialState__);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

if (__DEVELOPMENT__) {
  window.React = React; // enable debugger
  const DevTools = require('../shared/containers/DevTools').default;
  render(
    <Provider store={store}>
      <DevTools />
    </Provider>,
    document.getElementById('devtools')
  );
}
