import { default as createCache } from 'lru-cache';
import { FETCHR } from '../redux-effects-fetchr';

export default function fetchrCacheMiddleware(config) {
  const { excludes, ...cacheConfig } = { excludes: [], ...config };
  const cache = createCache(cacheConfig);

  return ({ dispatch }) => (next) => (action) => {
    if (action.type !== FETCHR) {
      return next(action);
    }

    const { type, resource, params } = action.payload;
    if (type !== 'read' || excludes.includes(resource)) {
      return next(action);
    }

    const key = `${resource}@@${JSON.stringify(params)}`;
    const cachedResult = cache.get(key);
    if (cachedResult) {
      return Promise.resolve(cachedResult);
    }

    return next(action).then((result) => {
      cache.set(key, result);
      return result;
    });
  };
}
