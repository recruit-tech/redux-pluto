/* eslint-disable no-undefined */
import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import { createStore, createWithSignedStore } from './lib/storeUtils';
import { ACCESS_TOKEN_AUDIENCE_NAME, sign } from '../../../server/services/AccessToken';
import { login, logout } from '../modules/auth';
import configs from '../../../server/configs';

/**
 * mock accessToken service
 */
Fetchr.registerService({
  name: 'accessToken',
  create(req, resource, params, body, config, cb) {
    cb(null, null);
  },
  delete(req, resource, params, config, cb) {
    cb(null, null);
  },
});

test('auth: logout success', (done) => {
  const logoutAction = logout();
  createWithSignedStore('scott', ACCESS_TOKEN_AUDIENCE_NAME, {}).then((store) => {
    store.dispatch(logoutAction).then(() => {
      assert.deepEqual(store.getState().auth, {
        login: false,
        username: undefined,
      });
      done();
    });
  });
});

test('auth: logout success when not logged in', (done) => {
  const loginAction = login('foobar', 'tiger');
  const logoutAction = logout();
  createWithSignedStore('foobar', ACCESS_TOKEN_AUDIENCE_NAME, {}).then((store) => {
    store.dispatch(loginAction).then(() => {
      assert.deepEqual(store.getState().auth, {
        login: true,
        username: 'foobar',
      });
      return store.dispatch(logoutAction);
    }).then(() => {
      assert.deepEqual(store.getState().auth, {
        login: false,
        username: undefined,
      });
      done();
    });
  });
});