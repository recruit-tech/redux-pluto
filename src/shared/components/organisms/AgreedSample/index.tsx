import { connect } from "react-redux";
import { asyncLoader } from "redux-async-loader";
import { compose } from "recompose";
import { getText } from "../../../redux/modules/agreedSample";
import AgreedSample from "./AgreedSample";

const enhancer = compose<{ text: string }, {}>(
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
);

export default enhancer(AgreedSample);
