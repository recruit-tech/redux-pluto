export const BEGIN_ASYNC_LOAD = 'redux-async-loader/load/begin';
export const END_ASYNC_LOAD = 'redux-async-loader/load/end';

export function beginAsyncLoad(onServer = false) {
  return {
    type: BEGIN_ASYNC_LOAD,
    payload: {
      onServer,
    },
  };
}

export function endAsyncLoad(onServer = false) {
  return {
    type: END_ASYNC_LOAD,
    payload: {
      onServer,
    },
  };
}
