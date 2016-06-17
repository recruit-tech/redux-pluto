/* eslint-disable no-undefined */
import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import { createStore } from './storeUtil';
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
  sign({
    sub: 'scott',
    aud: ACCESS_TOKEN_AUDIENCE_NAME,
    exp: Math.floor(Date.now() / 1000),
  }, configs.auth.key).then((token) => {
    const store = createStore({
      cookie: {
        'access-token': token,
      },
    });
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
  const loginAction = login('scott', 'tiger');
  const logoutAction = logout();
  sign({
    sub: 'foobar',
    aud: ACCESS_TOKEN_AUDIENCE_NAME,
    exp: Math.floor(Date.now() / 1000),
  }, configs.auth.key).then((token) => {
    const store = createStore({
      cookie: {
        'access-token': token,
      },
    });
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
