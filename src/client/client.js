import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import { useAsyncLoader } from 'redux-async-loader';
import Fetchr from 'fetchr';
import createStore from 'shared/redux/createStore';
import getRoutes from 'shared/routes';

const RenderWithMiddleware = applyRouterMiddleware(
  useAsyncLoader(),
  useScroll((prevRouterProps, { location, routes }) => {
    if (routes.some((route) =>
        route.ignoreScrollBehavior && route.ignoreScrollBehavior(location))) {
      return false;
    }

    return true;
  }),
);

const initialState = JSON.parse(document.getElementById('initial-state').getAttribute('data-json'));
const clientConfig = JSON.parse(document.getElementById('client-config').getAttribute('data-json'));

const store = createStore(initialState, {
  cookie: [],
  fetchr: new Fetchr(clientConfig.fetchr),
  fetchrCache: clientConfig.fetchrCache,
  history: browserHistory,
  devTools: __DEVELOPMENT__,
});
const routes = getRoutes(store);
const history = syncHistoryWithStore(browserHistory, store, { adjustUrlOnReplay: __DEVELOPMENT__ });

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

if (__DEVELOPMENT__ && !window.devToolsExtension) {
  window.React = React; // enable debugger
  const DevTools =
    require('../shared/components/utils/DevTools').default; // eslint-disable-line global-require
  const content = (
    <Provider store={store} key="provider">
      <DevTools />
    </Provider>
  );
  render(content, document.getElementById('devtools'));
}
