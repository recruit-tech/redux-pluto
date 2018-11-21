/* @flow */
import Fetchr from "fetchr";
import { createMemoryHistory } from "react-router";
import { routerMiddleware } from "react-router-redux";
import { createStore as create, applyMiddleware } from "redux";
import steps from "redux-effects-steps";
import cookie from "redux-effects-universal-cookie";
import fetchr from "redux-effects-fetchr";
import uploader from "redux-effects-formdata-uploader";
import authMiddleware from "../../middleware/authMiddleware";
import { sign } from "../../../../server/services/AccessToken";
import reducer from "../../modules/reducer";
import configs from "../../../../server/configs";

export function createWithSignedStore(name: string, aud: *, options: Object) {
  return sign(
    {
      sub: name,
      aud,
      exp: Math.floor(Date.now() / 1000),
    },
    configs.auth.key,
  ).then(token => {
    const store = createStore({
      cookie: {
        "access-token": token,
      },
    });
    return store;
  });
}

export function createStore(options: Object) {
  const history = createMemoryHistory(options.historyRoute || "/");
  const initialState = options.initialState || {};
  const store = (create: any)(
    reducer,
    initialState,
    (applyMiddleware: any)(
      ...[
        steps,
        authMiddleware(),
        cookie({ cookies: options.cookie }, {}),
        fetchr(new Fetchr({ ...configs.fetchr, req: {} })),
        options.upload &&
          uploader({
            baseURL: `http://localhost:${options.upload.port}`,
          }),
        routerMiddleware(history),
      ].filter(Boolean),
    ),
  );
  return store;
}
