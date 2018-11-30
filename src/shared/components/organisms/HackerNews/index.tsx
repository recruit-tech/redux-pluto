/* @flow */
import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { asyncLoader } from "redux-async-loader";
import { hackerNewsSelector } from "../../../redux/modules/reducer";
import { fetchItems } from "../../../redux/modules/hackerNews";
import HackerNews from "./HackerNews";

export default compose(
  asyncLoader((props, { dispatch }) => dispatch(fetchItems())),
  connect(state => ({
    hackerNews: hackerNewsSelector(state as any),
  })),
)((props: any) => <HackerNews {...props.hackerNews} />);
