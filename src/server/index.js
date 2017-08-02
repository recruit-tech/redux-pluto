import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import csurf from 'csurf';
import favicon from 'serve-favicon';
import serverTiming from 'server-timing';
import { filter, flow, transform } from 'lodash/fp';
import config from './configs';
import { apiGateway, offloadDetector, reduxApp } from './middlewares';

export default function renderer({ clientStats, server, sessionStore, promises }) {
  const app = express.Router();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
  app.use(cookieParser(config.cookieParser));
  app.use(session({ store: sessionStore, ...config.session }));
  app.use(csurf(config.csurf));
  app.use(serverTiming());
  app.use(favicon(config.favicon));

  if (!__DEVELOPMENT__) {
    const gzipFiles = flow(
      filter((asset) => asset.name.endsWith('.gz')),
      transform((result, asset) => {
        result[`/${asset.name}`] = true;
      }, {}),
    )(clientStats.assets);
    app.use(clientStats.publicPath, (req, res, next) => {
      if (gzipFiles[req.url + '.gz']) {
        res.type(/\.[^.]*$/.exec(req.url)[0]);
        res.set('Content-Encoding', 'gzip');
        req.url += '.gz';
      }
      return void next();
    });
  }
  config.assets.forEach((asset) => {
    app.use(asset.mount, express.static(asset.path));
  });

  app.use(config.clientConfig.fetchr.xhrPath, apiGateway(config));
  app.use(offloadDetector(config.offload));
  app.use(reduxApp({ ...config, clientStats, promises }));

  return app;
}
