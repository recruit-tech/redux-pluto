import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import Immutable from 'seamless-immutable';
import { INITIAL_STATE, loadAllMasters, loadAreaMaster } from '../modules/masters';
import { createStore } from './lib/storeUtils';
import { isSameObject } from './lib/assertUtils';

/**
 * mock loadMaster service
 */
let areaMasters = ['tokyo', 'saitama', 'kanagawa'];
const services = [
  {
    name: 'areaMaster',
    read(req, resource, params, config, cb) {
      cb(null, areaMasters);
    },
  },
  {
    name: 'hairColorMaster',
    read(req, resource, params, config, cb) {
      cb(null, ['black', 'brown', 'blond']);
    },
  },
  {
    name: 'genderMaster',
    read(req, resource, params, config, cb) {
      cb(null, ['male', 'female']);
    },
  },
  {
    name: 'hairLengthMaster',
    read(req, resource, params, config, cb) {
      cb(null, ['long', 'short', 'middle']);
    },
  },
  {
    name: 'menuContentMaster',
    read(req, resource, params, config, cb) {
      cb(null, ['menu']);
    },
  },
];

services.forEach(Fetchr.registerService);

test('master: areaMaster success', () => {
  const loadAllMastersAction = loadAllMasters();
  const loadAreaMasterAction = loadAreaMaster();
  const initialState = Immutable({ app: { masters: INITIAL_STATE } });
  let prevMastersState = { app: {} };
  const store = createStore({
    initialState,
  });
  store.dispatch(loadAllMastersAction).then(() => {
    prevMastersState = store.getState().app.masters;
    areaMasters = ['okinawa', 'kagoshima'];
    return store.dispatch(loadAreaMasterAction);
  }).then(() => {
    const mastersState = store.getState().app.masters;
    assert.deepEqual(mastersState.areaMaster, {
      loading: false,
      loaded: true,
      items: areaMasters,
    });
    isSameObject(prevMastersState, mastersState, ['areaMaster']);
  });
});
