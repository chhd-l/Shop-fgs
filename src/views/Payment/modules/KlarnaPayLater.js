import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import Terms from '../Terms/index';

class KlarnaPayLater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isReadPrivacyPolicy: false,
      isShipTracking: false,
      IsNewsLetter: false
    };
  }
  //是否填写邮箱正确
  isTestMail() {
    var pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    if (!pattern.test(this.state.text)) {
      throw new Error(this.props.intl.messages.emailFormatFalse);
    }
  }
  //是否勾选私人政策
  isTestPolicy() {
    if (!this.state.isReadPrivacyPolicy) {
      throw new Error(this.props.intl.messages.policyFalse);
    }
  }

  //是否同意运货追踪
  isShipTrackingFun() {
    if (!this.state.isShipTracking) {
      throw new Error(this.props.intl.messages.shipmentTrackingFalse);
    }
  }
  //是否同意通讯
  isNewsLetterFun() {
    if (!this.state.IsNewsLetter) {
      throw new Error(this.props.intl.messages.newsletterFalse);
    }
  }

  clickPay = () => {
    try {
      this.isTestPolicy();
      this.isShipTrackingFun();
      //this.isNewsLetterFun();
      this.isTestMail();
      this.props.clickPay(this.state.text);
    } catch (err) {
      this.props.showErrorMsg(err.message);
    }
  };
  handleChange = (e) => {
    this.setState({
      text: e.target.value
    });
  };
  sendIsReadPrivacyPolicy = (e) => {
    this.setState({
      isReadPrivacyPolicy: e
    });
  };
  sendIsShipTracking = (e) => {
    this.setState({
      isShipTracking: e
    });
  };
  sendIsNewsLetter = (e) => {
    this.setState({
      IsNewsLetter: e
    });
  };
  render() {
    return (
      <div className="checkout--padding">
        <div class="customer-form">
          <div class="address">
            <form class="address-form" action="/destination" method="get">
              <div class="address-line" id="addressLine2">
                <div
                  class="address-input full-width"
                  id="street"
                  style={{ marginBottom: '18px' }}
                >
                  <label class="address-label" for="street">
                    Email<span style={{ color: '#EC001A' }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    name="street"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </form>
            <div class="payment-container" style={{ 'max-width': 'auto' }}>
              <div id="klarna" class="payment">
                <button
                  className="adyen-checkout__button adyen-checkout__button--standalone adyen-checkout__button--pay"
                  type="button"
                  onClick={this.clickPay}
                >
                  <span className="adyen-checkout__button__content">
                    <span className="adyen-checkout__button__text">
                    Weiter mit KlarnaPayLater
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Terms
            sendIsReadPrivacyPolicy={this.sendIsReadPrivacyPolicy}
            sendIsShipTracking={this.sendIsShipTracking}
            sendIsNewsLetter={this.sendIsNewsLetter}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(KlarnaPayLater);
