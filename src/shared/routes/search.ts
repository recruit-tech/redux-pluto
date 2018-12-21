export function loadSearch(_: any, cb: any) {
  return import(/* webpackChunkName: "search" */ "../components/organisms/Search").then(
    result => cb(null, result),
    cb,
  );
}

export function loadSearchForm(_: any, cb: any) {
  return import(/* webpackChunkName: "search" */ "../components/organisms/SearchForm").then(
    result => cb(null, result),
    cb,
  );
}
