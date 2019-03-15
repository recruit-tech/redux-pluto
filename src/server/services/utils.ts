import { format as formatUrl } from "url";
import fumble from "fumble";
import debugFactory from "debug";
import { AxiosInstance } from "axios";
import path from "path";

const debug = debugFactory("app:server:services");

type Headers = {
  [key: string]: any;
};

export function read(
  axios: AxiosInstance,
  name: string,
  pathname: string,
  query: any,
  headers: Headers,
) {
  const formattedUrl = formatUrl({ pathname, query });
  debug(`[${name}]: GET ${formattedUrl}`);

  if (!isSafePath(pathname)) {
    return rejectWith(fumble.http.create(403), {
      name,
      formattedUrl,
      reason: "unsafe pathname",
    });
  }

  return axios.get(formattedUrl, { headers }).then(
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
    (error: any) => {
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

export function readAll(
  axios: any,
  name: string,
  pathname: string,
  params: any | null,
  itemsName: string,
  loaded: Array<any> = [],
  headers: Headers,
): Promise<any> {
  const actualParams = { ...params, start: loaded.length + 1 };
  return read(axios, name, pathname, actualParams, headers).then(
    (results: any) => {
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

      return readAll(
        axios,
        name,
        pathname,
        params,
        itemsName,
        [...loaded, ...items],
        headers,
      );
    },
  );
}

export function create(
  axios: AxiosInstance,
  name: string,
  pathname: string,
  body: any,
  query: any,
  headers: Headers,
) {
  const formattedUrl = formatUrl({ pathname, query });
  debug(`[${name}]: POST ${formattedUrl} with body: ${JSON.stringify(body)}`);

  if (!isSafePath(pathname)) {
    return rejectWith(fumble.http.create(403), {
      name,
      formattedUrl,
      reason: "unsafe pathname",
    });
  }

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

export function isSafePath(pathname: string) {
  return path.normalize(pathname) == pathname;
}

export function formatPathname(pathname: string, params: Array<any>): string {
  const paramsIter = params[Symbol.iterator]();
  return pathname
    .split("/")
    .map(part => {
      if (part !== "?") {
        return part;
      }
      const param = paramsIter.next();
      if (param.done) {
        return "!(MISSING)";
      }
      const encodedParam = encodeURIComponent(param.value);
      if (encodedParam === "") {
        return "!(EMPTY)";
      }
      if (encodedParam === "." || encodedParam === "..") {
        return encodedParam.replace(/\./g, "%2E");
      }
      return encodedParam;
    })
    .join("/");
}
