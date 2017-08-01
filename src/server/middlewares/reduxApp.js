import { inspect } from 'util';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { loadOnServer } from 'redux-async-loader';
import Fetchr from 'fetchr';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { mapValues, noop } from 'lodash/fp';
import debugFactory from 'debug';
import createStore from 'shared/redux/createStore';
import { loadAllMasters as loadAllMastersAction } from 'shared/redux/modules/masters';
import { checkLogin } from 'shared/redux/modules/auth';
import getRoutes from 'shared/routes';
import Html from 'server/components/Html';
import App from 'server/components/App';

const debug = debugFactory('app:server:middleware:reduxApp');

const logger = __DEVELOPMENT__ ? (store) => (next) => (action) => {
  debug(`Invoking action: ${inspect(action).replace(/\s*\n\s*/g, ' ')}`);
  return next(action);
} : null;

export default function createReduxApp({ resolve, reject, ...config }) {
  const maxAge = Math.floor(config.offload.cache.maxAge / 1000);

  /*
   * 全リクエストで共有される初期データのためのStoreです。
   */
  const initialStore = createStore({}, {
    cookie: [{ cookies: {} }, {}],
    fetchr: new Fetchr({ ...config.fetchr, req: {} }),
    history: createMemoryHistory('/'),
    logger,
  });

  debug('Loading initial data');
  Promise.all([
    initialStore.dispatch(loadAllMastersAction()),
  ]).then(() => {
    debug('Loaded initial data');
    resolve();
  }).catch(reject);

  return reduxApp;

  /*
   * サーバサイドレンダリングのためのExpressミドルウェアです。
   */
  function reduxApp(req, res, next) {
    const memoryHistory = createMemoryHistory(req.url);
    const timing = __DEVELOPMENT__ ? res : { startTime: noop, endTime: noop };

    /*
     * リクエスト毎のStoreです。
     * 共有の初期ストアのステートを初期ステートとして使用します。
     */
    const store = createStore(initialStore.getState(), {
      cookie: [req, res],
      fetchr: new Fetchr({ ...config.fetchr, req }),
      history: memoryHistory,
      logger,
    });
    const history = syncHistoryWithStore(memoryHistory, store);
    const clientConfig = getClientConfig(config, req);

    if (__DISABLE_SSR__) {
      const assets = flushChunks(config.clientStats);
      return void sendResponse({ res, store, status: 200, clientConfig, assets, timing });
    }

    if (req.offloadMode) {
      debug('offload mode, disable server-side rendering');
      res.set('cache-control', `max-age=${maxAge}`);
      const assets = flushChunks(config.clientStats);
      return void sendResponse({ res, store, status: 200, clientConfig, assets, timing });
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

      timing.startTime('prefetch', 'Prefetch onLoad');
      Promise.all([
        loadOnServer(renderProps, store),
        store.dispatch(checkLogin()).catch(() => null),
      ]).then(() => {
        timing.endTime('prefetch');
        tryRender(next, { res, store, renderProps, config, clientConfig, timing });
      }).catch((err) => {
        debug(err);
        debug(store.getState().routing);
        return next(err);
      });
    });
  }
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

function tryRender(next, options) {
  try {
    return render(options);
  } catch (err) {
    debug(err);
    return next(err);
  }
}

function render({ res, store, renderProps, config, clientConfig, timing }) {
  timing.startTime('ssr', 'Server Side Rendering');
  const content = renderToString(<App store={store} {...renderProps} />);
  timing.endTime('ssr');

  const chunkNames = flushChunkNames();
  const assets = flushChunks(config.clientStats, { chunkNames });
  const { publicPath } = assets;
  const stylesheets = assets.stylesheets.map((stylesheet) => `${publicPath}/${stylesheet}`);
  const cssHashRaw = mapValues(
    (value) => (stylesheets.includes(value) ? 'loaded' : value)
  )(assets.cssHashRaw);
  assets.cssHashRaw = cssHashRaw;

  const { routes } = renderProps;
  const status = routes[routes.length - 1].status || 200;
  sendResponse({ res, status, store, content, clientConfig, assets, timing });
}

function sendResponse({ res, status, store, clientConfig, content, assets, timing }) {
  timing.startTime('html', 'Rendering HTML');
  const props = {
    content,
    assets,
    initialState: JSON.stringify(store.getState()),
    clientConfig: JSON.stringify(clientConfig),
  };
  const html = renderToStaticMarkup(<Html {...props} />);
  timing.endTime('html');
  res.status(status).send(`<!doctype html>\n${html}`);
}
