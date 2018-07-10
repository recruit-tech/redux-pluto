// @flow
import debugFactory from "debug";
import { readFile, writeFile } from "fs";
import { promisify } from "util";
const read = promisify(readFile);
const write = promisify(writeFile);

const debug = debugFactory("app:server:middleware:recorder");
export default function(config: { path: string }) {
  return async function recorder(req: $FIXME, res: $FIXME, next: Function) {
    debug(req.body)
    const { key, value } = req.body;
    if (!key) {
      return res.send("noop.");
    }
    try {
      const record = await read(config.path).then(o => JSON.parse(o));
      record[key] = value;
      debug(record);
      await write(config.path, JSON.stringify(record, "", 2));
      res.send("ok");
    } catch(e) {
      debug(e);
      res.send("error");
    }
    //return next();
  };
}
