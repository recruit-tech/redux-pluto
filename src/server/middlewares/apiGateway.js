import Fetchr from "fetchr";

export default function apiGateway(config) {
  return (req, res, next) => {
    res.startTime("apigateway", "API Gateway");
    return Fetchr.middleware({
      responseFormatter: (req, res, data) => {
        res.endTime("apigateway");
        return data;
      }
    })(req, res, next);
  };
}

