import React from 'react';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import { toJS } from 'mobx';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Selection from '@/components/Selection';
import BreadCrumbsNavigation from '@/components/BreadCrumbsNavigation';
import ImageMagnifier from '@/components/ImageMagnifier';
import ImageMagnifier_fr from './components/ImageMagnifier';
import AddCartSuccessMobile from './components/AddCartSuccessMobile';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import Reviews from './components/Reviews';
import Rate from '@/components/Rate';
import BannerTip from '@/components/BannerTip';
import { clubSubscriptionSavePets } from '@/api/pet';
import {
  formatMoney,
  setSeoConfig,
  getDeviceType,
  getFrequencyDict,
  queryStoreCateList,
  getParaByName,
  loadJS,
  getDictionary,
  unique,
  filterObjectValue,
  isCountriesContainer,
  getRation,
  getClubFlag
} from '@/utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import { getDetails, getLoginDetails, getDetailsBySpuNo } from '@/api/details';
import { sitePurchase } from '@/api/cart';
// import Carousel from './components/Carousel';
import ResponsiveCarousel from '@/components/Carousel';
import BuyFromRetailerBtn from './components/BuyFromRetailerBtn';

import Help from './components/Help';
import { Helmet } from 'react-helmet';

import PaymentSecureHome from '@/assets/images/home/Payment-secure@2x.png';
import premiumHome from '@/assets/images/home/premium@2x.png';
import reimbursedHome from '@/assets/images/home/reimbursed@2x.png';
import shippmentHome from '@/assets/images/home/shippment@2x.png';
import loop from '@/assets/images/loop.png';
import vert from '@/assets/images/vert.png';

