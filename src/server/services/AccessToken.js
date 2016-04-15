import debugFactory from 'debug';
import validate from '../../shared/validators/login';

const debug = debugFactory('app:server:services:accessToken');

export default class AccessToken {
  constructor() {
    this.name = 'accessToken';
  }

  create(req, resource, params, body, config) {
    const validationErrors = validate(params);
    if (Object.keys(validationErrors).length) {
      return Promise.reject(makeError('Bad Request', {
        statusCode: 400,
        output: validationErrors,
      }));
    }

    const { username, password } = params;
    if (username !== 'scott' || password !== 'tiger') {
      return Promise.reject(makeError('Bad Request', {
        statusCode: 400,
        output: { _error: 'ユーザ名またはパスワードが間違っています。' },
      }));
    }

    debug(username + ' logged in.');
    const accessToken = req.session.accessToken = { username };
    return Promise.resolve(accessToken);
  }

  read(req, resource, params, config) {
    const session = req.session;
    if (!session || !session.accessToken) {
      return Promise.reject(makeError('Unauthorized', { statusCode: 401 }));
    }

    return Promise.resolve(session.accessToken);
  }

  delete(req, resource, params, config) {
    const session = req.session;
    if (session && session.accessToken) {
      const { username } = session.accessToken;
      delete session.accessToken;
      debug(username + ' logged out.');
    }

    return Promise.resolve({});
  }
}

function makeError(message, props) {
  return Object.assign(new Error(message), props);
}
