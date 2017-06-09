import reduxForm from 'redux-form/lib/reduxForm';
import isInvalid from 'redux-form/lib/isInvalid';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { login } from 'shared/redux/modules/auth';
import normalizeFormError from 'shared/components/utils/normalizeFormError';
import validate from 'shared/validators/login';
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
