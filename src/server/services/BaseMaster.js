/* @flow */
import { identity } from "lodash/fp";
import BaseService from "./BaseService";
import { readAll } from "./utils";

export default class BaseMaster extends BaseService {
  itemsName: string;
  formatResult: Function;
  constructor(
    config: any,
    name: string,
    pathname: string,
    params: any,
    itemsName: string,
    formatResult: Function = identity
  ) {
    super(config, name, pathname, params);
    this.itemsName = itemsName;
    this.formatResult = formatResult;
  }

  read(req: any, resource: any, params: any, config: any) {
    return readAll(this.axios, this.name, this.pathname, params, this.itemsName).then(result =>
      this.formatResult(result[this.itemsName])
    );
  }
}
