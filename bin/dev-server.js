import path from 'path';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import isomorphicToolsConfig from '../src/webpack/isomorphic-tools.config';

const rootDir = path.resolve(__dirname, '..');

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicToolsConfig)
  .development(true)
  .server(rootDir, () => {
    require('../src/server/server');
  });
