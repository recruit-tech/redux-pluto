import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { Link } from 'react-router';
import styles from './styles.scss';
import { createLocal } from '../../../utils/localnames';

const { localNames: local } = createLocal(styles);

const PAGE_WINDOW = 20;

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    page: PropTypes.number.isRequired,
    pages: PropTypes.array.isRequired,
    keyword: PropTypes.string.isRequired,
  }),
)(class SalonPager extends Component {
  render() {
    const { keyword, page, pages } = this.props;
    const slicedPages = slicePages(page, pages);

    return (
      <div>
        {slicedPages.map((p) => {
          if (page === p) {
            return <span className={local('current')} key={p}>{p}</span>;
          }

          return <Link className={local('link')} key={p} to={`/salon/?keyword=${keyword}&page=${p}`}>{p}</Link>;
        })}
      </div>
    );
  }
});

function slicePages(page, pages) {
  const result = [];

  if (page < PAGE_WINDOW / 2) {
    return pages.slice(0, PAGE_WINDOW);
  }

  return pages.slice(page - PAGE_WINDOW / 2, page + PAGE_WINDOW / 2);
}
