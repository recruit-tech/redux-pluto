import { reduxForm, isInvalid } from "redux-form";
import { connect } from "react-redux";
import { compose } from "recompose";
import { sendAnalytics } from "react-redux-analytics";
import { login } from "../../../redux/modules/auth";
import normalizeFormError from "../../utils/normalizeFormError";
import validate from "../../../validators/login";
import {
  siteSections,
  onAsyncLoaderLoaded,
} from "../../../redux/analytics/utils";
import LoginForm from "./LoginForm";
import { RootState } from "../../../../shared/redux/modules/reducer";

export default compose<{ invalid: boolean; csrf: string }, {}>(
  connect((state: RootState) => ({
    invalid: isInvalid("loginForm")(state),
    csrf: state.app.csrf.token,
  })),
  sendAnalytics({
    ...siteSections("login", "top"),
    onDataReady: onAsyncLoaderLoaded,
  }),
  reduxForm({
    form: "loginForm",
    validate,
    onSubmit({ username, password }, dispatch, ownProps) {
      return dispatch(
        login(username, password, ownProps.location.query.location || "/"),
      ).catch(normalizeFormError);
    },
  }),
)(LoginForm);
