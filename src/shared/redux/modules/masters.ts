import { transform } from "lodash/fp";
import { createAction, handleActions, Reducer } from "redux-actions";
import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { createAsyncActionTypes } from "./utils";

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
const loadMasterRequest = createAction(LOAD_MASTER_REQUEST, resource => ({
  resource,
}));

const loadMasterSuccess = createAction(
  LOAD_MASTER_SUCCESS,
  (resource, items) => ({
    resource,
    items,
  }),
);

const loadMasterFail = createAction(LOAD_MASTER_FAIL, (resource, error) => ({
  resource,
  error,
}));

function loadMaster(resource) {
  return steps(
    loadMasterRequest(resource),
    ({ payload }) => fetchrRead(payload),
    [
      payload => loadMasterSuccess(resource, payload.data),
      error => loadMasterFail(resource, error),
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

export function loadAllMasters() {
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
    loading: boolean,
    loaded: boolean,
    items: any | null,
  },
};

export const INITIAL_STATE: State = transform(
  (state, resource) => {
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
export default (handleActions(
  {
    [LOAD_MASTER_REQUEST]: (state, action) => {
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

    [LOAD_MASTER_SUCCESS]: (state, action) => {
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

    [LOAD_MASTER_FAIL]: (state, action) => {
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
)as Reducer<State, any>);
