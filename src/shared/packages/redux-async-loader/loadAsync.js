import { loadAsyncPropertyName } from './names';

export default function loadAsync(components, props, store) {
  return Promise.all(components.map((component) => component[loadAsyncPropertyName](props, store)));
}
