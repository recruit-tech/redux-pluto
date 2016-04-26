import { loadAsyncPropertyName } from './names';

export default function asyncLoader(loader) {
  return (Component) => {
    Component[loadAsyncPropertyName] = loader;
    return Component;
  };
}
