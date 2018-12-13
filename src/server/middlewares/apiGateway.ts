import Fetchr from "fetchr";
import debugFactory from "debug";
import * as services from "../services";
import { verify } from "../services/AccessToken";
import requestAdapter from "./requestAdapter";
import { Request, Response } from "express";

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
      responseFormatter: (
        req: Request,
        res: Response & { endTime: Function },
        data: any,
      ) => {
        res.endTime("apigateway");
        return data;
      },
    })(req, res, next);
  };
}

function makeServiceAdapter(service: any, secret: string) {
  const adapter: any = { name: service.name };
  const checkLogin: any = service.requireLogin
    ? (req: Request) => verify(req, secret)
    : () => Promise.resolve();

  ["read", "delete"].forEach(method => {
    if (service[method]) {
      adapter[method] = (
        req: Request,
        resource: any,
        params: any,
        config: any,
        cb: Function,
      ) => {
        checkLogin(req)
          .then(() => service[method](req, resource, params, config))
          .then(
            (result: { meta?: any } = {}) => {
              cb(null, result, result.meta);
            },
            (error: Error) => {
              cb(error);
            },
          );
      };
    }
  });

  ["create", "update"].forEach(method => {
    if (service[method]) {
      adapter[method] = (
        req: Request,
        resource: any,
        params: any,
        body: any,
        config: any,
        cb: Function,
      ) => {
        checkLogin(req)
          .then(() => service[method](req, resource, params, body, config))
          .then(
            (result: { meta?: any } = {}) => {
              cb(null, result, result.meta);
            },
            (error: Error) => {
              cb(error);
            },
          );
      };
    }
  });

  return adapter;
}
