import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Bar from './components/atoms/Bar';
import Error from './components/atoms/Error';
import Foo from './components/atoms/Foo';
import Home from './components/atoms/Home';
import NotFound from './components/atoms/NotFound';
import App from './components/organisms/App';
import Style from './components/organisms/Style';
import StyleList from './components/organisms/StyleList';
import Login from './components/organisms/Login';
import { checkLogin, logout } from './redux/modules/auth';

export default function getRoutes(store) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />

      <Route path="style" onEnter={bindStore(store, requiredLogin)}>
        <IndexRoute component={Style} />
        <Route path=":gender" component={Style}>
          <Route path=":hairLength" component={StyleList} />
        </Route>
      </Route>

      <Route path="login" component={Login} />
      <Route path="logout" onEnter={bindStore(store, doLogout)} />

      <Route path="foo" component={Foo} />
      <Route path="bar" component={Bar} />
      <Route path="error" component={Error} status={500} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
}

function bindStore(store, handler) {
  return (nextState, replace, cb) => handler(store.dispatch, nextState, (path) => {
    if (path) {
      replace(path);
    }

    cb();
  });
}

function requiredLogin(dispatch, nextState, cb) {
  dispatch(checkLogin()).then(
    () => cb(),
    (err) => cb(err.statusCode === 401 ? `/login?location=${nextState.location.pathname}` : '/error')
  );
}

function doLogout(dispatch, nextState, cb) {
  dispatch(logout()).then(
    () => cb('/'),
    () => cb('/error'),
  );
}
