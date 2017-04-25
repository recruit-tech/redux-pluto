import { reduxForm, isInvalid } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { login } from '../../../redux/modules/auth';
import normalizeFormError from '../../utils/normalizeFormError';
import validate from '../../../validators/login';
import LoginForm from './LoginForm';

export default compose(
  reduxForm({
    form: 'loginForm',
    validate,
    onSubmit({ username, password }, dispatch, ownProps) {
      return dispatch(login(username, password, ownProps.location.query.location || '/'))
      .catch(normalizeFormError);
    },
  }),
  connect(
    (state) => ({
      invalid: isInvalid('loginForm')(state),
    })
  )
)(LoginForm);