import './index.css';
import './index.less';
import { Link } from 'react-router-dom';
import GoodsDetailTabs from '@/components/GoodsDetailTabs';
import { getGoodsRelation } from '@/api/details';
import Loading from '@/components/Loading';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const PC = getDeviceType() === 'PC' || getDeviceType() === 'Pad';
// const pageLink = window.location.href;
function AdvantageTips({ secondIconvisible = true }) {
  return (
    <div className="rc-full-width advantage-tips">
      <div className="experience-component experience-assets-centeredIconList">
        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile centered-icon-list">
          <div className="rc-sm-down">
            <div className="row rc-padding-x--xl--mobile col-10 bottom-content__icon-list mx-auto text-center">
              <div className="col-6 centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={PaymentSecureHome}
                    srcSet={PaymentSecureHome}
                    className="mx-auto"
                    alt="Secure payments"
                    title="Secure payments"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point1" />
                </p>
              </div>
              {secondIconvisible && (
                <div className="col-6 centered-icon-list__icon">
                  <LazyLoad height={200}>
                    <img
                      src={reimbursedHome}
                      srcSet={reimbursedHome}
                      className="mx-auto"
                      alt="Quality assurance"
                      title="Quality assurance"
                    />
                  </LazyLoad>
                  <p className="rc-meta text-center markup-text">
                    <FormattedMessage id="home.point2" />
                  </p>
                </div>
              )}
              <div className="col-6 centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={premiumHome}
                    srcSet={premiumHome}
                    className="mx-auto"
                    alt="Premium service"
                    title="Premium service"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point3" />
                </p>
              </div>
              <div className="col-6 centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={shippmentHome}
                    srcSet={shippmentHome}
                    className="mx-auto"
                    alt="Fast shipping"
                    title="Fast shipping"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point4" />
                </p>
              </div>
            </div>
          </div>
          <div className="rc-sm-up">
            <div className="d-flex justify-content-center bottom-content__icon-list text-center">
              <div className="centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={PaymentSecureHome}
                    srcSet={PaymentSecureHome}
                    className="mx-auto"
                    alt="Secure payments"
                    title="Secure payments"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point1" />
                </p>
              </div>
              {secondIconvisible && (
                <div className="centered-icon-list__icon">
                  <LazyLoad height={200}>
                    <img
                      src={reimbursedHome}
                      srcSet={reimbursedHome}
                      className="mx-auto"
                      alt="Quality assurance"
                      title="Quality assurance"
                    />
                  </LazyLoad>
                  <p className="rc-meta text-center markup-text">
                    <FormattedMessage id="home.point2" />
                  </p>
                </div>
              )}
              <div className="centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={premiumHome}
                    srcSet={premiumHome}
                    className="mx-auto"
                    alt="Premium service"
                    title="Premium service"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point3" />
                </p>
              </div>
              <div className="centered-icon-list__icon">
                <LazyLoad height={200}>
                  <img
                    src={shippmentHome}
                    srcSet={shippmentHome}
                    className="mx-auto"
                    alt="Fast shipping"
                    title="Fast shipping"
                  />
                </LazyLoad>
                <p className="rc-meta text-center markup-text">
                  <FormattedMessage id="home.point4" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Advantage() {
  const defaultIconList = [
    {
      icon: <span className="rc-icon rc-vet--sm rc-brand1 rc-iconography" />,
      text:
        'Access to Royal Canin Pet Advisor Live to answer all your pet questions'
    },
    {
      icon: (
        <span className="rc-icon rc-delivery--sm rc-brand1 rc-iconography" />
      ),
      text: 'Free shipping and 5% off every autoship order'
    },
    {
      icon: <span className="rc-icon rc-food--sm rc-brand1 rc-iconography" />,
      text: 'Personalized product recommendations'
    }
  ];
  const iconList = { en: defaultIconList }[process.env.REACT_APP_LANG] || [];
  return iconList.length > 0 ? (
    <div className="rc-bg-colour--brand4">
      <div className="reassurance-banner rc-max-width--xl rc-padding-x--sm rc-margin-bottom--sm">
        <div className="rc-layout-container rc-four-column rc-text--center rc-content-h-middle">
          {iconList.map((ele, i) => (
            <div className="rc-column rc-padding-y--xs" key={i}>
              <div className="reassurance-banner__item rc-text--left">
                <span className="rc-header-with-icon rc-header-with-icon--gamma">
                  {ele.icon}
                  {ele.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}

function ErrMsgForCheckoutPanel({ checkOutErrMsg }) {
  return (
    <div className={`text-break mt-2 mb-2 ${checkOutErrMsg ? '' : 'hidden'}`}>
      <aside
        className="rc-alert rc-alert--error rc-alert--with-close"
        role="alert"
      >
        <span className="pl-0">{checkOutErrMsg}</span>
      </aside>
    </div>
  );
}

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
      GAListParam: '',
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
      tradePrice: '',
      specList: [],
      tabsValue: [],
      isAdd: 0,
      productRate: 0,
      replyNum: 0,
      goodsId: null,
      minMarketPrice: 0,
      minSubscriptionPrice: 0,
      toolTipVisible: false,
      relatedProduct: [],
      form: {
        buyWay: 1, //-1-None 0-One-off purchase 1-Subscription 2-Club
        frequencyVal: '',
        frequencyName: '',
        frequencyId: -1
      },
      frequencyList: [],
      reviewShow: false,
      goodsNo: '', // SPU
      breadCrumbs: [],
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin',
        headingTag: 'h1'
      },
      spuImages: [],
      requestJson: {}, //地址请求参数JSON eg:{utm_campaign: "shelter108782",utm_medium: "leaflet",utm_source: "vanityURL"}
      pageLink: '',
      purchaseTypeDict: [],
      barcode: '',
      descContent: '',
      contactUs: '',
      contactPhoneNumber: '',
      ccidBtnDisplay: false,
      relatedGoods: [],
      relatedGoodsList: [],
      relatedGoodsLoading: false,
      rationInfo: {},
      isFromPR: false,
      questionParams: undefined
    };
    this.hanldeAmountChange = this.hanldeAmountChange.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    this.handleChooseSize = this.handleChooseSize.bind(this);
    this.hanldeAddToCart = this.hanldeAddToCart.bind(this);
    this.ChangeFormat = this.ChangeFormat.bind(this);
    this.hubGA = process.env.REACT_APP_HUB_GA == '1';
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    const { pathname, state } = this.props.location;
    this.getUrlParam();
    if (state) {
      if (!!state.GAListParam) {
        this.setState({ GAListParam: state.GAListParam });
      }
    }
    const goodsSpuNo =
      pathname.split('-').reverse().length > 1
        ? pathname.split('-').reverse()[0]
        : '';
    this.setState(
      {
        id: this.props.match.params.id,
        goodsNo: goodsSpuNo || ''
      },
      () => this.queryDetails()
    );

    const Fr = process.env.REACT_APP_LANG === 'fr';
    const Ru = process.env.REACT_APP_LANG === 'ru';
    const Tr = process.env.REACT_APP_LANG === 'tr';
    let contactUs = `mailto:${this.props.configStore.storeContactEmail}`;
    let contactPhoneNumber = `tel:${this.props.configStore.storeContactPhoneNumber}`;
    if (Fr) {
      contactUs = 'https://www.royalcanin.com/fr/contact-us';
    } else if (Tr) {
      contactUs = 'mailto:opsroyalcanin@tr.webhelp.com'; //邮箱以后不要再代码里面修改了 可以直接在storePortal配置的哦
      contactPhoneNumber = 'https://www.royalcanin.com/tr/contact-us';
    } else if (Ru) {
      contactUs = 'mailto:contact.ru@royalcanin.com';
    }

    this.setState({
      contactUs,
      contactPhoneNumber
    });
  }

  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get checkoutStore() {
    return this.props.checkoutStore;
  }
  get computedList() {
    return this.state.frequencyList.map((ele) => {
      delete ele.value;
      return {
        value: ele.id,
        ...ele
      };
    });
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
    let addedFlag = 1;
    if (details.sizeList.length) {
      addedFlag = details.sizeList.filter((el) => el.selected)[0]?.addedFlag;
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
      form.buyWay !== -1
    );
  }

  setDefaultPurchaseType({ id }) {
    const { promotions, details } = this.state;
    const targetDefaultPurchaseTypeItem = this.state.purchaseTypeDict.filter(
      (ele) => ele.id && id && ele.id + '' === id + ''
    )[0];
    if (targetDefaultPurchaseTypeItem) {
      let buyWay = 0;
      let defaultPurchaseType = {
        None: -1,
        Subscription: 1,
        'One-off purchase': 0
      }[targetDefaultPurchaseTypeItem.valueEn];
      if (
        defaultPurchaseType === 1 ||
        sessionItemRoyal.get('pf-result') ||
        localStorage.getItem('pfls')
      ) {
        buyWay = details.promotions === 'club' ? 2 : 1;
      } else {
        buyWay = defaultPurchaseType;
      }
      this.setState({
        form: Object.assign(this.state.form, {
          buyWay
        })
      });
    }
  }

  //天-0周  周-value*1 月-value*4
  getComputedWeeks(frequencyList) {
    let calculatedWeeks = {};

    frequencyList.forEach((item) => {
      switch (item.type) {
        case 'Frequency_day':
          calculatedWeeks[item.id] = 0;
          break;
        case 'Frequency_week':
          calculatedWeeks[item.id] = item.valueEn * 1;
          break;
        case 'Frequency_month':
          calculatedWeeks[item.id] = item.valueEn * 4;
          break;
      }
    });
    this.setState({
      calculatedWeeks
    });
  }

  getUrlParam() {
    const { search } = this.props.history.location;
    const utmSource = getParaByName(search, 'utm_source');
    const utmMedium = getParaByName(search, 'utm_medium');
    const utmCampaign = getParaByName(search, 'utm_campaign');
    const prefixFn = getParaByName(search, 'prefn1');
    const prefixBreed = getParaByName(search, 'prefv1');
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
  bundleMatchGoods() {
    let {
      details,
      currentUnitPrice,
      currentSubscriptionPrice,
      currentSubscriptionStatus,
      stock,
      skuPromotions
    } = this.state;
    currentUnitPrice = details.goodsInfos[0].salePrice;
    currentSubscriptionPrice = details.goodsInfos[0].subscriptionPrice;
    currentSubscriptionStatus = details.goodsInfos[0].subscriptionStatus;
    skuPromotions = details.goodsInfos[0].promotions;
    stock = details.goodsInfos[0].stock;
    details.sizeList[0].selected = true;
    this.setState(
      {
        details,
        currentUnitPrice,
        currentSubscriptionPrice,
        currentSubscriptionStatus,
        stock,
        skuPromotions
      },
      () => {
        this.updateInstockStatus();
        setTimeout(() => this.setGoogleProductStructuredDataMarkup());
      }
    );
  }
  setGoogleProductStructuredDataMarkup() {
    const {
      instockStatus,
      details,
      spuImages,
      goodsDetailTab,
      goodsNo
    } = this.state;
    loadJS({
      code: JSON.stringify({
        '@context': 'http://schema.org/',
        '@type': 'Product',
        name: details.goodsName,
        description: goodsDetailTab[0] && goodsDetailTab[0].content,
        mpn: goodsNo,
        sku: goodsNo,
        image: spuImages.map((s) => s.artworkUrl),
        offers: {
          url: {},
          '@type': 'AggregateOffer',
          priceCurrency: process.env.REACT_APP_CURRENCY,
          availability: instockStatus
            ? 'http://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          lowPrice: details.fromPrice,
          highPrice: details.toPrice || details.fromPrice
        }
      }),
      type: 'application/ld+json'
    });
  }
  matchGoods() {
    let {
      specList,
      details,
      currentUnitPrice,
      currentLinePrice,
      currentSubscriptionPrice,
      currentSubscriptionStatus,
      stock,
      form
    } = this.state;
    let selectedArr = [];
    let idArr = [];
    let skuPromotions = '';
    specList.map((el) => {
      if (el.chidren.filter((item) => item.selected).length) {
        selectedArr.push(el.chidren.filter((item) => item.selected)[0]);
      }
      return el;
    });
    selectedArr = selectedArr.sort((a, b) => a.specDetailId - b.specDetailId);
    idArr = selectedArr.map((el) => el.specDetailId);
    //marketprice需要取sku的（goodsinfo是sku），不然有时候spu（goods里面）会没值
    currentUnitPrice = details?.goodsInfos?.[0]?.marketPrice;
    console.log(details, 'item---');
    details.sizeList.map((item, i) => {
      let specTextArr = [];
      for (let specItem of specList) {
        for (let specDetailItem of specItem.chidren) {
          if (
            item.mockSpecIds.includes(specDetailItem.specId) &&
            item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
          ) {
            specTextArr.push(specDetailItem.detailName);
          }
        }
      }
      item.specText = specTextArr.join(' ');
      console.log(
        item,
        'item---',
        unique(item.mockSpecDetailIds).sort().join(',') === idArr.join(',')
      );
      if (unique(item.mockSpecDetailIds).sort().join(',') === idArr.join(',')) {
        item.selected = true;
        currentUnitPrice = item.salePrice;
        currentLinePrice = item.linePrice;
        currentSubscriptionPrice = item.subscriptionPrice;
        currentSubscriptionStatus = item.subscriptionStatus; //subscriptionStatus 是否订阅商品
        stock = item.stock;
        skuPromotions = item.promotions;
      } else {
        item.selected = false;
      }

      return item;
    });
    skuPromotions == 'club' ? (form.buyWay = 2) : (form.buyWay = 1);
    this.setState(
      {
        details,
        currentUnitPrice,
        currentLinePrice,
        currentSubscriptionPrice,
        currentSubscriptionStatus,
        stock,
        skuPromotions,
        form
      },
      () => {
        this.updateInstockStatus();
        setTimeout(() => this.setGoogleProductStructuredDataMarkup());
      }
    );
  }
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
  async getRelatedGoodsList(id) {
    try {
      //this.setState({relatedGoodsLoading:true})
      const res = await getGoodsRelation(id);
      this.setState({
        relatedGoodsList: res.context.goods
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      //this.setState({relatedGoodsLoading:false})
    }
  }
  async queryDetails() {
    const { configStore, checkoutStore } = this.props;
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

    let petsRes = {};
    let pf_params = {};
    if (localStorage.getItem('pfls') && getClubFlag()) {
      pf_params = JSON.parse(localStorage.getItem('pfls')).lastQuery;
      let rationRes = await getRation(
        Object.assign(
          {
            spuNoList: [goodsNo]
          },
          pf_params
        )
      );
      this.setState({
        questionParams: JSON.stringify(pf_params),
        isFromPR: true
      });
      if (rationRes.code === 'K-000000') {
        this.setState({
          rationInfo: rationRes.context.rationResponseItems[0]
        });
      }
    } else if (sessionItemRoyal.get('pf-result') && getClubFlag()) {
      pf_params = JSON.parse(sessionItemRoyal.get('pf-result')).queryParams;
      let rationRes = await getRation(
        Object.assign(
          {
            spuNoList: [goodsNo]
          },
          pf_params
        )
      );
      this.setState({
        questionParams: JSON.stringify(pf_params),
        isFromPR: true
      });
      if (rationRes.code === 'K-000000') {
        this.setState({
          rationInfo: rationRes.context.rationResponseItems[0]
        });
      }
    }

    // 对比productFinder 之前信息
    // let savePetFlag = false;
    // let isMyProductFinder = true;
    // let isFromPR = true;
    // if (localStorage.getItem('pfls')) {
    //   if (
    //     localStorage.getItem('pfls') &&
    //     localStorage.getItem('pfls') !== localStorage.getItem('pfls-before')
    //   ) {
    //     savePetFlag = true;
    //   } else {
    //     savePetFlag = false;
    //   }
    //   isMyProductFinder = false;
    // } else if (sessionItemRoyal.get('pf-result')) {
    //   if (
    //     sessionItemRoyal.get('pf-result') &&
    //     sessionItemRoyal.get('pf-result') !==
    //       sessionItemRoyal.get('pf-result-before')
    //   ) {
    //     savePetFlag = true;
    //   } else {
    //     savePetFlag = false;
    //   }
    //   isMyProductFinder = true;
    // } else {
    //   isFromPR = false;
    // }
    // this.setState({ isFromPR });
    // if (isFromPR) {
    //   if (localStorage.getItem('pfls')) {
    //     localStorage.setItem('pfls-before', localStorage.getItem('pfls'));
    //   }
    //   if (sessionItemRoyal.get('pf-result')) {
    //     sessionItemRoyal.set(
    //       'pf-result-before',
    //       sessionItemRoyal.get('pf-result')
    //     );
    //   }
    //   let pf_params = {};
    //   if (!isMyProductFinder) {
    //     pf_params = JSON.parse(localStorage.getItem('pfls')).lastQuery;
    //     pf_params.age = '' + pf_params.age;
    //   } else {
    //     pf_params = JSON.parse(sessionItemRoyal.get('pf-result')).queryParams;
    //   }

    //   if (this.isLogin && savePetFlag) {
    //     try {
    //       petsRes = await clubSubscriptionSavePets({
    //         questionParams: pf_params
    //       });
    //       let petsInfo = petsRes.context;
    //       this.props.checkoutStore.setPetInfo(petsRes.context);
    //     } catch (err) {
    //       console.log(err, 'error111');
    //     }
    //   }
    //   let rationRes = await getRation(
    //     Object.assign(
    //       {
    //         spuNoList: [goodsNo]
    //       },
    //       pf_params
    //     )
    //   );
    //   if (rationRes.code === 'K-000000') {
    //     this.setState({
    //       rationInfo: rationRes.context.rationResponseItems[0]
    //     });
    //   }
    // }

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
        let autoshipDictRes = frequencyDictRes.filter(
          (el) => el.goodsInfoFlag === 1
        );
        let clubDictRes = frequencyDictRes.filter(
          (el) => el.goodsInfoFlag === 2
        );
        const purchaseTypeDictRes = resList[2];
        const goodsRes = res && res.context && res.context.goods;
        let defaultFrequencyId = 0;
        console.log(goodsRes, toJS(configStore), 'goodsRes');
        if (goodsRes?.promotions === 'club') {
          defaultFrequencyId =
            goodsRes?.defaultFrequencyId ||
            configStore.info?.storeVO?.defaultSubscriptionClubFrequencyId ||
            (clubDictRes[0] && clubDictRes[0].id) ||
            '';
        } else {
          defaultFrequencyId =
            goodsRes?.defaultFrequencyId ||
            configStore?.info?.storeVO?.defaultSubscriptionFrequencyId ||
            (autoshipDictRes[0] && autoshipDictRes[0].id) ||
            '';
        }
        console.log(defaultFrequencyId, 'defaultFrequencyId');
        this.setState(
          {
            purchaseTypeDict: purchaseTypeDictRes,
            frequencyList: frequencyDictRes,
            form: Object.assign(this.state.form, {
              frequencyId: defaultFrequencyId
            })
          },
          () => {
            this.hubGA && this.getComputedWeeks(this.state.frequencyList);
          }
        );
        if (res && res.context && goodsRes) {
          this.setState({
            productRate: res.context.avgEvaluate
          });
        }
        if (goodsRes) {
          const { goods, taggingList, images } = res.context;
          let pageLink = window.location.href.split('-');
          pageLink.splice(pageLink.length - 1, 1);
          pageLink = pageLink.concat(goodsRes.goodsNo).join('-');
          //获取推荐产品start
          this.getRelatedGoodsList(goodsRes.goodsId);
          //获取推荐产品end
          this.setState(
            {
              productRate: goodsRes.avgEvaluate,
              replyNum: goodsRes.goodsEvaluateNum,
              goodsId: goodsRes.goodsId,
              minMarketPrice: goodsRes.minMarketPrice,
              minSubscriptionPrice: goodsRes.minSubscriptionPrice,
              details: Object.assign(this.state.details, {
                promotions: goods?.promotions?.toLowerCase(),
                taggingForTextAtPDP: (taggingList || []).filter(
                  (e) => e.taggingType === 'Text' && e.showPage?.includes('PDP')
                )[0],
                taggingForImageAtPDP: (taggingList || []).filter(
                  (e) =>
                    e.taggingType === 'Image' && e.showPage?.includes('PDP')
                )[0],
                taggingForTextAtCart: (taggingList || []).filter(
                  (e) =>
                    e.taggingType === 'Text' &&
                    e.showPage?.includes('Shopping cart page')
                )[0],
                taggingForImageAtCart: (taggingList || []).filter(
                  (e) =>
                    e.taggingType === 'Image' &&
                    e.showPage?.includes('Shopping cart page')
                )[0],
                fromPrice: res.context.fromPrice,
                toPrice: res.context.toPrice,
                goodsDescriptionDetailList:
                  res.context.goodsDescriptionDetailList
              }),
              spuImages: images,
              breadCrumbs: [{ name: goodsRes.goodsName }],
              pageLink,
              goodsType: goods.goodsType,
              exclusiveFlag: goods.exclusiveFlag
            },
            () => {
              // 面包屑展示规则
              // 1 正向流程，使用history
              // 2 逆向流程，进行分类匹配【从sales catogery(home page)中，至少匹配一个进行展示】
              const { state } = this.props.location;
              const { breadCrumbs } = this.state;
              const cateNameInfos = res.context.storeCates || [];

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

              this.setDefaultPurchaseType({
                id:
                  goodsRes.defaultPurchaseType ||
                  configStore.info?.storeVO?.defaultPurchaseType
              });

              this.loadWidgetIdBtn();
            }
          );
          if (goodsRes.defaultFrequencyId) {
            this.setState({
              form: Object.assign(this.state.form, {
                frequencyId: goodsRes.defaultFrequencyId
              })
            });
          }

          setSeoConfig({
            goodsId: goodsRes.goodsId,
            categoryId: '',
            pageName: 'Product Detail Page'
          }).then((res) => {
            this.setState({ seoConfig: res });
          });
        } else {
          throw new Error();
        }
        let sizeList = [];
        let goodsInfos = res.context.goodsInfos || [];
        let isSkuNoQuery = res.context.isSkuNoQuery;
        let choosedSpecsArr = [];
        if (isSkuNoQuery) {
          // 通过sku查询
          let specsItem = goodsInfos.filter(
            (item) => item.goodsInfoNo == this.state.goodsNo
          );
          choosedSpecsArr =
            specsItem && specsItem[0] && specsItem[0].mockSpecDetailIds;
        }
        if (res && res.context && res.context.goodsSpecDetails) {
          let specList = res.context.goodsSpecs;
          let specDetailList = res.context.goodsSpecDetails;
          specList.map((sItem, index) => {
            sItem.chidren = specDetailList.filter((sdItem, i) => {
              if (index === 0) {
                let filterproducts = goodsInfos.filter((goodEl) =>
                  goodEl.mockSpecDetailIds.includes(sdItem.specDetailId)
                );
                sdItem.goodsInfoUnit = filterproducts?.[0]?.goodsInfoUnit;
                sdItem.isEmpty = filterproducts.every(
                  (item) => item.stock === 0
                );
                // filterproduct.goodsInfoWeight = parseFloat(sdItem.detailName)
              }
              return sdItem.specId === sItem.specId;
            });
            let defaultSelcetdSku = -1;
            if (choosedSpecsArr.length) {
              for (let i = 0; i < choosedSpecsArr.length; i++) {
                let specDetailIndex = sItem.specDetailIds.indexOf(
                  choosedSpecsArr[i]
                );
                if (specDetailIndex > -1) {
                  defaultSelcetdSku = specDetailIndex;
                }
              }
            }
            if (defaultSelcetdSku > -1) {
              // 默认选择该sku
              if (!sItem.chidren[defaultSelcetdSku].isEmpty) {
                // 如果是sku进来的，需要默认当前sku被选择
                sItem.chidren[defaultSelcetdSku].selected = true;
              }
            } else {
              if (
                process.env.REACT_APP_LANG === 'de' &&
                sItem.chidren.length > 1 &&
                !sItem.chidren[1].isEmpty
              ) {
                sItem.chidren[1].selected = true;
              } else if (
                sItem.chidren.length > 1 &&
                !sItem.chidren[1].isEmpty
              ) {
                sItem.chidren[1].selected = true;
              } else {
                for (let i = 0; i < sItem.chidren.length; i++) {
                  if (sItem.chidren[i].isEmpty) {
                  } else {
                    sItem.chidren[i].selected = true;
                    break;
                  }
                }
                // 如果所有sku都没有库存 取第一个规格
                if (sItem.chidren.filter((el) => el.selected).length === 0) {
                  sItem.chidren[0].selected = true;
                }
              }
            }

            return sItem;
          });
          // this.setState({ specList });
          sizeList = goodsInfos.map((g, i) => {
            // g = Object.assign({}, g, { selected: false });
            g = Object.assign({}, g, {
              selected: i === 0,
              petsId: checkoutStore.pr_petsInfo.petsId,
              petsType: checkoutStore.pr_petsInfo.petsType
            });
            let { form } = this.state;
            if (g.selected && !g.subscriptionStatus) {
              form.buyWay = 0;
            }
            if (g.selected && g.subscriptionStatus) {
              form.buyWay =
                form.buyWay && res.context?.goods.promotions?.includes('club')
                  ? 2
                  : form.buyWay;
            }
            this.setState({ form });

            return g;
          });

          const goodSize = specList.map((item) =>
            item.chidren.find((good) => good.selected)
          )?.[0]?.detailName;
          const selectGoodSize = specList.map((item) =>
            item.chidren.find((good) => good.selected)
          )?.[0]?.detailName;
          const selectPrice = goodsInfos.find(
            (item) => item.packSize == selectGoodSize
          )?.marketPrice;
          const goodsInfoBarcode =
            goodsInfos.find((item) => item.packSize === goodSize)
              ?.goodsInfoBarcode || goodsInfos?.[0]?.goodsInfoBarcode;
          const barcode = goodsInfoBarcode ? goodsInfoBarcode : '12'; //暂时临时填充一个code,因为没有值，按钮将不会显示，后期也许产品会干掉没有code的时候不展示吧==

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
              images,
              specList,
              barcode
            },
            () => {
              this.matchGoods();
              //Product Detail Page view 埋点start
              this.hubGA
                ? this.hubGAProductDetailPageView(
                    res.context.goodsAttributesValueRelList,
                    this.state.details,
                    selectPrice
                  )
                : this.GAProductDetailPageView(this.state.details);
              //Product Detail Page view 埋点end
            }
          );
        } else {
          let sizeList = [];
          let goodsInfos = res.context.goodsInfos || [];
          sizeList = goodsInfos.map((g, i) => {
            g = Object.assign({}, g, {
              selected: i === 0,
              petsId: checkoutStore.pr_petsInfo.petsId,
              petsType: checkoutStore.pr_petsInfo.petsType
            });
            if (g.selected && !g.subscriptionStatus) {
              let { form } = this.state;
              form.buyWay = 0;
              this.setState({ form });
            }
            return g;
          });

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
            () => {
              this.bundleMatchGoods();
              //Product Detail Page view 埋点start
              this.hubGA
                ? this.hubGAProductDetailPageView(
                    res.context.goodsAttributesValueRelList,
                    this.state.details
                  )
                : this.GAProductDetailPageView(this.state.details);
              //Product Detail Page view 埋点end
            }
          );
          // 没有规格的情况
          // this.setState({
          //   errMsg: <FormattedMessage id="details.errMsg" />
          // });
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

  loadWidgetIdBtn() {
    const { goodsType } = this.state;
    console.log(goodsType, 'goodsTypegoodsType');

    const widgetId = process.env.REACT_APP_HUBPAGE_RETAILER_WIDGETID;
    const vetWidgetId = process.env.REACT_APP_HUBPAGE_RETAILER_WIDGETID_VET;
    const id = goodsType === 3 ? vetWidgetId : widgetId;
    if (widgetId || vetWidgetId) {
      loadJS({
        url: 'https://fi-v2.global.commerce-connector.com/cc.js',
        id: 'cci-widget',
        dataSets: {
          token: '2257decde4d2d64a818fd4cd62349b235d8a74bb',
          locale: process.env.REACT_APP_HUBPAGE_RETAILER_LOCALE,
          displaylanguage:
            process.env.REACT_APP_HUBPAGE_RETAILER_DISPLAY_LANGUAGE,
          widgetid: id,
          ean: '3182550784436',
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
      if (quantity >= process.env.REACT_APP_LIMITED_NUM) {
        res = process.env.REACT_APP_LIMITED_NUM;
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
      if (tmp > process.env.REACT_APP_LIMITED_NUM) {
        tmp = process.env.REACT_APP_LIMITED_NUM;
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
  handleChooseSize(sId, sdId, isSelected) {
    if (isSelected) {
      return;
    }
    let { specList, images } = this.state;
    specList
      .filter((item) => item.specId === sId)[0]
      .chidren.map((item) => {
        if (item.specDetailId === sdId) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });
    const goodSize = specList.map((item) =>
      item.chidren.find((good) => good.specDetailId === sdId)
    )?.[0]?.detailName;
    const barcode = images.find((item) => item.packSize === goodSize)
      ?.goodsInfoBarcode;
    this.setState(
      {
        specList,
        barcode
      },
      () => {
        this.matchGoods();
      }
    );
  }
  async hanldeAddToCart() {
    try {
      if (!this.btnStatus) return false;
      this.setState({ checkOutErrMsg: '' });
      if (this.isLogin) {
        this.hanldeLoginAddToCart();
      } else {
        await this.hanldeUnloginAddToCart();
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

      this.hubGA
        ? this.hubGAAToCar(quantity, details)
        : this.GAAddToCar(quantity, details);

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
        questionParams
      };
      if (buyWay) {
        param.periodTypeId = form.frequencyId;
      }

      if (Object.keys(this.state.requestJson).length > 0) {
        param = { ...param, ...this.state.requestJson };
      }
      await sitePurchase(param);
      await checkoutStore.updateLoginCart();
      if (isMobile) {
        this.refs.mobileSuccessModalButton.click();
      } else {
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
      this.hubGA && this.hubGAAToCar(quantity, details);
      let cartItem = Object.assign({}, details, {
        selected: true,
        goodsInfoFlag: parseInt(form.buyWay),
        periodTypeId: parseInt(form.buyWay) ? form.frequencyId : '',
        quantity,
        questionParams
      });
      //requestJson是shelter和breeder产品的参数，有就加上
      if (Object.keys(this.state.requestJson).length > 0) {
        cartItem = { ...cartItem, ...this.state.requestJson };
      }
      await checkoutStore.hanldeUnloginAddToCart({
        valid: this.btnStatus,
        cartItemList: [cartItem],
        currentUnitPrice,
        mobileSuccessModalButton: this.refs.mobileSuccessModalButton,
        isMobile
      });
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
  handleAClick() {
    if (this.state.replyNum > 0) {
      let el = document.getElementById('review-container');
      let length = this.getElementToPageTop(el);
      window.scrollTo({
        top: length - 80,
        behavior: 'smooth'
      });
    }
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
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
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComAddToBasket`,
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

  //hub加入购物车，埋点
  hubGAAToCar(num, item) {
    dataLayer.push({
      event: 'pdpAddToCart',
      pdpAddToCartQuantity: this.state.quantity,
      pdpAddToCartCtA: { 0: 'One-Shot', 2: 'Subscription' }[
        this.state.form.buyWay
      ]
    });
  }

  //零售商购物 埋点
  handleBuyFromRetailer = () => {
    this.hubGA &&
      dataLayer.push({
        event: 'pdpBuyFromRetailer'
      });
  };

  //商品详情页 埋点
  GAProductDetailPageView(item) {
    const eEvents = {
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComProductView`,
      ecommerce: {
        currencyCode: process.env.REACT_APP_GA_CURRENCY_CODE,
        detail: {
          actionField: {
            list: this.state.GAListParam //list's name where the product was clicked from (Catalogue, Homepage, Search Results)
          },
          products: [
            {
              id: item.goodsNo, //?goodsId客户反馈不对，id这里为空
              name: item.goodsName,
              price: item.minMarketPrice,
              brand: item.brandName || 'ROYAL CANIN',
              club: 'no',
              category: item.goodsCateName,
              variant:
                item.goodsSpecDetails &&
                item.goodsSpecDetails[0] &&
                parseInt(item.goodsSpecDetails[0].detailName),
              sku: item.goodsInfos.length && item.goodsInfos[0].goodsInfoNo
            }
          ]
        }
      }
    };
    this.setState({ eEvents });
  }

  //hub商品详情页 埋点
  hubGAProductDetailPageView(goodsAttributesValueRelList, item, selectPrice) {
    const {
      cateId,
      minMarketPrice,
      goodsCateName,
      goodsName,
      goodsInfos,
      goodsNo
    } = item;
    const cateName = goodsCateName?.split('/') || '';
    const SKU = goodsInfos?.[0]?.goodsInfoNo || '';
    const size =
      item?.sizeList.length &&
      item?.sizeList
        .filter((item) => item.selected)
        .map((selectItem) => selectItem.specText)
        .toString();
    const breed = goodsAttributesValueRelList
      .filter(
        (attr) =>
          attr.goodsAttributeName &&
          attr.goodsAttributeName.toLowerCase() == 'breeds'
      )
      .map((item) => item.goodsAttributeValue);
    const specie = breed.toString().indexOf('Cat') > -1 ? 'Cat' : 'Dog';
    const recommendationID = this.props.clinicStore?.linkClinicId || '';

    const GAProductsInfo = {
      price: selectPrice || minMarketPrice,
      specie,
      range: cateName?.[1] || '',
      name: goodsName,
      mainItemCode: goodsNo,
      SKU,
      recommendationID,
      technology: cateName?.[2] || '',
      brand: 'Royal Canin',
      size,
      breed
    };
    const product = filterObjectValue(GAProductsInfo);
    if (window.dataLayer) {
      dataLayer.push({
        products: [product]
      });
      dataLayer.push({
        event: 'pdpScreenLoad'
      });
    }
    this.setState({
      breed,
      specie
    });
  }

  ccidBtnRef(el) {
    const self = this;
    const nodeBtn = document.querySelector('.other-buy-btn');
    if (el && nodeBtn) {
      const config = { attributes: true, childList: true, subtree: true };
      // 当观察到变动时执行的回调函数
      const callback = function (mutationsList, observer) {
        let eanDoms = document.querySelectorAll('.eanIcon');
        eanDoms[0].parentElement.addEventListener(
          'click',
          function () {
            eanDoms[0].nextElementSibling.click();
          },
          false
        );

        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            self.setState({
              ccidBtnDisplay: true
            });
            observer.disconnect();
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(nodeBtn, config);
    }
  }
  getFrequencyDictDom = () => {
    return (
      <div className="freqency order-3 order-md-2 col-12 col-md-4 text-center">
        <span>
          <FormattedMessage id="subscription.frequency" />:
        </span>
        <Selection
          customContainerStyle={{
            display: 'inline-block',
            marginLeft: isMobile ? '50px' : '1.5rem',
            height: isMobile ? '70px' : 'auto'
          }}
          customCls="text-left"
          selectedItemChange={this.handleSelectedItemChange}
          optionList={this.computedList.filter((el) => {
            if (
              this.state.details.promotions &&
              this.state.details.promotions.includes('club')
            ) {
              return el.goodsInfoFlag === 2;
            } else {
              return el.goodsInfoFlag === 1;
            }
          })}
          wider={true}
          selectedItemData={{
            value: this.state.form.frequencyId
          }}
          key={this.state.form.frequencyId}
        />
      </div>
    );
  };

  render() {
    const createMarkup = (text) => ({ __html: text });
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
      specList,
      form,
      productRate,
      instockStatus,
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
      rationInfo,
      skuPromotions
    } = this.state;
    console.log(rationInfo, 'rationInfo');
    const { headingTag = 'h1' } = seoConfig;
    const filterImages =
      images?.filter((i) => {
        i.artworkUrl = i.goodsInfoImg;
        return i.goodsInfoImg;
      }) || [];
    const btnStatus = this.btnStatus;
    let selectedSpecItem = details.sizeList.filter((el) => el.selected)[0];
    const vet =
      process.env.REACT_APP_HUB === '1' &&
      !details.saleableFlag &&
      details.displayFlag; //vet产品并且是hub的情况下
    const De = process.env.REACT_APP_LANG === 'de';
    const Ru = process.env.REACT_APP_LANG === 'ru';
    const Tr = process.env.REACT_APP_LANG === 'tr';
    const sptGoods = goodsType === 0 || goodsType === 1;
    const trSpt = Tr && sptGoods;
    const goodHeading = `<${headingTag || 'h1'}
        class="rc-gamma ui-text-overflow-line2 text-break"
        title="${details.goodsName}">
        ${details.goodsName}
      </${headingTag || 'h1'}>`;
    let bundle = goodsType && goodsType === 2;
    const isHub = process.env.REACT_APP_HUB == '1';
    const fromPathName =
      location.state?.historyBreads?.[0]?.link?.pathname || location.pathname;
    let theme = '';
    let specieId = '';
    if (fromPathName?.indexOf('dog') > -1) {
      theme = 'Dog';
      specieId = 2;
    }
    if (fromPathName?.indexOf('cat') > -1) {
      theme = 'Cat';
      specieId = 1;
    }
    const event = {
      page: {
        type: 'product',
        theme,
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      },
      pet: {
        specieId
      }
    };
    console.log(
      currentSubscriptionStatus,
      currentSubscriptionPrice,
      skuPromotions,
      'aaaaa'
    );
    return (
      <div id="Details">
        <button
          ref="mobileSuccessModalButton"
          className="rc-btn rc-btn--one"
          data-modal-trigger="modal-mobile-cart-confirm"
          style={{ position: 'absolute', visibility: 'hidden' }}
        >
          Open standard modal
        </button>
        {Object.keys(event).length ? (
          <GoogleTagManager
            additionalEvents={event}
            ecommerceEvents={eEvents}
          />
        ) : null}
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{seoConfig.title}</title>
          <meta name="description" content={seoConfig.metaDescription} />
          <meta name="keywords" content={seoConfig.metaKeywords} />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={location}
          history={history}
          match={match}
        />
        {errMsg ? (
          <main className="rc-content--fixed-header">
            <BannerTip />
            <div className="product-detail product-wrapper rc-bg-colour--brand3">
              <div
                className="rc-max-width--xl d-flex"
                style={{ margin: '50px 0' }}
              >
                <div className="ui-font-nothing text-center">
                  <h1 style={{ display: 'none' }}>
                    {seoConfig.metaDescription}
                  </h1>
                  <em className="rc-icon rc-incompatible--sm rc-iconography" />
                  {errMsg}
                </div>
              </div>
            </div>
          </main>
        ) : (
          <main className="rc-content--fixed-header ">
            <BannerTip />
            <div className="product-detail product-wrapper rc-bg-colour--brand3">
              <div className="rc-max-width--xl mb-4">
                <BreadCrumbsNavigation list={breadCrumbs} />
                <div className="rc-padding--sm--desktop">
                  <div className="rc-content-h-top">
                    {isMobile && (
                      <div className="detailHeader mt-3">
                        <ErrMsgForCheckoutPanel
                          checkOutErrMsg={checkOutErrMsg}
                        />
                        <div
                          dangerouslySetInnerHTML={{ __html: goodHeading }}
                        />
                        <div className="desAndStars">
                          <div className="des">
                            <h2
                              className="text-break mb-1 mt-2"
                              style={{ fontSize: '1.17rem' }}
                            >
                              {details.goodsSubtitle}
                            </h2>
                          </div>
                          {!!+process.env.REACT_APP_PDP_RATING_VISIBLE && (
                            <div className="stars">
                              <div className="rc-card__price flex-inline">
                                <div
                                  className="display-inline"
                                  style={{ verticalAlign: 'middle' }}
                                >
                                  <Rate
                                    def={productRate}
                                    disabled={true}
                                    marginSize="sRate"
                                  />
                                </div>
                                <span
                                  className="comments rc-margin-left--xs rc-text-colour--text"
                                  onClick={this.handleAClick.bind(this)}
                                >
                                  ({this.state.replyNum})
                                  {/* <FormattedMessage id="reviews" /> */}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div
                          className="description"
                          dangerouslySetInnerHTML={createMarkup(
                            details.goodsDescription
                          )}
                        />
                      </div>
                    )}
                    <div className="rc-layout-container rc-six-column">
                      <div className="rc-column rc-double-width carousel-column imageBox">
                        {loading ? (
                          <Skeleton
                            count="3"
                            color="#f5f5f5"
                            width="100%"
                            height="20%"
                          />
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
                                    'en'
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
                            <div className="detailHeader">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: goodHeading
                                }}
                              />
                              {Ru && selectedSpecItem ? (
                                <p>Артикул:{selectedSpecItem?.goodsInfoNo}</p>
                              ) : null}
                              <div className="desAndStars rc-margin-bottom--xs d-flex flex-wrap flex-md-nowrap justify-content-between">
                                <div className="des">
                                  <h2
                                    className="text-break mb-1 mt-2"
                                    style={{ fontSize: '1.17rem' }}
                                  >
                                    {details.goodsSubtitle}
                                  </h2>
                                </div>
                                {!!+process.env
                                  .REACT_APP_PDP_RATING_VISIBLE && (
                                  <div className="stars text-nowrap">
                                    <div className="rc-card__price flex-inline">
                                      <div
                                        className="display-inline"
                                        style={{ verticalAlign: 'middle' }}
                                      >
                                        <Rate
                                          def={productRate}
                                          key={productRate}
                                          disabled={true}
                                          marginSize="sRate"
                                        />
                                      </div>
                                      <a
                                        className="comments rc-margin-left--xs rc-text-colour--text"
                                        onClick={this.handleAClick.bind(this)}
                                      >
                                        ({this.state.replyNum})
                                        {/* <FormattedMessage id="reviews" /> */}
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div
                                className="description"
                                dangerouslySetInnerHTML={createMarkup(
                                  details.goodsDescription
                                )}
                              />
                            </div>
                          )}
                        </div>
                        {loading ? (
                          <Skeleton
                            count="3"
                            color="#f5f5f5"
                            width="100%"
                            height="20%"
                          />
                        ) : vet ? (
                          <div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: this.state.descContent
                              }}
                            ></div>
                            {/*这种情况时，eancode 在法国固定，其他国家待定  */}
                            {!loading &&
                            !bundle &&
                            isHub &&
                            PC &&
                            !Ru &&
                            !exclusiveFlag &&
                            !trSpt ? (
                              <BuyFromRetailerBtn
                                ccidBtnDisplay={ccidBtnDisplay}
                                barcode={barcode}
                                goodsType={goodsType}
                                onClick={this.handleBuyFromRetailer}
                                ref={(el) => this.ccidBtnRef(el)}
                              />
                            ) : null}
                          </div>
                        ) : (
                          <div>
                            <div className="align-left flex rc-margin-bottom--xs">
                              <div className="stock__wrapper">
                                <div className="stock">
                                  {instockStatus ? (
                                    <>
                                      <label className={`availability instock`}>
                                        <span className="title-select"></span>
                                      </label>
                                      <span
                                        className="availability-msg"
                                        data-ready-to-order="true"
                                      >
                                        <div>
                                          <FormattedMessage id="details.inStock" />
                                        </div>
                                      </span>
                                      {/* &nbsp;&nbsp;
                                      <FormattedMessage id="details.shippedTime" /> */}
                                    </>
                                  ) : (
                                    <>
                                      <label
                                        className={`availability outofstock`}
                                      >
                                        <span className="title-select"></span>
                                      </label>
                                      <span
                                        className="availability-msg"
                                        data-ready-to-order="true"
                                      >
                                        <div className={`out-stock`}>
                                          <FormattedMessage id="details.outStock" />
                                        </div>
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            {details.promotions &&
                            details.promotions.includes('club') ? (
                              <div>
                                {this.state.isFromPR ? (
                                  <div className="productFinderBox d-flex align-items-center justify-content-center justify-content-md-between p-3 mb-2 mt-2 flex-wrap">
                                    <div style={{ flex: '1' }}>
                                      <FormattedMessage id="details.recommendedDaily" />
                                      &nbsp;
                                      <span className="strong">
                                        <FormattedMessage
                                          id="details.recommendedDaily.info"
                                          values={{
                                            val: rationInfo.weight
                                              ? rationInfo.weight +
                                                rationInfo.weightUnit
                                              : '0g'
                                          }}
                                        />
                                      </span>
                                    </div>
                                    <DistributeHubLinkOrATag
                                      href="/product-finder/product-finder-result-page"
                                      to="/product-finder-recommendation"
                                      className="rc-styled-link backProductFinder mt-0 pb-0"
                                    >
                                      <FormattedMessage id="Go back to recommendation" />
                                    </DistributeHubLinkOrATag>
                                  </div>
                                ) : (
                                  <div
                                    className={`productFinderBox ${
                                      isMobile ? '' : 'd-flex'
                                    } align-items-center justify-content-center justify-content-md-between p-3 mb-2 mt-2 flex-wrap`}
                                  >
                                    <div style={{ flex: '1' }}>
                                      <FormattedMessage id="details.findProductTip" />{' '}
                                    </div>
                                    {/* <Link
                                      className="rc-styled-link mt-0 pb-0"
                                      to="/product-finder"
                                    >
                                      <FormattedMessage id="details.findProductTips" />
                                    </Link> */}
                                    <DistributeHubLinkOrATag
                                      href="/product-finder"
                                      to="/product-finder"
                                      className={`rc-styled-link backProductFinder mt-0 pb-0 ${
                                        isMobile ? 'float-none' : ''
                                      }`}
                                    >
                                      <FormattedMessage id="details.findProductTips" />
                                    </DistributeHubLinkOrATag>
                                  </div>
                                )}
                              </div>
                            ) : null}
                            <div className="specAndQuantity rc-margin-bottom--xs ">
                              <div className="spec">
                                {specList.map((sItem, i) => (
                                  <div id="choose-select" key={i}>
                                    <div className="rc-margin-bottom--xs">
                                      <FormattedMessage id={sItem.specName} />:
                                    </div>
                                    <div data-attr="size">
                                      <div
                                        className="rc-swatch __select-size"
                                        id="id-single-select-size"
                                      >
                                        {sItem.chidren.map((sdItem, i) => (
                                          <div
                                            key={i}
                                            className={`rc-swatch__item ${
                                              sdItem.selected ? 'selected' : ''
                                            } ${
                                              sdItem.isEmpty ? 'outOfStock' : ''
                                            }`}
                                            onClick={() => {
                                              if (sdItem.isEmpty) {
                                                return false;
                                              } else {
                                                this.handleChooseSize(
                                                  sItem.specId,
                                                  sdItem.specDetailId,
                                                  sdItem.selected
                                                );
                                              }
                                            }}
                                          >
                                            <span
                                              style={{
                                                backgroundColor: sdItem.isEmpty
                                                  ? '#ccc'
                                                  : '#fff',
                                                cursor: sdItem.isEmpty
                                                  ? 'not-allowed'
                                                  : 'pointer'
                                              }}
                                            >
                                              {/* {parseFloat(sdItem.detailName)}{' '} */}
                                              {sdItem.detailName}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
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
                                    ></span>
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
                                    ></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div
                                className={`buyMethod rc-margin-bottom--xs d-flex row align-items-md-center justify-content-between 1 ml-0 mr-0 ui-cursor-pointer-pure ${
                                  form.buyWay === 0
                                    ? 'border-red'
                                    : 'border-d7d7d7'
                                }`}
                                onClick={this.ChangeFormat.bind(this, 0)}
                              >
                                <div className="radioBox order-1 order-md-1 col-8 col-md-5">
                                  <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width">
                                    <FormattedMessage id="email">
                                      {(txt) => (
                                        <input
                                          className="rc-input__radio"
                                          id="type_once"
                                          type="radio"
                                          alt={txt}
                                          name="buyWay"
                                          value="0"
                                          key="0"
                                          // onChange={(event) =>
                                          //   this.handleInputChange(event)
                                          // }
                                          checked={form.buyWay === 0}
                                        />
                                      )}
                                    </FormattedMessage>
                                    <label
                                      className="rc-input__label--inline"
                                      htmlFor="type_once"
                                    >
                                      <span
                                        style={{
                                          fontWeight: '400',
                                          color: '#333'
                                        }}
                                      >
                                        <FormattedMessage id="singlePurchase" />
                                      </span>
                                    </label>
                                    <br />
                                    <div className="freeshippingBox">
                                      <FormattedMessage id="freeShipping" />
                                    </div>
                                  </div>
                                </div>
                                <div className="freqency order-3 order-md-2 col-12 col-md-4 text-center">
                                  <FormattedMessage id="deliveryOneTimeOnly" />
                                </div>
                                <div className="price font-weight-normal text-right position-relative order-2 order-md-3 col-4 col-md-3 text-nowrap">
                                  <div>
                                    {formatMoney(currentUnitPrice)}
                                    <span className="red unit-star">
                                      <FormattedMessage
                                        id="starUnit"
                                        defaultMessage=" "
                                      />
                                    </span>
                                  </div>
                                  {De && selectedSpecItem ? (
                                    <div
                                      style={{
                                        fontSize: '.875rem',
                                        color: '#999'
                                      }}
                                    >
                                      {formatMoney(
                                        (
                                          currentUnitPrice /
                                          parseFloat(
                                            selectedSpecItem.goodsInfoWeight
                                          )
                                        ).toFixed(2)
                                      )}
                                      /{selectedSpecItem.goodsInfoUnit}{' '}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              {currentSubscriptionStatus &&
                              currentSubscriptionPrice &&
                              skuPromotions == 'autoship' ? (
                                <div>
                                  <div
                                    className={`buyMethod rc-margin-bottom--xs d-flex row align-items-md-center justify-content-between 2 ml-0 mr-0 ui-cursor-pointer-pure ${
                                      form.buyWay === 1
                                        ? 'border-red'
                                        : 'border-d7d7d7'
                                    }`}
                                    onClick={this.ChangeFormat.bind(this, 1)}
                                  >
                                    <div className="radioBox order-1 order-md-1 col-8 col-md-5">
                                      <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width m-0">
                                        <FormattedMessage id="email">
                                          {(txt) => (
                                            <input
                                              className="rc-input__radio"
                                              id="type_frequency"
                                              type="radio"
                                              alt={txt}
                                              name="buyWay"
                                              value="1"
                                              key="1"
                                              checked={form.buyWay === 1}
                                            />
                                          )}
                                        </FormattedMessage>
                                        <label
                                          className="rc-input__label--inline"
                                          htmlFor="type_frequency"
                                        >
                                          <span
                                            style={{
                                              fontWeight: '400',
                                              color: '#333'
                                            }}
                                          >
                                            <span className="iconfont mr-2">
                                              &#xe675;
                                            </span>
                                            <FormattedMessage id="autoship" />
                                            <span
                                              className="info-tooltip delivery-method-tooltip"
                                              onMouseEnter={() => {
                                                this.setState({
                                                  toolTipVisible: true
                                                });
                                              }}
                                              onMouseLeave={() => {
                                                this.setState({
                                                  toolTipVisible: false
                                                });
                                              }}
                                            >
                                              i
                                            </span>
                                            <ConfirmTooltip
                                              arrowStyle={{ left: '79%' }}
                                              display={
                                                this.state.toolTipVisible
                                              }
                                              cancelBtnVisible={false}
                                              confirmBtnVisible={false}
                                              updateChildDisplay={(status) =>
                                                this.setState({
                                                  toolTipVisible: status
                                                })
                                              }
                                              content={
                                                <FormattedMessage id="subscription.promotionTip2" />
                                              }
                                            />
                                          </span>
                                        </label>
                                      </div>
                                      <br />
                                      <div className="discountBox">
                                        <FormattedMessage
                                          id="saveExtra"
                                          values={{
                                            val:
                                              selectedSpecItem?.subscriptionPercentage
                                          }}
                                        />
                                      </div>
                                      <br />
                                      <div className="freeshippingBox">
                                        <FormattedMessage id="freeShipping" />
                                      </div>
                                    </div>
                                    {this.state.details.promotions &&
                                      this.getFrequencyDictDom()}
                                    <div className="price font-weight-normal text-right position-relative order-2 order-md-3 col-4 col-md-3 text-nowrap">
                                      <div>
                                        <span className="text-line-through-price">
                                          {formatMoney(currentUnitPrice)}
                                        </span>
                                        {formatMoney(
                                          currentSubscriptionPrice || 0
                                        )}
                                        <span className="red unit-star">
                                          <FormattedMessage
                                            id="starUnit"
                                            defaultMessage=" "
                                          />
                                        </span>
                                      </div>
                                      {De && selectedSpecItem ? (
                                        <div
                                          style={{
                                            fontSize: '.875rem',
                                            color: '#999'
                                          }}
                                        >
                                          {formatMoney(
                                            (
                                              currentSubscriptionPrice /
                                              parseFloat(
                                                selectedSpecItem.goodsInfoWeight
                                              )
                                            ).toFixed(2)
                                          )}
                                          /{selectedSpecItem.goodsInfoUnit}{' '}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                  {process.env.REACT_APP_LANG == 'fr' ? (
                                    <div>
                                      Résiliation gratuite à tout moment{' '}
                                    </div>
                                  ) : null}
                                </div>
                              ) : null}
                              {currentSubscriptionStatus &&
                              currentSubscriptionPrice &&
                              skuPromotions == 'club' ? (
                                <div
                                  className={`buyMethod rc-margin-bottom--xs d-flex row align-items-center 3 ml-0 mr-0 ui-cursor-pointer-pure ${
                                    form.buyWay === 2
                                      ? 'border-red'
                                      : 'border-d7d7d7'
                                  }`}
                                  onClick={this.ChangeFormat.bind(this, 2)}
                                >
                                  <div className="radioBox order-1 order-md-1 col-8 col-md-5">
                                    <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width m-0">
                                      <FormattedMessage id="email">
                                        {(txt) => (
                                          <input
                                            className="rc-input__radio"
                                            id="type_frequency"
                                            type="radio"
                                            alt={txt}
                                            name="buyWay"
                                            value="2"
                                            key="2"
                                            checked={form.buyWay === 2}
                                          />
                                        )}
                                      </FormattedMessage>
                                      <label
                                        className="rc-input__label--inline"
                                        htmlFor="type_frequency"
                                      >
                                        <span
                                          style={{
                                            fontWeight: '400',
                                            color: '#333'
                                          }}
                                        >
                                          <span
                                            className="iconfont mr-2"
                                            style={{
                                              fontWeight: '600',
                                              color: '#ec001a'
                                            }}
                                          >
                                            &#xe602;
                                          </span>
                                          <FormattedMessage id="Club subscription" />
                                        </span>
                                      </label>
                                    </div>
                                    <br />
                                    <div
                                      className="discountBox"
                                      style={{ background: '#3ab41d' }}
                                    >
                                      <FormattedMessage
                                        id="saveExtra"
                                        values={{
                                          val:
                                            selectedSpecItem?.subscriptionPercentage
                                        }}
                                      />
                                    </div>
                                    <br />
                                    <div className="freeshippingBox">
                                      <FormattedMessage id="freeShipping" />
                                    </div>
                                    <div className="learnMore">
                                      <span
                                        className="rc-styled-link"
                                        onClick={this.toClubTab}
                                      >
                                        <FormattedMessage id="details.learnMore" />
                                      </span>
                                    </div>
                                  </div>
                                  {this.state.details.promotions &&
                                    this.getFrequencyDictDom()}
                                  <div className="price font-weight-normal text-right position-relative order-2 order-md-3 col-4 col-md-3 text-nowrap">
                                    <div>
                                      <span className="text-line-through-price">
                                        {formatMoney(currentUnitPrice)}
                                      </span>
                                      {formatMoney(
                                        currentSubscriptionPrice || 0
                                      )}
                                      <span className="red unit-star">
                                        <FormattedMessage
                                          id="starUnit"
                                          defaultMessage=" "
                                        />
                                      </span>
                                    </div>
                                    {De && selectedSpecItem ? (
                                      <div
                                        style={{
                                          fontSize: '.875rem',
                                          color: '#999'
                                        }}
                                      >
                                        {formatMoney(
                                          (
                                            currentSubscriptionPrice /
                                            parseFloat(
                                              selectedSpecItem.goodsInfoWeight
                                            )
                                          ).toFixed(2)
                                        )}
                                        /{selectedSpecItem.goodsInfoUnit}{' '}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="rc-md-up">
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
                              <div className="buy-btn-box rc-max-width--xl fullHeight text-right mt-4">
                                <button
                                  style={{ padding: '2px 30px' }}
                                  className={`add-to-cart-btn rc-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile ${
                                    addToCartLoading ? 'ui-btn-loading' : ''
                                  } ${
                                    btnStatus ? '' : 'rc-btn-solid-disabled'
                                  }`}
                                  onClick={this.hanldeAddToCart}
                                >
                                  <span className="fa rc-icon rc-cart--xs rc-brand3" />
                                  <span className="default-txt">
                                    <FormattedMessage
                                      id={`${
                                        form.buyWay === 1
                                          ? 'subscribe'
                                          : 'details.addToCart'
                                      }`}
                                    />
                                  </span>
                                </button>
                                {!loading &&
                                !bundle &&
                                isHub &&
                                !Ru &&
                                !exclusiveFlag &&
                                !trSpt ? (
                                  <>
                                    &nbsp;&nbsp;
                                    <FormattedMessage id="or" />
                                    &nbsp;&nbsp;
                                    <BuyFromRetailerBtn
                                      ccidBtnDisplay={ccidBtnDisplay}
                                      barcode={barcode}
                                      goodsType={goodsType}
                                      onClick={this.handleBuyFromRetailer}
                                      ref={(el) => this.ccidBtnRef(el)}
                                    />
                                  </>
                                ) : null}
                              </div>
                              <ErrMsgForCheckoutPanel
                                checkOutErrMsg={checkOutErrMsg}
                              />
                            </div>
                            {Tr && form.buyWay === 2 ? (
                              <p
                                className="text-right"
                                style={{ fontWeight: '400' }}
                              >
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
              />
            ) : null}

            <div className="split-line rc-bg-colour--brand4"></div>
            {process.env.REACT_APP_HUB === '1' && goodsType !== 3 ? (
              <AdvantageTips />
            ) : null}
            {/* 电话邮箱联系板块 */}
            {isHub ? (
              <>
                <div className="split-line rc-bg-colour--brand4" />
                <div className="good-contact d-flex justify-content-center">
                  {!isMobile ? (
                    loading ? (
                      <div className="good-contact-img mr-5">
                        <Skeleton
                          count="3"
                          color="#f5f5f5"
                          width="100%"
                          height="8%"
                        />
                      </div>
                    ) : details.goodsImg ? (
                      <div className="good-contact-img mr-5">
                        <img
                          className="w-100"
                          src={details.goodsImg}
                          alt="goods details image"
                        />
                      </div>
                    ) : null
                  ) : null}
                  <div className="good-contact-dec">
                    <div
                      style={{ fontSize: '1.25rem' }}
                      className="rc-gamma ui-text-overflow-line2 text-break mb-0 rc-margin-bottom--xs"
                    >
                      <FormattedMessage id="detail.question" />
                    </div>
                    <p>
                      <FormattedMessage id="detail.answer" />
                    </p>
                    <div className="good-contact-link d-flex">
                      <a
                        href={this.state.contactPhoneNumber}
                        className="good-contact-tel d-flex"
                      >
                        <div>
                          <p>
                            <FormattedMessage id="detail.telephone" />
                          </p>
                          {!Tr && (
                            <>
                              {' '}
                              <span>{configStore.storeContactPhoneNumber}</span>
                              <p>{configStore.contactTimePeriod}</p>
                            </>
                          )}
                        </div>
                        <span className="rc-icon rc-contact rc-iconography rc-brand1" />
                      </a>
                      <a
                        className="good-contact-email d-flex"
                        href={this.state.contactUs}
                      >
                        <FormattedMessage id="detail.email" />
                        <span className="rc-icon rc-email rc-iconography rc-brand1" />
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {this.state.relatedGoodsList.length > 0 ? (
              <ResponsiveCarousel goodsList={this.state.relatedGoodsList} />
            ) : null}
            {/* <div id="goods-recommendation-box">
              <Carousel
                location={location}
                history={history}
                goodsId={goodsId}
                key={goodsId}
              />
            </div> */}
            <div
              className="sticky-addtocart"
              style={{ transform: 'translateY(-80px)' }}
            >
              <div className="rc-max-width--xl rc-padding-x--md d-sm-flex text-center align-items-center fullHeight justify-content-center">
                {!vet ? (
                  <button
                    className={`rc-btn add-to-cart-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile ${
                      addToCartLoading ? 'ui-btn-loading' : ''
                    } ${btnStatus ? '' : 'rc-btn-solid-disabled'}`}
                    onClick={this.hanldeAddToCart}
                  >
                    <span className="fa rc-icon rc-cart--xs rc-brand3" />
                    <span className="default-txt">
                      {form.buyWay === 1 ? (
                        <FormattedMessage id="subscribe" />
                      ) : (
                        <FormattedMessage id="details.addToCart" />
                      )}
                    </span>
                  </button>
                ) : null}
                {!this.state.loading &&
                !bundle &&
                isHub &&
                !Ru &&
                !exclusiveFlag &&
                !trSpt ? (
                  <BuyFromRetailerBtn
                    ccidBtnDisplay={ccidBtnDisplay}
                    barcode={barcode}
                    goodsType={goodsType}
                    onClick={this.handleBuyFromRetailer}
                    ref={(el) => this.ccidBtnRef(el)}
                  />
                ) : null}
              </div>
            </div>

            <AddCartSuccessMobile target="modal-mobile-cart-confirm" />

            {/* 最下方跳转更多板块 rita说现在hub 又不要了 暂时注释吧*/}
            {/* {isHub ? (
              <>
                <div className="more-link rc-content--fixed-header ">
                  <LazyLoad height={200}>
                    <img src={loop} srcSet={loop} alt="loop icon" />
                  </LazyLoad>
                  <LazyLoad height={200}>
                    <img
                      src={vert}
                      srcSet={vert}
                      className="vert"
                      alt="vert icon"
                    />
                  </LazyLoad>
                  <p>
                    <FormattedMessage id="detail.packagingDesc" />
                  </p>
                  <div>
                    <a
                      href="https://www.consignesdetri.fr/"
                      className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
                      style={{ minWidth: '110px' }}
                    >
                      <FormattedMessage id="learnMore" />
                    </a>
                  </div>
                </div>
              </>
            ) : null} */}
            <Help />
            <Footer />
          </main>
        )}
      </div>
    );
  }
}

export default Details;
