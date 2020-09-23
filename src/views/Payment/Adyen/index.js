import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import {
  ADYEN_CREDIT_CARD_IMGURL_ENUM,
  CREDIT_CARD_IMG_ENUM
} from '@/utils/constant';
import EditForm from '@/components/Adyen/form';
import CardList from './list';
import TermsCommon from '../Terms/common';

@inject('loginStore')
@injectIntl
@observer
class AdyenCreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredList: [],
      adyenPayParam: null,
      isValid: false,
      cardList: [],
      isAdd: false,
      isRefreshList: false
    };
  }
  componentWillReceiveProps(nextProps) {
    this.checkRequiredItem(nextProps.listData);
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get paymentMethodPanelStatus() {
    return this.props.paymentStore.panelStatus.paymentMethod;
  }
  get isOnepageCheckout() {
    return process.env.REACT_APP_ONEPAGE_CHECKOUT === 'true';
  }
  //是否consent必填项勾选
  isConsentRequiredChecked() {
    let isAllChecked = this.state.requiredList.every((item) => item.isChecked);
    if (!isAllChecked) {
      throw new Error(this.props.intl.messages.CompleteRequiredItems);
    }
  }
  checkRequiredItem = (list) => {
    let requiredList = list.filter((item) => item.isRequired);
    this.setState({
      requiredList
    });
  };
  updateAddOprateStatus = (val) => {
    this.setState({ isAdd: val });
  };
  updateSelectedCardInfo = (data) => {
    this.setState({ adyenPayParam: data, isValid: !!data });
  };
  clickPay = () => {
    if (!this.state.isValid) {
      return false;
    }

    // 登录
    // 1 验证是否选了卡
    // 2 验证同意条款勾选情况
    // 3 验证通过，进行支付

    // 非登录
    // 1 使用adyen的submit进行验证
    // 2 验证同意条框勾选情况
    // 3 验证通过，进行支付
    try {
      this.isConsentRequiredChecked();
      this.props.updateAdyenPayParam(this.state.adyenPayParam);
      this.props.clickPay({ type: 'adyen_credit_card' });
    } catch (err) {
      this.props.showErrorMsg(err.message);
    }
  };
  render() {
    const { cardList, isAdd } = this.state;
    return (
      <>
        <div className="checkout--padding ml-custom mr-custom pt-3 pb-3 border rounded">
          {/* <div className={`${!this.isLogin || isAdd ? '' : 'hidden'}`}>
            <EditForm
              updateClickPayBtnValidStatus={(val) => {
                this.setState({ isValid: val });
              }}
              updateAdyenPayParam={(data) => {
                this.setState({ adyenPayParam: data });
              }}
              updateAddOprateStatus={this.updateAddOprateStatus}
              showCancelBtn={cardList.length > 0}
              isAdd={this.state.isAdd}
              showErrorMsg={this.props.showErrorMsg}
              updateRefreshListStatus={(val) => {
                this.setState({ isRefreshList: val });
              }}
            />
          </div>
          <div className={`${cardList.length && !isAdd ? '' : 'hidden'}`}>
            <CardList
              updateCardListData={(data) => {
                this.setState({ cardList: data, isAdd: data.length === 0 });
              }}
              updateAddOprateStatus={this.updateAddOprateStatus}
              isRefreshList={this.state.isRefreshList}
            />
          </div> */}

          <CardList updateSelectedCardInfo={this.updateSelectedCardInfo} />
        </div>
        <div className="ml-custom mr-custom">
          <TermsCommon
            id={'adyenCreditCard'}
            listData={this.props.listData}
            checkRequiredItem={this.checkRequiredItem}
          />
        </div>
        <div className="place_order-btn card rc-bg-colour--brand4 pt-4">
          <div className="next-step-button">
            <div className="rc-text--right">
              <button
                className={`rc-btn rc-btn--one submit-payment`}
                type="submit"
                name="submit"
                value="submit-shipping"
                disabled={!this.state.isValid}
                onClick={this.clickPay}
              >
                <FormattedMessage id="payment.further" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdyenCreditCard;
