const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin =
  new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools.config'));

const rootDir = path.resolve(__dirname, '../..');
const outputPath = path.resolve(rootDir, 'build/client');
const outputPublicPath = '/public/';

module.exports = {
  target: 'web',

  devtool: 'source-map',

  context: rootDir,

  entry: {
    client: [
      path.resolve(rootDir, 'src/client/index.js'),
    ],
  },

  output: {
    path: outputPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: outputPublicPath,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(rootDir, 'src/client'),
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
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                locals: true,
                importLoaders: 1,
                localIdentName: '[local]___[hash:base64:8]',
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve(rootDir, 'src/client'),
      path.resolve(rootDir, 'src/shared'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
    enforceModuleExtension: false,
    aliasFields: ['browser'],
  },

  plugins: [
    new LodashModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),

    // optimizations
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor_[hash].js',
      minSize: 2,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: true,
        screw_ie8: true,
      },
    }),

    webpackIsomorphicToolsPlugin,
  ],
};
