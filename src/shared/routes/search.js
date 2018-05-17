/* @flow */
import createUniversalComponent from "./createUniversalComponent";

const chunkName = "search";

export function loadSearch(_: *, cb: Function) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "search" */ "../components/organisms/Search"),
    () => (require: any).resolveWeak("../components/organisms/Search"),
    chunkName
  ).then(result => cb(null, result), (cb: Function));
}

export function loadSearchForm(_: *, cb: Function) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "search" */ "../components/organisms/SearchForm"),
    () => (require: any).resolveWeak("../components/organisms/SearchForm"),
    chunkName
  ).then(result => cb(null, result), (cb: Function));
}
