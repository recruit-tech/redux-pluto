import BaseService from "./BaseService";
import { readAll } from "./utils";
import { Request } from "express";

export default class BaseMaster extends BaseService {
  itemsName: string;

  formatResult: Function;

  constructor(
    config: any,
    name: string,
    pathname: string,
    params: any,
    itemsName: string,
    formatResult: Function = (result: any) => result,
  ) {
    super(config, name, pathname, params);
    this.itemsName = itemsName;
    this.formatResult = formatResult;
  }

  read(req: Request, resource: string, params: any, config: any) {
    return readAll(
      this.axios,
      this.name,
      this.pathname,
      params,
      this.itemsName,
    ).then((result: any) => this.formatResult(result[this.itemsName]));
  }
}
