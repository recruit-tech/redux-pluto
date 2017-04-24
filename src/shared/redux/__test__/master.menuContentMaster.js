import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import Immutable from 'seamless-immutable';
import { createStore } from './lib/storeUtils';
import { isSameObject } from './lib/assertUtils';
import { INITIAL_STATE, loadAllMasters, loadMenuContentMaster } from '../modules/masters';

/**
 * mock loadMaster service
 */
let menuContentMaster = ['menu'];
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
      cb(null, ['long', 'short', 'middle']);
    },
  },
  {
    name: 'menuContentMaster',
    read(req, resource, params, config, cb) {
      cb(null, menuContentMaster);
    },
  },
];

services.forEach(Fetchr.registerService);

test('master: hairLengthMaster success', () => {
  const loadAllMastersAction = loadAllMasters();
  const loadMenuContentMasterAction = loadMenuContentMaster();
  const initialState = Immutable({ app: { masters: INITIAL_STATE } });
  const store = createStore({
    initialState,
  });
  let prevMastersState = {};
  store.dispatch(loadAllMastersAction).then(() => {
    prevMastersState = store.getState().app.masters;
    menuContentMaster = ['menu2'];
    return store.dispatch(loadMenuContentMasterAction);
  }).then(() => {
    const mastersState = store.getState().app.masters;
    assert.deepEqual(mastersState.menuContentMaster, {
      loading: false,
      loaded: true,
      items: menuContentMaster,
    });
    isSameObject(prevMastersState, mastersState, ['menuContentMaster']);
  });
});
