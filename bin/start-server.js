const path = require('path');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const isomorphicToolsConfig = require('../src/webpack/isomorphic-tools.config');

const rootDir = path.resolve(__dirname, '..');

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__DISABLE_SSR__ = !!process.env.DISABLE_SSR;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING

const server = __DEVELOPMENT__ ? '../src/server/server' : '../build/server/server';

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicToolsConfig)
  .server(rootDir, () => {
    require(server);
  });
