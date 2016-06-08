import { AUTH_CHECK_LOGIN_REQUEST, AUTH_LOGIN_REQUEST, AUTH_LOGOUT_REQUEST } from '../auth';

import { fetchrCreate, fetchrDelete } from '../../../packages/redux-effects-fetchr';
import { replace } from 'react-router-redux';
import { handleActions } from '../../middleware/utils';

export default function authMiddleware() {
  return handleActions({
    [AUTH_CHECK_LOGIN_REQUEST]({ dispatch }, next, action) {
      next(action); 
    },

    [AUTH_LOGIN_REQUEST]({ dispatch }, next, action) {
      next(action);
      const { payload: { params, location } } = action;
      return dispatch(fetchrCreate('accessToken', params))
        .then((payload) => {
          dispatch(replace(location || '/'));
          return payload;
        });
    },

    [AUTH_LOGOUT_REQUEST]({ dispatch }, next, action) {
      next(action);
    },
  });
}

