import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import csurf from 'csurf';
import favicon from 'serve-favicon';
import serverTiming from 'server-timing';
import config from './configs';
import { apiGateway, offloadDetector, reduxApp } from './middlewares';

export default function renderer({ clientStats, server, promises }) {
  const app = express.Router();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
  app.use(cookieParser(config.cookieParser));
  app.use(session(config.session));
  app.use(csurf(config.csurf));
  app.use(serverTiming());
  app.use(favicon(config.favicon));

  config.assets.forEach((asset) => {
    app.use(asset.mount, express.static(asset.path));
  });

  app.use(config.clientConfig.fetchr.xhrPath, apiGateway(config));
  app.use(offloadDetector(config.offload));
  app.use(reduxApp({ ...config, clientStats, promises }));

  return app;
}
