import { reduxForm, isInvalid } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { sendAnalytics } from 'react-redux-analytics';
import { globalFormDisabledSelector } from 'shared/redux/modules/reducer';
import { login } from 'shared/redux/modules/auth';
import normalizeFormError from 'shared/components/utils/normalizeFormError';
import validate from 'shared/validators/login';
import { siteSections, onAsyncLoaderLoaded } from 'shared/redux/analytics/utils';
import LoginForm from './LoginForm';

export default compose(
  connect(
    (state) => ({
      invalid: isInvalid('loginForm')(state),
      globalFormDisabled: globalFormDisabledSelector(state),
    })
  ),
  sendAnalytics({
    ...siteSections('login', 'top'),
    onReady: onAsyncLoaderLoaded,
  }),
  reduxForm({
    form: 'loginForm',
    validate,
    onSubmit({ username, password }, dispatch, ownProps) {
      return dispatch(login(username, password, ownProps.location.query.location || '/'))
      .catch(normalizeFormError);
    },
  }),
)(LoginForm);
