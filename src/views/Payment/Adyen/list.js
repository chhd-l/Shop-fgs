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
import {
  getPaymentMethod,
  deleteCard,
  addOrUpdatePaymentMethod
} from '@/api/payment';

@inject('loginStore')
@observer
class AdyenCreditCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listLoading: false,
      listErr: '',
      cardList: []
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
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  async queryList() {
    this.setState({ listLoading: true });
    try {
      let res = await getPaymentMethod({
        customerId: this.userInfo ? this.userInfo.customerId : ''
      });
      this.setState({ cardList: res.context });
    } catch (err) {
      console.log(err);
      this.setState({ listErr: err.toString() });
    } finally {
      this.setState({
        listLoading: false
      });
    }
  }
  render() {
    return this.isLogin ? <EditForm /> : <EditForm />;
  }
}

export default AdyenCreditCardList;
