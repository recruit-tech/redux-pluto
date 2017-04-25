import { connect } from 'react-redux';
import { compose } from 'recompose';
import { asyncLoader } from 'redux-async-loader';
import { findSalonById } from '../../../redux/modules/salon';
import Salon from './Salon';

export default compose(
  asyncLoader(
    ({ params }, { dispatch, getState }) => (
      getState().page.salon.loaded || dispatch(findSalonById(params.salonId))
    )
  ),
  connect(
    (state) => ({ item: state.page.salon.item })
  ),
)(Salon);
