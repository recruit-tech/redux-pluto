import { Request, Response } from "express";

export default class AssetsHandler {
  brFiles: any;
  gzipFiles: any;
  constructor(assets: Array<{ name: string }>) {
    this.brFiles = assets.reduce((result: any, asset: { name: string }) => {
      const match = /(\.[^.]*)\.br/.exec(asset.name);
      if (match) {
        const assetIndex = 1;
        result[`/${asset.name}`] = match[assetIndex];
      }
      return result;
    }, {});
    this.gzipFiles = assets.reduce((result: any, asset: { name: string }) => {
      const match = /(\.[^.]*)\.gz/.exec(asset.name);
      if (match) {
        const assetIndex = 1;
        result[`/${asset.name}`] = match[assetIndex];
      }
      return result;
    }, {});
  }

  handleUrl(req: Request, res: Response, next: Function) {
    const ae = req.header("Accept-Encoding");
    if (!ae) {
      next();
      return;
    }
    const acceptEncodings = ae.split(", ");
    if (acceptEncodings.includes("br")) {
      const fileType = this.brFiles[req.url + ".br"];
      if (fileType) {
        res.type(fileType);
        res.set("Content-Encoding", "br");
        req.url += ".br";
      }
    } else if (acceptEncodings.includes("gzip")) {
      const fileType = this.gzipFiles[req.url + ".gz"];
      if (fileType) {
        res.type(fileType);
        res.set("Content-Encoding", "gzip");
        req.url += ".gz";
      }
    }
    next();
  }
}
