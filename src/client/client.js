import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware, browserHistory, match, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from '../shared/packages/scroll-behavior/lib/useStandardScroll';
import { useAsyncLoader } from '../shared/packages/redux-async-loader';
import { useScrollBehavior, scrollTo } from '../shared/packages/scroll-behavior-middleware';
import Fetchr from 'fetchr';
import createStore from '../shared/redux/createStore';
import getRoutes from '../shared/routes';

const { __INITIAL_STATE__: initialState, __CLIENT_CONFIG__: clientConfig } = window;
delete window.__INITIAL_STATE__;
delete window.__CLIENT_CONFIG__;

const { history, store } = createHistoryAndStoore();
const routes = getRoutes(store);
const RenderWithMiddleware = applyRouterMiddleware(
  useAsyncLoader(),
  useScrollBehavior(),
);

// 非同期のonEnter()がある画面がサーバサイドレンダリングされるとクライアント
// サイドの最初のレンダリングも非同期 (画面の一部が未完成) となってハッシュが
// 合わなくなり、サーバサイドレダリングの結果が破棄されてしまう。
// 回避策としてクライアントサイドでも最初の表示はmatch()を使用して非同期処理が
// 終わった後にレンダリングする。
// matchの引数にbrowserHistoryがベースのhistoryを渡している (renderPropsを
// 通じて <Router> に渡る) ため、最初の表示後はhistoryの変化により通常通り
// レンダリングされる。
// https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md#async-routes
match({ routes, history }, (error, redirectLocation, renderProps) => {
  const content = (
    <Provider store={store} key="provider">
      <Router {...renderProps} render={(props) => <RenderWithMiddleware {...props} />} />
    </Provider>
  );
  render(content, document.getElementById('root'));
});

if (__DEVELOPMENT__) {
  window.React = React; // enable debugger
  const DevTools = require('../shared/components/utils/DevTools').default;
  const content = (
    <Provider store={store} key="provider">
      <DevTools />
    </Provider>
  );
  render(content, document.getElementById('devtools'));
}

function createHistoryAndStoore() {
  const createHistory = useRouterHistory(useScroll(() => browserHistory));
  const history = createHistory({ scrollTo });
  const store = createStore(initialState, {
    fetchr: new Fetchr(clientConfig.fetchr),
    fetchrCache: clientConfig.fetchrCache,
    history,
    devTools: __DEVELOPMENT__,
  });
  const syncHistory = syncHistoryWithStore(history, store);
  return { history: syncHistory, store };
}
