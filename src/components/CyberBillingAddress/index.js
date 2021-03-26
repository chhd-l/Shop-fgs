import React from 'react';
import { FormattedMessage } from 'react-intl';
import EditForm from '@/components/Form';
class CyberBillingAddress extends React.Component {
  static defaultProps = {
    form: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
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
        <EditForm
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
