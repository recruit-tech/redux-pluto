const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootDir = path.resolve(__dirname, '../..');
const outputPath = path.resolve(rootDir, 'build/server');

function getExternals() {
  const nodeModules = fs.readdirSync(path.resolve(rootDir, 'node_modules'));
  return nodeModules.reduce((ext, mod) => {
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
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(rootDir, 'src/server'),
          path.resolve(rootDir, 'src/shared'),
        ],
        exclude: [
          /node_modules/,
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          loader: [{
            loader: 'css-loader',
            query: {
              modules: true,
              locals: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:8]',
            },
          }, {
            loader: 'postcss-loader',
          },
          ],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      allChunks: true,
    }),
    new webpack.IgnorePlugin(/\.(jpe?g|png|gif|woff2?|ttf|eot)$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DISABLE_SSR__: false,
    }),

    // optimizations
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
      },
    }),
  ],
};
