import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import debugFactory from 'debug';
import { reduxApp } from './middlewares';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

const debug = debugFactory('app:server:main');

const app = express();
app.use(favicon(path.resolve(__dirname, '../../statics/favicon.ico')));
app.use(express.static(path.resolve(__dirname, '../../statics')));
app.use(reduxApp());
app.use((req, res) => {
  res.status(404).send('Not found');
});

const port = +(process.env.PORT || 3001);
const server = app.listen(port, () => {
  debug(`Listening on port ${port}`);
});
export default server;
