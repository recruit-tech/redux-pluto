/* @flow */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    style: PropTypes.shape({
      count: PropTypes.number.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          photo: PropTypes.shape({
            front: PropTypes.shape({
              m: PropTypes.string.isRequired
            }).isRequired
          }).isRequired
        })
      ).isRequired
    }).isRequired
  })
)(function StyleList(props) {
  const { style: { count, items } } = props;

  return (
    <div>
      <div>
        <span>{count || 0}</span>
        <span>件あります</span>
      </div>
      <div>
        {items.map(item => (
          <Item key={item.id}>
            <Img src={item.photo.front.m} alt={item.name} />
          </Item>
        ))}
      </div>
    </div>
  );
});

const Item = styled.div`
  display: inline-block;
`;

const Img = styled.img`
  display: block;
  height: 219px;
  width: 164px;
`;
