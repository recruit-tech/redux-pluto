/* eslint-disable no-undefined */
import { test } from 'eater/runner';
import assert from 'power-assert';
import createStore from '../createStore';
import Fetchr from 'fetchr';
import { ACCESS_TOKEN_AUDIENCE_NAME, sign } from '../../../server/services/AccessToken';
import { login } from '../modules/auth';
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
});

test('auth: login success username scott', async (done, fail) => {
  const loginAction = login('scott', 'tiger');
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

  await store.dispatch(loginAction);
  assert.deepEqual(store.getState().auth, {
    login: true,
    username: 'scott',
  });
  done();
});

test('auth: login success username foobar', async (done, fail) => {
  const loginAction = login('scott', 'tiger');
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
  done();
});

test('auth: login failure invalid audience name', async (done, fail) => {
  const loginAction = login('scott', 'tiger');
  const token = await sign({
    sub: 'foobar',
    aud: 'no-such-audience',
    exp: Math.floor(Date.now() / 1000),
  }, configs.auth.key);

  const store = createStore({}, {
    cookie: {
      'access-token': token,
    },
    fetchr: new Fetchr({ ...configs.fetchr, req: {} }),
    history: createMemoryHistory('/'),
  });

  try {
    await store.dispatch(loginAction);
  } catch (e) {
    assert(e.payload.message === 'invalid token');
    assert(e.error);
  }
  done();
});

test('auth: login failure username is short', async (done, fail) => {
  const loginAction = login('s', 'tiger');
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

  try {
    await store.dispatch(loginAction);
  } catch (e) {
    assert.deepEqual(store.getState().auth, {
      login: false,
      username: null,
    });
    const errMessage = e.payload.output.username;
    assert(errMessage === '短すぎます。3文字以上を入力してください。');
    assert(e.error);
  }
  done();
});
