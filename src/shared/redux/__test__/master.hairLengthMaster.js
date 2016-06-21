import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import { createStore } from './lib/storeUtils';
import { INITIAL_STATE, loadAllMasters, loadHairLengthMaster } from '../modules/masters';
import Immutable from 'seamless-immutable';

/**
 * mock loadMaster service
 */
let hairLengthMaster = ['long', 'short', 'middle'];
const services = [
  {
    name: 'areaMaster',
    read(req, resource, params, config, cb) {
      cb(null, ['tokyo', 'saitama', 'kanagawa']);
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
      cb(null, hairLengthMaster);
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

test('master: hairLengthMaster success', () => {
  const loadAllMastersAction = loadAllMasters();
  const loadHairLengthMasterAction = loadHairLengthMaster();
  const initialState = Immutable({ masters: INITIAL_STATE });
  const store = createStore({
    initialState,
  });
  let prevMastersState = {};
  store.dispatch(loadAllMastersAction).then(() => {
    prevMastersState = store.getState().masters;
    hairLengthMaster = ['semilong'];
    return store.dispatch(loadHairLengthMasterAction);
  }).then(() => {
    const mastersState = store.getState().masters;
    assert.deepEqual(mastersState.hairLengthMaster, {
      loading: false,
      loaded: true,
      items: hairLengthMaster,
    });
    assert(prevMastersState.areaMaster === mastersState.areaMaster);
    assert(prevMastersState.hairColorMaster === mastersState.hairColorMaster);
    assert(prevMastersState.genderMaster === mastersState.genderMaster);
    assert(prevMastersState.menuContentMaster === mastersState.menuContentMaster);
  });
});
