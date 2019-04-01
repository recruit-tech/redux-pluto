import Axios from "axios";
import { read } from "./utils";

export default class AgreedSample {
  name: string;
  axios: any;
  pathname: string;

  constructor(config: any) {
    this.name = "agreedSample";
    this.axios = Axios.create(config.agreed.config.axios); // サンプル用にここだけ agreed server 向けの axios を利用
    this.pathname = "agreedsample";
  }

  read(req: any, _resource: any, params: any = {}, _config: any) {
    const { status } = params;
    if (!status) {
      return read(this.axios, this.name, this.pathname, {}, req.headers);
    }
    return read(this.axios, this.name, this.pathname, { status }, req.headers);
  }
}
