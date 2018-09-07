const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");

const rootDir = path.resolve(__dirname, "../..");
const outputPath = path.resolve(rootDir, "build/client");
const outputPublicPath = "/public/";

module.exports = {
  mode: "production",

  name: "client",

  target: "web",

  entry: ["@babel/polyfill", path.resolve(rootDir, "src/client/index.js")],

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
    extensions: [".js", ".jsx"],
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
      __DISABLE_SSR__: !!process.env.DISABLE_SSR,
      __REPORTSUITE_ENV__: JSON.stringify(process.env.RS_ENV),
    }),

    // optimizations
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
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
