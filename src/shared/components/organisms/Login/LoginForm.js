import React, { Component, PropTypes } from 'react';
import { propTypes as formPropTypes } from 'redux-form';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({ ...formPropTypes }),
)(class LoginForm extends Component {
  render(props = this.props) {
    const { fields: { username, password }, error, handleSubmit, resetForm, submitting } = props;
    const hasError = !!(error || username.error || password.error);

    return (
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <div className={local('row')}>
          <label className={local('label')}>
            Username
          </label>
          <input {...username}
            type="text"
            autoFocus
            className={local('input')}
          />
          <span className={local('message')}>
            {username.touched && username.error && username.error}
          </span>
        </div>
        <div className={local('row')}>
          <label className={local('label')}>
            Password
          </label>
          <input {...password}
            type="password"
            className={local('input')}
          />
          <span className={local('message')}>
            {password.touched && password.error && password.error}
          </span>
        </div>
        <div>
          <button type="submit" disabled={submitting || hasError}>
            Login
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear
          </button>
        </div>
      </form>
    );
  }
});
