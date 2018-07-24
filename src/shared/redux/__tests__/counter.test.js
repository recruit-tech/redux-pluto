import Fetchr from "fetchr";
import assert from "power-assert";
import times from "lodash/fp/times";
import { increment } from "../modules/counter";
import { createStore } from "./lib/storeUtils";

let count = 0;
Fetchr.registerService({
  name: "counter",
  update(req, resource, params, body, config, cb) {
    count++;
    const result = count;
    return cb(null, result);
  },
});

test("counter: increment success", async () => {
  const store = createStore({ cookie: {} });
  const incrementAction = increment();

  await Promise.all(times(() => store.dispatch(incrementAction), 10));

  assert.deepEqual(store.getState().app.counter, {
    value: 10,
  });
});
