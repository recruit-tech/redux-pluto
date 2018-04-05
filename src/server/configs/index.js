/* @flow */
import dev from "./dev";
import test from "./test";

export default getConfig(process.env.NODE_ENV);

function getConfig(env) {
  switch (env) {
    case "test":
      return test;
    default:
      return dev;
  }
}
