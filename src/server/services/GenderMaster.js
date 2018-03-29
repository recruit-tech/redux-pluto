import { transform } from "lodash/fp";
import AgreedMaster from "./AgreedMaster";

export default class HairLengthMaster extends AgreedMaster {
  constructor(config) {
    super(
      config,
      "genderMaster",
      "beauty/styleCategory/",
      {},
      "style_category",
      transform((results, item) => {
        results[item.code] = item;
      }, {})
    );
  }
}
