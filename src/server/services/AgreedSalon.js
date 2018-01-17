import { map, pick } from 'lodash/fp';
import { create as createAxios } from 'axios';
import BaseService from './BaseService';
import { read } from './utils';

export const SALON_SEARCH_MAX_COUNT = 50;
const PICK_PROPS = [
  'id',
  'last_update',
  'name',
  'logo_image',
  'logo_image_square',
  'urls',
  'description',
];

const pickProps = map(pick(PICK_PROPS));

export default class AgreedSalon extends BaseService {
  constructor(config) {
    super(config, 'agreedSalon', 'beauty/salon/', {});
    // TODO: 他のagreedも出揃ったら、BaseServiceのコンストラクタに移動させる
    this.axios = createAxios(config.agreed.config.axios);
  }

  read(req, resource, params, config) {
    const { page, id, ...query } = params;
    if (page) {
      query.start = (page * SALON_SEARCH_MAX_COUNT) + 1;
    }
    const pathname = id ? `${this.pathname}${id}` : this.pathname;

    return read(this.axios, this.name, pathname, query).then((results) => {
      const { salon: items, ...rest } = results;
      return {
        ...rest,
        salon: pickProps(items),
      };
    });
  }
}
