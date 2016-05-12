import { connect } from 'react-redux';
import { compose } from 'recompose';
import { asyncLoader } from '../../../packages/redux-async-loader';
import { searchStyle } from '../../../redux/modules/style';
import StyleList from './StyleList';

export default compose(
  asyncLoader(({ params, store: { dispatch } }) => dispatch(searchStyle(params))),
  connect(
    (state) => ({
      count: state.style.count,
      items: state.style.items,
    })
  ),
)(StyleList);
