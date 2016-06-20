/* eslint-disable no-undefined */
import { test } from 'eater/runner';
import assert from 'power-assert';
import reducer, { startLoading, stopLoading } from '../loading';

test('loading: startLoading success', (done, fail) => {
  const startLoadingAction = startLoading();
  const state = reducer(false, startLoadingAction);
  assert(state === true);
  done();
});

test('loading: stopLoading success', (done, fail) => {
  const stopLoadingAction = stopLoading();
  const state = reducer(true, stopLoadingAction);
  assert(state === false);
  done();
});

test('loading: stopLoading success', (done, fail) => {
  const stopLoadingAction = stopLoading();
  const state = reducer(false, stopLoadingAction);
  assert(state === false);
  done();
});
