import DocumentTitle from "react-document-title";
import React from "react";
import styled from "styled-components";
import { propTypes as formPropTypes, Field } from "redux-form";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";

const labels = {
  username: "Username",
  password: "Password",
};

const RenderInput = ({
  input,
  meta: { dirty, error },
}: {
  input: { name: "username" | "password" };
  meta: {
    dirty: boolean;
    error: any;
  };
}): any => (
  <Row key={input.name}>
    <Label htmlFor={input.name}>
      {labels[input.name]}
      <Input
        {...input}
        id={input.name}
        type={input.name === "username" ? "text" : "password"}
        tabIndex={0}
      />
    </Label>
    <Message>{dirty && error}</Message>
  </Row>
);

// prettier-ignore
export default compose<
  {
    error: boolean;
    handleSubmit: any;
    reset: any;
    submitting: any;
    submitFailed: any;
    anyTouched: any;
    csrf: string;
    title: string;
  },
  { invalid: boolean; csrf: string }
>(
  onlyUpdateForPropTypes,
  setPropTypes({
    ...formPropTypes,
  }),
)(function LoginForm(props) {
  const {
    error,
    handleSubmit,
    reset,
    submitting,
    submitFailed,
    anyTouched,
    csrf,
    title,
  } = props;

  return (
    <DocumentTitle title={title}>
    <form onSubmit={handleSubmit} method="POST">
      {error && <div>{error}</div>}
      {!error && submitFailed && anyTouched && (
        <div>ログインできませんでした</div>
      )}
      <div>
        <Field name="username" component={RenderInput as any} />
        <Field name="password" component={RenderInput as any} />
      </div>
      <input type="hidden" name="_csrf" value={csrf} />
      <div>
        <button type="submit" disabled={submitting}>
          Login
        </button>
        <button type="button" disabled={submitting} onClick={reset}>
          Clear
        </button>
      </div>
    </form>
    </DocumentTitle>
  );
});

const Row = styled.div`
  display: flex;
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
