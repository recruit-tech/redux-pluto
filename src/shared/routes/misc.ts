import createUniversalComponent from "./createUniversalComponent";

const chunkName = "misc";

export function loadAgreedSample(_: any, cb: any) {
  createUniversalComponent(
    () =>
      import(
        /* webpackChunkName: "misc" */ "../components/organisms/AgreedSample"
      ),
    // @ts-ignore
    () => require.resolveWeak("../components/organisms/AgreedSample"),
    chunkName,
  ).then(result => cb(null, result), cb);
}

export function loadBar(_: any, cb: any) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ "../components/organisms/Bar"),
    // @ts-ignore
    () => require.resolveWeak("../components/organisms/Bar"),
    chunkName,
  ).then(result => cb(null, result), cb);
}

export function loadHackerNews(_: any, cb: any) {
  createUniversalComponent(
    () =>
      import(
        /* webpackChunkName: "misc" */ "../components/organisms/HackerNews"
      ),
    // @ts-ignore
    () => require.resolveWeak("../components/organisms/HackerNews"),
    chunkName,
  ).then(result => cb(null, result), cb);
}

export function loadLogin(_: any, cb: any) {
  createUniversalComponent(
    () =>
      import(/* webpackChunkName: "misc" */ "../components/organisms/Login"),
    // @ts-ignore
    () => require.resolveWeak("../components/organisms/Login"),
    chunkName,
  ).then(result => cb(null, result), cb);
}

export function loadCanvas(_: any, cb: any) {
  createUniversalComponent(
    () =>
      import(/* webpackChunkName: "misc" */ "../components/organisms/Canvas"),
    // @ts-ignore
    () => require.resolveWeak("../components/organisms/Canvas"),
    chunkName,
  ).then(result => cb(null, result), cb);
}

export function loadUploadSample(_: any, cb: any) {
  createUniversalComponent(
    () =>
      import(
        /* webpackChunkName: "misc" */ "../components/organisms/UploadSample"
      ),
    // @ts-ignore
    () => require.resolveWeak("../components/organisms/UploadSample"),
    chunkName,
  ).then(result => cb(null, result), cb);
}
