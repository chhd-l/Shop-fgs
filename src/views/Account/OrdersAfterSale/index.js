import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { injectIntl, FormattedMessage } from 'react-intl';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import ImgUpload from '@/components/ImgUpload';
import { formatMoney } from '@/utils/utils';
import {
  getOrderReturnDetails,
  getReturnReasons,
  getReturnWays,
  returnAdd
} from '@/api/order';
import { IMG_DEFAULT } from '@/utils/constant';
import './index.css';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

class OrdersAfterSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      afterSaleType: '', //操作类型 - exchange/return
      orderNumber: '',
      details: null,
      loading: true,
      selectedIdx: 0,
      errorMsg: '',
      errorMsgTop: '',
      form: {
        reason: '',
        method: '',
        instructions: '',
        attachment: ''
      },
      returnReasonList: [],
      returnWayList: [],
      confirmLoading: false
    };
    this.imgUploaderRef = React.createRef();
  }
  componentDidMount() {
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }
    const afterSaleType = sessionItemRoyal.get('rc-after-sale-type');
    if (afterSaleType) {
      this.setState(
        {
          afterSaleType: afterSaleType,
          orderNumber: this.props.match.params.orderNumber
        },
        () => this.queryDetails()
      );
      getReturnReasons().then((res) => {
        this.setState({
          returnReasonList: res.context
        });
      });
      getReturnWays().then((res) => {
        this.setState({
          returnWayList: res.context
        });
      });
    } else {
      this.goBack();
    }
  }
  goBack(e) {
    e && e.preventDefault();
    const { history } = this.props;
    history.goBack();
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  queryDetails() {
    getOrderReturnDetails(this.state.orderNumber)
      .then((res) => {
        res = res.context;
        res.tradeItems = res.tradeItems.map((t) =>
          Object.assign({}, t, { numOrigin: t.num })
        );
        this.setState({
          details: res,
          loading: false
        });
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
      });
  }
  subQuantity(item) {
    item.num--;
    this.setState({
      details: this.state.details
    });
  }
  addQuantity(item) {
    item.num++;
    this.setState({
      details: this.state.details
    });
  }
  handleAmountChange(e, item) {
    const val = e.target.value;
    if (val === '') {
      item.num = val;
      this.setState({
        details: this.state.details
      });
    } else {
      let tmp = parseInt(val);
      if (isNaN(tmp)) {
        tmp = 1;
      }
      if (tmp < 0) {
        tmp = 0;
      } else if (tmp > item.numOrigin) {
        tmp = item.numOrigin;
      }
      item.num = tmp;
      this.setState({
        details: this.state.details
      });
    }
  }
  handleSelectedItemChange(idx) {
    this.setState({ selectedIdx: idx });
  }
  handleFormChange(e) {
    const target = e.target;
    const { form } = this.state;
    form[target.name] = target.value;
    this.setState({ form: form });
  }
  showTopErrMsg(msg) {
    this.setState({
      errorMsgTop: msg
    });
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.setState({
        errorMsgTop: ''
      });
    }, 5000);
  }
  handleConfirm() {
    const { form, orderNumber, selectedIdx, details } = this.state;
    if (selectedIdx === -1) {
      this.showTopErrMsg(this.props.intl.messages.selectProduct);
      return;
    }
    for (let key in form) {
      const value = form[key];
      if (
        !value &&
        (key === 'reason' || key === 'method' || key === 'instructions')
      ) {
        this.setState({
          errorMsg: this.props.intl.messages.CompleteRequiredItems
        });
        setTimeout(() => {
          this.setState({
            errorMsg: ''
          });
        }, 5000);
        return;
      }
    }
    this.setState({ confirmLoading: true });

    const reasonArr = form.reason.split('-');
    const methodArr = form.method.split('-');
    const selectTradeItem = details.tradeItems[selectedIdx];
    let imgsParam = this.imgUploaderRef.current.state.imgList.map((item, i) => {
      return JSON.stringify({
        uid: i + 1,
        status: 'done',
        url: item
      });
    });
    returnAdd({
      returnType: this.state.afterSaleType === 'exchange' ? 'REFUND' : 'RETURN',
      description: form.instructions,
      images: imgsParam,
      returnItems: [selectTradeItem],
      returnPrice: {
        applyPrice: 0,
        applyStatus: false,
        totalPrice: selectTradeItem.num * selectTradeItem.price
      },
      returnReason: {
        [reasonArr[0]]: reasonArr[1]
      },
      returnWay: {
        [methodArr[0]]: methodArr[1]
      },
      tid: orderNumber
    })
      .then((res) => {
        this.setState({
          confirmLoading: false
        });
        this.props.history.push(
          `/account/orders-aftersale/success/${res.context}`
        );
      })
      .catch((err) => {
        this.setState({
          confirmLoading: false
        });
        this.showTopErrMsg(err || this.props.intl.messages.systemError);
      });
  }
  render() {
    const event = {
      page: {
        type: 'Account',
        theme: ''
      }
    };
    const { afterSaleType, details, selectedIdx, form } = this.state;
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu />
              <div className="my__account-content rc-column rc-quad-width">
                <div className="row justify-content-center">
                  <div className="order_listing_details col-12 no-padding">
                    <div
                      className="card confirm-details orderDetailsPage ml-0 mr-0"
                      ref={(node) => {
                        if (node) {
                          node.style.setProperty('padding', '0', 'important');
                          node.style.setProperty('border', '0', 'important');
                        }
                      }}
                    >
                      {this.state.loading ? (
                        <Skeleton
                          color="#f5f5f5"
                          width="100%"
                          height="50%"
                          count={5}
                        />
                      ) : details ? (
                        <div className="card-body">
                          <div
                            className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                              this.state.errorMsgTop ? '' : 'hidden'
                            }`}
                          >
                            <aside
                              className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                              role="alert"
                            >
                              <span>{this.state.errorMsgTop}</span>
                              <button
                                className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                                onClick={() => {
                                  this.setState({ errorMsgTop: '' });
                                }}
                                aria-label="Close"
                              >
                                <span className="rc-screen-reader-text">
                                  <FormattedMessage id="close" />
                                </span>
                              </button>
                            </aside>
                          </div>
                          <div className="ui-order-title">
                            <span>Order number:{this.state.orderNumber}</span>
                            &nbsp;&nbsp;
                            <span>
                              Order amount:
                              <span className="red">
                                {formatMoney(
                                  details.tradeItems.reduce(
                                    (total, item) => total + item.splitPrice,
                                    0
                                  )
                                )}
                              </span>
                            </span>
                          </div>
                          <div className="detail-title">
                            {afterSaleType === 'exchange'
                              ? 'Exchange Product'
                              : 'Return Product'}
                          </div>
                          <div className="order__listing">
                            <div className="order-list-container">
                              <div className="card-container mt-0 border-0">
                                <div className="card rc-margin-y--none">
                                  <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0 border-0">
                                    <div className="col-12 col-md-5">
                                      <p>Product</p>
                                    </div>
                                    <div className="col-12 col-md-2">
                                      <p>
                                        {afterSaleType === 'exchange'
                                          ? 'Exchange Price'
                                          : 'Return Price'}
                                      </p>
                                    </div>
                                    <div className="col-12 col-md-1">
                                      <p>Quantity</p>
                                    </div>
                                    <div className="col-12 col-md-2">
                                      <p>
                                        {afterSaleType === 'exchange'
                                          ? 'Exchange quantity'
                                          : 'Quantity returned'}
                                      </p>
                                    </div>
                                    <div className="col-12 col-md-2">
                                      <p>Subtotal</p>
                                    </div>
                                  </div>
                                </div>
                                {details.tradeItems.map((item, i) => (
                                  <div
                                    className="row rc-margin-x--none row align-items-center pt-2 pb-2 border-bottom"
                                    key={i}
                                  >
                                    <div className="col-12 col-md-5 pl-0 pr-0">
                                      <div className="row">
                                        <div className="col-12 col-md-2 d-flex align-items-center justify-content-center">
                                          <div className="rc-input rc-input--inline mr-0">
                                            <input
                                              className="rc-input__radio"
                                              id={`id-radio-${i}`}
                                              value={i}
                                              type="radio"
                                              name="radio"
                                              checked={
                                                this.state.selectedIdx === i
                                              }
                                              onChange={(e) =>
                                                this.handleSelectedItemChange(i)
                                              }
                                            />
                                            <label
                                              className="rc-input__label--inline ml-0"
                                              htmlFor={`id-radio-${i}`}
                                            >
                                              &nbsp;
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-12 col-md-10 d-flex">
                                          <img
                                            className="img-fluid border"
                                            src={item.pic || IMG_DEFAULT}
                                            alt={item.spuName}
                                            title={item.spuName}
                                          />
                                          <div className="m-1 color-999">
                                            <span>{item.spuName}</span>
                                            <br />
                                            {item.specDetails}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-12 col-md-2">
                                      {formatMoney(
                                        item.splitPrice / item.numOrigin
                                      )}
                                    </div>
                                    <div className="col-12 col-md-1">
                                      {item.numOrigin}
                                    </div>
                                    <div className="col-12 col-md-2">
                                      <div className="rc-quantity d-flex">
                                        {item.num < 2 ? (
                                          <span
                                            disabled
                                            className=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus rc-btn--increment"
                                          ></span>
                                        ) : (
                                          <span
                                            className=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus rc-btn--increment"
                                            onClick={() =>
                                              this.subQuantity(item)
                                            }
                                          ></span>
                                        )}
                                        <input
                                          className="rc-quantity__input"
                                          value={item.num}
                                          min="0"
                                          max={item.numOrigin}
                                          onChange={(e) =>
                                            this.handleAmountChange(e, item)
                                          }
                                        />
                                        {item.num >= item.numOrigin ? (
                                          <span
                                            disabled
                                            className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus rc-btn--increment"
                                          ></span>
                                        ) : (
                                          <span
                                            className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus rc-btn--increment"
                                            onClick={() =>
                                              this.addQuantity(item)
                                            }
                                          ></span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-12 col-md-2">
                                      {formatMoney(
                                        (item.splitPrice / item.numOrigin) *
                                          item.num
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="row form-reason align-items-center mb-3">
                              <div className="col-7">
                                <div
                                  className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                                    this.state.errorMsg ? '' : 'hidden'
                                  }`}
                                >
                                  <aside
                                    className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                                    role="alert"
                                  >
                                    <span>{this.state.errorMsg}</span>
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
                              </div>
                            </div>
                            <div className="row form-reason align-items-center mb-3">
                              <label className="col-3 required">
                                reasons for return:
                              </label>
                              <div className="col-4">
                                <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                  <select
                                    data-js-select=""
                                    id="reason"
                                    value={form.reason}
                                    name="reason"
                                    onChange={(e) => this.handleFormChange(e)}
                                  >
                                    <option>
                                      Please select a reason for return
                                    </option>
                                    {this.state.returnReasonList.map(
                                      (item, i) =>
                                        Object.keys(item).map((key) => (
                                          <option
                                            key={`${i}-${key}`}
                                            value={`${i}-${key}`}
                                          >
                                            {item[key]}
                                          </option>
                                        ))
                                    )}
                                  </select>
                                </span>
                              </div>
                            </div>
                            <div className="row form-reason align-items-center mb-3">
                              <label className="col-3 required">
                                Return Method:
                              </label>
                              <div className="col-4">
                                <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                  <select
                                    data-js-select=""
                                    id="method"
                                    value={form.method}
                                    name="method"
                                    onChange={(e) => this.handleFormChange(e)}
                                  >
                                    <option>
                                      Please select a return method
                                    </option>
                                    {this.state.returnWayList.map((item, i) =>
                                      // <option key={i}>{item[i.toString()]}</option>
                                      Object.keys(item).map((key) => (
                                        <option
                                          key={`${i}-${key}`}
                                          value={`${i}-${key}`}
                                        >
                                          {item[key]}
                                        </option>
                                      ))
                                    )}
                                  </select>
                                </span>
                              </div>
                            </div>
                            <div className="row form-reason align-items-center mb-3">
                              <label className="col-3 required">
                                Return instructions:
                              </label>
                              <div className="col-4">
                                <span
                                  className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                                  input-setup="true"
                                >
                                  <textarea
                                    className="rc-input__textarea noborder"
                                    maxLength="1000"
                                    name="instructions"
                                    id="instructions"
                                    value={form.instructions}
                                    onChange={(e) => this.handleFormChange(e)}
                                    placeholder={
                                      this.props.intl.messages
                                        .PleaseFillInstructions
                                    }
                                  ></textarea>
                                  <label
                                    className="rc-input__label"
                                    htmlFor="instructions"
                                  ></label>
                                </span>
                              </div>
                            </div>
                            <div className="row form-reason align-items-center mb-3">
                              <label className="col-3">
                                Chargeback attachment:
                              </label>
                              <div className="col-4">
                                <ImgUpload ref={this.imgUploaderRef} />
                                {/* <span
                                      className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                                      input-setup="true"
                                    >
                                      <textarea
                                        className="rc-input__textarea noborder"
                                        maxLength="1000"
                                        name="dwfrm_shipping_shippingAddress_deliveryComment"
                                        id="delivery-comment"
                                        value=""
                                      ></textarea>
                                      <label
                                        className="rc-input__label"
                                        htmlFor="delivery-comment"
                                      ></label>
                                    </span> */}
                              </div>
                            </div>
                            <div className="row form-reason align-items-center">
                              <label className="col-3"></label>
                              <div className="col-4">
                                <button
                                  className={`rc-btn rc-btn--one ${
                                    this.state.confirmLoading
                                      ? 'ui-btn-loading'
                                      : ''
                                  }`}
                                  onClick={() => this.handleConfirm()}
                                >
                                  Confirm
                                </button>
                                <button
                                  className="rc-btn rc-btn--two"
                                  onClick={(e) => this.goBack(e)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default injectIntl(OrdersAfterSale);
