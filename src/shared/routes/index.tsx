import React from "react";
import { Route, IndexRoute } from "react-router";
import { checkLogin, logout } from "../redux/modules/auth";

// non chunked components
import {
  App,
  Error,
  Footer,
  Header,
  Home,
  Main,
  NotFound,
  DefaultLayout,
} from "./main";

// chunked components
import {
  loadAgreedSample,
  loadBar,
  loadFoo,
  loadLargeForm,
  loadLogin,
  loadHackerNews,
  loadUploadSample,
} from "./misc";

import { loadSearchForm, loadSearch } from "./search";

export default function getRoutes(store: any) {
  return (
    <Route path="/" component={App}>
      <Route component={DefaultLayout}>
        <Route components={{ header: Header, main: Main, footer: Footer }}>
          <IndexRoute component={Home} />
          <Route path="foo" getComponent={loadFoo} />
          <Route path="bar" getComponent={loadBar} />

          <Route path="agreedsample" getComponent={loadAgreedSample} />

          <Route path="search" onEnter={bindOnEnter(requiredLogin)}>
            <IndexRoute
              queryKeys="keyword, page, more"
              getComponent={loadSearchForm}
              ignoreScrollBehavior={ignoreScrollBehavior}
            />
            <Route path=":searchId" getComponent={loadSearch} />
          </Route>

          <Route path="largeform" getComponent={loadLargeForm} />

          <Route path="uploadsample" getComponent={loadUploadSample} />

          <Route path="hn" getComponent={loadHackerNews} />

          <Route path="login" getComponent={loadLogin} />
          <Route path="logout" onEnter={bindOnEnter(doLogout)} />

          <Route path="error" component={Error} status={500} />
          <Route path="*" component={NotFound} status={404} />
        </Route>
      </Route>
    </Route>
  );

  function bindOnEnter(handler) {
    return (nextState, replace, cb) =>
      handler({ nextState, cb: bindCb(replace, cb) });
  }

  function bindCb(replace, cb) {
    return pathname => {
      if (pathname) {
        replace(pathname);
      }

      cb();
    };
  }

  function requiredLogin({ nextState, cb }) {
    store
      .dispatch(checkLogin())
      .then(
        () => cb(),
        err => cb(`/login?location=${nextState.location.pathname}`),
      );
  }

  function doLogout({ cb }) {
    store.dispatch(logout()).then(() => cb("/"), () => cb("/error"));
  }

  function ignoreScrollBehavior(location) {
    // REPLACEの時だけはスクロールを無視
    return location.action === "REPLACE";
  }
}
