import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import findIndex from 'lodash/findIndex';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import {
  getPaymentMethod,
  deleteCard,
  addOrUpdatePaymentMethod,
  queryIsSupportInstallMents
} from '@/api/payment';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { CREDIT_CARD_IMG_ENUM, PAYMENT_METHOD_RULE } from '@/utils/constant';
import { validData } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { scrollPaymentPanelIntoView } from '../modules/utils';
import InstallmentTable from './modules/InstallmentTable';

import './index.css';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore', 'paymentStore', 'checkoutStore')
@observer
class PaymentComp extends React.Component {
  static defaultProps = {
    needReConfirmCVV: true,
    needEmail: true,
    needPhone: true,
    isSupportInstallMent: false,
    mustSaveForFutherPayments: false,
    defaultCardDataFromAddr: null,
    isSupportInstallMent: [],
    getSelectedValue: () => {},
    updateFormValidStatus: () => {},
    onInstallMentParamChange: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      creditCardList: [],
      memberUnsavedCardList: [],
      isEdit: false,
      creditCardInfoForm: {
        cardNumber: '',
        cardMmyy: '',
        cardCvv: '',
        cardOwner: '',
        email: '',
        phoneNumber: '',
        identifyNumber: '111',
        isDefault: false,
        paymentToken: '',
        paymentTransactionId: '',
        paymentCustomerId: '',
        installmentChecked: false,
        savedCardChecked: false,
        savedDefaultCardChecked: false
      },
      listLoading: true,
      saveLoading: false,
      listErr: '',
      currentVendor: '1',
      deliveryAddress: {},
      prevEditCardNumber: '',
      isValid: false,
      selectedId: '',
      installMentTableData: [], // 分期详情table data
      installMentParam: null // 所选择的分期详情
    };
    this.handleClickCardItem = this.handleClickCardItem.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.currentCvvChange = this.currentCvvChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.preSelectedId = '';
  }
  async componentDidMount() {
    if (localItemRoyal.get('loginDeliveryInfo')) {
      let deliveryInfo = localItemRoyal.get('loginDeliveryInfo');
      deliveryInfo.deliveryAddress.cardOwner =
        deliveryInfo.deliveryAddress.firstName +
        '' +
        deliveryInfo.deliveryAddress.lastName;

      this.setState({ deliveryAddress: deliveryInfo.deliveryAddress }, () => {
        this.initCardInfo();
      });
    } else {
      this.initCardInfo();
    }
    this.getPaymentMethodList();
  }
  get creditCardListMerged() {
    const { memberUnsavedCardList, creditCardList, selectedId } = this.state;
    return memberUnsavedCardList.concat(creditCardList).map((c) =>
      Object.assign(c, {
        isValid: c.id === selectedId && (c.cardCvv || c.encrypted_cvv)
      })
    );
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  async getPaymentMethodList() {
    this.setState({ listLoading: true });
    try {
      let res = await getPaymentMethod();
      let tmpList = res.context || [];

      const defaultItem = tmpList.filter((t) => t.isDefault === 1)[0];
      const firstItem = tmpList[0];
      const tmpSelectedId =
        this.state.selectedId ||
        (defaultItem && defaultItem.id) ||
        (firstItem && firstItem.id) ||
        '';

      this.setState(
        {
          creditCardList: tmpList,
          selectedId: tmpSelectedId
        },
        () => {
          const { creditCardListMerged } = this;
          this.setState({ isEdit: !creditCardListMerged.length });
        }
      );
    } catch (err) {
      this.setState({ listErr: err.message });
    } finally {
      this.setState({
        listLoading: false
      });
      this.handleSelectedIdChange();
    }
  }
  initCardInfo() {
    // 默认填充delivery相关信息
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
          cardNumber: '',
          cardMmyy: '',
          cardCvv: '',
          currentVendor: '',
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
  showErrorMsg = (message) => {
    this.setState(
      {
        errorMsg: message
      },
      () => {
        scrollPaymentPanelIntoView();
      }
    );
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  };
  currentCvvChange(el, e) {
    let { creditCardList } = this.state;
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    el.cardCvv = value;
    this.setState(
      {
        creditCardList
      },
      () => {
        this.handleSelectedIdChange();
      }
    );
  }
  cardNumberFocus() {
    let { creditCardInfoForm } = this.state;
    this.setState({
      prevEditCardNumber: creditCardInfoForm.cardNumber,
      creditCardInfoForm: Object.assign(creditCardInfoForm, {
        cardNumber: ''
      })
    });
  }
  cardNumberBlur() {
    let { creditCardInfoForm } = this.state;
    if (!creditCardInfoForm.cardNumber) {
      this.setState({
        creditCardInfoForm: Object.assign(creditCardInfoForm, {
          cardNumber: this.state.prevEditCardNumber
        })
      });
    }
  }
  cardNumberChange = async (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let cardNumber =
      value.replace(/\s*/g, '') || this.state.creditCardInfoForm.cardNumber;

    try {
      let res = await axios.post(
        'https://api.paymentsos.com/tokens',
        {
          token_type: 'credit_card',
          card_number: cardNumber,
          expiration_date: '12-20',
          credit_card_cvv: '888',
          holder_name: 'echo'
        },
        {
          headers: {
            public_key: process.env.REACT_APP_PaymentKEY_MEMBER,
            'x-payments-os-env': process.env.REACT_APP_PaymentENV,
            'Content-type': 'application/json',
            app_id: process.env.REACT_APP_PaymentAPPID_MEMBER,
            'api-version': '1.3.0'
          }
        }
      );
      console.log(res);
      this.setState({ currentVendor: resData.vendor });
    } catch (e) {
      console.log(e);
    }
  };
  cardInfoInputChange = async (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfoForm } = this.state;
    if (name === 'cardNumber') {
      let beforeValue = value.substr(0, value.length - 1);
      let inputValue = value.substr(value.length - 1, 1);
      if (isNaN(inputValue)) {
        creditCardInfoForm[name] = beforeValue;
      } else {
        creditCardInfoForm[name] = value.replace(/\s*/g, '');
      }
    } else if (name === 'cardMmyy') {
      // 获取 / 前后数字
      let splitArr = value.split('/');
      let noFormatStr = '';
      let finalValue = '';
      // 获得不带/的数字
      if (splitArr[1] || splitArr[0].length > 2) {
        noFormatStr = splitArr[0].concat(splitArr[1] ? splitArr[1] : '');
        finalValue = noFormatStr.slice(0, 2) + '/' + noFormatStr.slice(2);
      } else {
        noFormatStr = splitArr[0];
        finalValue = noFormatStr.slice(0, 2);
      }
      creditCardInfoForm[name] = finalValue;
    } else {
      creditCardInfoForm[name] = value;
    }
    if (['cardNumber', 'cardMmyy', 'cardCvv'].indexOf(name) === -1) {
      this.inputBlur(e);
    }
    this.setState({ creditCardInfoForm }, () => {
      this.validFormData();
    });
  };
  async validFormData() {
    const { mustSaveForFutherPayments } = this.props;
    const {
      creditCardInfoForm: { savedCardChecked }
    } = this.state;
    try {
      // 必须保存卡时，没有勾选保存卡按钮时，校验不通过
      if (mustSaveForFutherPayments && !savedCardChecked) {
        throw new Error('must checked the saved card checkbox');
      }
      await validData(PAYMENT_METHOD_RULE, this.state.creditCardInfoForm);
      this.setState({ isValid: true });
    } catch (err) {
      this.setState({ isValid: false });
    } finally {
      this.props.updateFormValidStatus(this.state.isValid);
    }
  }
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
  // save card form， 保存卡
  handleSave = async (e) => {
    try {
      // 是否直接返回预览封面 true-返回列表 false-返回封面
      const { isSupportInstallMent } = this.props;
      const { isValid, isEdit, creditCardInfoForm } = this.state;
      const isReturnToCardList = isEdit && isSupportInstallMent;
      e && e.preventDefault();

      // 没有校验通过 或者 不是新增操作，直接返回
      if (!isValid || !isEdit) {
        !isEdit &&
          this.props.onInstallMentParamChange(this.state.installMentParam);
        return false;
      }
      this.setState({
        saveLoading: true
      });
      const res = await axios.post(
        'https://api.paymentsos.com/tokens',
        {
          token_type: 'credit_card',
          card_number: creditCardInfoForm.cardNumber,
          expiration_date: creditCardInfoForm.cardMmyy.replace(/\//, '-'),
          holder_name: creditCardInfoForm.cardOwner,
          credit_card_cvv: creditCardInfoForm.cardCvv
        },
        {
          headers: {
            public_key: process.env.REACT_APP_PaymentKEY_MEMBER,
            'x-payments-os-env': process.env.REACT_APP_PaymentENV,
            'Content-type': 'application/json',
            app_id: process.env.REACT_APP_PaymentAPPID_MEMBER,
            'api-version': '1.3.0'
          }
        }
      );
      const resData = res.data;
      if (!resData.vendor) {
        throw new Error(
          'Lo sentimos, los tipos de tarjeta de crédito actualmente admitidos son: VISA, American Express, MasterCard'
        );
      }

      if (creditCardInfoForm.savedCardChecked) {
        const addRes = await addOrUpdatePaymentMethod({
          storeId: process.env.REACT_APP_STOREID,
          customerId: this.userInfo ? this.userInfo.customerId : '',
          email: creditCardInfoForm.email,
          phone: creditCardInfoForm.phoneNumber,
          isDefault: creditCardInfoForm.savedDefaultCardChecked ? '1' : '0',
          paymentToken: res ? resData.token : '',
          paymentVendor: res ? resData.vendor : '',
          binNumber: res ? resData.bin_number : '',
          pspName: 'PAYU'
        });

        this.setState({
          isEdit: false
        });
        await this.getPaymentMethodList();
        const tmpSelectedId = addRes.context.id;
        let { creditCardList } = this.state;
        let tmpItem = creditCardList.filter((c) => c.id === tmpSelectedId);
        tmpItem.cardCvv = creditCardInfoForm.cardCvv;
        this.setState({
          creditCardList,
          selectedId: tmpSelectedId,
          saveLoading: false
        });
      } else {
        const tmpSelectedId = new Date().getTime() + '';
        let { memberUnsavedCardList } = this.state;
        let tmpItem = Object.assign(resData, {
          id: tmpSelectedId,
          paymentVendor: resData.vendor,
          holderName: resData.holder_name,
          lastFourDigits: resData.last_4_digits,
          cardType: resData.card_type
        });
        memberUnsavedCardList.unshift(tmpItem);
        this.setState({
          memberUnsavedCardList,
          selectedId: tmpSelectedId,
          isEdit: false
        });
      }
      await this.handleSelectedIdChange();
      this.props.onInstallMentParamChange(this.state.installMentParam);
      scrollPaymentPanelIntoView();

      if (isReturnToCardList) {
        throw new Error();
      }
    } catch (e) {
      console.log(111, e);
      const {
        cardCvvIsInvalid,
        cardNumberIsInvalid,
        expirationDateIsInvalid
      } = this.props.intl.messages;
      let res = e.response;
      let errMsg;
      this.setState({
        saveLoading: false
      });
      // debugger;
      // if (res) {
      //   console.log(
      //     res.more_info,
      //     'body/expiration_date should match pattern "^(0[1-9]|1[0-2])(/|-|.| )d{2,4}"'
      //   );
      //   if (
      //     res.more_info.indexOf('body/credit_card_cvv should match pattern') !==
      //     -1
      //   ) {
      //     errMsg = cardCvvIsInvalid;
      //   } else if (
      //     res.more_info.indexOf('body/card_number should match pattern') !== -1
      //   ) {
      //     errMsg = cardNumberIsInvalid;
      //   } else if (
      //     res.more_info.indexOf('body/expiration_date should match pattern') !==
      //     -1
      //   ) {
      //     errMsg = expirationDateIsInvalid;
      //   } else {
      //     errMsg = res.description;
      //   }
      // }
      this.showErrorMsg(e.message);
      throw new Error();
    } finally {
      this.setState({
        saveLoading: false
      });
    }
  };
  async deleteCard({ el, idx }) {
    let { creditCardList, memberUnsavedCardList } = this.state;
    el.confirmTooltipVisible = false;
    this.setState({
      listLoading: true,
      creditCardList,
      memberUnsavedCardList
    });
    if (el.paymentToken) {
      deleteCard({ id: el.id })
        .then(() => {
          this.getPaymentMethodList();
        })
        .catch((err) => {
          this.showErrorMsg(err.message);
          this.setState({
            listLoading: false
          });
        });
    } else {
      memberUnsavedCardList.splice(idx, 1);
      this.setState({
        memberUnsavedCardList
      });
    }
  }
  updateConfirmTooltipVisible(el, status) {
    let { creditCardList, memberUnsavedCardList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      creditCardList,
      memberUnsavedCardList
    });
  }
  handleClickAdd = () => {
    const { selectedId } = this.state;
    this.preSelectedId = selectedId;
    this.setState({ isEdit: true, selectedId: '' }, () => {
      this.handleSelectedIdChange();
      scrollPaymentPanelIntoView();
    });
    this.initCardInfo();
  };
  handleClickCancel = () => {
    this.initCardInfo();
    this.setState({ isEdit: false, selectedId: this.preSelectedId }, () => {
      this.handleSelectedIdChange();
      scrollPaymentPanelIntoView();
    });
  };
  handleSelectedIdChange = async () => {
    const { isSupportInstallMent } = this.props;
    const {
      selectedId,
      creditCardList,
      memberUnsavedCardList,
      creditCardInfoForm
    } = this.state;
    const s = memberUnsavedCardList
      .concat(creditCardList)
      .filter((c) => c.id === selectedId)[0];
    this.props.getSelectedValue(s || null);
    this.props.onVisitorPayosDataConfirm(s || null);
    this.props.updateFormValidStatus(
      s && (s.cardCvv || s.encrypted_cvv) ? true : false
    );
    this.props.updateFormValidStatus(
      s && (s.cardCvv || s.encrypted_cvv) ? true : false
    );

    // 查询被选中的卡，是否支持分期
    // 该卡如果已经查询过，就不再查询了，直到下一次切换时再重新查询
    if (s && !s.hasQueryInstallMent && isSupportInstallMent) {
      this.setState({
        installMentTableData: [],
        creditCardInfoForm: Object.assign(creditCardInfoForm, {
          installmentChecked: false
        })
      });
      const res = await queryIsSupportInstallMents({
        platformName: 'PAYU',
        pspItemCode: 'payu_tu',
        binNumber: s ? s.bin_number || s.binNumber : '', // 卡前6位
        payAmount: this.tradePrice,
        storeId: process.env.REACT_APP_STOREID
      });

      s.hasQueryInstallMent = true;

      this.setState({
        installMentTableData:
          (res.context &&
            res.context.installments &&
            res.context.installments[0] &&
            res.context.installments[0].installmentPrices) ||
          [],
        creditCardList,
        memberUnsavedCardList
      });
    }
  };
  handleClickCardItem(el) {
    const { selectedId, creditCardList, memberUnsavedCardList } = this.state;
    if (el.id === selectedId) return;
    this.setState(
      {
        selectedId: el.id,
        creditCardList,
        memberUnsavedCardList
      },
      () => {
        this.handleSelectedIdChange();
      }
    );
  }
  onCheckboxChange(item) {
    const { key } = item;
    this.setState(
      (curState) => ({
        creditCardInfoForm: Object.assign(curState.creditCardInfoForm, {
          [key]: !curState.creditCardInfoForm[key]
        })
      }),
      () => {
        this.validFormData();
      }
    );
  }
  hanldeClickReturnToCardList = () => {
    this.handleClickCancel();
  };
  installmentTableChanger = (data) => {
    this.setState({ installMentParam: data });
  };
  render() {
    const { creditCardListMerged } = this;
    const {
      needEmail,
      needPhone,
      isSupportInstallMent,
      supportPaymentMethods
    } = this.props;
    const {
      creditCardInfoForm,
      isEdit,
      errorMsg,
      listLoading,
      selectedId,
      installMentTableData
    } = this.state;

    // 卡列表显示控制
    const listVisible = creditCardListMerged.length && !isEdit;
    // 分期按钮显示控制
    const showInstallMentCheckout =
      isSupportInstallMent && installMentTableData.length > 0 && !isEdit;

    const CreditCardImg = supportPaymentMethods.length > 0 && (
      <span className="logo-payment-card-list logo-credit-card ml-0">
        {supportPaymentMethods.map((el, idx) => (
          <LazyLoad key={idx}>
            <img
              alt=""
              key={idx}
              style={{ width: '50px' }}
              className="logo-payment-card mr-1"
              src={el.img}
            />
          </LazyLoad>
        ))}
      </span>
    );
    const _errJSX = (
      <div
        className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
          errorMsg ? '' : 'hidden'
        }`}
      >
        <aside
          className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
          role="alert"
        >
          <span className="pl-0">{errorMsg}</span>
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
    );

    const _successTipJSX = (
      <aside
        className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
          this.state.successMsg ? '' : 'hidden'
        }`}
        role="alert"
      >
        <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
          {this.state.successMsg}
        </p>
      </aside>
    );

    const checkboxListForCardList = [
      {
        key: 'installmentChecked',
        id: 'id-payu-installment',
        langKey: 'payment.installment',
        value: creditCardInfoForm.installmentChecked,
        visible: showInstallMentCheckout,
        showInstallMentTable: creditCardInfoForm.installmentChecked
      }
    ].filter((c) => c.visible);

    const checkboxListForForm = [
      {
        key: 'savedCardChecked',
        id: 'id-payu-saved-card-account',
        langKey: 'payment.saveCardToAccount',
        value: creditCardInfoForm.savedCardChecked,
        visible: true
      },
      {
        key: 'savedDefaultCardChecked',
        id: 'id-payu-saved-as-preferred',
        langKey: 'payment.saveThisPaymentMethodAsPreferred',
        value: creditCardInfoForm.savedDefaultCardChecked,
        visible: true
      }
    ].filter((c) => c.visible);

    return (
      <div id="PaymentComp" className={`loginCardBox`}>
        {listLoading ? (
          <div className="mt-4">
            <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
          </div>
        ) : this.state.listErr ? (
          <div className="text-center p-4">{this.state.listErr}</div>
        ) : listVisible ? (
          <>
            {_errJSX}
            {creditCardListMerged.map((el, idx) => {
              return (
                <div
                  className={`rounded pl-2 pr-2 creditCompleteInfoBox position-relative ui-cursor-pointer border ${
                    el.id === selectedId ? 'active border-blue' : ''
                  } ${
                    el.id !== selectedId &&
                    idx !== creditCardListMerged.length - 1
                      ? 'border-bottom-0'
                      : ''
                  }`}
                  key={idx}
                  onClick={this.handleClickCardItem.bind(this, el)}
                >
                  {el.isValid && (
                    <span
                      className="position-absolute iconfont font-weight-bold green"
                      style={{
                        right: '3%',
                        bottom: '4%'
                      }}
                    >
                      &#xe68c;
                    </span>
                  )}

                  <div className="pt-3 pb-3">
                    <div
                      className="position-absolute"
                      style={{ right: '1%', top: '2%', zIndex: 50 }}
                    >
                      <span className="pull-right position-relative pl-2 ui-cursor-pointer-pure">
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.updateConfirmTooltipVisible(el, true);
                          }}
                        >
                          <FormattedMessage id="delete" />
                        </span>
                        <ConfirmTooltip
                          containerStyle={{
                            transform: 'translate(-89%, 105%)'
                          }}
                          arrowStyle={{ left: '89%' }}
                          display={el.confirmTooltipVisible}
                          confirm={this.deleteCard.bind(this, { el, idx })}
                          updateChildDisplay={(status) =>
                            this.updateConfirmTooltipVisible(el, status)
                          }
                        />
                      </span>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-3 d-flex flex-column justify-content-center">
                        <LazyLoad>
                          <img
                            alt=""
                            className="PayCardImgFitScreen"
                            src={
                              CREDIT_CARD_IMG_ENUM[
                                el.paymentVendor.toUpperCase()
                              ] ||
                              'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                            }
                          />
                        </LazyLoad>
                      </div>
                      <div className="col-12 col-sm-9 flex-column justify-content-around d-flex">
                        <div className="row ui-margin-top-1-md-down PayCardBoxMargin">
                          <div className={`col-12 color-999 mb-1`}>
                            <div className="row align-items-center">
                              <div
                                className="col-4"
                                style={{ fontSize: '14px' }}
                              >
                                <FormattedMessage id="name2" />
                              </div>
                              <div className={`col-6 creditCompleteInfo`}>
                                {el.holderName}
                              </div>
                            </div>
                          </div>
                          {/* 只有保存过的卡，切换时才需要重新输入cvv */}
                          {this.props.needReConfirmCVV &&
                            el.paymentToken &&
                            el.id === selectedId && (
                              <div className={`col-12 color-999 mb-1`}>
                                <div className="row align-items-center">
                                  <div
                                    className={`col-4`}
                                    style={{ fontSize: '14px' }}
                                  >
                                    <FormattedMessage id="CVV" />
                                  </div>
                                  <div
                                    className={`col-4 color-999 text-left creditCompleteInfo`}
                                  >
                                    <input
                                      onChange={this.currentCvvChange.bind(
                                        this,
                                        el
                                      )}
                                      type="password"
                                      autoComplete="new-password"
                                      maxLength="4"
                                      className="w-100"
                                      autoComplete="new-password"
                                      value={el.cardCvv}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                        <div className="row ui-margin-top-1-md-down PayCardBoxMargin">
                          <div className="col-6 color-999">
                            <span style={{ fontSize: '14px' }}>
                              <FormattedMessage id="payment.cardNumber2" />
                            </span>
                            <br />
                            <span className="creditCompleteInfo fontFitSCreen">
                              xxxx xxxx xxxx {el.lastFourDigits}
                            </span>
                          </div>
                          <div className="col-6 border-left color-999">
                            <span style={{ fontSize: '14px' }}>
                              <FormattedMessage id="payment.cardType" />
                            </span>
                            <br />
                            <span className="creditCompleteInfo fontFitSCreen">
                              {el.cardType}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="p-4 border text-center mt-2 rounded ui-cursor-pointer font-weight-normal"
              ref={(node) => {
                if (node) {
                  node.style.setProperty('border-width', '.1rem', 'important');
                  node.style.setProperty('border-style', 'dashed', 'important');
                }
              }}
              onClick={this.handleClickAdd}
            >
              <span className="rc-styled-link">
                <FormattedMessage id="addNewCreditCard" />
              </span>
            </div>
            {checkboxListForCardList.map((item, i) => (
              <div className="row mt-4" key={i}>
                <div className="col-12">
                  <div className="rc-input rc-input--inline w-100 mw-100">
                    <input
                      className="rc-input__checkbox"
                      id={`id-payu-${item.key}`}
                      onChange={this.onCheckboxChange.bind(this, item)}
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
                      list={installMentTableData}
                      onChange={this.installmentTableChanger}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </>
        ) : null}
        {/* edit form */}
        <div
          className={`credit-card-content ${isEdit ? '' : 'hidden'}`}
          id="credit-card-content"
        >
          <div className={`credit-card-form`}>
            <div className="rc-margin-bottom--xs">
              <div className="content-asset">
                {_errJSX}
                {_successTipJSX}

                <p className="m-0">{CreditCardImg}</p>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="cardNumber">
                      <FormattedMessage id="payment.cardNumber" />
                      <span className="red">*</span>
                      <div className="cardFormBox">
                        <span className="cardImage">
                          <LazyLoad>
                            <img
                              alt="Card"
                              src={
                                CREDIT_CARD_IMG_ENUM[this.state.currentVendor]
                                  ? CREDIT_CARD_IMG_ENUM[
                                      this.state.currentVendor.toUpperCase()
                                    ]
                                  : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                              }
                              className="img"
                            />
                          </LazyLoad>
                        </span>
                        <span className="cardForm">
                          <div className="row">
                            <div className="col-sm-5">
                              <div className="form-group required">
                                <span
                                  className="rc-input rc-input--full-width"
                                  input-setup="true"
                                >
                                  <input
                                    type="tel"
                                    className="rc-input__control form-control email"
                                    id="number"
                                    value={creditCardInfoForm.cardNumber}
                                    onChange={this.cardInfoInputChange}
                                    onKeyUp={this.cardNumberChange}
                                    // onFocus={(e) => {
                                    //   this.cardNumberFocus();
                                    // }}
                                    // onBlur={(e) => {
                                    //   this.cardNumberBlur();
                                    // }}
                                    name="cardNumber"
                                    maxLength="254"
                                    placeholder={
                                      this.props.intl.messages.cardNumber
                                    }
                                  />
                                </span>
                                <div className="invalid-feedback ui-position-absolute">
                                  <FormattedMessage id="payment.errorInfo2" />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group required">
                                <span
                                  className="rc-input rc-input--full-width"
                                  input-setup="true"
                                  data-js-validate=""
                                  data-js-warning-message="*Phone Number isn’t valid"
                                >
                                  <input
                                    type="tel"
                                    className="rc-input__control form-control phone"
                                    min-lenght="18"
                                    max-length="18"
                                    data-phonelength="18"
                                    data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                    data-range-error="The phone number should contain 10 digits"
                                    value={creditCardInfoForm.cardMmyy}
                                    onChange={this.cardInfoInputChange}
                                    name="cardMmyy"
                                    maxLength="5"
                                    placeholder={'MM/YY'}
                                  />
                                </span>
                                <div className="invalid-feedback ui-position-absolute">
                                  The field is required.
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group required">
                                <span
                                  className="rc-input rc-input--full-width"
                                  input-setup="true"
                                  data-js-validate=""
                                  data-js-warning-message="*Phone Number isn’t valid"
                                >
                                  <input
                                    type="password"
                                    autoComplete="new-password"
                                    className="rc-input__control form-control phone"
                                    data-phonelength="18"
                                    data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                    data-range-error="The phone number should contain 10 digits"
                                    value={creditCardInfoForm.cardCvv}
                                    onChange={this.cardInfoInputChange}
                                    name="cardCvv"
                                    maxLength="4"
                                    placeholder="CVV"
                                  />
                                </span>
                                <div className="invalid-feedback ui-position-absolute">
                                  The field is required.
                                </div>
                              </div>
                            </div>
                          </div>
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row overflow_visible">
                <div className="col-sm-12">
                  <div className="form-group required">
                    <label className="form-control-label">
                      <FormattedMessage id="payment.cardOwner" />
                    </label>
                    <span
                      className="rc-input rc-input--full-width"
                      input-setup="true"
                    >
                      <input
                        type="text"
                        className="rc-input__control form-control cardOwner"
                        name="cardOwner"
                        value={creditCardInfoForm.cardOwner}
                        onChange={this.cardInfoInputChange}
                        onBlur={this.inputBlur}
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
                          onChange={this.cardInfoInputChange}
                          onBlur={this.inputBlur}
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
                      <label
                        className="form-control-label"
                        htmlFor="phoneNumber"
                      >
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
                          // data-js-validate="(^(\+?7|8)?9\d{9}$)"
                          data-js-pattern="(^\d{10}$)"
                          data-range-error="The phone number should contain 10 digits"
                          value={creditCardInfoForm.phoneNumber}
                          onChange={this.cardInfoInputChange}
                          onBlur={this.inputBlur}
                          name="phoneNumber"
                          maxLength="2147483647"
                        />
                        <label
                          className="rc-input__label"
                          htmlFor="phoneNumber"
                        />
                      </span>
                      <div className="invalid-feedback">
                        <FormattedMessage id="payment.errorInfo2" />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {creditCardListMerged.length > 0 && (
                <div className="row">
                  <div className="col-12 text-right">
                    <span
                      className="rc-styled-link"
                      onClick={this.hanldeClickReturnToCardList}
                    >
                      <FormattedMessage id="payment.returnToCardList" />
                    </span>
                  </div>
                </div>
              )}

              {checkboxListForForm.map((item, i) => (
                <div className="row" key={i}>
                  <div className="col-12">
                    <div className="rc-input rc-input--inline w-100 mw-100">
                      <input
                        className="rc-input__checkbox"
                        id={`id-payu-${item.key}`}
                        onChange={this.onCheckboxChange.bind(this, item)}
                        // name={item.key}
                        // value={item.value}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(PaymentComp, { forwardRef: true });
