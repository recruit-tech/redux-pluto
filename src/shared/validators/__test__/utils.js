import { getOptions, normalizeErrors } from '../utils';
import { test } from 'eater/runner';
import Joi from 'joi';
import assert from 'power-assert';

test('getOptions', (done) => {
  const options = getOptions();
  assert(options.abortEarly === false);
  done();
});

test('normalizeErrors has error', (done) => {
  const key = Joi.string().alphanum().min(3).required();
  const { error } = Joi.validate({ key: 1 }, { key }, getOptions());
  assert(error.details[0].message === '"key" must be a string');
  done();
});
