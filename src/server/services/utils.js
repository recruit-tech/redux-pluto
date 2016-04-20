import { format as formatUrl } from 'url';
import debugFactory from 'debug';

const debug = debugFactory('app:server:services');

export function read(axios, name, pathname, query) {
  const formattedUrl = formatUrl({ pathname, query });
  debug(`[${name}]: GET ${formattedUrl}`);

  return axios.get(formattedUrl).then(
    (response) => {
      const responseBody = response.data;
      if (!responseBody || !responseBody.results) {
        return makeError({ name, formattedUrl, message: 'HTTP GET request failed (no result).', });
      }

      const results = responseBody.results;
      if (results.error) {
        const { code, message } = results.error;
        return makeError({ name, formattedUrl, message: `HTTP GET request failed (${code}: ${message}).`, });
      }

      return results;
    },
    (error) => makeError({ name, formattedUrl, message: `HTTP GET request failed (${error.message}).`, cause: error, })
  );
}

export function readAll(axios, name, pathname, params, itemsName, loaded = []) {
  const actualParams = { ...params, start: loaded.length + 1 };
  return read(axios, name, pathname, actualParams).then(
    (results) => {
      const available = +results.results_available; // eslint-disable-line camelcase
      if (!available) {
        return results;
      }

      const items = results[itemsName];
      if (loaded.length + items.length === available) {
        results.results_returned = available; // eslint-disable-line camelcase
        results[itemsName] = [...loaded, ...items];
        return results;
      }

      return readAll(axios, name, pathname, params, itemsName, [...loaded, ...items]);
    }
  );
}

function makeError({ name, formattedUrl, msg, cause }) {
  const message = `[${name}]: ${msg}, ${formattedUrl}`;
  debug(message);
  const error = new Error(message);
  if (cause) {
    error.cause = cause;
  }

  return Promise.reject(error);
}
