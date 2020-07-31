import React from 'react'
import { FormattedMessage } from "react-intl"
import AddressForm from './AddressForm'

export default class UnloginDeliveryAddress extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className="card-header bg-transparent">
          <h5>
            <FormattedMessage id="payment.deliveryTitle" />
          </h5>
        </div>
        <div className="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
          <fieldset className="shipping-address-block rc-fieldset">
            <AddressForm
              data={this.props.data}
              updateData={data => this.props.updateData(data)} />
          </fieldset>
        </div>
      </React.Fragment>
    )
  }
}
