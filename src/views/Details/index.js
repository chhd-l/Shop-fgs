import React from 'react';
import Skeleton from '@/components/NormalSkeleton';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import classNames from 'classnames';
import { toJS } from 'mobx';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HandledSpec from '@/components/HandledSpec/index.tsx';
import BreadCrumbsNavigation from '@/components/BreadCrumbsNavigation';
import InstockStatusComp from '@/components/InstockStatusComp/index.tsx';
import SingleBuyMethod from './components/SingleBuyMethod/index.tsx';
import AutoshipBuyMethod from './components/AutoshipBuyMethod/index.tsx';
import ClubBuyMethod from './components/ClubBuyMethod/index.tsx';
import SeoConfig from './components/SeoConfig/index.tsx';
import ButtonGroup from './components/ButtonGroup/index.tsx';
import ErrMsgForCheckoutPanel from './components/ErrMsgForCheckoutPanel/index.tsx';
import PhoneAndEmail from './components/PhoneAndEmail/index.tsx';
import DetailHeader from './components/DetailHeader/index.tsx';
import ImageMagnifier from '@/components/ImageMagnifier';
import ImageMagnifier_fr from './components/ImageMagnifier';
import AddCartSuccessMobile from './components/AddCartSuccessMobile.tsx';
import BannerTip from '@/components/BannerTip';
import Reviews from './components/Reviews';
import Loading from '@/components/Loading';
import DailyPortion from './components/DailyPortion';
import {
  getDeviceType,
  getFrequencyDict,
  queryStoreCateList,
  loadJS,
  getDictionary,
  filterObjectValue,
  isCountriesContainer,
  getClubFlag,
  handleRecommendation,
  isShowMixFeeding,
  addToUnloginCartData,
  addToLoginCartData
} from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import { decryptString } from '@/lib/aes-utils';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import find from 'lodash/find';
import {
  getDetails,
  getLoginDetails,
  getDetailsBySpuNo,
  getMixFeeding
} from '@/api/details';
import { sitePurchase } from '@/api/cart';
import RelateProductCarousel from './components/RelateProductCarousel';
import BuyFromRetailerBtn from './components/BuyFromRetailerBtn';
import { tempHubFrRedirect } from '@/redirect/utils';
import svg from './details.svg';
import { QuantityPicker } from '@/components/Product';
import Help from './components/Help';

