import { inspect } from 'util';
import React, { createFactory } from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { loadOnServer } from 'redux-async-loader';
import Fetchr from 'fetchr';
import debugFactory from 'debug';
import createStore from 'shared/redux/createStore';
import { loadAllMasters as loadAllMastersAction } from 'shared/redux/modules/masters';
import { checkLogin } from 'shared/redux/modules/auth';
import getRoutes from 'shared/routes';
import Html from 'server/components/Html';

const debug = debugFactory('app:server:middleware:reduxApp');
const html = createFactory(Html);

export default function createReduxApp(config) {
  const maxAge = Math.floor(config.offload.cache.maxAge / 1000);

  const logger = __DEVELOPMENT__ ? (store) => (next) => (action) => {
    debug(`Invoking action: ${inspect(action).replace(/\s*\n\s*/g, ' ')}`);
    return next(action);
  } : null;

  const initialStore = createStore({}, {
    cookie: [{ cookies: {} }, {}],
    fetchr: new Fetchr({ ...config.fetchr, req: {} }),
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
      cookie: [req, res],
      fetchr: new Fetchr({ ...config.fetchr, req }),
      history: memoryHistory,
      logger,
    });
    const history = syncHistoryWithStore(memoryHistory, store);
    const clientConfig = getClientConfig(config, req);

    if (__DISABLE_SSR__) {
      return void sendResponse({ res, store, status: 200, clientConfig });
    }

    if (req.offloadMode) {
      debug('offload mode, disable server-side rendering');
      res.set('cache-control', `max-age=${maxAge}`);
      return void sendResponse({ res, store, status: 200, clientConfig });
    }

    match({ history, routes: getRoutes(store) }, (error, redirectLocation, renderProps) => {
      if (error) {
        return void res.status(500).send(error.message);
      }

      if (redirectLocation) {
        return void res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (!renderProps) {
        return void next();
      }

      res.startTime('prefetch', 'Prefetch onLoad');
      Promise.all([
        loadOnServer(renderProps, store),
        store.dispatch(checkLogin()).catch(() => null),
      ]).then(() => {
        res.endTime('prefetch');
        res.startTime('ssr', 'Server Side Rendering');
        tryRender(res, () => {
          const content = renderToString(
            <Provider store={store} key="provider">
              <RouterContext {...renderProps} />
            </Provider>
          );
          res.endTime('ssr');
          const { routes } = renderProps;
          const status = routes[routes.length - 1].status || 200;
          sendResponse({ res, status, store, content, clientConfig });
        });
      }).catch((error) => {
        debug(error);
        debug(store.getState().routing);
        res.status(500).send('Internal Server Error');
      });
    });
  }

  function loadInitialData() {
    debug('Loading initial data');
    return initialStore.dispatch(loadAllMastersAction()).then(() => {
      debug('Loaded initial data');
    });
  }

  return { reduxApp, loadInitialData };
}

function getClientConfig(config, req) {
  const { fetchr, ...clientConfig } = config.clientConfig;
  return {
    ...clientConfig,
    fetchr: {
      ...fetchr,
      context: {
        ...fetchr.context,
        _csrf: req.csrfToken(),
      },
    },
  };
}

function tryRender(res, render) {
  try {
    render();
  } catch (err) {
    debug(err);
    res.status(500).send('Internal Server Error');
  }
}

function sendResponse({ res, status, store, clientConfig, content }) {
  const props = {
    content,
    initialState: JSON.stringify(store.getState()),
    clientConfig: JSON.stringify(clientConfig),
    assets: global.webpackIsomorphicTools.assets(),
  };
  res.status(status).send(`<!doctype html>\n${renderToStaticMarkup(html(props))}`);
}
