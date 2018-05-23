/* @flow */
import Fetchr from "fetchr";
import assert from "power-assert";
import Immutable from "seamless-immutable";
import {
  INITIAL_STATE,
  loadAllMasters,
  loadHairLengthMaster,
} from "../modules/masters";
import { createStore } from "./lib/storeUtils";
import { isSameObject } from "./lib/assertUtils";

/**
 * mock loadMaster service
 */
let hairLengthMaster = ["long", "short", "middle"];
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
      cb(null, ["black", "brown", "blond"]);
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
      cb(null, hairLengthMaster);
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

test("master: hairLengthMaster success", () => {
  const loadAllMastersAction = loadAllMasters();
  const loadHairLengthMasterAction = loadHairLengthMaster();
  const initialState = Immutable({ app: { masters: INITIAL_STATE } });
  const store = createStore({
    initialState,
  });
  let prevMastersState = { app: {} };
  store
    .dispatch(loadAllMastersAction)
    .then(() => {
      prevMastersState = store.getState().app.masters;
      hairLengthMaster = ["semilong"];
      return store.dispatch(loadHairLengthMasterAction);
    })
    .then(() => {
      const mastersState = store.getState().app.masters;
      assert.deepEqual(mastersState.hairLengthMaster, {
        loading: false,
        loaded: true,
        items: hairLengthMaster,
      });
      isSameObject(prevMastersState, mastersState, ["hairLengthMaster"]);
    });
});
