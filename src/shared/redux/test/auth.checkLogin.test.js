/* eslint-disable no-undefined */
import { test } from 'eater/runner';
import assert from 'power-assert';
import Fetchr from 'fetchr';
import { ACCESS_TOKEN_AUDIENCE_NAME, sign } from '../../../server/services/AccessToken';
import { checkLogin } from '../modules/auth';
import { createStore } from './storeUtil';
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

test('auth: checkLogin success', (done, fail) => {
  const checkLoginAction = checkLogin();
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
    store.dispatch(checkLoginAction).then(() => {
      assert.deepEqual(store.getState().auth, {
        login: true,
        username: 'scott',
      });
      done();
    });
  });
});

test('auth: checkLogin failure', (done, fail) => {
  const checkLoginAction = checkLogin();

  const store = createStore({
    cookie: {},
  });

  store.dispatch(checkLoginAction).then(fail, (e) => {
    assert.deepEqual(store.getState().auth, {
      login: false,
      username: undefined,
    });
    assert(e.payload.message === 'no token');
    assert(e.error);
    return done();
  });
});
