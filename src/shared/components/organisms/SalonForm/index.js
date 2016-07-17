import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import { asyncLoader, deferLoader } from '../../../packages/redux-async-loader';
import { searchSalon, searchMoreSalon, clearSearchSalon } from '../../../redux/modules/salon';
import SalonForm from './SalonForm';
import { replace, push } from 'react-router-redux';
import { parse } from 'querystring';

export default compose(
  asyncLoader(({ location }, { dispatch, getState }) => {
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
  reduxForm({
      form: 'salon',
      fields: ['keyword'],
    },
    (state) => ({
      page: state.salon.page,
      pages: state.salon.pages,
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

      onClickPrev: () => {
        const keyword = ownProps.location.query.keyword;
        const page = parseInt(ownProps.location.query.page) || 0;
        return dispatch(replace(`/salon?keyword=${keyword}&page=${page - 1}&more=true`));
      },

      onClickNext: () => {
        const keyword = ownProps.location.query.keyword;
        const page = parseInt(ownProps.location.query.page) || 0;
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

      onClickItem: (page) => () => {
        const keyword = ownProps.location.query.keyword;
        return dispatch(replace(`/salon?keyword=${keyword}&page=${page}&more=true`));
      },
    }),
  ),
)(SalonForm);
