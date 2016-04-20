import path from 'path';
import piping from 'piping';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';

const rootDir = path.resolve(__dirname, '..');

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING

// https://github.com/mdlawson/piping
const pipingConfig = {
  hook: true,
  ignore: /(\/\.|~$|\/client|\.json|\.scss$)/i,
};
if (piping(pipingConfig)) {
  // https://github.com/halt-hammerzeit/webpack-isomorphic-tools
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic-tools'))
    .development(true)
    .server(rootDir, () => {
      require('./server');
    });
}
