import { create as createAxios } from "axios";
import BaseMaster from "./BaseMaster";

export default class AgreedMaster extends BaseMaster {
  constructor(config, name, pathname, params, itemsName, formatResult) {
    super(config, name, pathname, params, itemsName, formatResult);
    this.axios = createAxios(config.agreed.config.axios);
  }
}
