import { MiddlewareAPI } from "redux";
import { connect } from "react-redux";
import { compose } from "recompose";
import { asyncLoader } from "redux-async-loader";
import { sendAnalytics } from "react-redux-analytics";
import {
  searchSelector,
} from "../../../redux/modules/reducer";
import {
  findSalonById,
} from "../../../redux/modules/search";
import {
  siteSections,
  onAsyncLoaderLoaded,
} from "../../../redux/analytics/utils";
import { SALON_ID } from "../../../redux/analytics/variableNames";
import Search from "./Search";
import { State as SearchState } from "../../../redux/modules/search";

type Props = {
  params: {
    searchId: string,
  },
};

const enhancer = compose<SearchState, {}>(
  asyncLoader(
    (
      { params }: Props,
      { dispatch, getState }: MiddlewareAPI<any, any>,
    ) =>
      getState().page.search.loaded || (dispatch as any)(findSalonById(params.searchId)),
  ),
  connect(searchSelector),
  sendAnalytics({
    ...siteSections("search", "detail"),
    onDataReady: onAsyncLoaderLoaded,
    mapPropsToVariables: (props, state) => ({
      [SALON_ID]: props.params && props.params.searchId,
    }),
  }),
);

export default enhancer(Search);
