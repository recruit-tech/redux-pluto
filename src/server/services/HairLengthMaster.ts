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

type Style = {
  style_category: any;
  code: string;
  name: string;
  hair_length_seo_name: string;
};

function formatResult(items: Style[], item: Style) {
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

function getCategory(
  items: any,
  styleCategory: { code: string; name: string },
) {
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
