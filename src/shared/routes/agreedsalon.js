/* @flow */
import createUniversalComponent from "./createUniversalComponent";

const chunkName = "agreedsalon";

export function loadAgreedSalon(_: *, cb: Function) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "agreedsalon" */ "../components/organisms/AgreedSalon"),
    () => (require: any).resolveWeak("../components/organisms/AgreedSalon"),
    chunkName
  ).then(result => cb(null, result), cb);
}

export function loadAgreedSalonForm(_: *, cb: Function) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "agreedsalon" */ "../components/organisms/AgreedSalonForm"),
    () => (require: any).resolveWeak("../components/organisms/AgreedSalonForm"),
    chunkName
  ).then(result => cb(null, result), cb);
}
