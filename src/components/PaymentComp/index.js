import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { findIndex, find } from 'lodash';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import successImg from '@/assets/images/success.png';
import {
  getPaymentMethod,
  deleteCard,
  addOrUpdatePaymentMethod
} from '@/api/payment';
import Loading from '@/components/Loading';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import {
  CREDIT_CARD_IMG_ENUM,
  CREDIT_CARD_IMGURL_ENUM
} from '@/utils/constant';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@observer
class PaymentComp extends React.Component {
  static defaultProps = {
    isApplyCvv: true,
    canEdit: false // 是否可以编辑卡
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
      loading: false,
      listLoading: true,
      listErr: '',
      currentVendor: '1',
      currentCvv: '',
      isCurrentCvvConfirm: false,
      currentCardInfo: {},
      completeCardShow: false,
      deliveryAddress: {},
      confirmCardInfo: {},
      prevEditCardNumber: '',
      currentEditOriginCardInfo: null
    };
    this.pathname = '';
  }
  componentWillReceiveProps(props) {
    if (props.isAddNewCard) {
      this.setState({ isEdit: true }, () => {
        this.scrollToPaymentComp();
      });
      this.initCardInfo();
    }
    if (props.isApplyCvv != this.props.isApplyCvv) {
      this.setState({
        currentCvv: '',
        isCurrentCvvConfirm: false
      });
      this.props.getSelectedValue && this.props.getSelectedValue({});
    }
  }
  async componentDidMount() {
    this.pathname = this.props.history.location.pathname;
    if (this.props.loginStore.isLogin) {
      if (localItemRoyal.get('loginDeliveryInfo')) {
        let deliveryInfo = localItemRoyal.get('loginDeliveryInfo');
        deliveryInfo.deliveryAddress.cardOwner =
          deliveryInfo.deliveryAddress.firstName +
          '' +
          deliveryInfo.deliveryAddress.lastName;
        deliveryInfo.deliveryAddress.phoneNumber =
          deliveryInfo.deliveryAddress.phoneNumber;
        this.setState({ deliveryAddress: deliveryInfo.deliveryAddress }, () => {
          this.initCardInfo();
        });
      }

      await this.getPaymentMethodList();
      // this.state.creditCardList.map((el) => {
      //   if (el.isDefault === 1) {
      //     el.selected = true;
      //     this.props.getSelectedValue && this.props.getSelectedValue(el);
      //   }else {
      //     el.selected = false;
      //   }
      // });
      let filterList = this.state.creditCardList.filter((el) => {
        if (el.isDefault === 1) {
          el.selected = true;
          return true;
        } else {
          el.selected = false;
          return false;
        }
      });
      if (filterList.length) {
      } else if (this.state.creditCardList.length) {
        this.state.creditCardList[0].selected = true;
      }
      if (!this.props.isApplyCvv) {
        const selectedCard = this.state.creditCardList.filter(
          (el) => el.selected
        )[0];
        if (selectedCard) {
          this.setState({
            currentCvv: selectedCard.cardCvv
          });
          this.props.getSelectedValue &&
            this.props.getSelectedValue(selectedCard);
        }
      }
      this.setState({ creditCardList: this.state.creditCardList });
    }
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  async getPaymentMethodList() {
    let { confirmCardInfo } = this.state;
    this.setState({ listLoading: true });
    try {
      let res = await getPaymentMethod({
        customerId: this.userInfo ? this.userInfo.customerId : '',
        storeId: process.env.REACT_APP_STOREID
      });

      let tmpList = (res.context || []).filter(
        (ele) => ele.payuPaymentMethod || ele.adyenPaymentMethod
      );

      this.props.noCardCallback && this.props.noCardCallback(!tmpList.length);

      if (
        confirmCardInfo.id &&
        res.context.filter((el) => confirmCardInfo.id === el.id).length
      ) {
        this.setState({ isCurrentCvvConfirm: true });
      } else {
        this.props.getSelectedValue && this.props.getSelectedValue({});
      }
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
      console.log(err);
      this.setState({ listErr: err.toString() });
    } finally {
      this.setState({
        loading: false,
        listLoading: false
      });
    }
  }
  initCardInfo() {
    let { deliveryAddress } = this.state;
    this.setState(
      {
        creditCardInfoForm: {
          cardNumber: '',
          cardMmyy: '',
          cardCvv: '',
          cardOwner: deliveryAddress.cardOwner || '',
          email: '',
          phoneNumber: deliveryAddress.phoneNumber || '',
          identifyNumber: '111',
          isDefault: false
        }
      },
      () => {
        // this.scrollToPaymentComp()
      }
    );
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  confirmCvv(e, el) {
    e.preventDefault();
    e.stopPropagation();
    let { isCurrentCvvConfirm } = this.state;
    if (this.state.currentCvv === el.cardCvv) {
      isCurrentCvvConfirm = true;
      this.props.getSelectedValue && this.props.getSelectedValue(el);
    } else {
      isCurrentCvvConfirm = false;
      this.showErrorMsg(this.props.intl.messages.cvvWarning);
    }

    this.setState({
      isCurrentCvvConfirm: isCurrentCvvConfirm,
      confirmCardInfo: el
    });
  }
  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    });
    // this.scrollToPaymentComp();
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 3000);
  };
  scrollToErrorMsg() {
    const widget = document.querySelector('.content-asset');
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo({
        top: this.getElementToPageTop(widget),
        behavior: 'smooth'
      });
    }
  }
  scrollToPaymentComp() {
    const widget = document.querySelector('#PaymentComp');
    widget.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    // if (widget) {
    //   window.scrollTo({
    //     top: this.getElementToPageTop(widget),
    //     behavior: "smooth",
    //   });
    // }
  }
  currentCvvChange(e) {
    let { creditCardList } = this.state;
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (!this.props.isApplyCvv) {
      creditCardList.filter((el) => el.selected)[0].cardCvv = value;
    }
    this.setState(
      {
        currentCvv: value,
        creditCardList: creditCardList
      },
      () => {
        if (!this.props.isApplyCvv) {
          this.props.getSelectedValue &&
            this.props.getSelectedValue(
              this.state.creditCardList.filter((el) => el.selected)[0]
            );
        }
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
  async cardNumberChange(e) {
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
  }
  cardInfoInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfoForm, currentEditOriginCardInfo } = this.state;
    if (name === 'cardNumber') {
      let beforeValue = value.substr(0, value.length - 1);
      let inputValue = value.substr(value.length - 1, 1);
      if (isNaN(inputValue)) {
        creditCardInfoForm[name] = beforeValue;
      } else {
        creditCardInfoForm[name] = value.replace(/\s*/g, '');
      }
      // creditCardInfoForm[name] = value.replace(/\s*/g, "");
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
      // let beforeValue = value.substr(0, value.length - 1);
      // let inputValue = value.substr(value.length - 1, 1);

      // if (
      //   creditCardInfoForm[name] !== beforeValue &&
      //   creditCardInfoForm[name].substr(0, creditCardInfoForm[name].length - 1) !==
      //   value
      // )
      //   return;
      // if (
      //   isNaN(parseInt(inputValue)) &&
      //   value.length > creditCardInfoForm[name].length
      // )
      //   return;
      // if (creditCardInfoForm[name].length == 2 && value.length == 3) {
      //   creditCardInfoForm[name] = value.slice(0, 2) + "/" + value.slice(2);
      // } else if (creditCardInfoForm[name].length == 4 && value.length == 3) {
      //   creditCardInfoForm[name] = creditCardInfoForm[name].slice(0, 2);
      // } else {
      //   creditCardInfoForm[name] = value;
      // }
    } else {
      creditCardInfoForm[name] = value;
    }
    // 编辑状态，一旦修改了cardMmyy/cardOwner/cardCvv，则需重新输入卡号
    if (
      creditCardInfoForm.cardNumber.includes('*') &&
      (creditCardInfoForm.cardMmyy !== currentEditOriginCardInfo.cardMmyy ||
        creditCardInfoForm.cardOwner !== currentEditOriginCardInfo.cardOwner ||
        creditCardInfoForm.cardCvv)
    ) {
      creditCardInfoForm.cardNumber = '';
    }
    if (['cardNumber', 'cardMmyy', 'cardCvv'].indexOf(name) === -1) {
      this.inputBlur(e);
    }
    this.setState({ creditCardInfoForm });
  }
  inputBlur(e) {
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
  }
  async handleSave(e) {
    e.preventDefault();
    const { creditCardInfoForm, currentEditOriginCardInfo } = this.state;
    let queryPaymentsosToken = true;
    let fieldList = [
      'cardNumber',
      'cardMmyy',
      'cardCvv',
      'cardOwner',
      'email',
      'phoneNumber',
      'identifyNumber'
    ];
    // 修改卡信息时，
    // 修改cardNumber/cardMmyy/cardOwner，cvv必填，需重新获取token
    // 修改其他(email/phone)时，cvv不必填，无需重新获取token
    if (creditCardInfoForm.id) {
      if (
        creditCardInfoForm.cardNumber !==
          currentEditOriginCardInfo.cardNumber ||
        creditCardInfoForm.cardMmyy !== currentEditOriginCardInfo.cardMmyy ||
        creditCardInfoForm.cardOwner !== currentEditOriginCardInfo.cardOwner
      ) {
      } else {
        queryPaymentsosToken = false;
        fieldList.splice(2, 1);
      }
    }
    for (let k in creditCardInfoForm) {
      if (
        fieldList.indexOf(k) !== -1 &&
        this.state.creditCardInfoForm[k] === ''
      ) {
        this.showErrorMsg(
          this.props.intl.messages.pleasecompleteTheRequiredItem
        );
        return;
      }
      if (
        k === 'email' &&
        !/^\w+([-_.]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(
          creditCardInfoForm[k].replace(/\s*/g, '')
        )
      ) {
        this.showErrorMsg(this.props.intl.messages.pleaseEnterTheCorrectEmail);
        return;
      }
    }
    this.setState({
      loading: true
    });

    try {
      let res;
      if (queryPaymentsosToken) {
        res = await axios.post(
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
            loading: false
          });
          return;
        }
      }

      let params = {
        // cardCvv: creditCardInfoForm.cardCvv,
        // cardMmyy: creditCardInfoForm.cardMmyy,
        // cardNumber: creditCardInfoForm.cardNumber,
        // cardOwner: creditCardInfoForm.cardOwner,
        // cardType: res.data.card_type,
        customerId: this.userInfo ? this.userInfo.customerId : '',
        // vendor: res.data.vendor,
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

      if (this.state.creditCardList.length) {
        this.setState({
          loading: false,
          isEdit: false
        });
        this.initCardInfo();
        await this.getPaymentMethodList();

        if (this.pathname === '/payment/payment') {
          let creditCardInfoForm = {};
          this.state.creditCardList.map((el) => {
            if (el.id === addRes.context.id) {
              el.selected = true;
              creditCardInfoForm = el;
            }
          });
          console.log(this.state.creditCardList, 'list');
          this.props.getSelectedValue &&
            this.props.getSelectedValue(creditCardInfoForm);
          this.setState({ isCurrentCvvConfirm: true });
        } else {
          let filterList = this.state.creditCardList.filter((el) => {
            if (el.isDefault === 1) {
              el.selected = true;
              return true;
            } else {
              el.selected = false;
              return false;
            }
          });
          if (filterList.length) {
          } else if (this.state.creditCardList.length) {
            this.state.creditCardList[0].selected = true;
          }
        }
      } else {
        await this.getPaymentMethodList();
        if (this.pathname !== '/payment/payment') {
          let filterList = this.state.creditCardList.filter((el) => {
            if (el.isDefault === 1) {
              el.selected = true;
              return true;
            } else {
              el.selected = false;
              return false;
            }
          });
          if (filterList.length) {
          } else if (this.state.creditCardList.length) {
            this.state.creditCardList[0].selected = true;
          }
        }
        this.setState(
          {
            loading: false,
            isEdit: false,
            currentCardInfo: addRes.context,
            creditCardInfoForm: addRes.context,
            completeCardShow: true
          },
          () => {
            this.props.getSelectedValue &&
              this.props.getSelectedValue(this.state.creditCardInfoForm);
          }
        );
      }
      this.setState({
        creditCardList: this.state.creditCardList,
        currentCvv: ''
      });
    } catch (e) {
      let res = e.response;
      this.setState({
        loading: false,
        currentCvv: ''
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
    }
  }
  async deleteCard(el) {
    let { creditCardList } = this.state;
    el.confirmTooltipVisible = false;
    this.setState({
      loading: true,
      creditCardList
    });
    await deleteCard({ id: el.id, storeId: process.env.REACT_APP_STOREID })
      .then((res) => {
        this.getPaymentMethodList();
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message || this.props.intl.messages.deleteAddressFailed
        );
        this.setState({
          loading: false
        });
      });
  }
  updateConfirmTooltipVisible(el, status) {
    let { creditCardList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      creditCardList: creditCardList
    });
  }
  render() {
    let pathname = this.pathname;
    const {
      creditCardInfoForm,
      creditCardList,
      isCurrentCvvConfirm,
      currentCardInfo
    } = this.state;
    const { isLogin } = this.props.loginStore;
    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card ml-0">
        {CREDIT_CARD_IMGURL_ENUM.map((el, idx) => (
          <img
            key={idx}
            style={{ width: '50px' }}
            className="logo-payment-card mr-1"
            src={el}
          />
        ))}
      </span>
    );

    return (
      <div
        style={{
          display:
            this.props.show === true || this.props.show === undefined
              ? 'block'
              : 'none'
        }}
        id="PaymentComp"
        className={`loginCardBox ${isLogin ? '' : 'hidden'}`}
      >
        {this.state.loading ? <Loading positionFixed="true" /> : null}
        <div
          className={`table-toolbar d-flex flex-wrap justify-content-between p-0 ${
            !this.state.isEdit &&
            (this.state.creditCardList.length ||
              pathname === '/account/paymentMethod')
              ? ''
              : 'hidden-xxl-down'
          }`}
        >
          <span className="t-gray">
            {creditCardList.length > 1 ? (
              <FormattedMessage
                id="creditCardTipMany"
                values={{ number: <b>{creditCardList.length}</b> }}
              />
            ) : (
              <FormattedMessage
                id="creditCardTip"
                values={{ number: <b>{creditCardList.length}</b> }}
              />
            )}
          </span>
          {/* <span
            className="red font-weight-normal ui-cursor-pointer d-flex align-items-center"
            onClick={() => {
              this.setState({ isEdit: true }, () => {
                this.scrollToPaymentComp();
              });
              this.initCardInfo();
            }}
          >
            <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus"></span>
            <span style={{ marginTop: -3 }}>
              <FormattedMessage id="addNewCreditCard" />
            </span>
          </span> */}
        </div>
        {/* <div className="addbox" onClick={() => this.openCreatePage()}>
          <div id="cross"></div>
        </div> */}
        <div></div>
        {!this.state.isEdit &&
        (this.state.creditCardList.length ||
          pathname === '/account/paymentMethod') ? (
          this.state.listLoading ? (
            <div className="mt-4">
              <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
            </div>
          ) : this.state.listErr ? (
            <div className="text-center p-4">{this.state.listErr}</div>
          ) : (
            <>
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

              {creditCardList.map((el, idx) => {
                return (
                  <div
                    className={`rounded pl-2 pr-2 creditCompleteInfoBox position-relative ui-cursor-pointer border ${
                      el.selected ? 'active border-blue' : ''
                    } ${
                      idx !== creditCardList.length - 1 ? 'border-bottom-0' : ''
                    }`}
                    key={idx}
                    onClick={() => {
                      if (pathname !== '/account/paymentMethod') {
                        if (creditCardList[idx].selected) return;
                        creditCardList.map((el) => (el.selected = false));
                        el.selected = true;
                        // this.props.getSelectedValue &&
                        //   this.props.getSelectedValue(el);
                        this.props.getSelectedValue &&
                          this.props.getSelectedValue({});
                        this.setState({
                          creditCardList,
                          isCurrentCvvConfirm: false
                        });
                        if (this.props.isApplyCvv) {
                          this.setState({
                            currentCvv: ''
                          });
                        }
                      }
                    }}
                  >
                    <div className={`pt-3 pb-3`}>
                      <div
                        className="position-absolute"
                        style={{ right: '1%', top: '2%', zIndex: '1' }}
                      >
                        <span
                          className={`pull-right position-relative ${
                            this.props.canEdit ? 'border-left' : ''
                          } pl-2 ui-cursor-pointer-pure`}
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
                            confirm={(e) => this.deleteCard(el)}
                            updateChildDisplay={(status) =>
                              this.updateConfirmTooltipVisible(el, status)
                            }
                          />
                        </span>
                        {this.props.canEdit && (
                          <span
                            className="pull-right ui-cursor-pointer-pure"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              let creditCardInfoForm = { ...el };
                              creditCardInfoForm.cardCvv = '';
                              creditCardInfoForm.cardNumber = creditCardInfoForm.paymentMethod
                                ? creditCardInfoForm.paymentMethod.bin_number +
                                  '****' +
                                  creditCardInfoForm.paymentMethod.last_4_digits
                                : '';
                              creditCardInfoForm.cardMmyy = creditCardInfoForm.paymentMethod
                                ? creditCardInfoForm.paymentMethod.expiration_date.substr(
                                    0,
                                    3
                                  ) +
                                  creditCardInfoForm.paymentMethod.expiration_date.substr(
                                    5
                                  )
                                : '';
                              creditCardInfoForm.cardOwner = creditCardInfoForm.paymentMethod
                                ? creditCardInfoForm.paymentMethod.holder_name
                                : '';
                              this.setState(
                                {
                                  isEdit: true,
                                  creditCardInfoForm,
                                  currentEditOriginCardInfo: Object.assign(
                                    {},
                                    creditCardInfoForm
                                  )
                                },
                                () => {
                                  this.scrollToPaymentComp();
                                }
                              );
                            }}
                          >
                            <FormattedMessage id="edit" />
                          </span>
                        )}
                      </div>
                      <div className="row">
                        <div
                          className={`col-6 col-sm-3 d-flex flex-column justify-content-center `}
                        >
                          <img
                            className="PayCardImgFitScreen"
                            src={
                              CREDIT_CARD_IMG_ENUM[
                                el.paymentMethod ? el.paymentMethod.vendor : ''
                              ]
                                ? CREDIT_CARD_IMG_ENUM[
                                    el.paymentMethod
                                      ? el.paymentMethod.vendor
                                      : ''
                                  ]
                                : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                            }
                          />
                        </div>
                        <div
                          className={`col-12 col-sm-9 flex-column justify-content-around`}
                          style={{
                            display:
                              pathname === '/payment/payment'
                                ? 'flex '
                                : 'none '
                          }}
                        >
                          <div className="row ui-margin-top-1-md-down  PayCardBoxMargin">
                            <div
                              className={`col-12 color-999 ${
                                el.selected && !isCurrentCvvConfirm
                                  ? ''
                                  : 'hidden'
                              }`}
                            >
                              <span style={{ fontSize: '14px' }}>
                                <FormattedMessage id="name2" />
                              </span>
                              <br />
                              <span className="creditCompleteInfo">
                                {el.paymentMethod
                                  ? el.paymentMethod.holder_name
                                  : el.cardOwner}
                              </span>
                            </div>
                            <div
                              className={`col-12 color-999 ${
                                el.selected && !isCurrentCvvConfirm
                                  ? ''
                                  : 'hidden'
                              }`}
                            >
                              <span
                                style={{ fontSize: '14px' }}
                                className="fontFitSCreen"
                              >
                                <FormattedMessage id="CVV" />
                              </span>
                              <br />
                              <div
                                className="col-4 color-999 pl-0 text-left"
                                style={{
                                  marginBottom: '5px'
                                }}
                              >
                                <input
                                  onChange={(e) => {
                                    this.currentCvvChange(e);
                                  }}
                                  type="password"
                                  maxLength="3"
                                  style={{ width: '100%' }}
                                  value={this.state.currentCvv}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row ui-margin-top-1-md-down PayCardBoxMargin">
                            <div className="col-md-4 col-6 color-999">
                              <span
                                style={{ fontSize: '14px' }}
                                className="fontFitSCreen"
                              >
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
                            <div className="col-md-4 col-6 border-left color-999">
                              <span
                                className="fontFitSCreen"
                                style={{ fontSize: '14px' }}
                              >
                                <FormattedMessage id="payment.cardType" />
                              </span>
                              <br />
                              <span className="creditCompleteInfo fontFitSCreen">
                                {el.paymentMethod
                                  ? el.paymentMethod.card_type
                                  : el.cardType}
                              </span>
                            </div>
                            {this.props.isApplyCvv && (
                              <div
                                className="col-md-4 col-12 border-left color-999"
                                data-aa={`${el.selected}`}
                              >
                                <button
                                  className={`rc-btn rc-btn--two ${
                                    el.selected && !isCurrentCvvConfirm
                                      ? ''
                                      : 'hidden'
                                  }`}
                                  style={{
                                    padding: '.2rem 1.6rem',
                                    marginTop: '20px',
                                    float: 'right'
                                  }}
                                  onClick={(e) => {
                                    this.confirmCvv(e, el);
                                  }}
                                >
                                  <FormattedMessage id="payment.apply" />
                                </button>
                                <img
                                  src={successImg}
                                  style={{
                                    display:
                                      el.selected && isCurrentCvvConfirm
                                        ? 'block'
                                        : 'none',
                                    width: '25px',
                                    float: 'right',
                                    marginTop: '20px'
                                  }}
                                />
                                {/* <FormattedMessage id="payment.cardType" /><br />
                                  <span className="creditCompleteInfo">{el.cardType}</span> */}
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className={`col-12 col-sm-9 flex-column justify-content-around`}
                          style={{
                            display:
                              pathname !== '/payment/payment' ? 'flex ' : 'none'
                          }}
                        >
                          <div className="row ui-margin-top-1-md-down">
                            <div className="col-12 color-999">
                              <span style={{ fontSize: '14px' }}>
                                <FormattedMessage id="name2" />
                              </span>
                              <br />
                              <span className="creditCompleteInfo">
                                {el.paymentMethod &&
                                  el.paymentMethod.holder_name}
                              </span>
                            </div>
                          </div>
                          <div className="row ui-margin-top-1-md-down">
                            <div className="col-6 color-999">
                              <span style={{ fontSize: '14px' }}>
                                <FormattedMessage id="payment.cardNumber2" />
                              </span>
                              <br />
                              <span className="creditCompleteInfo">
                                xxxx xxxx xxxx{' '}
                                {/* {el.cardNumber
                                  ? el.cardNumber.substring(
                                      el.cardNumber.length - 4
                                    )
                                  : ''} */}
                                {el.paymentMethod &&
                                  el.paymentMethod.last_4_digits}
                              </span>
                            </div>
                            <div className="col-6 border-left color-999">
                              <span style={{ fontSize: '14px' }}>
                                <FormattedMessage id="payment.cardType" />
                              </span>
                              <br />
                              <span className="creditCompleteInfo">
                                {/* {el.cardType} */}
                                {el.paymentMethod && el.paymentMethod.card_type}
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
                    node.style.setProperty(
                      'border-width',
                      '.1rem',
                      'important'
                    );
                    node.style.setProperty(
                      'border-style',
                      'dashed',
                      'important'
                    );
                  }
                }}
                onClick={() => {
                  this.setState({ isEdit: true }, () => {
                    this.scrollToPaymentComp();
                  });
                  this.initCardInfo();
                }}
              >
                <a className="rc-styled-link">
                  <FormattedMessage id="addNewCreditCard" />
                </a>
              </div>
            </>
          )
        ) : null}
        <div
          className={`credit-card-content ${
            this.state.isEdit ||
            (!this.state.creditCardList.length &&
              pathname !== '/account/paymentMethod')
              ? ''
              : 'hidden'
          }`}
          id="credit-card-content"
        >
          <div
            className={`creditCompleteInfoBox pb-3 ${
              this.state.completeCardShow &&
              !this.state.creditCardList.length &&
              pathname !== '/account/paymentMethod'
                ? ''
                : 'hidden'
            }`}
          >
            <p>
              <span
                className="pull-right ui-cursor-pointer-pure mr-2"
                onClick={() => {
                  this.setState({
                    completeCardShow: false
                  });
                }}
                style={{ position: 'relative', top: -9 }}
              >
                <FormattedMessage id="edit" />
              </span>
            </p>
            <div className="row">
              <div className="col-6 col-sm-3 d-flex flex-column justify-content-center">
                <img
                  src={
                    CREDIT_CARD_IMG_ENUM[currentCardInfo.vendor]
                      ? CREDIT_CARD_IMG_ENUM[currentCardInfo.vendor]
                      : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                  }
                />
              </div>
              <div className="col-12 col-sm-9 d-flex flex-column justify-content-around">
                <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                  <div className="col-12 color-999">
                    <FormattedMessage id="name2" />
                    <br />
                    <span className="creditCompleteInfo">
                      {currentCardInfo.cardOwner}
                    </span>
                  </div>
                </div>
                <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                  <div className="col-6 color-999">
                    <FormattedMessage id="payment.cardNumber2" />
                    <br />
                    <span className="creditCompleteInfo">
                      xxxx xxxx xxxx{' '}
                      {currentCardInfo.cardNumber
                        ? currentCardInfo.cardNumber.substring(
                            currentCardInfo.cardNumber.length - 4
                          )
                        : ''}
                    </span>
                  </div>
                  <div className="col-6 color-999">
                    <FormattedMessage id="payment.cardTypecardType" />
                    <br />
                    <span className="creditCompleteInfo">
                      {currentCardInfo.cardType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`credit-card-form ${
              !this.state.completeCardShow ? '' : 'hidden'
            }`}
          >
            <div className="rc-margin-bottom--xs">
              <div className="content-asset">
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
                      onClick={() => {
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
                <p className="m-0">{CreditCardImg}</p>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="cardNumber">
                      <FormattedMessage id="payment.cardNumber" />
                      <span style={{ color: 'red' }}>*</span>
                      <div className="cardFormBox">
                        <span className="cardImage">
                          <img
                            alt="Card"
                            src={
                              CREDIT_CARD_IMG_ENUM[this.state.currentVendor]
                                ? CREDIT_CARD_IMG_ENUM[this.state.currentVendor]
                                : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                            }
                          />
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
                                    onChange={(e) =>
                                      this.cardInfoInputChange(e)
                                    }
                                    onKeyUp={(e) => {
                                      this.cardNumberChange(e);
                                    }}
                                    onFocus={(e) => {
                                      this.cardNumberFocus();
                                    }}
                                    onBlur={(e) => {
                                      this.cardNumberBlur();
                                    }}
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
                                    onChange={(e) =>
                                      this.cardInfoInputChange(e)
                                    }
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
                                    onChange={(e) =>
                                      this.cardInfoInputChange(e)
                                    }
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
                        onChange={(e) => this.cardInfoInputChange(e)}
                        onBlur={(e) => this.inputBlur(e)}
                        maxLength="40"
                      />
                      <label
                        className="rc-input__label"
                        htmlFor="cardOwner"
                      ></label>
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
                        onChange={(e) => this.cardInfoInputChange(e)}
                        onBlur={(e) => this.inputBlur(e)}
                        name="email"
                        maxLength="254"
                      />
                      <label
                        className="rc-input__label"
                        htmlFor="email"
                      ></label>
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
                        onChange={(e) => this.cardInfoInputChange(e)}
                        onBlur={(e) => this.inputBlur(e)}
                        name="phoneNumber"
                        maxLength="2147483647"
                      />
                      <label
                        className="rc-input__label"
                        htmlFor="phoneNumber"
                      ></label>
                    </span>
                    <div className="invalid-feedback">
                      <FormattedMessage id="payment.errorInfo2" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="text-right">
                  <div
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
                    {creditCardInfoForm.isDefault ? (
                      <input
                        type="checkbox"
                        className="rc-input__checkbox"
                        value={creditCardInfoForm.isDefault}
                        key="1"
                        checked
                      />
                    ) : (
                      <input
                        type="checkbox"
                        className="rc-input__checkbox"
                        value={creditCardInfoForm.isDefault}
                        key="2"
                      />
                    )}
                    <label className="rc-input__label--inline text-break">
                      <FormattedMessage id="setDefaultPaymentMethod" />
                    </label>
                  </div>
                  <a
                    className="rc-styled-link editPersonalInfoBtn"
                    name="contactInformation"
                    style={{
                      display:
                        this.state.creditCardList.length ||
                        pathname === '/account/paymentMethod'
                          ? 'inline-block'
                          : 'none'
                    }}
                    onClick={() => {
                      this.initCardInfo();
                      this.setState({ isEdit: false, currentCvv: '' });
                      // this.scrollToPaymentComp();
                    }}
                  >
                    <FormattedMessage id="cancel" />
                  </a>
                  &nbsp;
                  <span
                    style={{
                      display:
                        this.state.creditCardList.length ||
                        pathname === '/account/paymentMethod'
                          ? 'inline-block'
                          : 'none'
                    }}
                  >
                    <FormattedMessage id="or" />
                  </span>
                  &nbsp;
                  <button
                    className="rc-btn rc-btn--one submitBtn editAddress"
                    data-sav="false"
                    name="contactInformation"
                    type="submit"
                    onClick={(e) => this.handleSave(e)}
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

export default injectIntl(PaymentComp);
