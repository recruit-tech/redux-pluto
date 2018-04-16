import React from "react";
import PropTypes from "prop-types";
import { propTypes as formPropTypes, Field } from "redux-form";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import { createLocal } from "shared/components/utils/localnames";
import skipSSR from "../../utils/skipSSR";
import styles from "./styles.scss";

const { localNames: local } = createLocal(styles);
const labels = {
  username: "Username",
  password: "Password"
};

const RenderInput = ({ input, meta: { dirty, error } }) => (
  <div key={input.name} className={local("row")}>
    <label htmlFor={input.name} className={local("label")}>
      {labels[input.name]}
      <input
        {...input}
        id={input.name}
        type={input.name === "username" ? "text" : "password"}
        className={local("input")}
        tabIndex={0}
      />
    </label>
    <span className={local("message")}>{dirty && error}</span>
  </div>
);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    globalFormDisabled: PropTypes.bool,
    ...formPropTypes
  }),
  skipSSR(<div className={local("alternative")} />)
)(function LoginForm(props) {
  const {
    globalFormDisabled,
    error,
    handleSubmit,
    reset,
    submitting,
    submitFailed,
    anyTouched
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      {!error &&
        submitFailed &&
        anyTouched && <div>ログインできませんでした</div>}
      <div>
        <Field name="username" component={RenderInput} />
        <Field name="password" component={RenderInput} />
      </div>
      <div>
        <button type="submit" disabled={globalFormDisabled || submitting}>
          Login
        </button>
        <button
          type="button"
          disabled={globalFormDisabled || submitting}
          onClick={reset}
        >
          Clear
        </button>
      </div>
    </form>
  );
});
