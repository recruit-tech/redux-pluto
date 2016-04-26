import { loadAsyncPropertyName } from './names';

export default function loadAsync(components, params, store) {
  return Promise.all(components.map((component) => component[loadAsyncPropertyName](params, store)));
}
