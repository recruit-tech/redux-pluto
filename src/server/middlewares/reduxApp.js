import { inspect } from 'util';
import React, { createFactory } from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import Fetchr from 'fetchr';
import debugFactory from 'debug';
import createStore from '../../shared/redux/createStore';
import { loadAllMasters as loadAllMastersAction } from '../../shared/redux/modules/masters';
import getRoutes from '../../shared/routes';
import Html from '../components/Html';

const debug = debugFactory('app:server:middleware:reduxApp');
const html = createFactory(Html);

export default function (fetchrConfig) {
  const fetchr = new Fetchr(fetchrConfig);

  const logger = __DEVELOPMENT__ ? (store) => (next) => (action) => {
    debug(`Invoking action: ${inspect(action).replace(/\s*\n\s*/g, ' ')}`);
    return next(action);
  } : null;

  const initialStore = createStore({}, {
    fetchr,
    logger,
    history: createMemoryHistory('/'),
    location: '/',
  });

  function reduxApp(req, res, next) {
    const memoryHistory = createMemoryHistory(req.url);
    const store = createStore(initialStore.getState(), {
      fetchr,
      logger,
      history: memoryHistory,
      location: req.url,
    });
    const history = syncHistoryWithStore(memoryHistory, store);

    if (__DISABLE_SSR__) {
      return sendResponse(res, store, 200, null);
    }

    match({ history, routes: getRoutes(store), location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (!renderProps) {
        return next();
      }

      loadOnServer({ ...renderProps, store }).then(() => {
        const content = renderToString(
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );
        const { routes } = renderProps;
        const status = routes[routes.length - 1].status || 200;
        sendResponse(res, store, status, content);
      });
    });
  }

  function loadAllMasters() {
    debug('Loading initial data');
    return initialStore.dispatch(loadAllMastersAction()).then(() => {
      debug('Loaded initial data');
    });
  }

  return { reduxApp, loadAllMasters };
}

function sendResponse(res, store, status, content) {
  const props = {
    content,
    initialState: JSON.stringify(store.getState()),
  };
  res.status(status).send(`<!doctype html>\n${renderToStaticMarkup(html(props))}`);
}
