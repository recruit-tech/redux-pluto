/* @flow */
import Fetchr from "fetchr";
import assert from "power-assert";
import Immutable from "seamless-immutable";
import { INITIAL_STATE, loadAllMasters, loadGenderMaster } from "../modules/masters";
import { createStore } from "./lib/storeUtils";
import { isSameObject } from "./lib/assertUtils";

/**
 * mock loadMaster service
 */
let genderMaster = ["male", "female"];
const services = [
  {
    name: "areaMaster",
    read(req, resource, params, config, cb) {
      cb(null, ["tokyo", "saitama", "kanagawa"]);
    }
  },
  {
    name: "hairColorMaster",
    read(req, resource, params, config, cb) {
      cb(null, ["black", "brown", "blond"]);
    }
  },
  {
    name: "genderMaster",
    read(req, resource, params, config, cb) {
      cb(null, genderMaster);
    }
  },
  {
    name: "hairLengthMaster",
    read(req, resource, params, config, cb) {
      cb(null, ["long", "short", "middle"]);
    }
  },
  {
    name: "menuContentMaster",
    read(req, resource, params, config, cb) {
      cb(null, ["menu"]);
    }
  }
];

services.forEach(Fetchr.registerService);

test("master: genderMaster success", () => {
  const loadAllMastersAction = loadAllMasters();
  const loadGenderMasterAction = loadGenderMaster();
  const initialState = Immutable({ app: { masters: INITIAL_STATE } });
  const store = createStore({
    initialState
  });
  let prevMastersState = { app: {} };
  store
    .dispatch(loadAllMastersAction)
    .then(() => {
      prevMastersState = store.getState().app.masters;
      genderMaster = ["unknown"];
      return store.dispatch(loadGenderMasterAction);
    })
    .then(() => {
      const mastersState = store.getState().app.masters;
      assert.deepEqual(mastersState.genderMaster, {
        loading: false,
        loaded: true,
        items: genderMaster
      });
      isSameObject(prevMastersState, mastersState, ["genderMaster"]);
    });
});
