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
      type="text"
      className={local('input')}
      autoFocus={input.name === 'username'}
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
    ...formPropTypes,
  }),
)(function LoginForm(props) {
  const {
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
        <button type="submit" disabled={submitting || hasError}>
          Login
        </button>
        <button type="button" disabled={submitting} onClick={reset}>
          Clear
        </button>
      </div>
    </form>
  );
});
