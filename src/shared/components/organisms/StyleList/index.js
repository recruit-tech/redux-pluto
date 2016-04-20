import { asyncConnect } from 'redux-async-connect';
import { compose } from 'recompose';
import { searchStyle } from '../../../redux/modules/style';
import StyleList from './StyleList';

export default compose(
  asyncConnect([
    { promise: ({ params, store: { dispatch } }) => dispatch(searchStyle(params)) },
  ]),
)(StyleList);
