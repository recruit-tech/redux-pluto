import Fetchr from "fetchr";
import assert from "power-assert";
import { createStore } from "./lib/storeUtils";
import { searchSearchList, searchMoreSearchList } from "../modules/searchList";

// create array : [0, 1, 2, ..., 49]
const searchedItems = Array.apply(null, { length: 50 }).map(
  Number.call,
  Number,
);
let needFailure = false;
let payloadInjection = {};
Fetchr.registerService({
  name: "search",
  read(req, resource, params, config, cb) {
    const result = {
      results_available: 100,
      results_start: 0,
      search: searchedItems,
      ...payloadInjection,
    };

    return needFailure ? cb(new Error("failure")) : cb(null, result);
  },
});

test("searchList: searchSearchList success", async () => {
  const store = createStore({ cookie: {} });
  const searchSearchListAction = searchSearchList({});
  await store.dispatch(searchSearchListAction);
  const searchListState = store.getState().page.searchList;

  assert.deepEqual(searchListState, {
    loading: false,
    loaded: true,
    params: {},
    count: 100,
    page: 0,
    pages: [0, 1],
    items: {
      "0": searchedItems,
    },
    canGetNext: true,
    canGetPrev: false,
    shouldAdjustScroll: false,
    forceScrollTo: {},
  });
});

test("searchList: searchSearchList fail", async () => {
  needFailure = true;
  const store = createStore({ cookie: {} });
  const searchSearchListAction = searchSearchList({});
  await store.dispatch(searchSearchListAction);
  const searchListState = store.getState().page.searchList;
  assert.equal(searchListState.error.message, "failure");
});

test("searchList: searchMoreSearchList success", async () => {
  needFailure = false;
  const store = createStore({ cookie: {} });

  const searchSearchListAction = searchSearchList({});
  await store.dispatch(searchSearchListAction);

  payloadInjection = { results_start: 50 };
  const params = { page: 1 };
  const searchMoreSearchListAction = searchMoreSearchList(params);
  await store.dispatch(searchMoreSearchListAction);
  const searchListState = store.getState().page.searchList;

  assert.deepEqual(searchListState, {
    loading: false,
    loaded: true,
    params: {},
    count: 100,
    page: 1,
    pages: [0, 1],
    items: {
      "0": searchedItems,
      "1": searchedItems,
    },
    canGetNext: false,
    canGetPrev: true,
    shouldAdjustScroll: false,
    forceScrollTo: {},
    item: {},
  });
});

test("searchList: searchMoreSearchList fail", async () => {
  needFailure = true;
  const store = createStore({ cookie: {} });

  const searchMoreSearchListAction = searchMoreSearchList({});
  await store.dispatch(searchMoreSearchListAction);
  const searchListState = store.getState().page.searchList;
  assert.equal(searchListState.error.message, "failure");
});
