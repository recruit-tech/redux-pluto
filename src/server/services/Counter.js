import debugFactory from 'debug';

const debug = debugFactory('app:server:services:counter');

export default class Counter {
  constructor() {
    this.name = 'counter';
    this.counter = 0;
  }

  read(req, resource, params, config) {
    return Promise.resolve(this.counter);
  }

  update(req, resource, params, config) {
    return Promise.resolve(++this.counter);
  }
}
