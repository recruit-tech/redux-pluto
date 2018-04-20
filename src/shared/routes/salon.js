// /* @flow */
// import createUniversalComponent from "./createUniversalComponent";
//
// const chunkName = "salon";
//
// export function loadSalon(_: *, cb: Function) {
//   createUniversalComponent(
//     () => import(/* webpackChunkName: "salon" */ "../components/organisms/Salon"),
//     () => (require: any).resolveWeak("../components/organisms/Salon"),
//     chunkName
//   ).then(result => cb(null, result), (cb: Function));
// }
//
// export function loadSalonForm(_: *, cb: Function) {
//   createUniversalComponent(
//     () => import(/* webpackChunkName: "salon" */ "../components/organisms/SalonForm"),
//     () => (require: any).resolveWeak("../components/organisms/SalonForm"),
//     chunkName
//   ).then(result => cb(null, result), (cb: Function));
// }
