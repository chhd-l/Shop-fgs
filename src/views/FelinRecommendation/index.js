import React from 'react';
import { Link } from 'react-router-dom';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import BannerTip from '@/components/BannerTip';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import Help from '../SmartFeederSubscription/modules/Help';
import recommendation2 from '@/assets/images/fr_recommendation2.png';
import recommendation3 from '@/assets/images/fr_recommendation3.png';
import recommendation4 from '@/assets/images/fr_recommendation4.png';
import storeLogo from '@/assets/images/storeLogo.png';
import ImageMagnifier from '@/components/ImageMagnifierForUS';
import { formatMoney, getDeviceType } from '@/utils/utils';
// import paymentImg from "./img/payment.jpg";
import { inject, observer } from 'mobx-react';
import { getFelinReco } from '@/api/recommendation';
import { getPrescriptionById } from '@/api/clinic';
import { sitePurchase, siteMiniPurchases } from '@/api/cart';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';
import Modal from './components/Modal';
import { funcUrl } from '@/lib/url-utils';

import { distributeLinktoPrecriberOrPaymentPage } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import transparentImg from './images/transparent.svg';
import Loading from '@/components/Loading';
import { seoHoc } from '@/framework/common';
import './index.css';
import Canonical from '@/components/Canonical';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
@inject('checkoutStore', 'loginStore', 'configStore', 'clinicStore')
@injectIntl
@seoHoc('SPT reco landing page')
@observer
class FelinRecommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNoMoreProduct: false,
      pageLoading: true,
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
      couponCode: '',
      productList: [],
      // productList: [{goodsInfo:{goods:{}},goodsInfos:[]},{goodsInfo:{goods:{}},goodsInfos:[]}],
      currentDetail: {},
      images: [],
      activeIndex: 0,
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
      isMobile: false,
      currentBenefit: ''
    };
    this.helpContentText = {
      title: this.props.intl.messages['recommendation.thirdTitle'],
      des: this.props.intl.messages['recommendation.thirdContent'],
      emailTitle:
        this.props.intl.messages['recommendation.helpContentText.emailTitle'],
      emailDes:
        this.props.intl.messages['recommendation.helpContentText.emailDes'],
      emailLink: '/help',
      phoneTitle:
        this.props.intl.messages['recommendation.helpContentText.phoneTitle'],
      phone: '0986568097',
      email: 'latelierfelin@royalcanin.com',
      phoneDes1: '',
      phoneDes2: '8h30-12h30/14h-17h'
    };
  }

  componentWillUnmount() {}
  async componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ isMobile: getDeviceType() === 'H5' });
    this.setState({ loading: true });
    let couponCode = funcUrl({ name: 'couponCode' });
    let noLink = funcUrl({ name: 'noLink' }); //兼容不跳转页面方便调试
    this.setState({ couponCode });
    getFelinReco(id)
      .then((res) => {
        let productLists = res.context;
        productLists.map((el) => {
          el.goodsInfo.goods = el.goodsInfo.goods || {};
          // el.goodsInfo.specText = 'specTextspecText'
          // el.goodsInfo.mockSpecDetailIds = [29805]
          // el.goodsInfo.mockSpecIds = [20612];
          let tmpGoodsDetail = el.goodsInfo.goods.goodsDetail;
          // if (tmpGoodsDetail) {
          //   try {
          //     tmpGoodsDetail = JSON.parse(tmpGoodsDetail);
          //     for (let key in tmpGoodsDetail) {
          //       if (tmpGoodsDetail[key]) {
          //         if (window.__.env.REACT_APP_COUNTRY === 'fr') {
          //           let tempObj = {};
          //           let tempContent = '';
          //           try {
          //             if (key === 'Description') {
          //               tmpGoodsDetail[key].map((el) => {
          //                 tempContent =
          //                   tempContent +
          //                   `<p>${Object.values(JSON.parse(el))[0]}</p>`;
          //               });
          //               el.tabDescription = tempContent;
          //             }
          //             if (key === 'Bénéfices') {
          //               tmpGoodsDetail[key].map((ele) => {
          //                 // <div className="">${Object.keys(JSON.parse(ele))[0]}</div>
          //                 tempContent =
          //                   tempContent +
          //                   `<li>
          //                   <div class="">${
          //                     Object.values(JSON.parse(ele))[0]['Description']
          //                   }</div>
          //                 </li>`;
          //               });
          //               tempContent = `<ul class="">
          //                 ${tempContent}
          //               </ul>`;
          //               // this.setState({currentBenefit: tempContent})
          //               el.benefit = tempContent;
          //             }
          //             // console.log(tempContent, 'tempContent')
          //             // el.goodsInfo.benefit = tempContent
          //           } catch (e) {
          //             console.log(e);
          //           }
          //         } else {
          //         }
          //       }
          //     }
          //   } catch (e) {
          //     console.log(e);
          //   }
          // }
          if (!el.goodsInfo.goodsInfoImg) {
            el.goodsInfo.goodsInfoImg =
              el.goodsInfo.goods.goodsImg || el.images[0]?.artworkUrl;
          }
          el.goodsInfo.goods.sizeList = el.goodsInfos.map((g) => {
            g = Object.assign({}, g, { selected: false });
            console.log(g.goodsInfoId, el, 'hhhh');
            g.salePrice = g.marketPrice;
            if (g.goodsInfoId === el.goodsInfo.goodsInfoId) {
              g.selected = true;
              g.specText = el.goodsInfo.specText;
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
          el.goodsSpecs = specList;
        });
        let productList = productLists.map((el) => {
          el.goodsInfos.forEach((item) => {
            item.salePrice = item.marketPrice;
          });
          return Object.assign(
            {},
            el,
            { goodsName: el.goodsInfo.goodsInfoName },
            { goodsImg: el.goodsInfo.goodsInfoImg },
            el.goods,
            el.goodsInfo?.goods
          );
        });
        let filterProducts = productList.filter((el) => {
          console.info('============', el.goodsInfo.goodsInfoId);
          console.info('addedFlag', el.goodsInfo.addedFlag);
          console.info('delFlag', el.goodsInfo.delFlag);
          console.info('saleableFlag', el.goodsInfo?.goods?.saleableFlag);
          console.info('displayFlag', el.goodsInfo?.goods?.displayFlag);
          return (
            el.goodsInfo.addedFlag &&
            !el.goodsInfo.delFlag &&
            el.goodsInfo.stock >= el.recommendationNumber
          );
        });

        // 只展示上架的，未删除的，可销售的，可展示的商品
        if (!filterProducts.length) {
          this.props.history.push('/cats'); //没数据需要跳转plp
          this.setState({ isNoMoreProduct: true });
        }
        this.setState({ productList: filterProducts }, () => {
          this.checkoutStock();
        });
        // getPrescriptionById({ id: res.context.prescriberId }).then((res) => {
        this.props.clinicStore.setLinkClinicId(res.context.prescriberId);
        this.props.clinicStore.setLinkClinicName('');
        this.props.clinicStore.setAuditAuthority(false);
        this.setState({ loading: false });
        if (noLink) {
          this.setState({ pageLoading: false });
        } else {
          this.buyNow();
        }
        // });
      })
      .catch((err) => {
        console.log(err, 'err');
        this.setState({ pageLoading: false });
        if (noLink) {
          return;
        }
        this.props.history.push('/cats');
      });
  }
  checkoutStock() {
    let { productList, outOfStockProducts, inStockProducts, modalList } =
      this.state;
    for (let i = 0; i < productList.length; i++) {
      if (
        productList[i].recommendationNumber > productList[i].goodsInfo.stock
      ) {
        // outOfStockProducts.push(productList[i]);
      } else {
        inStockProducts.push(productList[i]);
      }
    }
    console.log(inStockProducts, 'instock');
    let outOfStockVal = '';
    outOfStockProducts.forEach((el, i) => {
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
  async hanldeLoginAddToCart({ url }) {
    let retPath = url;
    let { productList, outOfStockProducts, inStockProducts, modalList } =
      this.state;
    const { checkoutStore, loginStore, history, clinicStore } = this.props;
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
            orderSource: 'L_ATELIER_FELIN',
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            goodsCategory: '',
            goodsInfoFlag: 0,
            recommendationId: 'L’ Atelier Félin'
          });
        } catch (e) {
          this.setState({ buttonLoading: false });
        }
      }
      await this.props.checkoutStore.updateLoginCart({
        intl: this.props.intl
      });
      if (retPath === '/checkout') {
        retPath = await distributeLinktoPrecriberOrPaymentPage({
          configStore: this.props.configStore,
          checkoutStore,
          clinicStore,
          isLogin: loginStore.isLogin
        });
      }
      this.props.history.push(retPath);
      // this.props.history.push('/cart');
    }
  }
  // async hanldeUnloginAddToCart(products, path) {
  //   const { intl, checkoutStore } = this.props;
  //   let cartDataCopy = [];
  //   for (let i = 0; i < products.length; i++) {
  //     let product = products[i];

  //     let quantityNew = product.recommendationNumber;
  //     let tmpData = Object.assign({}, product.goodsInfo.goods, {
  //       quantity: quantityNew
  //     });
  //     // let cartDataCopy = cloneDeep(
  //     //   toJS(this.props.checkoutStore.cartData).filter((el) => el)
  //     // )
  //     let flag = true;
  //     if (cartDataCopy && cartDataCopy.length) {
  //       const historyItem = find(
  //         cartDataCopy,
  //         (c) =>
  //           c.goodsId === product.goodsInfo.goodsId &&
  //           product.goodsInfo.goodsInfoId ===
  //             c.sizeList.filter((s) => s.selected)[0].goodsInfoId
  //       );
  //       console.log(historyItem, 'historyItem');
  //       if (historyItem) {
  //         flag = false;
  //         quantityNew += historyItem.quantity;
  //         if (quantityNew > 30) {
  //           this.setState({ addToCartLoading: false });
  //           return;
  //         }
  //         tmpData = Object.assign(tmpData, { quantity: quantityNew });
  //       }
  //     }

  //     const idx = findIndex(
  //       cartDataCopy,
  //       (c) =>
  //         c.goodsId === product.goodsInfo.goodsId &&
  //         product.goodsInfo.goodsInfoId ===
  //           find(c.sizeList, (s) => s.selected).goodsInfoId
  //     );
  //     tmpData = Object.assign(tmpData, {
  //       currentAmount: product.goodsInfo.marketPrice * quantityNew,
  //       selected: true,
  //       quantity: quantityNew,
  //       goodsInfoFlag: 0,
  //       periodTypeId: null
  //     });
  //     console.log(idx, 'idx');
  //     if (idx > -1) {
  //       cartDataCopy.splice(idx, 1, tmpData);
  //     } else {
  //       if (cartDataCopy.length >= window.__.env.REACT_APP_LIMITED_CATE_NUM) {
  //         this.setState({
  //           checkOutErrMsg: (
  //             <FormattedMessage
  //               id="cart.errorMaxCate"
  //               values={{ val: window.__.env.REACT_APP_LIMITED_CATE_NUM }}
  //             />
  //           )
  //         });
  //         return;
  //       }
  //       cartDataCopy.push(tmpData);
  //     }
  //     console.log(cartDataCopy, 'cartDataCopy');

  //     await checkoutStore.updateUnloginCart({
  //       cartData: cartDataCopy,
  //       intl
  //     });
  //   }
  //   this.props.history.push(path);
  // }
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
  //  hanldeLoginAddToCart = async (details) => {
  //   let param = {
  //     goodsInfoId: details.goodsInfo.goodsInfoId,
  //     goodsNum: 1,
  //     recommendationId: shelter.value,
  //     recommendationName: shelter.name,
  //     currentUnitPrice: details.goodsInfo?.marketPrice,
  //     goodsInfoFlag: 0,
  //     periodTypeId: null
  //     // goodsInfoFlag: details.goodsInfoFlag,
  //     // periodTypeId: details.defaultFrequencyId
  //   };
  //   try {
  //     await sitePurchase(param);
  //     await checkoutStore.updateLoginCart({
  //       intl: props.intl
  //     });
  //     props.history.push('/cart');
  //   } catch (err) {
  //     setBtnLoading(false);
  //   }
  // };
  hanldeUnloginAddToCart = async ({ productList: products, url = '/cart' }) => {
    const { intl, checkoutStore, clinicStore, history, loginStore } =
      this.props;
    let retPath = url;
    let cartItems = products.map((product) => {
      return Object.assign({}, product, product.goodsInfo, {
        selected: true,
        currentAmount:
          product.goodsInfo.marketPrice * product.recommendationNumber,
        quantity: product.recommendationNumber,
        currentUnitPrice: product.goodsInfo?.marketPrice,
        goodsInfoFlag: 0,
        recommendationId: 'L’ Atelier Félin',
        periodTypeId: null,
        orderSource: 'L_ATELIER_FELIN'
        // goodsInfoFlag: product.goodsInfoFlag,
        // periodTypeId: product.defaultFrequencyId,
      });
    });
    try {
      await checkoutStore.hanldeUnloginAddToCart({
        cartItemList: cartItems,
        valid: true,
        ...this.props
      });
      if (retPath === '/checkout') {
        retPath = await distributeLinktoPrecriberOrPaymentPage({
          configStore: this.props.configStore,
          checkoutStore,
          clinicStore,
          isLogin: loginStore.isLogin
        });
      }
      this.props.history.push(retPath);
      // history.push('/cart');
    } catch (err) {
      console.info('err', err);
      this.setState({ buttonLoading: false });
      // setBtnLoading(false);
    }
  };
  // 添加购物车，并跳转/checkout页面
  buyNow = async () => {
    const { checkoutStore, loginStore, history, clinicStore } = this.props;
    let { productList, outOfStockProducts, inStockProducts, modalList } =
      this.state;
    let totalPrice;
    inStockProducts.forEach((el) => {
      console.log(el, 'instock');
      totalPrice =
        totalPrice + el.recommendationNumber * el.goodsInfo.salePrice;
      return el;
    });
    if (outOfStockProducts.length > 0) {
      sessionItemRoyal.set(
        'recommend_product',
        JSON.stringify(inStockProducts)
      );
      this.setState({ modalShow: true, currentModalObj: modalList[1] });
      return false;
    } else {
      // for (let i = 0; i < inStockProducts.length; i++) {
      //   try {
      //     await sitePurchase({
      //       goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
      //       goodsNum: inStockProducts[i].recommendationNumber,
      //       goodsCategory: '',
      //       goodsInfoFlag: 0
      //     });
      //     await checkoutStore.updateLoginCart();
      //   } catch (e) {
      //     this.setState({ buttonLoading: false });
      //   }
      // }
      await this.props.checkoutStore.setPromotionCode(this.state.couponCode);

      this.setState({ buttonLoading: true });
      try {
        if (loginStore.isLogin) {
        } else {
          inStockProducts.map((el) => {
            el.goodsInfo.buyCount = el.recommendationNumber;
            return el.goodsInfo;
          });
        }

        if (loginStore.isLogin) {
          await this.hanldeLoginAddToCart({
            url: '/checkout'
          });
        } else {
          await this.hanldeUnloginAddToCart({
            productList: this.state.productList,
            url: '/checkout'
          });
        }
      } catch (err) {
        console.info('err', err);
      } finally {
        this.setState({ buttonLoading: false });
      }
    }
  };
  async hanldeClickSubmit() {
    const { checkoutStore, loginStore, history, clinicStore } = this.props;
    let { currentModalObj, subDetail, outOfStockProducts, inStockProducts } =
      this.state;
    this.setState({ loading: true, modalShow: false });
    if (currentModalObj.type === 'addToCart') {
      for (let i = 0; i < inStockProducts.length; i++) {
        try {
          await sitePurchase({
            orderSource: 'L_ATELIER_FELIN',
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            goodsCategory: '',
            goodsInfoFlag: 0
          });
          await checkoutStore.updateLoginCart({ intl: this.props.intl });
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
      const url = await distributeLinktoPrecriberOrPaymentPage({
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
    const createMarkup = (text) => ({ __html: text });
    // const { details, images } = this.state
    console.log('props', this.props);
    let details = JSON.parse(sessionItemRoyal.get('detailsTemp'));
    let images = JSON.parse(sessionItemRoyal.get('imagesTemp'));
    let { productList, activeIndex, currentModalObj, isMobile } = this.state;
    let MaxPrice = productList[activeIndex]?.goodsInfo.marketPrice;
    let MinPrice = productList[activeIndex]?.goodsInfo.salePrice;
    console.info('productList[activeIndex]', productList[activeIndex]);
    console.info(
      'productLis[activeIndex]productList[activeIndex]?.goodsInfo',
      productList[activeIndex]?.goodsInfo
    );
    // if (productList.length) {
    //   MaxLinePrice = Math.max.apply(
    //     null,
    //     productList[activeIndex].goodsInfos.map((g) => g.linePrice || 0)
    //   );
    //   MinLinePrice = Math.min.apply(
    //     null,
    //     productList[activeIndex].goodsInfos.map((g) => g.linePrice || 0)
    //   );
    //   MaxMarketPrice = Math.max.apply(
    //     null,
    //     productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
    //   );
    //   MinMarketPrice = Math.min.apply(
    //     null,
    //     productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
    //   );
    //   MaxSubPrice = Math.min.apply(
    //     null,
    //     productList[activeIndex].goodsInfos.map((g) => g.subscriptionPrice || 0)
    //   );
    //   MinSubPrice = Math.min.apply(
    //     null,
    //     productList[activeIndex].goodsInfos.map((g) => g.subscriptionPrice || 0)
    //   );
    // }
    let cur_recommendation2 = recommendation2;
    let cur_recommendation3 = recommendation3;
    let cur_recommendation4 = recommendation4;

    return (
      <div className="Recommendation_FR Recommendation_US">
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <Modal
          key="1"
          needLogin={false}
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
        {this.state.pageLoading ? (
          <Loading bgColor={'#fff'} opacity={1} />
        ) : null}
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <div
            className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
              this.state.errorMsg ? '' : 'hidden'
            }`}
            style={{
              width: '50%',
              margin: '1.25rem auto 0'
            }}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close"
              role="alert"
            >
              {this.state.errorMsg}
            </aside>
          </div>
          <div>
            <section
              className="text-center"
              style={{ width: isMobile ? '95%' : '60%', margin: '0 auto' }}
            >
              <h1 style={{ color: '#E2001A', margin: '1.25rem' }}>
                Bienvenue !
              </h1>
              <h2 style={{ color: '#E2001A', margin: '1.25rem' }}>
                voici notre recommandation.
              </h2>
              {/* <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              <FormattedMessage id="recommendation.firstTitle" />
            </h2> */}
              <p style={{ fontSize: '1.125rem' }}>
                {/* <FormattedMessage id="recommendation.firstContent" /> */}
                La recommandation a été faite en fonction des besoins uniques de
                votre animal.
              </p>
              <p>
                <button
                  className={`3444 rc-btn rc-btn--one ${
                    this.state.buttonLoading ? 'ui-btn-loading' : ''
                  } ${
                    this.state.inStockProducts.length
                      ? ''
                      : 'rc-btn-solid-disabled'
                  }`}
                  onClick={this.buyNow}
                >
                  <FormattedMessage id="checkout" />
                </button>
              </p>
            </section>
          </div>
          {this.state.isNoMoreProduct ? (
            <div
              className="rc-max-width--xl"
              style={{ fontSize: '2.5rem', textAlign: 'center' }}
            >
              <FormattedMessage id="recommendation.noMoreRecommendation" />
            </div>
          ) : (
            <div className="transparentSection">
              <section className="recommendProduct re-custom">
                {this.state.loading ? (
                  <div>
                    <div
                      className="recommendProductInner"
                      style={{
                        background: '#fff',
                        minHeight: '600px'
                      }}
                    >
                      <Skeleton
                        color="#f5f5f5"
                        width="100%"
                        height="100%"
                        count="3"
                      />
                    </div>
                  </div>
                ) : (
                  productList.length > 0 && (
                    <div>
                      <div className="recommendProductInner">
                        <div className="imageTabBox">
                          {productList.map((el, i) => (
                            <span
                              className={`rc-btn--sm ${
                                i === activeIndex ? 'active' : ''
                              }`}
                              style={{
                                display: 'inline-block',
                                // width: '80px',
                                textAlign: 'center',
                                cursor: 'pointer'
                              }}
                              onClick={() => this.setState({ activeIndex: i })}
                            >
                              <img
                                src={el.goodsInfo.goodsInfoImg}
                                style={{
                                  width: '60px',
                                  display: 'inline-block',
                                  margin: '.625rem 0'
                                }}
                                alt="goods information image"
                              />
                              {/* <p style={{textAlign: 'center'}}>{el.goodsInfo.goodsInfoName}</p> */}
                              <p
                                style={{
                                  textAlign: 'center',
                                  fontSize: '1rem',
                                  marginBottom: '5px',
                                  width: '100%',
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {el.goodsInfo.goodsInfoName}
                              </p>
                            </span>
                          ))}
                        </div>
                        <div className="right">
                          <div className="main">
                            <div className="pic">
                              <ImageMagnifier
                                sizeList={[productList[activeIndex].goodsInfo]}
                                images={[productList[activeIndex].goodsInfo]}
                                minImg={
                                  productList[activeIndex].goodsInfo
                                    .goodsInfoImg
                                }
                                maxImg={
                                  productList[activeIndex].goodsInfo
                                    .goodsInfoImg
                                }
                                config={false}
                              />
                            </div>
                          </div>
                          <div className="text rc-margin-y--sm">
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
                            {/* <div className="product-pricing__card__head d-flex align-items-center">
                            <b
                              className="rc-padding-y--none"
                              style={{
                                flex: 3,
                                fontWeight: '200',
                                fontSize: '1.375rem'
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
                          </div> */}
                            {MaxPrice > 0 ? (
                              MinPrice == MaxPrice ? (
                                <div className="product-pricing__card__head d-flex align-items-center">
                                  {/* <div className="rc-input product-pricing__card__head__title">
                                <FormattedMessage id="autoship" />
                              </div> */}
                                  <b
                                    className="rc-padding-y--none"
                                    style={{
                                      flex: 3,
                                      fontWeight: '200',
                                      fontSize: '1.375rem'
                                      // color: 'rgba(102,102,102,.7)'
                                    }}
                                  >
                                    <span>
                                      <FormattedMessage id="from" />{' '}
                                      {formatMoney(MinPrice)}{' '}
                                      <FormattedMessage id="à" />{' '}
                                      {formatMoney(MaxPrice)}
                                    </span>
                                    {/* {MaxSubPrice > 0 ? (
                                  MaxSubPrice === MinSubPrice ? (
                                    <span>{formatMoney(MaxSubPrice)}</span>
                                  ) : (

                                  )
                                ) : null} */}
                                  </b>
                                </div>
                              ) : (
                                <span>{formatMoney(MaxPrice)}</span>
                              )
                            ) : null}
                            <p style={{ color: '#333' }}>(10g)</p>
                            <p
                              style={{
                                width: '100%',
                                margin: '0 auto',
                                padding: isMobile ? '0 1.25rem' : '0 40px'
                              }}
                              dangerouslySetInnerHTML={createMarkup(
                                productList[activeIndex].goodsInfo.goods
                                  .goodsDescription ||
                                  productList[activeIndex].tabDescription ||
                                  ''
                              )}
                            >
                              {/* {productList[activeIndex].goodsInfo.goods
                              .goodsDescription || productList[activeIndex].tabDescription || ''} */}
                            </p>
                          </div>
                          {/* <div className="description">
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
                              fontSize: '1rem',
                              color: '#666666',
                              fontWeight: '500',
                              letterSpacing: '0'
                            }}
                          >
                            {prescriberInfo.prescriberName}
                          </p>
                          <p
                            style={{
                              fontSize: '.75rem',
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
                              fontSize: '.75rem',
                              letterSpacing: '0'
                            }}
                          >
                            {`${prescriberInfo.location}`}
                          </p>
                        </div> */}
                          {/* <p
                          style={{
                            textAlign: 'left',
                            fontSize: '.875rem',
                            color: '#666',
                            marginBottom: '60px',
                            letterSpacing: '0',
                            width: isMobile ? '70%' : '460px',
                            margin: '0 auto'
                          }}
                        >
                          <span
                            className="iconfont"
                            style={{
                              width: '40px',
                              display: 'inline-block',
                              textAlign: 'center',
                              verticalAlign: 'middle'
                            }}
                          >
                            &#xe6ea;
                          </span>
                          <span
                            style={{
                              width: isMobile ? '210px' : '420px',
                              display: 'inline-block',
                              verticalAlign: 'middle'
                            }}
                          >
                            <FormattedMessage id="recommendation.productDescription" />
                          </span>
                        </p> */}
                          {productList[activeIndex].benefit ? (
                            <p
                              className="benefit"
                              style={{
                                width: '100%',
                                margin: '0 auto',
                                padding: isMobile ? '0 1.25rem' : '0 40px'
                              }}
                            >
                              <h5
                                className="red"
                                style={{
                                  margin: '30px 0 1.25rem',
                                  fontSize: isMobile ? '1.125rem' : 'auto'
                                }}
                              >
                                Les bénéfices
                              </h5>
                              <p
                                style={{ fontSize: isMobile ? '1rem' : 'auto' }}
                                dangerouslySetInnerHTML={
                                  // productList[activeIndex].goodsInfo.goods
                                  // &&
                                  createMarkup(
                                    // this.state.currentBenefit
                                    productList[activeIndex].benefit
                                    // productList[activeIndex].goodsInfo.goods
                                    // .benefit
                                    // JSON.parse(
                                    //   productList[activeIndex].goodsInfo.goods
                                    //     .benefit
                                    // )['Beneficios']
                                  )
                                }
                              ></p>
                              {/* <p>{productList[activeIndex]}</p> */}
                            </p>
                          ) : null}

                          {/* <p
                            style={{
                              marginTop: '30px',
                              textAlign: 'center',
                              marginBottom: isMobile ? '0' : '30px'
                            }}
                          >
                            <button
                              className={`rc-btn rc-btn--one ${
                                this.state.buttonLoading ? 'ui-btn-loading' : ''
                              } ${
                                this.state.inStockProducts.length
                                  ? ''
                                  : 'rc-btn-solid-disabled'
                              }`}
                              onClick={this.buyNow}
                              // onClick={() => {
                              //   if (loginStore.isLogin) {
                              //     this.hanldeLoginAddToCart();
                              //   } else {
                              //     this.hanldeUnloginAddToCart(
                              //       productList,
                              //       '/cart'
                              //     );
                              //   }
                              // }}
                            >
                            <FormattedMessage id="recommendation.viewInCart" />

                            </button>
                          </p> */}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </section>
            </div>
          )}
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
          <div className="rc-max-width--lg rc-padding-y--lg">
            <div className="rc-max-width--md text-center rc-padding-x--sm">
              <h2 className="rc-beta text-center">
                Ne manquez jamais de nourriture pour votre animal!
              </h2>
              <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--md--mobile">
                <h2>
                  Notre service d'expédition automatique est conçu pour vous
                  simplifier la vie et vous permettre de toujours recevoir le
                  meilleur régime alimentaire pour votre animal de compagnie,
                  directement à votre porte.
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
                      <em className="wof rc-margin-right--xs"></em>
                      Économisez 10% sur chaque commande
                    </li>
                    <li className="rc-list__item">
                      <em className="wof rc-margin-right--xs"></em>
                      Livraison automatique selon votre calendrier
                    </li>
                    <li className="rc-list__item">
                      <em className="wof rc-margin-right--xs"></em>
                      Livraison gratuite
                    </li>
                    <li className="rc-list__item">
                      <em className="wof rc-margin-right--xs"></em>
                      Modifier ou annuler à tout moment
                    </li>
                  </ul>
                  <p style={{ marginTop: '30px', marginBottom: '30px' }}>
                    <button
                      className={`1111 rc-btn rc-btn--one ${
                        this.state.buttonLoading ? 'ui-btn-loading' : ''
                      } ${
                        this.state.inStockProducts.length
                          ? ''
                          : 'rc-btn-solid-disabled'
                      }`}
                      onClick={this.buyNow}

                      // onClick={() => {
                      //   if (loginStore.isLogin) {
                      //     this.hanldeLoginAddToCart();
                      //   } else {
                      //     this.hanldeUnloginAddToCart(productList, '/cart');
                      //   }
                      // }}
                    >
                      {/* <FormattedMessage id="recommendation.viewInCart" /> */}
                      S'inscrire
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
                  alt="Avec l'Abonnement, ils auront toujours ce dont ils ont besoin"
                  className="w-100 lazyloaded"
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship.webp`}
                />
              </div>
            </div>
          </div>
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm">
            <div className="rc-margin-top--md rc-margin-top--none--mobile rc-padding-x--lg--mobile">
              <h2 className="rc-beta rc-margin--none text-center rc-padding-x--lg--mobile">
                Prêt à démarrer ?
              </h2>
            </div>
            <div className="row rc-content-v-middle text-center rc-padding-top--md rc-margin-x--none">
              <div className="col-6 col-md-3 rc-column">
                <div className="rc-margin-bottom--sm">
                  <img
                    className="m-auto w-auto lazyloaded"
                    alt="image one"
                    title="image one"
                    src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/pack@180.png`}
                  />
                </div>
                <h7>
                  Trouvez les produits{' '}
                  <strong>nutritionnels que vous avez sélectionnés</strong> dans
                  votre panier.
                </h7>
              </div>
              <div className="col-6 col-md-3 rc-column">
                <div className="rc-margin-bottom--sm">
                  <img
                    className="m-auto w-auto lazyloaded"
                    alt="image two"
                    title="image two"
                    src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship@180.png`}
                  />
                </div>
                <h7>
                  Sélectionnez votre mode{' '}
                  <strong>d'expédition, de livraison </strong>et{' '}
                  <strong>de paiement</strong>.
                </h7>
              </div>
              <div className="col-6 col-md-3 rc-column">
                <div className="rc-margin-bottom--sm">
                  <img
                    className="m-auto w-auto lazyloaded"
                    alt="image three"
                    title="image three"
                    src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship2@180.png`}
                  />
                </div>
                <h7>
                  <strong>Recevez votre produit automatiquement</strong>, selon
                  votre propre agenda.
                </h7>
              </div>
              <div className="col-6 col-md-3 rc-column">
                <div className="rc-margin-bottom--sm">
                  <img
                    className="m-auto w-auto lazyloaded"
                    alt="image four"
                    title="image four"
                    src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship3@180.png`}
                  />
                </div>
                <h7>
                  <p>
                    Modifiez votre planning{' '}
                    <strong>de livraison à n'importe quel moment.</strong>
                  </p>
                </h7>
              </div>
            </div>

            <p
              style={{
                marginTop: '70px',
                textAlign: 'center',
                marginBottom: isMobile ? '0' : '70px'
              }}
            >
              <button
                className={`222 rc-btn rc-btn--one ${
                  this.state.buttonLoading ? 'ui-btn-loading' : ''
                } ${
                  this.state.inStockProducts.length
                    ? ''
                    : 'rc-btn-solid-disabled'
                }`}
                onClick={this.buyNow}

                // onClick={() => {
                //   if (loginStore.isLogin) {
                //     this.hanldeLoginAddToCart();
                //   } else {
                //     this.hanldeUnloginAddToCart(productList, '/cart');
                //   }
                // }}
              >
                {/* <FormattedMessage id="recommendation.viewInCart" /> */}
                Commencez maintenant
              </button>
            </p>
          </div>
          <div className="help-container 1111">
            <Help
              isRecommendationPage={true}
              contentText={this.helpContentText}
              needReverse={false}
            />
          </div>
          {/*  <div
            className="help-page"
            style={{ marginBottom: isMobile ? 0 : '1rem' }}
          >

           <div className="experience-region experience-main">
              <div className="experience-region experience-main">
                <div className="experience-component experience-layouts-1column">
                  <div className="row rc-margin-x--none">
                    <div className="rc-full-width">
                      <div className="experience-component experience-assets-contactUsBlock">
                        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm">
                          <div className="rc-layout-container rc-two-column rc-margin-y--sm text-center md:text-left rc-margin-top--lg--mobile">
                          </div>
                          <div className="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center md:text-left">
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
                                    <img
                                      src={helpImg}
                                      alt="help-icon"
                                      title=""
                                    />
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
          </div>*/}

          <section
            className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
            style={{ textAlign: 'center' }}
          >
            <div className="text-center rc-margin-y--sm rc-margin-top--lg--mobile rc-column">
              <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                <FormattedMessage id="recommendation.fourTitle" />
              </h2>
              <p>
                <FormattedMessage id="recommendation.fourContent" />
              </p>
            </div>
            <p>
              <button
                className={`333 rc-btn rc-btn--one ${
                  this.state.buttonLoading ? 'ui-btn-loading' : ''
                } ${
                  this.state.inStockProducts.length
                    ? ''
                    : 'rc-btn-solid-disabled'
                }`}
                onClick={this.buyNow}

                // onClick={() => {
                //   if (loginStore.isLogin) {
                //     this.hanldeLoginAddToCart();
                //   } else {
                //     this.hanldeUnloginAddToCart(productList, '/cart');
                //   }
                // }}
              >
                {/* <FormattedMessage id="recommendation.viewInCart"/> */}
                Commander
              </button>
            </p>
            <div className="experience-component experience-assets-youtubeVideo">
              <div className="rc-max-width--md rc-padding-x--lg">
                <div className="rc-video-wrapper dog-video">
                  <iframe
                    allowfullscreen=""
                    frameborder="0"
                    id="video-dog"
                    className="optanon-category-4 "
                    src="https://www.youtube.com/embed/Vhl0Wvpt-KQ"
                  ></iframe>
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
                <img src={cur_recommendation2} alt="recommendation image" />
              </LazyLoad>
            </li>
            <li>
              <LazyLoad>
                <img src={cur_recommendation3} alt="recommendation image" />
              </LazyLoad>
            </li>
            <li>
              <LazyLoad>
                <img src={cur_recommendation4} alt="recommendation image" />
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
          <Footer />
        </main>
      </div>
    );
  }
}

export default FelinRecommendation;
