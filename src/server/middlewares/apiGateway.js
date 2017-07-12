import Fetchr from 'fetchr';
import { mapValues } from 'lodash/fp';
import debugFactory from 'debug';
import * as services from 'server/services';
import { verify } from 'server/services/AccessToken';

const debug = debugFactory('app:server:middleware:apiGateway');

export default function apiGateway(config) {
  mapValues((Service) => {
    const service = new Service(config);
    debug(`Registering sevice: ${service.name}`);
    return Fetchr.registerService(makeServiceAdapter(service, config.auth.secret));
  }, services);

  return (req, res, next) => {
    res.startTime('apigateway', 'API Gateway');
    return Fetchr.middleware({
      responseFormatter: (req, res, data) => {
        res.endTime('apigateway');
        return data;
      },
    })(req, res, next);
  };
}

function makeServiceAdapter(service, secret) {
  const adapter = { name: service.name };
  const checkLogin = service.requireLogin ? (req) => verify(req, secret) : () => Promise.resolve();

  ['read', 'delete'].forEach((method) => {
    if (service[method]) {
      adapter[method] = (req, resource, params, config, cb) => {
        checkLogin(req).then(() => service[method](req, resource, params, config)).then(
          (result = {}) => {
            cb(null, result, result.meta);
          },
          (error) => {
            cb(error);
          },
        );
      };
    }
  });

  ['create', 'update'].forEach((method) => {
    if (service[method]) {
      adapter[method] = (req, resource, params, body, config, cb) => {
        checkLogin(req).then(() => service[method](req, resource, params, body, config)).then(
          (result = {}) => {
            cb(null, result, result.meta);
          },
          (error) => {
            cb(error);
          },
        );
      };
    }
  });

  return adapter;
}
