import configureMockStore from 'redux-mock-store';
import effects from 'redux-effects';
import cookie from 'redux-effects-cookie';
import Fetchr from 'fetchr';
import fetchr from '../../../packages/redux-effects-fetchr';
import reject from '../../../packages/redux-effects-reject';
import multi from '../../../packages/redux-effects-multi';
import apiError from '../../middleware/apiErrorMiddleware';
import auth from './mockAuthMiddleware';
import reducer from '../../modules/reducer';
import filter from 'lodash/fp/filter';

export const mockStore = configureMockStore([
  multi,
  reject,
  effects,
  auth(),
  cookie({}),
  apiError(),
  fetchr(new Fetchr()),
]);

export function registerService(service) {
  return Fetchr.registerService(service);
};
