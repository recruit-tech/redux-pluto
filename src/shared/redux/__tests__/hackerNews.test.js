import Fetchr from "fetchr";
import assert from "power-assert";
import { createStore } from "./lib/storeUtils";
import { fetchItems } from "../modules/hackerNews";

const searchedItems = ["hello", "hackerNews"];

let needFailure = false;
Fetchr.registerService({
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
  const hackerNewsState = store.getState().page.hackerNews;

  assert.deepEqual(hackerNewsState, {
    loading: false,
    items: searchedItems,
    page: 1,
  });
});

test("hackerNews: fetchItems fail", async () => {
  needFailure = true;
  const store = createStore({ cookie: {} });
  const fetchItemsAction = fetchItems(1);
  await store.dispatch(fetchItemsAction);
  const hackerNewsState = store.getState().page.hackerNews;
  assert.equal(hackerNewsState.error.message, "failure");
});
