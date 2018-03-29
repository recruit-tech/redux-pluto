import React from "react";
import PropTypes from "prop-types";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import Overlay from "shared/components/atoms/Overlay";
import { createLocal } from "shared/components/utils/localnames";
import stopPropagation from "shared/components/utils/stopPropagation";
import styles from "./styles.scss";

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    alert: PropTypes.shape({
      message: PropTypes.string.isRequired
    }).isRequired,
    onClose: PropTypes.func.isRequired
  })
)(function Alert(props) {
  const { alert: { message }, onClose } = props;

  if (!message) {
    return null;
  }

  return (
    <div className={local("root")}>
      <Overlay onClick={onClose}>
        <div className={local("obiOuter")}>
          <div onClick={stopPropagation} className={local("obiInner")}>
            <div className={local("displayArea")}>
              <div className={local("messageArea")}>
                <span>{message}</span>
              </div>
              <div className={local("buttonArea")}>
                <button onClick={onClose}>閉じる</button>
              </div>
            </div>
          </div>
        </div>
      </Overlay>
    </div>
  );
});
