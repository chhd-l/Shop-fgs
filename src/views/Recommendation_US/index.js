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
import recommendation2 from '@/assets/images/fr_recommendation2.png';
import recommendation3 from '@/assets/images/fr_recommendation3.png';
import recommendation4 from '@/assets/images/fr_recommendation4.png';
import noPic from '@/assets/images/noPic.png';
import storeLogo from '@/assets/images/storeLogo.png';
import COHORTADVISOR from './images/COHORT-A_CLUB-BENEFITS_PET-ADVISOR.png';
import CLUBSHIPPING from './images/CLUB-BENEFITS_FREE-SHIPPING.png';
import CLUBRECOS from './images/CLUB-BENEFITS_PRODUCT-RECOS.png';
// import ImageMagnifier from './components/ImageMagnifier';
import ImageMagnifier from '../Recommendation_FR/components/ImageMagnifier';
import { formatMoney, getDeviceType } from '@/utils/utils';
// import paymentImg from "./img/payment.jpg";
import { inject, observer } from 'mobx-react';
import Help from '../SmartFeederSubscription/modules/Help';
import {
  getRecommendationList,
  getRecommendationList_fr
} from '@/api/recommendation';
import { getPrescriptionById } from '@/api/clinic';
import { getProductPetConfig } from '@/api/payment';
import { sitePurchase } from '@/api/cart';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';
import catIconPng from './images/cat-icon.png';
import dogIconPng from './images/dog-icon.png';
import step1Hover from './images/Step1_Hover.png';
import step1Normal from './images/Step1_Normal.png';
import step2Hover from './images/Step2_Hover.png';
import step2Normal from './images/Step2_Normal.png';
import step3Hover from './images/Step3_Hover.png';
import step3Normal from './images/Step3_Normal.png';
import step4Hover from './images/Step4_Hover.png';
import step4Normal from './images/Step4_Normal.png';
import Modal from '../Recommendation_FR/components/Modal';
import {
  setSeoConfig,
  distributeLinktoPrecriberOrPaymentPage
} from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import transparentImg from './images/transparent.svg';
import { Helmet } from 'react-helmet';
import autoshipCatPng from './images/autoship_cat.png';
const petsTypeImagArr = [
  `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship.webp`,
  autoshipCatPng
];
const petsVideoArr = [];
const petsiconArr = [dogIconPng, catIconPng];
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;
const imagesArr = [
  { img: COHORTADVISOR, text: 'Royal Canin Pet Advisor Live' },
  { img: CLUBRECOS, text: 'Personalized Recommendations' },
  { img: CLUBSHIPPING, text: 'Free Shipping & 5% Off Every Autoship Order' }
];
const secondlistArr = [
  {
    altText: 'image one',
    imgPath: step1Normal,
    imgHover: step1Hover,
    isHover: false,
    text:
      'Find your <strong>personally-selected nutrition products</strong> in your cart.'
  },
  {
    altText: 'image two',
    imgHover: step2Hover,
    isHover: false,
    imgPath: step2Normal,
    text:
      'Select your <strong>shipment frequency, delivery </strong>and <strong>payment method.</strong>.'
  },
  {
    imgHover: step3Hover,
    isHover: false,
    altText: 'image three',
    imgPath: step3Normal,
    text:
      '<strong>Receive your product automatically </strong>,based on your own schedule'
  },
  {
    imgHover: step4Hover,
    isHover: false,
    altText: 'image four',
    imgPath: step4Normal,
    text: 'Change your schedule<strong>anytime you want.</strong>'
  }
];

