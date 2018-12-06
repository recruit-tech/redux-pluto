import { create as createAxios } from "axios";
import { create } from "../services/utils";

export default class UploadSample {
  path: string;
  name: string;
  field: string;
  axios: any;
  constructor(config) {
    this.path = "/uploadsample";
    this.name = "uploader/uploadsample";
    this.field = "file";
    this.axios = createAxios(config.agreed.config.axios);
  }

  createMiddleware() {
    return (req, res, next) => {
      const path = `/public/${req.file.filename}`;
      return create(this.axios, this.name, this.path, { path }, {}, {})
        .then(result => {
          res.json({
            path,
          });
        })
        .catch(next);
    };
  }
}
