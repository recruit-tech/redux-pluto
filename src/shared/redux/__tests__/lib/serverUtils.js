import http from "http";
import os from "os";
import path from "path";
import multer from "multer";
import express from "express";

export default function createFileUploadServer(config) {
  const app = express();
  const upload = multer({ dest: path.resolve(__dirname, os.tmpdir()) });
  const server = http.Server(app);
  app.post(config.path, upload.single(config.fieldName), (req, res, next) => {
    res.send(req.file);
  });

  return server;
}
