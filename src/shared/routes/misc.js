/* @flow */
import createUniversalComponent from "./createUniversalComponent";

const chunkName = "misc";

export function loadAgreedSample(_: *, cb: Function) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ "../components/organisms/AgreedSample"),
    () => (require: any).resolveWeak("../components/organisms/AgreedSample"),
    chunkName
  ).then(result => cb(null, result), (cb: Function));
}

export function loadBar(_: *, cb: Function) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ "../components/organisms/Bar"),
    () => (require: any).resolveWeak("../components/organisms/Bar"),
    chunkName
  ).then(result => cb(null, result), (cb: Function));
}

export function loadFoo(_: *, cb: Function) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ "../components/organisms/Foo"),
    () => (require: any).resolveWeak("../components/organisms/Foo"),
    chunkName
  ).then(result => cb(null, result), (cb: Function));
}

export function loadLargeForm(_: *, cb: Function) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ "../components/organisms/LargeForm"),
    () => (require: any).resolveWeak("../components/organisms/LargeForm"),
    chunkName
  ).then(result => cb(null, result), (cb: Function));
}

export function loadLogin(_: *, cb: Function) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ "../components/organisms/Login"),
    () => (require: any).resolveWeak("../components/organisms/Login"),
    chunkName
  ).then(result => cb(null, result), (cb: Function));
}

export function loadUploadSample(_: *, cb: Function) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "misc" */ "../components/organisms/UploadSample"),
    () => (require: any).resolveWeak("../components/organisms/UploadSample"),
    chunkName
  ).then(result => cb(null, result), (cb: Function));
}
