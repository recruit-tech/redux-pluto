import { test } from 'eater/runner';
import assert from 'power-assert';
import { createAsyncActionTypes } from '../utils';

test('createAsyncActionTypes', (done) => {
  const actionTypes = createAsyncActionTypes('app/fetch');
  assert.deepEqual(actionTypes, [
    'app/fetch/request',
    'app/fetch/success',
    'app/fetch/fail',
  ]);
  done();
});