import './index.css';
import './index.less';
import GoodsDetailTabs from '@/components/GoodsDetailTabs';
import AdvantageTips from './components/AdvantageTips';
import Advantage from './components/Advantage';
import Ration from './components/Ration/index.tsx';
import GA_Comp from './components/GA_Comp/index.tsx';
import BazaarVoiceReviews from '@/components/BazaarVoice/reviews';
import { addSchemaOrgMarkup } from '@/components/BazaarVoice/schemaOrgMarkup';
import {
  setGoogleProductStructuredDataMarkup,
  hubGAProductDetailPageView,
  hubGAAToCar,
  HubGaPdpBuyFromRetailer,
  GAPdpSizeChange
} from './GA';
import PrescriberCodeModal from '../ClubLandingPageNew/Components/DeStoreCode/Modal';
import MixFeedingBanner from './components/MixFeedingBanner/index.tsx';
import cloneDeep from 'lodash/cloneDeep';
import PurchaseMethodB from './components/PurchaseMethodB';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const PC = getDeviceType() === 'PC' || getDeviceType() === 'Pad';
const isHub = window.__.env.REACT_APP_HUB;
const Fr = window.__.env.REACT_APP_COUNTRY === 'fr';
const Ru = window.__.env.REACT_APP_COUNTRY === 'ru';
const Tr = window.__.env.REACT_APP_COUNTRY === 'tr';
const Uk = window.__.env.REACT_APP_COUNTRY === 'uk';
const Jp = window.__.env.REACT_APP_COUNTRY === 'jp';
const purchaseType = {
  0: 'Single purchase',
  1: 'Autoship',
  2: 'Club'
};
@inject(
  'checkoutStore',
  'loginStore',
  'headerCartStore',
  'configStore',
  'clinicStore'
)
@injectIntl
@observer
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tmpGoodsDescriptionDetailList: [], //获取tab处理后的相关数据
      event: {},
      eEvents: {},
      initing: true,
      details: {
        id: '',
        goodsName: '',
        goodsDescription: '',
        sizeList: [],
        images: [],
        goodsSpecDetails: [],
        goodsSpecs: [],
        taggingForText: null,
        taggingForImage: null,
        fromPrice: 0,
        toPrice: 0
      },
      activeTabIdxList: [0], //isMobile ? [] : [0], //mobile 也默认展开第一个tab
      goodsDetailTab: [],
      quantity: 1,
      stock: 0,
      instockStatus: true,
      quantityMinLimit: 1,
      currentUnitPrice: 0,
      currentLinePrice: 0,
      currentSubscriptionPrice: 0,
      currentSubscriptionStatus: 0,
      imageMagnifierCfg: {
        show: false
        // config: {},
      },
      loading: true,
      errMsg: '',
      checkOutErrMsg: '',
      addToCartLoading: false,
      productRate: 0,
      backgroundSpaces: '🐕',
      replyNum: 0,
      goodsId: null,
      minMarketPrice: 0,
      minSubscriptionPrice: 0,
      form: {
        buyWay: 1, //-1-None 0-One-off purchase 1-Subscription 2-Club
        frequencyVal: '',
        frequencyName: '',
        frequencyId: -1
      },
      frequencyList: [],
      goodsNo: '', // SPU
      breadCrumbs: [],
      spuImages: [],
      requestJson: {}, //地址请求参数JSON eg:{utm_campaign: "shelter108782",utm_medium: "leaflet",utm_source: "vanityURL"}
      pageLink: window.location.href,
      purchaseTypeDict: [],
      barcode: '',
      descContent: '',
      ccidBtnDisplay: false,
      questionParams: undefined,
      defaultPurchaseType: 0,
      headingTag: 'h1',
      showPrescriberCodeModal: false, //是否打开de PrescriberCodeModal
      showErrorTip: false,
      modalMobileCartSuccessVisible: false,
      defaultSkuId: funcUrl({ name: 'skuId' }),
      defaultGoodsInfoFlag: funcUrl({ name: 'goodsInfoFlag' }),
      mixFeeding: null,
      originalProductInfo: {},
      mixFeedingByProductInfo: {},
      mixFeedingBtnLoading: false,
      hiddenMixFeedingBanner: false,
      fromPrice: '',
      versionB: false
    };
    this.hanldeAddToCart = this.hanldeAddToCart.bind(this);
    this.ChangeFormat = this.ChangeFormat.bind(this);
    window.switchToVersionB = this.switchToVersionB;
  }
  componentWillUnmount() {}

  async componentDidMount() {
    const { pathname } = this.props.location;
    const { form } = this.state;
    this.getUrlParam();
    // 获取spu在?后面有很多数据的时候，需要特殊处理一下
    let goodsSpuNo =
      pathname.split('-').reverse().length > 1
        ? pathname.split('-').reverse()[0]
        : '';
    if (window.location.href.includes('?')) {
      goodsSpuNo =
        window.location.href?.split('?')?.[0].split('-').reverse()[0] || '';
    }
    this.setState(
      {
        id: this.props.match.params.id,
        goodsNo: goodsSpuNo || '',
        pageLink: this.redirectCanonicalLink({ pageLink: this.state.pageLink })
      },
      () => this.queryDetails()
    );
    this.pushPurchase(form.buyWay);
  }

  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get checkoutStore() {
    return this.props.checkoutStore;
  }
  get buyFromRetailerConfig() {
    const configStr = this.props.configStore?.info?.buyFromRetailerContext
      ? decryptString(this.props.configStore.info.buyFromRetailerContext)
      : '{}';
    return JSON.parse(configStr);
  }
  get btnStatus() {
    const { details, quantity, instockStatus, initing, loading, form } =
      this.state;
    const { sizeList } = details;
    let selectedSpecItem = details.sizeList.filter((el) => el.selected)[0];
    let addedFlag = 1;
    let isUnitPriceZero = false;
    if (details.sizeList.length) {
      addedFlag = selectedSpecItem?.addedFlag;
      isUnitPriceZero = form.buyWay === 0 && !selectedSpecItem?.marketPrice;
    }
    // details.sizeList.filter(el => el.selected).addedFlag
    // displayFlag 是否展示在前台
    // saleableFlag 是否可销售
    // 不可销售且不展示在前台 则前台按钮置灰
    return (
      !initing &&
      !loading &&
      instockStatus &&
      quantity &&
      (details.saleableFlag || !details.displayFlag) &&
      addedFlag &&
      !isUnitPriceZero &&
      form.buyWay !== -1
    );
  }

  get isNullGoodsInfos() {
    const { details } = this.state;

    if (Array.isArray(details?.goodsInfos) && details?.goodsInfos.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  get retailerBtnStatus() {
    const { loading, goodsType, exclusiveFlag = false } = this.state;
    const sptGoods = goodsType === 0 || goodsType === 1;
    let bundle = goodsType && goodsType === 2;
    const buyFromRetailerConfig = this.buyFromRetailerConfig;
    //const widgetId = window.__.env.REACT_APP_HUBPAGE_RETAILER_WIDGETID;
    const enableRetailer =
      buyFromRetailerConfig.retailerEnable && (!Tr || !sptGoods);
    return !loading && !bundle && isHub && !exclusiveFlag && enableRetailer;
  }

  redirectCanonicalLink({ pageLink }) {
    let ret;
    const {
      location: { pathname }
    } = this.props;
    const redirectUrl = (tempHubFrRedirect?.RECORDS || []).filter(
      (t) => decodeURIComponent(t.shortUrl) === decodeURIComponent(pathname)
    )[0]?.redirectUrl;
    if (redirectUrl) {
      ret = pageLink.split('/');
      ret.splice(ret.length - 1, 1, redirectUrl.replace(/^\/?/gi, ''));
      ret = ret.join('/');
    }
    return ret ? ret : pageLink;
  }

  setDefaultPurchaseType({ id }) {
    const { promotions, details, frequencyList, purchaseTypeDict } = this.state;
    const skuPromotions =
      details.sizeList?.filter((item) => item?.selected)?.[0]?.promotions || '';
    const targetDefaultPurchaseTypeItem =
      purchaseTypeDict.filter(
        (ele) => ele.id && id && ele.id + '' === id + ''
      )[0] || purchaseTypeDict.filter((ele) => ele.name === 'None')[0];
    const { configStore, checkoutStore } = this.props;
    let defaultPurchaseType = 0;
    if (targetDefaultPurchaseTypeItem) {
      let buyWay = 0;
      defaultPurchaseType = {
        None: -1,
        Subscription: 1,
        'One-off purchase': 0
      }[targetDefaultPurchaseTypeItem.valueEn];
      if (
        defaultPurchaseType === 1 ||
        sessionItemRoyal.get('pf-result') ||
        localStorage.getItem('pfls') ||
        this.state.defaultGoodsInfoFlag
      ) {
        buyWay =
          parseInt(this.state.defaultGoodsInfoFlag) || skuPromotions === 'club'
            ? 2
            : 1;
      } else {
        buyWay = defaultPurchaseType;
      }
      if (!isNaN(parseInt(this.state.defaultGoodsInfoFlag))) {
        buyWay = parseInt(this.state.defaultGoodsInfoFlag);
        if (parseInt(this.state.defaultGoodsInfoFlag) > 0) {
          defaultPurchaseType = 1;
        } else {
          defaultPurchaseType = 0;
        }
      }

      let autoshipDictRes = frequencyList.filter(
        (el) => el.goodsInfoFlag === 1
      );
      let clubDictRes = frequencyList.filter((el) => el.goodsInfoFlag === 2);

      let defaultFrequencyId = 0;
      // 获取默认frequencyId
      if (details?.promotions === 'club') {
        defaultFrequencyId =
          details?.defaultFrequencyId ||
          configStore.info?.storeVO?.defaultSubscriptionClubFrequencyId ||
          (clubDictRes[0] && clubDictRes[0].id) ||
          '';
      } else {
        defaultFrequencyId =
          details?.defaultFrequencyId ||
          configStore?.info?.storeVO?.defaultSubscriptionFrequencyId ||
          (autoshipDictRes[0] && autoshipDictRes[0].id) ||
          '';
      }

      this.setState({
        form: Object.assign(this.state.form, {
          buyWay,
          frequencyId: defaultFrequencyId
        }),
        defaultPurchaseType
      });
    }
  }

  getUrlParam() {
    const utmSource = funcUrl({ name: 'utm_source' });
    const utmMedium = funcUrl({ name: 'utm_medium' });
    const utmCampaign = funcUrl({ name: 'utm_campaign' });
    const prefixFn = funcUrl({ name: 'prefn1' });
    const prefixBreed = funcUrl({ name: 'prefv1' });
    const requestJson = {
      utmSource,
      utmMedium,
      utmCampaign,
      prefixFn,
      prefixBreed
    };
    this.setState({
      requestJson
    });
  }

  getPdpScreenLoadData = () => {
    const { clinicStore } = this.props;
    let {
      details,
      currentSubscriptionStatus,
      currentSubscriptionPrice,
      skuPromotions
    } = this.state;

    const pdpScreenLoadData = {
      currentSubscriptionStatus,
      currentSubscriptionPrice,
      skuPromotions,
      clinicStore
      //selectPrice
    };

    hubGAProductDetailPageView(details, pdpScreenLoadData);
  };

  matchGoods(data, sizeList) {
    //pdpScreenLoad bungdle没有规格的商品，也要调用GA start
    //pdpScreenLoad bungdle没有规格的商品，也要调用GA end
    let {
      instockStatus,
      details,
      spuImages,
      goodsDetailTab,
      tmpGoodsDescriptionDetailList,
      goodsNo,
      form,
      setDefaultPurchaseTypeParamId
    } = this.state;
    details.sizeList = sizeList;

    this.setState(Object.assign({ details, form }, data), () => {
      this.updateInstockStatus();
      setTimeout(() =>
        setGoogleProductStructuredDataMarkup({
          instockStatus,
          details,
          spuImages,
          goodsDetailTab: tmpGoodsDescriptionDetailList,
          goodsNo
        })
      );
      this.setDefaultPurchaseType({
        id: setDefaultPurchaseTypeParamId
      });

      let selectedSpecItem = details.sizeList.filter((el) => el.selected)[0];
      if (!selectedSpecItem?.subscriptionStatus && this.state.form.buyWay > 0) {
        this.setState({
          form: Object.assign(this.state.form, {
            buyWay: -1
          })
        });
      }

      console.log(this.state.details, selectedSpecItem, 'details???');
    });

    // bundle商品的ga初始化填充
    if (!details.goodsSpecs) {
      this.getPdpScreenLoadData();
    }
  }

  updatedPriceOrCode = ({ barcode, selectPrice, clickEvent }) => {
    const { clinicStore } = this.props;
    const {
      currentSubscriptionStatus,
      currentSubscriptionPrice,
      skuPromotions,
      details
    } = this.state;
    const pdpScreenLoadData = {
      currentSubscriptionStatus,
      currentSubscriptionPrice,
      skuPromotions,
      clinicStore,
      selectPrice
    };

    // cc.js加载
    this.loadWidgetIdBtn(barcode);

    //hubGa初始化页面埋点,不是点击的事件才调用
    if (!clickEvent) {
      hubGAProductDetailPageView(details, pdpScreenLoadData);
    }

    this.setState({
      barcode
    });
  };

  toScroll = (anchorName) => {
    let anchorElement = document.getElementById(anchorName);
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  toClubTab = () => {
    let ClubLength = this.state.tmpGoodsDescriptionDetailList?.length;
    let activeTabIdx = isMobile
      ? [...this.state.activeTabIdxList, ClubLength]
      : [ClubLength];
    this.setState({ activeTabIdxList: activeTabIdx }, () => {
      this.toScroll('j-details-for-club');
    });
  };

  async queryDetails() {
    const { configStore } = this.props;
    const { id, goodsNo } = this.state;
    let requestName;
    let param;
    if (goodsNo) {
      requestName = getDetailsBySpuNo;
      param = goodsNo;
    } else {
      requestName = this.isLogin ? getLoginDetails : getDetails;
      param = id;
    }

    Promise.all([
      requestName(param),
      getFrequencyDict(),
      getDictionary({
        type: 'purchase_type'
      })
    ])
      .then((resList) => {
        const res = resList[0];
        const frequencyDictRes = resList[1];
        const purchaseTypeDictRes = resList[2];
        const goodsRes = res?.context?.goods;
        const backgroundSpace = res.context?.goods?.cateId;
        const contextResult = res.context;
        this.setState({
          fromPrice: contextResult.fromPrice
        });
        if (!contextResult) {
          this.setState({ showErrorTip: true });
          return;
        }
        // 获取club与autoship字典
        if (res && res.context && goodsRes) {
          this.setState({
            productRate: res.context.avgEvaluate
          });
        }
        if (backgroundSpace) {
          this.setState({
            backgroundSpaces: res.context.goods.cateId
          });
        }

        const technologyList = (
          res.context?.goodsAttributesValueRelList || []
        ).filter((el) => el.goodsAttributeName?.toLowerCase() === 'technology');
        const dryOrWetObj =
          technologyList.filter((el) =>
            ['dry', 'wet'].includes(el.goodsAttributeValue?.toLowerCase())
          )?.[0] || {};
        let dryOrWet = {
          value: dryOrWetObj?.goodsAttributeValue?.toLowerCase(),
          valueEn: dryOrWetObj.goodsAttributeValueEn
        };

        if (goodsRes) {
          const { goods = {}, images } = res.context;
          if (isShowMixFeeding()) {
            getMixFeeding(goods?.goodsId).then((res) => {
              let mixFeeding = handleRecommendation(
                res?.context?.goodsRelationAndRelationInfos.filter(
                  (el) => el.sort === 0
                )[0] || res?.context?.goodsRelationAndRelationInfos[0]
              );
              if (mixFeeding) {
                mixFeeding.quantity = 1;
              }
              let {
                goodsImg = '',
                goodsName = '',
                goodsNo = ''
              } = mixFeeding?.goods || {};
              let _hiddenMixFeedingBanner = false;
              let mixFeedingSelected = mixFeeding?.sizeList?.filter(
                (el) => el.selected
              )?.[0];
              if (!mixFeedingSelected?.stock) {
                _hiddenMixFeedingBanner = true;
              }
              this.setState({
                mixFeeding,
                mixFeedingByProductInfo: {
                  imageSrc: goodsImg,
                  goodsTitle: goodsName,
                  goodsNo
                },
                hiddenMixFeedingBanner: _hiddenMixFeedingBanner
              });
            });
          }

          const taggingList = (res.context?.taggingList || []).filter(
            (t) => t.displayStatus
          );
          let pageLink = window.location.href.split('-');
          pageLink.splice(pageLink.length - 1, 1, goodsRes.goodsNo);
          pageLink = pageLink.join('-');

          this.setState(
            {
              purchaseTypeDict: purchaseTypeDictRes,
              frequencyList: frequencyDictRes,
              productRate: goodsRes.avgEvaluate,
              replyNum: goodsRes.goodsEvaluateNum,
              goodsId: goodsRes.goodsId,
              minMarketPrice: goodsRes.minMarketPrice,
              details: Object.assign(this.state.details, {
                promotions: goods?.promotions?.toLowerCase(),
                taggingForTextAtPDP: taggingList.filter(
                  (e) => e.taggingType === 'Text' && e.showPage?.includes('PDP')
                )[0],
                taggingForImageAtPDP: taggingList.filter(
                  (e) =>
                    e.taggingType === 'Image' && e.showPage?.includes('PDP')
                )[0],
                taggingForTextAtCart: taggingList.filter(
                  (e) =>
                    e.taggingType === 'Text' &&
                    e.showPage?.includes('Shopping cart page')
                )[0],
                taggingForImageAtCart: taggingList.filter(
                  (e) =>
                    e.taggingType === 'Image' &&
                    e.showPage?.includes('Shopping cart page')
                )[0],
                fromPrice: res.context.fromPrice,
                toPrice: res.context.toPrice,
                goodsDescriptionDetailList:
                  res.context.goodsDescriptionDetailList,
                defaultFrequencyId: goodsRes.defaultFrequencyId
              }),
              spuImages: images,
              breadCrumbs: [{ name: goodsRes.goodsName }],
              pageLink: this.redirectCanonicalLink({ pageLink }),
              goodsType: goods.goodsType,
              exclusiveFlag: goods.exclusiveFlag,
              originalProductInfo: Object.assign(
                this.state.originalProductInfo,
                {
                  imageSrc: images?.[0]?.artworkUrl || '',
                  goodsTitle: goodsRes.goodsName || '',
                  technology: dryOrWet || {}
                }
              ),
              setDefaultPurchaseTypeParamId:
                goodsRes.defaultPurchaseType ||
                configStore.info?.storeVO?.defaultPurchaseType
            },
            () => {
              this.handleBreadCrumbsData();
              // this.setDefaultPurchaseType({
              //   id:
              //     goodsRes.defaultPurchaseType ||
              //     configStore.info?.storeVO?.defaultPurchaseType
              // });
            }
          );
        } else {
          throw new Error();
        }
        let sizeList = [];
        let goodsInfos = res.context.goodsInfos || [];

        if (res && res.context && res.context.goodsSpecDetails) {
          let images = [];
          images = res.context.goodsInfos;
          this.setState(
            {
              details: Object.assign(
                {},
                this.state.details,
                res.context.goods,
                {
                  promotions: res.context.goods?.promotions?.toLowerCase(),
                  sizeList,
                  goodsInfos: res.context.goodsInfos,
                  goodsSpecDetails: res.context.goodsSpecDetails,
                  goodsSpecs: res.context.goodsSpecs,
                  goodsAttributesValueRelList:
                    res.context.goodsAttributesValueRelList
                }
              ),
              images: cloneDeep(images)
            },
            async () => {
              // 不可销售，并且展示在前台的商品，获取envCode,去请求cc.js
              const { goods, goodsInfos } = res.context;
              const notSaleGoods =
                window.__.env.REACT_APP_HUB &&
                !goods.saleableFlag &&
                goods.displayFlag;
              const goodsInfoBarcode = goodsInfos?.[0]?.goodsInfoBarcode;
              if (notSaleGoods) {
                let barcode = goodsInfoBarcode
                  ? goodsInfoBarcode
                  : '3182550751148'; //暂时临时填充一个code,因为没有值，按钮将不会显示;
                this.setState({
                  barcode
                });
                this.loadWidgetIdBtn(barcode);
              }

              //启用BazaarVoice时，在PDP页面add schema.org markup
              if (!!+window.__.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS) {
                //设置延时获取BazaarVoice dom节点
                setTimeout(() => {
                  addSchemaOrgMarkup(
                    this.state.details,
                    this.state.instockStatus,
                    <FormattedMessage id="homePage" />
                  );
                }, 60000);
              }
            }
          );
        } else {
          let images = [];
          images = res.context.goodsInfos;
          this.setState({
            details: Object.assign({}, this.state.details, res.context.goods, {
              promotions: res.context.goods?.promotions?.toLowerCase(),
              sizeList,
              goodsInfos: res.context.goodsInfos,
              goodsSpecDetails: res.context.goodsSpecDetails,
              goodsSpecs: res.context.goodsSpecs,
              goodsAttributesValueRelList:
                res.context.goodsAttributesValueRelList
            }),
            images: cloneDeep(images)
          });
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          errMsg: e.message || <FormattedMessage id="details.errMsg2" />
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
          initing: false
        });
      });
  }
  handleBreadCrumbsData() {
    // 面包屑展示规则
    // 1 正向流程，使用history
    // 2 逆向流程，进行分类匹配【从sales catogery(home page)中，至少匹配一个进行展示】
    const { state } = this.props.location;
    const { breadCrumbs, details } = this.state;
    const cateNameInfos = details.storeCates || [];

    if (state && state.historyBreads) {
      this.setState({
        breadCrumbs: [...state.historyBreads, ...breadCrumbs]
      });
    } else if (cateNameInfos.length) {
      queryStoreCateList().then((tmpRes) => {
        for (let index = 0; index < cateNameInfos.length; index++) {
          const info = cateNameInfos[index];
          const matchedItem = (tmpRes || []).filter(
            (f) => f.storeCateId === info.storeCateId
          )[0];
          if (matchedItem) {
            this.setState({
              breadCrumbs: [
                {
                  name: matchedItem.cateName,
                  link: matchedItem.cateRouter
                },
                ...breadCrumbs
              ]
            });
            break;
          }
        }
      });
    }
  }
  loadWidgetIdBtn(barcode) {
    const { goodsType } = this.state;
    const buyFromRetailerConfig = this.buyFromRetailerConfig;
    console.log('retailer config:', buyFromRetailerConfig);
    const widgetId =
      buyFromRetailerConfig.retailerEnable &&
      buyFromRetailerConfig.type === 'API'
        ? buyFromRetailerConfig.idRetailProducts
        : null; // window.__.env.REACT_APP_HUBPAGE_RETAILER_WIDGETID;
    const vetWidgetId =
      buyFromRetailerConfig.retailerEnable &&
      buyFromRetailerConfig.type === 'API'
        ? buyFromRetailerConfig.idVetProducts
        : null; // window.__.env.REACT_APP_HUBPAGE_RETAILER_WIDGETID_VET;
    const id = goodsType === 3 ? vetWidgetId : widgetId;
    if (widgetId || vetWidgetId) {
      loadJS({
        url: 'https://fi-v2.global.commerce-connector.com/cc.js',
        id: 'cci-widget',
        dataSets: {
          token: buyFromRetailerConfig.token, //'2257decde4d2d64a818fd4cd62349b235d8a74bb', //uk，fr公用它
          locale: buyFromRetailerConfig.locale, // window.__.env.REACT_APP_HUBPAGE_RETAILER_LOCALE,
          displaylanguage: buyFromRetailerConfig.displayLanguage,
          //window.__.env.REACT_APP_HUBPAGE_RETAILER_DISPLAY_LANGUAGE,
          widgetid: id,
          ean: barcode,
          subid: '',
          trackingid: buyFromRetailerConfig.trackingIdPrefix // ''
        }
      });
    }
  }
  updateInstockStatus() {
    this.setState({
      instockStatus: this.state.quantity <= this.state.stock
    });
  }
  handleSelectedItemChange = (data) => {
    const { form } = this.state;
    form.frequencyVal = data.value;
    form.frequencyName = data.name;
    form.frequencyId = data.id;
    this.setState({ form }, () => {
      // this.props.updateSelectedData(this.state.form);
    });
  };
  showPrescriberCodeBeforeAddCart = () => {
    if (!!+window.__.env.REACT_APP_SHOWPRESCRIBERCODEMODAL) {
      const { clinicId, clinicName } = this.props.clinicStore;
      if (!(clinicId && clinicName)) {
        this.setState({ showPrescriberCodeModal: true });
      }
    }
  };
  closePrescriberCodeModal = async () => {
    this.setState({ showPrescriberCodeModal: false });
    const { clinicStore } = this.props;
    if (clinicStore.selectClinicId && clinicStore.selectClinicName) {
      if (this.isLogin) {
        this.hanldeLoginAddToCart();
      } else {
        await this.hanldeUnloginAddToCart();
      }
    }
  };
  async hanldeAddToCart() {
    try {
      if (!this.btnStatus) return false;
      this.setState({ checkOutErrMsg: '' });
      await this.showPrescriberCodeBeforeAddCart();
      if (!this.state.showPrescriberCodeModal) {
        if (this.isLogin) {
          this.hanldeLoginAddToCart();
        } else {
          await this.hanldeUnloginAddToCart();
        }
      }
    } catch (err) {}
  }
  async hanldeLoginAddToCart(type) {
    try {
      const { checkoutStore, intl, headerCartStore } = this.props;
      const { quantity, form, details, questionParams } = this.state;
      // const { formatMessage } = intl;

      hubGAAToCar(quantity, form);

      const { sizeList } = details;
      let currentSelectedSize;
      !type && this.setState({ addToCartLoading: true });
      if (details.goodsSpecDetails) {
        currentSelectedSize = find(sizeList, (s) => s.selected);
      } else {
        currentSelectedSize = sizeList[0];
      }
      let buyWay = parseInt(form.buyWay);
      let goodsInfoFlag =
        buyWay && details.promotions?.includes('club') ? 2 : buyWay;
      let param = {
        goodsInfoId: currentSelectedSize.goodsInfoId,
        goodsNum: quantity,
        goodsInfoFlag,
        petsId: currentSelectedSize.petsId,
        petsType: currentSelectedSize.petsType,
        questionParams,
        recommendationId: this.props.clinicStore.linkClinicId,
        recommendationName: this.props.clinicStore.linkClinicName
      };
      if (buyWay) {
        param.periodTypeId = form.frequencyId;
      }

      if (Object.keys(this.state.requestJson).length > 0) {
        param = { ...param, ...this.state.requestJson };
      }
      await sitePurchase(param);
      await checkoutStore.updateLoginCart({ intl });
      this.setState({ modalMobileCartSuccessVisible: true });
      if (!isMobile) {
        headerCartStore.show();
        setTimeout(() => {
          headerCartStore.hide();
        }, 4000);
      }
    } catch (err) {
      this.showCheckoutErrMsg(err.message);
    } finally {
      this.setState({ addToCartLoading: false });
    }
  }
  async hanldeUnloginAddToCart(type) {
    try {
      !type && this.setState({ addToCartLoading: true });
      const { checkoutStore } = this.props;
      const { currentUnitPrice, quantity, form, details, questionParams } =
        this.state;

      console.log({ details });
      // debugger;
      hubGAAToCar(quantity, form);
      let cartItem = Object.assign({}, details, {
        selected: true,
        goodsInfoFlag: parseInt(form.buyWay),
        periodTypeId: parseInt(form.buyWay) ? form.frequencyId : '',
        quantity,
        questionParams,
        recommendationId: this.props.clinicStore.linkClinicId,
        recommendationName: this.props.clinicStore.linkClinicName
      });
      //requestJson是shelter和breeder产品的参数，有就加上
      if (Object.keys(this.state.requestJson).length > 0) {
        cartItem = { ...cartItem, ...this.state.requestJson };
      }
      await checkoutStore.hanldeUnloginAddToCart({
        valid: this.btnStatus,
        cartItemList: [cartItem],
        currentUnitPrice,
        isMobile,
        ...this.props
      });
      this.setState({ modalMobileCartSuccessVisible: true });
    } catch (err) {
      this.showCheckoutErrMsg(err.message);
    } finally {
      this.setState({ addToCartLoading: false });
    }
  }

  pushPurchase(type) {
    window.dataLayer &&
      window.dataLayer.push({
        event: `pdpPurchaseTypeChange`,
        pdpPurchaseTypeChange: {
          newItem: purchaseType[type]
        }
      });
  }

  handleInputChange(e) {
    let { form } = this.state;
    form.buyWay = parseInt(e.currentTarget.value);
    this.setState({ form });
  }
  ChangeFormat(buyType) {
    let { form } = this.state;
    form.buyWay = parseInt(buyType);
    this.setState({ form });
    this.pushPurchase(buyType);
  }
  showCheckoutErrMsg(msg) {
    this.setState({
      checkOutErrMsg: msg,
      addToCartLoading: false
    });
    setTimeout(() => {
      this.setState({
        checkOutErrMsg: ''
      });
    }, 5000);
    if (isMobile) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
  formatUnit(baseSpecLabel) {
    let res = baseSpecLabel.slice(String(parseFloat(baseSpecLabel)).length);
    if (isNaN(parseFloat(res))) {
      return res;
    } else {
      return this.formatUnit(res);
    }
  }
  //加入购物车，埋点
  GAAddToCar(num, item) {
    let cur_selected_size = item.sizeList.filter((item2) => {
      return item2.selected == true;
    });
    let variant = cur_selected_size[0]?.specText;
    let goodsInfoNo = cur_selected_size[0]?.goodsInfoNo;
    let { form } = this.state;
    window?.dataLayer?.push({
      event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComAddToBasket`,
      ecommerce: {
        add: {
          products: [
            {
              name: item.goodsName,
              id: item.goodsNo,
              club: 'no',
              type:
                { 0: 'one-time', 1: 'subscription', 2: 'club' }[form.buyWay] ||
                '',
              price:
                {
                  0: cur_selected_size[0]?.marketPrice,
                  1: cur_selected_size[0]?.subscriptionPrice
                }[form.buyWay] || 0,
              brand: item.brandName || 'Royal Canin',
              category: item.goodsCateName,
              variant: parseInt(variant),
              quantity: num,
              recommendation: 'self-selected',
              sku: goodsInfoNo
            }
          ]
        }
      }
    });
  }

  handleBuyFromRetailer = () => {
    HubGaPdpBuyFromRetailer();
  };

  addMixFeedingToCart = async () => {
    const btnStatus = this.btnStatus;
    if (!btnStatus) return;
    this.setState({
      mixFeedingBtnLoading: true
    });
    if (this.isLogin) {
      await this.hanldeLoginAddToCart('mixFeedingToCartBtn');
    } else {
      await this.hanldeUnloginAddToCart('mixFeedingToCartBtn');
    }
    this.handleAddMixFeeding();
  };

  handleAddMixFeeding = async () => {
    const { mixFeeding, form, details } = this.state;

    let periodTypeId = parseInt(form.buyWay) ? form.frequencyId : '';
    let goodsInfoFlag =
      form.buyWay && details.promotions?.includes('club') ? 2 : form.buyWay;
    const params = {
      product: Object.assign(mixFeeding, {
        quantity: 1,
        periodTypeId,
        goodsInfoFlag
      }),
      intl: this.props.intl
    };
    this.isLogin
      ? await addToLoginCartData(params)
      : await addToUnloginCartData(params);

    this.setState({
      mixFeedingBtnLoading: false
    });
  };

  getPdpScreenLoadCTAs() {
    const {
      currentSubscriptionStatus,
      currentSubscriptionPrice,
      skuPromotions
    } = this.state;
    let content = ['Single Purchase'];
    if (
      currentSubscriptionStatus &&
      currentSubscriptionPrice &&
      skuPromotions == 'autoship'
    ) {
      content.push('Subscription');
    }
    if (
      currentSubscriptionStatus &&
      currentSubscriptionPrice &&
      skuPromotions == 'club'
    ) {
      content.push('Club');
    }
    return content;
  }

  DailyPortionComponent = (details, barcode) => {
    const { configStore } = this.props;
    let {
      goodsInfos = [],
      goodsAttributesValueRelList = [],
      wsEnergyCategory,
      wsReferenceEnergyValue,
      wsDensity
    } = details;
    let currentGoodsInfo = goodsInfos.find(
      (item) => item.goodsInfoBarcode === barcode
    );
    let isTechnology = ['dry', 'wet'].includes(
      details?.wsTechnologyCode?.toLocaleLowerCase()
    );
    let reg = new RegExp('baby', 'i');
    let LifestagesAttr = goodsAttributesValueRelList
      .filter((item) => item.goodsAttributeName === 'Lifestages')
      ?.map((item) => item?.goodsAttributeValue);

    LifestagesAttr = LifestagesAttr?.filter((item, index) => {
      return LifestagesAttr.indexOf(item) === index;
    });

    let isBaby = LifestagesAttr?.find((item) => reg.test(item));

    let sptGoods = details.goodsType === 0 || details.goodsType === 1;
    let isAdult = LifestagesAttr?.some((item) => {
      let bol = ['adult', 'mature', 'senior'].some((_el) =>
        item.toLowerCase().includes(_el)
      );
      return bol;
    });

    console.log(isAdult, sptGoods, LifestagesAttr, 'isAdult_spt');
    /**
     *  是否显示计算工具
     *  1、dailyPortion show/hide
     *    1.0 Product status show/hide
     *    1.1、liquid products are excluded => wsTechnologyCode
     *    1.2、Bundle products are excluded => goodsInfos - goodsInfoType === 2
     *    1.3  details => wsTechnologyCode wsEnergyCategory wsReferenceEnergyValue
     *    1.4 weShareId === null hide
     **/
    if (!configStore?.info?.dailyPortion) return null;
    if (isBaby) return null;
    if (!isTechnology) return null;
    if (currentGoodsInfo?.goodsInfoType === 2) return null;
    if (details?.goodsType === 3) return null;
    if (!(wsEnergyCategory && wsReferenceEnergyValue)) return null;
    if (!details?.weShareId) return null;
    if (sptGoods && !isAdult) return null;

    // 产品动物的种类
    let speciesValue = goodsAttributesValueRelList.find(
      (item) => item.goodsAttributeName === 'Species'
    )?.goodsAttributeValue;

    let breedAttr = goodsAttributesValueRelList
      ?.filter((item) => item.goodsAttributeName === 'Breeds')
      ?.map((item) => item?.goodsAttributeValue);

    breedAttr = breedAttr.filter((item, index) => {
      return breedAttr.indexOf(item) === index;
    });

    let initBreedValue = '';

    if (
      breedAttr.length === 1 &&
      (breedAttr.includes('Cat_Cat') || breedAttr.includes('Dog_Dog'))
    ) {
      initBreedValue = '';
    } else {
      initBreedValue = breedAttr
        ?.filter((item) => {
          return item !== 'Cat_Cat' && item !== 'Dog_Dog';
        })?.[0]
        ?.split('_')?.[0];
    }

    return (
      <div className="rc-max-width--xl rc-padding-x--sm">
        <DailyPortion
          initBreedValue={initBreedValue}
          speciesValue={speciesValue}
          goodsInfo={currentGoodsInfo}
          details={details}
        />
      </div>
    );
  };

  specAndQuantityDom = () => {
    const {
      configStore: {
        info: { skuLimitThreshold }
      }
    } = this.props;
    const { details, quantity, quantityMinLimit, stock } = this.state;
    return (
      <div className="specAndQuantity rc-margin-bottom--xs ">
        <HandledSpec
          details={details}
          setState={this.setState.bind(this)}
          updatedSku={this.matchGoods.bind(this)}
          updatedPriceOrCode={this.updatedPriceOrCode}
          defaultSkuId={this.state.defaultSkuId}
        />
        <div className="Quantity">
          <span className="amount">
            <FormattedMessage id="amount" />:
          </span>
          <div className="quantity d-flex justify-content-between align-items-center">
            <input
              type="hidden"
              id="invalid-quantity"
              value="Пожалуйста, введите правильный номер."
            />

            <QuantityPicker
              className="rc-quantity"
              initQuantity={parseInt(quantity)}
              min={quantityMinLimit}
              max={skuLimitThreshold.skuMaxNum}
              updateQuantity={(val) => {
                this.setState({ quantity: val }, () =>
                  this.updateInstockStatus()
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  ButtonGroupDom = (showRetailerBtn) => {
    const {
      addToCartLoading,
      form,
      checkOutErrMsg,
      barcode,
      details,
      versionB
    } = this.state;
    const btnStatus = this.btnStatus;
    const vet =
      (window.__.env.REACT_APP_HUB || Uk) &&
      !details.saleableFlag &&
      details.displayFlag;
    const buyFromRetailerConfig = this.buyFromRetailerConfig;
    const isApi =
      buyFromRetailerConfig.retailerEnable &&
      buyFromRetailerConfig.type === 'API';
    const isUrl =
      buyFromRetailerConfig.retailerEnable &&
      buyFromRetailerConfig.type === 'URL';
    const retailerUrl = buyFromRetailerConfig.retailerEnable
      ? buyFromRetailerConfig.url
      : '';
    return (
      <ButtonGroup
        addToCartLoading={addToCartLoading}
        btnStatus={btnStatus}
        form={form}
        isShowRetailerBtn={
          this.retailerBtnStatus && (showRetailerBtn || isMobile)
        }
        checkOutErrMsg={checkOutErrMsg}
        barcode={barcode}
        vet={vet}
        addToCart={this.hanldeAddToCart}
        buyFromRetailer={this.handleBuyFromRetailer}
        isApi={isApi}
        isUrl={isUrl}
        retailerUrl={retailerUrl}
        versionType={versionB}
      />
    );
  };

  switchToVersionB = () => {
    this.setState({ versionB: true });
  };
  render() {
    const { intl } = this.props;
    const {
      goodsId,
      details,
      images,
      quantity,
      stock,
      quantityMinLimit,
      currentUnitPrice,
      currentLinePrice,
      currentSubscriptionPrice,
      currentSubscriptionStatus,
      errMsg,
      form,
      productRate,
      instockStatus,
      backgroundSpaces,
      goodsDetailTab,
      activeTabIdxList,
      checkOutErrMsg,
      breadCrumbs,
      // event,
      eEvents,
      spuImages,
      pageLink,
      goodsType,
      barcode,
      ccidBtnDisplay,
      seoConfig,
      exclusiveFlag,
      loading,
      skuPromotions,
      headingTag = 'h1',
      replyNum,
      mixFeeding,
      fromPrice,
      versionB
    } = this.state;
    const filterImages =
      images?.filter((i) => {
        i.artworkUrl = i.goodsInfoImg;
        return i.goodsInfoImg;
      }) || [];
    let selectedSpecItem = details.sizeList.filter((el) => el.selected)[0];
    const vet =
      (window.__.env.REACT_APP_HUB || Uk) &&
      !details.saleableFlag &&
      details.displayFlag; //vet产品并且是hub的情况下,(uk不管stg还是wedding都用这个逻辑)
    const goodHeading = `<${headingTag || 'h1'}
        class="rc-gamma ui-text-overflow-line2 text-break"
        title="${details.goodsName}">
        ${details.goodsName}
      </${headingTag || 'h1'}>`;
    const buyFromRetailerConfig = this.buyFromRetailerConfig;
    const isApi =
      buyFromRetailerConfig.retailerEnable &&
      buyFromRetailerConfig.type === 'API';
    const isUrl =
      buyFromRetailerConfig.retailerEnable &&
      buyFromRetailerConfig.type === 'URL';
    const retailerUrl = buyFromRetailerConfig.retailerEnable
      ? buyFromRetailerConfig.url
      : '';
    return (
      <div id="Details">
        <GA_Comp props={this.props} details={details} />
        <SeoConfig
          errMsg={errMsg}
          goodsId={goodsId}
          pageLink={pageLink}
          setHeadingTag={(headingTag) => {
            this.setState({ headingTag });
          }}
        />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        {this.state.mixFeedingBtnLoading ? <Loading /> : null}
        {this.state.showErrorTip ? (
          <div className="context-null">
            <div>
              <img src={svg} />
            </div>
            <p
              className="contextp1"
              style={{ color: 'red', fontSize: '25px', fontWeight: 'bold' }}
            >
              <FormattedMessage id="detail.contextp1" />
            </p>
            <p style={{ paddingBottom: '7%' }}>
              <FormattedMessage id="detail.contextp2" />
            </p>
          </div>
        ) : errMsg ? (
          <main className="rc-content--fixed-header">
            <BannerTip />
            <div className="product-detail product-wrapper rc-bg-colour--brand3">
              <div
                className="rc-max-width--xl d-flex"
                style={{ margin: '50px 0' }}
              >
                <div className="ui-font-nothing text-center">
                  <em className="rc-icon rc-incompatible--sm rc-iconography" />
                  {errMsg}
                </div>
              </div>
            </div>
          </main>
        ) : (
          <main className="rc-content--fixed-header ">
            {!!+window.__.env.REACT_APP_SHOWPRESCRIBERCODEMODAL &&
              this.state.showPrescriberCodeModal && (
                <PrescriberCodeModal
                  visible={this.state.showPrescriberCodeModal}
                  close={this.closePrescriberCodeModal}
                />
              )}
            <BannerTip />
            <div className="product-detail product-wrapper rc-bg-colour--brand3">
              <div className="rc-max-width--xl mb-4">
                <BreadCrumbsNavigation list={breadCrumbs} />
                <div className="rc-padding--sm--desktop">
                  <div className="rc-content-h-top">
                    <div className="rc-layout-container rc-six-column">
                      <div className="rc-column rc-double-width carousel-column imageBox">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <div
                            className={`rc-full-width ${
                              this.state.imageMagnifierCfg.show
                                ? 'show-image-magnifier'
                                : ''
                            }`}
                          >
                            <div className="d-flex justify-content-center ui-margin-top-1-md-down">
                              {
                                <div className="details-img-container">
                                  {details.taggingForImageAtPDP ? (
                                    <div className="product-item-flag-image product-item-flag-image__pdp position-absolute">
                                      <LazyLoad>
                                        <img
                                          src={
                                            details.taggingForImageAtPDP
                                              .taggingImgUrl
                                          }
                                          alt="tagging image"
                                        />
                                      </LazyLoad>
                                    </div>
                                  ) : null}
                                  <ImageMagnifier_fr
                                    sizeList={details.sizeList}
                                    video={details.goodsVideo}
                                    images={images}
                                    minImg={details.goodsImg}
                                    maxImg={details.goodsImg}
                                    imgAlt={details?.goodsName}
                                    config={this.state.imageMagnifierCfg.config}
                                    taggingForText={details.taggingForTextAtPDP}
                                    taggingForImage={
                                      details.taggingForImageAtPDP
                                    }
                                    spuImages={
                                      filterImages.length
                                        ? filterImages
                                        : spuImages
                                    }
                                    direction={isMobile ? 'col' : 'row'}
                                  />
                                  {/* {isCountriesContainer([
                                    'fr',
                                    'ru',
                                    'tr',
                                    'us',
                                    'mx',
                                    'uk',
                                    'se',
                                    'de',
                                    'jp'
                                  ]) ? (
                                    <ImageMagnifier_fr
                                      sizeList={details.sizeList}
                                      video={details.goodsVideo}
                                      images={images}
                                      minImg={details.goodsImg}
                                      maxImg={details.goodsImg}
                                      imgAlt={details?.goodsName}
                                      config={
                                        this.state.imageMagnifierCfg.config
                                      }
                                      taggingForText={
                                        details.taggingForTextAtPDP
                                      }
                                      taggingForImage={
                                        details.taggingForImageAtPDP
                                      }
                                      spuImages={
                                        filterImages.length
                                          ? filterImages
                                          : spuImages
                                      }
                                      direction={isMobile ? 'col' : 'row'}
                                    />
                                  ) : (
                                    <ImageMagnifier
                                      sizeList={details.sizeList}
                                      video={details.goodsVideo}
                                      images={images}
                                      minImg={details.goodsImg}
                                      maxImg={details.goodsImg}
                                      config={
                                        this.state.imageMagnifierCfg.config
                                      }
                                      taggingForText={
                                        details.taggingForTextAtPDP
                                      }
                                      taggingForImage={
                                        details.taggingForImageAtPDP
                                      }
                                      spuImages={spuImages}
                                    />
                                  )} */}
                                </div>
                              }
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        className={`rc-column product-column ${
                          !vet && !isMobile ? 'flex' : ''
                        }`}
                      >
                        <div
                          className={`wrap-short-des ${
                            !isMobile &&
                            (versionB
                              ? 'col-md-10 offset-sm-2'
                              : !vet
                              ? 'col-md-7'
                              : '')
                          }`}
                        >
                          {loading ? (
                            <Skeleton />
                          ) : (
                            <>
                              <DetailHeader
                                checkOutErrMsg={checkOutErrMsg}
                                goodHeading={goodHeading}
                                selectedSpecItem={selectedSpecItem}
                                details={details}
                                productRate={productRate}
                                replyNum={replyNum}
                                instockStatus={instockStatus}
                                vet={vet}
                              />
                              {!vet ? (
                                <>
                                  {!isMobile ? this.specAndQuantityDom() : null}
                                  {versionB && (
                                    <PurchaseMethodB
                                      form={form}
                                      fromPrice={fromPrice}
                                      isMobile={isMobile}
                                      specAndQuantityDom={
                                        this.specAndQuantityDom
                                      }
                                      isNullGoodsInfos={this.isNullGoodsInfos}
                                    />
                                  )}
                                  {details.promotions &&
                                  details.promotions.includes('club') ? (
                                    <Ration
                                      goodsNo={details.goodsNo}
                                      setState={this.setState.bind(this)}
                                    />
                                  ) : null}
                                </>
                              ) : null}
                              {versionB &&
                                (!isMobile ? (
                                  <div className="flex flex-row items-center mt-6">
                                    <div>{this.ButtonGroupDom(false)}</div>
                                    <span className="mx-4">
                                      {isApi && isUrl && (
                                        <FormattedMessage id="or" />
                                      )}
                                    </span>
                                    <BuyFromRetailerBtn
                                      // ccidBtnDisplay={ccidBtnDisplay}
                                      barcode={barcode}
                                      goodsType={goodsType}
                                      onClick={this.handleBuyFromRetailer}
                                      isApi={isApi}
                                      isUrl={isUrl}
                                      retailerUrl={retailerUrl}
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className={classNames({
                                      hidden: this.isNullGoodsInfos,
                                      'w-full': isMobile,
                                      'col-md-5': !isMobile
                                    })}
                                  >
                                    {this.ButtonGroupDom(false)}
                                  </div>
                                ))}
                            </>
                          )}
                        </div>
                        {loading ? (
                          <Skeleton />
                        ) : (
                          !versionB &&
                          (vet ? (
                            <div>
                              <h2
                                className="text-break mb-1"
                                style={{ fontSize: '1.17rem' }}
                              >
                                {details?.goodsSubtitle || ''}
                              </h2>
                              <div
                                className="mb-4"
                                dangerouslySetInnerHTML={{
                                  __html: this.state.descContent
                                }}
                              />
                              {/*这种情况时，eancode 在法国固定，其他国家待定  */}
                              {PC && this.retailerBtnStatus ? (
                                <BuyFromRetailerBtn
                                  // ccidBtnDisplay={ccidBtnDisplay}
                                  barcode={barcode}
                                  goodsType={goodsType}
                                  onClick={this.handleBuyFromRetailer}
                                  isApi={isApi}
                                  isUrl={isUrl}
                                  retailerUrl={retailerUrl}
                                />
                              ) : null}
                            </div>
                          ) : (
                            <div
                              className={classNames({
                                hidden: this.isNullGoodsInfos,
                                'w-full': isMobile,
                                'col-md-5': !isMobile
                              })}
                            >
                              {isMobile ? this.specAndQuantityDom() : null}
                              <div
                                className={`${
                                  currentUnitPrice ? '' : 'hidden'
                                }`}
                              >
                                <SingleBuyMethod
                                  configStore={this.props.configStore}
                                  form={form}
                                  skuPromotions={skuPromotions}
                                  selectedSpecItem={selectedSpecItem}
                                  currentUnitPrice={currentUnitPrice}
                                  currentSubscriptionPrice={
                                    currentSubscriptionPrice
                                  }
                                  changeMethod={this.ChangeFormat.bind(this, 0)}
                                  changeFreqency={(data) => {
                                    this.handleSelectedItemChange(data);
                                  }}
                                >
                                  {this.ButtonGroupDom(false)}
                                </SingleBuyMethod>
                                {currentSubscriptionStatus &&
                                currentSubscriptionPrice &&
                                skuPromotions == 'autoship' ? (
                                  <AutoshipBuyMethod
                                    form={form}
                                    configStore={this.props.configStore}
                                    skuPromotions={skuPromotions}
                                    selectedSpecItem={selectedSpecItem}
                                    currentUnitPrice={currentUnitPrice}
                                    currentSubscriptionPrice={
                                      currentSubscriptionPrice
                                    }
                                    changeMethod={this.ChangeFormat.bind(
                                      this,
                                      1
                                    )}
                                    changeFreqency={(data) => {
                                      this.handleSelectedItemChange(data);
                                    }}
                                  >
                                    {this.ButtonGroupDom(false)}
                                  </AutoshipBuyMethod>
                                ) : null}
                                {currentSubscriptionStatus &&
                                currentSubscriptionPrice &&
                                skuPromotions == 'club' ? (
                                  <ClubBuyMethod
                                    configStore={this.props.configStore}
                                    form={form}
                                    skuPromotions={skuPromotions}
                                    selectedSpecItem={selectedSpecItem}
                                    currentUnitPrice={currentUnitPrice}
                                    currentSubscriptionPrice={
                                      currentSubscriptionPrice
                                    }
                                    changeMethod={this.ChangeFormat.bind(
                                      this,
                                      2
                                    )}
                                    changeFreqency={(data) => {
                                      this.handleSelectedItemChange(data);
                                    }}
                                    toClubTab={this.toClubTab}
                                  >
                                    {this.ButtonGroupDom(false)}
                                  </ClubBuyMethod>
                                ) : null}
                                <div
                                  className="mb-2 mr-2 text-right"
                                  style={{ fontSize: '.875rem' }}
                                >
                                  <FormattedMessage
                                    id="pricesIncludeVAT"
                                    values={{
                                      val: <span className="red">*</span>
                                    }}
                                    defaultMessage=" "
                                  />
                                </div>
                              </div>

                              {PC && this.retailerBtnStatus ? (
                                <div className="flex justify-content-center mt-5">
                                  <BuyFromRetailerBtn
                                    // ccidBtnDisplay={ccidBtnDisplay}
                                    barcode={barcode}
                                    goodsType={goodsType}
                                    onClick={this.handleBuyFromRetailer}
                                    isApi={isApi}
                                    isUrl={isUrl}
                                    retailerUrl={retailerUrl}
                                  />
                                </div>
                              ) : null}
                              <ErrMsgForCheckoutPanel
                                checkOutErrMsg={checkOutErrMsg}
                              />
                              {isMobile &&
                              details.promotions &&
                              details.promotions.includes('club') ? (
                                <Ration
                                  goodsNo={details.goodsNo}
                                  setState={this.setState.bind(this)}
                                />
                              ) : null}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Advantage />
            {/* 描述、好处、组成、指南板块*/}
            {details.goodsDescriptionDetailList &&
            details.goodsType !== undefined ? (
              <div id="j-details-description-tabs">
                <GoodsDetailTabs
                  activeTabIdxList={activeTabIdxList}
                  goodsType={details.goodsType}
                  goodsDescriptionDetailList={
                    details.goodsDescriptionDetailList
                  }
                  saleableFlag={details.saleableFlag ?? this.isNullGoodsInfos}
                  displayFlag={details.displayFlag}
                  setState={this.setState.bind(this)}
                  isClub={
                    details.promotions &&
                    details.promotions.includes('club') &&
                    currentSubscriptionStatus
                  }
                  goodsDetailSpace={backgroundSpaces}
                  goodsAttributesValueRelList={
                    details.goodsAttributesValueRelList ?? []
                  }
                />
                <div id="j-details-dailyportion">
                  {this.DailyPortionComponent(details, barcode)}
                </div>
              </div>
            ) : null}
            {!!+window.__.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS &&
              !!details.goodsNo && (
                <BazaarVoiceReviews productId={details.goodsNo} />
              )}

            <div className="split-line rc-bg-colour--brand4" />
            {window.__.env.REACT_APP_HUB && goodsType !== 3 ? (
              <AdvantageTips />
            ) : null}
            {/* 电话邮箱联系板块 */}
            {isHub ? (
              <PhoneAndEmail loading={loading} details={details} />
            ) : null}
            {!!+window.__.env.REACT_APP_PDP_RATING_VISIBLE ? (
              <div id="review-container">
                <Reviews
                  key={this.state.goodsId}
                  id={this.state.goodsId}
                  isLogin={this.isLogin}
                />
              </div>
            ) : null}
            <RelateProductCarousel id={goodsId} />

            {isMobile ? (
              <AddCartSuccessMobile
                visible={this.state.modalMobileCartSuccessVisible}
                closeModal={() => {
                  this.setState({ modalMobileCartSuccessVisible: false });
                }}
                mixFeedingData={this.state.mixFeeding}
                periodTypeId={parseInt(form.buyWay) ? form.frequencyId : ''}
                goodsInfoFlag={
                  form.buyWay && details.promotions?.includes('club')
                    ? 2
                    : form.buyWay
                }
                isLogin={this.isLogin}
                intl={intl}
              />
            ) : null}

            {/* sprint6暂时不上，延迟到sprint7 */}
            {/* {PC && Ru && mixFeeding && !this.state.hiddenMixFeedingBanner ? (
              <MixFeedingBanner
                originalProductInfo={this.state.originalProductInfo}
                mixFeedingByProductInfo={this.state.mixFeedingByProductInfo}
                mixFeedingForm={form}
                addMixFeedingToCart={this.addMixFeedingToCart}
                btnStatus={btnStatus}
                mixFeedingBtnLoading={this.state.mixFeedingBtnLoading}
              />
            ) : null} */}

            {/* 最下方跳转更多板块 rita说现在hub 又不要了 暂时注释吧*/}
            {/* <More/> */}
            <Help />
            <Footer />
          </main>
        )}
      </div>
    );
  }
}

export default Details;
