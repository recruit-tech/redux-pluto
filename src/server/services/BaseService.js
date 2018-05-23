/* @flow */
import { read } from "./utils";

export default class BaseService {
  axios: ?any;
  name: string;
  pathname: string;
  params: any;
  constructor(config: any, name: string, pathname: string, params: any = {}) {
    // axiosは継承先でcreateAxiosする
    this.axios = null;
    this.name = name;
    this.pathname = pathname;
    this.params = params;
  }

  read(req: any, _resource: any, params: any, config: any) {
    return read(this.axios, this.name, this.pathname, {
      ...this.params,
      ...params,
    });
  }
}
