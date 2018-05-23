/* @flow */
import { transform } from "lodash/fp";
import AgreedMaster from "./AgreedMaster";

export default class GenderMaster extends AgreedMaster {
  constructor(config: any) {
    super(
      config,
      "genderMaster",
      "beauty/styleCategory/",
      {},
      "style_category",
      transform((results, item) => {
        results[item.code] = item;
      }, {}),
    );
  }
}
