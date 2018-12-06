import assert from "assert";
import fs from "fs";
import path from "path";
import { uploadFile } from "../modules/uploadSample";
import { createStore } from "./lib/storeUtils";
import createFileUploadServer from "./lib/serverUtils";

test("uploadSample: uploadFile success", done => {
  const server = createFileUploadServer({ path: "/file", fieldName: "file" });
  server.listen(0);
  server.on("listening", async () => {
    const { port } = server.address();
    const store = createStore({ cookie: {}, upload: { port } });
    const filePath = path.resolve(__dirname, "./fixtures/hello.txt");
    const file = fs.createReadStream(filePath);
    const uploadFileAction = uploadFile("/file", file);
    await store.dispatch(uploadFileAction).catch(e => assert.fail(e));
    const state = store.getState().app.uploadSample;
    assert(state.path);
    const expected = await fs.promises.readFile(filePath);
    const actual = await fs.promises.readFile(state.path);
    assert.strictEqual(expected.toString(), actual.toString());
    server.close();
  });
  server.on("close", done);
});
