import React from "react";
import { Route, IndexRoute } from "react-router";
import { logout } from "../redux/modules/auth";

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
  loadLogin,
  loadHackerNews,
  loadUploadSample,
} from "./misc";

export default function getRoutes(store: any) {
  const $Route: any = Route; // avoid type check

  return (
    <Route path="/" component={App}>
      <Route component={DefaultLayout}>
        <Route components={{ header: Header, main: Main, footer: Footer }}>
          <IndexRoute component={Home} />
          <Route path="bar" getComponent={loadBar} />

          <Route path="agreedsample" getComponent={loadAgreedSample} />

          <Route path="uploadsample" getComponent={loadUploadSample} />

          <Route path="hn" getComponent={loadHackerNews} />

          <Route path="login" getComponent={loadLogin} />
          <Route path="logout" onEnter={bindOnEnter(doLogout)} />

          <$Route path="error" component={Error} status={500} />
          <$Route path="*" component={NotFound} status={404} />
        </Route>
      </Route>
    </Route>
  );

  function bindOnEnter(handler: Function): any {
    return (nextState: any, replace: any, cb: Function) =>
      handler({ nextState, cb: bindCb(replace, cb) });
  }

  function bindCb(replace: any, cb: any) {
    return (pathname: string) => {
      if (pathname) {
        replace(pathname);
      }

      cb();
    };
  }

  // function requiredLogin({ nextState, cb }: { nextState: any; cb: Function }) {
  //   store
  //     .dispatch(checkLogin())
  //     .then(
  //       () => cb(),
  //       (_err: any) => cb(`/login?location=${nextState.location.pathname}`),
  //     );
  // }

  function doLogout({ cb }: { cb: Function }) {
    store.dispatch(logout()).then(() => cb("/"), () => cb("/error"));
  }

  // function ignoreScrollBehavior(location: { action: string }) {
  //   // REPLACEの時だけはスクロールを無視
  //   return location.action === "REPLACE";
  // }
}
