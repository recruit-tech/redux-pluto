const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();
const port = +(process.env.PORT || 3000);
const outputPath = path.resolve(cwd, 'build/browser');
const outputPublicPath = '/public/';

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    client: [
      './src/client/client.js',
    ],
  },
  output: {
    path: outputPath,
    publicPath: outputPublicPath,
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(cwd, 'src/client'),
          path.resolve(cwd, 'src/shared'),
        ],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'react',
            'es2015',
          ],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread',
            'transform-runtime',
            ['react-transform',
              {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module'],
                  },
                  {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react'],
                  },
                ],
              },
            ],
          ],
        },
      },
    ],
  },
  resolve: {
    root: [
      path.resolve(cwd, 'src/client'),
      path.resolve(cwd, 'src/shared'),
    ],
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
    }),

  ],

  devServer: {
    // webpack-dev-server options
    contentBase: outputPath,
    historyApiFallBack: true,
    proxy: {
      '*': `http://localhost:${port + 1}`,
    },
    port,

    // webpack-dev-middleware options
    noInfo: true,
  },
};
