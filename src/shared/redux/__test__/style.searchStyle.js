/* eslint-disable no-undefined, callback-return */
import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import { createStore } from './lib/storeUtils';
import { INITIAL_STATE, searchStyle } from '../modules/style';
import Immutable from 'seamless-immutable';

let needFailure = false;
Fetchr.registerService({
    name: 'style',
    read(req, resource, params, config, cb) {
      needFailure ? cb(new Error('failure')) : cb(null, { results_available: '10', style: ['foo', 'bar'] });
    },
  },
);

test('style: searchStyle success', () => {
  const searchStyleAction = searchStyle({ query: 'foo' });
  const initialState = Immutable({ style: INITIAL_STATE });
  const store = createStore({
    initialState,
  });
  store.dispatch(searchStyleAction).then(() => {
    const state = store.getState().style;
    assert.deepEqual(state, {
      loading: false,
      loaded: true,
      params: undefined,
      count: 10,
      items: ['foo', 'bar'],
    });
  });
});

test('style: searchStyle failure', (_, fail) => {
  const searchStyleAction = searchStyle({ query: 'foo' });
  const initialState = Immutable({ style: INITIAL_STATE });
  const store = createStore({
    initialState,
  });
  needFailure = true;
  store.dispatch(searchStyleAction).then(fail, () => {
    const state = store.getState().style;
    assert.deepEqual(state, {
      loading: false,
      loaded: false,
      params: undefined,
      count: 0,
      items: [],
      error: true,
    });
  });
});
