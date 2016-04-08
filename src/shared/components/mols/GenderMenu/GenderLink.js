import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { compose, onlyUpdateForPropTypes } from 'recompose';

export default compose(
  onlyUpdateForPropTypes,
)(class GenderLink extends Component {

  static propTypes = {
    gender: PropTypes.object.isRequired,
  };

  render() {
    const { gender: { code, name } } = this.props;

    return (
      <span>
        <Link to={`/style/${code}`}>{name}</Link>
      </span>
    );
  }
});
