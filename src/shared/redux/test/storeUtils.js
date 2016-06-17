import Fetchr from 'fetchr';
import effects from '../../packages/redux-effects-ext';
import cookie from 'redux-effects-cookie';
import { createStore as create, applyMiddleware } from 'redux';
import fetchr from '../../packages/redux-effects-fetchr';
import configs from '../../../server/configs';
import reducer from '../modules/reducer';
import { createMemoryHistory } from 'react-router';
import authMiddleware from '../middleware/authMiddleware';
import { routerMiddleware } from 'react-router-redux';

export function createStore(options) {
  const history = createMemoryHistory(options.historyRoute || '/');
  const initialState = options.initialState || {};
  const store = create(reducer, initialState, applyMiddleware(
    effects,
    authMiddleware(),
    cookie(options.cookie),
    fetchr(new Fetchr({ ...configs.fetchr, req: {} })),
    routerMiddleware(history),
  ));
  return store;
}
