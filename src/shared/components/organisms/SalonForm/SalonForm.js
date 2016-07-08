import React, { Component, PropTypes } from 'react';
import { propTypes as formPropTypes } from 'redux-form';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import SalonLists from '../../molecules/SalonLists';
import SalonMore from '../../atoms/SalonMore';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';
import { forceScroll } from '../../utils/scrollComponents';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    ...formPropTypes,
    page: PropTypes.number,
    count: PropTypes.number.isRequired,
    items: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    onInnerWindow: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    onClickPrev: PropTypes.func.isRequired,
    canGetNext: PropTypes.bool.isRequired,
    canGetPrev: PropTypes.bool.isRequired,
    shouldAdjustScroll: PropTypes.bool.isRequired,
  }),
  forceScroll,
)(class SalonForm extends Component {
  render() {
    const {
      fields: { keyword },
      handleSubmit,
      count,
      page,
      items,
      item,
      onClickNext,
      onClickPrev,
      onInnerWindow,
      canGetNext,
      canGetPrev,
      shouldAdjustScroll,
    }  = this.props;

    return (
      <div className={local('root')}>
        <form onSubmit={handleSubmit} method="GET">
          <div>
            <label>Free Keyword</label>
            <div>
              <input type="text" {...keyword} />
              <button type="submit">
                Search
              </button>
            </div>
          </div>
        </form>
        <div>
          {canGetPrev ? <SalonMore onShow={onClickPrev(page - 1)}>戻る</SalonMore> : null}
          <div>
            <span>{count || 0}</span><span>件あります</span>
          </div>
          <SalonLists items={items} page={page} onInnerWindow={onInnerWindow}
                      shouldAdjustScroll={shouldAdjustScroll} item={item} />
          {canGetNext ? <SalonMore onShow={onClickNext(page + 1)}>進む</SalonMore> : null}
        </div>
      </div>
    );
  }
});
