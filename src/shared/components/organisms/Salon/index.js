/* @flow */
import { type MiddlewareAPI } from "redux";
import { connect } from "react-redux";
import { compose, type HOC } from "recompose";
import { asyncLoader } from "redux-async-loader";
import { sendAnalytics } from "react-redux-analytics";
import { salonSelector, type State as RootState } from "shared/redux/modules/reducer";
import { findSalonById, type State as SalonState } from "shared/redux/modules/salon";
import { siteSections, onAsyncLoaderLoaded } from "shared/redux/analytics/utils";
import { SALON_ID } from "shared/redux/analytics/variableNames";
import Salon from "./Salon";

type Props = {
  params: {
    salonId: string
  }
};

const enhancer: HOC<SalonState, Props> = compose(
  asyncLoader(
    ({ params }: Props, { dispatch, getState }: MiddlewareAPI<RootState, *>) =>
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
);

export default enhancer(Salon);
