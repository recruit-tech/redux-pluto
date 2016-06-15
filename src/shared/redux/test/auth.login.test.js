/* eslint-disable no-undefined */
import Fetchr from 'fetchr';
import { test } from 'eater/runner';
import assert from 'power-assert';
import { createStore } from './storeUtil';
import { ACCESS_TOKEN_AUDIENCE_NAME, sign } from '../../../server/services/AccessToken';
import { login } from '../modules/auth';
import configs from '../../../server/configs';
import fumble from 'fumble';
import validate from '../../validators/login';

/**
 * mock accessToken service
 */
Fetchr.registerService({
  name: 'accessToken',
  create(req, resource, params, body, config, cb) {
    if (params && params.username === 's') {
      return cb(new Error('username is short'));
    }

    cb(null, null);
  },
});

test('auth: login success username scott', (done, fail) => {
  const loginAction = login('scott', 'tiger');
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
    store.dispatch(loginAction).then(() => {
      assert.deepEqual(store.getState().auth, {
        login: true,
        username: 'scott',
      });
      done();
    });
  });
});

test('auth: login success username foobar', (done, fail) => {
  const loginAction = login('scott', 'tiger');
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
      done();
    });
  });
});

test('auth: login failure invalid audience name', (done, fail) => {
  const loginAction = login('scott', 'tiger');
  sign({
    sub: 'foobar',
    aud: 'no-such-audience',
    exp: Math.floor(Date.now() / 1000),
  }, configs.auth.key).then((token) => {
    const store = createStore({
      cookie: {
        'access-token': token,
      },
    });
    return store.dispatch(loginAction);
  }).then(fail, (e) => {
    assert(e.payload.message === 'invalid token');
    assert(e.error);
    done();
  });
});

test('auth: login failure username is short', (done, fail) => {
  const loginAction = login('s', 'tiger');

  const store = createStore({
    cookie: {},
  });

  store.dispatch(loginAction).then(fail, (e) => {
    assert.deepEqual(store.getState().auth, {
      login: false,
      username: null,
    });
    assert(e);
    done();
  });
});