@inject('checkoutStore', 'loginStore', 'clinicStore', 'clinicStore')
@inject('configStore')
@injectIntl
@observer
class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondlist: secondlistArr,
      showMore: false,
      petType: 1, //0 dog;1 cat
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
      isMobile: false,
      currentBenefit: ''
    };

    this.helpContentText = {
      title: 'Our pet experts are here to help you',
      des:
        "We're pet lovers and experts in cat and dog nutrition and we're ready to to help you with any questions you might have.",
      emailTitle: 'Email us',
      emailDes: ' We will respond as soon as possible.',
      emailLink: '/help/contact',
      phoneTitle: 'Call us',
      phone: '1-844-673-3772',
      email: 'Send us an Email',
      phoneDes: 'Monday trought Friday:8:00 AM - 4:30  PM CT'
    };
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  hoverChange(e, idx) {
    console.info('......', idx);
    let { secondlist } = this.state;
    secondlist.forEach((item, index) => {
      if (index == idx) {
        item.isHover = true;
      } else {
        item.isHover = false;
      }
    });
    console.info('secondlist', secondlist);
    this.setState({ secondlist });
  }
  async componentDidMount() {
    let paramArr = this.props.location.search.split('&');
    let token = paramArr[paramArr.length - 1].split('=')[1];
    setSeoConfig({
      pageName: 'SPT reco landing page'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
    this.setState({ isMobile: getDeviceType() === 'H5' });
    this.setState({ loading: true });
    getRecommendationList_fr(token)
      .then((res) => {
        let petType = res.context.petSpecie?.toLowerCase() === 'cat' ? 1 : 0;
        let productList = res.context.recommendationGoodsInfoRels;
        productList.map((el) => {
          let tmpGoodsDetail = el.goodsInfo.goods.goodsDetail;
          if (tmpGoodsDetail) {
            try {
              tmpGoodsDetail = JSON.parse(tmpGoodsDetail);
              for (let key in tmpGoodsDetail) {
                if (tmpGoodsDetail[key]) {
                  if (process.env.REACT_APP_LANG === 'fr') {
                    let tempObj = {};
                    let tempContent = '';
                    try {
                      if (key === 'Description') {
                        tmpGoodsDetail[key].map((el) => {
                          tempContent =
                            tempContent +
                            `<p>${Object.values(JSON.parse(el))[0]}</p>`;
                        });
                        el.tabDescription = tempContent;
                      }
                      if (key === 'Bénéfices') {
                        let tempContentMobile = '';
                        tmpGoodsDetail[key].map((ele, idx) => {
                          // <div class="">${Object.keys(JSON.parse(ele))[0]}</div>
                          tempContent =
                            tempContent +
                            `<li>
                            <div class="">${
                              Object.values(JSON.parse(ele))[0]['Description']
                            }</div>
                          </li>`;
                          tempContentMobile =
                            tempContentMobile +
                            `
                          <div class="rc-list__accordion-item">
                          <dt>
                            <button
                              class="rc-list__header"
                              id="heading-${idx}"
                              data-toggle="content-${idx}"
                            >
                              <div>
                              Benefit${idx + 1}
                              </div>
                            </button>
                          </dt>
                          <dd
                            class="rc-list__content"
                            id="content-${idx}"
                            aria-labelledby="heading-${idx}"
                            style="text-align:left"
                          >
                            ${Object.values(JSON.parse(ele))[0]['Description']}
                          </dd>
                        </div>
                          `;
                        });
                        tempContent = `<ul class=" rc-md-up">
                          ${tempContent}
                        </ul>`;
                        tempContentMobile = `<div class="fr-faq rc-md-down" style="padding:0">
                        <dl
                          data-toggle-group=""
                          data-toggle-effect="rc-expand--vertical"
                          class=""
                        >
                        ${tempContentMobile}
                        </dl>
                      </div>`;
                        // this.setState({currentBenefit: tempContent})
                        el.benefit = tempContent;
                        el.benefitMobile = tempContentMobile;
                      }
                      // console.log(tempContent, 'tempContent')
                      // el.goodsInfo.benefit = tempContent
                    } catch (e) {
                      console.log(e);
                    }
                  } else {
                  }
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
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

        this.setState({ productList, petType }, () => {
          this.checkoutStock();
        });
        // getPrescriptionById({ id: res.context.prescriberId }).then((res) => {
        this.props.clinicStore.setLinkClinicId(res.context.prescriberId);
        this.props.clinicStore.setLinkClinicName('');
        this.props.clinicStore.setAuditAuthority(false);
        this.setState({ loading: false });
        // });
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
  get100Words = (str) => {
    let removeTAGStr = str.replace(/<[^>]+>/g, '');
    let sliceText = removeTAGStr.slice(0, 200) || '';
    let trimStr = sliceText.trim();
    return trimStr ? trimStr + '...' : '';
  };
  seeMore = () => {
    this.setState({ showMore: true });
  };
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
    const createMarkup = (text) => ({ __html: text });
    // const { details, images } = this.state
    console.log('props', this.props);
    let details = JSON.parse(sessionItemRoyal.get('detailsTemp'));
    let images = JSON.parse(sessionItemRoyal.get('imagesTemp'));
    let { productList, activeIndex, currentModalObj, isMobile } = this.state;
    console.log(productList, 'sdsajdkldsa');
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
    let tabDes =
      productList[activeIndex]?.goodsInfo.goods.goodsDescription ||
      productList[activeIndex]?.tabDescription ||
      '';
    let tabDesText = this.get100Words(tabDes);
    return (
      <div className="Recommendation_FR">
        {/* <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet> */}
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
          <div>
            <section
              className="text-center"
              style={{ width: isMobile ? '95%' : '60%', margin: '0 auto' }}
            >
              <h1
                className={`${
                  process.env.REACT_APP_LANG === 'fr' ? '' : 'hide'
                }`}
                style={{ color: '#E2001A', margin: '20px' }}
              >
                Bienvenue !
              </h1>
              <h2 style={{ color: '#E2001A', margin: '20px' }}>
                <FormattedMessage id="recommendation.welcomeText" />
                {/* Merci pour votre visite en magasin, voici notre recommandation. */}
              </h2>
              {/* <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              <FormattedMessage id="recommendation.firstTitle" />
            </h2> */}
              <p style={{ fontSize: '18px' }}>
                <FormattedMessage id="recommendation.welcomeSubText" />
                {/* La recommandation a été faite en fonction des besoins uniques de
                votre animal. */}
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
                  <FormattedMessage id="recommendation.welcomeBtn" />
                  {/* Voir le panier */}
                </button>
              </p>
            </section>
          </div>
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
                productList.length && (
                  <div>
                    <div className="recommendProductInner">
                      <div className="imageTabBox">
                        {productList.map((el, i) => (
                          <span
                            className={`${i === activeIndex ? 'active' : ''}`}
                            style={{
                              display: 'inline-block',
                              width: '80px',
                              textAlign: 'center',
                              cursor: 'pointer'
                            }}
                            onClick={() => this.setState({ activeIndex: i })}
                          >
                            <img
                              src={el.goodsInfo.goodsInfoImg}
                              style={{
                                width: '40px',
                                display: 'inline-block',
                                margin: '10px 0'
                              }}
                            />
                            {/* <p style={{textAlign: 'center'}}>{el.goodsInfo.goodsInfoName}</p> */}
                            <p
                              style={{
                                textAlign: 'center',
                                fontSize: '12px',
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
                                <span>
                                  <FormattedMessage id="from" />{' '}
                                  {formatMoney(MinSubPrice)}{' '}
                                  <FormattedMessage id="to" />{' '}
                                  {formatMoney(MaxMarketPrice)}
                                </span>
                                {/* {MaxSubPrice > 0 ? (
                                  MaxSubPrice === MinSubPrice ? (
                                    <span>{formatMoney(MaxSubPrice)}</span>
                                  ) : (
                                    
                                  )
                                ) : null} */}
                              </b>
                            </div>
                          )}
                          {this.state.showMore ? (
                            <p
                              className="product_info"
                              dangerouslySetInnerHTML={createMarkup(tabDes)}
                            ></p>
                          ) : (
                            <p
                              className="product_info"
                              style={{
                                display: `${tabDesText ? '' : 'none'}`
                              }}
                            >
                              {tabDesText}
                              <strong
                                style={{
                                  whiteSpace: 'nowrap',
                                  cursor: 'pointer'
                                }}
                                onClick={this.seeMore}
                              >
                                see more
                              </strong>
                            </p>
                          )}
                        </div>
                        <div
                          className=" text-center product_info"
                          style={{ position: 'relative' }}
                        >
                          <img
                            className="type-icon"
                            src={petsiconArr[this.state.petType]}
                          />
                          <div className="recommendation_feeding_box">
                            <div className="reason">
                              Recommended feeding amounts are located on the
                              back of the bag. Make sure you transition food
                              slowly over the course of the week to help prevent
                              stomach upset.
                            </div>
                            <h6>Cute Puppy Breeding</h6>
                            <div>994 Drummond Street, Newmark, New Jersey</div>
                          </div>
                        </div>
                        {productList[activeIndex].benefit ? (
                          <React.Fragment>
                            <p className="benefit product_info">
                              <h5
                                className="red"
                                style={{
                                  margin: '30px 0 20px',
                                  fontSize: isMobile ? '18px' : 'auto'
                                }}
                              >
                                Les bénéfices
                              </h5>
                              <p
                                style={{ fontSize: 'auto' }}
                                dangerouslySetInnerHTML={createMarkup(
                                  productList[activeIndex].benefit
                                )}
                              ></p>
                              <p
                                style={{ fontSize: '16px' }}
                                dangerouslySetInnerHTML={createMarkup(
                                  productList[activeIndex].benefitMobile
                                )}
                              ></p>
                              {/* <p>{productList[activeIndex]}</p> */}
                            </p>
                          </React.Fragment>
                        ) : null}

                        <p
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
                            onClick={() => {
                              if (loginStore.isLogin) {
                                this.hanldeLoginAddToCart();
                              } else {
                                this.hanldeUnloginAddToCart(
                                  productList,
                                  '/cart'
                                );
                              }
                            }}
                          >
                            {/* <FormattedMessage id="recommendation.viewInCart" /> */}
                            Mon panier
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
                              <FormattedMessage id="guestCheckout" />
                            </button>
                          )}
                        </p>
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
                                        <FormattedMessage id="à" />{' '}
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
                                      <FormattedMessage id="à" />{' '}
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
                                        <FormattedMessage id="à" />{' '}
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
                        </div>

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
          </div>
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
            <div className="rc-layout-container rc-four-column rc-content-v-middle text-center">
              {images.map((item) => (
                <div className="rc-column">
                  <div className="img-hover-switch rc-margin-bottom--sm">
                    <img src={item.img} />
                  </div>
                  <p>
                    <strong>{item.text}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rc-max-width--lg rc-padding-y--lg">
            <div className="rc-max-width--md text-center rc-padding-x--sm">
              <h2 className="rc-beta text-center">
                <FormattedMessage id="recommendation.firstTitle" />
              </h2>
              <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--md--mobile">
                <h2>
                  <FormattedMessage id="recommendation.firstSubTitle" />
                </h2>
              </div>
            </div>
            <div
              className={`rc-layout-container rc-two-column rc-content-h-middle flex-md-row ${
                process.env.REACT_APP_LANG === 'fr' ? 'flex-column-reverse' : ''
              }`}
            >
              <div className="rc-column">
                <div className="rc-padding-y--lg--mobile rc-full-width">
                  <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                    {[1, 2, 3, 4].map((item) => (
                      <li
                        className="rc-list__item"
                        style={{ paddingLeft: '2rem' }}
                      >
                        <i
                          className="wof rc-margin-right--xs"
                          style={{ position: 'absolute', left: '0' }}
                        ></i>
                        <FormattedMessage
                          id={`recommendation.firstContent${item}`}
                        />
                      </li>
                    ))}
                  </ul>
                  <p style={{ marginTop: '30px', marginBottom: '30px' }}>
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
                      <FormattedMessage id="recommendation.firstBtnText" />
                    </button>
                  </p>
                </div>
              </div>
              <div className="rc-column">
                <img
                  alt="Avec l'Abonnement, ils auront toujours ce dont ils ont besoin"
                  className="w-100 lazyloaded"
                  src={petsTypeImagArr[this.state.petType]}
                />
              </div>
            </div>
          </div>
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm">
            <div className="rc-margin-top--md rc-margin-top--none--mobile rc-padding-x--lg--mobile">
              <h2 className="rc-beta rc-margin--none text-center rc-padding-x--lg--mobile">
                <FormattedMessage id="recommendation.secondTitle" />
              </h2>
            </div>
            <div className="row rc-content-v-middle text-center rc-padding-top--md rc-margin-x--none">
              {this.state.secondlist.map((item, idx) => (
                <div
                  className={`${
                    process.env.REACT_APP_LANG === 'fr' ? 'col-6' : ''
                  } col-md-3 rc-column`}
                >
                  <div className="rc-margin-bottom--sm">
                    <img
                      style={{ width: '160px' }}
                      className="m-auto lazyloaded"
                      alt={item.altText}
                      onMouseOver={(e) => this.hoverChange(e, idx)}
                      onMouseOut={(e) => this.hoverChange(e, -1)}
                      title={item.altText}
                      src={`${item.isHover ? item.imgHover : item.imgPath}`}
                    />
                  </div>
                  <h7>
                    <p
                      className="m-auto"
                      style={{ width: '160px', maxWidth: '100%' }}
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    ></p>
                  </h7>
                </div>
              ))}
            </div>

            <p
              style={{
                marginTop: '70px',
                textAlign: 'center',
                marginBottom: isMobile ? '0' : '70px'
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
                onClick={() => {
                  if (loginStore.isLogin) {
                    this.hanldeLoginAddToCart();
                  } else {
                    this.hanldeUnloginAddToCart(productList, '/cart');
                  }
                }}
              >
                <FormattedMessage id="recommendation.secondBtnText" />
              </button>
            </p>
          </div>
          <div className="help-container">
            <Help contentText={this.helpContentText} needReverse={false} />
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
                Commander
              </button>
            </p>
            <div class="experience-component experience-assets-youtubeVideo">
              <div class="rc-max-width--md rc-padding-x--lg">
                <div class="rc-video-wrapper dog-video">
                  <iframe
                    allowfullscreen=""
                    frameborder="0"
                    id="video-dog"
                    class="optanon-category-4 "
                    src="https://www.youtube.com/embed/FYwO1fiYoa8"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
          <div className="rc-padding-top--md--desktop rc-max-width--lg rc-padding-x--md  rc-padding-x--md--mobile  rc-layout-container rc-three-column">
            <div className="rc-column">
              <img src={cur_recommendation2} />
            </div>
            <div className="rc-column">
              <img src={cur_recommendation3} />
            </div>
            <div className="rc-column">
              <img src={cur_recommendation4} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Recommendation;
