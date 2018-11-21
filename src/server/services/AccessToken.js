/* @flow */
import cookie from "cookie";
import jwt from "jsonwebtoken";
import fumble from "fumble";
import debugFactory from "debug";
import isRedirectableUrl from "is-redirectable-url";
import validate from "../../shared/validators/login";
import { rejectWith } from "./utils";

const debug = debugFactory("app:server:services:accessToken");

export const ACCESS_TOKEN_COOKIE_NAME = "access-token";
export const ACCESS_TOKEN_AUDIENCE_NAME = "redux-proto";

export default class AccessToken {
  name: string;

  maxAge: number;

  key: string;

  secret: string;

  requestHandlers: Array<string>;

  constructor(config: any) {
    this.name = "accessToken";
    this.maxAge = config.auth.maxAge;
    this.key = config.auth.key;
    this.secret = config.auth.secret;
    this.requestHandlers = ["login", "logout"];
  }

  create(req: any, resource: any, params: any, body: any, config: any) {
    const validationErrors = validate(params);
    if (Object.keys(validationErrors).length) {
      return rejectWith(fumble.http.badRequest(), validationErrors);
    }

    const { username, password } = params;
    if (username !== "scott" || password !== "tiger") {
      return rejectWith(fumble.http.badRequest(), {
        _error: "ユーザ名またはパスワードが間違っています。",
      });
    }

    const expires = Date.now() + this.maxAge;
    return sign(
      {
        sub: username,
        aud: ACCESS_TOKEN_AUDIENCE_NAME,
        exp: Math.floor(expires / 1000),
      },
      this.key,
    ).then(
      token => {
        debug(token);
        return {
          meta: {
            headers: {
              "set-cookie": cookie.serialize(ACCESS_TOKEN_COOKIE_NAME, token, {
                expires: new Date(expires),
              }),
            },
          },
        };
      },
      error => {
        debug(error);
        return rejectWith(fumble.http.create(), {
          _error: "エラーが発生しました。",
        });
      },
    );
  }

  delete(req: any, resource: any, params: any, config: any) {
    return Promise.resolve({
      meta: {
        headers: {
          "set-cookie": cookie.serialize(ACCESS_TOKEN_COOKIE_NAME, null, {
            expires: new Date(0),
          }),
        },
      },
    });
  }

  login(config: any) {
    return {
      path: "/login",
      post(req: any, res: any, next: Function) {
        this.create(req, {}, req.body, config).then(result => {
          res.set(result.meta.headers);
          if (isRedirectableUrl(req.query.location)) {
            return res.redirect(req.query.location);
          }
          return res.redirect("/");
        });
      },
    };
  }

  logout(config: any) {
    return {
      path: "/logout",
      get(req: any, res: any, next: Function) {
        this.delete(req, {}, {}, config).then(result => {
          res.set(result.meta.headers);
          res.redirect("/");
        });
      },
    };
  }
}

export function sign(payload: any, key: string) {
  return jwtSign(payload, key, {
    algorithm: "RS256",
  });
}

export function verify(req: any, secret: string) {
  const accessToken = req.cookies && req.cookies[ACCESS_TOKEN_COOKIE_NAME];
  if (!accessToken) {
    return rejectWith(fumble.http.unauthorized(), { reason: "no tokoen" });
  }

  return jwtVerify(accessToken, secret, {
    algorithm: "RS256",
    audience: ACCESS_TOKEN_AUDIENCE_NAME,
  }).catch(error =>
    rejectWith(fumble.http.unauthorized(), { reason: error.message }),
  );
}

function jwtSign(payload: any, key: string, options: any) {
  return new Promise<string>((resolve, reject) =>
    jwt.sign(payload, key, options, (err, token) =>
      err ? reject(err) : resolve(token),
    ),
  );
}

function jwtVerify(token: string, secret: string, options: any) {
  return new Promise((resolve, reject) =>
    jwt.verify(token, secret, options, (err, decoded) =>
      err ? reject(err) : resolve(decoded),
    ),
  );
}
