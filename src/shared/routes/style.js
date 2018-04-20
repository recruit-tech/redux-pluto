// /* @flow */
// import createUniversalComponent from "./createUniversalComponent";
//
// const chunkName = "style";
//
// export function loadStyle(_: *, cb: Function) {
//   createUniversalComponent(
//     () => import(/* webpackChunkName: "style" */ "../components/organisms/Style"),
//     () => (require: any).resolveWeak("../components/organisms/Style"),
//     chunkName
//   ).then(result => cb(null, result), (cb: Function));
// }
//
// export function loadStyleList(_: *, cb: Function) {
//   createUniversalComponent(
//     () => import(/* webpackChunkName: "style" */ "../components/organisms/StyleList"),
//     () => (require: any).resolveWeak("../components/organisms/StyleList"),
//     chunkName
//   ).then(result => cb(null, result), (cb: Function));
// }
