import { format as formatUrl } from "url";
import fumble from "fumble";
import debugFactory from "debug";
import agrios from "agrios";

const agreed = require("../../../spec/agreed/agreed.js");

const agreedAdapter = agrios(agreed);

const debug = debugFactory("app:server:services");

export function read(axios, name, pathname, query) {
  const formattedUrl = formatUrl({ pathname, query });
  debug(`[${name}]: GET ${formattedUrl}`);
  debug(`[${name}]: ${axios}`);
  axios.defaults.adapter = agreedAdapter;

  return axios.get(formattedUrl, {adapter: agreedAdapter}).then(
    response => {
      const responseBody = response.data;
      if (!responseBody || !responseBody.results) {
        return rejectWith(fumble.create(), {
          name,
          formattedUrl,
          reason: "no result"
        });
      }

      const { results } = responseBody;
      if (results.error) {
        const { code, message } = results.error;
        debug(results.error);
        return rejectWith(fumble.create(code, message), { name, formattedUrl });
      }

      return results;
    },
    error => console.error(error)
  );
}

export function readAll(axios, name, pathname, params, itemsName, loaded = []) {
  const actualParams = { ...params, start: loaded.length + 1 };
  return read(axios, name, pathname, actualParams).then(results => {
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

    return readAll(axios, name, pathname, params, itemsName, [
      ...loaded,
      ...items
    ]);
  });
}

export function create(axios, name, pathname, body, query, headers) {
  const formattedUrl = formatUrl({ pathname, query });
  debug(`[${name}]: POST ${formattedUrl} with body: ${JSON.stringify(body)}`);
  axios.defaults.adapter = agreedAdapter;

  return axios.post(formattedUrl, body, { headers, adapter: agreedAdapter }).then(
    response => response.data,
    error => {
      if (error.response) {
        return rejectWith(fumble.http.create(error.response.status), {
          name,
          formattedUrl,
          reason: error.response.data
        });
      }
      return rejectWith(fumble.http.create(500), {
        name,
        formattedUrl,
        reason: error.message
      });
    }
  );
}

export function rejectWith(error, output = {}) {
  error.output = output;
  debug(error);
  return Promise.reject(error);
}
