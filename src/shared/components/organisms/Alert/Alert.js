import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import Overlay from '../../atoms/Overlay';
import { createLocal } from '../../utils/localnames';
import stopPropagation from '../../utils/stopPropagation';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    alert: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
  }),
)(class Alert extends Component {
  render() {
    const { alert: { message }, onClose } = this.props;
    if (!message) {
      return null;
    }

    return (
      <div className={local('root')}>
        <Overlay onClick={onClose}>
          <div className={local('obiOuter')}>
            <div onClick={stopPropagation} className={local('obiInner')}>
              <div className={local('displayArea')}>
                <div className={local('messageArea')}>
                  <span>{message}</span>
                </div>
                <div className={local('buttonArea')}>
                  <button onClick={onClose}>閉じる</button>
                </div>
              </div>
            </div>
          </div>
        </Overlay>
      </div>
    );
  }
});
