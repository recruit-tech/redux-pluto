const path = require("path");
const qs = require("query-string");
const webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

const rootDir = path.resolve(__dirname, "../..");
const outputPath = path.resolve(rootDir, "build/client");
const outputPublicPath = "/public/";

module.exports = {
  name: "client",

  target: "web",

  devtool: "inline-source-map",

  context: rootDir,

  entry: [
    "babel-polyfill",
    "webpack-hot-middleware/client?" +
      qs.stringify({
        path: "/__webpack_hmr",
        timeout: 20000,
        reload: false,
        quiet: false,
        noInfo: false
      }),
    "react-hot-loader/patch",
    path.resolve(rootDir, "src/client/index.js"),
    path.resolve(rootDir, "src/client/main.scss")
  ],

  output: {
    path: outputPath,
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: outputPublicPath
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(rootDir, "src/client"),
          path.resolve(rootDir, "src/shared")
        ],
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            forceEnv: "development:client"
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[path]__[name]__[local]--[hash:base64:5]"
              }
            },
            "postcss-loader"
          ]
        })
      }
    ]
  },

  resolve: {
    modules: [
      path.resolve(rootDir, "src/client"),
      path.resolve(rootDir, "src/shared"),
      "node_modules"
    ],
    extensions: [".js", ".jsx"],
    enforceModuleExtension: false,
    alias: {
      joi: "joi-browser"
    }
  },

  plugins: [
    new WriteFilePlugin(),
    new ExtractCssChunks(),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
      __DISABLE_SSR__: !!process.env.DISABLE_SSR,
      __REPORTSUITE_ENV__: JSON.stringify("dev")
    }),

    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      names: ["bootstrap"], // needed to put webpack bootstrap code before chunks
      filename: "[name].js",
      minChunks: Infinity
    })
  ]
};
