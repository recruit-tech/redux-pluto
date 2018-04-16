/* @flow */
import { connect } from "react-redux";
import { compose } from "recompose";
import { sendAnalytics } from "react-redux-analytics";
import { siteSections, onAsyncLoaderLoaded } from "shared/redux/analytics/utils";
import Style from "./Style";

export default compose(
  connect(state => ({
    genderItems: state.app.masters.genderMaster.items,
    hairLengthItems: state.app.masters.hairLengthMaster.items
  })),
  sendAnalytics({
    ...siteSections("style", "top"),
    onDataReady: onAsyncLoaderLoaded
  })
)(Style);
