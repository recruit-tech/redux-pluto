import { compose } from "redux";
import { connect } from "react-redux";
import { asyncLoader } from "redux-async-loader";
import { RouterState } from "react-router";
import { getText } from "../../../redux/modules/agreedSample";
import AgreedSample from "./AgreedSample";
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
  connect<{ text: string }, {}, { route: { title: string } }, RootState>(
    (state, ownProps) => ({
      text: state.app.agreedSample.text,
      title: ownProps.route.title,
    }),
  ),
);

export default enhancer(AgreedSample);
