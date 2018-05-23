const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");

const rootDir = path.resolve(__dirname, "../..");
const outputPath = path.resolve(rootDir, "build/client");
const outputPublicPath = "/public/";

module.exports = {
  name: "client",

  target: "web",

  devtool: false,

  entry: ["babel-polyfill", path.resolve(rootDir, "src/client/index.js")],

  output: {
    path: outputPath,
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: outputPublicPath,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(rootDir, "src/client"),
          path.resolve(rootDir, "src/shared"),
        ],
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            forceEnv: "production:client",
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[local]--[hash:base64:8]",
                minimize: true,
              },
            },
            "postcss-loader",
          ],
        }),
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve(rootDir, "src/client"),
      path.resolve(rootDir, "src/shared"),
      "node_modules",
    ],
    extensions: [".js", ".jsx"],
    enforceModuleExtension: false,
    alias: {
      "lodash-es": "lodash",
      joi: "joi-browser",
    },
  },

  plugins: [
    new StatsPlugin("stats.json", {
      chunkModules: true,
    }),
    new ExtractCssChunks(),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DISABLE_SSR__: !!process.env.DISABLE_SSR,
      __REPORTSUITE_ENV__: JSON.stringify(process.env.RS_ENV),
    }),

    // optimizations
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["bootstrap"], // needed to put webpack bootstrap code before chunks
      filename: "[name].[chunkhash].js",
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
      },
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 1024,
      minRatio: 0.8,
    }),
  ],
};
