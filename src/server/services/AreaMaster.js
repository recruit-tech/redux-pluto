import transform from 'lodash/fp/transform';
import BaseMaster from './BaseMaster';

const AREA_NAMES = ['service_area', 'middle_area'];

export default class AreaMaster extends BaseMaster {
  constructor(config) {
    super(config, 'areaMaster', 'beauty/smallArea/', {}, 'small_area', transform(formatResult)({}));
  }
}

function formatResult(parent, smallArea, depth = 0) {
  const last = depth === AREA_NAMES.length;
  const source = last ? smallArea : smallArea[AREA_NAMES[depth]];
  const code = source.code;
  if (!parent[code]) {
    parent[code] = {
      code,
      name: source.name,
      count: source.cnt,
      ...(last ? {} : { items: {} }),
    };
  }

  if (!last) {
    formatResult(parent[code].items, smallArea, depth + 1);
  }
}
