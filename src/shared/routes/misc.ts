export function loadAgreedSample(_: any, cb: any) {
  return import(/* webpackChunkName: "misc" */ "../components/organisms/AgreedSample").then(
    result => cb(null, result.default),
    cb,
  );
}

export function loadBar(_: any, cb: any) {
  return import(/* webpackChunkName: "misc" */ "../components/organisms/Bar").then(
    result => cb(null, result.default),
    cb,
  );
}

export function loadFoo(_: any, cb: any) {
  return import(/* webpackChunkName: "misc" */ "../components/organisms/Foo").then(
    result => cb(null, result.default),
    cb,
  );
}

export function loadHackerNews(_: any, cb: any) {
  return import(/* webpackChunkName: "misc" */ "../components/organisms/HackerNews").then(
    result => cb(null, result.default),
    cb,
  );
}

export function loadLargeForm(_: any, cb: any) {
  return import(/* webpackChunkName: "misc" */ "../components/organisms/LargeForm").then(
    result => cb(null, result.default),
    cb,
  );
}

export function loadLogin(_: any, cb: any) {
  return import(/* webpackChunkName: "misc" */ "../components/organisms/Login").then(
    result => cb(null, result.default),
    cb,
  );
}

export function loadUploadSample(_: any, cb: any) {
  return import(/* webpackChunkName: "misc" */ "../components/organisms/UploadSample").then(
    result => cb(null, result.default),
    cb,
  );
}
