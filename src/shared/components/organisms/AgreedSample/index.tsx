import { compose } from "redux";
import { connect } from "react-redux";
import { asyncLoader } from "redux-async-loader";
import { getText } from "../../../redux/modules/agreedSample";
import AgreedSample from "./AgreedSample";
import { RouterState } from "react-router";
import { RootState } from "../../../redux/modules/reducer";

const enhancer = compose(
  asyncLoader<RouterState>(({ location }, { dispatch }) => {
    const { query: locationQuery } = location;
    if (!locationQuery) {
      return dispatch(getText());
    }
    const { status } = locationQuery;
    return dispatch(getText(status));
  }),
  connect<{ text: string }, {}, {}, RootState>(state => ({
    text: state.app.agreedSample.text,
  })),
);

export default enhancer(AgreedSample);
