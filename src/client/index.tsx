/* eslint-disable global-require */

/* eslint-disable-next-line */
import React from "react";
import { hydrate, unmountComponentAtNode } from "react-dom";
import { browserHistory, match } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import Fetchr from "fetchr";
import createStore from "../shared/redux/createStore";
import App from "./components/App";

const isDevToolVisible = __DEVELOPMENT__ && !__MOCK_BUILD__;

const store = configStore();
const history = syncHistoryWithStore(browserHistory, store, {
  adjustUrlOnReplay: __DEVELOPMENT__,
});
const root = document.getElementById("root");

renderApp().then(() => {
  if (isDevToolVisible) {
    configHotLoader();
  }
});

function configStore() {
  const getJson = (id: string) =>
    JSON.parse((document.getElementById(id) as any).getAttribute("data-json"));
  const initialState = getJson("initial-state");
  const clientConfig = getJson("client-config");

  return createStore(initialState, {
    csrfToken: clientConfig.csrfToken,
    fetchr: new Fetchr(clientConfig.fetchr),
    fetchrCache: clientConfig.fetchrCache,
    history: browserHistory,
    devTools: isDevToolVisible,
    mockBuild: __MOCK_BUILD__ ? clientConfig.mockBuild : false,
  });
}

function renderApp() {
  const routes = getRoutes();

  return new Promise(resolve => {
    // 非同期のonEnter()がある画面がサーバサイドレンダリングされるとクライアント
    // サイドの最初のレンダリングも非同期 (画面の一部が未完成) となってハッシュが
    // 合わなくなり、サーバサイドレダリングの結果が破棄されてしまう。
    // 回避策としてクライアントサイドでも最初の表示はmatch()を使用して非同期処理が
    // 終わった後にレンダリングする。
    // matchの引数にbrowserHistoryがベースのhistoryを渡している (renderPropsを
    // 通じて <Router> に渡る) ため、最初の表示後はhistoryの変化により通常通り
    // レンダリングされる。
    match(
      { routes, history },
      (error: Error, redirectLocation: any, renderProps: {}) => {
        // redirect が必要で、 SSR モードがオフの時に renderProps が空になるため
        // hydrate に失敗する事がある。
        // SSR が有効の場合は redirect は server の response で行われるのでこの処理は不要。
        if (__DISABLE_SSR__ && redirectLocation && !renderProps) {
          window.location.replace(
            `${redirectLocation.pathname}${redirectLocation.search}`,
          );
          return resolve();
        }
        if (root) {
          hydrate(<App store={store} {...renderProps} />, root);
        }
        return resolve();
      },
    );
  });
}

function getRoutes() {
  const routes = require("../shared/routes").default;
  return routes(store);
}

function configHotLoader() {
  (module as any).hot.accept("../shared/routes", () => {
    if (root) {
      unmountComponentAtNode(root);
    }
    renderApp();
  });

  // module.hot is extension by hot-loader
  (module as any).hot.accept("../shared/redux/modules/reducer", () => {
    const nextReducer = require("../shared/redux/modules/reducer").default;
    store.replaceReducer(nextReducer);
  });
}
