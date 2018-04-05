/* @flow */
import dev from "./dev";

export default {
  ...dev,
  agreed: {
    config: {
      axios: {
        baseURL: "http://localhost:3020/",
        timeout: 10000
      }
    }
  }
};
