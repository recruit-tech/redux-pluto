import React from 'react';
import PropTypes from 'prop-types';
import { propTypes as formPropTypes, Field } from 'redux-form';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from 'shared/components/utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);
const labels = {
  username: 'Username',
  password: 'Password',
};

const RenderInput = ({ input, meta: { dirty, error } }) => (
  <div key={input.name} className={local('row')}>
    <label htmlFor={input.name} className={local('label')}>
      {labels[input.name]}
    </label>
    <input
      {...input}
      type={input.name === 'username' ? 'text' : 'password'}
      className={local('input')}
      tabIndex={input.name === 'username' ? 1 : 2}
    />
    <span className={local('message')}>
      {dirty && error}
    </span>
  </div>
);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    invalid: PropTypes.bool.isRequired,
    globalFormDisabled: PropTypes.bool,
    ...formPropTypes,
  }),
)(function LoginForm(props) {
  const {
    globalFormDisabled,
    error,
    handleSubmit,
    reset,
    submitting,
    pristine,
    submitFailed,
    anyTouched,
  } = props;
  const hasError = props.invalid && !pristine;

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      {!error && submitFailed && anyTouched && <div>ログインできませんでした</div>}
      <div>
        <Field name="username" component={RenderInput} />
        <Field name="password" component={RenderInput} />
      </div>
      <div>
        <button type="submit" disabled={globalFormDisabled || submitting || hasError}>
          Login
        </button>
        <button type="button" disabled={globalFormDisabled || submitting} onClick={reset}>
          Clear
        </button>
      </div>
    </form>
  );
});
