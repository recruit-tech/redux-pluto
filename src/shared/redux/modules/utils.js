import some from 'lodash/fp/some';

export function initialState(init) {
  return (reducer) => (state = init, action) => reducer(state, action);
}

export function filterActionType(...names) {
  return (reducer) => (state, action) => {
    const { type } = action;
    return some((name) => type.indexOf(name) === 0)(names) ? reducer(state, action) : state;
  };
}
