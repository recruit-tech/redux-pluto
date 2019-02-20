import { inspect } from "util";
import React from "react";
import { ServerStyleSheet } from "styled-components";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { createMemoryHistory, match } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { loadOnServer } from "redux-async-loader";
import Fetchr from "fetchr";
import { noop } from "lodash/fp";
import debugFactory from "debug";
import createStore from "../../shared/redux/createStore";
import { loadAllMasters as loadAllMastersAction } from "../../shared/redux/modules/masters";
import { checkLogin } from "../../shared/redux/modules/auth";
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
    cookie: [{ cookies: {} }, {}],
    fetchr: new Fetchr({ ...config.fetchr, req: {} }),
    // @ts-ignore
    history: createMemoryHistory("/"),
    logger,
  });

  debug("Loading initial data");
  config.promises.push(
    Promise.all([initialStore.dispatch(loadAllMastersAction() as any)]).then(
      () => {
        debug("Loaded initial data");
      },
    ),
  );

  return reduxApp;

  /*
   * サーバサイドレンダリングのためのExpressミドルウェアです。
   */
  function reduxApp(
    req: Request & { csrfToken: any },
    res: Response,
    next: Function,
  ): void {
    // @ts-ignore
    const memoryHistory = createMemoryHistory(req.url);
    const timing: any = __DEVELOPMENT__
      ? res
      : { startTime: noop, endTime: noop };

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
          store.dispatch(checkLogin() as any).catch(() => null),
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
  sendCSRResponse({
    res,
    store,
    status: 200,
    clientConfig,
    timing,
  } as any);
}

function renderSSR({
  res,
  store,
  renderProps,
  clientConfig,
  timing,
}: {
  res: Response;
  store: Store<RootState>;
  renderProps: any;
  clientConfig: any;
  timing: any;
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

  sendSSRResponse({
    res,
    status,
    store,
    content,
    clientConfig,
    timing,
    styles,
  });
}

function sendCSRResponse({
  res,
  status,
  store,
  clientConfig,
  content,
  timing,
}: {
  res: Response;
  status: number;
  store: Store<RootState>;
  clientConfig: any;
  content: any;
  timing: any;
}) {
  timing.startTime("html", "Rendering HTML");
  const props = {
    content,
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
  content,
  timing,
  styles,
}: {
  res: Response;
  status: number;
  store: Store<RootState>;
  clientConfig: any;
  content: any;
  timing: any;
  styles: any[];
}) {
  /*
   * HTML全体をレンダリングします。
   */
  timing.startTime("html", "Rendering HTML");
  timing.startTime("ssr", "Server Side Rendering");

  res.set("Content-Type", "text/html");

  timing.endTime("ssr");
  const props = {
    content,
    styles,
    initialState: JSON.stringify(store.getState()),
    clientConfig: JSON.stringify(clientConfig),
  };

  const html = renderToStaticMarkup(<Html {...props} />);
  res.status(status).send(`<!doctype html>\n${html}`);
}
