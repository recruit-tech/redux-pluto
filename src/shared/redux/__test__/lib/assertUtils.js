/* eslint-disable import/prefer-default-export */
import assert from 'power-assert';

export function isSameObject(obj1, obj2, ignoreProps) {
  const ignores = ignoreProps || [];
  Object.keys(obj1).filter((key) => ignores.indexOf(key) < 0).forEach((key) => {
    assert(obj1[key] === obj2[key]);
  });
}
