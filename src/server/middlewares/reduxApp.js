import fs from "fs";
import path from "path";
import { inspect } from "util";
import React from "react";
import { ServerStyleSheet } from "styled-components";
import {
  renderToString,
  renderToStaticMarkup,
} from "react-dom/server";
import { createMemoryHistory, match } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { loadOnServer } from "redux-async-loader";
import Fetchr from "fetchr";
import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import { mapValues, noop, transform } from "lodash/fp";
import debugFactory from "debug";
import createStore from "../../shared/redux/createStore";
import { loadAllMasters as loadAllMastersAction } from "../../shared/redux/modules/masters";
import { checkLogin } from "../../shared/redux/modules/auth";
import { csrfAction } from "../../shared/redux/modules/csrf";
import getRoutes from "../../shared/routes";
import Html from "../components/Html";
import App from "../components/App";

const debug = debugFactory("app:server:middleware:reduxApp");

const logger = __DEVELOPMENT__
  ? store => next => action => {
      debug(`Invoking action: ${inspect(action).replace(/\s*\n\s*/g, " ")}`);
      return next(action);
    }
  : null;

export default function createReduxApp(config) {
  const maxAge = Math.floor(config.offload.cache.maxAge / 1000);

  /*
   * 全リクエストで共有される初期データのためのStoreです。
   */
  const initialStore = createStore(
    {},
    {
      cookie: [{ cookies: {} }, {}],
      fetchr: new Fetchr({ ...config.fetchr, req: {} }),
      history: createMemoryHistory("/"),
      logger,
    },
  );

  debug("Loading initial data");
  config.promises.push(
    Promise.all([initialStore.dispatch(loadAllMastersAction())]).then(() => {
      debug("Loaded initial data");
    }),
  );

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
      debug("offload mode, disable server-side rendering");
      res.set("cache-control", `max-age=${maxAge}`);
      return void renderCSR({ res, store, config, clientConfig, timing });
    }

    /*
     * React-Routerのルーティング定義とマッチングを行います。
     */
    matchRoutes({ history, routes: getRoutes(store) })
      .then(({ redirectLocation, renderProps }) => {
        if (redirectLocation) {
          return res.redirect(
            302,
            redirectLocation.pathname + redirectLocation.search,
          );
        }

        if (!renderProps) {
          return next();
        }

        /*
       * 初期表示に必要なデータをフェッチします。
       */
        timing.startTime("prefetch", "Prefetch onLoad");
        store.dispatch(csrfAction(req.csrfToken()));
        return Promise.all([
          loadOnServer(renderProps, store),
          store.dispatch(checkLogin()).catch(() => null),
        ])
          .then(() => {
            timing.endTime("prefetch");

            /*
            * サーバサイドレンダリングを行います。
            */
            renderSSR({
              res,
              store,
              renderProps,
              config,
              clientConfig,
              timing,
            });
          })
          .catch(err => {
            debug(err);
            // status コードを見て、 500 系の場合は render しない
            if (!err.statusCode || err.statusCode >= 500) {
              throw err;
            }
            // TODO(yosuke): 401系だったらリダイレクトが良いかも。
            // その他の400系の場合は render させる
            res.statusCode = err.statusCode;
            return renderSSR({
              res,
              store,
              renderProps,
              config,
              clientConfig,
              timing,
            });
          });
      })
      .catch(err => {
        debug(err);
        debug(store.getState());
        debug(store.getState().routing);
        return next(err);
      });
  }
}

function getClientConfig(config, req) {
  const { fetchr, ...clientConfig } = config.clientConfig;
  const csrfToken = req.csrfToken();
  return {
    ...clientConfig,
    fetchr: {
      ...fetchr,
      context: {
        ...fetchr.context,
        _csrf: csrfToken,
      },
    },
    csrfToken,
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
  sendCSRResponse({ res, store, status: 200, clientConfig, timing });
}

function renderSSR({
  res,
  store,
  renderProps,
  config,
  clientConfig,
  timing,
}) {
  /*
   * メインコンテンツをレンダリングします。
   */

  const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
  const jsx = sheet.collectStyles(<App store={store} {...renderProps} />);
  timing.startTime("ssr", "Server Side Rendering");
  const content = renderToString(jsx);
  timing.endTime("ssr");
  const styles = sheet.getStyleTags();
  const assets = getAssets({ clientStats: config.clientStats });

  const { routes } = renderProps;
  const status = routes[routes.length - 1].status || 200;
  sendSSRResponse({
    res,
    status,
    store,
    content,
    clientConfig,
    timing,
    styles,
    assets,
  });
}

function sendCSRResponse({
  res,
  status,
  store,
  clientConfig,
  content,
  timing,
}) {
  const props = {
    content,
    initialState: JSON.stringify(store.getState()),
    clientConfig: JSON.stringify(clientConfig),
  };
  timing.startTime("html", "Rendering HTML");
  const html = renderToStaticMarkup(<Html {...props} />);
  timing.endTime("html");
  res.status(status).send(`<!doctype html>\n${html}`);
}

function sendSSRResponse({
  res,
  status,
  store,
  clientConfig,
  content,
  timing,
  styles,
  assets,
}) {
  /*
   * HTML全体をレンダリングします。
   */

  res.set("Content-Type", "text/html");
  const props = {
    content,
    styles,
    assets,
    initialState: JSON.stringify(store.getState()),
    clientConfig: JSON.stringify(clientConfig),
  };
  res.write("<!doctype html>\n");
  timing.startTime("html", "Rendering HTML");
  const html = renderToStaticMarkup(<Html {...props} />);
  timing.endTime("html");
  res.end(html);
}

/*
 * コードスプリットされたチャンクに関する情報を収集します。
 * SSRで実際に使用されたチャンクのみをレンダリングできるようにします。
 */
function getAssets({ clientStats }) {
  const chunkNames = flushChunkNames();
  const assets = flushChunks(clientStats, { chunkNames });
  return assets;
}
