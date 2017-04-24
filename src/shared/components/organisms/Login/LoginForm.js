import React, { Component, PropTypes } from 'react';
import { propTypes as formPropTypes, Field } from 'redux-form';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

const renderInput = ({ input, meta: { dirty, error } }) => (
  <span key={input.name}>
    <input
      {...input}
      type="text"
      className={local('input')}
    />
    <span className={local('message')}>
      {dirty && error}
    </span>
  </span>
);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    invalid: PropTypes.bool.isRequired,
    ...formPropTypes,
  }),
)(class LoginForm extends Component {
  render() {
    const {
      error,
      handleSubmit,
      reset,
      submitting,
      pristine,
      submitFailed,
      anyTouched,
    } = this.props;
    const hasError = this.props.invalid && !pristine;

    return (
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        {!error && submitFailed && anyTouched && <div>ログインできませんでした</div>}
        <div>
          <label htmlFor="username">
            Username
          </label>
          <Field name="username" component={renderInput} />
        </div>
        <div>
          <label htmlFor="password">
            Password
          </label>
          <Field name="password" component={renderInput} />
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
  }
});
