
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "recompose";
import { range } from "lodash/fp";
import { sendAnalytics } from "react-redux-analytics";
import {
  siteSections,
  onAsyncLoaderLoaded,
} from "../../../redux/analytics/utils";
import LargeForm from "./LargeForm";

export default compose(
  connect((state, props: any) => ({
    initialValues: {
      items: range(0, props.location.query.length || 1000).map(v => ({
        message: `aaa${v}`,
      })),
    },
  })),
  sendAnalytics({
    ...siteSections("largeForm", "top"),
    onDataReady: onAsyncLoaderLoaded,
  }),
  reduxForm({
    form: "largeForm",
  }),
)(LargeForm);
