import React, { Component, PropTypes } from 'react';
import { go, replace } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { login } from '../../../redux/modules/auth';
import validate from '../../../validators/login';
import LoginForm from './LoginForm';

export default compose(
  reduxForm({
      form: 'loginForm',
      fields: ['username', 'password'],
      validate,
    },
    null,
    (dispatch, ownProps) => ({
      onSubmit: ({ username, password }) => {
        const { location } = ownProps.location.query;
        return dispatch(login(username, password)).then(
          () => success(dispatch, location),
          (err) => fail(dispatch, err)
        );
      },
    }),
  ),
)(LoginForm);

function success(dispatch, location) {
  dispatch(replace(location || '/'));
}

function fail(dispatch, err) {
  if (err.statusCode !== 400 || !err.body) {
    return Promise.reject({
      _error: 'エラーが発生しました。しばらく待ってから再試行してください。',
    });
  }

  return Promise.reject(err.body);
}
