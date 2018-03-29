import createUniversalComponent from "./createUniversalComponent";

const chunkName = "style";

export function loadStyle(_, cb) {
  createUniversalComponent(
    () =>
      import(/* webpackChunkName: "style" */ "../components/organisms/Style"),
    () => require.resolveWeak("../components/organisms/Style"),
    chunkName
  ).then(result => cb(null, result), cb);
}

export function loadStyleList(_, cb) {
  createUniversalComponent(
    () =>
      import(/* webpackChunkName: "style" */ "../components/organisms/StyleList"),
    () => require.resolveWeak("../components/organisms/StyleList"),
    chunkName
  ).then(result => cb(null, result), cb);
}
