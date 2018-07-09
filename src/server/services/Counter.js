/* @flow */
export default class Counter {
  name: string;

  counter: number;

  constructor() {
    this.name = "counter";
    this.counter = 0;
  }

  read(_req: any, _resource: any, params: any, _config: any) {
    return Promise.resolve(this.counter);
  }

  update(_req: any, _resource: any, _params: any, _config: any) {
    return Promise.resolve(++this.counter);
  }
}
