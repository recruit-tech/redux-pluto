import { beginAsyncLoad, endAsyncLoad } from './actions';
import flattenComponents from './flattenComponents';
import loadAsync from './loadAsync';

export default function loadOnServer(renderProps) {
  const { components, store: { dispatch } } = renderProps;
  const flattened = flattenComponents(components);
  if (!flattened.length) {
    return Promise.resolve();
  }

  dispatch(beginAsyncLoad(true));
  return loadAsync(flattened, renderProps).then(
    (v) => {
      dispatch(endAsyncLoad(true));
      return v;
    },
    (e) => {
      dispatch(endAsyncLoad(true));
      return Promise.reject(e);
    },
  );
}
