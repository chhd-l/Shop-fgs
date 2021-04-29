import React from 'react';
import { Link } from 'react-router-dom';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import BannerTip from '@/components/BannerTip';
import noPic from '@/assets/images/noPic.png';
import ImageMagnifier from '@/components/ImageMagnifierForUS';
import UsAndRu from './components/UsAndRu';
import Fr from './components/Fr';
import GoodsDetailTabs from '@/components/GoodsDetailTabs';
import { formatMoney, getDeviceType, getParaByName } from '@/utils/utils';
import './index.css';
import { inject, observer } from 'mobx-react';
import {
  getRecommendationList,
  getRecommendationList_prescriberId,
  getRecommendationList_token
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
  distributeLinktoPrecriberOrPaymentPage,
  getFrequencyDict
} from '@/utils/utils';
import { Helmet } from 'react-helmet';
import { GARecommendationProduct } from '@/utils/GA';

const imgUrlPreFix = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation`;
const isUs = process.env.REACT_APP_LANG === 'en';
const isRu = process.env.REACT_APP_LANG === 'ru';
const isFr = process.env.REACT_APP_LANG === 'fr';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

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
      isSPT: false,
      frequencyList: '',
      isNoMoreProduct: false,
      promotionCode: '',
      promotionCodeText: '',
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
      ], //俄罗斯是其他的链接
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

  async componentDidMount() {
    await getFrequencyDict().then((res) => {
      this.setState({
        frequencyList: res
      });
    });
    // let paramArr = this.props.location.search.split('&');
    // let token = paramArr[paramArr.length - 1].split('=')[1];
    let { search } = this.props.history.location;
    search = search && decodeURIComponent(search);
    let token = getParaByName(search, 'token');
    let promotionCode = getParaByName(search, 'coupon');
    let promotionCodeText = promotionCode?.toUpperCase();
    let prescription = getParaByName(search, 'prescription');
    setSeoConfig({
      pageName: 'SPT reco landing page'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
    this.setState({
      isMobile: getDeviceType() === 'H5',
      promotionCodeText,
      loading: true
    });
    let params = token;
    let requestName = getRecommendationList_token;
    if (isFr) {
      requestName = getRecommendationList_prescriberId;
      params = prescription;
    }
    requestName(params)
      .then(async (res) => {
        let petType = res.context.petSpecie?.toLowerCase() === 'cat' ? 1 : 0;
        let productList = res.context.recommendationGoodsInfoRels;
        let prescriberId = res.context.prescriberId;
        let curScrollTop = await sessionItemRoyal.get('recommendation-scroll');
        const currentShowProduct = [].concat(productList)?.splice(0, 1);
        GARecommendationProduct(
          currentShowProduct,
          1,
          this.state.frequencyList
        );
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
                  // el = JSON.parse(el);
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
                              Object.values(ele)[0]['Description']
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
                            ${Object.values(ele)[0]['Description']}
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
            if (g.goodsInfoId === el.goodsInfo.goodsInfoId) {
              g.selected = true;
            }
            return g;
          });
          let specList = el.goodsSpecs;
          let specDetailList = el.goodsSpecDetails;
          if (specList) {
            specList.map((sItem) => {
              sItem.chidren = specDetailList.filter((sdItem, i) => {
                return sdItem.specId === sItem.specId;
              });
              sItem.chidren.map((child) => {
                if (
                  el.goodsInfo.mockSpecDetailIds.indexOf(child.specDetailId) >
                  -1
                ) {
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
        if (!isRu) {
          this.props.clinicStore.setLinkClinicId(res.context.prescriberId);
          this.props.clinicStore.setLinkClinicName('');
        }
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

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  get addCartBtnStatus() {
    return this.state.inStockProducts.length > 0;
  }
  getPrescriberByPrescriberIdAndStoreId = (prescriberId) => {
    getPrescriberByPrescriberIdAndStoreId({
      prescriberId,
      storeId: process.env.REACT_APP_STOREID
    }).then((res) => {
      this.props.clinicStore.setLinkClinicId(res.context?.prescriberId);
      this.props.clinicStore.setLinkClinicName(res.context?.prescriberName);
      let locationPath = res.context?.location;
      this.setState({ locationPath });
    });
  };
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
    this.setState({ buttonLoading: true });
    await this.props.checkoutStore.hanldeUnloginAddToCart({
      valid: this.addCartBtnStatus,
      cartItemList: products.map((p) => {
        return Object.assign(
          p,
          { ...p.goods, ...p.goodsInfo.goods },
          {
            selected: true,
            quantity: p.recommendationNumber,
            currentUnitPrice: p.goodsInfo.marketPrice,
            goodsInfoFlag: 0,
            periodTypeId: null,
            taggingForTextAtCart: (p.taggingList || []).filter(
              (e) =>
                e.taggingType === 'Text' &&
                e.showPage?.includes('Shopping cart page')
            )[0],
            taggingForImageAtCart: (p.taggingList || []).filter(
              (e) =>
                e.taggingType === 'Image' &&
                e.showPage?.includes('Shopping cart page')
            )[0]
          }
        );
      })
    });
    this.setState({ buttonLoading: false });
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
      if (loginStore.isLogin) {
        await this.hanldeLoginAddToCart();
      } else {
        let res = await getProductPetConfig({
          goodsInfos: inStockProducts.map((el) => {
            el.goodsInfo.buyCount = el.recommendationNumber;
            return el.goodsInfo;
          })
        });
        let handledData = inStockProducts.map((el, i) => {
          el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
          el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
          el.sizeList = el.goodsInfo.goods.sizeList;
          return el;
        });
        // let handledData = res.context.goodsInfos;
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
          await this.hanldeUnloginAddToCart(this.state.productList, url);
        }
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
  copyPromotion = () => {
    let { promotionCodeText } = this.state;
    var copy = function (e) {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', promotionCodeText);
      } else if (window.clipboardData) {
        window.clipboardData.setData('promotionCodeText', promotionCodeText);
      }
    };
    console.info('promotionCodeText', promotionCodeText);
    window.addEventListener('copy', copy);
    document.execCommand('copy');
    window.removeEventListener('copy', copy);

    dataLayer.push({
      event: ' breederRecoPromoCodeCTA'
    });
  };

  tabChange(productList, index) {
    this.setState({ activeIndex: index });
    const currentProduct = productList.filter((item, i) => i == index && item);
    GARecommendationProduct(currentProduct, 2, this.state.frequencyList);
  }
  isSPTUp = () => (
    <div>
      <section
        className="text-center"
        style={{ width: isMobile ? '95%' : '60%', margin: '0 auto' }}
      >
        <h1 style={{ color: '#E2001A', margin: '1.25rem' }}>Bienvenue !</h1>
        <h2 style={{ color: '#E2001A', margin: '1.25rem' }}>
          Merci pour votre visite en magasin, voici notre recommandation.
        </h2>
        {/* <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
      <FormattedMessage id="recommendation.firstTitle" />
    </h2> */}
        <p style={{ fontSize: '1.125rem' }}>
          {/* <FormattedMessage id="recommendation.firstContent" /> */}
          La recommandation a été faite en fonction des besoins uniques de votre
          animal.
        </p>
        <p>
          <button
            className={`rc-btn rc-btn--one ${
              this.state.buttonLoading ? 'ui-btn-loading' : ''
            } ${
              this.state.inStockProducts.length ? '' : 'rc-btn-solid-disabled'
            }`}
            onClick={() => {
              if (loginStore.isLogin) {
                this.hanldeLoginAddToCart();
              } else {
                this.hanldeUnloginAddToCart(productList, '/cart');
              }
            }}
          >
            {/* <FormattedMessage id="recommendation.viewInCart" /> */}
            Voir le panier
          </button>
        </p>
      </section>
    </div>
  );
  commonUp = () => {
    let { promotionCodeText, isMobile } = this.state;
    let showBannerTip = true;
    let bannerHight = showBannerTip
      ? document.querySelector('.nav-slim-banner')?.offsetHeight
      : 0;

    return (
      <div style={{ paddingTop: bannerHight }}>
        <section
          className="text-center"
          style={{ width: isMobile ? '95%' : '60%', margin: '0 auto' }}
        >
          <div
            className={`${
              isFr ? 'rc-max-width--lg' : 'rc-max-width--md'
            } text-center rc-margin-y--md`}
          >
            <div
              className={`rc-alpha inherit-fontsize ${
                isFr && 'sx rc-margin-bottom--xs'
              }`}
            >
              <h1 style={{ marginBottom: isFr ? '0px' : '0.67em' }}>
                <FormattedMessage id="recommendation.welcomeText1" />
              </h1>
            </div>
            {isFr && (
              <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                <span
                  style={{ fontSize: '1.125rem', color: 'rgb(61, 61, 60)' }}
                >
                  <FormattedMessage id="recommendation.welcomeSubText1" />
                </span>
              </div>
            )}
            <div
              className={`rc-beta inherit-fontsize ${
                isFr && 'sx rc-margin-bottom--xs'
              }`}
            >
              <p style={{ marginBottom: '0px' }}>
                <FormattedMessage id="recommendation.welcomeText2" />
                {/* Merci pour votre visite en magasin, voici notre recommandation. */}
              </p>
            </div>
            {/* <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
        <FormattedMessage id="recommendation.firstTitle" />
      </h2> */}
            <div className="inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
              <span style={{ fontSize: '1.125rem', color: 'rgb(61, 61, 60)' }}>
                <FormattedMessage
                  values={{
                    val: (
                      <span style={{ color: '#e2001a', fontSize: '1.5rem' }}>
                        E
                      </span>
                    )
                  }}
                  id="recommendation.welcomeSubText"
                />
                {/* La recommandation a été faite en fonction des besoins uniques de
          votre animal. */}
              </span>
            </div>

            <p>
              {(isRu || isUs) && (
                <button
                  className={`rc-btn rc-btn--one ${
                    this.state.buttonLoading ? 'ui-btn-loading' : ''
                  } ${this.addCartBtnStatus ? '' : 'rc-btn-solid-disabled'}`}
                  onClick={this.addCart}
                >
                  <FormattedMessage id="recommendation.welcomeBtn" />
                  {/* Voir le panier */}
                </button>
              )}
              {isFr && promotionCodeText && (
                <>
                  <button
                    title=""
                    data-tooltip-placement="top"
                    data-tooltip="top-tooltip"
                    className={`rc-btn rc-btn--two`}
                    onClick={this.copyPromotion}
                  >
                    {' '}
                    {promotionCodeText}
                  </button>
                  <div id="top-tooltip" class="rc-tooltip">
                    <div className="rc-padding-x--xs rc-padding-y--xs">
                      copié !
                    </div>
                  </div>
                  <div className="rc-margin-top--xs">
                    <FormattedMessage id="recommendation.copyTips" />
                  </div>
                </>
              )}
            </p>
          </div>
        </section>
      </div>
    );
  };

  render() {
    console.info('helpContentText', this.helpContentText);
    let otherShow = {
      ru: (
        <UsAndRu
          buttonLoading={this.state.buttonLoading}
          addCartBtnStatus={this.addCartBtnStatus}
          addCart={this.addCart}
        />
      ),
      en: (
        <UsAndRu
          buttonLoading={this.state.buttonLoading}
          addCartBtnStatus={this.addCartBtnStatus}
          addCart={this.addCart}
        />
      ),
      fr: (
        <Fr
          configStore={this.props.configStore}
          addCart={this.addCart}
          inStockProducts={this.state.inStockProducts}
          buttonLoading={this.state.buttonLoading}
          isSPT={this.state.isSPT}
        />
      )
    };
    let PetsImg = `${imgUrlPreFix}/${this.props.intl.messages['recommendation.petsImg']}`;
    const event = {
      page: {
        type: 'Recommendation',
        theme: '',
        path: this.props.location.pathname
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
      promotionCode,
      promotionCodeText
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

    let tabDes =
      productList[activeIndex]?.goodsInfos[0]?.goods.goodsSubtitle || '';
    let tabDesText = tabDes.length > 101 ? this.get100Words(tabDes) : tabDes;
    let grayBoxInnerText = {
      fr: tabDesText,
      en:
        productList[activeIndex]?.productMessage ||
        'Recommended feeding amounts are located on the back of the bag. Make sure you transition food slowly over the course of the week to help prevent stomach upset.',
      ru: this.state.locationPath
    };
    return (
      <div className="Recommendation_FR Recommendation_US">
        <GoogleTagManager additionalEvents={event} />
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
          {this.state.isSPT ? this.isSPTUp() : this.commonUp()}
          {this.state.isNoMoreProduct ? (
            <div
              className="rc-max-width--xl"
              style={{ fontSize: '2.5rem', textAlign: 'center' }}
            >
              <FormattedMessage id="recommendation.noMoreRecommendation" />
            </div>
          ) : (
            <div className="transparentSection">
              <section className="recommendProduct re-custom rc-max-width--md pl-0 pr-0">
                <div style={{ boxShadow: '0 8px .9375rem rgb(0 0 0 / 10%)' }}>
                  {this.state.loading ? (
                    <div
                      className="recommendProductInner bg-white pt-4 text-center"
                      style={{
                        minHeight: '600px'
                      }}
                    >
                      <Skeleton
                        color="#f5f5f5"
                        width="100%"
                        height="100%"
                        count="5"
                      />
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
                                    key={i}
                                    className={` rc-btn--sm ${
                                      i === activeIndex ? 'active' : ''
                                    }`}
                                    style={{
                                      display: 'inline-block',
                                      textAlign: 'center',
                                      cursor: 'pointer'
                                    }}
                                    onClick={() =>
                                      this.tabChange(productList, i)
                                    }
                                  >
                                    {/* <div className={{display:'none'}}>
                                    {el?.goods?.goodsId && (
                                      <GoodsDetailTabs detailRes={el}  setState={this.setState.bind(this)}/>
                                    )}
                                    </div> */}
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
                                          <FormattedMessage
                                            id="pirceRange"
                                            values={{
                                              fromPrice: formatMoney(
                                                MinMarketPrice
                                              ),
                                              toPrice: formatMoney(
                                                MaxMarketPrice
                                              )
                                            }}
                                          />
                                        </span>
                                        <span className="promotion-price">
                                          <FormattedMessage
                                            id="pirceRange"
                                            values={{
                                              fromPrice: formatMoney(
                                                MinMarketPrice
                                              ),
                                              toPrice: formatMoney(
                                                MaxMarketPrice
                                              )
                                            }}
                                          />
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
                              <div
                                className={`rc-margin-bottom--none rc-meta w-100 ${
                                  isRu
                                    ? 'rc-padding-x--sm d-flex text-left'
                                    : ' text-center'
                                }`}
                              >
                                {isRu && (
                                  <span className="rc-icon rc-info--xs rc-iconography"></span>
                                )}
                                <span>
                                  <FormattedMessage id="recommendation.guidelinesTips" />
                                </span>
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
                                  this.addCartBtnStatus
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
          <Test />
          {/* {this.otherShow()[process.env.REACT_APP_LANG]} */}
          {otherShow[process.env.REACT_APP_LANG]}
          <Footer />
        </main>
      </div>
    );
  }
}

export default Recommendation;
