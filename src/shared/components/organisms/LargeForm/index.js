import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import range from 'lodash/fp/range';
import LargeForm from './LargeForm';

export default compose(
  connect(
    (state, props) => ({
      initialValues: {
        items: range(0, props.location.query.length || 1000).map((v) => ({
          message: `aaa${v}`,
        })),
      },
    })
  ),
  reduxForm({
    form: 'largeForm',
  }),
)(LargeForm);
