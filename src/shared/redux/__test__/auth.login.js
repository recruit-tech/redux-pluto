/* eslint-disable no-undefined */
import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import { createStore, createWithSignedStore } from './lib/storeUtils';
import { ACCESS_TOKEN_AUDIENCE_NAME } from '../../../server/services/AccessToken';
import { login } from '../modules/auth';

/**
 * mock accessToken service
 */
Fetchr.registerService({
  name: 'accessToken',
  create(req, resource, params, body, config, cb) {
    if (params && params.username === 's') {
      return void cb(new Error('username is short'));
    }

    cb(null, null);
  },
});

test('auth: login success username scott', () => {
  const loginAction = login('scott', 'tiger');
  createWithSignedStore('scott', ACCESS_TOKEN_AUDIENCE_NAME, {}).then((store) => {
    store.dispatch(loginAction).then(() => {
      assert.deepEqual(store.getState().app.auth, {
        login: true,
        username: 'scott',
      });
    });
  });
});

test('auth: login success username foobar', () => {
  const loginAction = login('foobar', 'tiger');
  createWithSignedStore('foobar', ACCESS_TOKEN_AUDIENCE_NAME, {}).then((store) => {
    store.dispatch(loginAction).then(() => {
      assert.deepEqual(store.getState().app.auth, {
        login: true,
        username: 'foobar',
      });
    });
  });
});

test('auth: login failure invalid audience name', (_, fail) => {
  const loginAction = login('scott', 'tiger');
  createWithSignedStore('scott', 'no-such-audience', {})
    .then((store) => store.dispatch(loginAction))
    .then(fail, (e) => {
      assert(e.message === 'invalid token');
    });
});

test('auth: login failure username is short', (_, fail) => {
  const loginAction = login('s', 'tiger');

  const store = createStore({
    cookie: {},
  });

  store.dispatch(loginAction).then(fail, (e) => {
    assert.deepEqual(store.getState().app.auth, {
      login: false,
      username: null,
    });
    assert(e);
  });
});
