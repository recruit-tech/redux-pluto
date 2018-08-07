/* @flow */
import { format as formatUrl } from "url";
import fumble from "fumble";
import debugFactory from "debug";

const debug = debugFactory("app:server:services");

export function read(axios: any, name: string, pathname: string, query: any) {
  const formattedUrl = formatUrl({ pathname, query });
  debug(`[${name}]: GET ${formattedUrl}`);

  return axios.get(formattedUrl).then(
    response => {
      const responseBody = response.data;
      if (!responseBody || !responseBody.results) {
        return rejectWith(fumble.http.create(), {
          name,
          formattedUrl,
          reason: "no result",
        });
      }

      const { results } = responseBody;
      if (results.error) {
        const { code, message } = results.error;
        return rejectWith(fumble.http.create(code, message), {
          name,
          formattedUrl,
        });
      }

      return results;
    },
    error => {
      if (error.response) {
        return rejectWith(fumble.http.create(error.response.status), {
          name,
          formattedUrl,
          reason: error.response.data,
        });
      }
      return rejectWith(fumble.http.create(), {
        name,
        formattedUrl,
        reason: error.message,
      });
    },
  );
}

export function readAll(
  axios: any,
  name: string,
  pathname: string,
  params: any,
  itemsName: string,
  loaded: any = [],
) {
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
      ...items,
    ]);
  });
}

export function create(
  axios: any,
  name: string,
  pathname: string,
  body: any,
  query: any,
  headers: any,
) {
  const formattedUrl = formatUrl({ pathname, query });
  debug(`[${name}]: POST ${formattedUrl} with body: ${JSON.stringify(body)}`);

  return axios.post(formattedUrl, body, { headers }).then(
    response => response.data,
    error => {
      if (error.response) {
        return rejectWith(fumble.http.create(error.response.status), {
          name,
          formattedUrl,
          reason: error.response.data,
        });
      }
      return rejectWith(fumble.http.create(500), {
        name,
        formattedUrl,
        reason: error.message,
      });
    },
  );
}

export function rejectWith(error: any, output: any = {}) {
  error.output = output;
  debug(error);
  return Promise.reject(error);
}
