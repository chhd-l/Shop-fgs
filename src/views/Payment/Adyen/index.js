import React from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import {
  ADYEN_CREDIT_CARD_IMGURL_ENUM,
  CREDIT_CARD_IMG_ENUM
} from '@/utils/constant';
import { loadJS } from '@/utils/utils';
import { getAdyenParam } from './utils';
import EditForm from './form';
import TermsCommon from '../Terms/common';

@inject('loginStore')
@observer
class AdyenCreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adyenPayParam: {}
    };
  }
  componentDidMount() {}
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get paymentMethodPanelStatus() {
    return this.props.paymentStore.panelStatus.paymentMethod;
  }
  get isOnepageCheckout() {
    return process.env.REACT_APP_ONEPAGE_CHECKOUT === 'true';
  }
  render() {
    return (
      <div class="payment-method checkout--padding">
        {this.isLogin ? <EditForm /> : <EditForm />}
        <TermsCommon
          id={'adyenCreditCard'}
          listData={this.props.listData}
          checkRequiredItem={this.props.checkRequiredItem}
        />
      </div>
    );
  }
}

export default AdyenCreditCard;
