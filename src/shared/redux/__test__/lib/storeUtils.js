import Fetchr from "fetchr";
import { createMemoryHistory } from "react-router";
import { routerMiddleware } from "react-router-redux";
import { createStore as create, applyMiddleware } from "redux";
import steps from "redux-effects-steps";
import cookie from "redux-effects-universal-cookie";
import fetchr from "redux-effects-fetchr";
import configs from "server/configs";
import reducer from "shared/redux/modules/reducer";
import authMiddleware from "shared/redux/middleware/authMiddleware";
import { sign } from "server/services/AccessToken";

export function createWithSignedStore(name, aud, options) {
  return sign(
    {
      sub: name,
      aud,
      exp: Math.floor(Date.now() / 1000)
    },
    configs.auth.key
  ).then(token => {
    const store = createStore({
      cookie: {
        "access-token": token
      }
    });
    return store;
  });
}

export function createStore(options) {
  const history = createMemoryHistory(options.historyRoute || "/");
  const initialState = options.initialState || {};
  const store = create(
    reducer,
    initialState,
    applyMiddleware(
      steps,
      authMiddleware(),
      cookie({ cookies: options.cookie }, {}),
      fetchr(new Fetchr({ ...configs.fetchr, req: {} })),
      routerMiddleware(history)
    )
  );
  return store;
}
