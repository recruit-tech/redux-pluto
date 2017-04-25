import transform from 'lodash/fp/transform';
import { createAction, handleActions } from 'redux-actions';
import { compose } from 'recompose';
import { steps } from 'redux-effects-steps';
import { fetchrRead } from 'redux-effects-fetchr';
import { initialState, filterActionType } from './utils';

/**
 * Action types
 */
const LOAD_MASTER = 'redux-proto/masters/load/';
export const LOAD_MASTER_REQUEST = LOAD_MASTER + 'request';
export const LOAD_MASTER_SUCCESS = LOAD_MASTER + 'success';
export const LOAD_MASTER_FAIL = LOAD_MASTER + 'fail';

/**
 * Action creators
 */
const loadMasterRequest = createAction(LOAD_MASTER_REQUEST,
  (resource) => ({ resource }));

const loadMasterSuccess = createAction(LOAD_MASTER_SUCCESS,
  (resource, items) => ({ resource, items }));

const loadMasterFail = createAction(LOAD_MASTER_FAIL,
  (resource, error) => ({ resource, error }));

function loadMaster(resource) {
  return steps(
    loadMasterRequest(resource),
    fetchrRead(resource),
    [
      (payload) => loadMasterSuccess(resource, payload.data),
      (error) => loadMasterFail(resource, error),
    ],
  );
}

export function loadAreaMaster() {
  return loadMaster('areaMaster');
}

export function loadGenderMaster() {
  return loadMaster('genderMaster');
}

export function loadHairColorMaster() {
  return loadMaster('hairColorMaster');
}

export function loadHairLengthMaster() {
  return loadMaster('hairLengthMaster');
}

export function loadMenuContentMaster() {
  return loadMaster('menuContentMaster');
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
  'areaMaster',
  'genderMaster',
  'hairColorMaster',
  'hairLengthMaster',
  'menuContentMaster',
];

export const INITIAL_STATE = transform((state, resource) => {
  state[resource] = {
    loading: false,
    loaded: false,
    items: null,
  };
})({})(RESOURCES);

/**
 * Reducer
 */
export default compose(
  initialState(INITIAL_STATE),
  filterActionType(LOAD_MASTER),
)(handleActions({
  [LOAD_MASTER_REQUEST]: (state, action) => {
    const { payload: { resource } } = action;

    return {
      ...state,
      [resource]: {
        loading: true,
        loaded: false,
        items: [],
      },
    };
  },

  [LOAD_MASTER_SUCCESS]: (state, action) => {
    const { payload: { resource, items } } = action;

    return {
      ...state,
      [resource]: {
        loading: false,
        loaded: true,
        items,
      },
    };
  },

  [LOAD_MASTER_FAIL]: (state, action) => {
    const { payload: { resource }, error } = action;

    return {
      ...state,
      [resource]: {
        loading: false,
        loaded: false,
        items: [],
        error,
      },
    };
  },
}));
