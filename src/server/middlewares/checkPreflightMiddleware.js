export default function checkPreflightMiddleware(configOrigin) {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      const { origin } = req.headers;
      const customHeader = req.headers["x-requested-with"];
      if (customHeader === "XMLHttpRequest" && origin === configOrigin) {
        res.header("Access-Control-Allow-Origin", configOrigin);
        res.header(
          "Access-Control-Allow-Methods",
          "GET,HEAD,PUT,PATCH,POST,DELETE",
        );
        res.header(
          "Access-Control-Allow-Headers",
          Object.keys(req.headers).join(","),
        );
      }
    }
    next();
  };
}
