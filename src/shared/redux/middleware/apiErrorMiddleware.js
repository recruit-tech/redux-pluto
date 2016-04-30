import { replace } from 'react-router-redux';
import { FETCHR } from '../../packages/redux-effects-fetchr';

export default function apiErrorMiddleware() {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (action.type !== FETCHR) {
      return next(action);
    }

    return next(action).catch((error) => {
      const { statusCode } = error;
      if (statusCode === 401) {
        const pathname = getState().routing.locationBeforeTransitions.pathname;
        dispatch(replace(`/login?location=${pathname}`));
      }

      return Promise.reject(error);
    });
  };
}
