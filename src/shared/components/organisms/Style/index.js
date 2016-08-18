import { connect } from 'react-redux';
import { compose } from 'recompose';
import Style from './Style';

export default compose(
  connect(
    (state) => ({
      genderItems: state.app.masters.genderMaster.items,
      hairLengthItems: state.app.masters.hairLengthMaster.items,
    })
  ),
)(Style);
