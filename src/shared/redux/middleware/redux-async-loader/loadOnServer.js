import { beginAsyncLoad, endAsyncLoad, skipAsyncLoad } from './actions';
import flattenComponents from './flattenComponents';
import loadAsync from './loadAsync';

export default function loadOnServer(renderProps, store) {
  const { dispatch } = store;

  const flattened = flattenComponents(renderProps.components);
  if (!flattened.length) {
    dispatch(skipAsyncLoad(true));
    return Promise.resolve();
  }

  dispatch(beginAsyncLoad(true));
  return loadAsync(flattened, renderProps, store).then(
    (v) => {
      dispatch(endAsyncLoad(true));
      return v;
    },
    (e) => {
      dispatch(endAsyncLoad(true));
      return Promise.reject(e);
    }
  );
}
