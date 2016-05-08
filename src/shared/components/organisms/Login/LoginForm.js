import React, { Component, PropTypes } from 'react';
import { propTypes as formPropTypes } from 'redux-form';
import { compose, onlyUpdateForPropTypes } from 'recompose';

export default compose(
  onlyUpdateForPropTypes,
)(class LoginForm extends Component {

  static propTypes = {
    ...formPropTypes,
  };

  render() {
    const { fields: { username, password }, error, handleSubmit, resetForm, submitting } = this.props;
    const hasError = !!(error || username.error || password.error);

    return (
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <div>
          <label>Username</label>
          <input type="text" autoFocus {...username} />
          {username.touched && username.error && <span>{username.error}</span>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...password} />
          {password.touched && password.error && <span>{password.error}</span>}
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
