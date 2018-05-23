/* @flow */
import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { asyncLoader } from "redux-async-loader";
import { hackerNewsSelector } from "shared/redux/modules/reducer";
import { fetchItems } from "shared/redux/modules/hackerNews";
import HackerNews from "./HackerNews";

export default compose(
  asyncLoader((props, { dispatch }) => dispatch(fetchItems())),
  connect(state => ({
    hackerNews: hackerNewsSelector(state),
  })),
)(props => <HackerNews {...props.hackerNews} />);
