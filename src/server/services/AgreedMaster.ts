import Axios from "axios";
import BaseMaster from "./BaseMaster";

export default class AgreedMaster extends BaseMaster {
  constructor(
    config: any,
    name: string,
    pathname: string,
    params: any,
    itemsName: string,
    formatResult?: Function,
  ) {
    super(config, name, pathname, params, itemsName, formatResult);
    this.axios = Axios.create(config.agreed.config.axios);
  }
}
