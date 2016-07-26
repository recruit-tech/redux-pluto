import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);
const noop = () => {
};

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  }),
)(class Overlay extends Component {
  render(props = this.props) {
    const { children, onClick } = props;

    return (
      <div onClick={onClick || noop} className={local('root')}>
        <div className={local('inner')}>
          {children}
        </div>
      </div>
    );
  }
});
