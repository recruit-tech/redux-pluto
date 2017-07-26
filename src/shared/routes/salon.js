import createUniversalComponent from './createUniversalComponent';

const chunkName = 'salon';

export function loadSalon(_, cb) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "salon" */ '../components/organisms/Salon'),
    () => require.resolveWeak('../components/organisms/Salon'),
    chunkName,
  ).then((result) => cb(null, result), cb);
}

export function loadSalonForm(_, cb) {
  createUniversalComponent(
    () => import(/* webpackChunkName: "salon" */ '../components/organisms/SalonForm'),
    () => require.resolveWeak('../components/organisms/SalonForm'),
    chunkName,
  ).then((result) => cb(null, result), cb);
}
