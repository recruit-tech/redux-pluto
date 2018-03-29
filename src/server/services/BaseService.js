import { create as createAxios } from "axios";
import { read } from "./utils";

export default class BaseService {
  constructor(config, name, pathname, params = {}) {
    this.axios = createAxios(config.axios);
    this.name = name;
    this.pathname = pathname;
    this.params = params;
  }

  read(req, resource, params, config) {
    return read(this.axios, this.name, this.pathname, {
      ...this.params,
      ...params
    });
  }
}
