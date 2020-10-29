import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import TermsCommon from '../Terms/common';

@inject('loginStore', 'paymentStore')
@injectIntl
@observer
class AdyenCommonPay extends Component {
  static defaultProps = {
    showCancelBtn: false,
    updateEmail: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      requiredList: [],
      type: '',
      btnName: '',
      btnNameObj: {
        adyenKlarnaPayLater: 'Weiter mit KlarnaPayLater',
        adyenKlarnaPayNow: 'Weiter mit KlarnaPayNow',
        directEbanking: 'Weiter mit KlarnaSofort'
      },
      isValid: false,
      isEdit: true
    };
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
    this.setState({
      requiredList
    });
  };

  clickPay = () => {
    try {
      // this.isTestMail();
      this.isConsentRequiredChecked();
      this.props.clickPay({ email: this.state.text, type: this.state.type });
    } catch (err) {
      this.props.showErrorMsg(err.message);
    }
  };
  handleChange = (e) => {
    const val = e.target.value;
    this.setState(
      {
        text: val
      },
      () => {
        try {
          this.isTestMail();
          this.setState({ isValid: true });
        } catch (err) {
          this.setState({ isValid: false });
        }
      }
    );
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
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
  handleClickConfirm = () => {
    this.setState({ isEdit: false });

    const { paymentStore } = this.props;
    paymentStore.setStsToCompleted({ key: 'paymentMethod' });
    paymentStore.setStsToEdit({ key: 'confirmation' });
    paymentStore.updateHasConfimedPaymentVal(this.props.type);
    this.props.updateEmail(this.state.text);
  };
  render() {
    const { isEdit } = this.state;
    return (
      <>
        <div className="checkout--padding ml-custom mr-custom pt-2 pb-2">
          <div className="customer-form">
            <div className="address">
              {isEdit ? (
                <>
                  <form
                    className="address-form"
                    action="/destination"
                    method="get"
                  >
                    <div className="address-line" id="addressLine2">
                      <div
                        className="address-input full-width"
                        id="street"
                        style={{ marginBottom: '18px' }}
                      >
                        <label className="address-label" for="street">
                          <FormattedMessage id="email" />
                          <span className="red">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          name="street"
                          value={this.state.text}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </form>
                  <div className="overflow-hidden mb-1">
                    <div className="text-right">
                      {this.props.showCancelBtn && (
                        <>
                          <a
                            className="rc-styled-link editPersonalInfoBtn"
                            name="contactInformation"
                            onClick={() => {
                              this.props.updateFormVisible(false);
                            }}
                          >
                            <FormattedMessage id="cancel" />
                          </a>{' '}
                          <FormattedMessage id="or" />{' '}
                        </>
                      )}

                      <button
                        className={`rc-btn rc-btn--one submitBtn editAddress ${
                          this.state.saveLoading ? 'ui-btn-loading' : ''
                        }`}
                        data-sav="false"
                        name="contactInformation"
                        type="submit"
                        disabled={!this.state.isValid}
                        onClick={this.handleClickConfirm}
                      >
                        <FormattedMessage id="save" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <label className="address-label">
                      <FormattedMessage id="email" />
                      <span className="red">*</span>
                    </label>
                    <br />
                    {this.state.text}
                  </div>
                  <span
                    className="rc-styled-link"
                    onClick={(e) => {
                      this.setState({ isEdit: true });
                    }}
                  >
                    <FormattedMessage id="edit" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {!this.props.isOnepageCheckout && (
          <>
            {/* <div className="pb-3" /> */}
            <div className="ml-custom mr-custom">
              <TermsCommon
                id={this.props.type}
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
                    {this.state.btnName}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default AdyenCommonPay;
