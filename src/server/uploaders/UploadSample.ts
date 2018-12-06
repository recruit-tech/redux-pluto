import { create as createAxios } from "axios";
import { create } from "../services/utils";
import { Response, Request } from "express";

export default class UploadSample {
  path: string;
  name: string;
  field: string;
  axios: any;
  constructor(config: { agreed: { config: { axios: any } } }) {
    this.path = "/uploadsample";
    this.name = "uploader/uploadsample";
    this.field = "file";
    this.axios = createAxios(config.agreed.config.axios);
  }

  createMiddleware() {
    return (
      req: Request & { file: { filename: string } },
      res: Response,
      next: Function,
    ) => {
      const path = `/public/${req.file.filename}`;
      return create(this.axios, this.name, this.path, { path }, {}, {})
        .then(_result => {
          res.json({
            path,
          });
        })
        .catch(next);
    };
  }
}
