import { create as createAxios } from 'axios';
import BaseService from './BaseService';

export default class AgreedService extends BaseService {
  constructor(config, name, pathname, params = {}) {
    super(config, name, pathname, params);
    this.axios = createAxios(config.agreed.config.axios);
  }
}
