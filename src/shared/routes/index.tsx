// import React from "react";
// import { Route, IndexRoute } from "react-router-dom";
// import { checkLogin, logout } from "../redux/modules/auth";

// // non chunked components
// import {
//   App,
//   Error,
//   Footer,
//   Header,
//   Home,
//   Main,
//   NotFound,
//   DefaultLayout,
// } from "./main";

// // chunked components
// import {
//   loadAgreedSample,
//   loadBar,
//   loadLogin,
//   loadCanvas,
//   loadHackerNews,
//   loadUploadSample,
// } from "./misc";

// export default function getRoutes(store: any) {
//   const $Route: any = Route; // avoid type check
//   const $IndexRoute: any = IndexRoute; // avoid type check

//   return (
//     <Route path="/" component={App}>
//       <Route component={DefaultLayout}>
//         <Route components={{ header: Header, main: Main, footer: Footer }}>
//           <$IndexRoute component={Home} title="Home" />
//           <$Route path="bar" getComponent={loadBar} title="Bar" />

//           <$Route
//             path="agreedsample"
//             getComponent={loadAgreedSample}
//             title="Agreed Sample"
//           />

//           <$Route
//             path="uploadsample"
//             getComponent={loadUploadSample}
//             title="Upload Sample"
//           />

//           <$Route
//             path="canvas"
//             getComponent={loadCanvas}
//             title="Canvas Sample"
//           />

//           <$Route
//             path="hn"
//             getComponent={loadHackerNews}
//             onEnter={bindOnEnter(requiredLogin)}
//             title="Hacker News"
//           />

//           <$Route path="login" getComponent={loadLogin} title="Login" />
//           <$Route
//             path="logout"
//             onEnter={bindOnEnter(doLogout)}
//             title="Logout"
//           />

//           <$Route path="error" component={Error} status={500} title="Error" />
//           <$Route
//             path="*"
//             component={NotFound}
//             status={404}
//             title="Not Found"
//           />
//         </Route>
//       </Route>
//     </Route>
//   );

//   function bindOnEnter(handler: Function): any {
//     return (nextState: any, replace: any, cb: Function) =>
//       handler({ nextState, cb: bindCb(replace, cb) });
//   }

//   function bindCb(replace: any, cb: any) {
//     return (pathname: string) => {
//       if (pathname) {
//         replace(pathname);
//       }

//       cb();
//     };
//   }

//   // checkLogin 時にリクエストを送信し、BFFに確認しに行く
//   // BFFに確認しに行くため、遅い代わりにきちんと認可されてるか
//   function requiredLogin({ nextState, cb }: { nextState: any; cb: Function }) {
//     store
//       .dispatch(checkLogin())
//       .then(
//         () => cb(),
//         (_err: any) => cb(`/login?location=${nextState.location.pathname}`),
//       );
//   }

//   function doLogout({ cb }: { cb: Function }) {
//     store.dispatch(logout()).then(() => cb("/"), () => cb("/error"));
//   }

//   // function ignoreScrollBehavior(location: { action: string }) {
//   //   // REPLACEの時だけはスクロールを無視
//   //   return location.action === "REPLACE";
//   // }
// }
