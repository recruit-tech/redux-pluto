/* eslint-disable no-undefined */
import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import { createStore } from './storeUtil';
import { loadAllMasters } from '../modules/masters';
import Immutable from 'seamless-immutable';

/**
 * mock accessToken service
 */
let needFailure = '';
const services = [
  {
    name: 'areaMaster',
    read(req, resource, params, config, cb) {
      if (needFailure === 'areaMaster') {
        return cb(new Error('error'));
      }
      cb(null, ['tokyo', 'saitama', 'kanagawa']);
    },
  },
  {
    name: 'hairColorMaster',
    read(req, resource, params, config, cb) {
      if (needFailure === 'hairColorMaster') {
        return cb(new Error('error'));
      }
      cb(null, ['black', 'brown', 'blond']);
    },
  },
  {
    name: 'genderMaster',
    read(req, resource, params, config, cb) {
      if (needFailure === 'genderMaster') {
        return cb(new Error('error'));
      }
      cb(null, ['male', 'female']);
    },
  },
  {
    name: 'hairLengthMaster',
    read(req, resource, params, config, cb) {
      if (needFailure === 'hairLengthMaster') {
        return cb(new Error('error'));
      }
      cb(null, ['long', 'short', 'middle']);
    },
  },
  {
    name: 'menuContentMaster',
    read(req, resource, params, config, cb) {
      if (needFailure === 'menuContentMaster') {
        return cb(new Error('error'));
      }
      cb(null, ['menu']);
    },
  },
];

services.forEach((service) => {
  Fetchr.registerService(service);
});

test('master: loadAll success', (done, fail) => {
  const loadAllMastersAction = loadAllMasters();
  const INITIAL_STATE = Immutable({ });
  const store = createStore({
    initialState: INITIAL_STATE,
  });
  store.dispatch(loadAllMastersAction).then(() => {
    const state = store.getState().masters;
    assert.deepEqual(state, {
      areaMaster: {
        loading: false,
        loaded: true,
        items: ['tokyo', 'saitama', 'kanagawa'],
      },
      hairColorMaster: {
        loading: false,
        loaded: true,
        items: ['black', 'brown', 'blond'],
      },
      genderMaster: {
        loading: false,
        loaded: true,
        items: ['male', 'female'],
      },
      hairLengthMaster: {
        loading: false,
        loaded: true,
        items: ['long', 'short', 'middle'],
      },
      menuContentMaster: {
        loading: false,
        loaded: true,
        items: ['menu'],
      },
    });
    done();
  });
});

test('master: loadAll failure', (done, fail) => {
  const loadAllMastersAction = loadAllMasters();
  const INITIAL_STATE = Immutable({ });
  const store = createStore({
    initialState: INITIAL_STATE,
  });
  needFailure = 'areaMaster';
  store.dispatch(loadAllMastersAction).then(() => {
    const state = store.getState().masters;
    assert.deepEqual(state, {
      areaMaster: {
        loading: false,
        loaded: false,
        items: [],
        error: undefined,
      },
      hairColorMaster: {
        loading: false,
        loaded: true,
        items: ['black', 'brown', 'blond'],
      },
      genderMaster: {
        loading: false,
        loaded: true,
        items: ['male', 'female'],
      },
      hairLengthMaster: {
        loading: false,
        loaded: true,
        items: ['long', 'short', 'middle'],
      },
      menuContentMaster: {
        loading: false,
        loaded: true,
        items: ['menu'],
      },
    });
    done();
  }, fail);

});
