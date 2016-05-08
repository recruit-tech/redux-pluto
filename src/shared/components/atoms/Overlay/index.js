import React, { Component, PropTypes } from 'react';
import { withRouter, Link } from 'react-router';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);
const noop = () => {};

export default compose(
  onlyUpdateForPropTypes,
)(class Overlay extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    onClick: PropTypes.func,
  };

  render() {
    const { children, onClick } = this.props;

    return (
      <div onClick={onClick || noop} className={local('root')}>
        <div className={local('inner')}>
          {children}
        </div>
      </div>
    );
  }
});
