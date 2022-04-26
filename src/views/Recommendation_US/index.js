import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import BannerTip from '@/components/BannerTip';
import ImageMagnifier from '@/components/ImageMagnifierForUS';
import UsAndRu from './components/UsAndRu';
import Fr from './components/Fr';
import { formatMoney, getDeviceType } from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import Loading from '@/components/Loading';
import { DivWrapper } from './style';
import './index.css';
import { inject, observer } from 'mobx-react';
import {
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
import {
  GARecommendationProduct,
  GABreederRecoPromoCodeCTA,
  GABreederRecoSeeInCart,
  GABigBreederAddToCar
} from '@/utils/GA';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';

const imgUrlPreFix = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/recommendation`;
const isUs = window.__.env.REACT_APP_COUNTRY === 'us';
const isRu = window.__.env.REACT_APP_COUNTRY === 'ru';
const isFr = window.__.env.REACT_APP_COUNTRY === 'fr';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

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
        if (isUs) {
          let breedOrShelterId =
            JSON.parse(prescriptionJson)?.prescriber?.customerId ||
            res.context.structureType ||
            '';
          sessionItemRoyal.set('BreedOrShelterId', breedOrShelterId);
        }

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
            goodsInfoFlag: 0,
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
    try {
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
              goodsInfoFlag: 0,
              periodTypeId: null,
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
    } catch (error) {
      // 抛错后前端取消pageLoading，并带着错误信息跳转到Cart页面 state传参不会在地址栏显示
      this.setState({ pageLoading: false }, () => {
        this.props.history.push({
          pathname: path,
          state: {
            errMsg: error.message
          }
        });
      });
    }
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
  seeMore = () => {
    this.setState({ showMore: true });
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
  isSPTUp = () => (
    <div>
      <section
        className="text-center"
        style={{ width: this.state.isMobile ? '95%' : '60%', margin: '0 auto' }}
      >
        <h1
          style={{ color: '#E2001A', margin: '1.25rem' }}
          className="text-3xl"
        >
          Bienvenue !
        </h1>
        <h2 style={{ color: '#E2001A', margin: '1.25rem' }}>
          Merci pour votre visite en magasin, voici notre recommandation.
        </h2>
        {/* <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
      <FormattedMessage id="recommendation.firstTitle" />
    </h2> */}
        <p style={{ fontSize: '1.125rem' }} className="mb-6">
          {/* <FormattedMessage id="recommendation.firstContent" /> */}
          La recommandation a été faite en fonction des besoins uniques de votre
          animal.
        </p>
        <p className="mb-8">
          <button
            className={`rc-btn rc-btn--one ${
              this.state.buttonLoading ? 'ui-btn-loading' : ''
            } ${
              this.state.inStockProducts.length ? '' : 'rc-btn-solid-disabled'
            }`}
            onClick={() => {
              if (this.props.loginStore.isLogin) {
                this.hanldeLoginAddToCart();
              } else {
                this.hanldeUnloginAddToCart(this.state.productList, '/cart');
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
    const {
      promotionCodeText,
      isMobile,
      checkPromotionCodeAndCopy,
      viewShoppingCartWidth
    } = this.state;

    return (
      <div>
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
            <div className="inherit-fontsize children-nomargin rc-margin-bottom--xs heading-block-content">
              <span style={{ fontSize: '1.125rem', color: 'rgb(61, 61, 60)' }}>
                {/* <FormattedMessage
                  values={{
                    val: (
                      <span style={{ color: '#e2001a', fontSize: '1.5rem' }}>
                        E
                      </span>
                    )
                  }}
                  id="recommendation.welcomeSubText"
                /> */}
                <FormattedMessage
                  id="recommendation.welcomeSubText"
                  values={{
                    val2: (
                      <em style={{ fontSize: '14px', color: '#666' }}>
                        (Offre personnelle valable sur l'intégralité de nos
                        aliments chien & chat (hors aliments humides, Babycat
                        milk, gamme Size mini indoor & conditionnements de 1kg)
                        et cumulable avec l'offre d'abonnement. Valable une
                        seule fois et uniquement sur la boutique en ligne Royal
                        Canin{' '}
                        <a
                          href="https://www.royalcanin.com/fr/shop"
                          style={{
                            color: '#000',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                          }}
                        >
                          https://www.royalcanin.com/fr/shop
                        </a>
                        )
                      </em>
                    ),
                    val: (
                      <strong style={{ color: '#e2001a' }}>
                        réduction de 5€ à 20€
                      </strong>
                    )
                  }}
                />
                {/* La recommandation a été faite en fonction des besoins uniques de
          votre animal. */}
              </span>
            </div>

            <div className="">
              {/*//1111111*/}
              {(isRu || isUs) && (
                <>
                  <p>
                    <strong style={{ color: '#E2001A' }}>
                      <FormattedMessage id="recommendation.firstOrderDiscount" />
                    </strong>
                  </p>
                  <button
                    className={`rc-btn rc-btn--one mt-6 ${
                      this.state.buttonLoading ? 'ui-btn-loading' : ''
                    } ${this.addCartBtnStatus ? '' : 'rc-btn-solid-disabled'}`}
                    onClick={this.addCart}
                  >
                    <FormattedMessage id="recommendation.welcomeBtn" />
                    {/* Voir le panier */}
                  </button>
                </>
              )}

              {/* promotion code */}
              {/* 查看promotion code按钮 */}
              {/* {isFr && promotionCodeText && (
                <>
                  <button
                    // data-tooltip-placement="top"
                    // data-tooltip="top-tooltip"
                    className={`rc-btn rc-btn--one click-and-show-promotioncode ${
                      !checkPromotionCodeAndCopy ? 'show' : 'hide'
                    }`}
                    onClick={this.checkPromotionCode}
                  >
                    <FormattedMessage id="recommendation.copyPromotionCodeText" />
                  </button>

                </>
              )} */}
              {/* 点击查看promotion code按钮后显示 */}
              {isFr && promotionCodeText && (
                <>
                  <p className="copied-box">
                    <button
                      id="btnCopyPromotionCode"
                      // title=""
                      // data-tooltip-placement="top"
                      // data-tooltip="top-tooltip"
                      className={`rc-btn   ${
                        checkPromotionCodeAndCopy
                          ? 'rc-btn--two'
                          : ' rc-btn--one click-and-show-promotioncode'
                      }`}
                      onClick={(e) => {
                        this.checkPromotionCode(e);
                      }}
                    >
                      {checkPromotionCodeAndCopy ? (
                        promotionCodeText
                      ) : (
                        <FormattedMessage id="recommendation.copyPromotionCodeText" />
                      )}
                    </button>
                    {/* <div
                      className={`copied-tips rc-padding-x--xs rc-padding-y--xs ${
                        this.state.showCoiedTips ? '' : 'hide'
                      }`}
                    >
                      copié !
                    </div> */}

                    {/* <div id="top-tooltip" className="rc-tooltip">
                      <div className="rc-padding-x--xs rc-padding-y--xs">
                        copié !
                      </div>
                    </div> */}
                  </p>
                  {/* <div className="rc-margin-top--xs">
                    <FormattedMessage id="recommendation.copyTips" />
                  </div> */}
                  <p>
                    <button
                      className={`rc-btn rc-btn--one click-and-show-promotioncode ${
                        this.state.buttonLoading ? 'ui-btn-loading' : ''
                      } ${this.state.buttonLoading ? 'ui-btn-loading' : ''} ${
                        this.state.inStockProducts.length
                          ? ''
                          : 'rc-btn-solid-disabled'
                      } ${checkPromotionCodeAndCopy ? 'show' : 'hide'}`}
                      style={{ width: viewShoppingCartWidth + 'px' }}
                      onClick={this.addCart}
                    >
                      <FormattedMessage id="recommendation.viewShoppingCart" />
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  };

  render() {
    let otherShow = {
      ru: (
        <UsAndRu
          buttonLoading={this.state.buttonLoading}
          addCartBtnStatus={this.addCartBtnStatus}
          addCart={this.addCart}
        />
      ),
      us: (
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
      <DivWrapper className="Recommendation_FR Recommendation_US">
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
              style={{ fontSize: '2rem', textAlign: 'center' }}
            >
              <FormattedMessage
                values={{
                  val: <br />
                }}
                id={this.state.isNoMoreProduct}
              />
            </div>
          ) : (
            <div
              className="transparentSection"
              style={{ display: `${this.state.noData ? 'none' : 'block'}` }}
            >
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
                        <div className="recommendProductInner border-t-0 block">
                          {productList.length > 1 && (
                            <div className="rc-fade--x">
                              <div className="imageTabBox text-center">
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
                                              fromPrice:
                                                formatMoney(MinMarketPrice),
                                              toPrice:
                                                formatMoney(MaxMarketPrice)
                                            }}
                                          />
                                        </span>
                                        <span className="promotion-price">
                                          <FormattedMessage
                                            id="pirceRange"
                                            values={{
                                              fromPrice:
                                                formatMoney(MinMarketPrice),
                                              toPrice:
                                                formatMoney(MaxMarketPrice)
                                            }}
                                          />
                                        </span>
                                      </React.Fragment>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/*11111111 Add, between price & cart, in bold, red, bigger:*/}
                              <strong style={{ color: '#E2001A' }}>
                                <FormattedMessage id="recommendation.firstOrderDiscount" />
                                {/*Your welcome offer to receive 30% off your first order will be applied at checkout.*/}
                              </strong>

                              <p className="flex justify-center mb-0 md:mb-6 mt-6">
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
                                  {isFr && !isSPT ? (
                                    'Voir mon panier'
                                  ) : (
                                    <FormattedMessage id="recommendation.viewInCart" />
                                  )}
                                </button>
                              </p>

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
                                />
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
                                  {
                                    grayBoxInnerText[
                                      window.__.env.REACT_APP_COUNTRY
                                    ]
                                  }
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
                                    className="pb-10"
                                    style={{ fontSize: 'auto' }}
                                    dangerouslySetInnerHTML={createMarkup(
                                      productList[activeIndex].benefit
                                    )}
                                  />
                                  <p
                                    style={{ fontSize: '1rem' }}
                                    dangerouslySetInnerHTML={createMarkup(
                                      productList[activeIndex].benefitMobile
                                    )}
                                  />
                                  {/* <p>{productList[activeIndex]}</p> */}
                                </p>
                              </React.Fragment>
                            ) : null}
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
          {/* {this.otherShow()[window.__.env.REACT_APP_COUNTRY]} */}
          {otherShow[window.__.env.REACT_APP_COUNTRY]}
          <Footer />
        </main>
      </DivWrapper>
    );
  }
}

export default Recommendation;
