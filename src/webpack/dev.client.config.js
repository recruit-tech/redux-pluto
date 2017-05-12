const path = require('path');
const webpack = require('webpack');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin =
  new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools.config'));

const rootDir = path.resolve(__dirname, '../..');
const port = +(process.env.PORT || 3000);
const outputPath = path.resolve(rootDir, 'build/client');
const outputPublicPath = '/public/';

module.exports = {
  target: 'web',

  devtool: 'inline-source-map',

  context: rootDir,

  entry: {
    client: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:' + port,
      'webpack/hot/only-dev-server',
      path.resolve(rootDir, 'src/client/index.js'),
    ],
  },

  output: {
    path: outputPath,
    filename: '[name].js',
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
        query: {
          cacheDirectory: true,
          presets: [
            'react',
            ['es2015', { modules: false }],
          ],
          plugins: [
            'syntax-trailing-function-commas',
            'transform-object-rest-spread',
            ['module-resolver', {
              root: ['./src'],
            }],
            'react-hot-loader/babel',
          ],
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]__[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240',
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    webpackIsomorphicToolsPlugin.development(true),
  ],

  devServer: {
    // webpack-dev-server options
    contentBase: outputPath,
    historyApiFallback: true,
    proxy: {
      '*': `http://localhost:${port + 1}`,
    },
    port,
    hot: true,

    // webpack-dev-middleware options
    noInfo: true,
  },
};
