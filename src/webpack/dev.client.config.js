/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const qs = require("query-string");
const webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");

const rootDir = path.resolve(__dirname, "../..");
const outputPath = path.resolve(rootDir, "build/client");
const outputPublicPath = "/public/";

const createStyledComponentsTransformer = require("typescript-plugin-styled-components")
  .default;

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  mode: "development",

  name: "client",

  cache: true,

  target: "web",

  devtool: "eval-cheap-module-source-map",

  context: rootDir,

  entry: [
    "@babel/polyfill",
    "webpack-hot-middleware/client?" +
      qs.stringify({
        path: "/__webpack_hmr",
        timeout: 20000,
        reload: false,
        quiet: false,
        noInfo: false,
      }),
    "react-hot-loader/patch",
    path.resolve(rootDir, "src/client/index"),
  ],

  output: {
    path: outputPath,
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: outputPublicPath,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(rootDir, "src/client"),
          path.resolve(rootDir, "src/shared"),
        ],
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader?cacheDirectory=true",
          options: {
            envName: "development:client",
          },
        },
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve(rootDir, "src/client"),
      path.resolve(rootDir, "src/shared"),
      "node_modules",
    ],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    enforceModuleExtension: false,
  },

  optimization: {
    noEmitOnErrors: true,
    splitChunks: false,
  },

  plugins: [
    new WriteFilePlugin(),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
      __MOCK_BUILD__: !!process.env.MOCK_BUILD,
      __DISABLE_SSR__: !!process.env.DISABLE_SSR,
      __REPORTSUITE_ENV__: JSON.stringify("dev"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
