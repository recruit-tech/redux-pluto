/* @flow */
import { bindActionCreators as bind } from "redux";

export default function bindActionCreators<T>(
  actionCreators: T,
): (f: Function) => T {
  return (dispatch: Function) => (bind as any)(actionCreators, dispatch);
}
