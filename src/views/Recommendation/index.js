import React from 'react';
import { Link } from 'react-router-dom';
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
import noPic from '@/assets/images/noPic.png'
import storeLogo from '@/assets/images/storeLogo.png';
import ImageMagnifier from './components/ImageMagnifier';
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

import './index.css';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

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
      isMobile: false
    };
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    setSeoConfig({
      pageName: 'SPT reco landing page'
    });
    this.setState({isMobile: getDeviceType() === 'H5'})
    this.setState({ loading: true });
    // console.log(window.location, 'location', this.props)
    getRecommendationList(this.props.match.params.id)
      .then((res) => {
        console.log(res, 'aaa');
        let productList = res.context.recommendationGoodsInfoRels;
        // recommendationGoodsInfoRels
        console.log(productList, 'productList');
        productList.map((el) => {
          if (!el.goodsInfo.goodsInfoImg) {
            el.goodsInfo.goodsInfoImg = el.goodsInfo.goods.goodsImg;
          }
          el.goodsInfo.goods.sizeList = el.goodsInfos.map((g) => {
            g = Object.assign({}, g, { selected: false });
            console.log(g.goodsInfoId, el, 'hhhh');
            if (g.goodsInfoId === el.goodsInfo.goodsInfoId) {
              g.selected = true;
            }
            return g;
          });
          console.log(el, 'el');
          let specList = el.goodsSpecs;
          let specDetailList = el.goodsSpecDetails;
          if (specList) {
            specList.map((sItem) => {
              sItem.chidren = specDetailList.filter((sdItem, i) => {
                return sdItem.specId === sItem.specId;
              });
              console.log(sItem, el, 'hhhh');

              sItem.chidren.map((child) => {
                if (
                  el.goodsInfo.mockSpecDetailIds.indexOf(child.specDetailId) >
                  -1
                ) {
                  console.log(child, 'child');
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
          this.props.clinicStore.setLinkClinicId(res.context.id);
          this.props.clinicStore.setLinkClinicName(res.context.prescriberName);
          this.props.clinicStore.setAuditAuthority(res.context.auditAuthority);
          this.setState({ prescriberInfo: res.context, loading: false });
        });
      })
      .catch((err) => {
        console.log(err, 'err');
        // this.props.history.push('/home');
      });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
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
    console.log(inStockProducts, 'instock');
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
    // return

    // for (let i = 0; i < productList.length; i++) {
    //   if(productList[i].recommendationNumber > productList[i].goodsInfo.stock) {
    //     outOfStockProducts.push(productList[i])
    //     this.setState({ buttonLoading: false });
    //     continue
    //   }else {
    //     inStockProducts.push(productList[i])
    //   }
    // }
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
        console.log(historyItem, 'historyItem');
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
      console.log(idx, 'idx');
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
      console.log(cartDataCopy, 'cartDataCopy');
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
      console.log(el, 'instock');
      totalPrice =
        totalPrice + el.recommendationNumber * el.goodsInfo.salePrice;
      return el;
    });
    if (totalPrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
      console.log(totalPrice, 'instock');
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
    console.log('props', this.props);
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
    console.log(
      MaxLinePrice,
      MinLinePrice,
      MaxMarketPrice,
      MinMarketPrice,
      MaxSubPrice,
      MinSubPrice,
      'aaaaa'
    );
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
      <div className="recommendation">
        <GoogleTagManager additionalEvents={event} />
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
            className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
              this.state.errorMsg ? '' : 'hidden'
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
          <section className="text-center" style={{width: isMobile?'95%': '60%', margin: '0 auto'}}>
            <h1 style={{ color: '#E2001A', margin: '20px' }}>Bienvenue !</h1>
            <h2 style={{ color: '#E2001A', margin: '20px' }}>Merci pour votre visite en magasin, voici notre recommandation.</h2>
            {/* <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              <FormattedMessage id="recommendation.firstTitle" />
            </h2> */}
            <p style={{fontSize: '18px'}}>
              {/* <FormattedMessage id="recommendation.firstContent" /> */}
              La recommandation a été faite en fonction des besoins uniques de votre animal.
            </p>
            <p>
              <button
                className={`rc-btn rc-btn--one ${
                  this.state.buttonLoading ? 'ui-btn-loading' : ''
                } ${
                  this.state.inStockProducts.length
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
          {/* <section className="recommendProduct re-custom">
            <div className="imageTabBox">
            {
              productList.map(el => (
                <div>
                  <img src={noPic} style={{width: '40px'}}/>
                  <span>{el.goodsInfo.goodsInfoName}</span>
                </div>
              ))
            }    
            </div>
          </section> */}
          <section className="recommendProduct re-custom">
            {this.state.loading ? (
              <Skeleton color="#f5f5f5" width="100%" height="100%" count="3" />
            ) : (
              productList.length && (
                <div>
                  <div
                    className="recommendProductInner"
                    style={{
                      // display: isMobile ? 'none' : 'block'
                    }}
                  >
                    {/* <div className="left">
                      <div
                        style={{
                          padding: '32px',
                          textAlign: 'center',
                          fontWeight: '500'
                        }}
                      >
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
                                  el.goodsInfo.goods.goodsImg || noPic
                                }
                              />
                            </LazyLoad>
                            <div
                              style={{
                                display: 'inline-block',
                                verticalAlign: 'middle',
                                textAlign: 'left'
                              }}
                            >
                              <span className="proName">
                                {el.goodsInfo.goodsInfoName}
                              </span>

                              <span>X {el.recommendationNumber}</span>
                              <br />
                              <span className="proName">
                                {el.goodsInfo.specText}
                              </span>
                            </div>
                          </li>
                        ))}
                        <p ref="p" style={{ marginTop: '60px' }}>
                          {loginStore.isLogin ? (
                            <button
                              ref="loginButton"
                              className={`rc-btn rc-btn--one ${
                                this.state.buttonLoading ? 'ui-btn-loading' : ''
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
                              btnClass={`rc-btn rc-btn--one ${
                                this.state.buttonLoading ? 'ui-btn-loading' : ''
                              } ${
                                this.state.inStockProducts.length
                                  ? ''
                                  : 'rc-btn-solid-disabled'
                              }`}
                              history={history}
                            >
                              <FormattedMessage id="checkout" />
                            </LoginButton>
                          )}
                        </p>
                        {!loginStore.isLogin && (
                          <p>
                            <button
                              className={`rc-styled-link color-999`}
                              onClick={() => {
                                this.buyNow();
                              }}
                            >
                              <FormattedMessage id="Buy as a guest" />
                            </button>
                          </p>
                        )}
                      </ul>
                    </div> */}
                    <div className="imageTabBox">
                    {
                      productList.map((el, i) => (
                        <span className={`${i === activeIndex ? 'active' : ''}`} style={{display: 'inline-block', width: '80px', textAlign: 'center', cursor: 'pointer'}} onClick={() => this.setState({ activeIndex: i })}>
                          <img src={noPic} style={{width: '40px', display: 'inline-block', margin: '10px 0'}}/>
                          {/* <p style={{textAlign: 'center'}}>{el.goodsInfo.goodsInfoName}</p> */}
                          <p style={{textAlign: 'center', fontSize: '12px', marginBottom: '5px'}}>{el.goodsInfo.goodsInfoName}</p>
                        </span>
                      ))
                    }    
                    </div>
                    <div className="right">
                      <div className="main">
                        <div className="pic">
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
                      </div>
                      <div className="text">
                          <h2
                            title={
                              productList[activeIndex].goodsInfo.goodsInfoName
                            }
                            className="rc-gamma ui-text-overflow-line2 text-break"
                            style={{ color: '#E2001A' }}
                          >
                            {productList[activeIndex].goodsInfo.goodsInfoName}
                          </h2>
                          {/* <h4>
                            From {formatMoney(Math.min.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))} to {formatMoney(Math.max.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))}
                          </h4> */}
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
                                  fontSize: '22px'
                                  // color: 'rgba(102,102,102,.7)'
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
                            {/* <div className="rc-input product-pricing__card__head__title">
                              <FormattedMessage id="price" />
                            </div> */}
                            <b
                              className="rc-padding-y--none"
                              style={{
                                flex: 3,
                                fontWeight: '200',
                                fontSize: '22px'
                                // color: 'rgba(102,102,102,.7)'
                              }}
                            >
                              {MaxMarketPrice > 0 ? (
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
                              ) : null}
                            </b>
                          </div>
                          {MaxSubPrice > 0 && (
                            <div className="product-pricing__card__head d-flex align-items-center">
                              {/* <div className="rc-input product-pricing__card__head__title">
                                <FormattedMessage id="autoship" />
                              </div> */}
                              <b
                                className="rc-padding-y--none"
                                style={{
                                  flex: 3,
                                  fontWeight: '200',
                                  fontSize: '22px'
                                  // color: 'rgba(102,102,102,.7)'
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

                          <p className="mr-5">
                            {productList[activeIndex].goodsInfo.goods
                              .goodsDescription || ''}
                          </p>
                        </div>
                      <div className="description">
                        <LazyLoad>
                          <img
                            alt=""
                            src={storeLogo}
                            style={{
                              float: 'left',
                              width: '60px',
                              position: 'absolute',
                              left: '50%',
                              top: '-30px',
                              marginLeft: '-30px'
                            }}
                          />
                        </LazyLoad>
                        <p
                          style={{
                            fontSize: '16px',
                            color: '#666666',
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
                          {`${
                            prescriberInfo.phone
                              ? prescriberInfo.phone + ','
                              : ''
                          }${
                            prescriberInfo.primaryZip
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
                      <p
                        style={{
                          textAlign: 'left',
                          fontSize: '14px',
                          color: '#666',
                          marginBottom: '60px',
                          letterSpacing: '0',
                          width: isMobile? '70%': '460px',
                          margin: '0 auto'
                        }}
                      >
                        <span className="iconfont" style={{width: '40px', display: 'inline-block', textAlign: 'center', verticalAlign: 'middle'}}>&#xe6ea;</span>
                        <span style={{width: isMobile?'210px': '420px', display: 'inline-block', verticalAlign: 'middle'}}><FormattedMessage id="recommendation.productDescription" /></span>
                      </p>
                      <p style={{marginTop: '30px', textAlign: 'center', marginBottom: isMobile?'0': '30px'}}>
                        <button
                          className={`rc-btn rc-btn--one ${
                            this.state.buttonLoading ? 'ui-btn-loading' : ''
                          } ${
                            this.state.inStockProducts.length
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
                    </div>
                  </div>
                  <div
                    className="recommendProductInnerMobile"
                    style={{
                      // display: isMobile ? 'block' : 'none'
                      display: 'none'
                    }}
                  >
                    <div className="top">
                      <div
                        style={{
                          padding: '32px 20px',
                          textAlign: 'center',
                          fontWeight: '500',
                          float: 'left'
                        }}
                      >
                        <FormattedMessage id="recommendation.recommendationPackage" />
                      </div>
                      <p
                        ref="p"
                        style={{ marginTop: '60px', textAlign: 'left' }}
                      >
                        {loginStore.isLogin ? (
                          <button
                            ref="loginButton"
                            className={`rc-btn rc-btn--one ${
                              this.state.buttonLoading ? 'ui-btn-loading' : ''
                            }`}
                            onClick={() => this.buyNow()}
                          >
                            <FormattedMessage id="recommendation.buyNow" />
                          </button>
                        ) : (
                          <LoginButton
                            beforeLoginCallback={async () => this.buyNow(true)}
                            btnClass={`rc-btn rc-btn--one ${
                              this.state.buttonLoading ? 'ui-btn-loading' : ''
                            } ${
                              this.state.inStockProducts.length
                                ? ''
                                : 'rc-btn-solid-disabled'
                            }`}
                            history={history}
                          >
                            <FormattedMessage id="checkout" />
                          </LoginButton>
                        )}
                        {!loginStore.isLogin && (
                          <button
                            className={`rc-styled-link color-999`}
                            onClick={() => {
                              // this.hanldeUnloginAddToCart(
                              //   productList,
                              //   '/prescription'
                              // );
                              this.buyNow();
                            }}
                          >
                            <FormattedMessage id="Buy as a guest" />
                          </button>
                        )}
                      </p>
                      {/* {!loginStore.isLogin && (
                        <p>
                          <button
                            className={`rc-styled-link color-999`}
                            onClick={() => {
                              // this.hanldeUnloginAddToCart(
                              //   productList,
                              //   '/prescription'
                              // );
                              this.buyNow()
                            }}
                          >
                            <FormattedMessage id="Buy as a guest" />
                          </button>
                        </p>
                      )} */}
                      <ul
                        style={{
                          overflow: 'hidden',
                          marginTop: '40px',
                          display: 'inline-block'
                        }}
                      >
                        {productList.map((el, i) => (
                          <li
                            onClick={() => this.setState({ activeIndex: i })}
                            className={`${i === activeIndex ? 'active' : ''}`}
                          >
                            <i></i>
                            <LazyLoad>
                              <img
                                alt=""
                                style={{ height: '65px' }}
                                src={
                                  el.goodsInfo.goodsInfoImg ||
                                  el.goodsInfo.goods.goodsImg
                                }
                              />
                            </LazyLoad>
                            <span className="proName">
                              {el.goodsInfo.goodsInfoName}
                            </span>
                            <span className="proName">
                              {el.goodsInfo.specText}
                            </span>
                            <span>X {el.recommendationNumber}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="right">
                      <div className="main">
                        <div className="pic">
                          <ImageMagnifier
                            sizeList={[productList[activeIndex].goodsInfo]}
                            // video={details.goodsVideo}
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

                        <div className="text">
                          <h2
                            title={
                              productList[activeIndex].goodsInfo.goodsInfoName
                            }
                            className="rc-gamma ui-text-overflow-line2 text-break"
                            style={{ color: '#E2001A', marginTop: '3rem' }}
                          >
                            {productList[activeIndex].goodsInfo.goodsInfoName}
                          </h2>

                          {/* <h4>
                            From {formatMoney(Math.min.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))} to {formatMoney(Math.max.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))}
                          </h4> */}
                          {MaxLinePrice > 0 && (
                            <div
                              className="product-pricing__card__head d-flex align-items-center"
                              style={{ fontSize: '1.2rem' }}
                            >
                              <div className="rc-input product-pricing__card__head__title">
                                <FormattedMessage id="listPrice" />
                              </div>
                              <b
                                className="product-pricing__card__head__price  rc-padding-y--none text-line-through"
                                style={{
                                  fontWeight: '200',
                                  color: 'rgba(102,102,102,.7)'
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
                          <div
                            className="product-pricing__card__head d-flex align-items-center"
                            style={{ fontSize: '1.2rem' }}
                          >
                            <div className="rc-input product-pricing__card__head__title">
                              <FormattedMessage id="price" />
                            </div>
                            <b
                              className="rc-padding-y--none"
                              style={{
                                fontWeight: '200'
                                // color: 'rgba(102,102,102,.7)'
                              }}
                            >
                              {MaxMarketPrice > 0 ? (
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
                              ) : null}
                            </b>
                          </div>
                          {MaxSubPrice > 0 && (
                            <div
                              className="product-pricing__card__head d-flex align-items-center"
                              style={{ fontSize: '1.2rem' }}
                            >
                              <div className="rc-input product-pricing__card__head__title">
                                <FormattedMessage id="autoship" />
                              </div>
                              <b
                                className="rc-padding-y--none"
                                style={{
                                  fontWeight: '200'
                                  // color: 'rgba(102,102,102,.7)'
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

                          <p>
                            {productList[activeIndex].goodsInfo.goods
                              .goodsDescription || ''}
                          </p>
                          <p>
                            <button
                              className="rc-btn rc-btn--two mb-3 mt-2"
                              onClick={() => {
                                history.push(
                                  '/details/' +
                                    productList[activeIndex].goodsInfo
                                      .goodsInfoId
                                );
                              }}
                            >
                              <FormattedMessage id="recommendation.viewDetail" />
                            </button>
                          </p>
                        </div>

                        {/* <div className="text">
                      <h2 style={{ color: '#E2001A', marginTop: '40px'}}>
                        { productList[activeIndex].goodsInfo.goodsInfoName}
                      </h2>
                      <h4>
                        From {formatMoney(Math.min.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))}} to $40.99
                      </h4>
                      <p>
                        Renal + hypoallergenic is a complete dietetic food for adult dogs, formulated to support renal function during chronic kidney disease and intended for the reduction of intolerances to certain ingredients…
                      </p>
                      <p>
                        <button className="rc-btn rc-btn--two">View Detail</button>
                      </p>
                      </div> */}
                      </div>
                      {/* <div className="description">
                        <LazyLoad>
                          <img
                            alt=""
                            src={storeLogo}
                            style={{
                              float: 'left',
                              width: '40px',
                              marginRight: '20px'
                            }}
                          />
                        </LazyLoad>
                        <p
                          style={{
                            fontSize: '16px',
                            color: '#666666',
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
                          {prescriberInfo.primaryCity}
                        </p>
                      </div> */}
                      <p
                        style={{
                          textAlign: 'center',
                          fontSize: '12px',
                          color: '#ccc',
                          marginBottom: '60px',
                          letterSpacing: '0'
                        }}
                      >
                        <FormattedMessage id="recommendation.productDescription" />
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </section>

          {/* <div className="rc-layout-container rc-two-column re-p-0 re-p-md-68">
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
                <button className="rc-btn rc-btn--one" onClick={() => this.setState({isAddNewCard: true, paymentCompShow: true})}>View in Cart</button>
              </div>
            </div>
            <div className="rc-column">
              <LazyLoad>
                <img src={recommendation1} style={{ width: '100%' }} alt="" />
              </LazyLoad>
            </div>
          </div> */}
          <div className="rc-max-width--lg rc-padding-y--sm">
                      <div className="rc-max-width--md text-center rc-padding-x--sm">
                        <h2 className="rc-beta text-center">
                          Avec l'Abonnement, ils auront toujours ce dont ils ont
                          besoin
                        </h2>
                        <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--md--mobile">
                          <h2>
                            Certaines choses ne devraient jamais s'épuiser. La
                            nourriture de votre animal de compagnie en fait
                            partie. Dites-nous simplement où et quand
                            l'expédier, et nous nous assurerons que tout ce dont
                            il a besoin arrive directement à votre porte.
                          </h2>
                        </div>
                        {/* <div className="d-block d-md-none rc-text--center">
                          <Link to="/cats">
                            <button className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs">
                              Voir les formules pour chat
                            </button>
                          </Link>
                          <Link to="/dogs">
                            <button className="rc-btn rc-btn--one rc-margin-bottom--xs">
                              Voir les formules pour chien
                            </button>
                          </Link>
                        </div> */}
                      </div>
                      <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                        <div className="rc-column">
                          <div className="rc-padding-y--lg--mobile rc-full-width">
                            <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                10% de réduction sur toutes les commandes en
                                Abonnement
                              </li>
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                Suspendre, modifier ou annuler à tout moment
                              </li>
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                Livraison offerte
                              </li>
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                Ligne d'assistance téléphonique gratuite sur la
                                nutrition
                              </li>
                            </ul>
                            <p style={{marginTop: '30px', marginBottom: '30px'}}>
                            <button
                              className={`rc-btn rc-btn--one ${
                                this.state.buttonLoading ? 'ui-btn-loading' : ''
                              } ${
                                this.state.inStockProducts.length
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
                            {/* <div className="d-none d-md-block rc-btn-group m-0 rc-column rc-padding-x--none">
                              <Link to="/cats">
                                <button className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs">
                                  Voir les formules pour chat
                                </button>
                              </Link>
                              <Link to="/dogs">
                                <button className="rc-btn rc-btn--one rc-margin-bottom--xs">
                                  Voir les formules pour chien
                                </button>
                              </Link>
                            </div> */}
                          </div>
                        </div>
                        <div className="rc-column">
                          <img
                            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=534"
                            data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=534, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=1068 2x"
                            alt="Avec l'Abonnement, ils auront toujours ce dont ils ont besoin"
                            className="w-100 lazyloaded"
                            srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=534, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=1068 2x"
                            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=534"
                          ></img>
                        </div>
                      </div>
                    </div>
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm">
                    <div className="rc-margin-top--md rc-margin-top--none--mobile rc-padding-x--lg--mobile">
                      <h2 className="rc-beta rc-margin--none text-center rc-padding-x--lg--mobile">
                        Comment cela fonctionne-t-il ?
                      </h2>
                    </div>
                    <div className="row rc-content-v-middle text-center rc-padding-top--md rc-margin-x--none">
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <img
                            className="m-auto w-auto lazyloaded"
                            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                            data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            alt="image-one"
                            title="image-one"
                            srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                          ></img>
                        </div>
                        <h7>
                          Ajoutez les produits nutritionnels{' '}
                          <strong>répondant aux besoins de votre animal</strong>{' '}
                          dans votre panier.
                        </h7>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <img
                            className="m-auto w-auto lazyloaded"
                            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                            data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            alt="image two"
                            title="image two"
                            srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                          ></img>
                        </div>
                        <h7>
                          Sélectionnez l'<strong>expédition automatique</strong>{' '}
                          et entrez votre mode de paiement.
                        </h7>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <img
                            className="m-auto w-auto lazyloaded"
                            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                            data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            alt="image three"
                            title="image three"
                            srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                          ></img>
                        </div>
                        <h7>
                          <strong>Recevez votre produit automatiquement</strong>{' '}
                          en fonction de votre calendrier.
                        </h7>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <img
                            className="m-auto w-auto lazyloaded"
                            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                            data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            alt="image four"
                            title="image four"
                            srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                          ></img>
                        </div>
                        <h7>
                          Modifiez vos préférences à{' '}
                          <strong>tout moment</strong>.
                        </h7>
                      </div>
                    </div>
                    
                    <p style={{marginTop: '70px', textAlign: 'center', marginBottom: isMobile?'0': '70px'}}>
                    <button
                className={`rc-btn rc-btn--one ${
                  this.state.buttonLoading ? 'ui-btn-loading' : ''
                } ${
                  this.state.inStockProducts.length
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
                  </div>
          <div className="help-page" style={{ marginBottom: isMobile?0: '1rem' }}>
            <section style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#E2001A', marginTop: isMobile?'0': '40px' }}>
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
                        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm">
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
            <p>
              <button
                className={`rc-btn rc-btn--one ${
                  this.state.buttonLoading ? 'ui-btn-loading' : ''
                } ${
                  this.state.inStockProducts.length
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
            <div class="experience-component experience-assets-youtubeVideo"><div class="rc-max-width--md rc-padding-x--lg">
              <div class="rc-video-wrapper dog-video">
              <iframe allowfullscreen="" frameborder="0" id="video-dog" class="optanon-category-4 " src="https://www.youtube.com/embed/Vhl0Wvpt-KQ"></iframe>
              </div>
              </div>
            </div>
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
          {/* <section
            className="re-p-sm-12 re-p-md-4068"
            style={{ background: '#f6f6f6' }}
          >
            <p>
              <FormattedMessage id="recommendation.fiveContent" />
            </p>
          </section> */}
        </main>

        <Footer />
      </div>
    );
  }
}

export default Help;
