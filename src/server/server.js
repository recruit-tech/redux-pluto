import http from 'http';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import csurf from 'csurf';
import favicon from 'serve-favicon';
import debugFactory from 'debug';
import config from './configs';
import { apiGateway, offloadDetector, reduxApp as createReduxApp } from './middlewares';

const debug = debugFactory('app:server:main');

const { reduxApp, loadInitialData } = createReduxApp(config);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
app.use(cookieParser(config.cookieParser));
app.use(session(config.session));
app.use(csurf(config.csurf));
app.use(favicon(config.favicon));
config.assets.forEach((asset) => {
  app.use(asset.mount, express.static(asset.path));
});
app.use(config.clientConfig.fetchr.xhrPath, apiGateway(config));
app.use(offloadDetector(config.offload));
app.use(reduxApp);
app.use((req, res) => {
  res.status(404).send('Not found');
});

debug('Creating http server');
const server = http.createServer(app);

loadInitialData().then(() => {
  const port = +(process.env.PORT || 3000);
  app.listen(port, () => {
    debug(`Listening on port ${port}`);
  });
});

export default server;
