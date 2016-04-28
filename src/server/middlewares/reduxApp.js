import { inspect } from 'util';
import React, { createFactory } from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useAsyncLoader, loadOnServer } from '../../shared/packages/redux-async-loader';
import Fetchr from 'fetchr';
import debugFactory from 'debug';
import createStore from '../../shared/redux/createStore';
import { loadAllMasters as loadAllMastersAction } from '../../shared/redux/modules/masters';
import getRoutes from '../../shared/routes';
import Html from '../components/Html';

const debug = debugFactory('app:server:middleware:reduxApp');
const html = createFactory(Html);

export default function () {
  const logger = __DEVELOPMENT__ ? (store) => (next) => (action) => {
    debug(`Invoking action: ${inspect(action).replace(/\s*\n\s*/g, ' ')}`);
    return next(action);
  } : null;

  const initialStore = createStore({}, {
    fetchr: new Fetchr({ req: {} }),
    history: createMemoryHistory('/'),
    logger,
  });

  function reduxApp(req, res, next) {
    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      global.webpackIsomorphicTools.refresh();
    }

    const memoryHistory = createMemoryHistory(req.url);
    const store = createStore(initialStore.getState(), {
      fetchr: new Fetchr({ req }),
      history: memoryHistory,
      logger,
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
        tryRender(res, () => {
          const RenderWithMiddleware = applyRouterMiddleware(
            useAsyncLoader(),
          );
          const content = renderToString(
            <Provider store={store} key="provider">
              <RenderWithMiddleware {...renderProps} />
            </Provider>
          );

          const { routes } = renderProps;
          const status = routes[routes.length - 1].status || 200;
          sendResponse(res, store, status, content);
        });
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

function tryRender(res, render) {
  try {
    render();
  } catch (err) {
    debug(err);
    res.status(500).send('Internal Server Error');
  }
}

function sendResponse(res, store, status, content) {
  const props = {
    content,
    initialState: JSON.stringify(store.getState()),
    assetes: global.webpackIsomorphicTools.assets(),
  };
  res.status(status).send(`<!doctype html>\n${renderToStaticMarkup(html(props))}`);
}
