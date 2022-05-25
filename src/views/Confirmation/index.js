import React from 'react';
import { inject, observer } from 'mobx-react';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OxxoModal from './modules/OxxoModal';
import AdyenOxxoModal from './modules/AdyenOxxoModal';
import PayProductInfo from '@/components/PayProductInfo';
import AddressPreview from './modules/AddressPreview';
import Modal from '@/components/Modal';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import { getOrderDetails, getPayRecord } from '@/api/order';
import './index.less';
import { getDeviceType } from '@/utils/utils';
import { seoHoc } from '@/framework/common';
import LazyLoad from 'react-lazyload';
import { orderConfirmationPushEvent, doGetGAVal } from '@/utils/GA';
import { transactionPixel } from '@/components/BazaarVoice/bvPixel';
import { mktCallBack, accountCallBack } from '@/api/home.js';
import { findUserSelectedList, userBindConsent } from '@/api/consent';
import { bindSubmitParam } from '@/utils/utils';
import Canonical from '@/components/Canonical';
let isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

const isHubGA = window.__.env.REACT_APP_HUB_GA;
const isLogin = !!localItemRoyal.get('rc-token');
@inject('checkoutStore', 'frequencyStore', 'loginStore')
@seoHoc()
@observer
class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eEvents: '',
      productList: [],
      loading: true,
      paywithLogin: sessionItemRoyal.get('rc-paywith-login') === 'true',
      oxxoPayUrl: sessionItemRoyal.get('oxxoPayUrl'),
      adyenOxxoAction: sessionItemRoyal.get('adyenOxxoAction')
        ? JSON.parse(sessionItemRoyal.get('adyenOxxoAction'))
        : '',
      submitLoading: false,
      evalutateScore: -1,
      consumerComment: '',

      modalShow: false,
      oxxoModalShow: false,
      operateSuccessModalVisible: false,
      errorMsg: '',
      errorMsg2: '',

      subNumber: sessionItemRoyal.get('subNumber'),
      totalTid: '',
      subOrderNumberList: sessionItemRoyal.get('subOrderNumberList')
        ? JSON.parse(sessionItemRoyal.get('subOrderNumberList'))
        : [], // 拆单时，子订单列表

      details: null,
      detailList: null,
      payRecord: null,
      email: '',
      isAllOneShootGoods: true,
      pet: {},
      mktSelectedFlag: true,
      mktActivateFlag: true,

      mktSelectSuccess: false,
      mktActivateSuccess: false,

      mktConsent: '',
      mktSelectedFlagChecked: false,
      mktActivateChecked: false,
      list: []
    };
    this.timer = null;
    this.activeMkt = this.activeMkt.bind(this);
    this.selectMktConsent = this.selectMktConsent.bind(this);
  }
  getPetVal() {
    let obj = sessionItemRoyal.get('gaPet')
      ? JSON.parse(sessionItemRoyal.get('gaPet'))
      : '';
    this.setState({ pet: obj });
  }
  getIsAllOneShootGoods = () => {
    let isAllOneShootGoods = this.state.details.tradeItems.every((item) => {
      return item.goodsInfoFlag == 0; //goodsInfoFlag>0表示订阅
    });
    this.setState({ isAllOneShootGoods });
  };

  windowExit = () => {
    if (navigator.userAgent.indexOf('MSIE') > 0) {
      window.opener = null;
      window.close();
    } else if (
      navigator.userAgent.indexOf('Firefox') != -1 ||
      navigator.userAgent.indexOf('Chrome') != -1
    ) {
      window.location.href = 'about:blank';
      window.close();
    } else {
      window.opener = null;
      window.open('', '_self', '');
      window.close();
    }
  };
  UNSAFE_componentWillMount() {
    this.getPetVal();
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  async componentDidMount() {
    sessionItemRoyal.set('refresh-confirm-page', true);
    const { subOrderNumberList } = this.state;
    setTimeout(() => {
      if (this.state.oxxoPayUrl || this.state.adyenOxxoAction) {
        //payOxxo和adyenOxxo都会显示Modal
        this.setState({ modalShow: false, oxxoModalShow: true });
      }
    }, 3000);

    setTimeout(() => {
      if (
        sessionItemRoyal.get('rc-iframe-from-storepotal') ||
        sessionItemRoyal.get('rc-guestId')
      ) {
        this.windowExit();
      }
    }, 3000);

    Promise.all(subOrderNumberList.map((ele) => getOrderDetails(ele)))
      .then(async (res) => {
        let resContext = res[0]?.context;
        this.setState({
          email: resContext.consignee.email
        });

        this.setState(
          {
            details: resContext,
            totalTid: resContext.totalTid,
            detailList: res.map((ele) => ele?.context)
          },
          () => {
            this.getIsAllOneShootGoods();
            orderConfirmationPushEvent(this.state.details);

            //启用BazaarVoice时，在checkout confirmation页面add BV transaction pixel
            if (!!+window.__.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS) {
              transactionPixel(this.state.details);
            }
          }
        );
        const payRecordRes = await getPayRecord(resContext.totalTid);
        this.setState({
          payRecord: payRecordRes?.context,
          loading: false
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errorMsg2: err.message
        });
      });

    if (window.__.env.REACT_APP_COUNTRY === 'de' && isLogin) {
      accountCallBack().then((res) => {
        const customerId = this.userInfo && this.userInfo.customerId;
        this.setState({
          mktSelectedFlag: res.context.mktSelectedFlag,
          mktActivateFlag: res.context.mktActivateFlag
        });
        if (!res.mktSelectedFlag && !res.mktActivateFlag) {
          findUserSelectedList({
            customerId,
            oktaToken: localItemRoyal.get('oktaToken')
          }).then((res) => {
            const optioalList = res.context.optionalList.map((item) => {
              return {
                id: item.id,
                consentTitle: item.consentTitle,
                isChecked: true,
                isRequired: false,
                detailList: item.detailList,
                consentDesc: item.consentDesc
              };
            });
            this.setState({
              mktConsent:
                res.context.optionalList.length > 0
                  ? res.context.optionalList[0].consentTitle
                  : '',
              list: optioalList
            });
          });
        }
      }); // Is need MKT Consent For DE?
    }
  }
  componentWillUnmount() {
    const { checkoutStore } = this.props;
    if (sessionItemRoyal.get('rc-paywith-login') === 'true') {
      checkoutStore.removeLoginCartData();
    } else {
      checkoutStore.setCartData(
        checkoutStore.cartData.filter((ele) => !ele.selected)
      ); // 只移除selected
      sessionItemRoyal.remove('rc-token');
    }
    sessionItemRoyal.remove('subOrderNumberList');
    sessionItemRoyal.remove('subNumber');
    sessionItemRoyal.remove('oxxoPayUrl');
    sessionItemRoyal.remove('adyenOxxoAction');
    sessionItemRoyal.remove('gaPet');
    sessionItemRoyal.remove('refresh-confirm-page');
  }
  matchCityName(dict, cityId) {
    return dict.filter((c) => c.id === cityId).length
      ? dict.filter((c) => c.id === cityId)[0].cityName
      : cityId;
  }
  AdyenBtnJSX = (buyWay) => {
    const defaultJSX = (
      <>
        <Link
          to="/account"
          className="rc-btn rc-btn--one"
          style={{ transform: 'scale(.85)' }}
        >
          <FormattedMessage id="confirmation.account" />
        </Link>
        <div style={{ padding: '0 1.25rem 0 .625rem' }}>
          <FormattedMessage id="or" />
        </div>
        <DistributeHubLinkOrATag
          href=""
          to="/home"
          className="rc-meta rc-styled-link backtohome mb-0 text-ellipsis pb-0"
        >
          <FormattedMessage id="continueShopping" />
        </DistributeHubLinkOrATag>
      </>
    );
    return (
      {
        oneShoot: (
          <>
            <DistributeHubLinkOrATag
              href=""
              to="/home"
              className="rc-btn rc-btn--one"
              style={{ transform: 'scale(.85)' }}
            >
              <FormattedMessage id="confirmation.oneShoot" />
            </DistributeHubLinkOrATag>
          </>
        )
      }[buyWay] || defaultJSX
    );
  };
  //商品全是oneShoot和有订阅的商品区分
  computedGotoAccountBtn(isAllOneShootGoods) {
    let res = '';
    if (isAllOneShootGoods) {
      res = 'oneShoot';
    } else {
      res = 'subscription';
    }
    return res;
  }
  //GA 埋点 start
  getGAEComTransaction() {
    const { details } = this.state;

    let isAllOneShootGoods = details.tradeItems.every((item) => {
      return item.goodsInfoFlag == 0; //goodsInfoFlag>0表示订阅
    });
    this.setState({ isAllOneShootGoods });

    let isAllSubscriptionGoods = details.tradeItems.every((item) => {
      return item.goodsInfoFlag > 0;
    });

    if (isAllOneShootGoods || isAllSubscriptionGoods) {
      //商品均是oneshoot或者均是subscription
      let products = details.tradeItems.map((item) => {
        return {
          id: item.spuNo,
          name: item.spuName,
          price: item.price,
          brand: 'Royal Canin',
          category: item.goodsCateName,
          quantity: item.num,
          variant: item.specDetails ? parseInt(item.specDetails) : '',
          sku: item.skuNo,
          recommandation: details.recommendationId
            ? 'recommended'
            : 'self-selected'
        };
      });
      let eEvents = {
        event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComTransaction`,
        ecommerce: {
          currencyCode: window.__.env.REACT_APP_GA_CURRENCY_CODE,
          purchase: {
            actionField: {
              id: this.state.totalTid,
              type: isAllOneShootGoods ? 'One-shot' : 'Subscription',
              revenue: details.tradePrice.totalPrice,
              coupon: '',
              shipping: details.tradePrice.deliveryPrice
            },
            products
          }
        }
      };
      window?.dataLayer?.push(eEvents);
    } else {
      //既有oneshoot，又有subscription
      let oneShootProduct = [];
      let oneShootProductTotalPrice = '';
      let subscriptionProduct = [];
      let subscriptionProductTotalPrice = '';
      let subscription_eEvents = '';
      let oneShooteEvents = '';
      for (let item of details.tradeItems) {
        if (item.goodsInfoFlag) {
          subscriptionProductTotalPrice =
            (subscriptionProductTotalPrice * 1000 + item.price * 1000) / 1000;
          subscriptionProduct.push({
            id: item.spuNo,
            name: item.spuName,
            price: item.price,
            brand: 'Royal Canin',
            category: item.goodsCateName,
            quantity: item.num,
            variant: item.specDetails ? parseInt(item.specDetails) : '',
            sku: item.skuNo,
            recommandation: details.recommendationId
              ? 'recommended'
              : 'self-selected'
          });
          subscription_eEvents = {
            event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComTransaction`,
            ecommerce: {
              currencyCode: window.__.env.REACT_APP_GA_CURRENCY_CODE,
              purchase: {
                actionField: {
                  id: this.state.totalTid,
                  type: 'Subscription',
                  revenue: subscriptionProductTotalPrice,
                  coupon: '',
                  shipping: details.tradePrice.deliveryPrice
                },
                products: subscriptionProduct
              }
            }
          };
        } else {
          oneShootProductTotalPrice =
            (oneShootProductTotalPrice * 1000 + item.price * 1000) / 1000;
          oneShootProduct.push({
            id: item.spuNo,
            name: item.spuName,
            price: item.price,
            brand: 'Royal Canin',
            category: item.goodsCateName,
            quantity: item.num,
            variant: item.specDetails ? parseInt(item.specDetails) : '',
            sku: item.skuNo,
            recommandation: details.recommendationId
              ? 'recommended'
              : 'self-selected'
          });
          oneShooteEvents = {
            event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComTransaction`,
            ecommerce: {
              currencyCode: window.__.env.REACT_APP_GA_CURRENCY_CODE,
              purchase: {
                actionField: {
                  id: this.state.totalTid,
                  type: 'one-shoot',
                  revenue: oneShootProductTotalPrice,
                  coupon: '',
                  shipping: details.tradePrice.deliveryPrice
                },
                products: oneShootProduct
              }
            }
          };
        }
      }
      window?.dataLayer?.push(subscription_eEvents);
      window?.dataLayer?.push(oneShooteEvents);
    }
  }
  //GA 埋点 end
  activeMkt() {
    const customerId = this.userInfo && this.userInfo.customerId;
    this.setState({ mktSelectedFlagChecked: true });
    mktCallBack({
      customerId,
      consentDesc: 'RC_DF_DE_FGS_DOUBLE_OPT_EMAIL'
    }).then((res) => {
      this.setState({
        mktSelectSuccess: res.code === 'K-000000'
      });
    });
  }

  selectMktConsent() {
    this.setState({ mktActivateChecked: true });
    const customerId = this.userInfo && this.userInfo.customerId;
    let oktaToken = localItemRoyal.get('oktaToken');
    let submitParam = bindSubmitParam(this.state.list);
    userBindConsent({
      ...submitParam,
      ...{ oktaToken },
      customerId
    })
      .then((res) => {
        this.setState({
          mktActivateSuccess: res.code === 'K-000000'
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      loading,
      details,
      subOrderNumberList,
      mktSelectedFlag,
      mktActivateFlag,
      mktSelectSuccess,
      mktActivateSuccess,
      mktConsent,
      mktSelectedFlagChecked,
      mktActivateChecked,
      payRecord
    } = this.state;
    const event = {
      page: {
        type: 'Order Confirmation',
        theme: '',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      },
      pet: this.state.pet
    };

    return (
      <div>
        {
          <GoogleTagManager
            key={this.props.location.key}
            additionalEvents={event}
          />
        }
        <Canonical />
        <Header {...this.props} showNav={false} showUserBox={false} />
        <main className="rc-content--fixed-header rc-bg-colour--brand4 px-0">
          {/* <BannerTip /> */}
          <div className="rc-max-width--xl pb-4 px-2 md:px-0">
            <div className="text-center mt-3">
              <div className="flex justify-center">
                <span className="flex items-center justify-center bg-green rounded-full w-14 h-14 md:w-20 md:h-20 mb-2">
                  <span className="iconfont iconduigoux font-bold text-white text-4xl inline-block md:text-5xl" />
                </span>
              </div>
              <h4 className="rc-text-colour--iconography">
                <strong>
                  <FormattedMessage id="confirmation.info1" />
                </strong>
              </h4>
              <p style={{ marginBottom: '5px' }}>
                <FormattedMessage
                  id="confirmation.info2"
                  values={{
                    val1: `${this.state.email}`
                  }}
                />
              </p>
              {window.__.env.REACT_APP_COUNTRY === 'de' && isLogin ? (
                <>
                  {mktSelectedFlag && !mktActivateFlag ? (
                    <div className="col-12 col-md-6 mktConsent">
                      {mktSelectSuccess ? (
                        <p>
                          <FormattedMessage id="confirmation.mktSelectedSuccess" />
                        </p>
                      ) : (
                        <div
                          className="checkBox"
                          onClick={(e) => {
                            this.activeMkt();
                          }}
                        >
                          <input
                            type="checkbox"
                            id="mktSelectedNotActiveInfo"
                            className="rc-input__checkbox"
                            checked={mktSelectedFlagChecked}
                          />
                          <label
                            className="rc-input__label--inline text-break w-100"
                            htmlFor="mktSelectedNotActiveInfo"
                          >
                            <div className="checkboxDetail">
                              <p>
                                <FormattedMessage id="confirmation.mktSelectedNotActiveInfo" />
                              </p>
                            </div>
                          </label>
                        </div>
                      )}
                    </div>
                  ) : null}
                  {!mktSelectedFlag && !mktActivateFlag ? (
                    <div className="col-12 col-md-6 mktConsent">
                      {mktActivateSuccess ? (
                        <>
                          <p>
                            <FormattedMessage id="confirmation.mktNotSelectedConfirm" />
                          </p>
                          <p>
                            <FormattedMessage id="confirmation.mktNotSelectedCSuccess" />
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            <strong>
                              <FormattedMessage id="confirmation.mktNotSelectedTitle" />
                            </strong>
                          </p>
                          <p>
                            <FormattedMessage id="confirmation.mktNotSelectedDescription" />
                          </p>
                          <div
                            onClick={() => this.selectMktConsent()}
                            className="checkBox"
                          >
                            <input
                              type="checkbox"
                              id="mktActivateChecked"
                              className="rc-input__checkbox"
                              checked={mktActivateChecked}
                            />
                            <label
                              className="rc-input__label--inline text-break w-100"
                              htmlFor="mktActivateChecked"
                            >
                              <div
                                className="checkboxDetail"
                                dangerouslySetInnerHTML={{ __html: mktConsent }}
                              ></div>
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  ) : null}
                </>
              ) : null}
              <div
                className={`rc-margin-top--sm rc-margin-bottom--sm order-number-box ml-auto mr-auto`}
              >
                <div className="d-flex align-items-center justify-content-center">
                  {this.state.oxxoPayUrl || this.state.adyenOxxoAction ? (
                    <>
                      <a
                        href="javascript:;"
                        className="rc-btn rc-btn--one"
                        onClick={() => {
                          this.setState({ oxxoModalShow: true });
                        }}
                      >
                        <FormattedMessage id="printEbanx" />
                      </a>
                      &nbsp;
                      <FormattedMessage id="or" />
                      &nbsp;
                      <DistributeHubLinkOrATag
                        href=""
                        to="/home"
                        className="rc-meta rc-styled-link backtohome mb-0  pb-0"
                      >
                        <FormattedMessage id="continueShopping" />
                      </DistributeHubLinkOrATag>
                    </>
                  ) : (
                    this.AdyenBtnJSX(
                      this.computedGotoAccountBtn(this.state.isAllOneShootGoods)
                    )
                  )}
                </div>
              </div>
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
                  {this.state.detailList.map((ele, i) => (
                    <>
                      {/* 支付信息 */}
                      <div className="red mb-2">
                        <FormattedMessage id="order.orderInformation" />
                        {/* ({subOrderNumberList[i]}) */}
                      </div>
                      <div
                        className="product-summary rc-bg-colour--brand3 mb-4 mt-0"
                        key={i}
                      >
                        <PayProductInfo
                          details={ele}
                          location={this.props.location}
                        />
                      </div>
                    </>
                  ))}
                  {/* 地址信息 */}
                  <div className="red mb-2">
                    {this.state.details?.appointmentNo ? (
                      <FormattedMessage id="Appointment Information" />
                    ) : (
                      <FormattedMessage id="confirmation.customerInformation" />
                    )}
                  </div>
                  <AddressPreview
                    hideBillingAddr={Boolean(
                      +window.__.env.REACT_APP_HIDE_CHECKOUT_BILLING_ADDR
                    )}
                    details={this.state.details}
                    payRecord={this.state.payRecord}
                  />
                </>
              )}
            </div>
          </div>
          <Footer />
        </main>
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
        {this.state.oxxoPayUrl && (
          <OxxoModal
            visible={this.state.oxxoModalShow}
            oxxoPayUrl={this.state.oxxoPayUrl}
            close={() => {
              this.setState({ oxxoModalShow: false });
            }}
          />
        )}

        {this.state.adyenOxxoAction && (
          <AdyenOxxoModal
            visible={this.state.oxxoModalShow}
            action={this.state.adyenOxxoAction}
            close={() => {
              this.setState({ oxxoModalShow: false });
            }}
            pspItemCode={payRecord?.paymentItem}
            key={payRecord?.paymentItem}
          />
        )}
      </div>
    );
  }
}

export default Confirmation;
