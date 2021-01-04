import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import findIndex from 'lodash/findIndex';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import {
  getPaymentMethod,
  deleteCard,
  addOrUpdatePaymentMethod
} from '@/api/payment';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import {
  CREDIT_CARD_IMG_ENUM,
  CREDIT_CARD_IMGURL_ENUM,
  PAYMENT_METHOD_RULE
} from '@/utils/constant';
import { validData } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { scrollPaymentPanelIntoView } from '../modules/utils';

import './index.css';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore', 'paymentStore')
@injectIntl
@observer
class PaymentComp extends React.Component {
  static defaultProps = {
    needReConfirmCVV: true,
    billingJSX: null,
    getSelectedValue: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      creditCardList: [],
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
        paymentCustomerId: ''
      },
      listLoading: true,
      saveLoading: false,
      listErr: '',
      currentVendor: '1',
      currentCardInfo: {},
      deliveryAddress: {},
      prevEditCardNumber: '',
      currentEditOriginCardInfo: null,
      hasEditedEmail: false,
      hasEditedPhone: false,
      hasEditedName: false,
      isValid: false,
      selectedId: ''
    };
    this.handleClickCardItem = this.handleClickCardItem.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
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
    }

    await this.getPaymentMethodList();

    let { creditCardList } = this.state;

    creditCardList.map((el) => {
      el.selected = el.isDefault === 1;
      return el;
    });
    let filterList = creditCardList.filter((el) => el.selected);
    if (filterList.length) {
    } else if (creditCardList.length) {
      creditCardList[0].selected = true;
    }
    let selectedCard = creditCardList.filter((el) => el.selected)[0];
    if (!selectedCard) {
      selectedCard = null;
    }
    this.props.getSelectedValue(selectedCard);
    this.setState({
      creditCardList,
      isEdit: !creditCardList.length
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { creditCardInfoForm } = this.state;
    if (nextProps.selectedDeliveryAddress) {
      const {
        email: selectedEmail,
        phoneNumber: selectedPhone,
        firstName: selectedFirstName,
        lastName: selectedLastName
      } = nextProps.selectedDeliveryAddress;
      let {
        email: curEmail,
        phoneNumber: curPhone,
        cardOwner: curName
      } = creditCardInfoForm;
      const selectedName = [selectedFirstName, selectedLastName]
        .filter((n) => !!n)
        .join(' ');
      if (!this.state.hasEditedEmail && selectedEmail !== curEmail) {
        curEmail = selectedEmail;
      }
      if (!this.state.hasEditedPhone && selectedPhone !== curPhone) {
        curPhone = selectedPhone;
      }
      if (!this.state.hasEditedName && selectedName !== curName) {
        curName = selectedName;
      }
      this.setState(
        {
          creditCardInfoForm: Object.assign(this.state.creditCardInfoForm, {
            email: curEmail,
            phoneNumber: curPhone,
            cardOwner: curName
          })
        },
        () => {
          this.validFormData();
        }
      );
    }
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  async getPaymentMethodList() {
    this.setState({ listLoading: true });
    try {
      let res = await getPaymentMethod({
        customerId: this.userInfo ? this.userInfo.customerId : '',
        storeId: process.env.REACT_APP_STOREID
      });
      let tmpList = (res.context || []).filter(
        (ele) => ele.payuPaymentMethod || ele.adyenPaymentMethod
      );
      tmpList = tmpList.map((el) => {
        const tmpPaymentMethod = el.payuPaymentMethod || el.adyenPaymentMethod;
        return Object.assign(el, {
          paymentMethod: {
            vendor: tmpPaymentMethod.vendor || tmpPaymentMethod.name,
            holder_name:
              tmpPaymentMethod.holder_name || tmpPaymentMethod.holderName,
            last_4_digits:
              tmpPaymentMethod.last_4_digits || tmpPaymentMethod.lastFour,
            card_type: tmpPaymentMethod.card_type || tmpPaymentMethod.brand
          }
        });
      });
      this.setState({ creditCardList: tmpList });
    } catch (err) {
      this.setState({ listErr: err.message });
    } finally {
      this.setState({
        listLoading: false
      });
    }
  }
  initCardInfo() {
    // 默认填充delivery相关信息
    let { deliveryAddress } = this.state;
    const {
      paymentStore: { selectedDeliveryAddress }
    } = this.props;
    let tmpName = '';
    if (selectedDeliveryAddress) {
      const { firstName, lastName } = selectedDeliveryAddress;
      tmpName = [firstName, lastName].filter((n) => !!n).join(' ');
    }
    this.setState(
      {
        creditCardInfoForm: {
          cardNumber: '',
          cardMmyy: '',
          cardCvv: '',
          cardOwner: tmpName || deliveryAddress.cardOwner || '',
          email: selectedDeliveryAddress && selectedDeliveryAddress.email,
          phoneNumber:
            (selectedDeliveryAddress && selectedDeliveryAddress.phoneNumber) ||
            deliveryAddress.phoneNumber ||
            '',
          identifyNumber: '111',
          isDefault: false
        }
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
    }, 3000);
  };
  currentCvvChange = (e) => {
    let { creditCardList } = this.state;
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (creditCardList.filter((el) => el.selected)[0]) {
      creditCardList.filter((el) => el.selected)[0].cardCvv = value;
    }
    this.setState(
      {
        creditCardList
      },
      () => {
        this.props.getSelectedValue(
          this.state.creditCardList.filter((el) => el.selected)[0]
        );
      }
    );
  };
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
      this.setState({ currentVendor: res.data.vendor });
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
    if (value) {
      if (name === 'email') {
        this.setState({ hasEditedEmail: true });
      }
      if (name === 'phoneNumber') {
        this.setState({ hasEditedPhone: true });
      }
      if (name === 'cardOwner') {
        this.setState({ hasEditedName: true });
      }
    }
    if (['cardNumber', 'cardMmyy', 'cardCvv'].indexOf(name) === -1) {
      this.inputBlur(e);
    }
    this.setState({ creditCardInfoForm }, () => {
      this.validFormData();
    });
  };
  async validFormData() {
    try {
      await validData(PAYMENT_METHOD_RULE, this.state.creditCardInfoForm);
      this.setState({ isValid: true });
    } catch (err) {
      this.setState({ isValid: false });
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
  handleSave = async (e) => {
    e.preventDefault();
    if (!this.state.isValid) {
      return false;
    }
    const { creditCardInfoForm } = this.state;
    this.setState({
      saveLoading: true
    });

    try {
      let res = await axios.post(
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
      if (!res.data.vendor) {
        this.showErrorMsg(
          'Lo sentimos, los tipos de tarjeta de crédito actualmente admitidos son: VISA, American Express, MasterCard'
        );
        this.setState({
          saveLoading: false
        });
        return;
      }

      let params = {
        customerId: this.userInfo ? this.userInfo.customerId : '',
        id: creditCardInfoForm.id ? creditCardInfoForm.id : '',
        email: creditCardInfoForm.email,
        phoneNumber: creditCardInfoForm.phoneNumber,
        isDefault: creditCardInfoForm.isDefault ? '1' : '0',

        accountName: this.userInfo ? this.userInfo.customerAccount : '',
        storeId: process.env.REACT_APP_STOREID,
        paymentToken: res ? res.data.token : creditCardInfoForm.paymentToken,
        paymentCustomerId: creditCardInfoForm.paymentCustomerId,
        paymentTransactionId: creditCardInfoForm.paymentTransactionId,
        paymentCvv: res ? res.data.encrypted_cvv : '',
        paymentType: 'PAYU'
      };

      let addRes = await addOrUpdatePaymentMethod(params);
      scrollPaymentPanelIntoView();
      let { creditCardList } = this.state;

      if (creditCardList.length) {
        this.setState({
          isEdit: false
        });

        await this.getPaymentMethodList();

        // 将新增/编辑的卡片置为选择状态
        this.state.creditCardList.map((el) => {
          if (el.id === addRes.context.id) {
            el.selected = true;
            el.cardCvv = this.state.creditCardInfoForm.cardCvv;
          }
          return el;
        });
        this.props.getSelectedValue(
          this.state.creditCardList.filter((c) => c.selected)[0]
        );
        this.initCardInfo();
      } else {
        await this.getPaymentMethodList();
        this.state.creditCardList[0].cardCvv = creditCardInfoForm.cardCvv;
        this.state.creditCardList[0].selected = true;
        this.setState(
          {
            saveLoading: false,
            isEdit: false,
            currentCardInfo: addRes.context,
            creditCardInfoForm: Object.assign(addRes.context, {
              cardCvv: creditCardInfoForm.cardCvv
            })
          },
          () => {
            this.props.getSelectedValue(this.state.creditCardList[0]);
          }
        );
      }
      this.setState({
        creditCardList
      });
    } catch (e) {
      let res = e.response;
      this.setState({
        saveLoading: false
      });
      if (res) {
        console.log(
          res.data.more_info,
          'body/expiration_date should match pattern "^(0[1-9]|1[0-2])(/|-|.| )d{2,4}"'
        );
        if (
          res.data.more_info.indexOf(
            'body/credit_card_cvv should match pattern'
          ) !== -1
        ) {
          this.showErrorMsg(this.props.intl.messages.cardCvvIsInvalid);
        } else if (
          res.data.more_info.indexOf(
            'body/card_number should match pattern'
          ) !== -1
        ) {
          this.showErrorMsg(this.props.intl.messages.cardNumberIsInvalid);
        } else if (
          res.data.more_info.indexOf(
            'body/expiration_date should match pattern'
          ) !== -1
        ) {
          this.showErrorMsg(this.props.intl.messages.expirationDateIsInvalid);
        } else {
          this.showErrorMsg(res.data.description);
        }
        return;
      }
      this.showErrorMsg(this.props.intl.messages.saveFailed);
    } finally {
      this.setState({
        saveLoading: false
      });
    }
  };
  async deleteCard(el) {
    let { creditCardList } = this.state;
    el.confirmTooltipVisible = false;
    this.setState({
      listLoading: true,
      creditCardList
    });
    await deleteCard({ id: el.id })
      .then(() => {
        this.getPaymentMethodList();
      })
      .catch((err) => {
        this.showErrorMsg(err.message);
        this.setState({
          listLoading: false
        });
      });
  }
  updateConfirmTooltipVisible(el, status) {
    let { creditCardList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      creditCardList
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
  handleSelectedIdChange = () => {
    const { selectedId, creditCardList } = this.state;
    const s = creditCardList.filter((c) => c.id === selectedId)[0];
    this.props.getSelectedValue(s || null);
  };
  handleClickCardItem(el) {
    if (el.selected) return;
    let { creditCardList } = this.state;
    creditCardList.map((el) => {
      el.selected = false;
      el.cardCvv = '';
      return el;
    });
    el.selected = true;
    this.props.getSelectedValue(el);
    this.setState({
      creditCardList
    });
  }
  render() {
    const { billingJSX } = this.props;
    const {
      creditCardInfoForm,
      creditCardList,
      isEdit,
      errorMsg,
      saveLoading,
      listLoading
    } = this.state;
    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card ml-0">
        {CREDIT_CARD_IMGURL_ENUM.map((el, idx) => (
          <LazyLoad>
            <img
              alt=""
              key={idx}
              style={{ width: '50px' }}
              className="logo-payment-card mr-1"
              src={el}
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

    return (
      <div id="PaymentComp" className={`loginCardBox`}>
        <div
          className={`table-toolbar d-flex flex-wrap justify-content-between p-0 ${
            !isEdit && creditCardList.length ? '' : 'hidden-xxl-down'
          }`}
        >
          <span className="t-gray">
            <FormattedMessage
              id="creditCardTipMany"
              values={{ number: <b>{creditCardList.length}</b> }}
            />
          </span>
        </div>
        {listLoading ? (
          <div className="mt-4">
            <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
          </div>
        ) : this.state.listErr ? (
          <div className="text-center p-4">{this.state.listErr}</div>
        ) : creditCardList.length && !isEdit ? (
          <>
            {_errJSX}
            {creditCardList.map((el, idx) => {
              return (
                <div
                  className={`rounded pl-2 pr-2 creditCompleteInfoBox position-relative ui-cursor-pointer border ${
                    el.selected ? 'active border-blue' : ''
                  } ${
                    idx !== creditCardList.length - 1 ? 'border-bottom-0' : ''
                  }`}
                  key={idx}
                  onClick={this.handleClickCardItem.bind(this, el)}
                >
                  <div className={`pt-3 pb-3`}>
                    <div
                      className="position-absolute"
                      style={{ right: '1%', top: '2%', zIndex: 50 }}
                    >
                      <span
                        className={`pull-right position-relative pl-2 ui-cursor-pointer-pure`}
                      >
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
                          confirm={this.deleteCard.bind(this, el)}
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
                                el.paymentMethod ? el.paymentMethod.vendor : ''
                              ]
                                ? CREDIT_CARD_IMG_ENUM[
                                    el.paymentMethod
                                      ? el.paymentMethod.vendor.toUpperCase()
                                      : ''
                                  ]
                                : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                            }
                          />
                        </LazyLoad>
                      </div>
                      <div
                        className={`col-12 col-sm-9 flex-column justify-content-around d-flex`}
                      >
                        <div className="row ui-margin-top-1-md-down PayCardBoxMargin">
                          <div className={`col-12 color-999 mb-1`}>
                            <div className="row align-items-center">
                              <div
                                className={`col-4`}
                                style={{ fontSize: '14px' }}
                              >
                                <FormattedMessage id="name2" />
                              </div>
                              <div className={`col-6 creditCompleteInfo`}>
                                {el.paymentMethod
                                  ? el.paymentMethod.holder_name
                                  : el.cardOwner}
                              </div>
                            </div>
                          </div>
                          {this.props.needReConfirmCVV && (
                            <div
                              className={`col-12 color-999 mb-1 ${
                                el.selected ? '' : 'hidden'
                              }`}
                            >
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
                                    onChange={this.currentCvvChange}
                                    type="password"
                                    maxLength="4"
                                    style={{ width: '100%' }}
                                    value={
                                      creditCardList.filter(
                                        (c) => c.selected
                                      )[0]
                                        ? creditCardList.filter(
                                            (c) => c.selected
                                          )[0].cardCvv
                                        : ''
                                    }
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
                              xxxx xxxx xxxx{' '}
                              {el.paymentMethod
                                ? el.paymentMethod.last_4_digits
                                : el.cardNumber
                                ? el.cardNumber.substring(
                                    el.cardNumber.length - 4
                                  )
                                : ''}
                            </span>
                          </div>
                          <div className="col-6 border-left color-999">
                            <span style={{ fontSize: '14px' }}>
                              <FormattedMessage id="payment.cardType" />
                            </span>
                            <br />
                            <span className="creditCompleteInfo fontFitSCreen">
                              {el.paymentMethod
                                ? el.paymentMethod.card_type
                                : el.cardType}
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
                                    placeholder={
                                      'MM/YY'
                                      // this.props.intl.messages.cardNumber
                                    }
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
                        type="number"
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
              </div>
              {billingJSX}
              <div className="overflow-hidden">
                <div className="text-right">
                  {/* <div
                      className="rc-input rc-input--inline"
                      style={{
                        marginTop: '10px',
                        float: 'left',
                        textAlign: 'left',
                        maxWidth: '400px'
                      }}
                      onClick={() => {
                        creditCardInfoForm.isDefault = !creditCardInfoForm.isDefault;
                        this.setState({ creditCardInfoForm });
                      }}
                    >
                      <input
                        type="checkbox"
                        className="rc-input__checkbox"
                        checked={creditCardInfoForm.isDefault}
                      />
                      <label className="rc-input__label--inline text-break">
                        <FormattedMessage id="setDefaultPaymentMethod" />
                      </label>
                    </div>
                     */}
                  {creditCardList.length > 0 && (
                    <>
                      <a
                        className="rc-styled-link editPersonalInfoBtn"
                        name="contactInformation"
                        onClick={this.handleClickCancel}
                      >
                        <FormattedMessage id="cancel" />
                      </a>
                      <span className="ml-1 mr-1">
                        <FormattedMessage id="or" />
                      </span>
                    </>
                  )}

                  <button
                    className={`rc-btn rc-btn--one submitBtn editAddress ${
                      saveLoading ? 'ui-btn-loading' : ''
                    }`}
                    data-sav="false"
                    name="contactInformation"
                    type="submit"
                    disabled={!this.state.isValid}
                    onClick={this.handleSave}
                  >
                    <FormattedMessage id="save" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentComp;
