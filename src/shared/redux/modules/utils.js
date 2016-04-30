export function initialState(init) {
  return (reducer) => (state = init, action) => reducer(state, action);
}

export function filterActionType(...names) {
  const includesType = ({ type }) => names.some((name) => type.indexOf(name) === 0);

  return (reducer) => (state, action) => includesType(action) ? reducer(state, action) : state;
}
