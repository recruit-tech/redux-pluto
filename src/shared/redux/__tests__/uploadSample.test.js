import assert from "assert";
import { uploadFile } from "../modules/uploadSample";
import { createStore } from "./lib/storeUtils";

test("uploadSample: uploadFile success", async () => {
  const store = createStore({ cookie: {} });
  const file = "file";
  const uploadFileAction = uploadFile(file);
  await store.dispatch(uploadFileAction);
  assert.deepStrictEqual(store.getState().page.uploadSample, {
    loading: false,
    loaded: true,
    value: "",
    error: null,
  });
});
