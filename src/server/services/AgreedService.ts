import Axios from "axios";
import BaseService from "./BaseService";

export default class AgreedService extends BaseService {
  constructor(config: any, name: string, pathname: string, params: any = {}) {
    super(config, name, pathname, params);
    this.axios = Axios.create(config.agreed.config.axios);
  }
}
