import { transform } from 'lodash/fp';
import { create as createAxios } from 'axios';
import BaseMaster from './BaseMaster';

export default class HairLengthMaster extends BaseMaster {
  constructor(config) {
    super(
      config, 'hairLengthMaster', 'beauty/hairLength/v3/', {}, 'hair_length',
      transform(formatResult, {}),
    );
    // TODO: 他のagreedが出揃ったらBaseServiceに一本化
    this.axios = createAxios(config.agreed.config.axios);
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
  const code = styleCategory.code;
  if (!items[code]) {
    items[code] = {
      code,
      name: styleCategory.name,
      items: [],
    };
  }

  return items[code];
}
