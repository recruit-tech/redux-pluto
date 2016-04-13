import identity from 'lodash/fp/identity';
import BaseService from './BaseService';
import { readAll } from './serviceUtils';

export default class BaseMaster extends BaseService {
  constructor(axios, name, pathname, params, itemsName, formatResult = identity) {
    super(axios, name, pathname, params);
    this.itemsName = itemsName;
    this.formatResult = formatResult;
  }

  read(req, resource, params, config) {
    return readAll(this.axios, this.name, this.pathname, params, this.itemsName)
      .then((result) => this.formatResult(result[this.itemsName]));
  }
}
