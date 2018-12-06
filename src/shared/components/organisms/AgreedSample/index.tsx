
import { connect } from "react-redux";
import { asyncLoader } from "redux-async-loader";
import { compose } from "recompose";
import { sendAnalytics } from "react-redux-analytics";
import { getText } from "../../../redux/modules/agreedSample";
import {
  siteSections,
  onAsyncLoaderLoaded,
} from "../../../redux/analytics/utils";
import AgreedSample from "./AgreedSample";

const enhancer = compose(
  asyncLoader(({ location }, { dispatch }) => {
    const { query: locationQuery } = location;
    if (!locationQuery) {
      return dispatch(getText());
    }
    const { status } = locationQuery;
    return dispatch(getText(status));
  }),
  connect((state: any) => ({
    text: state.app.agreedSample.text,
  })),
  sendAnalytics({
    ...siteSections("agreedsample", "top"),
    onDataReady: onAsyncLoaderLoaded,
  }),
);

export default enhancer(AgreedSample);
