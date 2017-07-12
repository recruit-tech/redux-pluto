/* eslint-disable import/prefer-default-export */
import { filter, keys, reduce } from 'lodash/fp';
import debugFactory from 'debug';

const debug = debugFactory('localnames');

const flatten = reduce((classes, arg) => {
  if (!arg) {
    return classes;
  }

  const argType = typeof arg;
  if (argType === 'string' || argType === 'number') {
    return [...classes, arg];
  }

  if (Array.isArray(arg)) {
    return flatten(classes, arg);
  }

  if (argType === 'object') {
    return flatten(classes, filter((key) => arg[key], keys(arg)));
  }

  return classes;
}, []);

export function createLocal(styles) {
  return {
    localNames,
  };

  function localNames(...args) {
    const classes = flatten(args);
    return classes.map((localName) => {
      const globalName = styles[localName];
      if (__DEVELOPMENT__ && !globalName) {
        debug('invalid localName:', localName);
        return ['u-invalidLocalName', localName].join(' ');
      }

      return globalName;
    }).join(' ');
  }
}
