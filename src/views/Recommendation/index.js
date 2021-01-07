import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import BannerTip from '@/components/BannerTip';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import recommendation1 from '@/assets/images/recommendation1.png';
import recommendation2 from '@/assets/images/recommendation2.png';
import recommendation3 from '@/assets/images/recommendation3.png';
import recommendation4 from '@/assets/images/recommendation4.png';
import mx_recommendation2 from '@/assets/images/mx_recommendation2.png';
import mx_recommendation3 from '@/assets/images/mx_recommendation3.png';
import mx_recommendation4 from '@/assets/images/mx_recommendation4.png';
import de_recommendation2 from '@/assets/images/de_recommendation2.png';
import de_recommendation3 from '@/assets/images/de_recommendation3.png';
import de_recommendation4 from '@/assets/images/de_recommendation4.png';
import storeLogo from '@/assets/images/storeLogo.png';
import ImageMagnifier from '@/components/ImageMagnifier';
import { formatMoney, getDeviceType } from '@/utils/utils';
// import paymentImg from "./img/payment.jpg";
import { inject, observer } from 'mobx-react';
import { getRecommendationList } from '@/api/recommendation';
import { getPrescriptionById } from '@/api/clinic';
import { getProductPetConfig } from '@/api/payment';
import { sitePurchase } from '@/api/cart';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';
import Modal from './components/Modal';
import {
  setSeoConfig,
  distributeLinktoPrecriberOrPaymentPage
} from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'

import './index.less';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href

