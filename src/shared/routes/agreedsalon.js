import createUniversalComponent from "./createUniversalComponent";

const chunkName = "agreedsalon";

export function loadAgreedSalon(_, cb) {
  createUniversalComponent(
    () =>
      import(/* webpackChunkName: "agreedsalon" */ "../components/organisms/AgreedSalon"),
    () => require.resolveWeak("../components/organisms/AgreedSalon"),
    chunkName
  ).then(result => cb(null, result), cb);
}

export function loadAgreedSalonForm(_, cb) {
  createUniversalComponent(
    () =>
      import(/* webpackChunkName: "agreedsalon" */ "../components/organisms/AgreedSalonForm"),
    () => require.resolveWeak("../components/organisms/AgreedSalonForm"),
    chunkName
  ).then(result => cb(null, result), cb);
}
