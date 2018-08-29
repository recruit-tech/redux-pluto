/* @flow */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { propTypes as formPropTypes, Field } from "redux-form";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import SearchMore from "../../atoms/SearchMore";
import SearchLists from "./SearchLists";
import SearchPager from "./SearchPager";

type FormProps = {
  handleSubmit: Function,
  initialValues: {
    keyword: string,
  },
  submitting: boolean,
};

type Props = FormProps & {
  page: number, // optional?
  pages: Array<*>,
  count: number,
  items: Object,
  onInnerWindow: Function,
  onClickNext: Function,
  onClickPrev: Function,
  canGetNext: boolean,
  canGetPrev: boolean,
  shouldAdjustScroll: boolean,
  linkURL: string,
  forceScrollTo: ?Object,
};

export default compose(
  // for performance
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
  }),
)(function SearchForm(props: Props) {
  const {
    handleSubmit,
    initialValues,
    submitting,
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
  } = props;

  return (
    <Root>
      <form onSubmit={handleSubmit} method="GET">
        <div>
          <label htmlFor="keyword">
            Free Keyword
            <div id="keyword">
              <Field
                type="text"
                name="keyword"
                component="input"
                autoFocus={!count}
              />
              <button type="submit" disabled={submitting}>
                Search
              </button>
            </div>
          </label>
        </div>
      </form>
      <div>
        {canGetPrev ? (
          <SearchMore onShow={onClickPrev(page)}>戻る</SearchMore>
        ) : null}
        <div>
          <span>{count || 0}</span>
          <span>件あります</span>
        </div>
        <SearchLists
          page={page}
          items={items}
          linkURL={linkURL}
          onInnerWindow={onInnerWindow}
          shouldAdjustScroll={shouldAdjustScroll}
          forceScrollTo={forceScrollTo}
        />
        {canGetNext ? (
          <SearchMore onShow={onClickNext(page)}>進む</SearchMore>
        ) : null}
      </div>
      <Pager>
        <SearchPager
          pages={pages}
          page={page}
          keyword={initialValues.keyword || ""}
        />
      </Pager>
    </Root>
  );
});

const Root = styled.div``;
const Pager = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
