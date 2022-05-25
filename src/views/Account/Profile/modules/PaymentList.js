// 卡列表页+卡form页
import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import Loading from '@/components/Loading';
import { inject, observer } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import {
  getPaymentMethod,
  deleteCard,
  getWays,
  setDefaltCard
} from '@/api/payment';
import {
  PAYMENT_METHOD_PAU_ACCOUNT_RULE,
  PAYMENT_METHOD_PAU_CHECKOUT_RULE
} from '@/utils/constant';
import PaymentEditForm from '@/components/PaymentEditForm';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { myAccountPushEvent, myAccountActionPushEvent } from '@/utils/GA';
import getCardImg from '@/lib/get-card-img';
import { handleEmailShow } from '@/utils/utils';

function CardItem(props) {
  const { data, listVisible, supportPaymentMethods } = props;
  return (
    <div
      className={`${
        data?.paddingFlag
          ? 'creditCompleteInfoBox disabled'
          : 'rc-bg-colour--brand4'
      } rounded p-2 px-3 h-100 d-flex align-items-center justify-content-between`}
    >
      <div
        className="position-absolute d-flex align-items-center"
        style={{ right: '2%', top: '2%' }}
      >
        {props.operateBtnJSX}
      </div>
      <div
        className={[
          'pt-4',
          'pb-2',
          'w-100',
          listVisible ? 'md:pt-4' : 'md:pt-2'
        ].join(' ')}
      >
        <div className="row">
          <div className={`col-4 d-flex flex-column justify-content-center`}>
            <LazyLoad height={100}>
              <img
                className="PayCardImgFitScreen w-100"
                src={getCardImg({
                  supportPaymentMethods,
                  currentVendor: data.paymentVendor || data.paymentItem
                })}
                alt="pay card img fit screen"
              />
            </LazyLoad>
          </div>
          {data.paymentItem?.toLowerCase() === 'adyen_paypal' ? (
            <div className="col-8 px-0 my-6 truncate">
              {handleEmailShow(data.email)}
            </div>
          ) : (
            <div className="col-6 px-0">
              <p className="mb-0">{data.holderName}</p>
              <p className="mb-0">
                ************
                {data.lastFourDigits}
              </p>
              <p className="mb-0">{data.paymentVendor}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

@inject('loginStore', 'paymentStore')
@injectIntl
@observer
class PaymentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listVisible: false,
      editFormVisible: false,
      loading: false,
      listLoading: false,
      creditCardList: [], //绑定的银行卡列表
      fromPage: 'cover',
      paymentType: 'PAYU', //PAYU,ADYEN,CYBER 支付方式
      errorMsg: '',
      successMsg: '',
      getPaymentMethodListFlag: false,
      defaultCardTypeVal: '' //默认卡类型，如visa，amex, discover
    };

    this.handleClickDeleteBtn = this.handleClickDeleteBtn.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.handleClickAddBtn = this.handleClickAddBtn.bind(this);
    this.toggleSetDefault = this.toggleSetDefault.bind(this);
    this.timer = '';
  }
  componentDidMount() {
    const { paymentStore } = this.props;
    const { setPayWayNameArr, serCurPayWayVal, setSupportPaymentMethods } =
      paymentStore;
    this.getPaymentMethodList(); //获取绑卡列表
    getWays().then((res) => {
      this.setState({
        paymentType: res?.context?.name
      });
      const payPspItemVOList = res?.context?.payPspItemVOList || [];
      const supportPaymentMethods =
        payPspItemVOList[0]?.payPspItemCardTypeVOList || [];
      setPayWayNameArr(payPspItemVOList);
      setSupportPaymentMethods(supportPaymentMethods); //存储当前支付方式所支持的卡类型
      serCurPayWayVal(payPspItemVOList[0]?.code);
      this.setState(
        { defaultCardTypeVal: supportPaymentMethods[0]?.cardType }, //设置默认卡类型，例如visa
        () => {
          this.onCardTypeValChange({
            //存储当前卡的类型，(比如卡的长度，cvv长度,卡类型图片等等)
            cardTypeVal: this.state.defaultCardTypeVal
          });
        }
      );
    });
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  // setDefaultCardInfo = async () => {
  //  const res = await getWays()
  // }
  //获取绑卡列表
  getPaymentMethodList = async ({ msg, showLoading = true } = {}) => {
    try {
      showLoading && this.setState({ listLoading: true });
      const res = await getPaymentMethod({}, true);
      const cardList = res?.context || [];
      const paypalCardIndex = cardList?.findIndex(
        (item) => item.paymentItem?.toLowerCase() === 'adyen_paypal'
      );
      if (paypalCardIndex > -1) {
        //paypal卡需要显示在第一个
        const paypalCard = cardList[paypalCardIndex];
        cardList.splice(paypalCardIndex, 1);
        cardList.unshift(paypalCard);
      }
      this.setState({
        creditCardList: cardList
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
  //存储当前卡的类型，(比如卡的长度，cvv长度,卡类型图片等等)
  onCardTypeValChange = ({ cardTypeVal }) => {
    const { paymentStore } = this.props;
    paymentStore.setCurrentCardTypeInfo(
      paymentStore.supportPaymentMethods.filter(
        (s) => s.cardType === cardTypeVal
      )[0] || null
    );
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
  async deleteCard(el, e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let { creditCardList } = this.state;
    el.confirmTooltipVisible = false;
    this.setState({
      listLoading: true,
      creditCardList
    });
    await deleteCard({ id: el.id })
      .then(() => {
        this.setState(
          {
            successMsg: this.props.intl.messages.deleteSuccessFullly,
            getPaymentMethodListFlag: true
          },
          () => {
            this.clearSuccessMsg();
          }
        );
        this.getPaymentMethodList();
        myAccountActionPushEvent('Delete payment method');
      })
      .catch((err) => {
        this.setState({
          listLoading: false,
          errorMsg: err.message
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setState({
            errorMsg: ''
          });
        }, 3000);
      });
  }
  changeEditFormVisible = (status) => {
    this.setState({ editFormVisible: status });
    this.props.updateEditOperationPanelName(status ? 'My payments' : '');
  };
  changeListVisible = (status) => {
    this.setState({ listVisible: status });
    this.props.updateEditOperationPanelName(status ? 'My payments' : '');
  };
  handleClickEditBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.changeListVisible(true);
  };
  handleHideEditForm = ({ closeListPage }) => {
    this.changeEditFormVisible(false);
    this.changeListVisible(!closeListPage);
  };
  handleClickAddBtn(fromPage) {
    myAccountPushEvent('Payment');
    this.changeEditFormVisible(true);
    this.setState({ fromPage });
    window.scroll({ top: 0, behavior: 'smooth' });
  }
  updateConfirmTooltipVisible(el, status) {
    let { creditCardList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      creditCardList
    });
  }
  handleClickDeleteBtn(data, e) {
    if (data?.paddingFlag) return;
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.updateConfirmTooltipVisible(data, true);
  }
  handleClickGoBack = () => {
    this.changeEditFormVisible(false);
    this.changeListVisible(this.state.fromPage === 'list');
    // 最后一次返回cover
    this.setState({ fromPage: 'cover' });
  };
  addBtnJSX = ({ fromPage }) => {
    return (
      <div
        className="rounded p-4 border h-100 d-flex align-items-center justify-content-center"
        onClick={this.handleClickAddBtn.bind(this, fromPage)}
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
    if (item?.paddingFlag) return;
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (!item.isDefault) {
      await setDefaltCard(item.id);
      this.getPaymentMethodList({ showLoading: false });
    }
  }
  render() {
    const {
      listVisible,
      editFormVisible,
      creditCardList,
      listLoading,
      loading,
      errorMsg,
      successMsg,
      getPaymentMethodListFlag
    } = this.state;
    const curPageAtCover = !listVisible && !editFormVisible;
    const { supportPaymentMethods } = this.props.paymentStore;
    return (
      <div>
        {listLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
        ) : (
          <div className={classNames({ border: curPageAtCover })}>
            {loading ? <Loading positionAbsolute="true" /> : null}
            <div className="personalInfo">
              <div className="profileSubFormTitle pl-3 pr-3 pt-3">
                <h5
                  className="mb-0 text-xl"
                  style={{ display: curPageAtCover ? 'block' : 'none' }}
                >
                  <img
                    className="account-info-icon align-middle mr-3 ml-1 inline-block"
                    src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/payments.svg`}
                    alt="icons payments"
                    style={{ width: '1.4em', height: '1.4em' }}
                  />

                  <FormattedMessage id="account.myPayments" />
                </h5>
                <h5
                  className="ui-cursor-pointer text-xl"
                  style={{ display: curPageAtCover ? 'none' : 'block' }}
                  onClick={this.handleClickGoBack}
                >
                  <span>&larr; </span>
                  <FormattedMessage id="account.myPayments" />
                </h5>

                <FormattedMessage id="edit">
                  {(txt) => (
                    <button
                      className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 pb-0 ${
                        listVisible || editFormVisible ? 'hidden' : ''
                      }`}
                      name="personalInformation"
                      id="personalInfoEditBtn"
                      title={txt}
                      alt={txt}
                      onClick={this.handleClickEditBtn}
                    >
                      {txt}
                    </button>
                  )}
                </FormattedMessage>
              </div>
              <hr
                className={classNames('account-info-hr-border-color my-4', {
                  'border-0': listVisible || editFormVisible
                })}
              />
              <div
                className={classNames(
                  'pb-3',
                  { 'pl-3': curPageAtCover },
                  { 'pr-3': curPageAtCover }
                )}
              >
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
                    successMsg && getPaymentMethodListFlag ? '' : 'hidden'
                  }`}
                  role="alert"
                >
                  <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                    {successMsg}
                  </p>
                </aside>

                {/* preview form */}
                <div
                  className={classNames('row', 'ml-0', 'mr-0', {
                    hidden: editFormVisible || listVisible
                  })}
                >
                  {creditCardList.slice(0, 2).map((el, i) => (
                    <div className="col-12 col-md-4 p-2" key={i}>
                      <CardItem
                        data={el}
                        supportPaymentMethods={supportPaymentMethods}
                      />
                    </div>
                  ))}
                  {creditCardList.slice(0, 2).length < 2 && (
                    <div className="col-12 col-md-4 p-2 rounded text-center p-2 ui-cursor-pointer">
                      {this.addBtnJSX({ fromPage: 'cover' })}
                    </div>
                  )}
                </div>

                {/* list panel */}
                <div
                  className={classNames({
                    hidden: !listVisible || editFormVisible
                  })}
                >
                  <div className={classNames('row', 'ml-0', 'mr-0')}>
                    {creditCardList.map((el) => (
                      <div
                        className={`col-12 col-md-6 p-2 ${
                          el?.paddingFlag
                            ? 'ui-cursor-not-allowed'
                            : 'ui-cursor-pointer-pure'
                        }`}
                        key={el.id}
                      >
                        <CardItem
                          data={el}
                          listVisible={listVisible}
                          supportPaymentMethods={supportPaymentMethods}
                          operateBtnJSX={
                            <>
                              {el.isDefault === 1 ? (
                                <div
                                  className="red"
                                  onClick={this.toggleSetDefault.bind(this, el)}
                                >
                                  <span className="iconfont mr-1">
                                    &#xe68c;
                                  </span>
                                  <span className="rc-styled-link red border-danger">
                                    <FormattedMessage id="default" />
                                  </span>
                                </div>
                              ) : el.paymentItem?.toLowerCase() !==
                                'adyen_paypal' ? (
                                <div
                                  className={`ui-cursor-pointer`}
                                  onClick={this.toggleSetDefault.bind(this, el)}
                                >
                                  <span
                                    className={`${
                                      el?.paddingFlag
                                        ? 'ui-cursor-not-allowed'
                                        : 'rc-styled-link'
                                    }`}
                                  >
                                    <FormattedMessage id="setAsDefault" />
                                  </span>
                                </div>
                              ) : null}
                              <span
                                className={`position-relative p-2 ui-cursor-pointer-pure pdl-1`}
                              >
                                <span
                                  className={`${
                                    el.paddingFlag
                                      ? 'ui-cursor-not-allowed'
                                      : 'rc-styled-link'
                                  }`}
                                  onClick={this.handleClickDeleteBtn.bind(
                                    this,
                                    el
                                  )}
                                >
                                  <FormattedMessage id="delete" />
                                </span>
                                <ConfirmTooltip
                                  containerStyle={{
                                    transform: 'translate(-89%, 105%)'
                                  }}
                                  arrowStyle={{ left: '89%' }}
                                  lastFourDigits={el.lastFourDigits}
                                  content={
                                    <FormattedMessage
                                      id="confirmDelete2"
                                      values={{
                                        val1: <br />,
                                        val2: '************' + el.lastFourDigits
                                      }}
                                    />
                                  }
                                  display={el.confirmTooltipVisible}
                                  confirm={this.deleteCard.bind(this, el)}
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
                      {this.addBtnJSX({ fromPage: 'list' })}
                    </div>
                  </div>
                </div>

                {/* edit form panel  */}
                {editFormVisible && (
                  <PaymentEditForm
                    payuFormRule={
                      this.props.needEmail && this.props.needPhone
                        ? PAYMENT_METHOD_PAU_ACCOUNT_RULE
                        : PAYMENT_METHOD_PAU_CHECKOUT_RULE
                    }
                    defaultCardTypeVal={this.state.defaultCardTypeVal}
                    backPage={this.state.fromPage}
                    hideMyself={this.handleHideEditForm}
                    refreshList={this.getPaymentMethodList}
                    paymentType={this.state.paymentType}
                    needEmail={this.props.needEmail}
                    needPhone={this.props.needPhone}
                    paymentStore={this.props.paymentStore}
                    onCardTypeValChange={this.onCardTypeValChange}
                    fromPath="/account/information"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PaymentList;
