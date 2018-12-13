import http from "http";
import os from "os";
import path from "path";
import multer from "multer";
import express from "express";

export default function createFileUploadServer(config: any) {
  const app = express();
  const upload = multer({ dest: path.resolve(__dirname, os.tmpdir()) });
  const server = (http.Server as any)(app);
  app.post(config.path, upload.single(config.fieldName), (req: any, res) => {
    res.send(req.file);
  });

  return server;
}
