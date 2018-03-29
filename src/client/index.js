/* eslint-disable global-require */
import "babel-polyfill";
import React from "react";
import { hydrate, unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { browserHistory, match } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { createLocationSubscriber } from "react-redux-analytics";
import Fetchr from "fetchr";
import createStore from "shared/redux/createStore";
import App from "client/components/App";
import analyticsOptions from "shared/redux/analytics/options";
import siteCatalystOptions from "client/analytics";

const store = configStore();
const history = syncHistoryWithStore(browserHistory, store, {
  adjustUrlOnReplay: __DEVELOPMENT__
});
const root = document.getElementById("root");

// 初回表示直後に、表示している画面と同じURLのリンクをクリックした場合にPUSHステートされてしまう現象の回避策。
// 通常、現在表示している画面と同じURLへのPUSHはHistoryモジュールによりREPLACEに置換される。
// https://github.com/ReactTraining/history/blob/57d24e6/modules/createHistory.js#L105
// しかし、初回表示時点ではcurrentLocationが未設定のためにprevPathが得られず、PUSHされてしまう。
// これを回避するため、ここで現在のロケーションにREPLACEすることでcurrentLocationを設定する。
history.replace(history.getCurrentLocation());

const locationSubscriber = createLocationSubscriber(store);
history.listen(location => {
  // At the moment, we do not use page stack functionality of react-redux-analytics.
  // console.log(location);
  locationSubscriber.notify(location, "replace");
});

renderApp().then(() => {
  if (__DEVELOPMENT__) {
    configHotLoader();

    if (!window.devToolsExtension) {
      renderDevTool();
    }
  }
});

function configStore() {
  const getJson = id =>
    JSON.parse(document.getElementById(id).getAttribute("data-json"));
  const initialState = getJson("initial-state");
  const clientConfig = getJson("client-config");

  return createStore(initialState, {
    cookie: [],
    csrfToken: clientConfig.csrfToken,
    fetchr: new Fetchr(clientConfig.fetchr),
    fetchrCache: clientConfig.fetchrCache,
    history: browserHistory,
    devTools: __DEVELOPMENT__,
    analytics: analyticsOptions,
    siteCatalyst: siteCatalystOptions
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
    match({ routes, history }, (error, redirectLocation, renderProps) => {
      // redirect が必要で、 SSR モードがオフの時に renderProps が空になるため
      // hydrate に失敗する事がある。
      // SSR が有効の場合は redirect は server の response で行われるのでこの処理は不要。
      if (__DISABLE_SSR__ && redirectLocation && !renderProps) {
        location.replace(
          `${redirectLocation.pathname}${redirectLocation.search}`
        );
        return resolve();
      }
      hydrate(<App store={store} {...renderProps} />, root);
      return resolve();
    });
  });
}

function getRoutes() {
  const routes = require("../shared/routes").default;
  return routes(store);
}

function configHotLoader() {
  module.hot.accept("../shared/routes", () => {
    unmountComponentAtNode(root);
    renderApp();
  });

  module.hot.accept("../shared/redux/modules/reducer", () => {
    const nextReducer = require("../shared/redux/modules/reducer").default;
    store.replaceReducer(nextReducer);
  });
}

function renderDevTool() {
  if (__DEVELOPMENT__) {
    window.React = React; // enable debugger
    const DevTools = require("../shared/components/utils/DevTools").default;
    const content = (
      <Provider store={store} key="provider">
        <DevTools />
      </Provider>
    );
    hydrate(content, document.getElementById("devtools"));
  }
}
