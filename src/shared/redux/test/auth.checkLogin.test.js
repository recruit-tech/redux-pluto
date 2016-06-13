/* eslint-disable no-undefined */
import { test } from 'eater/runner';
import assert from 'power-assert';
import createStore from '../createStore';
import Fetchr from 'fetchr';
import { ACCESS_TOKEN_AUDIENCE_NAME, sign } from '../../../server/services/AccessToken';
import { login, logout, checkLogin } from '../modules/auth';
import { createMemoryHistory } from 'react-router';
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

test('auth: checkLogin success', async (done, fail) => {
  const checkLoginAction = checkLogin();
  const token = await sign({
    sub: 'scott',
    aud: ACCESS_TOKEN_AUDIENCE_NAME,
    exp: Math.floor(Date.now() / 1000),
  }, configs.auth.key);

  const store = createStore({}, {
    cookie: {
      'access-token': token,
    },
    fetchr: new Fetchr({ ...configs.fetchr, req: {} }),
    history: createMemoryHistory('/'),
  });

  await store.dispatch(checkLoginAction);
  assert.deepEqual(store.getState().auth, {
    login: true,
    username: 'scott',
  });
  done();
});

test('auth: checkLogin failure', async (done, fail) => {
  const checkLoginAction = checkLogin();
  const token = await sign({
    sub: 'scott',
    aud: ACCESS_TOKEN_AUDIENCE_NAME,
    exp: Math.floor(Date.now() / 1000),
  }, configs.auth.key);

  const store = createStore({}, {
    cookie: {},
    fetchr: new Fetchr({ ...configs.fetchr, req: {} }),
    history: createMemoryHistory('/'),
  });

  try {
    await store.dispatch(checkLoginAction);
  } catch (e) {
    assert.deepEqual(store.getState().auth, {
      login: false,
      username: undefined,
    });
    assert(e.payload.message === 'no token');
    assert(e.error);
    return done();
  }
  fail();
});
