import assert from "assert";
import Fetchr from "fetchr";
import { FetchrStatic } from "./types";

import { times } from "lodash/fp";
import { increment } from "../modules/counter";
import { createStore } from "./lib/storeUtils";
import { Store } from "redux";

let count = 0;
(Fetchr as FetchrStatic).registerService({
  name: "counter",
  update(req, resource, params, body, config, cb) {
    count++;
    const result = count;
    return cb(null, result);
  },
});

import { RootState } from "../modules/reducer";
import { Action as CounterAction } from "../modules/counter";
test("counter: increment success", async () => {
  const store: Store<RootState, CounterAction> = createStore({ cookie: {} });
  const incrementAction = increment();
  // TODO: dispatch middleware take Promise
  await Promise.all(times(() => store.dispatch(incrementAction as any), 10));
  assert.deepStrictEqual(store.getState().app.counter, {
    value: 10,
  });
});
