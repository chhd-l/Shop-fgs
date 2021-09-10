import React from 'react';
import findIndex from 'lodash/findIndex';
import { PAYMENT_METHOD_PAU_CHECKOUT_RULE } from '@/utils/constant';
import { validData, loadJS } from '@/utils/utils';
import { injectIntl, FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import { queryIsSupportInstallMents } from '@/api/payment';
import { scrollPaymentPanelIntoView } from '../../modules/utils';
import MemberCardList from './MemberCardList';
import CardItemCover from './CardItemCover';
import InstallmentTable from './InstallmentTable';

const sessionItemRoyal = window.__.sessionItemRoyal;

function VisitorEditForm({
  creditCardInfoForm,
  onChange,
  onInputBlur,
  needEmail,
  needPhone
}) {
  return (
    <>
      <div className="row overflow_visible">
        <div className="col-sm-12">
          <div className="form-group required">
            <label className="form-control-label">
              <FormattedMessage id="payment.cardOwner" />
            </label>
            <span className="rc-input rc-input--full-width" input-setup="true">
              <input
                type="text"
                className="rc-input__control form-control cardOwner"
                name="cardOwner"
                value={creditCardInfoForm.cardOwner}
                onChange={onChange}
                onBlur={onInputBlur}
                maxLength="40"
              />
              <label className="rc-input__label" htmlFor="cardOwner" />
            </span>
            <div className="invalid-feedback">
              <FormattedMessage id="payment.errorInfo2" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {needEmail ? (
          <div className="col-sm-6">
            <div className="form-group required">
              <label className="form-control-label">
                <FormattedMessage id="payment.email" />
              </label>
              <span
                className="rc-input rc-input--full-width"
                input-setup="true"
              >
                <input
                  type="email"
                  className="rc-input__control email"
                  id="email"
                  value={creditCardInfoForm.email}
                  onChange={onChange}
                  onBlur={onInputBlur}
                  name="email"
                  maxLength="254"
                />
                <label className="rc-input__label" htmlFor="email" />
              </span>
              <div className="invalid-feedback">
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
        ) : null}
        {needPhone ? (
          <div className="col-sm-6">
            <div className="form-group required">
              <label className="form-control-label" htmlFor="phoneNumber">
                <FormattedMessage id="payment.phoneNumber" />
              </label>
              <span
                className="rc-input rc-input--full-width"
                input-setup="true"
                data-js-validate=""
                data-js-warning-message="*Phone Number isn’t valid"
              >
                <input
                  type="text"
                  className="rc-input__control input__phoneField shippingPhoneNumber"
                  min-lenght="18"
                  max-length="18"
                  data-phonelength="18"
                  data-js-pattern="(^\d{10}$)"
                  data-range-error="The phone number should contain 10 digits"
                  value={creditCardInfoForm.phoneNumber}
                  onChange={onChange}
                  onBlur={onInputBlur}
                  name="phoneNumber"
                  maxLength="2147483647"
                />
                <label className="rc-input__label" htmlFor="phoneNumber" />
              </span>
              <div className="invalid-feedback">
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
@inject('paymentStore', 'checkoutStore')
@observer
class PayOs extends React.Component {
  static defaultProps = {
    isLogin: false,
    needEmail: true,
    needPhone: true,
    isSupportInstallMent: false,
    mustSaveForFutherPayments: false, // 是否将卡保存到后台
    billingJSX: null,
    updateFormValidStatus: () => {},
    onVisitorPayosDataConfirm: () => {},
    onInstallMentParamChange: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      creditCardInfoForm: {
        // cardNumber: "",
        // cardDate: "",
        // cardCVV: "",
        cardOwner: '',
        email: '',
        phoneNumber: '',
        identifyNumber: '111',
        creditDardCvv: '',
        installmentChecked: false
      },
      payosdata: null,
      selectedCardInfo: null,
      inited: false,
      isValid: false,
      saveLoading: false,
      isEdit: true,
      installMentTableData: [], // 分期详情table data
      installMentParam: null // 所选择的分期详情
    };
    this.paymentCompRef = React.createRef();
  }
  componentDidMount() {
    const { isLogin } = this.props;
    const _this = this;
    if (isLogin) {
      loadJS({
        url: 'https://js.paymentsos.com/v2/0.0.1/token.min.js',
        callback: function () {
          window.POS.setPublicKey(window.__.env.REACT_APP_PaymentKEY_MEMBER);
          window.POS.setEnvironment(window.__.env.REACT_APP_PaymentENV);
          _this.setState({
            inited: true
          });
        }
      });
    } else {
      loadJS({
        url: 'https://js.paymentsos.com/v2/latest/secure-fields.min.js',
        callback: function () {
          window.POS.setPublicKey(window.__.env.REACT_APP_PaymentKEY_VISITOR);
          window.POS.setEnvironment(window.__.env.REACT_APP_PaymentENV);
          const style = {
            base: {
              secureFields: {
                width: 'calc(100% - 45px)'
              },
              pan: {
                display: 'inline-block',
                width: '50%'
              },
              expirationDate: {
                display: 'inline-block',
                width: '30%'
              },
              cvv: {
                display: 'inline-block',
                width: '20%'
              }
            }
          };
          window.POS.setStyle(style);
          window.POS.initSecureFields('card-secure-fields');
          try {
            document
              .getElementById('zoozIframe')
              .setAttribute('scrolling', 'no');
          } catch (e) {}
        }
      });
      this.setState({
        inited: true
      });
    }
    // this.initForm();
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  /**
   * 默认同步地址里相关信息
   */
  initForm() {
    const {
      paymentStore: { defaultCardDataFromAddr: defaultVal }
    } = this.props;
    let tmpDefaultName = '';
    if (defaultVal) {
      const { firstName, lastName } = defaultVal;
      tmpDefaultName = [firstName, lastName].filter((n) => !!n).join(' ');
    }
    this.setState(
      {
        creditCardInfoForm: Object.assign(this.state.creditCardInfoForm, {
          cardOwner: tmpDefaultName || '',
          email: (defaultVal && defaultVal.email) || '',
          phoneNumber: (defaultVal && defaultVal.phoneNumber) || ''
        })
      },
      () => {
        this.validFormData();
      }
    );
  }
  cardInfoInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfoForm } = this.state;
    creditCardInfoForm[name] = value;
    this.inputBlur(e);
    this.setState({ creditCardInfoForm }, () => {
      this.props.onVisitorCardInfoChange(this.state.creditCardInfoForm);
      this.validFormData();
    });
  };
  inputBlur = (e) => {
    let validDom = Array.from(
      e.target.parentElement.parentElement.children
    ).filter((el) => {
      let i = findIndex(Array.from(el.classList), (classItem) => {
        return classItem === 'invalid-feedback';
      });
      return i > -1;
    })[0];
    if (validDom) {
      validDom.style.display = e.target.value ? 'none' : 'block';
    }
  };
  async validFormData() {
    try {
      await validData(
        PAYMENT_METHOD_PAU_CHECKOUT_RULE,
        this.state.creditCardInfoForm
      );
      this.setState({ isValid: true });
    } catch (err) {
      this.setState({ isValid: false });
    } finally {
      this.props.updateFormValidStatus(this.state.isValid);
    }
  }

  handleClickCardConfirm = async () => {
    try {
      const { isSupportInstallMent } = this.props;
      const { creditCardInfoForm, isValid, isEdit, payosdata } = this.state;
      if (!isValid) {
        return false;
      }
      this.setState({ saveLoading: true });
      if (!payosdata) {
        const tokenResult = await new Promise((resolve) => {
          window.POS.createToken(
            {
              holder_name: creditCardInfoForm.cardOwner // This field is mandatory
            },
            function (result) {
              console.log(result, 'result');
              // Grab the token here
              resolve(result);
            }
          );
        });
        const payosdataRes = JSON.parse(tokenResult);
        if (payosdataRes) {
          this.setState({
            payosdata: payosdataRes
          });
          if (payosdataRes.category === 'client_validation_error') {
            sessionItemRoyal.remove('payosdata');
            throw new Error(payosdataRes.more_info);
          } else {
            // 如果分期，则不直接返回封面，需要返回卡列表，进行分期查询
            if (isSupportInstallMent && isEdit) {
              this.setState({ isEdit: false });
              const res = await queryIsSupportInstallMents({
                platformName: 'PAYU',
                pspItemCode: 'payu_tu',
                binNumber: payosdataRes.bin_number, // 卡前6位
                payAmount: this.tradePrice,
                storeId: window.__.env.REACT_APP_STOREID
              });

              const installMentTableData =
                res?.context?.installments[0]?.installmentPrices || [];
              this.setState({
                installMentTableData
              });
              throw new Error();
            }
          }
        }
      }
      this.props.onVisitorPayosDataConfirm(this.state.payosdata);
      // this.props.onInstallMentParamChange(this.state.installMentParam);
      scrollPaymentPanelIntoView();
    } catch (err) {
      this.setState({ payosdata: null });
      this.props.showErrorMsg(err.message);
      throw new Error(err.message);
    } finally {
      this.setState({ saveLoading: false });
    }
  };
  onPaymentCompDataChange = (data) => {
    this.setState({ selectedCardInfo: data }, () => {
      this.props.onPaymentCompDataChange(data);
    });
  };
  onCheckboxChange(item) {
    const { key } = item;
    this.setState((curState) => ({
      creditCardInfoForm: Object.assign(curState.creditCardInfoForm, {
        [key]: !curState.creditCardInfoForm[key]
      })
    }));
  }
  installmentTableChanger = (data) => {
    this.setState({ installMentParam: data }, () => {
      this.props.onInstallMentParamChange(this.state.installMentParam);
    });
  };
  handleClickEditBtn = () => {
    this.setState({ isEdit: true, payosdata: null });
  };
  render() {
    const {
      isLogin,
      billingJSX,
      defaultCardDataFromAddr,
      needEmail,
      needPhone,
      paymentStore: { supportPaymentMethods }
    } = this.props;
    const {
      creditCardInfoForm,
      isEdit,
      isValid,
      saveLoading,
      payosdata,
      installMentTableData
    } = this.state;
    const CreditCardImg = supportPaymentMethods.length > 0 && (
      <span className="logo-payment-card-list logo-credit-card">
        {supportPaymentMethods.map((el, idx) => (
          <LazyLoad key={idx}>
            <img
              className="logo-payment-card"
              src={el.imgUrl}
              alt="logo payment card"
            />
          </LazyLoad>
        ))}
      </span>
    );

    // 分期按钮显示控制
    const checkboxList = [
      {
        key: 'installmentChecked',
        id: 'id-payu-installment',
        langKey: 'payment.installment',
        value: creditCardInfoForm.installmentChecked,
        visible: installMentTableData.length > 0,
        showInstallMentTable: creditCardInfoForm.installmentChecked
      }
    ].filter((c) => c.visible);

    return (
      <>
        <div className="card payment-form Card-border rounded rc-border-colour--interface border-0">
          <div className="card-body rc-padding--none">
            <form
              method="POST"
              data-address-mode="new"
              name="dwfrm_billing"
              id="dwfrm_billing"
            >
              <div className="billing-payment">
                <div className={`rc-list__accordion-item border-0`}>
                  {isLogin ? (
                    <div className="rc-border-colour--interface">
                      <MemberCardList
                        key={Object.values(defaultCardDataFromAddr || {}).join(
                          '|'
                        )}
                        ref={this.paymentCompRef}
                        mustSaveForFutherPayments={
                          this.props.mustSaveForFutherPayments
                        }
                        isSupportInstallMent={this.props.isSupportInstallMent}
                        needEmail={needEmail}
                        needPhone={needPhone}
                        billingJSX={billingJSX}
                        getSelectedValue={this.onPaymentCompDataChange}
                        onInstallMentParamChange={
                          this.props.onInstallMentParamChange
                        }
                        onVisitorPayosDataConfirm={
                          this.props.onVisitorPayosDataConfirm
                        }
                        needReConfirmCVV={this.props.needReConfirmCVV}
                        defaultCardDataFromAddr={defaultCardDataFromAddr}
                        updateFormValidStatus={this.props.updateFormValidStatus}
                        inited={this.state.inited}
                      />
                    </div>
                  ) : (
                    <>
                      {/* edit form */}
                      <div
                        className={`credit-card-content ${
                          isEdit ? '' : 'hidden'
                        }`}
                      >
                        <div className="credit-card-form ">
                          <div className="rc-margin-bottom--xs">
                            <div className="content-asset">
                              <p>
                                <FormattedMessage id="payment.acceptCards" />
                              </p>
                            </div>
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label
                                    className="form-control-label"
                                    htmlFor="cardNumber"
                                  >
                                    <FormattedMessage id="payment.cardNumber" />
                                    <span className="red">*</span>
                                    {CreditCardImg}
                                    <form>
                                      <div id="card-secure-fields" />
                                      <button
                                        id="submit"
                                        name="submit"
                                        className="creadit"
                                        type="submit"
                                        style={{
                                          visibility: 'hidden',
                                          position: 'absolute'
                                        }}
                                      >
                                        Pay
                                      </button>
                                    </form>
                                  </label>
                                </div>
                              </div>
                            </div>

                            <VisitorEditForm
                              needEmail={needEmail}
                              needPhone={needPhone}
                              creditCardInfoForm={creditCardInfoForm}
                              onChange={this.cardInfoInputChange}
                              onInputBlur={this.inputBlur}
                            />
                          </div>
                        </div>
                      </div>
                      {!isEdit && (
                        <>
                          <CardItemCover
                            el={{
                              paymentVendor: payosdata?.vendor,
                              holderName: payosdata?.holder_name,
                              lastFourDigits: payosdata?.last_4_digits,
                              cardType: payosdata?.card_type
                            }}
                            canEdit={true}
                            selectedSts={true}
                            lastItem={true}
                            needReConfirmCVV={false}
                            handleClickEditBtn={this.handleClickEditBtn}
                          />
                          {checkboxList.map((item, i) => (
                            <div className="row mt-3" key={i}>
                              <div className="col-12">
                                <div className="rc-input rc-input--inline w-100 mw-100">
                                  <input
                                    className="rc-input__checkbox"
                                    id={`id-payu-${item.key}`}
                                    onChange={this.onCheckboxChange.bind(
                                      this,
                                      item
                                    )}
                                    type="checkbox"
                                    checked={item.value}
                                  />
                                  <label
                                    className="rc-input__label--inline text-break"
                                    htmlFor={`id-payu-${item.key}`}
                                  >
                                    <FormattedMessage id={item.langKey} />
                                  </label>
                                </div>
                              </div>
                              {item.showInstallMentTable ? (
                                <div className="col-12 mb-2">
                                  <InstallmentTable
                                    defaultValue={0}
                                    list={installMentTableData}
                                    onChange={this.installmentTableChanger}
                                  />
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        {billingJSX}
      </>
    );
  }
}

export default injectIntl(PayOs, { forwardRef: true });
