import React, { Component, PropTypes } from 'react';
import { propTypes as formPropTypes } from 'redux-form';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({ ...formPropTypes }),
)(class LoginForm extends Component {
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
