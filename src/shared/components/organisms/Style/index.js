import { connect } from 'react-redux';
import { compose } from 'recompose';
import { sendAnalytics } from 'react-redux-analytics';
import { siteSections, onAsyncLoaderLoaded } from 'shared/redux/analytics/utils';
import { STYLE_GENDER, STYLE_HAIR_LENGTH } from 'shared/redux/analytics/variableNames';
import Style from './Style';

export default compose(
  connect(
    (state) => ({
      genderItems: state.app.masters.genderMaster.items,
      hairLengthItems: state.app.masters.hairLengthMaster.items,
    })
  ),
  sendAnalytics({
    ...siteSections('style', 'top'),
    onReady: onAsyncLoaderLoaded,
    mapPropsToVariables: (props, state) => ({
      [STYLE_GENDER]: props.params && props.params.gender,
      [STYLE_HAIR_LENGTH]: props.params && props.params.hairLength,
    }),
  }),
)(Style);
