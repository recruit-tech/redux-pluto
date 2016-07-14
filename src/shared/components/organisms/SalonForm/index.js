import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import { asyncLoader, deferLoader } from '../../../packages/redux-async-loader';
import { searchSalon, searchMoreSalon, clearSearchSalon } from '../../../redux/modules/salon';
import SalonForm from './SalonForm';
import { replace, push } from 'react-router-redux';
import { parse } from 'querystring';

export default compose(

  // TODO onChange で asyncLoader が呼ばれない問題を解決する必要あり
  asyncLoader(({ location }, { dispatch }) => {
    if (location.query && !location.query.keyword) {
      return dispatch(clearSearchSalon());
    }

    const keyword = location.query.keyword;
    const page = location.query.page;
    if (keyword && page) {
      return dispatch(searchMoreSalon({ keyword, page }));
    }

    return dispatch(searchSalon({ keyword }));
  }),
  reduxForm({
      form: 'salon',
      fields: ['keyword'],
    },
    (state) => ({
      page: state.salon.page,
      count: state.salon.count,
      items: state.salon.items,
      item: state.salon.item,
      canGetNext: state.salon.canGetNext,
      canGetPrev: state.salon.canGetPrev,
      shouldAdjustScroll: state.salon.shouldAdjustScroll,
      shouldForceScroll: state.salon.canGetPrev,
      forceScrollTo: state.salon.forceScrollTo,
      initialValues: { keyword: state.routing.locationBeforeTransitions.query.keyword },
    }),
    (dispatch, ownProps) => ({
      // キーワード検索開始
      onSubmit({ keyword }) {
        return dispatch(push(`/salon?keyword=${keyword}`));
      },
      onClickPrev: (page) => () => {
        const keyword = ownProps.location.query.keyword;
        return dispatch(replace(`/salon?keyword=${keyword}&page=${page}`));
      },

      onClickNext: (page) => () => {
        const keyword = ownProps.location.query.keyword;
        return dispatch(replace(`/salon?keyword=${keyword}&page=${page}`));
      },

      // 今見てる window の中の要素でpageのURL位置を変える
      onInnerWindow: (element) => {
        const page = element.getAttribute('data-page');
        const currentPage = parse(window.location.search.substr(1)).page || 0;
        const keyword = ownProps.location.query.keyword;
        if (page !== currentPage) {
          return dispatch(replace(`/salon?keyword=${keyword}&page=${page}`));
        }
      },
    }),
  ),
)(SalonForm);
