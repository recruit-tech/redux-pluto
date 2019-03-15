import { Error, Home, NotFound } from "./main";
import {
  loadAgreedSample,
  loadBar,
  loadCanvas,
  loadHackerNews,
  loadLogin,
  loadUploadSample,
} from "./misc";
// import { Component } from "react";

export const routes: Array<any> = [
  { path: "/", component: Home, title: "Home" },
  { getComponent: loadBar, title: "Bar" },
  {
    path: "agreedsample",
    getComponent: loadAgreedSample,
    title: "Agreed Sample",
  },
  {
    path: "uploadsample",
    getComponent: loadUploadSample,
    title: "Upload Sample",
  },
  {
    path: "canvas",
    getComponent: loadCanvas,
    title: "Canvas Sample",
  },
  {
    path: "hn",
    getComponent: loadHackerNews,
    // onEnter: bindOnEnter(requiredLogin),
    // requiredLogin: () => {
    //   return {

    //   }
    // },
    // loadData: (store) => {
    //   Component.load()
    //   store.dispatch({type: 'load-hn'})
    // },
    title: "Hacker News",
  },
  {
    path: "login",
    getComponent: loadLogin,
    title: "Login",
  },
  {
    path: "logout",
    // onEnter: bindOnEnter(doLogout),
    title: "Logout",
  },
  {
    path: "error",
    component: Error,
    status: 500,
    title: "Error",
  },
  {
    path: "*",
    component: NotFound,
    status: 404,
    title: "Not Found",
  },
];

// function bindOnEnter(handler: Function): any {
//   return (nextState: any, replace: any, cb: Function) =>
//     handler({ nextState, cb: bindCb(replace, cb) });
// }

// function bindCb(replace: any, cb: any) {
//   return (pathname: string) => {
//     if (pathname) {
//       replace(pathname);
//     }

//     cb();
//   };
// }

// checkLogin 時にリクエストを送信し、BFFに確認しに行く
// BFFに確認しに行くため、遅い代わりにきちんと認可されてるか
// function requiredLogin({ nextState, cb }: { nextState: any; cb: Function }) {
//   store
//     .dispatch(checkLogin())
//     .then(
//       () => cb(),
//       (_err: any) => cb(`/login?location=${nextState.location.pathname}`),
//     );
// }

// function doLogout({ cb }: { cb: Function }) {
//   store.dispatch(logout()).then(() => cb("/"), () => cb("/error"));
// }
