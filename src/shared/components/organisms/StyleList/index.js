import { connect } from 'react-redux';
import { compose, shouldUpdate } from 'recompose';
import { asyncLoader } from 'redux-async-loader';
import { sendAnalytics } from 'react-redux-analytics';
import { styleSelector } from 'shared/redux/modules/reducer';
import { searchStyle } from 'shared/redux/modules/style';
import { siteSections, onAsyncLoaderLoaded } from 'shared/redux/analytics/utils';
import {
  STYLE_GENDER,
  STYLE_HAIR_LENGTH,
  LIST_ITEM_COUNT,
} from 'shared/redux/analytics/variableNames';
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
  sendAnalytics({
    ...siteSections('style', 'list'),
    onReady: onAsyncLoaderLoaded,
    mapPropsToVariables: (props, state) => ({
      [STYLE_GENDER]: props.params && props.params.gender,
      [LIST_ITEM_COUNT]: props.style && props.style.count,
      [STYLE_HAIR_LENGTH]: props.params && props.params.hairLength,
    }),
  }),
  shouldUpdate((props, nextProps) => nextProps.style.loaded),
)(StyleList);
