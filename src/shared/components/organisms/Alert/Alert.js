import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import stopPropagation from '../../utils/stopPropagation'
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
)(class Alert extends Component {

  static propTypes = {
    alert: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    const { alert: { message }, onClose } = this.props;
    if (!message) {
      return null;
    }

    return (
      <div onClick={onClose} className={local('main')}>
        <div className={local('obiOuter')}>
          <div className={local('obiInner')}>
            <div onClick={stopPropagation} className={local('displayAreaOuter')}>
              <div className={local('displayAreaInner')}>
                <div className={local('messageArea')}>
                  <span>{message}</span>
                </div>
                <div className={local('buttonArea')}>
                  <button onClick={onClose}>閉じる</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
