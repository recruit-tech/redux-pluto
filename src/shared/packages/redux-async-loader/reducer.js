import { BEGIN_ASYNC_LOAD, END_ASYNC_LOAD, SKIP_ASYNC_LOAD } from './actions';

const INITIAL_STATE = {
  loading: false,
  loaded: false,
  onServer: false,
};

export default function reducer(state = INITIAL_STATE, { type, payload } = {}) {
  switch (type) {
    case BEGIN_ASYNC_LOAD:
      return {
        loading: true,
        loaded: false,
        onServer: !!payload.onServer,
      };
    case END_ASYNC_LOAD:
    case SKIP_ASYNC_LOAD:
      return {
        loading: false,
        loaded: true,
        onServer: !!payload.onServer,
      };
    default:
      return state;
  }
}
