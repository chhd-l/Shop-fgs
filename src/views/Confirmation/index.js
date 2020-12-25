import React from 'react';
import { inject, observer } from 'mobx-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OxxoModal from './modules/OxxoModal';
import PayProductInfo from '@/components/PayProductInfo';
import AddressPreview from './modules/AddressPreview';
import BannerTip from '@/components/BannerTip';
import Modal from '@/components/Modal';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import successImg from '@/assets/images/credit-cards/success.png';
import { queryCityNameById } from '@/api';
import { getOrderDetails, getPayRecord } from '@/api/order';
import './index.css';
import { setSeoConfig } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'frequencyStore')
@observer
class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eEvents:'',
      productList: [],
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
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
      totalTid: '',
      subOrderNumberList: sessionItemRoyal.get('subOrderNumberList')
        ? JSON.parse(sessionItemRoyal.get('subOrderNumberList'))
        : [], // 拆单时，子订单列表

      details: null,
      detailList: null,
      payRecord: null,
      email:''
    };
    this.timer = null;
  }
  componentWillUnmount() {
    // localItemRoyal.set('isRefresh', true);
    // if (this.state.paywithLogin) {
    //   this.props.checkoutStore.removeLoginCartData();
    // } else {
    //   this.props.checkoutStore.setCartData(
    //     this.props.checkoutStore.cartData.filter((ele) => !ele.selected)
    //   ); // 只移除selected
    //   sessionItemRoyal.remove('rc-token');
    // }
    // sessionItemRoyal.remove('subOrderNumberList');
    // sessionItemRoyal.remove('subNumber');
    // sessionItemRoyal.remove('oxxoPayUrl');
  }
  async componentDidMount() {
    setSeoConfig().then(res => {
      this.setState({seoConfig: res})
    });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    const { subOrderNumberList } = this.state;
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

    Promise.all(subOrderNumberList.map((ele) => getOrderDetails(ele)))
      .then(async (res) => {
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

        console.log(111111,resContext.consignee.email)
        this.setState({
          email: resContext.consignee.email
        })
 
        this.setState({
          details: resContext,
          totalTid: resContext.totalTid,
          detailList: res.map((ele) => ele.context)
        },()=>{
          this.getGAEComTransaction()
        });
        const payRecordRes = await getPayRecord(resContext.totalTid);
        this.setState({
          payRecord: payRecordRes.context,
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
  //GA 埋点 start
  getGAEComTransaction(){
    const { details } = this.state;

    let isAllOneShootGoods = details.tradeItems.every((item)=>{
      return item.goodsInfoFlag != 1
    })
    let isAllSubscriptionGoods =  details.tradeItems.every((item)=>{
      return item.goodsInfoFlag == 1
    })

    if(isAllOneShootGoods||isAllSubscriptionGoods){ //商品均是oneshoot或者均是subscription
      let products = details.tradeItems.map((item) => {
        return {
          id: item.spuNo,
          name: item.spuName,
          price: item.price,
          brand: 'Royal Canin',
          category: item.goodsCateName,
          quantity: item.num,
          variant: item.specDetails?parseInt(item.specDetails):'',
          sku: item.skuNo,
          recommandation: details.recommendationId
            ? 'recommended'
            : 'self-selected'
        };
      });
      let eEvents = {
        event: `${process.env.REACT_APP_GTM_SITE_ID}eComTransaction`,
        ecommerce: {
          currencyCode: process.env.REACT_APP_GA_CURRENCY_CODE,
          purchase: {
            actionField: {
              id: this.state.totalTid,
              type: isAllOneShootGoods?'One-shot':'Subscription',
              revenue: details.tradePrice.totalPrice,
              coupon:'',
              shipping: details.tradePrice.deliveryPrice
            },
            products
          }
        }
      };
      dataLayer.push(eEvents)
    }else{ //既有oneshoot，又有subscription
      let oneShootProduct = []
      let oneShootProductTotalPrice = ''
      let subscriptionProduct = []
      let subscriptionProductTotalPrice = ''
      for (let item of details.tradeItems) {
        if(item.goodsInfoFlag){
          subscriptionProductTotalPrice = subscriptionProductTotalPrice+item.price
          subscriptionProduct.push({
            id: item.spuNo,
            name: item.spuName,
            price: item.price,
            brand: 'Royal Canin',
            category: item.cateName,
            quantity: item.num,
            variant: item.specDetails?parseInt(item.specDetails):'',
            sku: item.skuNo,
            recommandation: details.recommendationId
              ? 'recommended'
              : 'self-selected'
          })
          let eEvents = {
            event: `${process.env.REACT_APP_GTM_SITE_ID}eComTransaction`,
            ecommerce: {
              currencyCode: process.env.REACT_APP_GA_CURRENCY_CODE,
              purchase: {
                actionField: {
                  id: this.state.totalTid,
                  type:'Subscription',
                  revenue: subscriptionProductTotalPrice,
                  coupon:'',
                  shipping: details.tradePrice.deliveryPrice
                },
                products:subscriptionProduct
              }
            }
          };
          dataLayer.push(eEvents)
        }else{
          oneShootProductTotalPrice = oneShootProductTotalPrice+item.price
          oneShootProduct.push({
            id: item.spuNo,
            name: item.spuName,
            price: item.price,
            brand: 'Royal Canin',
            category: item.cateName,
            quantity: item.num,
            variant: item.specDetails?parseInt(item.specDetails):'',
            sku: item.skuNo,
            recommandation: details.recommendationId
              ? 'recommended'
              : 'self-selected'
          })
          let eEvents = {
            event: `${process.env.REACT_APP_GTM_SITE_ID}eComTransaction`,
            ecommerce: {
              currencyCode: process.env.REACT_APP_GA_CURRENCY_CODE,
              purchase: {
                actionField: {
                  id: this.state.totalTid,
                  type:'one-shoot',
                  revenue: oneShootProductTotalPrice,
                  coupon:'',
                  shipping: details.tradePrice.deliveryPrice
                },
                products:oneShootProduct
              }
            }
          };
          dataLayer.push(eEvents)
        }
      }
      // console.log({oneShootProduct})
      // console.log({oneShootProduct})
      // console.log({oneShootProductTotalPrice})
      // console.log({subscriptionProductTotalPrice})
    }
    
  }
  //GA 埋点 end
  render() {
    const { loading, details, subOrderNumberList } = this.state;
    const event = {
      page: {
        type: 'Order Confirmation',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      }
    };
    
    return (
      <div>
        {
          <GoogleTagManager additionalEvents={event} />
        }
        <Helmet>
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription}/>
          <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
        </Helmet>
        <Header history={this.props.history} match={this.props.match} />
        <main className="rc-content--fixed-header rc-bg-colour--brand4 pl-2 pr-2 pl-md-0 pr-md-0">
          {/* <BannerTip /> */}
          <div className="rc-max-width--xl pb-4">
            <div className="text-center mt-3">
              <LazyLoad>
                <img
                  alt=""
                  src={successImg}
                  className="mb-3"
                  style={{ display: 'inline-block' }}
                />
              </LazyLoad>
              <h4 className="rc-text-colour--iconography">
                <b>
                  <FormattedMessage id="confirmation.info1" />
                </b>
              </h4>
              <p style={{ marginBottom: '5px' }}>
                <FormattedMessage id="confirmation.info2" values={{
                  val1:`${this.state.email}`
                }}/>
              </p>
              <div className={`rc-margin-top--sm rc-margin-bottom--sm order-number-box ml-auto mr-auto`}>
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
                        to="/home"
                        className="rc-meta rc-styled-link backtohome mb-0"
                      >
                        <FormattedMessage id="continueShopping" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/account"
                        className="rc-btn rc-btn--one"
                        style={{ transform: 'scale(.85)' }}
                      >
                        <FormattedMessage id="confirmation.account" />
                      </Link>
                      <div style={{padding:'0 20px 0 10px'}}>
                        <FormattedMessage id="or" />
                      </div>
                       <Link
                        to="/home"
                        className="rc-meta rc-styled-link backtohome mb-0 text-ellipsis"
                      >
                        <FormattedMessage id="continueShopping" />
                      </Link>
                      </>
                    )}
                </div>
              </div>

              {/* <p
                className={`rc-margin-top--sm order-number-box ml-auto mr-auto`}
              >
                {this.state.subNumber && (
                  <>
                    <b className="mb-3" style={{ display: 'inline-block' }}>
                      <FormattedMessage id="subscription.number" />:{' '}
                      <Link
                        to={`/account/subscription/order/detail/${this.state.subNumber}`}
                        className="rc-meta rc-styled-link backtohome mb-0"
                      >
                        {this.state.subNumber}
                      </Link>
                    </b>
                    <br />
                  </>
                )}
                {subOrderNumberList.map((ele, i) => (
                  <>
                    <b key={i}>
                      <FormattedMessage id="confirmation.orderNumber" />:{' '}
                      {this.state.paywithLogin ? (
                        <Link
                          to={`/account/orders/detail/${ele}`}
                          className="rc-meta rc-styled-link backtohome mb-0"
                        >
                          {ele}
                        </Link>
                      ) : (
                        ele
                      )}
                    </b>
                    <br />
                  </>
                ))}
              </p> */}
            </div>
            <div
              className={`rc-max-width--xl rc-bottom-spacing imformation ${loading ? 'rc-bg-colour--brand3' : ''
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
                            <PayProductInfo details={ele} />
                          </div>
                        </>
                      ))}
                       {/* 地址信息 */}
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
