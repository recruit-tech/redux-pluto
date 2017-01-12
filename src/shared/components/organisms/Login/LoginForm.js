import React, { Component, PropTypes } from 'react';
import { propTypes as formPropTypes, Field } from 'redux-form';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    invalid: PropTypes.bool.isRequired,
    ...formPropTypes,
  }),
)(class LoginForm extends Component {
  render(props = this.props) {
    const { error, handleSubmit, reset, submitting, pristine } = props;
    const hasError = props.invalid && !pristine;
    return (
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <div>
          <label>
            Username
          </label>
          <Field
            name="username"
            component={({ input, meta:{ dirty, error } })=>
              <span>
                <input
                  {...input}
                  type="text"
                  className={ local('input') }
                />
                <span className={local('message')}>
                  {dirty && error}
                </span>
              </span>
            }
          />
        </div>
        <div>
          <label>
            Password
          </label>
          <Field
            name="password"
            component={({ input, meta:{ dirty, error } })=>
              <span>
                <input
                  {...input}
                  type="password"
                  className={ local('input') }
                />
                <span className={local('message')}>
                  {dirty && error}
                </span>
              </span>
            }
          />
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
