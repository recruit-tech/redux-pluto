import React, { Component, PropTypes } from 'react';
import { propTypes as formPropTypes } from 'redux-form';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import SalonList from '../SalonList';

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({ ...formPropTypes }),
)(class SalonForm extends Component {
  render() {
    const { fields: { keyword }, handleSubmit, submitting, count, items }  = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} method="GET">
          <div>
            <label>Free Keyword</label>
            <div>
              <input type="text" {...keyword} />
              <button type="submit">
                Search
              </button>
            </div>
          </div>
        </form>
        <SalonList />
      </div>
    );
  }
});
