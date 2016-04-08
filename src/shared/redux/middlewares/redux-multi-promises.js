export default function multiPromises({ dispatch }) {
  return (next) => (actions) =>
    Array.isArray(actions) ? Promise.all(actions.filter(Boolean).map(dispatch)) : next(actions);
}
