/* @flow */
import { transform } from "lodash/fp";
import AgreedMaster from "./AgreedMaster";

export default class HairLengthMaster extends AgreedMaster {
  constructor(config: any) {
    super(
      config,
      "hairLengthMaster",
      "beauty/hairLength/v3/",
      {},
      "hair_length",
      transform(formatResult, {}),
    );
  }
}

function formatResult(items, item) {
  /* eslint-disable camelcase */
  const category = getCategory(items, item.style_category);
  category.items.push({
    gender: category.code,
    code: item.code,
    name: item.name,
    seoName: item.hair_length_seo_name,
  });
  /* eslint-enable camelcase */
}

function getCategory(items, styleCategory) {
  const { code } = styleCategory;
  if (!items[code]) {
    items[code] = {
      code,
      name: styleCategory.name,
      items: [],
    };
  }

  return items[code];
}
