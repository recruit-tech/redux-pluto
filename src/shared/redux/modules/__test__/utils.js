/* eslint-disable no-undefined */
import { test } from 'eater/runner';
import assert from 'power-assert';
import mustCall from 'must-call';
import { initialState, filterActionType } from '../utils';

test('utils: initialState', () => {
  const init = { test: 'test' };
  const expect = { type: 'test' };
  const reducer = mustCall((state, action) => {
    assert.deepEqual(state, init);
    assert(action === expect);
  });
  initialState(init)(reducer)(undefined, expect);
});

test('utils: filterActionType', () => {
  const init = { test: 'test' };
  const expect = { type: 'test' };
  const reducer = mustCall((state, action) => {
    assert.deepEqual(state, init);
    assert(action === expect);
  });
  filterActionType('foo', 'bar', 'baz', 'test')(reducer)(init, expect);
});
