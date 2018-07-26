import Fetchr from "fetchr";
import assert from "power-assert";
import { fetchItems } from "../modules/hackerNews";
import { createStore } from "./lib/storeUtils";

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

test("hackerNews: fetchItems fail", async done => {
  needFailure = true;
  const store = createStore({ cookie: {} });
  const fetchItemsAction = fetchItems(1);
  try {
    await store.dispatch(fetchItemsAction);
    done.fail();
  } catch (e) {
    const hackerNewsState = store.getState().page.hackerNews;
    assert.equal(hackerNewsState.error, true);
    assert.equal(e.message, "failure");
    done();
  }
});
