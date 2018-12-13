import { transform } from "lodash/fp";
import { createAction, handleActions, Reducer } from "redux-actions";
import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { createAsyncActionTypes } from "./utils";
import { AnyAction } from "redux";

/**
 * Action types
 */
export const [
  LOAD_MASTER_REQUEST,
  LOAD_MASTER_SUCCESS,
  LOAD_MASTER_FAIL,
] = createAsyncActionTypes("redux-proto/masters/load");

/**
 * Action creators
 */
const loadMasterRequest = createAction(
  LOAD_MASTER_REQUEST,
  (resource: string) => ({
    resource,
  }),
);

const loadMasterSuccess = createAction(
  LOAD_MASTER_SUCCESS,
  (resource: string, items: any) => ({
    resource,
    items,
  }),
);

const loadMasterFail = createAction(
  LOAD_MASTER_FAIL,
  (resource: string, error: any) => ({
    resource,
    error,
  }),
);

function loadMaster(resource: string) {
  return steps(
    loadMasterRequest(resource),
    ({ payload }: { payload: any }) => fetchrRead(payload),
    [
      payload => loadMasterSuccess(resource, payload.data),
      (error: any) => loadMasterFail(resource, error),
    ],
  );
}

export function loadAreaMaster() {
  return loadMaster("areaMaster");
}

export function loadGenderMaster() {
  return loadMaster("genderMaster");
}

export function loadHairColorMaster() {
  return loadMaster("hairColorMaster");
}

export function loadHairLengthMaster() {
  return loadMaster("hairLengthMaster");
}

export function loadMenuContentMaster() {
  return loadMaster("menuContentMaster");
}

export function loadAllMasters(): Promise<AnyAction> {
  return steps([
    loadAreaMaster(),
    loadGenderMaster(),
    loadHairColorMaster(),
    loadHairLengthMaster(),
    loadMenuContentMaster(),
  ]);
}

/**
 * Initial state
 */
const RESOURCES = [
  "areaMaster",
  "genderMaster",
  "hairColorMaster",
  "hairLengthMaster",
  "menuContentMaster",
];

export type State = {
  [key: string]: {
    loading: boolean;
    loaded: boolean;
    items: any | null;
  };
};

export const INITIAL_STATE: State = transform(
  (state: State, resource: string) => {
    state[resource] = {
      loading: false,
      loaded: false,
      items: null,
    };
  },
  {},
  RESOURCES,
);

/**
 * Reducer
 */
export default handleActions<State>(
  {
    [LOAD_MASTER_REQUEST]: (state, action: any) => {
      const {
        payload: { resource },
      } = action;

      return {
        ...state,
        [resource as any]: {
          loading: true,
          loaded: false,
          items: [],
        },
      };
    },

    [LOAD_MASTER_SUCCESS]: (state: State, action: any) => {
      const {
        payload: { resource, items },
      } = action;

      return {
        ...state,
        [resource as any]: {
          loading: false,
          loaded: true,
          items,
        },
      };
    },

    [LOAD_MASTER_FAIL]: (state, action: any) => {
      const {
        payload: { resource },
        error,
      } = action;

      return {
        ...state,
        [resource as any]: {
          loading: false,
          loaded: false,
          items: [],
          error,
        },
      };
    },
  },
  INITIAL_STATE,
);
