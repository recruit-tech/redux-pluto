/* eslint-disable no-undefined */
import { test } from 'eater/runner';
import assert from 'power-assert';
import Fetchr from 'fetchr';
import { increment } from '../modules/counter';
import { createStore } from './storeUtil';

/**
 * mock counter service
 */
let needFailure = false;
Fetchr.registerService({
  name: 'counter',
  update(req, resource, params, body, config, cb) {
    if (needFailure) {
      return cb(new Error('counter fail'));
    }
    cb(null, 100);
  },
});

test('counter: increment success', (done, fail) => {
  const incrementAction = increment(0);
  const store = createStore({ });
  store.dispatch(incrementAction).then(() => {
    assert(store.getState().counter.value === 100);
    done();
  });
});

test('counter: increment failure', (done, fail) => {
  const incrementAction = increment(0);
  needFailure = true;
  const store = createStore({ });
  store.dispatch(incrementAction).then(fail, (e) => {
    assert(e);
    assert(store.getState().counter.value === 0);
    needFailure = false;
    done();
  });
});
