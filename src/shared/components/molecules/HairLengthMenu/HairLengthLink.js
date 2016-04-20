import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { compose, onlyUpdateForPropTypes } from 'recompose';

export default compose(
  onlyUpdateForPropTypes,
)(class HairLengthLink extends Component {

  static propTypes = {
    hairLength: PropTypes.object.isRequired,
  };

  render() {
    const { hairLength: { gender, code, name } } = this.props;

    return (
      <span>
        <Link to={`/style/${gender}/${code}`}>{name}</Link>
      </span>
    );
  }
});
