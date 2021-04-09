import React from 'react';
import { Link } from 'react-router-dom';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import BannerTip from '@/components/BannerTip';
import noPic from '@/assets/images/noPic.png';
import ImageMagnifier from './components/ImageMagnifier';
import { formatMoney, getDeviceType, getParaByName } from '@/utils/utils';
import './index.css';
import { inject, observer } from 'mobx-react';
import Help from '../SmartFeederSubscription/modules/Help';
import {
  getRecommendationList,
  getRecommendationList_fr
} from '@/api/recommendation';
import { getPrescriberByPrescriberIdAndStoreId } from '@/api/clinic';
import { getPrescriptionById } from '@/api/clinic';
import { getProductPetConfig } from '@/api/payment';
import { sitePurchase } from '@/api/cart';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';
import Modal from '../Recommendation_FR/components/Modal';
import {
  setSeoConfig,
  distributeLinktoPrecriberOrPaymentPage
} from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';

const imgUrlPreFix = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation`;
const isUs = process.env.REACT_APP_LANG === 'en';
const isRu = process.env.REACT_APP_LANG === 'ru';
const howImageArr = [
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-SHOP.png`,
    title: 'GRAB YOUR PRODUCTS',
    des: 'Find your handpicked nutrition products in your cart.'
  },
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-AUTOSHIP.png`,
    title: 'CHOOSE AUTOMATIC SHIPPING',
    des: 'Set your automatic shipping schedule  and input your payment method.'
  },
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-SCHEDULE.png`,
    title: 'GET WHAT YOUR PET NEEDS, WHEN YOU NEED IT',
    des:
      'Receive your product automatically based on your schedule. Change or cancel at any time.'
  },
  {
    img: `${imgUrlPreFix}/HOW-TO-JOIN-ENJOY.png`,
    title: 'ENJOY YOUR PERKS',
    des:
      'Get your exclusive <strong>Royal Canin Club</strong> perks, including access to Royal Canin Pet Advisor Live.'
  }
];
const LineModule = () => (
  <div
    className="rc-border-bottom rc-border-colour--brand4"
    style={{ borderBottomWidth: '4px' }}
  ></div>
);
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;
const imagesArr = [
  {
    img: `${imgUrlPreFix}/COHORT-A_CLUB-BENEFITS_PET-ADVISOR.png`,
    text: 'Royal Canin Pet Advisor Live'
  },
  {
    img: `${imgUrlPreFix}/CLUB-BENEFITS_PRODUCT-RECOS.png`,
    text: 'Personalized Recommendations'
  },
  {
    img: `${imgUrlPreFix}/CLUB-BENEFITS_FREE-SHIPPING.png`,
    text: 'Free Shipping & 5% Off Every Autoship Order'
  }
];
const secondlistArr = [
  {
    altText: 'image one',
    imgPath: `${imgUrlPreFix}/Step1_Normal.png`,
    imgHover: `${imgUrlPreFix}/Step1_Hover.png`,
    isHover: false,
    text:
      'Find your <strong>personally-selected nutrition products</strong> in your cart.'
  },
  {
    altText: 'image two',
    imgHover: `${imgUrlPreFix}/Step2_Hover.png`,
    isHover: false,
    imgPath: `${imgUrlPreFix}/Step2_Normal.png`,
    text:
      'Select your <strong>shipment frequency, delivery </strong>and <strong>payment method.</strong>.'
  },
  {
    imgHover: `${imgUrlPreFix}/Step3_Hover.png`,
    isHover: false,
    altText: 'image three',
    imgPath: `${imgUrlPreFix}/Step3_Normal.png`,
    text:
      '<strong>Receive your product automatically </strong>,based on your own schedule'
  },
  {
    imgHover: `${imgUrlPreFix}/Step4_Hover.png`,
    isHover: false,
    altText: 'image four',
    imgPath: `${imgUrlPreFix}/Step4_Normal.png`,
    text: 'Change your schedule<strong>anytime you want.</strong>'
  }
];
// const helpContentTextObj = {}
// 不引入样式有问题
const Test = () => {
  return (
    <div className="margin12" style={{ display: 'none' }}>
      <div className="rc-card-grid rc-match-heights rc-card-grid--fixed rc-three-column">
        <div className="rc-grid">
          <article className="rc-card rc-card--a">test</article>
        </div>
      </div>
    </div>
  );
};

