import React from 'react';
import { FormattedMessage } from 'react-intl';
import EditForm from './EditForm';

/**
 * delivery adress module - visitor
 */
export default class UnloginDeliveryAddress extends React.Component {
  render() {
    return (
      <>
        <div className="card-header bg-transparent">
          <h5>
            <i className="rc-icon rc-home--xs rc-iconography"></i>{' '}
            <FormattedMessage id="payment.deliveryTitle" />
          </h5>
        </div>
        <fieldset className="shipping-address-block rc-fieldset">
          <EditForm
            type="delivery"
            updateData={data => this.props.updateData(data)} />
        </fieldset>
      </>
    );
  }
}
