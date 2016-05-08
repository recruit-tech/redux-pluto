import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/organisms/App';
import Bar from './components/organisms/Bar';
import Error from './components/organisms/Error';
import Foo from './components/organisms/Foo';
import Footer from './components/organisms/Footer';
import Header from './components/organisms/Header';
import Home from './components/organisms/Home';
import Login from './components/organisms/Login';
import Main from './components/organisms/Main';
import NotFound from './components/organisms/NotFound';
import Style from './components/organisms/Style';
import StyleList from './components/organisms/StyleList';
import DefaultLayout from './components/templates/DefaultLayout';
import { checkLogin, logout } from './redux/modules/auth';

export default function getRoutes(store) {
  return (
    <Route path="/" component={App}>
      <Route component={DefaultLayout}>
        <Route components={{ header: Header, main: Main, footer: Footer }}>
          <IndexRoute component={Home} />

          <Route path="style" onEnter={bindOnEnter(requiredLogin)}>
            <IndexRoute component={Style} />
            <Route path=":gender" component={Style} onChange={bindOnChange(requiredLogin)}>
              <Route path=":hairLength" component={StyleList} />
            </Route>
          </Route>

          <Route path="login" component={Login} />
          <Route path="logout" onEnter={bindOnEnter(doLogout)} />

          <Route path="foo" component={Foo} />
          <Route path="bar" component={Bar} />
          <Route path="error" component={Error} status={500} />
          <Route path="*" component={NotFound} status={404} />
        </Route>
      </Route>
    </Route>
  );

  function bindOnEnter(handler) {
    return (nextState, replace, cb) => handler({ nextState, cb: bindCb(replace, cb) });
  }

  function bindOnChange(handler) {
    return (prevState, nextState, replace, cb) => handler({ prevState, nextState, cb: bindCb(replace, cb) });
  }

  function bindCb(replace, cb) {
    return (pathname) => {
      if (pathname) {
        replace(pathname);
      }

      cb();
    };
  }

  function requiredLogin({ nextState, cb }) {
    store.dispatch(checkLogin()).then(
      () => cb(),
      (err) => cb(`/login?location=${nextState.location.pathname}`)
    );
  }

  function doLogout({ cb }) {
    store.dispatch(logout()).then(
      () => cb('/'),
      () => cb('/error'),
    );
  }
}
