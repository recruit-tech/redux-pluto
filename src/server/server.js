import http from 'http';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import favicon from 'serve-favicon';
import { create as createAxios } from 'axios';
import debugFactory from 'debug';
import config from './configs';
import { reduxApp as createReduxApp, apiGateway } from './middlewares';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING

const debug = debugFactory('app:server:main');

const { reduxApp, loadAllMasters } = createReduxApp();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session(config.session));
app.use(favicon(path.resolve(__dirname, '../../statics/favicon.ico')));
app.use(express.static(path.resolve(__dirname, '../../statics')));
app.use(config.fetchr.xhrPath, apiGateway(createAxios(config.axios)));
app.use(reduxApp);
app.use((req, res) => {
  res.status(404).send('Not found');
});

debug('Creating http server');
const server = http.createServer(app);

loadAllMasters().then(() => {
  const port = +(process.env.PORT || 3001);
  app.listen(port, () => {
    debug(`Listening on port ${port}`);
  });
});

export default server;
