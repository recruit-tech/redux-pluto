import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';

export default compose(
  onlyUpdateForPropTypes,
)(class LoginForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
  };

  render() {
    const { fields: { username, password }, error, handleSubmit, resetForm, submitting, params, } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <div>
          <label>Username</label>
          <input type="text" {...username} />
          {username.touched && username.error && <span>{username.error}</span>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...password} />
          {password.touched && password.error && <span>{password.error}</span>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
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
