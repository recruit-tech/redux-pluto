import { connect } from 'react-redux';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import { reduxForm } from 'redux-form';
import { deferLoader } from '../../../packages/redux-async-loader';
import { searchSalon, clearSearchSalon } from '../../../redux/modules/salon';
import SalonForm from './SalonForm';
import { push } from 'react-router-redux';
import { parse } from 'querystring';

const queryFields = ['keyword'];

export default compose(
  deferLoader(({ location }, { dispatch }) => {
    return queryFields.some((q) => location.query[q]) ? dispatch(searchSalon(location.query)) : dispatch(clearSearchSalon());
  }),
  onlyUpdateForPropTypes,
  reduxForm({
      form: 'salon',
      fields: ['keyword'],
    },
    state => ({ initialValues: { keyword: state.routing.locationBeforeTransitions.query.keyword } }),
    (dispatch, ownProps) => ({
      onSubmit: ({ keyword }) => {
        return dispatch(push(`/salon?keyword=${keyword}`));
      }
    }),
  ),
)(SalonForm);
