/* eslint-disable no-underscore-dangle, callback-return */
import { FETCHR } from "redux-effects-fetchr";
import { create } from "axios";
import { isEqual } from "lodash/fp";

export default () => {
  const axios = create({
    headers: { "Content-Type": "application/json" },
    baseURL: "http://localhost:8888",
  });

  return ({ dispatch }) => next => action => {
    if (action.type === FETCHR) {
      if (window && window.__MOCKING_LOG__) {
        return new Promise((resolve, reject) => {
          const log = window.__MOCKING_LOG__.find(_log =>
            isEqual(_log.action, JSON.parse(JSON.stringify(action))),
          );
          if (log) return resolve(log.response);
          else return reject(new Error(`Could'nt find ${action}`));
        });
      }
      const promise = next(action);
      promise
        .then(response => {
          axios.post("/", {
            action,
            response,
          });
        })
        .catch(e => {
          axios.post("/", {
            action,
            response: e.message,
          });
        });
      return promise;
    } else {
      return next(action);
    }
  };
};
