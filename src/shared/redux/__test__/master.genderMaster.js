import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import { createStore } from './lib/storeUtils';
import { INITIAL_STATE, loadAllMasters, loadGenderMaster } from '../modules/masters';
import Immutable from 'seamless-immutable';

/**
 * mock loadMaster service
 */
let genderMaster = ['male', 'female'];
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
      cb(null, genderMaster);
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

test('master: genderMaster success', () => {
  const loadAllMastersAction = loadAllMasters();
  const loadGenderMasterAction = loadGenderMaster();
  const initialState = Immutable({ masters: INITIAL_STATE });
  const store = createStore({
    initialState,
  });
  let prevMastersState = {};
  store.dispatch(loadAllMastersAction).then(() => {
    prevMastersState = store.getState().masters;
    genderMaster = ['unknown'];
    return store.dispatch(loadGenderMasterAction);
  }).then(() => {
    const mastersState = store.getState().masters;
    assert.deepEqual(mastersState.genderMaster, {
      loading: false,
      loaded: true,
      items: genderMaster,
    });
    assert(prevMastersState.areaMaster === mastersState.areaMaster);
    assert(prevMastersState.hairColorMaster === mastersState.hairColorMaster);
    assert(prevMastersState.hairLengthMaster === mastersState.hairLengthMaster);
    assert(prevMastersState.menuContentMaster === mastersState.menuContentMaster);
  });
});
