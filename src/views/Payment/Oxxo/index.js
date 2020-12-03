import React, { Component } from 'react';
import oxxo from '@/assets/images/oxxo.png';
import { injectIntl, FormattedMessage } from 'react-intl';
import { confirmAndCommit } from '@/api/payment';
import { Link } from 'react-router-dom';
import store from 'storejs';
import TermsCommon from '../Terms/common';
import LazyLoad from 'react-lazyload';

class OxxoConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      showReqiredInfo: false,
      errorMsg: '',
      // isReadPrivacyPolicyInit: true,
      // isEighteenInit: true,
      // isReadPrivacyPolicy: false,
      // isEighteen: false,
      listData: [],
      requiredList: []
    };
  }
  async clickPay() {
    // const { isEighteen, isReadPrivacyPolicy } = this.state;
    try {
      this.props.startLoading();
      let isAllChecked = this.state.requiredList.every(
        (item) => item.isChecked
      );
      if (!isAllChecked) {
        throw new Error('agreement failed');
      }
      if (!this.state.email) {
        this.setState({ showReqiredInfo: true });
        throw new Error(this.props.intl.messages.pleasecompleteTheRequiredItem);
      }
      this.setState({ showReqiredInfo: false });
      if (
        !/^\w+([-_.]?\w+)*@\w+([-]?\w+)*(\.\w{2,6})+$/.test(
          this.state.email.replace(/\s*/g, '')
        )
      ) {
        throw new Error(this.props.intl.messages.pleaseEnterTheCorrectEmail);
      }

      // if (!isEighteen || !isReadPrivacyPolicy) {
      //   this.setState({
      //     isEighteenInit: false,
      //     isReadPrivacyPolicyInit: false
      //   });
      //   throw new Error('agreement failed');
      // }

      this.props.clickPay({
        type: 'oxxo',
        email: this.state.email
      });
    } catch (e) {
      if (e.message !== 'agreement failed') {
        this.showErrorMsg(e.message ? e.message.toString() : e.toString());
      }
      this.props.endLoading();
    }
  }
  emailChange(e) {
    this.setState({ email: e.target.value });
  }

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    });
    clearTimeout(this.timer);
    // this.scrollToPaymentComp();
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 3000);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    let requiredList = nextProps.listData.filter((item) => item.isRequired);
    this.setState({
      requiredList
    });
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
  render() {
    return (
      <div>
        <div className="rounded rc-border-all rc-border-colour--interface checkout--padding ml-custom mr-custom mb-3">
          <div
            className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
              this.state.errorMsg ? '' : 'hidden'
            }`}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
              role="alert"
            >
              <span className="pl-0">{this.state.errorMsg}</span>
              <button
                className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ errorMsg: '' });
                }}
                aria-label="Close"
              >
                <span className="rc-screen-reader-text">
                  <FormattedMessage id="close" />
                </span>
              </button>
            </aside>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <LazyLoad>
            <img src={oxxo} style={{ display: 'inline-block' }} alt=""/>
            </LazyLoad>
          </div>
          <h6>
            <p>
              <FormattedMessage id="payAtOxxO" />
            </p>
          </h6>
          <p>
            <FormattedMessage id="inputYourEmailReceivePayment" />
          </p>
          <div className="form-group required">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <label className="form-control-label mt-0 mb-0">
                  <FormattedMessage id="payment.email" />
                </label>
              </div>
              <div className="col-md-8 col-sm-12">
                <input
                  type="email"
                  id="email"
                  name="email"
                  maxLength="254"
                  value={this.state.email}
                  onChange={(e) => this.emailChange(e)}
                  style={{ width: '100%' }}
                />
                {this.state.showReqiredInfo ? (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    <FormattedMessage id="payment.errorInfo2" />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <p>
            <FormattedMessage
              id="remember48Hours"
              values={{
                val: <span style={{ color: '#e2001a' }}>7:00</span>
              }}
            />
          </p>
        </div>
        <div className="ml-custom mr-custom oxxo">
          <TermsCommon
            id={this.props.type}
            listData={this.props.listData}
            checkRequiredItem={this.checkRequiredItem}
          />
        </div>
        {/* <div className="footerCheckbox rc-margin-top--sm ml-custom mr-custom mt-3">
          <input
            className="form-check-input ui-cursor-pointer-pure"
            id="id-checkbox-cat-2"
            value=""
            type="checkbox"
            name="checkbox-2"
            onChange={() => {
              this.setState({
                isReadPrivacyPolicy: !this.state.isReadPrivacyPolicy,
                isReadPrivacyPolicyInit: false
              });
            }}
            checked={this.state.isReadPrivacyPolicy}
          />
          <label
            htmlFor="id-checkbox-cat-2"
            className="rc-input__label--inline ui-cursor-pointer-pure"
          >
            <FormattedMessage
              id="payment.confirmInfo3"
              values={{
                val1: (
                  <Link className="red" target="_blank" rel="nofollow" to="/privacypolicy">
                    Política de privacidad
                  </Link>
                ),
                val2: (
                  <Link className="red" target="_blank" rel="nofollow" to="/termuse">
                    la transferencia transfronteriza
                  </Link>
                )
              }}
            />
            <div
              className="warning"
              style={{
                display:
                  this.state.isReadPrivacyPolicy ||
                  this.state.isReadPrivacyPolicyInit
                    ? 'none'
                    : 'block'
              }}
            >
              <FormattedMessage id="payment.confirmInfo4" />
            </div>
          </label>
        </div> */}
        {/* <div className="footerCheckbox ml-custom mr-custom">
          <input
            id="id-checkbox-cat-1"
            value="Cat"
            type="checkbox"
            name="checkbox-2"
            className="form-check-input ui-cursor-pointer-pure"
            onChange={() => {
              this.setState({
                isEighteen: !this.state.isEighteen,
                isEighteenInit: false
              });
            }}
            checked={this.state.isEighteen}
          />
          <label
            htmlFor="id-checkbox-cat-1"
            className="rc-input__label--inline"
            style={{ cursor: 'pointer' }}
          >
            <FormattedMessage id="payment.confirmInfo1" />
            <div
              className="warning"
              style={{
                display:
                  this.state.isEighteen || this.state.isEighteenInit
                    ? 'none'
                    : 'block'
              }}
            >
              <FormattedMessage id="payment.confirmInfo2" />
            </div>
          </label>
        </div> */}
        {/* the end */}

        <div className="place_order-btn card rc-bg-colour--brand4 pt-4">
          <div className="next-step-button">
            <div className="rc-text--right">
              <button
                id="oxxoBtnConfirm"
                className="rc-btn rc-btn--one submit-payment"
                type="submit"
                name="submit"
                value="submit-shipping"
                onClick={() => this.clickPay()}
              >
                <FormattedMessage id="payment.further" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(OxxoConfirm);
