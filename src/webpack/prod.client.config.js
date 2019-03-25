/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");

const pack = require("../../package.json");
const rootDir = path.resolve(__dirname, "../..");
const outputPath = path.resolve(rootDir, "build/client");
const outputPublicPath = "/public/";

const createStyledComponentsTransformer = require("typescript-plugin-styled-components")
  .default;

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  mode: "production",

  name: "client",

  target: "web",

  entry: [path.resolve(rootDir, "src/client/index")],

  output: {
    path: outputPath,
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
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
          loader: "babel-loader",
          options: {
            envName: "production:client",
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
    alias: {
      "lodash-es": "lodash",
    },
  },

  optimization: {
    splitChunks: {
      chunks: "all",
      name: "bootstrap",
    },
  },

  plugins: [
    new StatsPlugin("stats.json", {
      chunkModules: true,
    }),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __MOCK_BUILD__: !!process.env.MOCK_BUILD,
      __DISABLE_SSR__: !!process.env.DISABLE_SSR,
      __REPORTSUITE_ENV__: JSON.stringify(process.env.RS_ENV),
      __VERSION__: JSON.stringify(pack.version),
    }),

    // optimizations
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css|html)$/,
      threshold: 1024,
      minRatio: 0.8,
    }),

    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.(js|css|html)$/,
      threshold: 1024,
      minRatio: 0.8,
    }),

    new WorkboxPlugin.GenerateSW({
      swDest: "sw/sw.js",
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
