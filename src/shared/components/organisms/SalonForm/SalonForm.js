import React from 'react';
import PropTypes from 'prop-types';
import { propTypes as formPropTypes, Field } from 'redux-form';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import SalonMore from 'shared/components/atoms/SalonMore';
import { createLocal } from 'shared/components/utils/localnames';
import SalonLists from './SalonLists';
import SalonPager from './SalonPager';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    ...formPropTypes,
    page: PropTypes.number,
    pages: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    items: PropTypes.object.isRequired,
    onInnerWindow: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    onClickPrev: PropTypes.func.isRequired,
    canGetNext: PropTypes.bool.isRequired,
    canGetPrev: PropTypes.bool.isRequired,
    shouldAdjustScroll: PropTypes.bool.isRequired,
    linkURL: PropTypes.string.isRequired,
    forceScrollTo: PropTypes.object,
    globalFormDisabled: PropTypes.bool,
  }),
)(function SalonForm(props) {
  const {
    handleSubmit,
    count,
    page,
    pages,
    items,
    onClickNext,
    onClickPrev,
    onInnerWindow,
    canGetNext,
    canGetPrev,
    shouldAdjustScroll,
    linkURL,
    forceScrollTo,
    initialValues,
    submitting,
    globalFormDisabled,
  } = props;

  return (
    <div className={local('root')}>
      <form onSubmit={handleSubmit} method="GET">
        <div>
          <label htmlFor="keyword">Free Keyword</label>
          <div>
            <Field
              type="text"
              name="keyword"
              component="input"
              autoFocus={!count}
            />
            <button type="submit" disabled={globalFormDisabled || submitting}>
              Search
            </button>
          </div>
        </div>
      </form>
      <div>
        {canGetPrev ? <SalonMore onShow={onClickPrev(page)}>戻る</SalonMore> : null}
        <div>
          <span>{count || 0}</span><span>件あります</span>
        </div>
        <SalonLists
          page={page}
          items={items}
          linkURL={linkURL}
          onInnerWindow={onInnerWindow}
          shouldAdjustScroll={shouldAdjustScroll}
          forceScrollTo={forceScrollTo}
        />
        {canGetNext ? <SalonMore onShow={onClickNext(page)}>進む</SalonMore> : null}
      </div>
      <div className={local('pager')}>
        <SalonPager pages={pages} page={page} keyword={initialValues.keyword || ''} />
      </div>
    </div>
  );
});
