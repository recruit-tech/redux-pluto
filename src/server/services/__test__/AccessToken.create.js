import { test } from 'eater/runner';
import assert from 'power-assert';
import AccessToken, { verify, ACCESS_TOKEN_COOKIE_NAME } from '../AccessToken';
import configs from '../../configs';
import cookie from 'cookie';

test('AccessToken: create success', () => {
  const accessToken = new AccessToken(configs);

  const req = {
    cookie: {},
  };

  const params = {
    username: 'scott',
    password: 'tiger',
  };

  accessToken.create(req, void 0, params).then((response) => {
    const cookies = cookie.parse(response.meta.headers['set-cookie']);
    verify({
      cookies: {
        [ACCESS_TOKEN_COOKIE_NAME]: cookies['access-token'],
      },
    }, configs.auth.secret).then((token) => {
      assert(token.sub === 'scott');
    });
  });
});

test('AccessToken: create failure', (_, fail) => {
  const accessToken = new AccessToken(configs);

  const req = {
    cookie: {},
  };

  const params = {
    username: 'notuser',
    password: 'notpassword',
  };

  accessToken.create(req, void 0, params).then(fail, (e) => {
    assert(e.statusCode === 400);
    assert(e.message === 'Bad Request');
  });
});
