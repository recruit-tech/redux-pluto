// based on async-props@0.3.2
// https://github.com/ryanflorence/async-props
import { loadAsyncPropertyName } from './names';

function eachComponents(components, iterator) {
  for (let i = 0, l = components.length; i < l; i++) {
    const component = components[i];
    if (typeof component === 'object') {
      // named components
      // https://github.com/reactjs/react-router/blob/master/docs/API.md#named-components
      for (let key of Object.keys(component)) {
        iterator(component[key], i, key);
      }
    } else {
      iterator(component, i);
    }
  }
}

export default function flattenComponents(components) {
  var flattened = [];
  eachComponents(components, (Component) => {
    if (Component && Component[loadAsyncPropertyName]) {
      flattened.push(Component);
    }
  });
  return flattened;
}
