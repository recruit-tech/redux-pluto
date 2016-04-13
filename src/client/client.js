import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Fetchr from 'fetchr';
import createStore from '../shared/redux/createStore';
import routes from '../shared/routes';

const store = createStore(window.__initialState__, {
  history: browserHistory,
  fetchr: new Fetchr({ xhrPath: '/api' }),
  devTools: __DEVELOPMENT__,
});
const createScrollHistory = useScroll(createBrowserHistory);
const appHistory = useRouterHistory(createScrollHistory)();
const history = syncHistoryWithStore(appHistory, store);

render(
  <Provider store={store} key="provider">
    <Router history={history} render={(props) => <ReduxAsyncConnect {...props} />}>
      {routes}
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
