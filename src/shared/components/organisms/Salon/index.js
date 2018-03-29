import { connect } from "react-redux";
import { compose } from "recompose";
import { asyncLoader } from "redux-async-loader";
import { sendAnalytics } from "react-redux-analytics";
import { salonSelector } from "shared/redux/modules/reducer";
import { findSalonById } from "shared/redux/modules/salon";
import {
  siteSections,
  onAsyncLoaderLoaded
} from "shared/redux/analytics/utils";
import { SALON_ID } from "shared/redux/analytics/variableNames";
import Salon from "./Salon";

export default compose(
  asyncLoader(
    ({ params }, { dispatch, getState }) =>
      getState().page.salon.loaded || dispatch(findSalonById(params.salonId))
  ),
  connect(salonSelector),
  sendAnalytics({
    ...siteSections("salon", "detail"),
    onDataReady: onAsyncLoaderLoaded,
    mapPropsToVariables: (props, state) => ({
      [SALON_ID]: props.params && props.params.salonId
    })
  })
)(Salon);
