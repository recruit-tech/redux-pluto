import fs from "fs";
import path from "path";
import multer from "multer";
import express from "express";
import FormData from "form-data";
import { test } from "eater/runner";
import assert from "power-assert";
import AssertStream from "assert-stream";
import UploadSample from "../UploadSample";
import configs from "../../configs";

const assertStream = new AssertStream();

test("UploadSample: upload file", () => {
  const upload = multer(configs.multer);
  const uploadSample = new UploadSample(configs);
  const app = express();

  const apiPath = `${configs.upload.path}${uploadSample.path}`;
  app.post(apiPath, upload.single("file"), uploadSample.createMiddleware());
  const server = app.listen(0, () => {
    const { port } = server.address();
    const form = new FormData();
    form.append(
      "file",
      fs.createReadStream(path.join(__dirname, "/fixtures/logo.png"))
    );

    form.submit(`http://localhost:${port}${apiPath}`, (err, res) => {
      if (err) {
        assert.fail(err);
      }

      assertStream.expect({
        path: /public/
      });
      res.pipe(assertStream);
      assertStream.on("finish", () => {
        server.close();
      });
    });
  });
});
