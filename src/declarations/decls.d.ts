declare module "@storybook/*";
declare module "ms";
declare module "server-timing";
declare module "favalid";
declare module "fumble";
declare module "is-redirectable-url";
declare module "isomorphic-form-data";
declare module "lodash/fp";
declare module "react-router/*";
declare module "react-router-scroll";
declare module "react-hot-loader";
declare module "react-router-redux";
declare module "react-redux-analytics-sitecatalyst";
declare module "redux-effects-fetchr";
declare module "redux-effects-fetchr-cache";
declare module "redux-page-scope";
declare module "redux-devtools-log-monitor";
declare module "redux-devtools-dock-monitor";
declare module "redux-effects-formdata-uploader";
declare module "redux-effects-universal-cookie";

// TODO: Remove these to activate @typse
declare module "react-router*";
declare module "react-router-redux";
declare module "redux-form";

declare module "fetchr";
// // to access hidden export
// declare module "fetch" {
//   type Fetchr = {
//     registerService(config: {
//       name: string;
//       read?: (
//         req: any,
//         resource: string,
//         params: any,
//         config: any,
//         cb: any,
//       ) => any;
//       update?: (
//         req: any,
//         resource: string,
//         params: any,
//         body: any,
//         config: any,
//         cb: any,
//       ) => void;
//       create?: (
//         req: any,
//         resource: string,
//         params: any,
//         body: any,
//         config: any,
//         cb: any,
//       ) => void;
//       delete?: (
//         req: any,
//         resource: string,
//         params: any,
//         config: any,
//         cb: any,
//       ) => void;
//     }): void;
//   };
//   export default Fetchr;
// }

declare var __DEVELOPMENT__: boolean;
declare var __DISABLE_SSR__: boolean;
declare var __MOCK_BUILD__: boolean;
declare var __REPORTSUITE_ENV__: string;
declare var __MOCKING_LOG__: boolean;
declare var __ENABLE_OFFLOAD__: boolean;
declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
declare var __CLIENT__: boolean;
declare var __SERVER__: boolean;
declare var __CSS_CHUNKS__: any;

interface Window {
  devToolsExtension: any;
}
