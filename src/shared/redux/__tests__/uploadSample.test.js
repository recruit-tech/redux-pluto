import assert from "power-assert";
import { createStore } from "./lib/storeUtils";
import { uploadFile } from "../modules/uploadSample";

test("uploadSample: uploadFile success", async () => {
  const store = createStore({ cookie: {} });
  const file = "file";
  const uploadFileAction = uploadFile(file);
  await store.dispatch(uploadFileAction);
  assert.deepEqual(store.getState().page.uploadSample, {
    loading: false,
    loaded: true,
    value: "",
    error: null,
  });
});
