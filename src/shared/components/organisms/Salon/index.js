import { connect } from 'react-redux';
import { compose } from 'recompose';
import { asyncLoader } from 'redux-async-loader';
import { salonSelector } from 'shared/redux/modules/reducer';
import { findSalonById } from 'shared/redux/modules/salon';
import Salon from './Salon';

export default compose(
  asyncLoader(
    ({ params }, { dispatch, getState }) => (
      getState().page.salon.loaded || dispatch(findSalonById(params.salonId))
    )
  ),
  connect(salonSelector),
)(Salon);
