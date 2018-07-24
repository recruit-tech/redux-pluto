import Fetchr from "fetchr";
import assert from "power-assert";
import { createStore } from "./lib/storeUtils";
import { increment } from "../modules/counter";

let needFailure = false;
let count = 0;
Fetchr.registerService({
  name: "counter",
  read(req, resource, params, config, cb) {
    count++;
    const result = count;
    return needFailure ? cb(new Error("failure")) : cb(null, result);
  },
  update(req, resource, params, body, config, cb) {
    count++;
    const result = count;
    return needFailure ? cb(new Error("failure")) : cb(null, result);
  },
});

test("counter: increment success", async () => {
  const store = createStore({ cookie: {} });
  const incrementAction = increment();

  for (let i = 0; i < 10; i++) {
    await store.dispatch(incrementAction);
  }

  assert.deepEqual(store.getState().app.counter, {
    value: 10,
  });
});
