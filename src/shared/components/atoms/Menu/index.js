import React from "react";
import PropTypes from "prop-types";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import { createLocal } from "shared/components/utils/localnames";
import styles from "./styles.scss";

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    children: PropTypes.node.isRequired
  })
)(function Menu(props) {
  const { children } = props;

  return (
    <div role="menu" className={local("items")}>
      {children}
    </div>
  );
});
