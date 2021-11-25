import React from 'react';
import Skeleton from '@/components/NormalSkeleton';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
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
import AddCartSuccessMobile from './components/AddCartSuccessMobile';
import BannerTip from '@/components/BannerTip';
import Reviews from './components/Reviews';
import {
  getDeviceType,
  getFrequencyDict,
  queryStoreCateList,
  loadJS,
  getDictionary,
  filterObjectValue,
  isCountriesContainer,
  getClubFlag
} from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import { FormattedMessage, injectIntl } from 'react-intl';
import find from 'lodash/find';
import { getDetails, getLoginDetails, getDetailsBySpuNo } from '@/api/details';
import { sitePurchase } from '@/api/cart';
import RelateProductCarousel from './components/RelateProductCarousel';
import BuyFromRetailerBtn from './components/BuyFromRetailerBtn';
import { tempHubFrRedirect } from '@/redirect/utils';
import svg from './details.svg';

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

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const PC = getDeviceType() === 'PC' || getDeviceType() === 'Pad';
const isHub = window.__.env.REACT_APP_HUB == '1';
const Fr = window.__.env.REACT_APP_COUNTRY === 'fr';
const Ru = window.__.env.REACT_APP_COUNTRY === 'ru';
const Tr = window.__.env.REACT_APP_COUNTRY === 'tr';
const Uk = window.__.env.REACT_APP_COUNTRY === 'uk';

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
      activeTabIdxList: isMobile ? [] : [0],
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
      defaultGoodsInfoFlag: funcUrl({ name: 'goodsInfoFlag' })
    };
    this.hanldeAmountChange = this.hanldeAmountChange.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    this.hanldeAddToCart = this.hanldeAddToCart.bind(this);
    this.ChangeFormat = this.ChangeFormat.bind(this);
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    console.log(this.state.defaultSkuId, 'defaultSkuId');
    const { pathname } = this.props.location;
    let timer = setInterval(() => {
      if (document.querySelector('#mars-footer-panel')) {
        document
          .querySelector('#mars-footer-panel')
          .setAttribute('style', 'padding-bottom: 61px !important');
        clearInterval(timer);
      }
    }, 1000);
    this.getUrlParam();
    const goodsSpuNo =
      pathname.split('-').reverse().length > 1
        ? pathname.split('-').reverse()[0]
        : '';
    this.setState(
      {
        id: this.props.match.params.id,
        goodsNo: goodsSpuNo || '',
        pageLink: this.redirectCanonicalLink({ pageLink: this.state.pageLink })
      },
      () => this.queryDetails()
    );
  }

  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get checkoutStore() {
    return this.props.checkoutStore;
  }
  get btnStatus() {
    const {
      details,
      quantity,
      instockStatus,
      initing,
      loading,
      form
    } = this.state;
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

  get retailerBtnStatus() {
    const { loading, goodsType, exclusiveFlag = false } = this.state;
    const sptGoods = goodsType === 0 || goodsType === 1;
    // const trSpt = Tr && sptGoods;
    let bundle = goodsType && goodsType === 2;

    return (
      !loading &&
      !bundle &&
      isHub &&
      !exclusiveFlag &&
      (Fr || (Tr && !sptGoods))
    );
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
    console.log(purchaseTypeDict, 'purchaseTypeDict...', id);
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
          parseInt(this.state.defaultGoodsInfoFlag) ||
          details.promotions === 'club'
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
      console.log(details, defaultFrequencyId, 'defaultFrequencyId');

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
      goodsNo,
      form
    } = this.state;

    details.sizeList = sizeList;
    let selectedSpecItem = details.sizeList.filter((el) => el.selected)[0];
    if (!selectedSpecItem?.subscriptionStatus && form.buyWay > 0) {
      form.buyWay = -1;
    }
    this.setState(Object.assign({ details, form }, data), () => {
      this.updateInstockStatus();
      setTimeout(() =>
        setGoogleProductStructuredDataMarkup({
          instockStatus,
          details,
          spuImages,
          goodsDetailTab,
          goodsNo
        })
      );
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
    console.info('....', ClubLength);
    this.setState({ activeTabIdxList: [ClubLength] }, () => {
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
        if (goodsRes) {
          const { goods, images } = res.context;
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
              exclusiveFlag: goods.exclusiveFlag
            },
            () => {
              this.handleBreadCrumbsData();
              this.setDefaultPurchaseType({
                id:
                  goodsRes.defaultPurchaseType ||
                  configStore.info?.storeVO?.defaultPurchaseType
              });
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
              images
            },
            async () => {
              // 不可销售，并且展示在前台的商品，获取envCode,去请求cc.js
              const { goods, goodsInfos } = res.context;
              const notSaleGoods =
                window.__.env.REACT_APP_HUB === '1' &&
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
                    this.state.instockStatus
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
            images
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
    const widgetId = window.__.env.REACT_APP_HUBPAGE_RETAILER_WIDGETID;
    const vetWidgetId = window.__.env.REACT_APP_HUBPAGE_RETAILER_WIDGETID_VET;
    const id = goodsType === 3 ? vetWidgetId : widgetId;
    if (widgetId || vetWidgetId) {
      loadJS({
        url: 'https://fi-v2.global.commerce-connector.com/cc.js',
        id: 'cci-widget',
        dataSets: {
          token: '2257decde4d2d64a818fd4cd62349b235d8a74bb',
          locale: window.__.env.REACT_APP_HUBPAGE_RETAILER_LOCALE,
          displaylanguage:
            window.__.env.REACT_APP_HUBPAGE_RETAILER_DISPLAY_LANGUAGE,
          widgetid: id,
          ean: barcode,
          subid: '',
          trackingid: ''
        }
      });
    }
  }
  updateInstockStatus() {
    this.setState({
      instockStatus: this.state.quantity <= this.state.stock
    });
  }
  hanldeAmountChange(type) {
    this.setState({ checkOutErrMsg: '' });
    if (!type) return;
    const { quantity } = this.state;
    let res;
    if (type === 'minus') {
      if (quantity <= 1) {
        res = 1;
      } else {
        res = quantity - 1;
      }
    } else {
      res = (quantity || 0) + 1;
      if (quantity >= window.__.env.REACT_APP_LIMITED_NUM) {
        res = window.__.env.REACT_APP_LIMITED_NUM;
      }
    }
    this.setState(
      {
        quantity: res
      },
      () => {
        this.updateInstockStatus();
      }
    );
  }
  handleAmountInput(e) {
    this.setState({ checkOutErrMsg: '' });
    const { quantityMinLimit } = this.state;
    const val = e.target.value;
    if (val === '') {
      this.setState({ quantity: val });
    } else {
      let tmp = parseInt(val);
      if (isNaN(tmp)) {
        tmp = 1;
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit;
      }
      if (tmp > window.__.env.REACT_APP_LIMITED_NUM) {
        tmp = window.__.env.REACT_APP_LIMITED_NUM;
      }
      this.setState({ quantity: tmp }, () => this.updateInstockStatus());
    }
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
  async hanldeLoginAddToCart() {
    try {
      const {
        configStore,
        checkoutStore,
        history,
        clinicStore,
        headerCartStore
      } = this.props;
      const { quantity, form, details, questionParams } = this.state;

      hubGAAToCar(quantity, form);

      const { sizeList } = details;
      let currentSelectedSize;
      this.setState({ addToCartLoading: true });
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
      await checkoutStore.updateLoginCart();
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
  async hanldeUnloginAddToCart() {
    try {
      this.setState({ addToCartLoading: true });
      const { checkoutStore } = this.props;
      const {
        currentUnitPrice,
        quantity,
        form,
        details,
        questionParams
      } = this.state;
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
        isMobile
      });
      this.setState({ modalMobileCartSuccessVisible: true });
    } catch (err) {
      this.showCheckoutErrMsg(err.message);
    } finally {
      this.setState({ addToCartLoading: false });
    }
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
    dataLayer.push({
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

  render() {
    const { history, location, match, configStore } = this.props;
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
      addToCartLoading,
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
      replyNum
    } = this.state;
    const filterImages =
      images?.filter((i) => {
        i.artworkUrl = i.goodsInfoImg;
        return i.goodsInfoImg;
      }) || [];
    const btnStatus = this.btnStatus;
    let selectedSpecItem = details.sizeList.filter((el) => el.selected)[0];
    const vet =
      (window.__.env.REACT_APP_HUB === '1' || Uk) &&
      !details.saleableFlag &&
      details.displayFlag; //vet产品并且是hub的情况下,(uk不管stg还是wedding都用这个逻辑)
    console.log(
      vet,
      window.__.env.REACT_APP_HUB,
      !details.saleableFlag,
      details.displayFlag,
      'ishubvet'
    );
    const goodHeading = `<${headingTag || 'h1'}
        class="rc-gamma ui-text-overflow-line2 text-break"
        title="${details.goodsName}">
        ${details.goodsName}
      </${headingTag || 'h1'}>`;
    //
    return (
      <div id="Details">
        <GA_Comp details={details} />
        <SeoConfig
          errMsg={errMsg}
          goodsId={goodsId}
          pageLink={pageLink}
          setHeadingTag={(headingTag) => {
            this.setState({ headingTag });
          }}
        />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={location}
          history={history}
          match={match}
        />
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
                    {isMobile && (
                      <DetailHeader
                        checkOutErrMsg={checkOutErrMsg}
                        goodHeading={goodHeading}
                        selectedSpecItem={selectedSpecItem}
                        details={details}
                        productRate={productRate}
                        replyNum={replyNum}
                      />
                    )}
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
                                  {isCountriesContainer([
                                    'fr',
                                    'ru',
                                    'tr',
                                    'us',
                                    'mx',
                                    'uk'
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
                                  )}
                                </div>
                              }
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="rc-column product-column">
                        <div className="wrap-short-des">
                          {!isMobile && (
                            <DetailHeader
                              checkOutErrMsg={checkOutErrMsg}
                              goodHeading={goodHeading}
                              selectedSpecItem={selectedSpecItem}
                              details={details}
                              productRate={productRate}
                              replyNum={replyNum}
                            />
                          )}
                        </div>
                        {loading ? (
                          <Skeleton />
                        ) : vet ? (
                          <div>
                            <div
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
                              />
                            ) : null}
                          </div>
                        ) : (
                          <div>
                            <div className="align-left flex rc-margin-bottom--xs">
                              <p className="rc-margin-right--xs">
                                <InstockStatusComp status={instockStatus} />
                              </p>
                              {Ru && selectedSpecItem ? (
                                <p>Артикул:{selectedSpecItem?.externalSku}</p>
                              ) : null}
                            </div>
                            {details.promotions &&
                            details.promotions.includes('club') ? (
                              <Ration
                                goodsNo={details.goodsNo}
                                setState={this.setState.bind(this)}
                              />
                            ) : null}
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
                                  <div className="rc-quantity text-right d-flex justify-content-end">
                                    <span
                                      className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                                      onClick={() =>
                                        this.hanldeAmountChange('minus')
                                      }
                                    />
                                    <input
                                      className="rc-quantity__input"
                                      id="quantity"
                                      name="quantity"
                                      value={quantity}
                                      min={quantityMinLimit}
                                      max={stock}
                                      onChange={this.handleAmountInput}
                                      maxLength="5"
                                    />
                                    <span
                                      className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                                      onClick={() =>
                                        this.hanldeAmountChange('plus')
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`${currentUnitPrice ? '' : 'hidden'}`}
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
                              />
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
                                  changeMethod={this.ChangeFormat.bind(this, 1)}
                                  changeFreqency={(data) => {
                                    this.handleSelectedItemChange(data);
                                  }}
                                />
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
                                  changeMethod={this.ChangeFormat.bind(this, 2)}
                                  changeFreqency={(data) => {
                                    this.handleSelectedItemChange(data);
                                  }}
                                  toClubTab={this.toClubTab}
                                />
                              ) : null}
                            </div>
                            <ButtonGroup
                              addToCartLoading={addToCartLoading}
                              btnStatus={btnStatus}
                              form={form}
                              isShowRetailerBtn={this.retailerBtnStatus}
                              checkOutErrMsg={checkOutErrMsg}
                              barcode={barcode}
                              vet={vet}
                              addToCart={this.hanldeAddToCart}
                              buyFromRetailer={this.handleBuyFromRetailer}
                            />
                            {form.buyWay === 2 &&
                            window.__.env.REACT_APP_COUNTRY !== 'ru' ? (
                              <p className="text-right medium mr-4">
                                <FormattedMessage id="detail.subscriptionBuyTip" />
                              </p>
                            ) : null}
                          </div>
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
              <GoodsDetailTabs
                activeTabIdxList={activeTabIdxList}
                goodsType={details.goodsType}
                goodsDescriptionDetailList={details.goodsDescriptionDetailList}
                saleableFlag={details.saleableFlag}
                displayFlag={details.displayFlag}
                setState={this.setState.bind(this)}
                isClub={
                  details.promotions && details.promotions.includes('club')
                }
                goodsDetailSpace={backgroundSpaces}
              />
            ) : null}

            {!!+window.__.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS &&
              !!details.goodsNo && (
                <BazaarVoiceReviews productId={details.goodsNo} />
              )}

            <div className="split-line rc-bg-colour--brand4" />
            {window.__.env.REACT_APP_HUB === '1' && goodsType !== 3 ? (
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
              />
            ) : null}

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
