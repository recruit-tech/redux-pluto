import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import { createStore } from './lib/storeUtils';
import { INITIAL_STATE, loadAllMasters, loadAreaMaster } from '../modules/masters';
import Immutable from 'seamless-immutable';

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
  const initialState = Immutable({ masters: INITIAL_STATE });
  let prevMastersState = {};
  const store = createStore({
    initialState,
  });
  store.dispatch(loadAllMastersAction).then(() => {
    prevMastersState = store.getState().masters;
    areaMasters = ['okinawa', 'kagoshima'];
    return store.dispatch(loadAreaMasterAction);
  }).then(() => {
    const mastersState = store.getState().masters;
    assert.deepEqual(mastersState.areaMaster, {
      loading: false,
      loaded: true,
      items: areaMasters,
    });
    assert(prevMastersState.hairColorMaster === mastersState.hairColorMaster);
    assert(prevMastersState.genderMaster === mastersState.genderMaster);
    assert(prevMastersState.hairLengthMaster === mastersState.hairLengthMaster);
    assert(prevMastersState.menuContentMaster === mastersState.menuContentMaster);
  });
});
