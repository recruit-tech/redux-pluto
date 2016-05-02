const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootDir = path.resolve(__dirname, '../..');
const outputPath = path.resolve(rootDir, 'build/server');

function getExternals() {
  const nodeModules = fs.readdirSync(path.resolve(rootDir, 'node_modules'));
  return nodeModules.reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod;
    return ext;
  }, {});
}

module.exports = {
  target: 'node',

  devtool: 'source-map',

  entry: path.resolve(rootDir, 'src/server/server.js'),

  output: {
    path: outputPath,
    filename: 'server.js',
  },

  externals: getExternals(),

  node: {
    __filename: true,
    __dirname: true,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(rootDir, 'src/server'),
          path.resolve(rootDir, 'src/shared'),
        ],
        exclude: [
          /node_modules/,
        ],
        loader: 'babel',
        query: {
          presets: [
            'react',
            'es2015-node4',
          ],
          plugins: [
            'syntax-trailing-function-commas',
            'transform-class-properties',
            'transform-object-rest-spread',
            'transform-react-constant-elements',
            'transform-react-inline-elements',
          ],
        },
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract([
          'css-loader?' + JSON.stringify({
            modules: true,
            locals: true,
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:8]',
          }),
          'postcss-loader',
        ]),
      },
    ],
  },

  progress: true,

  plugins: [
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.IgnorePlugin(/\.(jpe?g|png|gif|woff2?|ttf|eot)$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        PORT: 3000,
      },
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DISABLE_SSR__: false,
    }),
  ],
};
