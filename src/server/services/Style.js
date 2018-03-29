import { mapKeys } from "lodash/fp";
import AgreedService from "./AgreedService";

const ACTUAL_PARAM_NAMES = {
  gender: "style_category",
  hairColor: "hair_color",
  hairLength: "hair_length",
  menuContent: "menu_contents"
};

const mapToActualParamName = mapKeys(key => ACTUAL_PARAM_NAMES[key] || key);

export default class Style extends AgreedService {
  constructor(config) {
    super(config, "style", "beauty/style/v3/", { order: 5, count: 100 });
    this.requireLogin = true;
  }

  read(req, resource, params, config) {
    return super.read(req, resource, mapToActualParamName(params), config);
  }
}
