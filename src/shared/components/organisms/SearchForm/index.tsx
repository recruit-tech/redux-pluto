import { parse } from "querystring";
import { compose, shouldUpdate, withState } from "recompose";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { replace, push } from "react-router-redux";
import { reduxForm } from "redux-form";
import { asyncLoader } from "redux-async-loader";
import { sendAnalytics } from "react-redux-analytics";
import {
  SearchListselector,
  routingSelector,
  globalFormDisabledSelector,
} from "../../../redux/modules/reducer";
import {
  searchSearchList,
  searchMoreSearchList,
  clearSearchSearchList,
} from "../../../redux/modules/searchList";
import {
  siteSections,
  onAsyncLoaderLoaded,
} from "../../../redux/analytics/utils";
import { SALON_KEYWORD } from "../../../redux/analytics/variableNames";
import SearchForm from "./SearchForm";
import { AnyAction, Dispatch } from "redux";

const selector = createSelector(
  SearchListselector,
  state => state.routing.locationBeforeTransitions.query.keyword,
  globalFormDisabledSelector,
  (searchList, keyword, globalFormDisabled) => ({
    ...searchList,
    shouldForceScroll: searchList.canGetPrev,
    initialValues: { keyword },
    globalFormDisabled,
  }),
);

export default compose(
  asyncLoader(({ location }, { dispatch, getState }) => {
    const state = getState();
    const { locationBeforeTransitions } = routingSelector(state);
    const { action } = locationBeforeTransitions;

    if (action === "POP" && SearchListselector(state).loaded) {
      return Promise.resolve();
    }

    const { query: locationQuery } = location;

    if (locationQuery && !locationQuery.keyword) {
      return dispatch(clearSearchSearchList());
    }

    const { more, keyword, page } = locationQuery;

    if (more) {
      return dispatch(searchMoreSearchList({ keyword, page }));
    }

    dispatch(clearSearchSearchList());
    return dispatch(searchSearchList({ keyword, page }));
  }),
  (connect as any)(
    selector,
    (dispatch: Dispatch<AnyAction>, _ownProps: any) => ({
      onClickPrev: (page: number) => () => {
        const { keyword } = parse(window.location.search.substr(1));
        return dispatch(
          replace(`/search?keyword=${keyword}&page=${page - 1}&more=true`),
        );
      },

      onClickNext: (page: number) => () => {
        const { keyword } = parse(window.location.search.substr(1));
        return dispatch(
          replace(`/search?keyword=${keyword}&page=${page + 1}&more=true`),
        );
      },

      // 今見てる window の中の要素でpageのURL位置を変える
      onInnerWindow: (element: HTMLElement) => {
        const page = element.getAttribute("data-page");
        const query = parse(window.location.search.substr(1));
        const currentPage = query.page || "0";
        const { keyword } = query;
        if (page !== currentPage) {
          return void dispatch(
            replace(`/search?keyword=${keyword}&page=${page}&more=true`),
          );
        }
      },
    }),
  ),
  withState("linkURL", "handleChangeLinkURL", "/search"),
  sendAnalytics({
    ...siteSections("search", "form"),
    onDataReady: onAsyncLoaderLoaded,
    mapPropsToVariables: ({ location = {}, count }: any, _state: any) => ({
      [SALON_KEYWORD]: location.query && location.query.keyword,
    }),
  }),
  reduxForm({
    form: "search",

    // キーワード検索開始
    onSubmit({ keyword }: { keyword: string }, dispatch: Dispatch<AnyAction>) {
      dispatch(push(`/search?keyword=${keyword}&page=0`));
    },
  }),
  shouldUpdate((props, nextProps: any) => nextProps.loaded),
)(SearchForm) as any;
