/*
 * A part of these functions are:
 *   Copyright (c) 2015 Ryan Florence
 *   Released under the MIT license.
 *   https://github.com/ryanflorence/async-props/blob/master/LICENSE.md
 */

import { loadAsyncPropertyName } from './names';

// based on https://github.com/ryanflorence/async-props/blob/v0.3.2/modules/AsyncProps.js#L8-L18
function eachComponents(components, cb) {
  for (let i = 0, l = components.length; i < l; i++) {
    const component = components[i];
    if (typeof component === 'object') {
      // named components
      // https://github.com/reactjs/react-router/blob/master/docs/API.md#named-components
      Object.keys(component).forEach((key) => cb(component[key], i, key));
    } else {
      cb(component, i); // eslint-disable-line callback-return
    }
  }
}

// based on https://github.com/ryanflorence/async-props/blob/v0.3.2/modules/AsyncProps.js#L20-L27
export default function flattenComponents(components) {
  const flattened = [];
  eachComponents(components, (Component) => {
    if (Component && Component[loadAsyncPropertyName]) {
      flattened.push(Component);
    }
  });
  return flattened;
}
