import React from 'react';
import { AddressForm } from '@/components/Address';
class CyberBillingAddress extends React.Component {
  static defaultProps = {
    form: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      countryId: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      email: '',
      isSaveCard: true
    }
  };

  render() {
    return (
      <div className="billingAddress">
        <AddressForm
          isLogin={true}
          isCyberBillingAddress={true}
          initData={this.props.form}
          updateData={this.props.updateCyberBillingAddress}
        />
      </div>
    );
  }
}
export default CyberBillingAddress;
