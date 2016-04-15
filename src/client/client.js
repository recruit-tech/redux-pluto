import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import Fetchr from 'fetchr';
import createStore from '../shared/redux/createStore';
import getRoutes from '../shared/routes';

const createScrollHistory = useScroll(() => browserHistory);
const appHistory = useRouterHistory(createScrollHistory)();
const store = createStore(window.__initialState__, {
  history: appHistory,
  fetchr: new Fetchr({ xhrPath: '/api' }),
  devTools: __DEVELOPMENT__,
});
const syncHistory = syncHistoryWithStore(appHistory, store);

render(
  <Provider store={store} key="provider">
    <Router history={syncHistory} render={(props) => <ReduxAsyncConnect {...props} />}>
      {getRoutes(store)}
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (__DEVELOPMENT__) {
  window.React = React; // enable debugger
  const DevTools = require('../shared/components/utils/DevTools').default;
  render(
    <Provider store={store} key="provider">
      <DevTools />
    </Provider>,
    document.getElementById('devtools')
  );
}
