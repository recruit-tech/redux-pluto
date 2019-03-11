import assert from "assert";
import Fetchr from "fetchr";
import { FetchrStatic } from "./types";

import { fetchItems } from "../modules/hackerNews";
import { createStore } from "./lib/storeUtils";

const searchedItems = ["hello", "hackerNews"];

let needFailure = false;
(Fetchr as FetchrStatic).registerService({
  name: "hackerNews",
  read(req, resource, params, config, cb) {
    const result = searchedItems;
    return needFailure ? cb(new Error("failure")) : cb(null, result);
  },
});

test("hackerNews: fetchItems success", async () => {
  const store = createStore({ cookie: {} });
  const fetchItemsAction = fetchItems(1);
  await store.dispatch(fetchItemsAction);
  const hackerNewsState = store.getState().app.hackerNews;

  assert.deepStrictEqual(hackerNewsState, {
    loading: false,
    items: searchedItems,
    page: 1,
  });
});

test("hackerNews: fetchItems fail", async done => {
  needFailure = true;
  const store = createStore({ cookie: {} });
  const fetchItemsAction = fetchItems(1);
  try {
    await store.dispatch(fetchItemsAction);
    done.fail();
  } catch (e) {
    const hackerNewsState = store.getState().app.hackerNews;
    assert.strictEqual(hackerNewsState.error, true);
    assert.strictEqual(e.message, "failure");
    done();
  }
});
