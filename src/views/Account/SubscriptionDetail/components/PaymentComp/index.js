// 订阅卡列表+卡form页
import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import {
  getPaymentMethod,
  deleteCard,
  addOrUpdatePaymentMethod,
  getWays
} from '@/api/payment';
import Loading from '@/components/Loading';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import AdyenEditForm from '@/components/Adyen/form';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import './index.css';
import LazyLoad from 'react-lazyload';
import classNames from 'classnames';
import { computedSupportPaymentMethods } from '@/utils/utils';

import { myAccountActionPushEvent } from '@/utils/GA';
import PaymentEditForm from '@/components/PaymentEditForm';
import { CardTypeDesc } from '@/utils/constant/cyber.js';

function CardItem(props) {
  const { data } = props;
  return (
    <div
      className={`rc-bg-colour--brand4 rounded p-2 pl-3 pr-3 h-100 d-flex align-items-center justify-content-between creditCompleteInfoBox ${
        data.selected ? 'active border-blue border' : ''
      }`}
      style={{ position: 'relative' }}
      onClick={() => {
        props.handleClick();
      }}
    >
      <div
        className="position-absolute d-flex align-items-center"
        style={{ right: '2%', top: '2%', zIndex: 9 }}
      >
        {props.operateBtnJSX}
      </div>
      <div className={`pt-4 pt-md-2 pb-2 w-100`}>
        <div className="row">
          <div className={`col-4 d-flex flex-column justify-content-center`}>
            <LazyLoad height={200}>
              <img
                className="PayCardImgFitScreen"
                style={{ height: '5rem' }}
                src={
                  CREDIT_CARD_IMG_ENUM[data.paymentVendor.toUpperCase()] ||
                  'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                }
                alt="pay-card-img-fit-screen"
              />
            </LazyLoad>
          </div>
          <div className="col-6 pl-0 pr-0">
            <p className="mb-0">{data.holderName}</p>
            <p className="mb-0">
              ************
              {data.lastFourDigits}
            </p>
            <p className="mb-0">{CardTypeDesc[data.cardType]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

@inject('loginStore')
@injectIntl
@observer
class PaymentComp extends React.Component {
  static defaultProps = {
    needReConfirmCVV: false,
    canEdit: false // 是否可以编辑卡
  };
  constructor(props) {
    super(props);
    this.state = {
      // 111
      fromPage: '',
      paymentType: 'CYBER',
      supportPaymentMethods: [],
      editFormVisible: false,
      listVisible: false,
      listLoading: false,
      creditCardList: [],
      successMsg: '',
      getPaymentMethodListFlag: false,
      // 111

      inted: false,
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
      isCurrentCvvConfirm: false,
      currentCardInfo: {},
      completeCardShow: false,
      currentEditOriginCardInfo: null,
      paymentType: 'PAYU', // PAYU ADYEN
      supportPaymentMethods: []
    };
  }
  async componentDidMount() {
    getWays().then((res) => {
      this.setState({
        paymentType: res?.context?.name,
        supportPaymentMethods: computedSupportPaymentMethods(
          res?.context?.supportPaymentMethods || []
        )
      }); //PAYU,ADYEN,CYBER
    });
    await this.getPaymentMethodList();
    if (this.state.creditCardList.length) {
      this.state.creditCardList.map((el) => {
        if (el.id === this.props.paymentId) {
          el.selected = true;
        }
        return el;
      });
    }
    this.setState({ creditCardList: this.state.creditCardList });
    const waysRes = await getWays();
    if (waysRes.context && waysRes.context.name === 'ADYEN') {
      this.setState({
        paymentType: 'ADYEN'
      });
    }
    if (this.state.paymentType === 'PAYU') {
      this.updateInitStatus(true);
    }
    this.setState({
      supportPaymentMethods: computedSupportPaymentMethods(
        waysRes?.context?.supportPaymentMethods || []
      )
    });
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  // 111
  handleHideEditForm = ({ closeListPage }) => {
    this.changeEditFormVisible(false);
    this.changeListVisible(!closeListPage);
  };
  changeListVisible = (status) => {
    this.setState({ listVisible: status, isEdit: false });
  };
  changeEditFormVisible = (status) => {
    this.setState({ editFormVisible: status, isEdit: false });
  };
  getPaymentMethodList = async (msg, { showLoading = true } = {}) => {
    try {
      showLoading && this.setState({ listLoading: true });
      const res = await getPaymentMethod();
      this.setState({
        creditCardList: res.context || []
      });
      if (msg) {
        this.setState(
          {
            successMsg: msg, // 获取保存地址返回的提示成功信息
            getPaymentMethodListFlag: true
          },
          () => {
            this.clearSuccessMsg();
          }
        );
      }
    } catch (err) {
      this.setState({ listErr: err.message });
    } finally {
      this.setState({
        loading: false,
        listLoading: false
      });
    }
  };
  // 提示成功信息
  clearSuccessMsg = () => {
    setTimeout(() => {
      this.setState({
        successMsg: '',
        getPaymentMethodListFlag: false
      });
    }, 5000);
  };
  // 111
  updateInitStatus = (val) => {
    this.setState({ inited: val });
  };
  async getPaymentMethodList() {
    this.setState({ listLoading: true });
    try {
      const res = await getPaymentMethod();
      this.setState({ creditCardList: res.context || [] });
    } catch (err) {
      this.setState({ listErr: err.message.toString() });
    } finally {
      this.setState({
        loading: false,
        listLoading: false
      });
    }
  }
  initCardInfo() {
    this.setState({
      creditCardInfoForm: {
        cardNumber: '',
        cardMmyy: '',
        cardCvv: '',
        cardOwner: '',
        email: '',
        phoneNumber: '',
        identifyNumber: '111',
        isDefault: false
      }
    });
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    });
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 3000);
  };
  scrollToErrorMsg() {
    const widget = document.querySelector('.content-asset');
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
  }
  currentCvvChange(e) {
    let { creditCardList } = this.state;
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    creditCardList.filter((el) => el.selected)[0].cardCvv = value;
    this.setState(
      {
        creditCardList: creditCardList
      },
      () => {
        this.props.getSelectedValue &&
          this.props.getSelectedValue(
            this.state.creditCardList.filter((el) => el.selected)[0]
          );
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
        !/^\w+([-_.]?\w+)*@\w+([-]?\w+)*(\.\w{2,6})+$/.test(
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
        binNumber: res ? res.data.bin_number : '',
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
      } else {
        // params.id = addRes.context.id
        await this.getPaymentMethodList();
        this.setState({
          isEdit: false,
          loading: false,
          currentCardInfo: addRes.context,
          creditCardInfoForm: addRes.context,
          completeCardShow: true
        });
        this.props.getSelectedValue &&
          this.props.getSelectedValue(creditCardInfoForm);
      }
      this.props.save(addRes.context);
      this.setState({
        creditCardList: this.state.creditCardList
      });
    } catch (e) {
      let res = e.response;
      this.setState({
        loading: false
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

    await deleteCard({ id: el.id })
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
  _renderErrJSX = () => {
    return (
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
    );
  };
  addBtnJSX = () => {
    return (
      <div
        className="rounded p-4 border h-100 d-flex align-items-center justify-content-center"
        // onClick={this.handleClickAddBtn.bind(this, fromPage)}
        onClick={() => {
          this.setState({ isEdit: true }, () => {
            this.scrollToPaymentComp();
          });
          this.initCardInfo();
        }}
        ref={(node) => {
          if (node) {
            node.style.setProperty('border-width', '.1rem', 'important');
            node.style.setProperty('border-style', 'dashed', 'important');
          }
        }}
        style={{ lineHeight: 0.4 }}
      >
        <div>
          <span className="rc-icon rc-plus--xs rc-iconography plus-icon" />
          <FormattedMessage id="addANewPaymentMethod" />
        </div>
      </div>
    );
  };
  render() {
    const { needEmail, needPhone } = this.props;
    const {
      creditCardInfoForm,
      creditCardList,
      currentCardInfo,
      supportPaymentMethods
    } = this.state;
    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {supportPaymentMethods.map((el, idx) => (
          <LazyLoad>
            <img
              key={idx}
              className="logo-payment-card"
              src={el.img}
              alt="logo-payment-card"
            />
          </LazyLoad>
        ))}
      </span>
    );
    const { isLogin } = this.props.loginStore;

    return (
      <div
        id="PaymentComp"
        style={{
          display: this.props.type === 'PaymentComp' ? 'block' : 'none'
        }}
      >
        <div className="rc-border-bottom rc-border-colour--interface mb-3">
          <h4 className="rc-delta rc-margin--none">
            <FormattedMessage id="paymentMethod" />
          </h4>
        </div>
        {this.state.loading ? <Loading positionFixed="true" /> : null}
        <div
          className={`table-toolbar d-flex flex-wrap justify-content-between p-0 ${
            !this.state.isEdit && this.state.creditCardList.length
              ? ''
              : 'hidden-xxl-down'
          }`}
        >
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
        {!this.state.isEdit && this.state.creditCardList.length ? (
          this.state.listLoading ? (
            <div className="mt-4">
              <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
            </div>
          ) : this.state.listErr ? (
            <div className="text-center p-4">{this.state.listErr}</div>
          ) : (
            <>
              {this._renderErrJSX()}

              <div className={classNames('row', 'ml-0', 'mr-0')}>
                {creditCardList.map((el, idx) => (
                  <div
                    className="col-12 col-md-6 p-2"
                    key={el.id}
                    style={{ cursor: 'pointer' }}
                  >
                    <CardItem
                      data={el}
                      idx={idx}
                      dataLength={creditCardList.length}
                      handleClick={() => {
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
                      }}
                      operateBtnJSX={
                        <>
                          {el.isDefault === 1 ? (
                            <div
                              className="red"
                              // onClick={this.toggleSetDefault.bind(this, el)}
                            >
                              <span className="iconfont mr-1">&#xe68c;</span>
                              <span className="rc-styled-link red border-danger">
                                <FormattedMessage id="default" />
                              </span>
                            </div>
                          ) : (
                            <div
                              className="ui-cursor-pointer"
                              // onClick={this.toggleSetDefault.bind(this, el)}
                            >
                              <span className="iconfont mr-1">&#xe68c;</span>
                              <span className="rc-styled-link">
                                <FormattedMessage id="setAsDefault" />
                              </span>
                            </div>
                          )}
                          <span
                            className={`position-relative p-2 ui-cursor-pointer-pure`}
                          >
                            <span
                              className="rc-styled-link"
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
                        </>
                      }
                    />
                  </div>
                ))}
                <div className="col-12 col-md-6 p-2 rounded text-center p-2 ui-cursor-pointer">
                  {this.addBtnJSX()}
                </div>
              </div>
              {/* {creditCardList.map((el, idx) => {
                return (
                  <div
                    className={`rounded pl-2 pr-2 creditCompleteInfoBox position-relative ui-cursor-pointer border ${
                      el.selected ? 'active border-blue' : ''
                    } ${
                      idx !== creditCardList.length - 1 ? 'border-bottom-0' : ''
                    }`}
                    key={idx}
                    onClick={() => {
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
                          className={`col-6 col-sm-3 d-flex flex-column justify-content-center`}
                        >
                          <img
                            alt=""
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
                        </div>
                        <div
                          className={`col-12 col-sm-9 flex-column justify-content-around d-flex`}
                        >
                          <div className="row ui-margin-top-1-md-down">
                            <div className={`col-12 color-999`}>
                              <span style={{ fontSize: '.875rem' }}>
                                <FormattedMessage id="name2" />
                              </span>
                              <br />
                              <span className="creditCompleteInfo">
                                {el.paymentMethod
                                  ? el.paymentMethod.holder_name
                                  : el.cardOwner}
                              </span>
                            </div>
                            {this.props.needReConfirmCVV && (
                              <div
                                className={`col-12 color-999 ${
                                  el.selected ? '' : 'hidden'
                                }`}
                              >
                                <span style={{ fontSize: '.875rem' }}>
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
                                    maxLength="4"
                                    style={{ width: '100%' }}
                                    value={
                                      this.state.creditCardList.filter(
                                        (c) => c.selected
                                      )[0]
                                        ? this.state.creditCardList.filter(
                                            (c) => c.selected
                                          )[0].cardCvv
                                        : ''
                                    }
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="row ui-margin-top-1-md-down">
                            <div className="col-6 color-999">
                              <span style={{ fontSize: '.875rem' }}>
                                <FormattedMessage id="payment.cardNumber2" />
                              </span>
                              <br />
                              <span className="creditCompleteInfo">
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
                              <span style={{ fontSize: '.875rem' }}>
                                <FormattedMessage id="payment.cardType" />
                              </span>
                              <br />
                              <span className="creditCompleteInfo">
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
              })} */}

              {/* <div
                className={`p-4 border text-center mt-2 rounded ui-cursor-pointer font-weight-normal ${
                  this.state.inited
                    ? ''
                    : 'ui-btn-loading ui-btn-loading-border-red'
                }`}
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
              </div> */}
            </>
          )
        ) : null}
        {!this.state.isEdit && (
          <div className="text-right" style={{ marginTop: '.625rem' }}>
            {/* <button
              className="rc-btn rc-btn--sm rc-btn--two"
              onClick={() => this.props.cancel()}
            >
              Cancel
            </button> */}
            <a
              className="rc-styled-link editPersonalInfoBtn"
              onClick={() => {
                this.props.cancel();
                // this.scrollToPaymentComp();
              }}
            >
              <FormattedMessage id="cancel" />
            </a>
            &nbsp;
            <span>
              <FormattedMessage id="or" />
            </span>
            &nbsp;
            <button
              className="rc-btn rc-btn--sm rc-btn--one"
              onClick={() => {
                const selectedItem = creditCardList.filter(
                  (el) => el.selected
                )[0];
                if (this.props.needReConfirmCVV && !selectedItem.cardCvv) {
                  this.showErrorMsg(this.props.intl.messages['payment.errTip']);
                  return;
                }
                this.props.save(selectedItem);
              }}
            >
              <FormattedMessage id="save" />
            </button>
          </div>
        )}

        {/* <div
          className="credit-card-content"
          id="credit-card-content"
          style={{
            display:
              this.state.isEdit || !creditCardList.length ? 'block' : 'none'
          }}
        >
          {this._renderErrJSX()}
          {this.state.paymentType === 'ADYEN' ? (
            <AdyenEditForm
              showCancelBtn={creditCardList.length > 0}
              queryList={() => this.getPaymentMethodList()}
              updateFormVisible={(val) => {
                this.setState({ isEdit: val });
              }}
              updateInitStatus={this.updateInitStatus}
              enableStoreDetails={true}
              showErrorMsg={this.showErrorMsg}
              mustSaveForFutherPayments={true}
            />
          ) : (
            <>
              <div
                className={`creditCompleteInfoBox pb-3`}
                style={{
                  display:
                    this.state.completeCardShow &&
                    !this.state.creditCardList.length
                      ? 'block'
                      : 'none'
                }}
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
                    <LazyLoad>
                      <img
                        src={
                          CREDIT_CARD_IMG_ENUM[currentCardInfo.vendor]
                            ? CREDIT_CARD_IMG_ENUM[
                                currentCardInfo.vendor.toUpperCase()
                              ]
                            : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                        }
                        alt="card-background"
                      />
                    </LazyLoad>
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
                        <FormattedMessage id="payment.cardType" />
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
                className="credit-card-form "
                style={{
                  display: !this.state.completeCardShow ? 'block' : 'none'
                }}
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
                    <p>
                      <FormattedMessage id="payment.acceptCards" />
                      {CreditCardImg}
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label
                          className="form-control-label w-100"
                          htmlFor="cardNumber"
                        >
                          <FormattedMessage id="payment.cardNumber" />
                          <span className="red">*</span>
                          <div className="cardFormBox">
                            <span className="cardImage">
                              <LazyLoad>
                                <img
                                  alt="Card"
                                  // src="https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                                  src={
                                    CREDIT_CARD_IMG_ENUM[
                                      this.state.currentVendor
                                    ]
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
                                          // this.props.intl.messages.cardNumber
                                          'MM/YY'
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
                    ) : null}
                  </div>
                  <div className="text-right">
                    <div
                      className="rc-input rc-input--inline"
                      style={{
                        marginTop: '.625rem',
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
                          checked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          className="rc-input__checkbox"
                          value={creditCardInfoForm.isDefault}
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
                        display: this.state.creditCardList.length
                          ? 'inline-block'
                          : 'none'
                      }}
                      onClick={() => {
                        if (this.state.creditCardList.length) {
                          this.initCardInfo();
                          this.setState({ isEdit: false });
                        } else {
                          this.props.cancel();
                        }
                        // this.scrollToPaymentComp();
                      }}
                    >
                      <FormattedMessage id="cancel" />
                    </a>
                    &nbsp;
                    <span
                      style={{
                        display: this.state.creditCardList.length
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
            </>
          )}
        </div> */}

        <div
          style={{
            display:
              this.state.isEdit || !creditCardList.length ? 'block' : 'none'
          }}
        >
          <PaymentEditForm
            backPage={this.state.fromPage}
            hideMyself={this.handleHideEditForm}
            refreshList={this.getPaymentMethodList}
            paymentType={this.state.paymentType}
            supportPaymentMethods={this.state.supportPaymentMethods}
            needEmail={this.props.needEmail}
            needPhone={this.props.needPhone}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(PaymentComp);
