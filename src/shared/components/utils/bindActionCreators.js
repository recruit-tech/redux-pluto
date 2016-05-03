import { bindActionCreators as bind } from 'redux';

export default function bindActionCreators(actionCreators) {
  return (dispatch) => bind(actionCreators, dispatch);
}