@inject('checkoutStore', 'loginStore', 'clinicStore', 'clinicStore')
@inject('configStore')
@injectIntl
@observer
class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        id: '',
        goodsName: '',
        goodsImg: '',
        goodsDescription: '',
        sizeList: [],
        images: [],
        goodsCategory: '',
        goodsSpecDetails: [],
        goodsSpecs: []
      },
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      productList: [],
      currentDetail: {},
      images: [],
      activeIndex: 0,
      prescriberInfo: {},
      loading: false,
      buttonLoading: false,
      errorMsg: '',
      modalShow: false,
      modalList: [
        {
          title: this.props.intl.messages.isContinue,
          content: this.props.intl.messages.outOfStockContent_cart,
          type: 'addToCart'
        },
        {
          title: this.props.intl.messages.isContinue,
          content: this.props.intl.messages.outOfStockContent_pay,
          type: 'payNow'
        }
      ],
      currentModalObj: {
        title: this.props.intl.messages.isContinue,
        content: this.props.intl.messages.outOfStockContent_cart,
        type: 'addToCart'
      },
      outOfStockProducts: [],
      inStockProducts: [],
      needLogin: false,
      isMobile: getDeviceType() == 'PC' ? false : true
    };
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    setSeoConfig({
      pageName: 'SPT reco landing page'
    }).then(res => {
      this.setState({ seoConfig: res })
    });
    this.setState({
      loading: true
    });
    // console.log(window.location, 'location', this.props)
    getRecommendationList(this.props.match.params.id)
      .then((res) => {
        // console.log(res, 'aaa');
        let productList = res.context.recommendationGoodsInfoRels;
        // recommendationGoodsInfoRels
        // console.log(productList, 'productList');
        productList.map((el) => {
          if (!el.goodsInfo.goodsInfoImg) {
            el.goodsInfo.goodsInfoImg = el.goodsInfo.goods.goodsImg;
          }
          el.goodsInfo.goods.sizeList = el.goodsInfos.map((g) => {
            g = Object.assign({}, g, { selected: false });
            // console.log(g.goodsInfoId, el, 'hhhh');
            if (g.goodsInfoId === el.goodsInfo.goodsInfoId) {
              g.selected = true;
            }
            return g;
          });
          // console.log(el, 'el');
          let specList = el.goodsSpecs;
          let specDetailList = el.goodsSpecDetails;
          if (specList) {
            specList.map((sItem) => {
              sItem.chidren = specDetailList.filter((sdItem, i) => {
                return sdItem.specId === sItem.specId;
              });
              // console.log(sItem, el, 'hhhh');

              sItem.chidren.map((child) => {
                if (
                  el.goodsInfo.mockSpecDetailIds.indexOf(child.specDetailId) >
                  -1
                ) {
                  // console.log(child, 'child');
                  child.selected = true;
                }
                return child;
              });
              return sItem;
            });
          }
          el.goodsInfo.goods.goodsInfos = el.goodsInfos;
          el.goodsInfo.goods.goodsSpecDetails = el.goodsSpecDetails;
          el.goodsInfo.goods.goodsSpecs = specList;
          return el;
        });

        this.setState({ productList }, () => {
          this.checkoutStock();
        });
        getPrescriptionById({ id: res.context.prescriberId }).then((res) => {
          this.props.clinicStore.setLinkClinicId(res.context.prescriberId);
          this.props.clinicStore.setLinkClinicName(res.context.prescriberName);
          this.props.clinicStore.setAuditAuthority(res.context.auditAuthority);
          this.setState({ prescriberInfo: res.context, loading: false });
        });
      })
      .catch((err) => {
        console.log(err, 'err');
        // this.props.history.push('/home');
      });
  }
  checkoutStock() {
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
    for (let i = 0; i < productList.length; i++) {
      if (
        productList[i].recommendationNumber > productList[i].goodsInfo.stock
      ) {
        outOfStockProducts.push(productList[i]);
      } else {
        inStockProducts.push(productList[i]);
      }
    }
    // console.log(inStockProducts, 'instock');
    let outOfStockVal = '';
    outOfStockProducts.map((el, i) => {
      if (i === outOfStockProducts.length - 1) {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName;
      } else {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName + ',';
      }
      return el;
    });
    modalList[0].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_cart' },
      { val: outOfStockVal }
    );
    modalList[1].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_pay' },
      { val: outOfStockVal }
    );
  }
  async hanldeLoginAddToCart() {
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
    // console.log(outOfStockProducts, inStockProducts, '...1')

    if (outOfStockProducts.length > 0) {
      this.setState({ modalShow: true, currentModalObj: modalList[0] });
    } else {
      this.setState({ buttonLoading: true });
      for (let i = 0; i < inStockProducts.length; i++) {
        try {
          await sitePurchase({
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            goodsCategory: '',
            goodsInfoFlag: 0
          });
          await this.props.checkoutStore.updateLoginCart();
        } catch (e) {
          this.setState({ buttonLoading: false });
        }
      }
      this.props.history.push('/cart');
    }
  }
  async hanldeUnloginAddToCart(products, path) {
    for (let i = 0; i < products.length; i++) {
      let product = products[i];

      let quantityNew = product.recommendationNumber;
      let tmpData = Object.assign({}, product.goodsInfo.goods, {
        quantity: quantityNew
      });
      let cartDataCopy = cloneDeep(
        toJS(this.props.checkoutStore.cartData).filter((el) => el)
      );

      let flag = true;
      if (cartDataCopy && cartDataCopy.length) {
        const historyItem = find(
          cartDataCopy,
          (c) =>
            c.goodsId === product.goodsInfo.goodsId &&
            product.goodsInfo.goodsInfoId ===
            c.sizeList.filter((s) => s.selected)[0].goodsInfoId
        );
        // console.log(historyItem, 'historyItem');
        if (historyItem) {
          flag = false;
          quantityNew += historyItem.quantity;
          if (quantityNew > 30) {
            this.setState({ addToCartLoading: false });
            return;
          }
          tmpData = Object.assign(tmpData, { quantity: quantityNew });
        }
      }

      const idx = findIndex(
        cartDataCopy,
        (c) =>
          c.goodsId === product.goodsInfo.goodsId &&
          product.goodsInfo.goodsInfoId ===
          find(c.sizeList, (s) => s.selected).goodsInfoId
      );
      tmpData = Object.assign(tmpData, {
        currentAmount: product.goodsInfo.marketPrice * quantityNew,
        selected: true,
        quantity: quantityNew,
        goodsInfoFlag: 0,
        periodTypeId: null
      });
      // console.log(idx, 'idx');
      if (idx > -1) {
        cartDataCopy.splice(idx, 1, tmpData);
      } else {
        if (cartDataCopy.length >= process.env.REACT_APP_LIMITED_CATE_NUM) {
          this.setState({
            checkOutErrMsg: (
              <FormattedMessage
                id="cart.errorMaxCate"
                values={{ val: process.env.REACT_APP_LIMITED_CATE_NUM }}
              />
            )
          });
          return;
        }
        cartDataCopy.push(tmpData);
      }
      // console.log(cartDataCopy, 'cartDataCopy');
      await this.props.checkoutStore.updateUnloginCart(cartDataCopy);
    }
    this.props.history.push(path);
  }
  showErrorMsg = (msg) => {
    this.setState({
      errorMsg: msg
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  };
  async buyNow(needLogin) {
    const { checkoutStore, loginStore, history, clinicStore } = this.props;
    if (needLogin) {
      sessionItemRoyal.set('okta-redirectUrl', '/prescription');
    }
    this.setState({ needLogin });
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
    let totalPrice;
    inStockProducts.map((el) => {
      // console.log(el, 'instock');
      totalPrice =
        totalPrice + el.recommendationNumber * el.goodsInfo.salePrice;
      return el;
    });
    if (totalPrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
      // console.log(totalPrice, 'instock');
      this.showErrorMsg(
        <FormattedMessage
          id="cart.errorInfo3"
          values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }}
        />
      );
      return false;
    }
    if (outOfStockProducts.length > 0) {
      sessionItemRoyal.set(
        'recommend_product',
        JSON.stringify(inStockProducts)
      );
      this.setState({ modalShow: true, currentModalObj: modalList[1] });
      return false;
    } else {
      for (let i = 0; i < inStockProducts.length; i++) {
        try {
          await sitePurchase({
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            goodsCategory: '',
            goodsInfoFlag: 0
          });
          await checkoutStore.updateLoginCart();
        } catch (e) {
          this.setState({ buttonLoading: false });
        }
      }
      let res = await getProductPetConfig({
        goodsInfos: inStockProducts.map((el) => {
          el.goodsInfo.buyCount = el.recommendationNumber;
          return el.goodsInfo;
        })
      });
      // let handledData = inStockProducts.map((el, i) => {
      //   el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
      //   el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
      //   el.sizeList = el.goodsInfo.goods.sizeList
      //   return el;
      // });
      let handledData = res.context.goodsInfos;
      let AuditData = handledData.filter((el) => el.auditCatFlag);
      checkoutStore.setAuditData(AuditData);
      let autoAuditFlag = res.context.autoAuditFlag;
      checkoutStore.setPetFlag(res.context.petFlag);
      checkoutStore.setAutoAuditFlag(autoAuditFlag);
      sessionItemRoyal.set(
        'recommend_product',
        JSON.stringify(inStockProducts)
      );
      if (!needLogin) {
        const url = distributeLinktoPrecriberOrPaymentPage({
          configStore: this.props.configStore,
          checkoutStore,
          clinicStore,
          isLogin: loginStore.isLogin
        });
        url && history.push(url);
        // history.push('/prescription');
      }
    }
  }
  async hanldeClickSubmit() {
    const { checkoutStore, loginStore, history, clinicStore } = this.props;
    let {
      currentModalObj,
      subDetail,
      outOfStockProducts,
      inStockProducts
    } = this.state;
    this.setState({ loading: true, modalShow: false });
    if (currentModalObj.type === 'addToCart') {
      for (let i = 0; i < inStockProducts.length; i++) {
        try {
          await sitePurchase({
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            goodsCategory: '',
            goodsInfoFlag: 0
          });
          await checkoutStore.updateLoginCart();
        } catch (e) {
          this.setState({ buttonLoading: false });
        }
      }
      history.push('/cart');
    } else if (currentModalObj.type === 'payNow') {
      // for (let i = 0; i < inStockProducts.length; i++) {
      //   try {
      //     await sitePurchase({
      //       goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
      //       goodsNum: inStockProducts[i].recommendationNumber,
      //       goodsCategory: ''
      //     });
      //     await checkoutStore.updateLoginCart();
      //   } catch (e) {
      //     this.setState({ buttonLoading: false });
      //   }
      // }
      const url = distributeLinktoPrecriberOrPaymentPage({
        configStore: this.props.configStore,
        checkoutStore,
        clinicStore,
        isLogin: loginStore.isLogin
      });
      url && history.push(url);
      // history.push('/prescription');
    }
  }
  render(h) {
    const { loginStore, history, configStore } = this.props;
    const event = {
      page: {
        type: 'Content',
        theme: ''
      }
    };
    // const { details, images } = this.state
    // console.log('props', this.props);
    let details = JSON.parse(sessionItemRoyal.get('detailsTemp'));
    let images = JSON.parse(sessionItemRoyal.get('imagesTemp'));
    let {
      productList,
      activeIndex,
      prescriberInfo,
      currentModalObj,
      isMobile
    } = this.state;
    let MaxLinePrice,
      MinLinePrice,
      MaxMarketPrice,
      MinMarketPrice,
      MaxSubPrice,
      MinSubPrice;
    if (productList.length) {
      MaxLinePrice = Math.max.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.linePrice || 0)
      );
      MinLinePrice = Math.min.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.linePrice || 0)
      );
      MaxMarketPrice = Math.max.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
      );
      MinMarketPrice = Math.min.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
      );
      MaxSubPrice = Math.min.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.subscriptionPrice || 0)
      );
      MinSubPrice = Math.min.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.subscriptionPrice || 0)
      );
    }

    let cur_recommendation2 = recommendation2;
    let cur_recommendation3 = recommendation3;
    let cur_recommendation4 = recommendation4;
    if (process.env.REACT_APP_LANG === 'de') {
      cur_recommendation2 = de_recommendation2;
      cur_recommendation3 = de_recommendation3;
      cur_recommendation4 = de_recommendation4;
    } else if (process.env.REACT_APP_LANG === 'es') {
      cur_recommendation2 = mx_recommendation2;
      cur_recommendation3 = mx_recommendation3;
      cur_recommendation4 = mx_recommendation4;
    }

    return (
      <div className="recommendation recommendation_new">
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
        <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription} />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <Modal
          key="1"
          needLogin={this.state.needLogin}
          visible={this.state.modalShow}
          confirmLoading={this.state.submitLoading}
          modalTitle={currentModalObj.title}
          confirmBtnText={<FormattedMessage id="yes" />}
          cancelBtnVisible={<FormattedMessage id="cancel" />}
          close={() => {
            this.setState({ modalShow: false });
          }}
          hanldeClickConfirm={() => this.hanldeClickSubmit()}
        >
          <span>{currentModalObj.content}</span>
        </Modal>
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <div
            className={`rc-padding-bottom--xs cart-error-messaging cart-error ${this.state.errorMsg ? '' : 'hidden'
              }`}
            style={{
              width: '50%',
              margin: '20px auto 0'
            }}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close"
              role="alert"
            >
              {this.state.errorMsg}
            </aside>
          </div>
          <section className="text-center">
            <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              <FormattedMessage id="recommendation.firstTitle" />
            </h2>
            <p>
              <FormattedMessage id="recommendation.firstContent" />
            </p>
            <p>
              <button
                className={`rc-btn rc-btn--one ${this.state.buttonLoading ? 'ui-btn-loading' : ''
                  } ${this.state.inStockProducts.length
                    ? ''
                    : 'rc-btn-solid-disabled'
                  }`}
                onClick={() => {
                  if (loginStore.isLogin) {
                    this.hanldeLoginAddToCart();
                  } else {
                    this.hanldeUnloginAddToCart(productList, '/cart');
                  }
                }}
              >
                <FormattedMessage id="recommendation.viewInCart" />
              </button>
            </p>
          </section>

          {/* 商品信息 begin */}
          <section className="rc-layout-container rc-three-column recommendProduct re-custom">
            {this.state.loading ? (
              <Skeleton color="#f5f5f5" width="100%" height="100%" count="3" />
            ) : (

                getDeviceType() === 'PC' ? (
                  productList.length && (
                    <>
                      {/* PC端 begin */}
                      <div className="rc-layout-container rc-three-column recommendProductInner recommendProductInner-PC d-flex">

                        <div className="rc-column d-flex rdt-left-box">

                          <div className="rc-column rc-double-width carousel-column imageBox">

                            <div
                              className={`rc-full-width`}
                            >
                              <div className="d-flex justify-content-center ui-margin-top-1-md-down">
                                {
                                  <div className="details-img-container">

                                    <ImageMagnifier
                                      sizeList={[productList[activeIndex].goodsInfo]}
                                      images={[productList[activeIndex].goodsInfo]}
                                      minImg={
                                        productList[activeIndex].goodsInfo.goodsInfoImg
                                      }
                                      maxImg={
                                        productList[activeIndex].goodsInfo.goodsInfoImg
                                      }
                                      config={false}
                                    />

                                  </div>
                                }
                              </div>
                            </div>

                          </div>
                        </div>

                        <div className="rc-column d-flex rdt-main-box overflow-hidden position-relative">

                          <div className="rc-column text">
                            <h2
                              title={productList[activeIndex].goodsInfo.goodsInfoName}
                              className="rc-gamma ui-text-overflow-line2 text-break"
                              style={{ color: '#E2001A', marginTop: '50px', marginBottom: '10px' }}
                            >
                              {productList[activeIndex].goodsInfo.goodsInfoName}
                            </h2>
                            <p className="mr-5">
                              {/* {productList[activeIndex].goodsInfo.goods.goodsDescription || 'none'} */}
                              {productList[activeIndex].goodsInfo.specText}
                            </p>

                            {false && MaxLinePrice > 0 && (
                              <div className="product-pricing__card__head d-flex align-items-center">
                                <div className="rc-input product-pricing__card__head__title">
                                  <FormattedMessage id="listPrice" />
                                </div>
                                <b
                                  className="product-pricing__card__head__price  rc-padding-y--none text-line-through"
                                  style={{
                                    flex: 3,
                                    fontWeight: '200',
                                    fontSize: '20px'
                                  }}
                                >
                                  {MaxLinePrice > 0 ? (
                                    MaxLinePrice === MinLinePrice ? (
                                      <span>{formatMoney(MaxLinePrice)}</span>
                                    ) : (
                                        <span>
                                          <FormattedMessage id="from" />{' '}
                                          {formatMoney(MinLinePrice)}{' '}
                                          <FormattedMessage id="to" />{' '}
                                          {formatMoney(MaxLinePrice)}
                                        </span>
                                      )
                                  ) : null}
                                </b>
                              </div>
                            )}

                            <div className="product-pricing__card__head d-flex align-items-center">
                              <div className="rc-input product-pricing__card__head__title">
                                <FormattedMessage id="price" />
                              </div>
                              <b
                                className="rc-padding-y--none"
                                style={{
                                  flex: 3,
                                  fontWeight: '200',
                                  fontSize: '20px'
                                }}
                              >
                                {/* {MaxMarketPrice > 0 ? (
                                  MaxMarketPrice === MinMarketPrice ? (
                                    <span>{formatMoney(MaxMarketPrice)}</span>
                                  ) : (
                                      <span>
                                        <FormattedMessage id="from" />{' '}
                                        {formatMoney(MinMarketPrice)}{' '}
                                        <FormattedMessage id="to" />{' '}
                                        {formatMoney(MaxMarketPrice)}
                                      </span>
                                    )
                                ) : null} */}
                                <span>{formatMoney(productList[activeIndex].goodsInfo.marketPrice)}</span>
                              </b>
                            </div>

                            {MaxSubPrice > 0 && (
                              <div className="product-pricing__card__head d-flex align-items-center">
                                <div className="rc-input product-pricing__card__head__title">
                                  <span className="iconfont">&#xe675;</span>
                                  <FormattedMessage id="autoship" />
                                </div>
                                <b
                                  className="rc-padding-y--none"
                                  style={{
                                    flex: 3,
                                    fontWeight: '200',
                                    fontSize: '20px'
                                  }}
                                >
                                  {MaxSubPrice > 0 ? (
                                    MaxSubPrice === MinSubPrice ? (
                                      <span>{formatMoney(MaxSubPrice)}</span>
                                    ) : (
                                        <span>
                                          <FormattedMessage id="from" />{' '}
                                          {formatMoney(MinSubPrice)}{' '}
                                          <FormattedMessage id="to" />{' '}
                                          {formatMoney(MaxSubPrice)}
                                        </span>
                                      )
                                  ) : null}
                                </b>
                              </div>
                            )}

                            <p className="product-pricing__card__head see-detail-btn">
                              {/* <button className="rc-btn rc-btn--two" onClick={() => { history.push('/details/' + productList[activeIndex].goodsInfo.goodsInfoId); }}
                              > */}
                              <Link
                                className="rc-btn rc-btn--two"
                                to={`/${productList[activeIndex].goodsInfo.goodsInfoName.split(' ').join('-').replace('/', '')}-${productList[activeIndex].goodsInfo.goods.goodsNo}`}
                              >
                                <FormattedMessage id="recommendation.viewDetail" />
                              </Link>
                            </p>

                          </div>

                          <div className="rc-column description">
                            <LazyLoad>
                              <img
                                alt=""
                                src={storeLogo}
                                style={{
                                  float: 'left',
                                  width: '60px',
                                  marginRight: '20px'
                                }}
                              />
                            </LazyLoad>
                            <div className="des-content">
                              <p
                                style={{
                                  fontSize: '16px',
                                  color: '#333333',
                                  fontWeight: '500',
                                  letterSpacing: '0'
                                }}
                              >
                                {prescriberInfo.prescriberName}
                              </p>
                              <p
                                style={{
                                  fontSize: '12px',
                                  letterSpacing: '0'
                                }}
                              >
                                {`${prescriberInfo.phone
                                  ? prescriberInfo.phone + ','
                                  : ''
                                  }${prescriberInfo.primaryZip
                                    ? prescriberInfo.primaryZip + ','
                                    : ''
                                  }${prescriberInfo.primaryCity}`}
                              </p>
                              <p
                                style={{
                                  fontSize: '12px',
                                  letterSpacing: '0'
                                }}
                              >
                                {`${prescriberInfo.location}`}
                              </p>
                            </div>
                          </div>

                        </div>

                        <div className="rc-column d-flex rdt-right-box overflow-hidden">

                          <div style={{ width: '100%', padding: '32px 32px 0 32px', textAlign: 'left', fontWeight: '500' }}>
                            <FormattedMessage id="recommendation.recommendationPackage" />
                          </div>
                          <ul>
                            {productList.map((el, i) => (
                              <li
                                onClick={() => this.setState({ activeIndex: i })}
                                className={`${i === activeIndex ? 'active' : ''}`}
                              >
                                <i></i>
                                <LazyLoad>
                                  <img
                                    alt=""
                                    src={
                                      el.goodsInfo.goodsInfoImg ||
                                      el.goodsInfo.goods.goodsImg
                                    }
                                  />
                                </LazyLoad>
                                <div
                                  style={{
                                    verticalAlign: 'middle',
                                    textAlign: 'left',
                                    padding: '15px 10px 10px 70px',
                                    flexWrap: 'wrap'
                                  }}
                                >
                                  <div className="proName text-truncate" style={{ color: '#3d3d3d' }}>
                                    {el.goodsInfo.goodsInfoName}
                                  </div>
                                  <div className="text-box">
                                    <span className="proName">
                                      {el.goodsInfo.specText}
                                    </span>
                                    <span> X {el.recommendationNumber}</span>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div ref="p" style={{ marginTop: '30px', display: 'block', width: '100%' }}>
                            {loginStore.isLogin ? (
                              <button
                                ref="loginButton"
                                className={`rc-btn rc-btn--one ${this.state.buttonLoading ? 'ui-btn-loading' : ''
                                  }`}
                                onClick={() => this.buyNow()}
                              >
                                <FormattedMessage id="recommendation.buyNow" />
                              </button>
                            ) : (
                                <LoginButton
                                  beforeLoginCallback={async () =>
                                    this.buyNow(true)
                                  }
                                  btnClass={`rc-btn rc-btn--one ${this.state.buttonLoading ? 'ui-btn-loading' : ''
                                    } ${this.state.inStockProducts.length
                                      ? ''
                                      : 'rc-btn-solid-disabled'
                                    }`}
                                  history={history}
                                >
                                  <FormattedMessage id="checkout" />
                                </LoginButton>
                              )}
                          </div>
                          {!loginStore.isLogin && (
                            <div style={{ width: '100%', marginTop: '10px' }}>
                              <button
                                className={`rc-styled-link color-999`}
                                onClick={() => {
                                  this.buyNow();
                                }}
                              >
                                <FormattedMessage id="Buy as a guest" />
                              </button>
                            </div>
                          )}

                        </div>

                      </div>
                      {/* PC端 begin */}
                    </>
                  )
                ) : (
                    <>
                      {/* 移动端 begin */}
                      <div className="rc-layout-container rc-three-column recommendProductInner recommendProductInner-H5 d-flex">
                        <div className="rc-column d-flex rdt-right-box overflow-hidden">
                          <div style={{ width: '100%', padding: '0 32px 20px 0px', textAlign: 'left', fontWeight: '500' }}>
                            <FormattedMessage id="recommendation.recommendationPackage" />
                          </div>
                          <div className="rc-column recommend-wrap-box">
                            <ul>
                              {productList.map((el, i) => (
                                // <li onClick={() => this.setState({ activeIndex: i })} className={`${i === activeIndex ? 'active' : ''}`}>
                                <li onClick={() => this.setState({ activeIndex: i })}>
                                  <i></i>
                                  <LazyLoad>
                                    <img
                                      alt=""
                                      src={
                                        el.goodsInfo.goodsInfoImg ||
                                        el.goodsInfo.goods.goodsImg
                                      }
                                    />
                                  </LazyLoad>
                                  <div className="d-flex pro-info-item"
                                    onClick={() => {
                                      history.push('/details/' + productList[i].goodsInfo.goodsInfoId);
                                    }}
                                  >
                                    <div className="d-flex proName goods-info-name text-truncate">
                                      {el.goodsInfo.goodsInfoName}
                                    </div>
                                    <div className="d-flex text-box goods-spec-text">
                                      <span className="proName">
                                        {el.goodsInfo.specText}
                                      </span>
                                      <span style={{ margin: '0 5px' }}> X </span>
                                      <span>{el.recommendationNumber}</span>
                                    </div>
                                    
                                    {false && MaxLinePrice > 0 && (
                                      <div className="d-flex product-pricing__card__head">
                                        <div className="rc-input product-pricing__card__head__title">
                                          <span className="iconfont">&#xe675;</span>
                                          <FormattedMessage id="listPrice" />
                                        </div>
                                        <b
                                          className="product-pricing__card__head__price  rc-padding-y--none text-line-through"
                                          style={{
                                            flex: 3,
                                            fontWeight: '200',
                                            fontSize: '20px'
                                          }}
                                        >
                                          {MaxLinePrice > 0 ? (
                                            MaxLinePrice === MinLinePrice ? (
                                              <span>{formatMoney(MaxLinePrice)}</span>
                                            ) : (
                                                <span>
                                                  <FormattedMessage id="from" />{' '}
                                                  {formatMoney(MinLinePrice)}{' '}
                                                  <FormattedMessage id="to" />{' '}
                                                  {formatMoney(MaxLinePrice)}
                                                </span>
                                              )
                                          ) : null}
                                        </b>
                                      </div>
                                    )}
                                    <div className="d-flex product-pricing__card__head">
                                      <div className="rc-input product-pricing__card__head__title">
                                        <FormattedMessage id="price" />
                                      </div>
                                      <b
                                        className="rc-padding-y--none product-price-num"
                                        style={{
                                          flex: 3,
                                          fontWeight: '200'
                                        }}
                                      >
                                        {/* {MaxMarketPrice > 0 ? (
                                          MaxMarketPrice === MinMarketPrice ? (
                                            <span>{formatMoney(MaxMarketPrice)}</span>
                                          ) : (
                                              <span>
                                                <FormattedMessage id="from" />{' '}
                                                {formatMoney(MinMarketPrice)}{' '}
                                                <FormattedMessage id="to" />{' '}
                                                {formatMoney(MaxMarketPrice)}
                                              </span>
                                            )
                                        ) : null} */}
                                        <span>{formatMoney(productList[i].goodsInfo.marketPrice)}</span>
                                      </b>
                                    </div>
                                    {MaxSubPrice > 0 && (
                                      <div className="d-flex product-pricing__card__head">
                                        <div className="rc-input product-pricing__card__head__title">
                                          <span className="iconfont">&#xe675;</span>
                                          <FormattedMessage id="autoship" />
                                        </div>
                                        <b
                                          className="rc-padding-y--none product-price-num"
                                          style={{
                                            flex: 3,
                                            fontWeight: '200'
                                          }}
                                        >
                                          {MaxSubPrice > 0 ? (
                                            MaxSubPrice === MinSubPrice ? (
                                              <span>{formatMoney(MaxSubPrice)}</span>
                                            ) : (
                                                <span>
                                                  <FormattedMessage id="from" />{' '}
                                                  {formatMoney(MinSubPrice)}{' '}
                                                  <FormattedMessage id="to" />{' '}
                                                  {formatMoney(MaxSubPrice)}
                                                </span>
                                              )
                                          ) : null}
                                        </b>
                                      </div>
                                    )}
                                    <div className="arrow-right-btn position-absolute"></div>

                                  </div>
                                </li>
                              ))}
                            </ul>
                            <div className="rc-column recommend-btn-box">
                              <div ref="p" style={{ display: 'block', width: '100%' }}>
                                {loginStore.isLogin ? (
                                  <button
                                    ref="loginButton"
                                    className={`rc-btn rc-btn--one ${this.state.buttonLoading ? 'ui-btn-loading' : ''
                                      }`}
                                    onClick={() => this.buyNow()}
                                  >
                                    <FormattedMessage id="recommendation.buyNow" />
                                  </button>
                                ) : (
                                    <LoginButton
                                      beforeLoginCallback={async () =>
                                        this.buyNow(true)
                                      }
                                      btnClass={`rc-btn rc-btn--one ${this.state.buttonLoading ? 'ui-btn-loading' : ''
                                        } ${this.state.inStockProducts.length
                                          ? ''
                                          : 'rc-btn-solid-disabled'
                                        }`}
                                      history={history}
                                    >
                                      <FormattedMessage id="checkout" />
                                    </LoginButton>
                                  )}
                              </div>
                              {!loginStore.isLogin && (
                                <div style={{ width: '100%', marginTop: '20px' }}>
                                  <button
                                    className={`rc-styled-link color-999`}
                                    onClick={() => {
                                      this.buyNow();
                                    }}
                                  >
                                    <FormattedMessage id="Buy as a guest" />
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="rc-column description">
                              <div className="rec-other-info">
                                <LazyLoad>
                                  <img
                                    alt=""
                                    src={storeLogo}
                                    style={{
                                      float: 'left',
                                      width: '60px',
                                      marginRight: '20px'
                                    }}
                                  />
                                </LazyLoad>
                                <div className="des-content">
                                  <p
                                    style={{
                                      fontSize: '18px',
                                      color: '#333333',
                                      fontWeight: '500',
                                      letterSpacing: '0'
                                    }}
                                  >
                                    {prescriberInfo.prescriberName}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: '12px',
                                      letterSpacing: '0'
                                    }}
                                  >
                                    {`${prescriberInfo.phone
                                      ? prescriberInfo.phone + ','
                                      : ''
                                      }${prescriberInfo.primaryZip
                                        ? prescriberInfo.primaryZip + ','
                                        : ''
                                      }${prescriberInfo.primaryCity}`}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: '12px',
                                      letterSpacing: '0'
                                    }}
                                  >
                                    {`${prescriberInfo.location}`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 移动端 end */}
                    </>
                  )

              )}
          </section>

          {/* 商品信息 end */}

          <div className="rc-layout-container rc-two-column re-p-0 re-p-md-68">
            <div
              className="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#E2001A' }}>
                  <FormattedMessage id="recommendation.secTitle" />
                </h2>
                <p>
                  <FormattedMessage id="recommendation.secContent" />
                </p>
                {/* <button className="rc-btn rc-btn--one" onClick={() => this.setState({isAddNewCard: true, paymentCompShow: true})}>View in Cart</button> */}
              </div>
            </div>
            <div className="rc-column">
              <LazyLoad>
                <img src={recommendation1} style={{ width: '100%' }} alt="" />
              </LazyLoad>
            </div>
          </div>
          <div className="help-page" style={{ marginBottom: '1rem' }}>
            <section style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                <FormattedMessage id="recommendation.thirdTitle" />
              </h2>
              <p>
                <FormattedMessage id="recommendation.thirdContent" />
              </p>
            </section>
            <div className="experience-region experience-main">
              <div className="experience-region experience-main">
                <div className="experience-component experience-layouts-1column">
                  <div className="row rc-margin-x--none">
                    <div className="rc-full-width">
                      <div className="experience-component experience-assets-contactUsBlock">
                        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                          <div className="rc-layout-container rc-two-column rc-margin-y--sm text-center text-md-left rc-margin-top--lg--mobile">
                            {/* <div className="rc-padding-bottom--none--mobile" style={{ width: '40%' }}>
                              <h1 className="rc-beta" style={{ margin: '0 0 0 1rem' }}>
                                <font style={{ verticalAlign: "inherit" }}>
                                  <font style={{ verticalAlign: "inherit" }}><FormattedMessage id="help.needHelp" /></font>
                                </font>
                              </h1>
                            </div>
                            <div style={{ width: '60%' }}>
                              <div className="rc-large-body inherit-fontsize children-nomargin">
                                <p>
                                  <FormattedMessage id="help.tip1" /><br /><FormattedMessage id="help.tip4" />
                                </p>
                              </div>
                            </div> */}
                          </div>
                          <div className="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center text-md-left">
                            <div className="rc-column rc-double-width rc-padding--none">
                              <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <b style={{ color: '#00BCA3' }}>
                                          <FormattedMessage id="help.byTelephone" />
                                        </b>
                                        <p>{configStore.contactTimePeriod}</p>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-numeric rc-md-up"
                                          >
                                            {
                                              configStore.storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-alpha rc-border--none rc-md-down"
                                          >
                                            {
                                              configStore.storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rc-column rc-content-v-middle">
                                      <LazyLoad>
                                        <img
                                          className="align-self-center widthAuto"
                                          src={callImg}
                                          alt="By telephone"
                                          title="By telephone"
                                        />
                                      </LazyLoad>
                                    </div>
                                  </div>
                                </div>
                              </article>
                              <article className="rc-full-width rc-column">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <b style={{ color: '#0087BD' }}>
                                          <FormattedMessage id="help.byEmail" />
                                        </b>
                                        <p>
                                          <span
                                            style={{ color: 'rgb(0, 0, 0)' }}
                                          >
                                            <FormattedMessage id="help.tip3" />
                                          </span>
                                        </p>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            className="rc-numeric rc-md-up"
                                            style={{
                                              color: 'rgb(0, 135, 189)'
                                            }}
                                          >
                                            {configStore.storeContactEmail}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rc-column rc-content-v-middle">
                                      <LazyLoad>
                                        <img
                                          className="align-self-center widthAuto"
                                          src={emailImg}
                                          alt="By email"
                                          title="By email"
                                        />
                                      </LazyLoad>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </div>
                            <div className="rc-column rc-triple-width">
                              <div
                                className="background-cover"
                                style={{
                                  backgroundImage: `url(${require('@/assets/images/slider-img-help.jpg?sw=802&amp;sh=336&amp;sm=cut&amp;sfrm=png')})`
                                }}
                              >
                                <picture className="rc-card__image">
                                  <LazyLoad>
                                    <img src={helpImg} alt="" title="" />
                                  </LazyLoad>
                                </picture>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              <FormattedMessage id="recommendation.fourTitle" />
            </h2>
            <p>
              <FormattedMessage id="recommendation.fourContent" />
            </p>
          </section>
          <section
            className="picList"
            style={{ textAlign: 'center', display: 'flex' }}
          >
            <li>
              <LazyLoad>
                <img src={cur_recommendation2} alt="" />
              </LazyLoad>
            </li>
            <li>
              <LazyLoad>
                <img src={cur_recommendation3} alt="" />
              </LazyLoad>
            </li>
            <li>
              <LazyLoad>
                <img src={cur_recommendation4} alt="" />
              </LazyLoad>
            </li>
          </section>
          <section
            className="re-p-sm-12 re-p-md-4068"
            style={{ background: '#f6f6f6' }}
          >
            <p>
              <FormattedMessage id="recommendation.fiveContent" />
            </p>
          </section>
        </main>

        <Footer />
      </div>
    );
  }
}

export default Help;
