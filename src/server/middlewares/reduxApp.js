import fs from 'fs';
import path from 'path';
import { inspect } from 'util';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { loadOnServer } from 'redux-async-loader';
import Fetchr from 'fetchr';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { mapValues, noop, transform } from 'lodash/fp';
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

export default function createReduxApp(config) {
  const maxAge = Math.floor(config.offload.cache.maxAge / 1000);
  const cssChunks = __DEVELOPMENT__ ? null : loadCssChunks(config);

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
  config.promises.push(Promise.all([
    initialStore.dispatch(loadAllMastersAction()),
  ]).then(() => {
    debug('Loaded initial data');
  }));

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
      return void renderCSR({ res, store, config, clientConfig, timing });
    }

    /*
     * 高負荷時にSSRをスキップするモードです。
     * オフロードモードをサポートしない場合は ./offloadDetector.js と一緒に削除してください。
     */
    if (__ENABLE_OFFLOAD__) {
      debug('offload mode, disable server-side rendering');
      res.set('cache-control', `max-age=${maxAge}`);
      return void renderCSR({ res, store, config, clientConfig, timing });
    }

    /*
     * React-Routerのルーティング定義とマッチングを行います。
     */
    matchRoutes({ history, routes: getRoutes(store) }).then(({ redirectLocation, renderProps }) => {
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (!renderProps) {
        return next();
      }

      /*
       * 初期表示に必要なデータをフェッチします。
       */
      timing.startTime('prefetch', 'Prefetch onLoad');
      return Promise.all([
        loadOnServer(renderProps, store),
        store.dispatch(checkLogin()).catch(() => null),
      ]).then(() => {
        timing.endTime('prefetch');

        /*
         * サーバサイドレンダリングを行います。
         */
        renderSSR({ res, store, renderProps, config, clientConfig, cssChunks, timing });
      });
    }).catch((err) => {
      debug(err);
      debug(store.getState().routing);
      return next(err);
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

function matchRoutes(options) {
  return new Promise((resolve, reject) => {
    match(options, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error);
      } else {
        resolve({ redirectLocation, renderProps });
      }
    });
  });
}

function renderCSR({ res, store, config, clientConfig, timing }) {
  const assets = flushChunks(config.clientStats);
  sendResponse({ res, store, status: 200, clientConfig, assets, timing });
}

function renderSSR({ res, store, renderProps, config, clientConfig, cssChunks, timing }) {
  /*
   * メインコンテンツをレンダリングします。
   */
  timing.startTime('ssr', 'Server Side Rendering');
  const content = renderToString(<App store={store} {...renderProps} />);
  timing.endTime('ssr');

  const assets = getAssets({ clientStats: config.clientStats, cssChunks });

  const { routes } = renderProps;
  const status = routes[routes.length - 1].status || 200;
  sendResponse({ res, status, store, content, clientConfig, assets, timing });
}

function sendResponse({ res, status, store, clientConfig, content, assets, timing }) {
  /*
   * HTML全体をレンダリングします。
   */
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

/*
 * CSSファイルをロードします。
 */
function loadCssChunks({ clientStats, assets }) {
  debug(Object.keys(clientStats));
  const { path: outputPath } = assets.find((asset) => asset.buildOutput);
  const { assetsByChunkName: chunks, publicPath } = clientStats;
  return transform((result, chunkName) => {
    const chunkArray = ensureArray(chunks[chunkName]);
    const cssChunk = chunkArray.find((chunk) => chunk.endsWith('.css'));
    if (cssChunk) {
      result[cssChunk] = {
        href: `${publicPath}${cssChunk}`,
        content: fs.readFileSync(path.join(outputPath, cssChunk), 'utf-8'),
      };
    }

    return result;
  }, {}, Object.keys(chunks));
}

function ensureArray(v) {
  if (v == null) {
    return [];
  }
  if (Array.isArray(v)) {
    return v;
  }
  return [v];
}

/*
 * コードスプリットされたチャンクに関する情報を収集します。
 * SSRで実際に使用されたチャンクのみをレンダリングできるようにします。
 */
function getAssets({ clientStats, cssChunks }) {
  const chunkNames = flushChunkNames();
  const assets = flushChunks(clientStats, { chunkNames });
  const { publicPath } = assets;
  const stylesheets = assets.stylesheets.map((stylesheet) => `${publicPath}/${stylesheet}`);
  assets.cssHashRaw = mapValues(
    (value) => (stylesheets.includes(value) ? 'loaded' : value)
  )(assets.cssHashRaw);

  if (!__DISABLE_INLINE_CSS__) {
    assets.inlineStylesheets = assets.stylesheets.map((chunkName) => ({
      name: chunkName,
      content: cssChunks[chunkName].content,
    }));
    assets.stylesheets = null;
  }

  return assets;
}
