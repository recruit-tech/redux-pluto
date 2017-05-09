import { connect } from 'react-redux';
import { compose } from 'recompose';
import { asyncLoader } from 'redux-async-loader';
import { searchStyle } from 'shared/redux/modules/style';
import StyleList from './StyleList';

export default compose(
  asyncLoader(
    ({ params }, { dispatch, getState }) => (
      getState().page.style.loaded || dispatch(searchStyle(params))
    )
  ),
  connect(
    (state) => ({
      count: state.page.style.count,
      items: state.page.style.items,
    })
  ),
)(StyleList);
