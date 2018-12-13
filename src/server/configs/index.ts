import dev from "./dev";
import test from "./test";

export default getConfig(process.env.NODE_ENV as string);

function getConfig(env: string) {
  switch (env) {
    case "test":
      return test;
    default:
      return dev;
  }
}
