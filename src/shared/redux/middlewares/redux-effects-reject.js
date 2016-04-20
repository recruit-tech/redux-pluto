import isPromise from 'is-promise';

export default function errorPromise({ dispatch }) {
  return (next) => (action) => {
    const result = next(action); // eslint-disable-line callback-return

    if (!result || typeof result !== 'object' // not object
      || isPromise(result) // already promise
      || !result.type // not action
      || !result.error) { // not error
      return result;
    }

    return Promise.reject(result.payload);
  };
}
