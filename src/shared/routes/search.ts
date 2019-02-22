import createUniversalComponent from "./createUniversalComponent";

const chunkName = "search";

export function loadSearch(_: any, cb: any) {
  createUniversalComponent(
    () =>
      import(/* webpackChunkName: "search" */ "../components/organisms/Search"),
    () => require.resolveWeak("../components/organisms/Search"),
    chunkName,
  ).then(result => cb(null, result), cb);
}

export function loadSearchForm(_: any, cb: any) {
  createUniversalComponent(
    () =>
      import(/* webpackChunkName: "search" */ "../components/organisms/SearchForm"),
    () => require.resolveWeak("../components/organisms/SearchForm"),
    chunkName,
  ).then(result => cb(null, result), cb);
}
