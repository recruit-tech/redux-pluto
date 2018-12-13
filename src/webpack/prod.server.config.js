const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

const rootDir = path.resolve(__dirname, "../..");
const outputPath = path.resolve(rootDir, "build/server");

const createStyledComponentsTransformer = require("typescript-plugin-styled-components")
  .default;

const styledComponentsTransformer = createStyledComponentsTransformer();

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(path.resolve(rootDir, "node_modules"))
  .filter(
    module =>
      !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(
        module,
      ),
  )
  .reduce((ext, module) => {
    ext[module] = `commonjs ${module}`;
    return ext;
  }, {});

module.exports = {
  mode: "production",

  name: "server",

  target: "node",

  devtool: "source-map",

  entry: [path.resolve(rootDir, "src/server/index.ts")],

  externals,

  output: {
    path: outputPath,
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },

  node: {
    __filename: true,
    __dirname: true,
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
          path.resolve(rootDir, "src/server"),
          path.resolve(rootDir, "src/shared"),
        ],
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            envName: "production:server",
          },
        },
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DISABLE_SSR__: !!process.env.DISABLE_SSR,
      __ENABLE_OFFLOAD__: !!process.env.ENABLE_OFFLOAD,
      __DISABLE_INLINE_CSS__: !!process.env.DISABLE_INLINE_CSS,
    }),

    // optimizations
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
