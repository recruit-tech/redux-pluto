import { reduce, transform } from 'lodash/fp';
import BaseMaster from './BaseMaster';

const AREA_NAMES = ['service_area', 'middle_area', ''];

export default class AreaMaster extends BaseMaster {
  constructor(config) {
    super(
      config, 'areaMaster', 'beauty/smallArea/', {}, 'small_area',
      transform(formatResult, {}),
    );
  }
}

function formatResult(results, smallArea) {
  return reduce((parent, areaName) => {
    const source = areaName ? smallArea[areaName] : smallArea;
    const code = source.code;
    if (!parent[code]) {
      parent[code] = {
        code,
        name: source.name,
        count: source.cnt,
        ...(areaName ? { items: {} } : {}),
      };
    }
    return parent[code].items;
  }, results, AREA_NAMES);
}
