import createUniversalComponent from './createUniversalComponent';

const chunkName = 'misc';

export function loadAgreedSample(_, cb) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ '../components/organisms/AgreedSample'),
    () => require.resolveWeak('../components/organisms/AgreedSample'),
    chunkName,
  ).then((result) => cb(null, result), cb);
}

export function loadBar(_, cb) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ '../components/organisms/Bar'),
    () => require.resolveWeak('../components/organisms/Bar'),
    chunkName,
  ).then((result) => cb(null, result), cb);
}

export function loadFoo(_, cb) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ '../components/organisms/Foo'),
    () => require.resolveWeak('../components/organisms/Foo'),
    chunkName,
  ).then((result) => cb(null, result), cb);
}

export function loadLargeForm(_, cb) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ '../components/organisms/LargeForm'),
    () => require.resolveWeak('../components/organisms/LargeForm'),
    chunkName,
  ).then((result) => cb(null, result), cb);
}

export function loadLogin(_, cb) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ '../components/organisms/Login'),
    () => require.resolveWeak('../components/organisms/Login'),
    chunkName,
  ).then((result) => cb(null, result), cb);
}

export function loadUploadSample(_, cb) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ '../components/organisms/UploadSample'),
    () => require.resolveWeak('../components/organisms/UploadSample'),
    chunkName,
  ).then((result) => cb(null, result), cb);
}
