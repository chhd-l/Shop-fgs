import React from 'react';
import EditForm from './EditForm';
import { inject, observer } from 'mobx-react';

/**
 * billing address module - visitor
 */
@inject('paymentStore')
@observer
class VisitorBillingAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      form: null,
      isEdit: true,
      countryList: []
    };
  }
  render() {
    return (
      this.props.paymentStore.currentProgressIndex > 1 && (
        <fieldset className="shipping-address-block rc-fieldset">
          <EditForm updateData={(data) => this.props.updateData(data)} />
        </fieldset>
      )
    );
  }
}
export default VisitorBillingAddress;
