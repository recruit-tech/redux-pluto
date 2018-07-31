/* @flow */
import assert from "assert";
import Fetchr from "fetchr";
import Immutable from "seamless-immutable";
import {
  INITIAL_STATE,
  loadAllMasters,
  loadHairColorMaster,
} from "../modules/masters";
import { createStore } from "./lib/storeUtils";
import { isSameObject } from "./lib/assertUtils";

/**
 * mock loadMaster service
 */
let hairColorMaster = ["black", "brown", "blond"];
const services = [
  {
    name: "areaMaster",
    read(req, resource, params, config, cb) {
      cb(null, ["tokyo", "saitama", "kanagawa"]);
    },
  },
  {
    name: "hairColorMaster",
    read(req, resource, params, config, cb) {
      cb(null, hairColorMaster);
    },
  },
  {
    name: "genderMaster",
    read(req, resource, params, config, cb) {
      cb(null, ["male", "female"]);
    },
  },
  {
    name: "hairLengthMaster",
    read(req, resource, params, config, cb) {
      cb(null, ["long", "short", "middle"]);
    },
  },
  {
    name: "menuContentMaster",
    read(req, resource, params, config, cb) {
      cb(null, ["menu"]);
    },
  },
];

services.forEach(Fetchr.registerService);

test("master: hairColorMaster success", () => {
  const loadAllMastersAction = loadAllMasters();
  const loadHairColorMasterAction = loadHairColorMaster();
  const initialState = Immutable({ app: { masters: INITIAL_STATE } });
  const store = createStore({
    initialState,
  });
  let prevMastersState = { app: {} };
  store
    .dispatch(loadAllMastersAction)
    .then(() => {
      prevMastersState = store.getState().app.masters;
      hairColorMaster = ["white", "purple"];
      return store.dispatch(loadHairColorMasterAction);
    })
    .then(() => {
      const mastersState = store.getState().app.masters;
      assert.deepStrictEqual(mastersState.hairColorMaster, {
        loading: false,
        loaded: true,
        items: hairColorMaster,
      });
      isSameObject(prevMastersState, mastersState, ["hairColorMaster"]);
    });
});
