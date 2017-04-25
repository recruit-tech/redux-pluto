export function initialState(init) {
  return (reducer) => (state = init, action) => reducer(state, action);
}

export function filterActionType(...names) {
  const includesType = ({ type }) => names.some((name) => type.startsWith(name));

  return (reducer) => (state, action) => (includesType(action) ? reducer(state, action) : state);
}
