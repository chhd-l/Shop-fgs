import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import BannerTip from '@/components/BannerTip';
import ImageMagnifier from '@/components/ImageMagnifierForUS';
import { formatMoney, getDeviceType } from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import Loading from '@/components/Loading';
import './index.css';
import { inject, observer } from 'mobx-react';
import {
  getRecommendationList,
  getRecommendationList_prescriberId,
  getRecommendationList_token
} from '@/api/recommendation';
import { getPrescriberByPrescriberIdAndStoreId } from '@/api/clinic';
import { getProductPetConfig } from '@/api/payment';
import { sitePurchase } from '@/api/cart';
import Modal from '../Recommendation_FR/components/Modal';
import {
  setSeoConfig,
  distributeLinktoPrecriberOrPaymentPage,
  getFrequencyDict
} from '@/utils/utils';
import { Helmet } from 'react-helmet';
import {
  GARecommendationProduct,
  GABreederRecoPromoCodeCTA,
  GABreederRecoSeeInCart,
  GABigBreederAddToCar
} from '@/utils/GA';

const imgUrlPreFix = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation`;
const isUs = window.__.env.REACT_APP_COUNTRY === 'us';
const isRu = window.__.env.REACT_APP_COUNTRY === 'ru';
const isFr = window.__.env.REACT_APP_COUNTRY === 'fr';

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
      // showCoiedTips: false,
      noData: false,
      showCur: -1,
      isSPT: false,
      frequencyList: [],
      isNoMoreProduct: '', //页面error的时候的翻译id
      promotionCode: '',
      promotionCodeText: '',
      prescriptionJson: '',
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
      pageLoading: isRu, // 俄罗斯的时候需要直接跳转购物车，需要pageLoading这种全遮罩
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
      currentBenefit: '',
      checkPromotionCodeAndCopy: false, // 控制点击查看promotion code并复制按钮
      viewShoppingCartWidth: 0
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

  handleSelect(id) {
    if (id === this.state.showCur) {
      this.setState({
        showCur: -1
      });
    } else {
      this.setState({
        showCur: id
      });
    }
  }

  async componentDidMount() {
    // document.onclick = () => {
    //   this.setState({ showCoiedTips: false });
    // };
    console.time('begin');
    getFrequencyDict().then((res) => {
      this.setState({
        frequencyList: res
      });
    });
    // let paramArr = this.props.location.search.split('&');
    // let token = paramArr[paramArr.length - 1].split('=')[1];
    let { search } = this.props.history.location;
    search = search && decodeURIComponent(search);
    let token = funcUrl({ name: 'token' });
    let promotionCode = funcUrl({ name: 'coupon' });
    let promotionCodeText = promotionCode?.toUpperCase() || '';
    let prescription = funcUrl({ name: 'prescription' });
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
    if ((isFr || isRu || isUs) && !token) {
      requestName = getRecommendationList_prescriberId;
      params = prescription;
    }
    console.timeEnd('begin');
    console.time('接口请求');
    requestName(params)
      .then(async (res) => {
        console.timeEnd('接口请求');
        console.time('js处理');
        let petType = res.context.petSpecie?.toLowerCase() === 'cat' ? 1 : 0;
        let productLists = res.context.recommendationGoodsInfoRels;
        let prescriberId = res.context.prescriberId;
        let curScrollTop = await sessionItemRoyal.get('recommendation-scroll');
        let prescriptionJson = res.context.prescriptionJson || '';
        const currentShowProduct = [].concat(productLists)?.splice(0, 1);
        if (res.context.structureType != 'breeder' && isFr) {
          // 法国区分stp和breeder
          this.setState({ isSPT: true });
        }
        if (res.context.promotionCode && isRu) {
          // ru需要直接应用promotioncode
          this.setState({
            promotionCodeText: res.context.promotionCode
          });
        }
        setTimeout(() => {
          GARecommendationProduct(
            currentShowProduct,
            1,
            this.state.frequencyList,
            promotionCode,
            this.state.activeIndex
          );
        }, 3000);

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
        productLists.map((el) => {
          el?.goodsDescriptionDetailList?.forEach((g) => {
            if (g.content && g.contentType === 'json') {
              try {
                let tempContentMobile = [];
                let tempContent = [];
                switch (g.descriptionName) {
                  case 'Benefits':
                    const parsedContent = JSON.parse(g.content).map((el) => {
                      // el = JSON.parse(el);
                      return el;
                    });
                    parsedContent.map((ele, idx) => {
                      // <div className="">${Object.keys(JSON.parse(ele))[0]}</div>
                      tempContent.push(`<li>
                      <div class="">${
                        Object.values(ele)[0]['Description']
                      }</div>
                    </li>`);
                      tempContentMobile.push(`
                      <div class="rc-list__accordion-item
                      ${
                        this.state.showCur === idx ? 'showItem' : 'hiddenItem'
                      }">
                      <dt>
                        <button
                          onClick=this.handleSelect.bind(this, idx)
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
                      `);
                    });
                    console.info('tempContent', tempContent);
                    tempContent = `<ul class=" rc-md-up">
                          ${tempContent.join('')}
                        </ul>`;
                    tempContentMobile = `<div class="fr-faq rc-md-down" style="padding:0">
                        <dl
                          data-toggle-group=""
                          data-toggle-effect="rc-expand--vertical"
                          class=""
                        >
                        ${tempContentMobile.join('')}
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
        let filterProducts = productLists.filter((el) => {
          return el.goodsInfo.addedFlag && el.goods.saleableFlag;
        });
        // 只展示上架商品
        if (!filterProducts.length) {
          this.setState({
            isNoMoreProduct: 'recommendation.noMoreRecommendation'
          });
        }
        this.setState(
          {
            productList: filterProducts,
            petType,
            promotionCode,
            prescriptionJson
          },
          () => {
            this.checkoutStock();
          }
        );
        let recommendationInfos = {
          recommenderName: res.context?.recommendationName || '',
          recommenderId: res.context?.recommendationId || '',
          recommendationName: res.context?.prescriberName || '',
          recommendationId: res.context?.prescriberId || '',
          referenceObject: res.context?.structureType || '',
          referenceData: res.context?.prescriptionJson || ''
        };
        this.props.clinicStore.setLinkClinicRecommendationInfos(
          recommendationInfos
        );
        // getPrescriptionById({ id: res.context.prescriberId }).then((res2) => {
        if (!isRu || !isFr) {
          this.props.clinicStore.setLinkClinicId(
            res.context?.id || res.context.prescriberId
          );
          this.props.clinicStore.setLinkClinicName(res.context.prescriberName);
          this.props.clinicStore.setLinkClinicCode(
            res.context.recommendationCode || ''
          );
        }
        this.props.clinicStore.setAuditAuthority(false);
        if (isRu) {
          // Ru need redirected to the cart page and the recommended products added to cart automatically via clicking this link.
          this.addCart();
        } else {
          this.setState({ loading: false, pageLoading: false });
        }
        console.timeEnd('js处理');
        // });
      })
      .catch((err) => {
        console.log(err, 'err');
        this.setState({ noData: true, pageLoading: false, loading: false });
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
      storeId: window.__.env.REACT_APP_STOREID
    }).then((res) => {
      let recommendationInfos = {
        recommenderName: res.context?.recommendationName || '',
        recommenderId: res.context?.recommendationId || '',
        recommendationName: res.context?.prescriberName || '',
        recommendationId: res.context?.id || res.context?.prescriberId || '',
        referenceObject: res.context?.structureType || '',
        referenceData: res.context?.prescriptionJson || ''
      };
      this.props.clinicStore.setLinkClinicRecommendationInfos(
        recommendationInfos
      );
      this.props.clinicStore.setLinkClinicId(
        res.context?.id || res.context?.prescriberId
      );
      this.props.clinicStore.setLinkClinicName(res.context?.prescriberName);
      this.props.clinicStore.setLinkClinicCode(
        res.context?.recommendationCode || ''
      );
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
    GABigBreederAddToCar(productList);
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
      if ((isFr && !this.state.isSPT) || isRu) {
        // 是fr breeder的特殊code，需要主动默认填充
        await this.props.checkoutStore.setPromotionCode(
          this.state.promotionCodeText
        );
      }
      this.setState({ buttonLoading: true });
      for (let i = 0; i < inStockProducts.length; i++) {
        try {
          await sitePurchase({
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            goodsCategory: '',
            goodsInfoFlag: 0,
            recommendationId:
              this.props.clinicStore.linkClinicRecommendationInfos
                ?.recommendationId || this.props.clinicStore.linkClinicId,
            recommendationInfos: this.props.clinicStore
              .linkClinicRecommendationInfos,
            recommendationName:
              this.props.clinicStore.linkClinicRecommendationInfos
                ?.recommendationName || this.props.clinicStore.linkClinicName
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
    GABigBreederAddToCar(products);
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
            recommendationInfos: this.props.clinicStore
              .linkClinicRecommendationInfos,
            recommendationId:
              this.props.clinicStore.linkClinicRecommendationInfos
                ?.recommendationId || this.props.clinicStore.linkClinicId,
            recommendationName:
              this.props.clinicStore.linkClinicRecommendationInfos
                ?.recommendationName || this.props.clinicStore.linkClinicName,
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
    if ((isFr && !this.state.isSPT) || isRu) {
      // 是fr breeder的特殊code，需要主动默认填充
      await this.props.checkoutStore.setPromotionCode(
        this.state.promotionCodeText
      );
    }
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
      localItemRoyal.set('okta-redirectUrl', '/prescription');
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
    if (totalPrice < window.__.env.REACT_APP_MINIMUM_AMOUNT) {
      console.log(totalPrice, 'instock');
      this.showErrorMsg(
        <FormattedMessage
          id="cart.errorInfo3"
          values={{ val: formatMoney(window.__.env.REACT_APP_MINIMUM_AMOUNT) }}
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
        checkoutStore.setCartData(handledData);
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
      loginStore.isLogin
        ? checkoutStore.setLoginCartData(handledData)
        : checkoutStore.setCartData(handledData);
      checkoutStore.setAuditData(AuditData);
      let autoAuditFlag = res.context.autoAuditFlag;
      checkoutStore.setPetFlag(res.context.petFlag);
      checkoutStore.setAutoAuditFlag(autoAuditFlag);
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
    if (this.state.inStockProducts.length < 1) {
      return;
    }
    GABreederRecoSeeInCart();
    let { productList } = this.state;
    if (this.props.loginStore.isLogin) {
      this.hanldeLoginAddToCart();
    } else {
      this.hanldeUnloginAddToCart(productList, '/cart');
    }
  };

  // 复制 promotion code
  copyPromotion = () => {
    let { promotionCodeText } = this.state;
    var copy = function (e) {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.clearData();
        e.clipboardData.setData('text/plain', promotionCodeText);
      } else if (window.netscape) {
        try {
          netscape.security.PrivilegeManager.enablePrivilege(
            'UniversalXPConnect'
          );
        } catch (e) {
          alert(
            "被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'"
          );
        }
        var clip = Components.classes[
          '@mozilla.org/widget/clipboard;1'
        ].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) return;
        var trans = Components.classes[
          '@mozilla.org/widget/transferable;1'
        ].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes[
          '@mozilla.org/supports-string;1'
        ].createInstance(Components.interfaces.nsISupportsString);
        var copytext = promotionCodeText;
        str.data = copytext;
        trans.setTransferData('text/unicode', str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip) return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
        alert('复制成功！');
      } else {
        window.clipboardData.setData('promotionCodeText', promotionCodeText);
      }
    };
    // var copy = function (e) {
    //   e.preventDefault();
    //   debugger
    //   if (e.clipboardData) {
    // console.info('2222promotionCodeText', promotionCodeText);
    //     e.clipboardData.clearData()
    //     e.clipboardData.setData('text/plain', promotionCodeText);
    //   } else if (window.clipboardData) {
    // console.info('1111promotionCodeText', promotionCodeText);
    //     window.clipboardData.setData('promotionCodeText', promotionCodeText);
    //   }
    // };
    window.addEventListener('copy', copy);
    document.execCommand('copy');
    window.removeEventListener('copy', copy);
  };
  // 查看 promotion code
  checkPromotionCode = (e) => {
    this.copyPromotion();
    // let { showCoiedTips } = this.state;
    // this.setState({ showCoiedTips: !showCoiedTips });
    // e.nativeEvent.stopImmediatePropagation();
    // e.stopPropagation();
    if (this.state.checkPromotionCodeAndCopy) {
      return;
    }
    GABreederRecoPromoCodeCTA();
    this.setState(
      {
        checkPromotionCodeAndCopy: true
      },
      () => {
        let el = document.getElementById('btnCopyPromotionCode');
        let elWidth = el.clientWidth;
        this.setState({
          viewShoppingCartWidth: elWidth
        });
      }
    );
  };
  // 查看购物车
  viewShoppingCart = () => {
    GABreederRecoSeeInCart();
    this.props.history.push('/cart');
  };
  tabChange(productList, index) {
    let promotionCode = funcUrl({ name: 'coupon' });
    this.setState({ activeIndex: index });
    const currentProduct = productList.filter((item, i) => i == index && item);
    GARecommendationProduct(
      currentProduct,
      2,
      this.state.frequencyList,
      promotionCode,
      this.state.activeIndex
    );
  }

  render() {
    console.info('helpContentText', this.helpContentText);
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
      promotionCodeText,
      isSPT
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
    let nutritionalReco =
      this.state.prescriptionJson &&
      JSON.parse(this.state.prescriptionJson)?.nutritionalReco;
    let tabDes =
      productList[activeIndex]?.goodsInfos[0]?.goods.goodsSubtitle || '';
    let tabDesText = tabDes.length > 101 ? this.get100Words(tabDes) : tabDes;
    let grayBoxInnerText = {
      fr: isSPT
        ? tabDesText
        : nutritionalReco ||
          "Les quantités d'alimentation recommandées se trouvent au dos du sac. Assurez-vous de faire la transition des aliments lentement au cours de la semaine pour éviter les maux d'estomac.",
      us:
        nutritionalReco ||
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
        {this.state.pageLoading ? (
          <Loading bgColor={'#fff'} opacity={1} />
        ) : null}
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          sssss
          <Footer />
        </main>
      </div>
    );
  }
}

export default Recommendation;
