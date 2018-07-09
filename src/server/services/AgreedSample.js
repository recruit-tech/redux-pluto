/* @flow */
import { create as createAxios } from "axios";
import { read } from "./utils";

export default class AgreedSample {
  name: string;

  axios: any;

  pathname: string;

  constructor(config: any) {
    this.name = "agreedSample";
    this.axios = createAxios(config.agreed.config.axios); // サンプル用にここだけ agreed server 向けの axios を利用
    this.pathname = "agreedsample";
  }

  read(req: any, _resource: any, _params: any, _config: any) {
    return read(this.axios, this.name, this.pathname, {});
  }
}
