import React, { createFactory } from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import debugFactory from 'debug';
import createStore from '../../shared/store';
import routes from '../../shared/routes';
import Html from '../Html';

const debug = debugFactory('app:server:redux');
const html = createFactory(Html);

export default function reduxApp() {
  return function reduxApp(req, res, next) {
    const memoryHistory = createMemoryHistory(req.url);
    const store = createStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (!renderProps) {
        return next();
      }

      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const initialState = store.getState();
      const { routes } = renderProps;
      const status = routes[routes.length - 1].status || 200;
      res.status(status).send('<!doctype html>\n' + renderToString(html({ content, initialState })));
    });
  };
}
