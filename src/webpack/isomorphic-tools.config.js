const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const rootDir = path.resolve(__dirname, '../..');

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
module.exports = {

  // when adding "js" extension to asset types
  // and then enabling debug mode, it may cause a weird error:
  //
  // [0] npm run start-prod exited with code 1
  // Sending SIGTERM to other processes..
  //
  // debug: true,

  webpack_assets_file_path: path.resolve(rootDir, 'build/webpack-assets.json'),
  webpack_stats_file_path: path.resolve(rootDir, 'build/webpack-stats.json'),

  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif',
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },

    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot',
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },

    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },

    style_modules: {
      extensions: ['scss'],
      filter: function (module, regex, options, log) {
        // in development mode there's webpack "style-loader",
        // so the module.name is not equal to module.name
        return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
      },
      path: function (module, options, log) {
        // in development mode there's webpack "style-loader",
        // so the module.name is not equal to module.name
        return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
      },
      parser: function (module, options, log) {
        return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
      },
    },
  },
};
