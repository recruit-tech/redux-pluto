import { replace } from 'react-router-redux';
import { FETCHR } from 'redux-effects-fetchr';
import { showAlert } from '../modules/alert';
import { handleActions } from './utils';

export default function apiErrorMiddleware() {
  return handleActions({
    [FETCHR]({ dispatch }, next, action) {
      return next(action).catch((error) => {
        const { statusCode } = error;
        if (!statusCode || statusCode >= 500) {
          dispatch(showAlert('サービスに接続できませんでした。'));
        } else if (statusCode === 401) {
          const pathname = getState().routing.locationBeforeTransitions.pathname;
          dispatch(replace(`/login?location=${pathname}`));
        }

        return Promise.reject(error);
      });
    },
  });
}
