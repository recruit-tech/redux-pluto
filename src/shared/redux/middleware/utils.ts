import { MiddlewareAPI } from "redux";

export function handleActions(handlers: { [key: string]: Function }) {
  return (store: MiddlewareAPI) => (next: Function) => (action: any) => {
    const handler = handlers[action.type];
    return handler ? handler(store, next, action) : next(action);
  };
}
