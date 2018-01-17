import { mapKeys } from 'lodash/fp';
import { create as createAxios } from 'axios';
import BaseService from './BaseService';

const ACTUAL_PARAM_NAMES = {
  gender: 'style_category',
  hairColor: 'hair_color',
  hairLength: 'hair_length',
  menuContent: 'menu_contents',
};

const mapToActualParamName = mapKeys((key) => ACTUAL_PARAM_NAMES[key] || key);

export default class Style extends BaseService {
  constructor(config) {
    super(config, 'style', 'beauty/style/v3/', { order: 5, count: 100 });
    this.requireLogin = true;
    // TODO: 他のagreedが出揃ったらBaseServiceに一本化
    this.axios = createAxios(config.agreed.config.axios);
  }

  read(req, resource, params, config) {
    return super.read(req, resource, mapToActualParamName(params), config);
  }
}
