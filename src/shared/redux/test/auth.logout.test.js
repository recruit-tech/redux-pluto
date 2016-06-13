/* eslint-disable no-undefined */
import { test } from 'eater/runner';
import assert from 'power-assert';
import createStore from '../createStore';
import Fetchr from 'fetchr';
import { ACCESS_TOKEN_AUDIENCE_NAME, sign } from '../../../server/services/AccessToken';
import { login, logout } from '../modules/auth';
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

test('auth: logout success', async (done, fail) => {
  const logoutAction = logout();
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

  await store.dispatch(logoutAction);
  assert.deepEqual(store.getState().auth, {
    login: false,
    username: undefined,
  });
  done();
});

test('auth: login and logout success', async (done, fail) => {
  const loginAction = login('scott', 'tiger');
  const logoutAction = logout();
  const token = await sign({
    sub: 'foobar',
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

  await store.dispatch(loginAction);
  assert.deepEqual(store.getState().auth, {
    login: true,
    username: 'foobar',
  });
  await store.dispatch(logoutAction);
  assert.deepEqual(store.getState().auth, {
    login: false,
    username: undefined,
  });
  await store.dispatch(loginAction);
  done();
});
