import Fetchr from 'fetchr';
import mapValues from 'lodash/fp/mapValues';
import debugFactory from 'debug';
import * as services from '../services';

const debug = debugFactory('app:server:middleware:apiGateway');

const registerServices = (axios) => mapValues((Service) => {
  const service = new Service(axios);
  debug(`Registering sevice: ${service.name}`);
  return Fetchr.registerService(unpromisify(service));
});

export default function apiGateway(axios) {
  registerServices(axios)(services);
  return Fetchr.middleware();
}

function unpromisify(service) {
  const adapter = { name: service.name };

  ['read', 'delete'].forEach((method) => {
    if (service[method]) {
      adapter[method] = function (req, resource, params, config, cb) {
        service[method](req, resource, params, config).then((result) => {
          cb(null, result);
        }, (err) => {
          cb(err);
        });
      };
    }
  });

  ['create', 'update'].forEach((method) => {
    if (service[method]) {
      adapter[method] = function (req, resource, params, body, config, cb) {
        service[method](req, resource, params, body, config).then((result) => {
          cb(null, result);
        }, (err) => {
          cb(err);
        });
      };
    }
  });

  return adapter;
}
