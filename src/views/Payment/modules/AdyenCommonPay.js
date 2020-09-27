import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import TermsCommon from '../Terms/common';

@inject('loginStore', 'paymentStore')
@injectIntl
@observer
class AdyenCommonPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      requiredList: [],
      type: '',
      btnName: '',
      btnNameObj: {
        adyen_klarna_pay_lat: 'Weiter mit KlarnaPayLater',
        adyen_klarna_pay_now: 'Weiter mit KlarnaPayNow',
        sofort: 'Weiter mit KlarnaSofort'
      }
    };
  }
  get paymentMethodPanelStatus() {
    return this.props.paymentStore.panelStatus.paymentMethod;
  }
  //是否填写邮箱正确
  isTestMail() {
    var pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    if (!pattern.test(this.state.text)) {
      throw new Error(this.props.intl.messages.emailFormatFalse);
    }
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
    this.setState(
      {
        requiredList
      },
      () => {
        console.log({ requiredList: this.state.requiredList });
      }
    );
  };

  clickPay = () => {
    try {
      this.isTestMail();
      this.isConsentRequiredChecked();
      this.props.clickPay({ email: this.state.text, type: this.state.type });
    } catch (err) {
      this.props.showErrorMsg(err.message);
    }
  };
  handleChange = (e) => {
    this.setState({
      text: e.target.value
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        type: nextProps.type
      },
      () => {
        const btnName = this.state.btnNameObj[this.state.type];
        this.setState({ btnName });
      }
    );
    this.checkRequiredItem(nextProps.listData);
  }
  render() {
    return (
      <div className="checkout--padding">
        <div className="customer-form">
          <div className="address">
            <form className="address-form" action="/destination" method="get">
              <div className="address-line" id="addressLine2">
                <div
                  className="address-input full-width"
                  id="street"
                  style={{ marginBottom: '18px' }}
                >
                  <label className="address-label" for="street">
                    Email<span style={{ color: '#EC001A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="street"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </form>

            <TermsCommon
              id={this.props.type}
              listData={this.props.listData}
              checkRequiredItem={this.checkRequiredItem}
            />
            <div
              className="payment-container"
              style={{ 'max-width': 'auto', marginTop: '10px' }}
            >
              <div id="klarna" className="payment">
                <button
                  className="adyen-checkout__button adyen-checkout__button--standalone adyen-checkout__button--pay"
                  type="button"
                  onClick={this.clickPay}
                >
                  <span className="adyen-checkout__button__content">
                    <span className="adyen-checkout__button__text">
                      {this.state.btnName}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(AdyenCommonPay);
