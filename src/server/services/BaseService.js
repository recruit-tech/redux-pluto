import { read } from "./utils";

export default class BaseService {
  constructor(config, name, pathname, params = {}) {
    // axiosは継承先でcreateAxiosする
    this.axios = null;
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
