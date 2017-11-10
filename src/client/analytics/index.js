import * as plugins from '../vendor/s_code/plugins';
import optionCreator from '../vendor/s_code/optionCreator';
import sGenerateInstance from '../vendor/s_code/s_code';
import doPlugins from './doPlugins';

/* eslint-disable react/require-extension */
const prdConfig = require('./config/prod');
const devConfig = require('./config/dev');

const config = __REPORTSUITE_ENV__ === 'prd' ? prdConfig : devConfig;
/* eslint-enable react/require-extension */

export { sGenerateInstance };
export { plugins };
export { doPlugins };
export { optionCreator };
export { config };
