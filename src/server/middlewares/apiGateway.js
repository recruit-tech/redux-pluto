import Fetchr from 'fetchr';
import mapValues from 'lodash/fp/mapValues';
import debugFactory from 'debug';
import * as services from '../services';

const debug = debugFactory('app:server:middleware:apiGateway');

const registerServices = (axios) => mapValues((Service) => {
  const service = new Service(axios);
  debug(`Registering sevice: ${service.name}`);
  return Fetchr.registerService(service);
});

export default function apiGateway(axios) {
  registerServices(axios)(services);
  return Fetchr.middleware();
}
