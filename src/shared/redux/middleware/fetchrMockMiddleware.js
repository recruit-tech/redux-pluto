/* @flow */
import { FETCHR } from "redux-effects-fetchr";
import { handleActions } from "./utils";
import axios from "axios";


export default function fetchrMockMiddleware(config) {
  const client = axios.create(config);
  return handleActions({
    [FETCHR]({ dispatch, getState }, next, action) {
      const result = next(action);
      client.post("/recorder", { key: JSON.stringify(action), value: result });
      return result;
    },
  });
}
