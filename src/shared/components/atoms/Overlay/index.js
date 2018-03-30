import React from "react";
import PropTypes from "prop-types";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import { createLocal } from "shared/components/utils/localnames";
import styles from "./styles.scss";

const { localNames: local } = createLocal(styles);
const noop = () => {};

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
  })
)(function Overlay(props) {
  const { children, onClick } = props;

  return (
    <div onClick={onClick || noop} className={local("root")}>
      <div className={local("inner")}>{children}</div>
    </div>
  );
});
