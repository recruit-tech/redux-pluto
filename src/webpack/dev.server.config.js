const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

const rootDir = path.resolve(__dirname, '../..');
const outputPath = path.resolve(rootDir, 'build/server');
const outputPublicPath = '/public/';

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs.readdirSync(path.resolve(rootDir, 'node_modules'))
  .filter((module) =>
    !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(module)
  )
  .reduce((ext, module) => {
    ext[module] = `commonjs ${module}`;
    return ext;
  }, {});

module.exports = {
  name: 'server',

  target: 'node',

  devtool: 'source-map',

  entry: [
    path.resolve(rootDir, 'src/server/index.js'),
  ],

  externals,

  output: {
    path: outputPath,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: outputPublicPath,
  },

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
        use: {
          loader: 'babel-loader',
          options: {
            forceEnv: 'development:server',
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: [
          /node_modules/,
        ],
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              localIdentName: '[path]__[name]__[local]--[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new WriteFilePlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DISABLE_SSR__: !!process.env.DISABLE_SSR,
    }),

    // optimizations
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
