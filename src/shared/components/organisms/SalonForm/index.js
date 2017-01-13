import { compose } from 'recompose';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { asyncLoader } from 'redux-async-loader';
import { searchSalon, searchMoreSalon, clearSearchSalon } from '../../../redux/modules/salon';
import SalonForm from './SalonForm';
import { replace, push } from 'react-router-redux';
import { parse } from 'querystring';

export default compose(
  asyncLoader(({ location }, { dispatch, getState }) => {
    const state = getState();
    if (state.routing.locationBeforeTransitions.action === 'POP' && state.page.salon.loaded) {
      return;
    }

    if (location.query && !location.query.keyword) {
      return dispatch(clearSearchSalon());
    }

    const more = location.query.more;
    const keyword = location.query.keyword;
    const page = location.query.page;

    if (more) {
      return dispatch(searchMoreSalon({ keyword, page }));
    }

    dispatch(clearSearchSalon());
    return dispatch(searchSalon({ keyword, page }));
  }),
  connect(
    (state) => ({
      page: state.page.salon.page,
      pages: state.page.salon.pages,
      count: state.page.salon.count,
      items: state.page.salon.items,
      item: state.page.salon.item,
      canGetNext: state.page.salon.canGetNext,
      canGetPrev: state.page.salon.canGetPrev,
      shouldAdjustScroll: state.page.salon.shouldAdjustScroll,
      shouldForceScroll: state.page.salon.canGetPrev,
      forceScrollTo: state.page.salon.forceScrollTo,
      initialValues: { keyword: state.routing.locationBeforeTransitions.query.keyword },
    }),
    (dispatch, ownProps) => ({

      onClickPrev: (page) => () => {
        const keyword = ownProps.location.query.keyword;
        return dispatch(replace(`/salon?keyword=${keyword}&page=${page - 1}&more=true`));
      },

      onClickNext: (page) => () => {
        const keyword = ownProps.location.query.keyword;
        return dispatch(replace(`/salon?keyword=${keyword}&page=${page + 1}&more=true`));
      },

      // 今見てる window の中の要素でpageのURL位置を変える
      onInnerWindow: (element) => {
        const page = element.getAttribute('data-page');
        const currentPage = parse(window.location.search.substr(1)).page || 0;
        const keyword = ownProps.location.query.keyword;
        if (page !== currentPage) {
          return dispatch(replace(`/salon?keyword=${keyword}&page=${page}&more=true`));
        }
      },

    }),
  ),
  reduxForm({
    form: 'salon',

    // キーワード検索開始
    onSubmit({ keyword }, dispatch) {
      dispatch(push(`/salon?keyword=${keyword}`));
    },
  }),
)(SalonForm);
