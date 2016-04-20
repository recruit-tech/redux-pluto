import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { login } from '../../../redux/modules/auth';
import validate from '../../../validators/login';
import normalizeFormError from '../../utils/normalizeFormError';
import LoginForm from './LoginForm';

export default compose(
  reduxForm({
      form: 'loginForm',
      fields: ['username', 'password'],
      validate,
    },
    null,
    (dispatch, ownProps) => ({
      onSubmit: ({ username, password }) =>
        dispatch(login(username, password, ownProps.location.query.location || '/')).catch(normalizeFormError),
    }),
  ),
)(LoginForm);
