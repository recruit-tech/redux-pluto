/* eslint-disable import/prefer-default-export */
import reduce from 'lodash/fp/reduce';
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
    return flatten(classes)(arg);
  }

  if (argType === 'object') {
    return flatten(classes)(Object.keys(arg).filter((key) => arg[key]));
  }

  return classes;
});

export function createLocal(styles) {
  return {
    localNames,
  };

  function localNames(...args) {
    const classes = flatten([])(args);
    return classes.map((localName) => {
      const globalName = styles[localName];
      if (!globalName) {
        debug('invalid localName:', localName);
        return ['u-invalidLocalName', localName].join(' ');
      }

      return globalName;
    }).join(' ');
  }
}
