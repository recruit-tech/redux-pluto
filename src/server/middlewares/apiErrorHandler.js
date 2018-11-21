export default function apiErrorHandler() {
  return (err, req, res, next) => {
    if (err.code === "EBADCSRFTOKEN") {
      res.statusCode = 403;
      return res.end("Invalid csrf token");
    }
    return next(err);
  };
}
