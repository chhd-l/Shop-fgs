import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import BannerTip from '@/components/BannerTip';
import { formatMoney, getDeviceType } from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import Loading from '@/components/Loading';
import giftsImg from './images/gifts@2x.png';
import discountImg from './images/discount@2x.svg';
import petadviserimg from './images/petadviser@2x.png';
import shippingImg from './images/shipping@2x.png';
import supportImg from './images/support@2x.png';
import './index.less';
import { inject, observer } from 'mobx-react';
import {
  getRecommendationList,
  getRecommendationList_prescriberId,
  getRecommendationList_token
} from '@/api/recommendation';
import { getPrescriberByPrescriberIdAndStoreId } from '@/api/clinic';
import { sitePurchase } from '@/api/cart';
import Modal from './components/Modal';
import {
  distributeLinktoPrecriberOrPaymentPage,
  getFrequencyDict
} from '@/utils/utils';
import { seoHoc } from '@/framework/common';
import Description from './components/description';
import {
  GARecommendationProduct,
  GABreederRecoPromoCodeCTA,
  GABigBreederAddToCar
} from '@/utils/GA';
import ImageMagnifier_fr from '../Details/components/ImageMagnifier';
import Canonical from '@/components/Canonical';

const imgUrlPreFix = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation`;
const isUs = window.__.env.REACT_APP_COUNTRY === 'us';
const isRu = window.__.env.REACT_APP_COUNTRY === 'ru';
const isFr = window.__.env.REACT_APP_COUNTRY === 'fr';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

let advantageArr = [
  { img: shippingImg, text: 'Livraison offerte et automatique' },
  {
    img: discountImg,
    text: '10% de réduction pour toute commande<sup>1</sup>'
  },
  { img: petadviserimg, text: 'Un conseiller à votre écoute' },
  { img: giftsImg, text: 'Un kit de bienvenue et des cadeaux exclusifs' },
  { img: supportImg, text: 'Un accompagnement pédagogique individualisé' },
  { img: '', text: '' }
];
let advantageList = [];
advantageArr.forEach((el, i) => {
  if (i % 2 == 0) {
    advantageList[i / 2] = [];
    advantageList[i / 2].push(el);
  } else {
    advantageList[Math.floor(i / 2)].push(el);
  }
});
@inject('checkoutStore', 'loginStore', 'configStore', 'clinicStore')
@injectIntl
@seoHoc('SPT reco landing page')
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
      isNoMoreProduct: false, //页面error的时候
      promotionCode: '',
      promotionCodeText: '',
      prescriptionJson: '',
      // secondlist: secondlistArr,
      showMoreInit: false,
      showMored: false,
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
    let frequencyList = [];
    getFrequencyDict().then((res) => {
      frequencyList = res;
      this.setState({
        frequencyList: res
      });
    });
    let paramArr = this.props.location.search.split('&');
    // let token = paramArr[paramArr.length - 1].split('=')[1];
    let { search } = this.props.history.location;
    search = search && decodeURIComponent(search);
    let token = funcUrl({ name: 'token' });
    let promotionCode = funcUrl({ name: 'coupon' });
    let promotionCodeText = promotionCode?.toUpperCase() || '';
    let prescription = funcUrl({ name: 'prescription' });

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
        // setTimeout(() => {
        GARecommendationProduct(
          currentShowProduct,
          1,
          this.state.frequencyList,
          promotionCode,
          this.state.activeIndex
        );
        // }, 3000gtm优化);

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
                let redSpanIconMargin = this.state.isMobile ? '10px' : '20px';

                switch (g.descriptionName) {
                  case 'Benefits':
                    const parsedContent = JSON.parse(g.content).map((el) => {
                      // el = JSON.parse(el);
                      return el;
                    });
                    parsedContent.map((ele, idx) => {
                      // <div className="">${Object.keys(JSON.parse(ele))[0]}</div>
                      tempContent.push(`<li class="">
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
                    tempContent = `<ul class="">
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
        let autoshipDictRes = frequencyList.filter(
          (el) => el.goodsInfoFlag === 1
        );
        let clubDictRes = frequencyList.filter((el) => el.goodsInfoFlag === 2);
        // let promotionCode = res.context.promotionCode || '';
        let filterProducts = productLists.filter((el) => {
          let goodsInfoFlag = 0;
          let FrequencyIdDefault = '';
          if (el.goods.subscriptionStatus) {
            if (el.goodsInfo.promotions != 'club') {
              goodsInfoFlag = 1;
              FrequencyIdDefault =
                this.props.configStore?.info?.storeVO
                  ?.defaultSubscriptionFrequencyId ||
                (autoshipDictRes[0] && autoshipDictRes[0].id);
            } else {
              goodsInfoFlag = 2;
              FrequencyIdDefault =
                this.props.configStore?.info?.storeVO
                  ?.defaultSubscriptionClubFrequencyId ||
                (clubDictRes[0] && clubDictRes[0].id);
            }
            let defaultFrequencyId =
              el?.defaultFrequencyId || FrequencyIdDefault || '';
            el.defaultFrequencyId = defaultFrequencyId;
          }
          el.goodsInfoFlag = goodsInfoFlag;
          return el.goodsInfo.addedFlag && el.goods.saleableFlag;
        });
        // 只展示上架商品
        if (!filterProducts.length) {
          this.setState({
            // isNoMoreProduct: 'recommendation.noMoreRecommendation'
            isNoMoreProduct: true,
            noData: true
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
            setTimeout(() => {
              this.calcIsShowMore();
            }, 0);
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
  }

  componentWillUnmount() {}
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
    let { productList, outOfStockProducts, inStockProducts, modalList } =
      this.state;
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
    outOfStockProducts.forEach((el, i) => {
      if (i === outOfStockProducts.length - 1) {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName;
      } else {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName + ',';
      }
      // return el;
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
    let { productList, outOfStockProducts, inStockProducts, modalList } =
      this.state;
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
            goodsInfoFlag: 2,
            periodTypeId: inStockProducts[i].defaultFrequencyId,
            recommendationId:
              this.props.clinicStore.linkClinicRecommendationInfos
                ?.recommendationId || this.props.clinicStore.linkClinicId,
            recommendationInfos:
              this.props.clinicStore.linkClinicRecommendationInfos,
            recommendationName:
              this.props.clinicStore.linkClinicRecommendationInfos
                ?.recommendationName || this.props.clinicStore.linkClinicName
          });
          await this.props.checkoutStore.updateLoginCart({
            intl: this.props.intl
          });
        } catch (e) {
          this.setState({ buttonLoading: false });
        }
      }
      this.props.history.push('/cart');
    }
  }
  async hanldeUnloginAddToCart(products, path) {
    const { checkoutStore, clinicStore, loginStore } = this.props;
    let retPath = path;
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
            goodsInfoFlag: p.goodsInfoFlag,
            periodTypeId: p.defaultFrequencyId,
            recommendationInfos:
              this.props.clinicStore.linkClinicRecommendationInfos,
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
      }),
      ...this.props
    });
    if ((isFr && !this.state.isSPT) || isRu) {
      // 是fr breeder的特殊code，需要主动默认填充
      await this.props.checkoutStore.setPromotionCode(
        this.state.promotionCodeText
      );
    }
    if (retPath === '/checkout') {
      retPath = await distributeLinktoPrecriberOrPaymentPage({
        configStore: this.props.configStore,
        checkoutStore,
        clinicStore,
        isLogin: loginStore.isLogin
      });
    }
    this.setState({ buttonLoading: false });
    this.props.history.push(retPath);
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
    let { productList, outOfStockProducts, inStockProducts, modalList } =
      this.state;
    let totalPrice;
    inStockProducts.forEach((el) => {
      console.log(el, 'instock');
      totalPrice =
        totalPrice + el.recommendationNumber * el.goodsInfo.salePrice;
      // return el;
    });
    if (outOfStockProducts.length > 0) {
      sessionItemRoyal.set(
        'recommend_product',
        JSON.stringify(inStockProducts)
      );
      this.setState({ modalShow: true, currentModalObj: modalList[1] });
      return false;
    } else {
      // 会员跳转/cart；游客跳转/checkout, 并缓存cartData数据
      if (loginStore.isLogin) {
        await this.hanldeLoginAddToCart();
      } else {
        inStockProducts.map((el) => {
          el.goodsInfo.buyCount = el.recommendationNumber;
          return el.goodsInfo;
        });
        sessionItemRoyal.set(
          'recommend_product',
          JSON.stringify(inStockProducts)
        );
        if (!needLogin) {
          await this.hanldeUnloginAddToCart(
            this.state.productList,
            '/checkout'
          );
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
  async hanldeClickSubmit() {
    const { checkoutStore, loginStore, history, clinicStore } = this.props;
    let { currentModalObj, subDetail, outOfStockProducts, inStockProducts } =
      this.state;
    this.setState({ loading: true, modalShow: false });
    if (currentModalObj.type === 'addToCart') {
      for (let i = 0; i < inStockProducts.length; i++) {
        try {
          await sitePurchase({
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            periodTypeId: inStockProducts[i].defaultFrequencyId,
            goodsCategory: '',
            goodsInfoFlag: 2
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
      inStockProducts.map((el) => {
        el.goodsInfo.buyCount = el.recommendationNumber;
        return el.goodsInfo;
      });
      loginStore.isLogin
        ? checkoutStore.setLoginCartData(inStockProducts)
        : checkoutStore.setCartData(inStockProducts);
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
  taggingDom = () => (
    <div className="tagging-wrap" style={{ paddingLeft: '2px' }}>
      <div className="tagging-text">
        <div style={{ fontSize: '1.37rem', fontWeight: '500' }}>
          – 5€ à -20€
        </div>
        <div style={{ fontSize: '0.81rem', lineHeight: '0.5' }}>
          offre de bienvenue*
        </div>
      </div>
    </div>
  );
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
  tabChange(productList, index) {
    let promotionCode = funcUrl({ name: 'coupon' }) || '';
    this.setState({ activeIndex: index }, () => {
      this.calcIsShowMore();
    });
    const currentProduct = productList.filter((item, i) => i == index && item);
    GARecommendationProduct(
      currentProduct,
      2,
      this.state.frequencyList,
      promotionCode,
      this.state.activeIndex
    );
  }
  calcIsShowMore = () => {
    let descriptionDom = document.querySelector('.description');
    console.log('scrollHeight: ', descriptionDom.scrollHeight);
    console.log('offsetHeight: ', descriptionDom.offsetHeight);
    if (descriptionDom.scrollHeight > descriptionDom.offsetHeight) {
      console.log('出现了省略号');
      this.setState({ showMoreInit: true });
    } else {
      this.setState({ showMoreInit: false });
      console.log('没有出现省略号');
    }
  };

  render() {
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

    let details = productList[activeIndex] || {};
    const filterImages =
      details.images?.filter((i) => {
        i.artworkUrl = i.goodsInfoImg || i.artworkUrl;
        return i.goodsInfoImg;
      }) || [];
    return (
      <div className="Recommendation_FRBreeder">
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
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
          <p className="text-center sub-title m-auto">
            VOTRE RECOMMANDATION ÉLEVEUR
          </p>
          <p className="text-center rc-beta m-auto recommendation-title">
            Offrez à votre nouveau compagnon la nutrition adaptée à ses besoins
            spécifiques​
          </p>
          <div className="triangle-for-mobile"></div>
          {this.state.noData ? null : (
            <div className="background-container">
              <div className="goods-list-container  m-auto text-center">
                {details?.goodsInfos ? (
                  <>
                    <ul className="tab-list m-auto">
                      {productList.map((el, index) => (
                        <li
                          onClick={() => this.tabChange(productList, index)}
                          className={`text-center ${
                            activeIndex == index ? 'active' : ''
                          }`}
                          style={{
                            cursor: 'pointer',
                            display: 'inline-block',
                            padding: '0 1rem'
                          }}
                        >
                          <img
                            className="tab-img"
                            src={el.images[0].artworkUrl}
                          />
                          <div>{el.goodsInfo.goodsInfoName}</div>
                        </li>
                      ))}
                    </ul>
                    <div className="goods-container rc-layout-container rc-five-column">
                      <div className="goods-imgs rc-double-width rc-column">
                        <ImageMagnifier_fr
                          sizeList={details.sizeList || []}
                          video={details.goodsVideo}
                          images={details.images || []}
                          minImg={details.goodsImg}
                          maxImg={details.goodsImg}
                          imgAlt={details?.goodsName}
                          bigImageOutBoxClassName="pt-70px"
                          taggingChildren={this.taggingDom()}
                          config={this.state.imageMagnifierCfg?.config}
                          taggingForText={details.taggingForTextAtPDP}
                          taggingForImage={details.taggingForImageAtPDP}
                          // spuImages={[]}
                          spuImages={
                            filterImages.length ? filterImages : details.images
                          }
                        />
                      </div>
                      <div className="goods-info  rc-triple-width rc-column text-left">
                        <h2 title={details?.goodsInfo?.goodsInfoName}>
                          {details?.goodsInfo?.goodsInfoName}
                        </h2>
                        <p
                          className="description"
                          style={{
                            webkitLineClamp: !this.state.showMored
                              ? '2'
                              : 'inherit'
                          }}
                        >
                          {details?.goodsInfos[0]?.goods.goodsSubtitle}
                          {/* Donner le meilleur départ dans la vie à votre chaton commence
                  par une bonne nutrition. En lui apportant les nutriments
                  essentiels dont il a besoin… */}
                          <span
                            className="show-more"
                            style={{
                              display: this.state.showMoreInit
                                ? 'block'
                                : 'none'
                            }}
                          >
                            <span
                              style={{
                                display: this.state.showMored
                                  ? 'none'
                                  : 'inline'
                              }}
                            >
                              ...
                            </span>
                            <span
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                this.setState({
                                  showMored: !this.state.showMored
                                });
                              }}
                            >
                              {this.state.showMored ? 'Range ça' : 'Voir plus'}
                            </span>
                          </span>
                        </p>
                        <div className="price">
                          <FormattedMessage id="from" />{' '}
                          {formatMoney(details.goodsInfo.subscriptionPrice)}{' '}
                          <FormattedMessage id="to" />{' '}
                          {formatMoney(details.goodsInfo.marketPrice)}
                        </div>
                        {/* <button>Ajouter au panier</button> */}
                        <button
                          onClick={this.addCart}
                          style={{ width: '284px' }}
                          className={`rc-btn add-to-cart-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile md-up
                        ${this.state.buttonLoading ? 'ui-btn-loading' : ''}
              ${this.addCartBtnStatus ? '' : 'rc-btn-solid-disabled'}`}
                        >
                          <span className="fa rc-icon rc-cart--xs rc-brand3" />
                          <span className="default-txt">
                            <FormattedMessage id="details.addToCart" />
                          </span>
                        </button>
                        <p className=" md-up">
                          Livraison en 3 jours ouvrés offerte
                        </p>
                        <div className="advantage-container">
                          <h5>Découvrez les avantages du CLUB Royal Canin</h5>
                          <p>
                            Un abonnement{' '}
                            <span style={{ color: '#333', fontWeight: '500' }}>
                              flexible et sans engagement
                            </span>
                          </p>
                          <div className="advantage-list">
                            {advantageList.map((advantages) => (
                              <div className="rc-layout-container rc-two-colum">
                                {advantages.map((el) => (
                                  <div
                                    className="rc-column"
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    {el.img && (
                                      <img
                                        style={{
                                          width: '60px',
                                          height: '60px'
                                        }}
                                        src={el.img}
                                      />
                                    )}
                                    {/* <div style={{width:'60px',height:'60px',background:`url(${el.img})`,backgroundSize:'250%',backgroundRepeat:'no-repeat',backgroundPosition:'center'}}></div> */}
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: el.text
                                      }}
                                      style={{
                                        display: 'inline-block',
                                        flex: 1
                                      }}
                                    ></span>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                        <p style={{ marginTop: '0.75rem' }}>
                          <sup>1</sup> Cumulable avec l'offre de bienvenue
                        </p>
                      </div>
                    </div>
                    <div className="md-down add-cart-for-mobile">
                      <button
                        onClick={this.addCart}
                        className={`rc-btn add-to-cart-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile
                     ${this.state.buttonLoading ? 'ui-btn-loading' : ''}
              ${this.addCartBtnStatus ? '' : 'rc-btn-solid-disabled'}`}
                      >
                        <span className="fa rc-icon rc-cart--xs rc-brand3" />
                        <span className="default-txt">
                          <FormattedMessage id="details.addToCart" />
                        </span>
                      </button>
                      <p>Livraison en 3 jours ouvrés offerte</p>
                    </div>
                  </>
                ) : (
                  <Skeleton
                    color="#f5f5f5"
                    width="100%"
                    height="100%"
                    count="3"
                  />
                )}
              </div>
            </div>
          )}

          <Description
            details={details}
            text={grayBoxInnerText[window.__.env.REACT_APP_COUNTRY]}
          />
          <Footer />
        </main>
      </div>
    );
  }
}

export default Recommendation;
