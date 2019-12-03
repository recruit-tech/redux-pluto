import { inspect } from "util";
import React from "react";
import { ServerStyleSheet } from "styled-components";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { createMemoryHistory, match } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { loadOnServer } from "@recruit-tech/redux-async-loader";
import Fetchr from "fetchr";
import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import debugFactory from "debug";
import createStore from "../../shared/redux/createStore";
import { csrfAction } from "../../shared/redux/modules/csrf";
import getRoutes from "../../shared/routes";
import Html from "../components/Html";
import App from "../components/App";
import { MiddlewareAPI, AnyAction, Store } from "redux";
import { Request, Response } from "express";
import { RootState } from "../../shared/redux/modules/reducer";

const debug = debugFactory("app:server:middleware:reduxApp");

const logger = __DEVELOPMENT__
  ? (store: MiddlewareAPI) => (next: Function) => (action: AnyAction) => {
      debug(`Invoking action: ${inspect(action).replace(/\s*\n\s*/g, " ")}`);
      return next(action);
    }
  : null;

export default function createReduxApp(config: any) {
  const maxAge = Math.floor(config.offload.cache.maxAge / 1000);

  /*
   * 全リクエストで共有される初期データのためのStoreです。
   */
  const initialStore = createStore({} as any, {
    fetchr: new Fetchr({ ...config.fetchr, req: {} }),
    // @ts-ignore
    history: createMemoryHistory("/"),
    logger,
  });

  return reduxApp;

  /*
   * サーバサイドレンダリングのためのExpressミドルウェアです。
   */
  function reduxApp(
    req: Request & { csrfToken: any; useragent: ExpressUseragent.UserAgent },
    res: Response & { startTime: Function; endTime: Function },
    next: Function,
  ): void {
    // @ts-ignore
    const memoryHistory = createMemoryHistory(req.url);
    const timing = res;

    /*
     * リクエスト毎のStoreです。
     * 共有の初期ストアのステートを初期ステートとして使用します。
     */
    const store = createStore(initialStore.getState(), {
      fetchr: new Fetchr({ ...config.fetchr, req }),
      history: memoryHistory,
      logger,
    });
    const history = syncHistoryWithStore(memoryHistory, store);
    const clientConfig = getClientConfig(config, req);

    if (__DISABLE_SSR__) {
      return void renderCSR({
        res,
        store,
        config,
        clientConfig,
        timing,
      });
    }

    /*
     * 高負荷時にSSRをスキップするモードです。
     * オフロードモードをサポートしない場合は ./offloadDetector.js と一緒に削除してください。
     */
    if (__ENABLE_OFFLOAD__) {
      debug("offload mode, disable server-side rendering");
      res.set("cache-control", `max-age=${maxAge}`);
      return void renderCSR({
        res,
        store,
        config,
        clientConfig,
        timing,
      });
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

        const { title } = renderProps.routes[renderProps.routes.length - 1];
        const { useragent } = req;

        /*
         * 初期表示に必要なデータをフェッチします。
         */
        timing.startTime("prefetch", "Prefetch onLoad");
        store.dispatch(csrfAction(req.csrfToken()));
        return Promise.all([loadOnServer(renderProps, store)])
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
              title,
              useragent,
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
              title,
              useragent,
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

function getClientConfig(config: any, req: Request & { csrfToken: any }) {
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

function matchRoutes(options: any) {
  return new Promise((resolve, reject) => {
    (match as any)(
      options,
      (error: Error, redirectLocation: string, renderProps: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({ redirectLocation, renderProps });
        }
      },
    );
  });
}

function renderCSR({ res, store, config, clientConfig, timing }: any) {
  const assets = (flushChunks as any)(config.clientStats);
  sendCSRResponse({
    res,
    store,
    status: 200,
    clientConfig,
    assets,
    timing,
  } as any);
}

function renderSSR({
  res,
  store,
  renderProps,
  config,
  clientConfig,
  timing,
  title,
  useragent,
}: {
  res: Response;
  store: Store<RootState>;
  renderProps: any;
  config: any;
  clientConfig: any;
  timing: any;
  title: string;
  useragent: ExpressUseragent.UserAgent;
}) {
  /*
   * メインコンテンツをレンダリングします。
   */

  const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
  const jsx = sheet.collectStyles(<App store={store} {...renderProps} />);
  const content = renderToString(jsx);
  const styles = sheet.getStyleElement();

  const { routes } = renderProps;
  const status = routes[routes.length - 1].status || 200;

  const chunkNames = flushChunkNames();
  const assets = flushChunks(config.clientStats, { chunkNames });

  sendSSRResponse({
    res,
    status,
    store,
    content,
    clientConfig,
    assets,
    timing,
    title,
    styles,
    useragent,
  });
}

function sendCSRResponse({
  res,
  status,
  store,
  clientConfig,
  content,
  assets,
  timing,
}: {
  res: Response;
  status: number;
  store: Store<RootState>;
  clientConfig: any;
  content: any;
  assets: any;
  timing: any;
}) {
  timing.startTime("html", "Rendering HTML");
  const props = {
    content,
    assets,
    initialState: JSON.stringify(store.getState()),
    clientConfig: JSON.stringify(clientConfig),
  };
  const html = renderToStaticMarkup(<Html {...props} />);
  timing.endTime("html");
  res.status(status).send(`<!doctype html>\n${html}`);
}

function sendSSRResponse({
  res,
  status,
  store,
  clientConfig,
  assets,
  content,
  timing,
  title,
  styles,
  useragent,
}: {
  res: Response;
  status: number;
  store: Store<RootState>;
  clientConfig: any;
  content: any;
  assets: any;
  timing: any;
  title: string;
  styles: any[];
  useragent: ExpressUseragent.UserAgent;
}) {
  /*
   * HTML全体をレンダリングします。
   */
  timing.startTime("html", "Rendering HTML");
  timing.startTime("ssr", "Server Side Rendering");

  res.set("Content-Type", "text/html");

  const props = {
    content,
    assets,
    styles,
    title,
    useragent,
    initialState: JSON.stringify(store.getState()),
    clientConfig: JSON.stringify(clientConfig),
  };

  const html = renderToStaticMarkup(<Html {...props} />);
  timing.endTime("ssr");
  timing.endTime("html");
  res.status(status).send(`<!doctype html>\n${html}`);
}
