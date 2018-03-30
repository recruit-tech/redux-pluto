import { create as createAxios } from "axios";
import { read } from "./utils";

export default class AgreedSample {
  constructor(config) {
    this.name = "agreedSample";
    this.axios = createAxios(config.agreed.config.axios); // サンプル用にここだけ agreed server 向けの axios を利用
    this.pathname = "agreedsample";
  }

  read(req, resource, params, config) {
    return read(this.axios, this.name, this.pathname, {}, {});
  }
}
