import BaseService from './BaseService';

const SALON_SEARCH_MAX_COUNT = 50;
const SALON_SEARCH_ORDER = 3; // Hot pepper beauty のおすすめ順

export default class Salon extends BaseService {
  
  constructor(config) {
    super(config, 'salon', 'beauty/salon/', { count: SALON_SEARCH_MAX_COUNT, order: SALON_SEARCH_ORDER });
  }

  read(req, resource, params, config) {
    return super.read(req, resource, params, config);
  }
}
