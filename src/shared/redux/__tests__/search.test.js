import Fetchr from "fetchr";
import assert from "power-assert";
import { createStore } from "./lib/storeUtils";
import { findSalonById } from "../modules/search";

const searchedItems = [
  {
    name: "hello, world!",
    urls: {
      pc: "localhost",
    },
  },
];
let needFailure = false;
Fetchr.registerService({
  name: "search",
  read(req, resource, params, config, cb) {
    const result = { search: searchedItems };
    return needFailure ? cb(new Error("failure")) : cb(null, result);
  },
});

test("search: findSalonById success", async () => {
  const store = createStore({ cookie: {} });
  const findSalonByIdAction = findSalonById("salon-id");
  await store.dispatch(findSalonByIdAction);
  const searchState = store.getState().page.search;

  assert.deepEqual(searchState, {
    loading: false,
    loaded: true,
    item: searchedItems[0],
  });
});

test("search: findSalonById fail", async () => {
  needFailure = true;
  const store = createStore({ cookie: {} });
  const findSalonByIdAction = findSalonById("salon-id");
  try {
    await store.dispatch(findSalonByIdAction);
  } catch (e) {
    const searchState = store.getState().page.search;
    assert.equal(searchState.error, true);
    assert.equal(e.message, "failure");
  }
});
