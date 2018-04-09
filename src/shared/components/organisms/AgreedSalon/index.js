/* @flow */
import { type MiddlewareAPI } from "redux";
import { connect } from "react-redux";
import { compose, type HOC } from "recompose";
import { asyncLoader } from "redux-async-loader";
import { sendAnalytics } from "react-redux-analytics";
import { agreedSalonSelector, type State as RootState } from "shared/redux/modules/reducer";
import { findSalonById, type State as AgreedSalonState } from "shared/redux/modules/agreedSalon";
import { siteSections, onAsyncLoaderLoaded } from "shared/redux/analytics/utils";
import { SALON_ID } from "shared/redux/analytics/variableNames";
import Salon from "../Salon/Salon";

type Props = {
  params: {
    salonId: string
  }
};

const enhancer: HOC<AgreedSalonState, Props> = compose(
  asyncLoader(
    ({ params }: Props, { dispatch, getState }: MiddlewareAPI<RootState, *>) =>
      getState().page.salon.loaded || dispatch(findSalonById(params.salonId))
  ),
  connect(agreedSalonSelector),
  sendAnalytics({
    ...siteSections("salon", "detail"),
    onDataReady: onAsyncLoaderLoaded,
    mapPropsToVariables: (props, state) => ({
      [SALON_ID]: props.params && props.params.salonId
    })
  })
);

export default enhancer(Salon);
