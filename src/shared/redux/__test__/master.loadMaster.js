/* eslint-disable no-undefined */
import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import { createStore } from './lib/storeUtils';
import * as masters from '../modules/masters';
import Immutable from 'seamless-immutable';

/**
 * mock loadMaster service
 */
let needFailure = '';
const services = [
  {
    name: 'areaMaster',
    read(req, resource, params, config, cb) {
      return needFailure === 'areaMaster'
        ? cb(new Error('error'))
        : cb(null, ['tokyo', 'saitama', 'kanagawa']);
    },
  },
  {
    name: 'hairColorMaster',
    read(req, resource, params, config, cb) {
      return needFailure === 'hairColorMaster'
        ? cb(new Error('error'))
        : cb(null, ['black', 'brown', 'blond']);
    },
  },
  {
    name: 'genderMaster',
    read(req, resource, params, config, cb) {
      return needFailure === 'genderMaster'
        ? cb(new Error('error'))
        : cb(null, ['male', 'female']);
    },
  },
  {
    name: 'hairLengthMaster',
    read(req, resource, params, config, cb) {
      return needFailure === 'hairLengthMaster'
        ? cb(new Error('error'))
        : cb(null, ['long', 'short', 'middle']);
    },
  },
  {
    name: 'menuContentMaster',
    read(req, resource, params, config, cb) {
      return needFailure === 'menuContentMaster'
        ? cb(new Error('error'))
        : cb(null, ['menu']);
    },
  },
];

services.forEach(Fetchr.registerService);

test('master: loadAll success', (done, fail) => {
  const loadAllMastersAction = masters.loadAllMasters();
  const initialState = Immutable({ masters: masters.INITIAL_STATE });
  const store = createStore({
    initialState,
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

test('master: load each success', (done, fail) => {
  const initialState = Immutable({ masters: masters.INITIAL_STATE });
  const store = createStore({
    initialState,
  });

  const expects = Immutable({
    areaMaster: {
      loading: false,
      loaded: true,
      items: ['tokyo', 'saitama', 'kanagawa'],
    },
    genderMaster: {
      loading: false,
      loaded: true,
      items: ['male', 'female'],
    },
    hairColorMaster: {
      loading: false,
      loaded: true,
      items: ['black', 'brown', 'blond'],
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

  const actions = {
    areaMaster: masters.loadAreaMaster(),
    genderMaster: masters.loadGenderMaster(),
    hairColorMaster: masters.loadHairColorMaster(),
    hairLengthMaster: masters.loadHairLengthMaster(),
    menuContentMaster: masters.loadMenuContentMaster(),
  };

  let prevState = store.getState().masters;
  Object.keys(actions).reduce((promise, actionName) => promise
    .then(() => store.dispatch(actions[actionName]))
    .then(() => {
      const nextState = store.getState().masters;
      Object.keys(nextState).forEach((propName) => {
        if (propName === actionName) {
          assert.deepEqual(nextState[propName], expects[propName]);
        } else {
          assert(nextState[propName] === prevState[propName], actionName);
        }
      });
      prevState = nextState;
    }),
    Promise.resolve()
  ).then(() => {
    const state = store.getState().masters;
    assert.deepEqual(state, expects);
  });
});

test('master: loadAll failure', (done, fail) => {
  const loadAllMastersAction = masters.loadAllMasters();
  const initialState = Immutable({ masters: masters.INITIAL_STATE });
  const store = createStore({
    initialState,
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
  });

});
