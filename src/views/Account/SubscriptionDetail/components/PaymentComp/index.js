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
  getWays,
  setDefaltCard
} from '@/api/payment';
import Loading from '@/components/Loading';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import AdyenEditForm from '@/components/Adyen/form';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import './index.css';
import LazyLoad from 'react-lazyload';
import classNames from 'classnames';

import { myAccountActionPushEvent } from '@/utils/GA';
import PaymentEditForm from '@/components/PaymentEditForm';

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
            <p className="mb-0">{data.paymentVendor}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

@inject('loginStore', 'paymentStore')
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
      supportPaymentMethods: [],
      defaultCardTypeVal: ''
    };
  }
  async componentDidMount() {
    getWays().then((res) => {
      this.setState({
        paymentType: res?.context?.name
      });
      // if (res?.context?.name === 'ADYEN') {
      //   this.setState({
      //     paymentType: 'ADYEN'
      //   });
      // }
      // if (this.state.paymentType === 'PAYU') {
      //   this.updateInitStatus(true);
      // }
      const supportPaymentMethods =
        res?.context?.payPspItemVOList[0]?.payPspItemCardTypeVOList || [];
      this.props.paymentStore.setSupportPaymentMethods(supportPaymentMethods);
      this.setState(
        { defaultCardTypeVal: supportPaymentMethods[0]?.cardType },
        () => {
          this.onCardTypeValChange({
            cardTypeVal: this.state.defaultCardTypeVal
          });
        }
      );
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
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  onCardTypeValChange = ({ cardTypeVal }) => {
    const { paymentStore } = this.props;
    paymentStore.setCurrentCardTypeInfo(
      paymentStore.supportPaymentMethods.filter(
        (s) => s.cardType === cardTypeVal
      )[0] || null
    );
  };
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
  //是否有卡被选中
  isCreditCardListSelected = () => {
    const { creditCardList } = this.state;
    return creditCardList.some((el) => el.selected);
  };
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
  async toggleSetDefault(item, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (!item.isDefault) {
      await setDefaltCard(item.id);
      this.getPaymentMethodList({ showLoading: false });
    }
  }
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
        ></div>
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
                    className="col-12 col-md-6 p-2 ui-cursor-pointer-pure"
                    key={el.id}
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
                              onClick={this.toggleSetDefault.bind(this, el)}
                            >
                              <span className="iconfont mr-1">&#xe68c;</span>
                              <span className="rc-styled-link red border-danger">
                                <FormattedMessage id="default" />
                              </span>
                            </div>
                          ) : (
                            <div
                              className="ui-cursor-pointer"
                              onClick={this.toggleSetDefault.bind(this, el)}
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
            </>
          )
        ) : null}
        {!this.state.isEdit && (
          <div className="text-right" style={{ marginTop: '.625rem' }}>
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
              disabled={!this.isCreditCardListSelected()}
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

        {this.state.isEdit || !creditCardList.length ? (
          <PaymentEditForm
            defaultCardTypeVal={this.state.defaultCardTypeVal}
            backPage={this.state.fromPage}
            hideMyself={this.handleHideEditForm}
            refreshList={this.getPaymentMethodList}
            paymentType={this.state.paymentType}
            supportPaymentMethods={this.state.supportPaymentMethods}
            needEmail={this.props.needEmail}
            needPhone={this.props.needPhone}
            paymentStore={this.props.paymentStore}
            onCardTypeValChange={this.onCardTypeValChange}
          />
        ) : null}
      </div>
    );
  }
}

export default injectIntl(PaymentComp);
