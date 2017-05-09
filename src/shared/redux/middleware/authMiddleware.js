import { replace } from 'react-router-redux';
import { cookie } from 'redux-effects-universal-cookie';
import { fetchrCreate, fetchrDelete } from 'redux-effects-fetchr';
import decode from 'jwt-decode';
import {
  AUTH_CHECK_LOGIN_REQUEST,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGOUT_REQUEST,
} from 'shared/redux/modules/auth';
import { handleActions } from './utils';

export default function authMiddleware() {
  return handleActions({
    [AUTH_CHECK_LOGIN_REQUEST]({ dispatch }, next, action) {
      next(action); // eslint-disable-line callback-return
      return checkAccessToken(dispatch);
    },

    [AUTH_LOGIN_REQUEST]({ dispatch }, next, action) {
      next(action); // eslint-disable-line callback-return
      const { payload: { params, location } } = action;
      return dispatch(fetchrCreate('accessToken', params))
        .then(() => checkAccessToken(dispatch))
        .then((payload) => {
          dispatch(replace(location || '/'));
          return payload;
        });
    },

    [AUTH_LOGOUT_REQUEST]({ dispatch }, next, action) {
      next(action); // eslint-disable-line callback-return
      return dispatch(fetchrDelete('accessToken'));
    },
  });
}

function checkAccessToken(dispatch) {
  return dispatch(cookie('access-token')).then((token) => {
    if (!token) {
      return Promise.reject(new Error('no token'));
    }

    const payload = decode(token);
    if (!payload || payload.aud !== 'redux-proto') {
      return Promise.reject(new Error('invalid token'));
    }

    return payload;
  });
}
