/* @flow */
import { bindActionCreators as bind } from "redux";

export default function bindActionCreators<T>(actionCreators: T): Function => T {
  return dispatch => (bind: any)(actionCreators, dispatch);
}
