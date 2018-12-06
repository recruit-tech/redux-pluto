import debugFactory from "debug";

const debug = debugFactory("app:server:middleware:offloadDetector");

export default function(config: { limit: number, window: number }) {
  const { limit, window } = config;
  let count = 0;
  let timer = null;

  return function offloadDetecter(req: any, res: any, next: Function) {
    if (!timer) {
      const now = Date.now();
      const remain = Math.floor(now / window) * window + (window - now);
      timer = setTimeout(() => {
        count = 0;
        timer = null;
      }, remain);
    }

    ++count;
    req.offloadMode = count > limit;
    debug(`${count}/${limit} (${window}`);
    return next();
  };
}
