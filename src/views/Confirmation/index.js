import React from 'react';
import { inject, observer } from 'mobx-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OxxoModal from './modules/OxxoModal';
import PayProductInfo from '@/components/PayProductInfo';
import AddressPreview from './modules/AddressPreview';
import Modal from '@/components/Modal';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import successImg from '@/assets/images/credit-cards/success.png';
import { find } from 'lodash';
import { queryCityNameById } from '@/api';
import { addEvaluate, getOrderDetails, getPayRecord } from '@/api/order';
import './index.css';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'frequencyStore')
@observer
class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      loading: true,
      paywithLogin: sessionItemRoyal.get('rc-paywith-login') === 'true',
      oxxoPayUrl: sessionItemRoyal.get('oxxoPayUrl'),
      submitLoading: false,
      evalutateScore: -1,
      consumerComment: '',

      modalShow: false,
      oxxoModalShow: false,
      operateSuccessModalVisible: false,
      errorMsg: '',
      errorMsg2: '',

      subNumber: sessionItemRoyal.get('subNumber'),
      orderNumber: sessionItemRoyal.get('orderNumber'),

      details: null,
      payRecord: null
    };
    this.timer = null;
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
    if (this.state.paywithLogin) {
      this.props.checkoutStore.removeLoginCartData();
    } else {
      this.props.checkoutStore.setCartData(
        this.props.checkoutStore.cartData.filter((ele) => !ele.selected)
      ); // 只移除selected
      sessionItemRoyal.remove('rc-token');
    }
    sessionItemRoyal.remove('orderNumber');
    sessionItemRoyal.remove('subNumber');
    sessionItemRoyal.remove('oxxoPayUrl');
  }
  componentDidMount() {
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }
    const { orderNumber } = this.state;
    let productList;
    if (this.state.paywithLogin) {
      productList = this.props.checkoutStore.loginCartData;
    } else {
      productList = this.props.checkoutStore.cartData.filter(
        (ele) => ele.selected
      );
    }
    this.setState({
      productList: productList
      // loading: false
    });
    setTimeout(() => {
      if (this.state.oxxoPayUrl) {
        this.setState({ modalShow: false, oxxoModalShow: true });
      }
    }, 3000);

    Promise.all([getOrderDetails(orderNumber), getPayRecord(orderNumber)])
      .then(async (res) => {
        if (res[0]) {
          let resContext = res[0].context;
          let cityRes = await queryCityNameById({
            id: [resContext.consignee.cityId, resContext.invoice.cityId]
          });
          cityRes = cityRes.context.systemCityVO || [];
          resContext.consignee.cityName = this.matchCityName(
            cityRes,
            resContext.consignee.cityId
          );
          resContext.invoice.cityName = this.matchCityName(
            cityRes,
            resContext.invoice.cityId
          );
          this.setState({
            details: resContext
          });
        }
        this.setState({
          payRecord: res[1] && res[1].context,
          loading: false
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errorMsg2: err.message.toString()
        });
      });
  }
  matchCityName(dict, cityId) {
    return dict.filter((c) => c.id === cityId).length
      ? dict.filter((c) => c.id === cityId)[0].cityName
      : cityId;
  }
  matchNamefromDict(dictList, id) {
    return find(dictList, (ele) => ele.id == id)
      ? find(dictList, (ele) => ele.id == id).name
      : id;
  }
  async hanldeClickSubmit() {
    const { evalutateScore } = this.state;
    if (evalutateScore === -1) {
      this.setState({
        errorMsg: <FormattedMessage id="confirmation.rateTip4" />
      });
      return false;
    }
    this.setState({ submitLoading: true });
    try {
      await addEvaluate({
        storeId: process.env.REACT_APP_STOREID,
        orderNo: this.state.orderNumber,
        goodsScore: evalutateScore + 1,
        consumerComment: this.state.consumerComment,
        serverScore: -1,
        logisticsScore: -1,
        compositeScore: -1,
        consumerType: this.state.paywithLogin ? 'Member' : 'Guest'
      });
      this.setState({
        modalShow: false
        // operateSuccessModalVisible: true
      });
      // clearTimeout(this.timer)
      // this.timer = setTimeout(() => {
      //   this.setState({ operateSuccessModalVisible: false })
      // }, 5000)
    } catch (err) {
      this.setState({ errorMsg: err.message.toString() });
    } finally {
      this.setState({ submitLoading: false });
    }
  }
  handleConsumerCommentChange(e) {
    this.setState({
      errorMsg: '',
      consumerComment: e.target.value
    });
  }
  render() {
    const { loading, details } = this.state;

    let event;
    let eEvents;
    if (!loading) {
      let products = details.tradeItems.map((item) => {
        return {
          id: item.skuId,
          name: item.spuName,
          price: item.price,
          brand: 'Royal Canin',
          category: item.goodsCategory,
          quantity: item.num,
          variant: item.specDetails
        };
      });
      event = {
        page: {
          type: 'Order Confirmation',
          theme: ''
        }
      };
      eEvents = {
        event: `${process.env.REACT_APP_GTM_SITE_ID}eComTransaction`,
        ecommerce: {
          currencyCode: process.env.REACT_APP_GA_CURRENCY_CODE,
          purchase: {
            actionField: {
              id: this.state.orderNumber,
              revenue: this.state.details.tradePrice.totalPrice
            },
            products
          }
        }
      };
    }

    return (
      <div>
        {event ? (
          <GoogleTagManager
            additionalEvents={event}
            ecommerceEvents={eEvents}
          />
        ) : null}
        <Header history={this.props.history} />
        <main className="rc-content--fixed-header rc-bg-colour--brand4 pl-2 pr-2 pl-md-0 pr-md-0">
          <div className="rc-max-width--xl pb-4">
            <div className="text-center mt-3">
              <img
                src={successImg}
                className="mb-3"
                style={{ display: 'inline-block' }}
              />
              <h4 className="rc-text-colour--iconography">
                <b>
                  <FormattedMessage id="confirmation.info1" />
                </b>
              </h4>
              <p style={{ marginBottom: '5px' }}>
                <FormattedMessage id="confirmation.info2" />
              </p>
              <div className="d-flex align-items-center justify-content-center">
                {this.state.oxxoPayUrl ? (
                  <>
                    <Link
                      className="rc-btn rc-btn--one"
                      onClick={() => {
                        this.setState({ oxxoModalShow: true });
                      }}
                    >
                      <FormattedMessage id="printEbanx" />
                    </Link>
                    &nbsp;
                    <FormattedMessage id="or" />
                    &nbsp;
                    <Link
                      to="/"
                      className="rc-meta rc-styled-link backtohome mb-0"
                    >
                      <FormattedMessage id="continueShopping" />
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/"
                    className="rc-btn rc-btn--one"
                    style={{ transform: 'scale(.85)' }}
                  >
                    <FormattedMessage id="continueShopping" />
                  </Link>
                )}
              </div>
              <p
                className={`rc-margin-top--sm order-number-box ${
                  this.state.subNumber ? 'text-left' : ''
                } ml-auto mr-auto`}
              >
                {this.state.subNumber && (
                  <>
                    <b className="mb-3" style={{ display: 'inline-block' }}>
                      <FormattedMessage id="subscription.number" />:{' '}
                      <Link
                        to={`/account/subscription-detail/${this.state.subNumber}`}
                        className="rc-meta rc-styled-link backtohome mb-0"
                      >
                        {this.state.subNumber}
                      </Link>
                    </b>
                    <br />
                  </>
                )}
                <b>
                  <FormattedMessage id="confirmation.orderNumber" />:{' '}
                  {this.state.paywithLogin ? (
                    <Link
                      to={`/account/orders-detail/${this.state.orderNumber}`}
                      className="rc-meta rc-styled-link backtohome mb-0"
                    >
                      {this.state.orderNumber}
                    </Link>
                  ) : (
                    this.state.orderNumber
                  )}
                </b>
              </p>
            </div>
            <div
              className={`rc-max-width--xl rc-bottom-spacing imformation ${
                loading ? 'rc-bg-colour--brand3' : ''
              }`}
            >
              {loading ? (
                <div className="p-3">
                  <Skeleton
                    color="#f5f5f5"
                    width="100%"
                    height="50%"
                    count={5}
                  />
                </div>
              ) : this.state.errorMsg2 ? (
                this.state.errorMsg2
              ) : (
                <>
                  <div className="red mb-2">
                    <FormattedMessage id="order.orderInformation" />
                  </div>
                  <div className="product-summary rc-bg-colour--brand3 mb-4 mt-0">
                    <PayProductInfo details={this.state.details} />
                  </div>
                  <div className="red mb-2">
                    <FormattedMessage id="confirmation.customerInformation" />
                  </div>
                  <AddressPreview
                    details={this.state.details}
                    payRecord={this.state.payRecord}
                  />
                </>
              )}
            </div>
          </div>
        </main>
        <Footer />
        <Modal
          key="1"
          visible={this.state.modalShow}
          confirmLoading={this.state.submitLoading}
          modalTitle={<FormattedMessage id="order.rateModalTitle" />}
          confirmBtnText={<FormattedMessage id="submit" />}
          cancelBtnVisible={false}
          close={() => {
            this.setState({ modalShow: false });
          }}
          hanldeClickConfirm={() => this.hanldeClickSubmit()}
        >
          <div className="text-center pl-4 pr-4" style={{ lineHeight: 2 }}>
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
            <h4>
              <FormattedMessage id="confirmation.rateTip" />
            </h4>
            <div
              className="d-flex justify-content-around"
              style={{ width: '40%', margin: '0 auto' }}
            >
              {[0, 1, 2, 3, 4].map((item, idx) => (
                <span
                  key={idx}
                  className={`rc-icon ui-cursor-pointer ${
                    this.state.evalutateScore >= idx
                      ? 'rc-rate-fill'
                      : 'rc-rate'
                  } rc-brand1`}
                  onClick={() => {
                    this.setState({ evalutateScore: idx, errorMsg: '' });
                  }}
                />
              ))}
            </div>
            <h4>
              <FormattedMessage id="confirmation.rateTip2" />
            </h4>
            <span
              className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
              input-setup="true"
            >
              <FormattedMessage id="confirmation.rateTip3">
                {(txt) => (
                  <textarea
                    className="rc-input__textarea noborder"
                    maxLength="50"
                    placeholder={txt}
                    style={{ height: 100 }}
                    value={this.state.consumerComment}
                    onChange={(e) => this.handleConsumerCommentChange(e)}
                  />
                )}
              </FormattedMessage>
            </span>
          </div>
        </Modal>
        <Modal
          key="2"
          visible={this.state.operateSuccessModalVisible}
          modalText={<FormattedMessage id="operateSuccessfully" />}
          close={() => {
            this.setState({ operateSuccessModalVisible: false });
          }}
          hanldeClickConfirm={() => {
            this.setState({ operateSuccessModalVisible: false });
          }}
        />
        <OxxoModal
          visible={this.state.oxxoModalShow}
          oxxoPayUrl={this.state.oxxoPayUrl}
          close={() => {
            this.setState({ oxxoModalShow: false });
          }}
        />
      </div>
    );
  }
}

export default Confirmation;
