import transform from 'lodash/fp/transform';
import BaseMaster from './BaseMaster';

export default class HairLengthMaster extends BaseMaster {
  constructor(config) {
    super(
      config, 'hairLengthMaster', 'beauty/hairLength/v3/', {}, 'hair_length',
      transform(formatResult)({})
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
