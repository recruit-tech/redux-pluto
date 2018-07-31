/* @flow */
import Fetchr from "fetchr";
import debugFactory from "debug";
import * as services from "server/services";
import { verify } from "server/services/AccessToken";
import requestAdapter from "./requestAdapter";

const debug = debugFactory("app:server:middleware:apiGateway");

export default function apiGateway(config: any, app: any) {
  Object.values(services).forEach((Service: any) => {
    const service = new Service(config);
    debug(`Registering sevice: ${service.name}`);
    Fetchr.registerService(makeServiceAdapter(service, config.auth.secret));
    requestAdapter(service, app, config);
  });

  return (req: any, res: any, next: Function) => {
    res.startTime("apigateway", "API Gateway");
    return Fetchr.middleware({
      responseFormatter: (req, res, data) => {
        res.endTime("apigateway");
        return data;
      },
    })(req, res, next);
  };
}

function makeServiceAdapter(service, secret) {
  const adapter: any = { name: service.name };
  const checkLogin: any = service.requireLogin
    ? req => verify(req, secret)
    : () => Promise.resolve();

  ["read", "delete"].forEach(method => {
    if (service[method]) {
      adapter[method] = (req, resource, params, config, cb) => {
        checkLogin(req)
          .then(() => service[method](req, resource, params, config))
          .then(
            (result = {}) => {
              cb(null, result, result.meta);
            },
            error => {
              cb(error);
            },
          );
      };
    }
  });

  ["create", "update"].forEach(method => {
    if (service[method]) {
      adapter[method] = (req, resource, params, body, config, cb) => {
        checkLogin(req)
          .then(() => service[method](req, resource, params, body, config))
          .then(
            (result = {}) => {
              cb(null, result, result.meta);
            },
            error => {
              cb(error);
            },
          );
      };
    }
  });

  return adapter;
}
