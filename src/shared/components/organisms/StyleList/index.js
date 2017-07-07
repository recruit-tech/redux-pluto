import { connect } from 'react-redux';
import { compose, shouldUpdate } from 'recompose';
import { asyncLoader } from 'redux-async-loader';
import { styleSelector } from 'shared/redux/modules/reducer';
import { searchStyle } from 'shared/redux/modules/style';
import StyleList from './StyleList';

export default compose(
  asyncLoader(
    ({ params }, { dispatch, getState }) => (
      getState().page.style.loaded || dispatch(searchStyle(params))
    )
  ),
  connect((state) => ({
    style: styleSelector(state),
  })),
  shouldUpdate((props, nextProps) => nextProps.style.loaded),
)(StyleList);
