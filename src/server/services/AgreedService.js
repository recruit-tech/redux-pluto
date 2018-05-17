/* @flow */
import { create as createAxios } from "axios";
import BaseService from "./BaseService";

export default class AgreedService extends BaseService {
  constructor(config: any, name: string, pathname: string, params: any = {}) {
    super(config, name, pathname, params);
    this.axios = createAxios(config.agreed.config.axios);
  }
}