@inject('checkoutStore', 'loginStore', 'configStore', 'clinicStore')
@injectIntl
@observer
class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNoMoreProduct: false,
      promotionCode: '',
      // secondlist: secondlistArr,
      showMore: true,
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
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
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
      title: this.props.intl.messages['recommendation.helpContentText.title'],
      des: this.props.intl.messages['recommendation.helpContentText.des'],
      emailTitle: this.props.intl.messages[
        'recommendation.helpContentText.emailTitle'
      ],
      emailDes: this.props.intl.messages[
        'recommendation.helpContentText.emailDes'
      ],
      emailLink: this.props.intl.messages[
        'recommendation.helpContentText.emailLink'
      ],
      phoneTitle: this.props.intl.messages[
        'recommendation.helpContentText.phoneTitle'
      ],
      phone: this.props.intl.messages['recommendation.helpContentText.phone'],
      email: this.props.intl.messages['recommendation.helpContentText.email'],
      phoneDes1: `<strong>${this.props.intl.messages['recommendation.helpContentText.phoneDes1']}</strong>`,
      phoneDes2: this.props.intl.messages[
        'recommendation.helpContentText.phoneDes2'
      ]
    };
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  // hoverChange(e, idx) {
  //   console.info('......', idx);
  //   let { secondlist } = this.state;
  //   secondlist.forEach((item, index) => {
  //     if (index == idx) {
  //       item.isHover = true;
  //     } else {
  //       item.isHover = false;
  //     }
  //   });
  //   console.info('secondlist', secondlist);
  //   this.setState({ secondlist });
  // }
  getPrescriberByPrescriberIdAndStoreId = (prescriberId) => {
    let storeId = process.env.REACT_APP_STOREID;
    getPrescriberByPrescriberIdAndStoreId({ prescriberId, storeId }).then(
      (res) => {
        console.info('resstoreIdstoreId', res);
        let locationPath = res.context?.location;
        this.setState({ locationPath });
      }
    );
  };
  async componentDidMount() {
    // let paramArr = this.props.location.search.split('&');
    // let token = paramArr[paramArr.length - 1].split('=')[1];
    let { search } = this.props.history.location;
    search = search && decodeURIComponent(search);
    let token = getParaByName(search, 'token');
    setSeoConfig({
      pageName: 'SPT reco landing page'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
    this.setState({ isMobile: getDeviceType() === 'H5' });
    this.setState({ loading: true });

    getRecommendationList_fr(token)
      .then(async (res) => {
        let petType = res.context.petSpecie?.toLowerCase() === 'cat' ? 1 : 0;
        let productList = res.context.recommendationGoodsInfoRels;
        let prescriberId = res.context.prescriberId;
        let curScrollTop = await sessionItemRoyal.get('recommendation-scroll');
        if (curScrollTop) {
          window.scrollTo({
            top: curScrollTop,
            behavior: 'smooth'
          });
          setTimeout(() => {
            sessionItemRoyal.set('recommendation-scroll', 0);
          }, 100);
        }
        prescriberId &&
          isRu &&
          this.getPrescriberByPrescriberIdAndStoreId(prescriberId);
        productList.map((el) => {
          el?.goodsDescriptionDetailList?.forEach((g) => {
            let ret = g.content;
            if (g.content && g.contentType === 'json') {
              try {
                const parsedContent = JSON.parse(g.content).map((el) => {
                  el = JSON.parse(el);
                  return el;
                });
                let tempContentMobile = '';
                let tempContent = '';
                switch (g.descriptionName) {
                  case 'Benefits':
                    parsedContent.map((ele, idx) => {
                      // <div className="">${Object.keys(JSON.parse(ele))[0]}</div>
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
                    el.benefit = tempContent;
                    el.benefitMobile = tempContentMobile;
                    break;
                }
              } catch (err) {
                console.log(111, err);
              }
            } else {
              switch (g.descriptionName) {
                case 'Benefits':
                  let content = g.content.replace(
                    'ui-star-list rc_proudct_html_tab2 list-paddingleft-2',
                    ''
                  );
                  el.benefit = `<div class=" rc-md-up"> ${content}</div>`;
                  el.benefitMobile = `<div class="fr-faq rc-md-down" style="padding:0">
                  <dl
                    data-toggle-group=""
                    data-toggle-effect="rc-expand--vertical"
                    class=""
                  >
                  ${content}
                  </dl>
                </div>`;
              }
            }
          });
          if (!el.goodsInfo.goodsInfoImg) {
            el.goodsInfo.goodsInfoImg = el.goodsInfo?.goods?.goodsImg;
          }
          if (!el.goodsInfo.goods) {
            el.goodsInfo.goods = {};
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
        let promotionCode = res.context.promotionCode || '';
        let filterProducts = productList.filter((el) => {
          return el.goodsInfo.addedFlag;
        });
        // 只展示上架商品
        if (!filterProducts.length) {
          this.setState({ isNoMoreProduct: true });
        }
        this.setState(
          { productList: filterProducts, petType, promotionCode },
          () => {
            this.checkoutStock();
          }
        );
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
      await this.props.checkoutStore.updateUnloginCart({
        cartData: cartDataCopy
      });
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
  addCart = () => {
    let { productList } = this.state;
    if (this.props.loginStore.isLogin) {
      this.hanldeLoginAddToCart();
    } else {
      this.hanldeUnloginAddToCart(productList, '/cart');
    }
  };
  render(h) {
    const { loginStore, history, configStore } = this.props;
    let PuppyJPG = `${imgUrlPreFix}/${this.props.intl.messages['recommendation.plusImg']}`;
    let PetsImg = `${imgUrlPreFix}/${this.props.intl.messages['recommendation.petsImg']}`;
    const event = {
      page: {
        type: 'Content',
        theme: ''
      }
    };
    const createMarkup = (text) => ({ __html: text });
    // const { details, images } = this.state
    console.log('productList', this.state.productList);
    let details = JSON.parse(sessionItemRoyal.get('detailsTemp'));
    let images = JSON.parse(sessionItemRoyal.get('imagesTemp'));
    let {
      productList,
      activeIndex,
      currentModalObj,
      isMobile,
      promotionCode
    } = this.state;
    let MaxLinePrice,
      MinLinePrice,
      MaxMarketPrice,
      MinMarketPrice,
      MaxSubPrice,
      MinSubPrice;
    if (productList.length) {
      // MaxLinePrice = Math.max.apply(
      //   null,
      //   productList[activeIndex].goodsInfos.map((g) => g.linePrice || 0)
      // );
      // MinLinePrice = Math.min.apply(
      //   null,
      //   productList[activeIndex].goodsInfos.map((g) => g.linePrice || 0)
      // );
      MaxMarketPrice = Math.max.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
      );
      MinMarketPrice = Math.min.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
      );
      if (isRu) {
        MaxMarketPrice = MinMarketPrice; // 俄罗斯只展示最低价格
      }
      // MaxSubPrice = Math.min.apply(
      //   null,
      //   productList[activeIndex].goodsInfos.map((g) => g.subscriptionPrice || 0)
      // );
      // MinSubPrice = Math.min.apply(
      //   null,
      //   productList[activeIndex].goodsInfos.map((g) => g.subscriptionPrice || 0)
      // );
    }
    let showBannerTip = true;
    let bannerHight = showBannerTip
      ? document.querySelector('.nav-slim-banner')?.offsetHeight
      : 0;

    let cur_recommendation2 = `${imgUrlPreFix}/1xexpertise.jpg`;
    let cur_recommendation3 = `${imgUrlPreFix}/2xpartnership.jpg`;
    let cur_recommendation4 = `${imgUrlPreFix}/3xquality.jpg`;
    let tabDes =
      productList[activeIndex]?.goodsInfos[0]?.goods.goodsSubtitle || '';
    let tabDesText = tabDes.length > 101 ? this.get100Words(tabDes) : tabDes;
    let grayBoxInnerText = {
      en:
        productList[activeIndex]?.productMessage ||
        'Recommended feeding amounts are located on the back of the bag. Make sure you transition food slowly over the course of the week to help prevent stomach upset.',
      ru: this.state.locationPath
    };
    return (
      <div className="Recommendation_FR Recommendation_US">
        {/* <GoogleTagManager additionalEvents={event} />*/}
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
          showBannerTip={false}
          // showBannerTip={isUs ? true : false}
          bannerTipShowBtn={isUs ? true : false}
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
          <div style={{ paddingTop: bannerHight }}>
            <section
              className="text-center"
              style={{ width: isMobile ? '95%' : '60%', margin: '0 auto' }}
            >
              <div className="rc-max-width--md text-center rc-margin-y--md">
                <div className="rc-alpha inherit-fontsize">
                  <h1 style={{ marginBottom: '0.67em' }}>
                    <FormattedMessage id="recommendation.welcomeText1" />
                  </h1>
                </div>
                <div className="rc-beta inherit-fontsize">
                  <p style={{ marginBottom: '1rem' }}>
                    <FormattedMessage id="recommendation.welcomeText2" />
                    {/* Merci pour votre visite en magasin, voici notre recommandation. */}
                  </p>
                </div>
                {/* <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              <FormattedMessage id="recommendation.firstTitle" />
            </h2> */}
                <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                  <span
                    style={{ fontSize: '1.125rem', color: 'rgb(61, 61, 60)' }}
                  >
                    <FormattedMessage id="recommendation.welcomeSubText" />
                    {/* La recommandation a été faite en fonction des besoins uniques de
                votre animal. */}
                  </span>
                </div>

                <p>
                  <button
                    className={`rc-btn rc-btn--one ${
                      this.state.buttonLoading ? 'ui-btn-loading' : ''
                    } ${
                      this.state.inStockProducts.length
                        ? ''
                        : 'rc-btn-solid-disabled'
                    }`}
                    onClick={this.addCart}
                  >
                    <FormattedMessage id="recommendation.welcomeBtn" />
                    {/* Voir le panier */}
                  </button>
                </p>
              </div>
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
              <section
                className="recommendProduct re-custom rc-max-width--md"
                style={{ paddingRight: 0, paddingLeft: 0 }}
              >
                <div style={{ boxShadow: '0 8px .9375rem rgb(0 0 0 / 10%)' }}>
                  {this.state.loading ? (
                    <div>
                      <div
                        className="recommendProductInner"
                        style={{
                          background: '#fff',
                          minHeight: '600px',
                          borderTop: 0
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
                        <div
                          className="recommendProductInner"
                          style={{
                            borderTop: 0
                          }}
                        >
                          {productList.length > 1 && (
                            <div className="rc-fade--x">
                              <div className="imageTabBox">
                                {productList.map((el, i) => (
                                  <span
                                    className={` rc-btn--sm ${
                                      i === activeIndex ? 'active' : ''
                                    }`}
                                    style={{
                                      display: 'inline-block',
                                      // width: '80px',
                                      textAlign: 'center',
                                      cursor: 'pointer'
                                    }}
                                    onClick={() =>
                                      this.setState({ activeIndex: i })
                                    }
                                  >
                                    <img
                                      src={el.images[0].artworkUrl}
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
                            </div>
                          )}
                          <div className="right rc-padding-x--lg ">
                            <div className="main">
                              <div className="pic">
                                <ImageMagnifier
                                  // sizeList={[productList[activeIndex].goodsInfo]}
                                  sizeList={
                                    productList[activeIndex].images || []
                                  }
                                  images={productList[activeIndex].images || []}
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
                            <div
                              className={`product-recommendation__desc text-center rc-padding-bottom--lg--mobile ${
                                isRu && promotionCode ? 'has-promotion' : ''
                              }`}
                            >
                              <h3
                                title={
                                  productList[activeIndex].goodsInfo
                                    .goodsInfoName
                                }
                                className="rc-gamma"
                                style={{ color: '#E2001A' }}
                              >
                                {
                                  productList[activeIndex].goodsInfo
                                    .goodsInfoName
                                }
                              </h3>
                              {/* <h4>
                            From {formatMoney(Math.min.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))} to {formatMoney(Math.max.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))}
                          </h4> */}
                              {MaxMarketPrice > 0 && (
                                <div className="product-pricing__card__head d-flex align-items-center">
                                  {/* <div className="rc-input product-pricing__card__head__title">
                                <FormattedMessage id="autoship" />
                              </div> */}
                                  <div className="rc-large-body  m-auto">
                                    {MaxMarketPrice === MinMarketPrice ? (
                                      <React.Fragment>
                                        <span className="text-throught-line">
                                          {formatMoney(MaxMarketPrice)}
                                        </span>
                                        <span className="promotion-price">
                                          {formatMoney(MaxMarketPrice * 0.8)}
                                        </span>
                                      </React.Fragment>
                                    ) : (
                                      <React.Fragment>
                                        <span className="text-throught-line">
                                          <FormattedMessage id="from" />{' '}
                                          {formatMoney(MinMarketPrice)}{' '}
                                          <FormattedMessage id="to" />{' '}
                                          {formatMoney(MaxMarketPrice)}
                                        </span>
                                        <span className="promotion-price">
                                          <FormattedMessage id="from" />{' '}
                                          {formatMoney(MinMarketPrice)}
                                          <FormattedMessage id="to" />{' '}
                                          {formatMoney(MaxMarketPrice)}
                                        </span>
                                      </React.Fragment>
                                    )}
                                  </div>
                                </div>
                              )}
                              {isRu && promotionCode ? (
                                <>
                                  <div style={{ marginBottom: '.75rem' }}>
                                    <span className="promotion-code-title">
                                      {/* Promo code : */}
                                      Промо Код:
                                    </span>
                                    <span className="promotion-code promotion-code-title">
                                      {promotionCode}
                                    </span>
                                  </div>
                                  <p className="promotion-tips">
                                    Для применения скидки,  необходимо
                                    скопировать и вставить промо код в
                                    соответствующее поле при оформлении заказа в
                                    корзине
                                    {/* to apply the promotion, you must copy and
                                  paste the code into the specified part of the
                                  shopping cart */}
                                  </p>
                                </>
                              ) : null}
                              {this.state.showMore || tabDes.length <= 101 ? (
                                <p
                                  className="product_info"
                                  dangerouslySetInnerHTML={createMarkup(tabDes)}
                                ></p>
                              ) : (
                                <p
                                  className="product_info"
                                  style={{
                                    display: `${
                                      tabDes.length > 101 ? '' : 'none'
                                    }`
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
                                    <FormattedMessage id="seeMoreText" />
                                  </strong>
                                </p>
                              )}
                            </div>
                            <div
                              className=" text-center"
                              style={{ position: 'relative' }}
                            >
                              <img
                                className="type-icon"
                                src={PetsImg}
                                alt="pet image"
                                // src={petsiconArr[this.state.petType]}
                              />
                              <div className="product-recommendation__message rc-padding--sm rc-bg-colour--brand4 rc-margin-top--lg rc-padding-top--md rc-padding--lg--mobile rc-margin-bottom--xs recommendation_feeding_box">
                                <div className="">
                                  {grayBoxInnerText[process.env.REACT_APP_LANG]}
                                </div>
                                {/* <h6>Cute Puppy Breeding</h6>
                            <div>994 Drummond Street, Newmark, New Jersey</div> */}
                              </div>
                              <div className="rc-margin-bottom--none rc-meta text-center w-100">
                                <FormattedMessage id="recommendation.guidelinesTips" />
                              </div>
                            </div>

                            {productList[activeIndex].benefit ? (
                              <React.Fragment>
                                <p className="benefit">
                                  <h5
                                    className="red"
                                    style={{
                                      margin: '30px 0 1.25rem',
                                      fontSize: isMobile ? '1.125rem' : 'auto'
                                    }}
                                  >
                                    <FormattedMessage id="recommendation.benefit" />
                                  </h5>
                                  <p
                                    style={{ fontSize: 'auto' }}
                                    dangerouslySetInnerHTML={createMarkup(
                                      productList[activeIndex].benefit
                                    )}
                                  ></p>
                                  <p
                                    style={{ fontSize: '1rem' }}
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
                                className={`rc-btn rc-btn--one rc-btn--sm ${
                                  this.state.buttonLoading
                                    ? 'ui-btn-loading'
                                    : ''
                                } ${
                                  this.state.inStockProducts.length
                                    ? ''
                                    : 'rc-btn-solid-disabled'
                                }`}
                                onClick={this.addCart}
                              >
                                <FormattedMessage id="recommendation.viewInCart" />
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            </div>
          )}
          {isUs && (
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
              <div className="rc-layout-container rc-four-column rc-content-v-middle text-center">
                {imagesArr.map((item) => (
                  <div className="rc-column">
                    <div className="img-hover-switch rc-margin-bottom--sm">
                      <LazyLoad>
                        <img
                          className="m-center"
                          src={item.img}
                          alt="recommendation image"
                        />
                      </LazyLoad>
                    </div>
                    <p>
                      <strong style={{ color: 'rgb(61, 61, 60)' }}>
                        {item.text}
                      </strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <LineModule />
          <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--xl">
            <div className="row align-items-md-center">
              <div className=" col-12 col-lg-6">
                <div className=" text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                  <h2 className="rc-beta markup-text">
                    <FormattedMessage id="recommendation.plusTitle" />
                  </h2>
                  <p style={{ color: 'rgb(23, 43, 77)' }}>
                    <FormattedMessage id="recommendation.plusContent" />
                  </p>
                  <button
                    className={`rc-btn rc-btn--two ${
                      this.state.buttonLoading ? 'ui-btn-loading' : ''
                    } ${
                      this.state.inStockProducts.length ? '' : 'rc-btn-disabled'
                    }`}
                    onClick={this.addCart}
                  >
                    <FormattedMessage id="recommendation.plusBtn" />
                  </button>
                </div>
              </div>
              <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                <LazyLoad>
                  <img src={PuppyJPG} alt="puppy image" />
                </LazyLoad>
              </div>
            </div>
          </div>
          <LineModule />
          {isUs && (
            <div className="arrow-img-columns rc-max-width--xl rc-padding-y--sm rc-padding-y--xl--mobile rc-padding-x--sm rc-padding-x--md--mobile">
              <div className="rc-margin-bottom--md">
                <h2 className="rc-beta" style={{ color: '#e2001a' }}>
                  How to Join Royal Canin Club
                </h2>
              </div>
              <Test />
              <div className="rc-card-grid rc-match-heights rc-card-grid--fixed text-center rc-content-v-middle for-icon-size">
                {howImageArr.map((item) => (
                  <div className="rc-grid">
                    <div>
                      <h3 className="rc-intro height-50 rc-margin-bottom--xs rc-padding-bottom--xs">
                        <strong>{item.title}</strong>
                      </h3>
                      <lazyload>
                        <img
                          className="mx-auto rc-margin-bottom--xs"
                          src={item.img}
                          alt="recommendation image"
                        />
                      </lazyload>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.des }}
                        className="inherit-fontsize rc-body rc-padding-top--xs children-nomargin"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <LineModule />
          <div className="help-container 1111">
            <Help
              isRecommendationPage={true}
              contentText={this.helpContentText}
              needReverse={false}
            />
          </div>
          {isUs && (
            <React.Fragment>
              <LineModule />
              <section
                style={{ textAlign: 'center' }}
                className="rc-max-width--md text-center rc-margin-top--md"
              >
                <h2 style={{ color: '#E2001A' }}>
                  <FormattedMessage id="recommendation.fourTitle" />
                </h2>
                <p style={{ fontSize: '1.125rem' }}>
                  We focus our attention on the unique needs of cats and dogs.
                  That obsession with detail is what makes it possible for us to
                  deliver precise, effective nutrition and help pets become
                  their magnificent best.
                  {/* <FormattedMessage id="recommendation.fourContent" /> */}
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
                    onClick={this.addCart}
                  >
                    Place order
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
                        src="https://www.youtube.com/embed/ICmjePIyMkI"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </section>
              <div className="rc-max-width--lg rc-padding-y--sm img-text-box">
                <div className="rc-layout-container rc-margin-to--md rc-padding-x--sm">
                  <div className="rc-column">
                    <LazyLoad>
                      <img
                        src={cur_recommendation2}
                        alt="recommendation image"
                      />
                    </LazyLoad>
                  </div>
                  <div className="rc-column">
                    <LazyLoad>
                      <img
                        src={cur_recommendation3}
                        alt="recommendation image"
                      />
                    </LazyLoad>
                  </div>
                  <div className="rc-column">
                    <LazyLoad>
                      <img
                        src={cur_recommendation4}
                        alt="recommendation image"
                      />
                    </LazyLoad>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
          <Footer />
        </main>
      </div>
    );
  }
}

export default Recommendation;
