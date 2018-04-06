/* @flow */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import SalonList from "shared/components/molecules/SalonList";

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    page: PropTypes.number.isRequired,
    items: PropTypes.object.isRequired,
    onInnerWindow: PropTypes.func.isRequired,
    shouldAdjustScroll: PropTypes.bool.isRequired,
    forceScrollTo: PropTypes.object.isRequired,
    linkURL: PropTypes.string.isRequired
  })
)(function SalonLists(props) {
  const { items, onInnerWindow, shouldAdjustScroll, forceScrollTo, linkURL } = props;

  return (
    <Root>
      {Object.keys(items).map(page => (
        <SalonList
          items={items[page]}
          linkURL={linkURL}
          page={+page}
          onInnerWindow={onInnerWindow}
          heightRatio={1.0}
          key={page}
          shouldAdjustScroll={+page === props.page && shouldAdjustScroll}
          forceScrollTo={forceScrollTo}
        />
      ))}
    </Root>
  );
});

export const Root = styled.div`
  text-align: center;
  margin: 0 auto;
`;
