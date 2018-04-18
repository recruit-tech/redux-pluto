/* @flow */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { propTypes as formPropTypes, Field } from "redux-form";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import skipSSR from "../../utils/skipSSR";

const labels = {
  username: "Username",
  password: "Password"
};

const RenderInput = ({ input, meta: { dirty, error } }): $FIXME => (
  <Row key={input.name}>
    <Label htmlFor={input.name}>
      {labels[input.name]}
      <Input {...input}
             id={input.name}
             type={input.name === "username" ? "text" : "password"}
             tabIndex={0} />
    </Label>
    <Message>{dirty && error}</Message>
  </Row>
);

const Alternative = styled.div`
  height: 63px;
`;

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    globalFormDisabled: PropTypes.bool,
    ...formPropTypes
  }),
  skipSSR(<Alternative />)
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
      {!error && submitFailed && anyTouched && <div>ログインできませんでした</div>}
      <div>
        <Field name="username" component={RenderInput} />
        <Field name="password" component={RenderInput} />
      </div>
      <div>
        <button type="submit" disabled={globalFormDisabled || submitting}>
          Login
        </button>
        <button type="button" disabled={globalFormDisabled || submitting} onClick={reset}>
          Clear
        </button>
      </div>
    </form>
  );
});

const Row = styled.div`
  display: flex;
}
`;

const Label = styled.label`
  flex: 1;
  text-align: right;
`;

const Input = styled.input`
  width: 300px;
`;

const Message = styled.div`
  flex: 1;
  text-align: left;
`;
