import mapKeys from 'lodash/fp/mapKeys';
import BaseService from './BaseService';

const ACTUAL_PARAM_NAMES = {
  gender: 'style_category',
  hairColor: 'hair_color',
  hairLength: 'hair_length',
  menuContent: 'menu_contents',
};

const mapToActualParamName = mapKeys((key) => ACTUAL_PARAM_NAMES[key] || key);

export default class Style extends BaseService {
  constructor(axios) {
    super(axios, 'style', 'beauty/style/v3/', { order: 5, count: 50 });
  }

  read(req, resource, params, config, cb) {
    super.read(req, resource, mapToActualParamName(params), config, cb);
  }
}
