import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import Fetchr from 'fetchr';
import createStore from '../shared/redux/createStore';
import routes from '../shared/routes';
import 'babel-polyfill';

const store = createStore(window.__initialState__, {
  history: browserHistory,
  fetchr: new Fetchr({ xhrPath: '/api' }),
  devTools: __DEVELOPMENT__,
});
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store} key="provider">
    <Router history={browserHistory} render={(props) => <ReduxAsyncConnect {...props} />}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (__DEVELOPMENT__) {
  window.React = React; // enable debugger
  const DevTools = require('../shared/components/orgs/DevTools').default;
  render(
    <Provider store={store} key="provider">
      <DevTools />
    </Provider>,
    document.getElementById('devtools')
  );
}
