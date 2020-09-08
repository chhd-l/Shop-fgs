import React from 'react';
import EditForm from './EditForm';

/**
 * billing address module - visitor
 */
export default class VisitorBillingAddress extends React.Component {
  render() {
    return (
      <fieldset className="shipping-address-block rc-fieldset">
        <EditForm updateData={(data) => this.props.updateData(data)} />
      </fieldset>
    );
  }
}
