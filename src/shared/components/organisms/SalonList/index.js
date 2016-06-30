import { connect } from 'react-redux';
import { compose } from 'recompose';
import SalonList from './SalonList';

export default compose(
  connect(
    (state) => ({
      count: state.salon.count,
      items: state.salon.items,
    })
  ),
)(SalonList);
