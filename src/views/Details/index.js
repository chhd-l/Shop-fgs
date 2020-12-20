import React from 'react';
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
import LoginButton from '@/components/LoginButton';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import Reviews from './components/Reviews';
import Rate from '@/components/Rate';
import PetModal from '@/components/PetModal';
import BannerTip from '@/components/BannerTip';
import {
  formatMoney,
  translateHtmlCharater,
  distributeLinktoPrecriberOrPaymentPage
} from '@/utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import { getDetails, getLoginDetails, getDetailsBySpuNo } from '@/api/details';
import { sitePurchase } from '@/api/cart';
import { getDict } from '@/api/dict';
import { getProductPetConfig } from '@/api/payment';
import Carousel from './components/Carousel';
import {
  setSeoConfig,
  getDeviceType,
  getFrequencyDict,
  queryStoreCateList,
  setSeoConfigCopy
} from '@/utils/utils';
import refreshImg from './images/refresh.png';
import {Helmet} from 'react-helmet';

import './index.css';
import './index.less';
import { Link } from 'react-router-dom';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

function Advantage() {
  return (
    {
      en: (
        <div className="rc-bg-colour--brand4">
          <div className="reassurance-banner rc-max-width--xl rc-padding-x--sm rc-margin-bottom--sm">
            <div className="rc-layout-container rc-four-column rc-text--center rc-content-h-middle">
              <div className="rc-column rc-padding-y--xs">
                <div className="reassurance-banner__item rc-text--left">
                  <span className="rc-header-with-icon rc-header-with-icon--gamma">
                    <span className="rc-icon rc-vet--sm rc-brand1 rc-iconography"></span>
                    The Royal Canin Pet Advisor Live app to answer all your pet
                    questions
                  </span>
                </div>
              </div>
              <div className="rc-column rc-padding-y--xs">
                <div className="reassurance-banner__item rc-text--left">
                  <span className="rc-header-with-icon rc-header-with-icon--gamma">
                    <span className="rc-icon rc-delivery--sm rc-brand1 rc-iconography"></span>
                    Free shipping and 5% off every autoship order
                  </span>
                </div>
              </div>
              <div className="rc-column rc-padding-y--xs">
                <div className="reassurance-banner__item rc-text--left">
                  <span className="rc-header-with-icon rc-header-with-icon--gamma">
                    <span className="rc-icon rc-low-maintenance--sm rc-brand1 rc-iconography"></span>
                    Welcome box with pet essentials
                  </span>
                </div>
              </div>
              <div className="rc-column rc-padding-y--xs">
                <div className="reassurance-banner__item rc-text--left">
                  <span className="rc-header-with-icon rc-header-with-icon--gamma">
                    <span className="rc-icon rc-food--sm rc-brand1 rc-iconography"></span>
                    Personalized product recommendations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }[process.env.REACT_APP_LANG] || null
  );
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
      event:{},
      eEvents:{},
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
        taggingForImage: null
      },
      activeTabIdx: 0,
      goodsDetailTab: {
        tabName: [],
        tabContent: []
      },
      quantity: 1,
      stock: 0,
      instockStatus: true,
      quantityMinLimit: 1,
      quantityMaxLimit: 30,
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
      petModalVisible: false,
      isAdd: 0,
      productRate: 0,
      replyNum: 0,
      goodsId: null,
      minMarketPrice: 0,
      minSubscriptionPrice: 0,
      toolTipVisible: false,
      relatedProduct: [],
      form: {
        buyWay: 1, //0 - once/ 1 - frequency
        frequencyVal: '',
        frequencyName: '',
        frequencyId: -1
      },
      frequencyList: [],
      tabs: [],
      reviewShow: false,
      isMobile: false,
      goodsNo: '', // SPU
      breadCrumbs: [],
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      }
    };
    this.hanldeAmountChange = this.hanldeAmountChange.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    this.handleChooseSize = this.handleChooseSize.bind(this);
    this.hanldeAddToCart = this.hanldeAddToCart.bind(this);
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    const { pathname } = this.props.location;
    const goodsSpuNo =
      pathname.split('-').reverse().length > 1
        ? pathname.split('-').reverse()[0]
        : '';
    await getFrequencyDict().then((res) => {
      if(process.env.REACT_APP_ACCESS_PATH === 'https://shopstg.royalcanin.com/fr/') {
        this.setState({
          frequencyList: res,
          form: Object.assign(this.state.form, {
            frequencyVal: '4',
            frequencyName: '4 semaine(s)',
            frequencyId: 3560
          })
        });
      }else {
        this.setState({
          frequencyList: res,
          form: Object.assign(this.state.form, {
            frequencyVal: res[0] ? res[0].valueEn : '',
            frequencyName: res[0] ? res[0].name : '',
            frequencyId: res[0] ? res[0].id : ''
          })
        });
      }
    });
    this.setState(
      {
        id: this.props.match.params.id,
        isMobile: getDeviceType() !== 'PC',
        goodsNo: goodsSpuNo || ''
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
  get computedList() {
    return this.state.frequencyList.map((ele) => {
      delete ele.value;
      return {
        value: ele.valueEn,
        ...ele
      };
    });
  }
  get btnStatus() {
    const { details, quantity, instockStatus, initing } = this.state;
    // displayFlag 是否展示在前台
    // saleableFlag 是否可销售
    // 不可销售且不展示在前台 则前台按钮置灰
    return (
      !initing &&
      instockStatus &&
      quantity &&
      (details.saleableFlag || !details.displayFlag)
    );
  }
  bundleMatchGoods() {
    let {
      specList,
      details,
      currentUnitPrice,
      currentLinePrice,
      currentSubscriptionPrice,
      currentSubscriptionStatus,
      stock
    } = this.state;
    let selectedArr = [];
    let idArr = [];
    let baseSpecId = details.baseSpec;
    // specList.map((el) => {
    //   if (el.chidren.filter((item) => item.selected).length) {
    //     selectedArr.push(el.chidren.filter((item) => item.selected)[0]);
    //   }
    //   return el;
    // });
    // selectedArr = selectedArr.sort((a, b) => a.specDetailId - b.specDetailId);
    // idArr = selectedArr.map((el) => el.specDetailId);
    console.log(details, 'detailsaaa');

    currentUnitPrice = details.goodsInfos[0].salePrice;
    currentSubscriptionPrice = details.goodsInfos[0].subscriptionPrice;
    currentSubscriptionStatus = details.goodsInfos[0].subscriptionStatus;
    stock = details.goodsInfos[0].stock;
    details.sizeList[0].selected = true;
    // details.sizeList.map((item, i) => {
    //   item.basePrice = 0;
    //   details.goodsSpecDetails.map((el) => {
    //     if (
    //       el.specId === baseSpecId &&
    //       item.mockSpecDetailIds.includes(el.specDetailId)
    //     ) {
    //       item.baseSpecLabel = el.detailName;
    //     }
    //     return el;
    //   });
    //   let specTextArr = [];
    //   for (let specItem of specList) {
    //     for (let specDetailItem of specItem.chidren) {
    //       if (
    //         item.mockSpecIds.includes(specDetailItem.specId) &&
    //         item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
    //       ) {
    //         specTextArr.push(specDetailItem.detailName);
    //       }
    //       // console.log(item.mo)
    //       if (
    //         item.mockSpecIds.includes(baseSpecId) &&
    //         item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
    //       ) {
    //         console.log(
    //           specDetailItem.detailName,
    //           'specDetailItem.detailName',
    //           i
    //         );
    //         item.baseSpecLabel = specDetailItem.detailName;
    //       }
    //     }
    //   }
    //   item.specText = specTextArr.join(' ');
    //   if (item.mockSpecDetailIds.sort().join(',') === idArr.join(',')) {
    //     console.log(item, 'item');
    //     item.selected = true;
    //     currentUnitPrice = item.salePrice;
    //     currentLinePrice = item.linePrice;
    //     currentSubscriptionPrice = item.subscriptionPrice;
    //     currentSubscriptionStatus = item.subscriptionStatus;
    //     stock = item.stock;
    //     if(item.goodsPromotion) {
    //       this.setState({isShowPromotion: true})
    //     }else {
    //       this.setState({isShowPromotion: false})
    //     }
    //   } else {
    //     item.selected = false;
    //   }
    //   return item;
    // });
    console.log(details, 'details');
    this.setState(
      {
        details,
        currentUnitPrice,
        currentSubscriptionPrice,
        currentSubscriptionStatus,
        stock
      },
      () => {
        this.updateInstockStatus();
      }
    );
  }
  matchGoods() {
    let {
      specList,
      details,
      currentUnitPrice,
      currentLinePrice,
      currentSubscriptionPrice,
      currentSubscriptionStatus,
      stock
    } = this.state;
    let selectedArr = [];
    let idArr = [];
    let baseSpecId = details.baseSpec;
    specList.map((el) => {
      if (el.chidren.filter((item) => item.selected).length) {
        selectedArr.push(el.chidren.filter((item) => item.selected)[0]);
      }
      return el;
    });
    selectedArr = selectedArr.sort((a, b) => a.specDetailId - b.specDetailId);
    idArr = selectedArr.map((el) => el.specDetailId);
    currentUnitPrice = details.marketPrice;

    details.sizeList.map((item, i) => {
      item.basePrice = 0;
      details.goodsSpecDetails.map((el) => {
        if (
          el.specId === baseSpecId &&
          item.mockSpecDetailIds.includes(el.specDetailId)
        ) {
          item.baseSpecLabel = el.detailName;
        }
        return el;
      });
      let specTextArr = [];
      for (let specItem of specList) {
        for (let specDetailItem of specItem.chidren) {
          if (
            item.mockSpecIds.includes(specDetailItem.specId) &&
            item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
          ) {
            specTextArr.push(specDetailItem.detailName);
          }
          // console.log(item.mo)
          if (
            item.mockSpecIds.includes(baseSpecId) &&
            item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
          ) {
            console.log(
              specDetailItem.detailName,
              'specDetailItem.detailName',
              i
            );
            item.baseSpecLabel = specDetailItem.detailName;
          }
        }
      }
      item.specText = specTextArr.join(' ');
      if (item.mockSpecDetailIds.sort().join(',') === idArr.join(',')) {
        console.log(item, 'item');
        item.selected = true;
        currentUnitPrice = item.salePrice;
        currentLinePrice = item.linePrice;
        currentSubscriptionPrice = item.subscriptionPrice;
        currentSubscriptionStatus = item.subscriptionStatus;
        stock = item.stock;
      } else {
        item.selected = false;
      }

      return item;
    });
    console.log(details, 'details');
    this.setState(
      {
        details,
        currentUnitPrice,
        currentLinePrice,
        currentSubscriptionPrice,
        currentSubscriptionStatus,
        stock
      },
      () => {
        this.updateInstockStatus();
      }
    );
  }
  async queryDetails() {
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
    Promise.all([requestName(param)])
      .then((resList) => {
        const res = resList[0];
        if (res && res.context) {
          this.setState({
            productRate: res.context.avgEvaluate
          });
        }
        if (res && res.context && res.context.goods) {
          this.setState(
            {
              productRate: res.context.goods.avgEvaluate,
              replyNum: res.context.goods.goodsEvaluateNum,
              goodsId: res.context.goods.goodsId,
              minMarketPrice: res.context.goods.minMarketPrice,
              minSubscriptionPrice: res.context.goods.minSubscriptionPrice,
              details: Object.assign(this.state.details, {
                taggingForText: (res.context.taggingList || []).filter(
                  (e) =>
                    e.taggingType === 'Text' &&
                    e.showPage &&
                    e.showPage.includes('PDP')
                )[0],
                taggingForImage: (res.context.taggingList || []).filter(
                  (e) =>
                    e.taggingType === 'Image' &&
                    e.showPage &&
                    e.showPage.includes('PDP')
                )[0]
              }),
              breadCrumbs: [{ name: res.context.goods.goodsName }]
            },
            async () => {
              const { breadCrumbs } = this.state;
              const cateNameInfo = (res.context.storeCates || [])[0];
              if (cateNameInfo && cateNameInfo.storeCateId) {
                const res = await queryStoreCateList();
                const matchedItem = (res || []).filter(
                  (f) => f.storeCateId === cateNameInfo.storeCateId
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
                }
              }
            }
          );
          setSeoConfigCopy({ goodsId: res.context.goods.goodsId,
            categoryId: '',
            pageName: 'Product Detail Page' }).then(res => {
            this.setState({seoConfig: res})
          });
          // setSeoConfig({
          //   goodsId: res.context.goods.goodsId,
          //   categoryId: '',
          //   pageName: 'Product Detail Page'
          // });
        } else {
          this.setState({
            errMsg: <FormattedMessage id="details.errMsg" />
          });
        }
        if (res && res.context && res.context.goodsSpecDetails) {
          let specList = res.context.goodsSpecs;
          let specDetailList = res.context.goodsSpecDetails;
          specList.map((sItem) => {
            sItem.chidren = specDetailList.filter((sdItem, i) => {
              return sdItem.specId === sItem.specId;
            });
            sItem.chidren[0].selected = true;
            return sItem;
          });
          console.log(specList, 'specList');
          // this.setState({ specList });
          let sizeList = [];
          let goodsInfos = res.context.goodsInfos || [];

          sizeList = goodsInfos.map((g) => {
            // const targetInfo = find(goodsInfos, info => info.mockSpecDetailIds.includes(g.specDetailId))
            // console.log(targetInfo, 'target')
            // if (targetInfo) {
            g = Object.assign({}, g, { selected: false });
            // }
            return g;
          });

          // const selectedSize = find(sizeList, s => s.selected)

          const { goodsDetailTab, tabs } = this.state;
          try {
            let tmpGoodsDetail = res.context.goods.goodsDetail;
            if (tmpGoodsDetail) {
              tmpGoodsDetail = JSON.parse(tmpGoodsDetail);
              console.log(tmpGoodsDetail, 'tmpGoodsDetail')
              for (let key in tmpGoodsDetail) {
                if (tmpGoodsDetail[key]) {
                  console.log(tmpGoodsDetail[key], 'ghaha')
                  if(process.env.REACT_APP_LANG === 'fr') {
                    let tempObj = {}
                    let tempContent = ''
                    try{
                      if(key === 'Description') {
                        tmpGoodsDetail[key].map(el => {
                          tempContent = tempContent + `<p>${Object.values(JSON.parse(el))[0]}</p>`
                        })
                      }else if(key === 'Bénéfices') {
                        tmpGoodsDetail[key].map(el => {
                          tempContent = tempContent + `<li>
                            <div class="list_title">${Object.keys(JSON.parse(el))[0]}</div>
                            <div class="list_item" style="padding-top: 15px; margin-bottom: 20px;">${Object.values(JSON.parse(el))[0]['Description']}</div>
                          </li>`
                        })
                        tempContent = `<ul class="ui-star-list rc_proudct_html_tab2 list-paddingleft-2">
                          ${tempContent}
                        </ul>`
                      }else if(key === 'Composition') {
                        tmpGoodsDetail[key].map(el => {
                          tempContent = tempContent + `<p>
                            <div class="title">${Object.keys(JSON.parse(el))[0]}</div>
                            <div class="content">${Object.values(JSON.parse(el))[0]}</div> 
                          </p>`
                        })
                      }else {
                        tempContent = tmpGoodsDetail[key]
                      }
                      goodsDetailTab.tabName.push(key);
                      goodsDetailTab.tabContent.push(tempContent);
                    }catch(e) {
                      console.log(e)
                    }
                  }else {
                    goodsDetailTab.tabName.push(key);
                    goodsDetailTab.tabContent.push(tmpGoodsDetail[key]);
                  }
                  console.log(tmpGoodsDetail[key], 'ghaha')
                  tabs.push({ show: false });
                  // goodsDetailTab.tabContent.push(translateHtmlCharater(tmpGoodsDetail[key]))
                }
              }
            }
            this.setState({
              goodsDetailTab,
              tabs
            });
          } catch (err) {
            getDict({
              type: 'goodsDetailTab',
              storeId: process.env.REACT_APP_STOREID
            }).then((res) => {
              goodsDetailTab.tabName = res.context.sysDictionaryVOS.map(
                (ele) => ele.name
              );
              this.setState({
                goodsDetailTab
              });
            });
          }
          let images = [];
          // if (res.context.goodsInfos.every((el) => !el.goodsInfoImg)) {
          //   if (res.context.images.length) {
          //     images = res.context.images;
          //   }
          // } else {
          //   images = res.context.goodsInfos.filter((el) => el.goodsInfoImg);
          // }
          // let filterImages = res.context.goodsInfos.filter((el) => el.goodsInfoImg)
          // if(filterImages.length) {
          //   images = res.context.goodsInfos.map((el) => el.goodsInfoImg)
          // }else {
          //   ima
          // }
          images = res.context.goodsInfos;
          this.setState(
            {
              details: Object.assign(
                {},
                this.state.details,
                res.context.goods,
                {
                  sizeList,
                  goodsInfos: res.context.goodsInfos,
                  goodsSpecDetails: res.context.goodsSpecDetails,
                  goodsSpecs: res.context.goodsSpecs
                }
              ),
              images,
              // images: res.context.images.concat(res.context.goodsInfos),
              // images: res.context.goodsInfos.every(el => !el.goodsInfoImg)?res.context.images: res.context.goodsInfos,
              specList
            },
            () => {
              //Product Detail Page view 埋点start
              this.GAProductDetailPageView(this.state.details)
              //Product Detail Page view 埋点end
              this.matchGoods();
            }
          );
        } else {
          let sizeList = [];
          let goodsInfos = res.context.goodsInfos || [];

          sizeList = goodsInfos.map((g) => {
            // const targetInfo = find(goodsInfos, info => info.mockSpecDetailIds.includes(g.specDetailId))
            // console.log(targetInfo, 'target')
            // if (targetInfo) {
            g = Object.assign({}, g, { selected: false });
            // }
            return g;
          });

          // const selectedSize = find(sizeList, s => s.selected)

          const { goodsDetailTab, tabs } = this.state;
          try {
            let tmpGoodsDetail = res.context.goods.goodsDetail;
            if (tmpGoodsDetail) {
              tmpGoodsDetail = JSON.parse(tmpGoodsDetail);
              for (let key in tmpGoodsDetail) {
                if (tmpGoodsDetail[key]) {
                  goodsDetailTab.tabName.push(key);
                  goodsDetailTab.tabContent.push(tmpGoodsDetail[key]);
                  tabs.push({ show: false });
                  // goodsDetailTab.tabContent.push(translateHtmlCharater(tmpGoodsDetail[key]))
                }
              }
            }
            this.setState({
              goodsDetailTab: goodsDetailTab,
              tabs
            });
          } catch (err) {
            getDict({
              type: 'goodsDetailTab',
              storeId: process.env.REACT_APP_STOREID
            }).then((res) => {
              goodsDetailTab.tabName = res.context.sysDictionaryVOS.map(
                (ele) => ele.name
              );
              this.setState({
                goodsDetailTab: goodsDetailTab
              });
            });
          }
          let images = [];
          // if (res.context.goodsInfos.every((el) => !el.goodsInfoImg)) {
          //   if (res.context.images.length) {
          //     images = res.context.images;
          //   }
          // } else {
          //   images = res.context.goodsInfos.filter((el) => el.goodsInfoImg);
          // }
          images = res.context.goodsInfos;
          this.setState(
            {
              details: Object.assign(
                {},
                this.state.details,
                res.context.goods,
                {
                  sizeList,
                  goodsInfos: res.context.goodsInfos,
                  goodsSpecDetails: res.context.goodsSpecDetails,
                  goodsSpecs: res.context.goodsSpecs
                }
              ),
              images
            },
            () => {
              this.bundleMatchGoods();
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
        console.table(e);
        this.setState({
          errMsg: e.message ? (
            e.message.toString()
          ) : (
            <FormattedMessage id="details.errMsg2" />
          )
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
          initing: false
        });
      });
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
      if (quantity >= 30) {
        res = 30;
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
    const { quantityMinLimit, quantityMaxLimit } = this.state;
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
      if (tmp > quantityMaxLimit) {
        tmp = quantityMaxLimit;
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
  handleChooseSize(sId, sdId) {
    debugger
    let { specList } = this.state;
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
    console.log(specList, 'sss');
    this.setState({ specList }, () => {
      this.matchGoods();
    });
    // this.setState
    // console.log(sItem, 'sItem')
    // this.setState({ checkOutErrMsg: "" });
    // const { sizeList } = this.state.details;
    // let list = cloneDeep(sizeList);
    // let ret = list.map((elem, indx) => {
    //   if (indx === index) {
    //     elem = Object.assign({}, elem, { selected: true });
    //   } else {
    //     elem = Object.assign({}, elem, { selected: false });
    //   }
    //   return elem;
    // });
    // this.setState(
    //   {
    //     currentUnitPrice: data.salePrice,
    //     details: Object.assign({}, this.state.details, { sizeList: ret }),
    //     stock: data.stock || 0,
    //   },
    //   () => this.updateInstockStatus()
    // );
  }
  async hanldeAddToCart({ redirect = false, needLogin = false } = {}) {
    try {
      const { loading } = this.state;
      if (!this.btnStatus || loading) return false;
      this.setState({ checkOutErrMsg: '' });
      if (this.isLogin) {
        this.hanldeLoginAddToCart({ redirect });
      } else {
        await this.hanldeUnloginAddToCart({ redirect, needLogin });
      }
    } catch (err) {}
  }
  async hanldeLoginAddToCart({ redirect }) {
    try {
      const {
        configStore,
        checkoutStore,
        history,
        clinicStore,
        headerCartStore
      } = this.props;
      const { quantity, form, details } = this.state;

      this.GAAddToCar(quantity,details);

      const { sizeList } = details;
      let currentSelectedSize;
      this.setState({ addToCartLoading: true });
      if (details.goodsSpecDetails) {
        currentSelectedSize = find(sizeList, (s) => s.selected);
      } else {
        currentSelectedSize = sizeList[0];
      }

      let param = {
        goodsInfoId: currentSelectedSize.goodsInfoId,
        goodsNum: quantity,
        goodsInfoFlag: parseInt(form.buyWay)
      };
      if (parseInt(form.buyWay)) {
        param.periodTypeId = form.frequencyId;
      }
      await sitePurchase(param);
      await checkoutStore.updateLoginCart();
      if (this.state.isMobile) {
        this.refs.showModalButton.click();
      } else {
        headerCartStore.show();
        setTimeout(() => {
          headerCartStore.hide();
        }, 1000);
      }

      if (redirect) {
        if (checkoutStore.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo3"
              values={{
                val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
              }}
            />
          );
          return false;
        }

        // 存在下架商品，不能下单
        if (checkoutStore.offShelvesProNames.length) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo4"
              values={{
                val: checkoutStore.offShelvesProNames.join('/')
              }}
            />
          );
          return false;
        }

        // 库存不够，不能下单
        if (checkoutStore.outOfstockProNames.length) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo2"
              values={{
                val: checkoutStore.outOfstockProNames.join('/')
              }}
            />
          );
          return false;
        }
        // 存在被删除商品，不能下单
        if (checkoutStore.deletedProNames.length) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo5"
              values={{
                val: checkoutStore.deletedProNames.join('/')
              }}
            />
          );
          return false;
        }
        // this.openPetModal()
        let autoAuditFlag = false;
        let res = await getProductPetConfig({
          goodsInfos: checkoutStore.loginCartData
        });
        let handledData = checkoutStore.loginCartData.map((el, i) => {
          el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
          el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
          return el;
        });
        checkoutStore.setLoginCartData(handledData);
        let AuditData = handledData.filter((el) => el.auditCatFlag);
        checkoutStore.setAuditData(AuditData);
        autoAuditFlag = res.context.autoAuditFlag;
        checkoutStore.setAutoAuditFlag(autoAuditFlag);
        checkoutStore.setPetFlag(res.context.petFlag);
        const url = distributeLinktoPrecriberOrPaymentPage({
          configStore,
          checkoutStore,
          clinicStore,
          isLogin: this.isLogin
        });
        url && history.push(url);
        // history.push('/prescription');
      }
    } catch (err) {
      console.log(err);
      this.setState({ errMsg: err.message.toString() });
    } finally {
      this.setState({ addToCartLoading: false });
    }
  }
  async hanldeUnloginAddToCart({ redirect = false, needLogin = false }) {
    const {
      configStore,
      checkoutStore,
      history,
      headerCartStore,
      clinicStore
    } = this.props;
    const {
      currentUnitPrice,
      quantity,
      instockStatus,
      form,
      details,
      loading
    } = this.state;
    const { goodsId, sizeList } = details;
    // 加入购物车 埋点start
    this.GAAddToCar(quantity,details);
    // 加入购物车 埋点end
    this.setState({ checkOutErrMsg: '' });
    if (!this.btnStatus || loading) {
      throw new Error();
    }
    const currentSelectedSize = find(sizeList, (s) => s.selected);
    let quantityNew = quantity;
    let tmpData = Object.assign({}, details, {
      quantity: quantityNew
    });
    let cartDataCopy = cloneDeep(
      toJS(checkoutStore.cartData).filter((el) => el)
    );

    if (!instockStatus || !quantityNew) {
      throw new Error();
    }
    this.setState({ addToCartLoading: true });
    let flag = true;
    if (cartDataCopy && cartDataCopy.length) {
      const historyItem = find(
        cartDataCopy,
        (c) =>
          c.goodsId === goodsId &&
          currentSelectedSize.goodsInfoId ===
            c.sizeList.filter((s) => s.selected)[0].goodsInfoId
      );
      if (historyItem) {
        flag = false;
        quantityNew += historyItem.quantity;
        if (quantityNew > process.env.REACT_APP_LIMITED_NUM) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorMaxInfo"
              values={{ val: process.env.REACT_APP_LIMITED_NUM }}
            />
          );
          this.setState({ addToCartLoading: false });
          return;
        }
        tmpData = Object.assign(tmpData, {
          quantity: quantityNew,
          goodsInfoFlag: parseInt(form.buyWay)
        });
        if (parseInt(form.buyWay)) {
          tmpData.periodTypeId = form.frequencyId;
        }
      }
    }

    // 超过库存时，修改产品数量为最大值替换
    // let res = await miniPurchases({
    //   goodsInfoDTOList: [
    //     {
    //       goodsInfoId: currentSelectedSize.goodsInfoId,
    //       goodsNum: quantityNew
    //     }
    //   ]
    // });
    // let tmpObj = find(
    //   res.context.goodsList,
    //   (ele) => ele.goodsInfoId === currentSelectedSize.goodsInfoId
    // );
    // if (tmpObj) {
    //   if (quantityNew > tmpObj.stock) {
    //     quantityNew = tmpObj.stock;
    //     if (flag) {
    //       this.setState({
    //         quantity: quantityNew
    //       });
    //     }
    //     tmpData = Object.assign(tmpData, { quantity: quantityNew });
    //   }
    // }

    const idx = findIndex(
      cartDataCopy,
      (c) =>
        c.goodsId === goodsId &&
        currentSelectedSize.goodsInfoId ===
          find(c.sizeList, (s) => s.selected).goodsInfoId
    );
    tmpData = Object.assign(tmpData, {
      currentAmount: currentUnitPrice * quantityNew,
      selected: true,
      goodsInfoFlag: parseInt(form.buyWay)
    });
    if (parseInt(form.buyWay)) {
      tmpData.periodTypeId = form.frequencyId;
    }
    if (idx > -1) {
      cartDataCopy.splice(idx, 1, tmpData);
    } else {
      if (cartDataCopy.length >= process.env.REACT_APP_LIMITED_CATE_NUM) {
        this.showCheckoutErrMsg(
          <FormattedMessage
            id="cart.errorMaxCate"
            values={{ val: process.env.REACT_APP_LIMITED_CATE_NUM }}
          />
        );
        return;
      }
      cartDataCopy.push(tmpData);
    }
    await checkoutStore.updateUnloginCart(cartDataCopy);
    try {
      if (redirect) {
        if (checkoutStore.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo3"
              values={{
                val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
              }}
            />
          );
          throw new Error();
        }
        if (checkoutStore.offShelvesProNames.length) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo4"
              values={{
                val: checkoutStore.offShelvesProNames.join('/')
              }}
            />
          );
          throw new Error();
        }
        if (checkoutStore.outOfstockProNames.length) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo2"
              values={{ val: checkoutStore.outOfstockProNames.join('/') }}
            />
          );
          throw new Error();
        }
        if (needLogin) {
          // history.push({ pathname: '/login', state: { redirectUrl: '/cart' } })
        } else {
          let autoAuditFlag = false;
          if (this.isLogin) {
            let res = await getProductPetConfig({
              goodsInfos: checkoutStore.loginCartData
            });
            let handledData = checkoutStore.loginCartData.map((el, i) => {
              el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
              el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
              return el;
            });
            checkoutStore.setLoginCartData(handledData);
            let AuditData = handledData.filter((el) => el.auditCatFlag);
            checkoutStore.setAuditData(AuditData);
            autoAuditFlag = res.context.autoAuditFlag;
          } else {
            let paramData = checkoutStore.cartData.map((el) => {
              el.goodsInfoId = el.sizeList.filter(
                (item) => item.selected
              )[0].goodsInfoId;
              return el;
            });
            let res = await getProductPetConfig({ goodsInfos: paramData });
            let handledData = paramData.map((el, i) => {
              el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
              el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
              return el;
            });
            checkoutStore.setCartData(handledData);
            let AuditData = handledData.filter((el) => el.auditCatFlag);
            checkoutStore.setAuditData(AuditData);
            autoAuditFlag = res.context.autoAuditFlag;
            checkoutStore.setPetFlag(res.context.petFlag);
          }
          checkoutStore.setAutoAuditFlag(autoAuditFlag);
          const url = distributeLinktoPrecriberOrPaymentPage({
            configStore,
            checkoutStore,
            clinicStore,
            isLogin: this.isLogin
          });
          url && history.push(url);
          // history.push('/prescription');
        }
      }
    } catch (err) {
      console.log(err);
      this.setState({ errMsg: err.message.toString() });
    } finally {
      this.setState({ addToCartLoading: false });
    }
    if (this.state.isMobile) {
      this.refs.showModalButton.click()
    } else {
      headerCartStore.show()
      setTimeout(() => {
        headerCartStore.hide()
      }, 1000)
    }
  }

  handleInputChange(e) {
    let { form } = this.state;
    form.buyWay = parseInt(e.currentTarget.value);
    this.setState({ form });
  }
  ChangeFormat(buyType) {
    console.log(buyType, 'buytype');
    let { form } = this.state;
    form.buyWay = parseInt(buyType);
    this.setState({ form });
  }
  showCheckoutErrMsg(msg) {
    this.setState({
      checkOutErrMsg: msg
    });
    if (this.state.isMobile) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
  changeTab(e, i) {
    this.setState({ activeTabIdx: i });
  }
  openPetModal() {
    this.setState({
      petModalVisible: true
    });
  }
  closePetModal() {
    if (this.state.isAdd === 2) {
      this.setState({
        isAdd: 0
      });
    }
    this.setState({
      petModalVisible: false
    });
  }
  openNew() {
    this.setState({
      isAdd: 1
    });
    this.openPetModal();
  }
  closeNew() {
    this.setState({
      isAdd: 2
    });
    this.openPetModal();
  }
  handleAClick() {
    // dataLayer.push({
    //   event: `${process.env.REACT_APP_GTM_SITE_ID}eComProductView`,
    //   ecommerce: {
    //     currencyCode:'TRY',
    //     detail: {
    //     actionField: {
    //       list: 'Related Items'
    //     },
    //       products: [
    //         {
    //           id: '123',
    //           name: 'Mother and Babycat',
    //           price: '234',
    //           brand: 'Royal Canin',
    //           club: 'no',
    //           category:'Cat/{{Range}}/Dry',
    //           variant: '4.00 Kg',
    //           sku: 'XFGHUIY',
    //         }
    //       ]
    // }}})

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
  GAAddToCar(num,item) {
    let { form } = this.state;
    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComAddToBasket`,
      ecommerce: {
        add: {
          products: [
            {
              name: item.goodsName,
              id: item.goodsNo,//已改
              club: 'no',
              type: form.buyWay==0?'one-time':'subscription',//?是否订阅
              price: item.minMarketPrice,
              brand: item.brandName||'Royal Canin',
              category: (!!item.goodsCateName)?JSON.parse(item.goodsCateName)[0]:'',//已改
              //variant: parseInt(item.goodsSpecDetails[0].detailName),
              quantity: num,
              recommendation: 'self-selected', //?self-selected, recommended
              sku: item.goodsInfos.length&&item.goodsInfos[0].goodsInfoNo//已改
            }
          ]
        }
      }
    });
    console.log('添加购物车埋点dataLayer',dataLayer);
  }
  //商品详情页 埋点
  GAProductDetailPageView(item){
    const event = {
      page: {
        type: 'product',
        theme: item.cateId=='1134'?'Cat':'Dog',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      },
      pet:{
        specieId: item.cateId=='1134'?'2':'1',
      }
    };
    const eEvents = {
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComProductView`,
      ecommerce: {
        currencyCode: process.env.REACT_APP_GA_CURRENCY_CODE,
        detail: {
          actionField: {
            list: ''//? list's name where the product was clicked from (Catalogue, Homepage, Search Results)
          },
          products: [
            {
              id: item.Id,//?goodsId客户反馈不对，id这里为空
              name: item.goodsName,
              price: item.minMarketPrice,
              brand: item.brandName||'ROYAL CANIN',
              club: 'no',
              category:(!!item.goodsCateName)?JSON.parse(item.goodsCateName)[0]:'',
              variant: parseInt(item.goodsSpecDetails[0].detailName),
              sku: item.goodsInfos.length&&item.goodsInfos[0].goodsInfoNo,
            }
          ]
        }
      }
    };
    this.setState({event,eEvents})
  }
  render() {
    const createMarkup = (text) => ({ __html: text });
    const { history, location, match } = this.props;
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
      tabs,
      reviewShow,
      activeTabIdx,
      checkOutErrMsg,
      isMobile,
      breadCrumbs,
      event,
      eEvents
    } = this.state;


    const btnStatus = this.btnStatus;
    let selectedSpecItem = details.sizeList.filter((el) => el.selected)[0];

    return (
      <div id="Details">
        {
          Object.keys(event).length>0?<GoogleTagManager additionalEvents={event} ecommerceEvents={eEvents} />:null
        }
        <Helmet>
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription}/>
          <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
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
                  <i className="rc-icon rc-incompatible--sm rc-iconography"></i>
                  {errMsg}
                </div>
              </div>
            </div>
          </main>
        ) : (
          <main className="rc-content--fixed-header ">
            <BannerTip />
            <button
              ref="showModalButton"
              class="rc-btn rc-btn--one"
              data-modal-trigger="modal-example"
              style={{ position: 'absolute', visibility: 'hidden' }}
            >
              Open standard modal
            </button>
            <div className="product-detail product-wrapper rc-bg-colour--brand3">
              <div className="rc-max-width--xl mb-4">
                {/* <BreadCrumbs /> */}
                {/* todo 接口有返回salescatogery类别吗 */}
                <BreadCrumbsNavigation list={breadCrumbs} />
                <div className="rc-padding--sm--desktop">
                  <div className="rc-content-h-top">
                    {isMobile && (
                      <div className="detailHeader mt-3">
                        <ErrMsgForCheckoutPanel
                          checkOutErrMsg={checkOutErrMsg}
                        />
                        <h1
                          className="rc-gamma ui-text-overflow-line2 text-break"
                          title={details.goodsName}
                        >
                          {details.goodsName}
                        </h1>
                        <div className="desAndStars">
                          <div className="des">
                            <h3 className="text-break mb-1 mt-2">
                              {details.goodsSubtitle}
                            </h3>
                          </div>
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
                        {this.state.loading ? (
                          <Skeleton
                            color="#f5f5f5"
                            width="100%"
                            height="100%"
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
                                  <ImageMagnifier
                                    sizeList={details.sizeList}
                                    video={details.goodsVideo}
                                    images={images}
                                    minImg={details.goodsImg}
                                    maxImg={details.goodsImg}
                                    config={this.state.imageMagnifierCfg.config}
                                    taggingForText={details.taggingForText}
                                    taggingForImage={details.taggingForImage}
                                  />
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
                              <h1
                                className="rc-gamma ui-text-overflow-line2 text-break mb-0 rc-margin-bottom--xs"
                                title={details.goodsName}
                              >
                                {details.goodsName}
                              </h1>
                              <div
                                className="desAndStars rc-margin-bottom--xs"
                              >
                                <div className="des">
                                  <h3 className="text-break mb-1 mt-2">
                                    {details.goodsSubtitle}
                                  </h3>
                                </div>
                                <div className="stars" style={{
                                  display: process.env.REACT_APP_LANG == 'fr'? 'none': 'block'
                                }}>
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
                                    {/* todo */}
                                    <div>
                                      <FormattedMessage id="details.inStock" />
                                    </div>
                                  </span>
                                </>
                              ) : (
                                <>
                                  <label className={`availability outofstock`}>
                                    <span className="title-select"></span>
                                  </label>
                                  <span
                                    className="availability-msg"
                                    data-ready-to-order="true"
                                  >
                                    {/* todo */}
                                    <div className={`out-stock`}>
                                      <FormattedMessage id="details.outStock" />
                                    </div>
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* <div className="align-left flex rc-margin-bottom--xs">
                          <div className="stock__wrapper">
                            <div className="stock">
                              <label className="availability instock">
                                <span className="title-select"></span>
                              </label>
                              <span
                                className="availability-msg"
                                data-ready-to-order="true"
                              >
                                <div>
                                  <FormattedMessage id="Available" />
                                </div>
                              </span>
                              &nbsp; for pick-up at PetStores for Clinics nearby
                            </div>
                          </div>
                        </div> */}
                        <div className="specAndQuantity rc-margin-bottom--xs">
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
                                        }`}
                                        onClick={() =>
                                          this.handleChooseSize(
                                            sItem.specId,
                                            sdItem.specDetailId
                                          )
                                        }
                                      >
                                        <span>{sdItem.detailName}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="Quantity">
                            <span>
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
                        {isMobile ? (
                          <div
                            className="buyMethod rc-margin-bottom--xs"
                            style={{
                              borderColor: !parseInt(form.buyWay)
                                ? '#e2001a'
                                : '#d7d7d7',
                              cursor: 'pointer'
                            }}
                            onClick={() => this.ChangeFormat(0)}
                          >
                            <div className="buyMethodInnerBox">
                              <div className="radioBox">
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
                                </div>
                              </div>
                              <div
                                className="price"
                                style={{
                                  fontSize: '22px',
                                  paddingTop: isMobile
                                    ? '.2rem'
                                    : process.env.REACT_APP_LANG === 'de'
                                    ? '.5rem'
                                    : '1.5rem'
                                }}
                              >
                                <div>{formatMoney(currentUnitPrice)}</div>
                                {process.env.REACT_APP_LANG === 'de' &&
                                selectedSpecItem ? (
                                  <div
                                    style={{ fontSize: '14px', color: '#999' }}
                                  >
                                    {formatMoney(
                                      (
                                        currentUnitPrice /
                                        parseFloat(
                                          selectedSpecItem.baseSpecLabel
                                        )
                                      ).toFixed(2)
                                    )}
                                    /
                                    {selectedSpecItem.baseSpecLabel &&
                                      this.formatUnit(
                                        selectedSpecItem.baseSpecLabel
                                      )}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="freeshippingBox">
                              <FormattedMessage id="freeShipping" />
                            </div>
                            <div
                              className="freqency"
                              style={{ textAlign: 'center' }}
                            >
                              <span
                                style={{ height: '73px', lineHeight: '55px' }}
                              >
                                <FormattedMessage id="deliveryOneTimeOnly" />
                                {/* Delivery 1 time only */}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="buyMethod rc-margin-bottom--xs"
                            style={{
                              borderColor: !parseInt(form.buyWay)
                                ? '#e2001a'
                                : '#d7d7d7',
                              cursor: 'pointer'
                            }}
                            onClick={() => this.ChangeFormat(0)}
                          >
                            <div
                              className="radioBox"
                              style={{ paddingTop: '1rem' }}
                            >
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
                                    style={{ fontWeight: '400', color: '#333' }}
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
                            <div className="freqency">
                              <span
                                style={{ height: '73px', lineHeight: '55px' }}
                              >
                                <FormattedMessage id="deliveryOneTimeOnly" />
                                {/* Delivery 1 time only */}
                              </span>
                            </div>
                            <div
                              className="price"
                              style={{
                                fontSize: '22px',
                                paddingTop: isMobile
                                  ? '.2rem'
                                  : process.env.REACT_APP_LANG === 'de'
                                  ? '.5rem'
                                  : '1.5rem'
                              }}
                            >
                              <div>{formatMoney(currentUnitPrice)}</div>
                              {process.env.REACT_APP_LANG === 'de' &&
                              selectedSpecItem ? (
                                <div
                                  style={{ fontSize: '14px', color: '#999' }}
                                >
                                  {formatMoney(
                                    (
                                      currentUnitPrice /
                                      parseFloat(selectedSpecItem.baseSpecLabel)
                                    ).toFixed(2)
                                  )}
                                  /
                                  {selectedSpecItem.baseSpecLabel &&
                                    this.formatUnit(
                                      selectedSpecItem.baseSpecLabel
                                    )}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )}
                        {currentSubscriptionStatus ? (
                          isMobile ? (
                            <div
                              className="buyMethod rc-margin-bottom--xs"
                              style={{
                                borderColor: parseInt(form.buyWay)
                                  ? '#e2001a'
                                  : '#d7d7d7',
                                cursor: 'pointer'
                              }}
                              onClick={() => this.ChangeFormat(1)}
                            >
                              <div className="buyMethodInnerBox">
                                <div className="radioBox">
                                  <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width">
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
                                          // onChange={(event) =>
                                          //   this.handleInputChange(event)
                                          // }
                                          // defaultChecked
                                          checked={form.buyWay === 1}
                                        />
                                      )}
                                    </FormattedMessage>
                                    <label
                                      className="rc-input__label--inline"
                                      htmlFor="type_frequency"
                                    >
                                      <img
                                        class="refreshImg"
                                        src={refreshImg}
                                      />
                                      <span
                                        style={{
                                          fontWeight: '400',
                                          color: '#333'
                                        }}
                                      >
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
                                          arrowStyle={{ left: '65%' }}
                                          display={this.state.toolTipVisible}
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
                                </div>
                                <div
                                  className="price"
                                  style={{
                                    paddingTop: isMobile
                                      ? '.2rem'
                                      : process.env.REACT_APP_LANG === 'de'
                                      ? '.5rem'
                                      : '1.5rem'
                                  }}
                                >
                                  <div>
                                    {formatMoney(currentSubscriptionPrice || 0)}
                                  </div>
                                  {process.env.REACT_APP_LANG === 'de' &&
                                  selectedSpecItem ? (
                                    <div
                                      style={{
                                        fontSize: '14px',
                                        color: '#999'
                                      }}
                                    >
                                      {formatMoney(
                                        (
                                          currentSubscriptionPrice /
                                          parseFloat(
                                            selectedSpecItem.baseSpecLabel
                                          )
                                        ).toFixed(2)
                                      )}
                                      /
                                      {selectedSpecItem.baseSpecLabel &&
                                        this.formatUnit(
                                          selectedSpecItem.baseSpecLabel
                                        )}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="discountBox">
                                <FormattedMessage
                                  id="saveExtra"
                                  values={{ val: '10%' }}
                                />
                              </div>
                              <br />
                              <div className="freeshippingBox">
                                <FormattedMessage id="freeShipping" />
                              </div>
                              <div className="freqency">
                                <span>
                                  <FormattedMessage id="subscription.frequency" />
                                  :
                                </span>
                                <Selection
                                  customContainerStyle={{
                                    display: 'inline-block',
                                    marginLeft: isMobile ? '50px' : '1.5rem',
                                    height: isMobile ? '70px' : 'auto'
                                  }}
                                  selectedItemChange={
                                    this.handleSelectedItemChange
                                  }
                                  optionList={this.computedList}
                                  selectedItemData={{
                                    value: form.frequencyVal
                                  }}
                                  key={form.frequencyVal}
                                  customStyleType="select-one"
                                />
                              </div>
                            </div>
                          ) : (
                            <div
                              className="buyMethod rc-margin-bottom--xs"
                              style={{
                                borderColor: parseInt(form.buyWay)
                                  ? '#e2001a'
                                  : '#d7d7d7',
                                cursor: 'pointer'
                              }}
                              onClick={() => this.ChangeFormat(1)}
                            >
                              <div
                                className="radioBox"
                                style={{ paddingTop: '1rem' }}
                              >
                                <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width">
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
                                        // onChange={(event) =>
                                        //   this.handleInputChange(event)
                                        // }
                                        // defaultChecked
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
                                      <img
                                        class="refreshImg"
                                        src={refreshImg}
                                      />
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
                                        arrowStyle={{ left: '65%' }}
                                        display={this.state.toolTipVisible}
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
                                    values={{ val: '5%' }}
                                  />
                                  {/* Save extra&nbsp;
                                <b className="product-pricing__card__head__price rc-padding-y--none">
                                  {formatMoney(currentUnitPrice - quantity * currentSubscriptionPrice)}
                                  10%
                                </b> */}
                                </div>
                                <br />
                                <div className="freeshippingBox">
                                  <FormattedMessage id="freeShipping" />
                                </div>
                              </div>
                              <div className="freqency">
                                <span>
                                  <FormattedMessage id="subscription.frequency" />
                                  :
                                </span>
                                <Selection
                                  customContainerStyle={{
                                    display: 'inline-block',
                                    marginLeft: isMobile ? '50px' : '1.5rem',
                                    height: isMobile ? '70px' : 'auto'
                                  }}
                                  selectedItemChange={
                                    this.handleSelectedItemChange
                                  }
                                  optionList={this.computedList}
                                  selectedItemData={{
                                    value: form.frequencyVal
                                  }}
                                  key={form.frequencyVal}
                                  customStyleType="select-one"
                                />
                              </div>
                              <div
                                className="price"
                                style={{
                                  paddingTop: isMobile
                                    ? '.2rem'
                                    : process.env.REACT_APP_LANG === 'de'
                                    ? '.5rem'
                                    : '1.5rem'
                                }}
                              >
                                <div>
                                  {formatMoney(currentSubscriptionPrice || 0)}
                                </div>
                                {process.env.REACT_APP_LANG === 'de' &&
                                selectedSpecItem ? (
                                  <div
                                    style={{ fontSize: '14px', color: '#999' }}
                                  >
                                    {formatMoney(
                                      (
                                        currentSubscriptionPrice /
                                        parseFloat(
                                          selectedSpecItem.baseSpecLabel
                                        )
                                      ).toFixed(2)
                                    )}
                                    /
                                    {selectedSpecItem.baseSpecLabel &&
                                      this.formatUnit(
                                        selectedSpecItem.baseSpecLabel
                                      )}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          )
                        ) : null}
                        {!isMobile && (
                          <div
                          // className="sticky-addtocart"
                          // style={{ transform: 'translateY(-80px)' }}
                          >
                            <div className="rc-max-width--xl fullHeight justify-content-center text-right mt-4">
                              {/* {!this.isLogin &&
                                (form.buyWay ? (
                                  <span style={{ marginLeft: '10px' }}>
                                    <FormattedMessage id="unLoginSubscriptionTips" />
                                  </span>
                                ) : (
                                  <button
                                    className={`rc-styled-link color-999 mr-2 ${
                                      addToCartLoading
                                        ? 'ui-btn-loading ui-btn-loading-border-red'
                                        : ''
                                    } ${btnStatus ? '' : 'rc-btn-disabled'}`}
                                    onClick={this.hanldeAddToCart.bind(this, {
                                      redirect: true
                                    })}
                                  >
                                    <FormattedMessage id="GuestCheckout" />
                                  </button>
                                ))}
                              &nbsp;&nbsp; */}
                              <button
                                style={{padding:'2px 30px'}}
                                className={`rc-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile ${
                                  addToCartLoading ? 'ui-btn-loading' : ''
                                } ${btnStatus ? '' : 'rc-btn-solid-disabled'}`}
                                onClick={this.hanldeAddToCart}
                              >
                                <span className="fa rc-icon rc-cart--xs rc-brand3"></span>
                                <span className="default-txt">
                                  {form.buyWay === 1 ? (
                                    <FormattedMessage id="subscribe" />
                                  ) : (
                                    <FormattedMessage id="details.addToCart" />
                                  )}
                                </span>
                              </button>
                              {/* {this.isLogin ? (
                                <button
                                  className={`rc-btn rc-btn--one js-sticky-cta ${
                                    addToCartLoading ? 'ui-btn-loading' : ''
                                  } ${
                                    btnStatus ? '' : 'rc-btn-solid-disabled'
                                  }`}
                                  onClick={this.hanldeAddToCart.bind(this, {
                                    redirect: true,
                                    needLogin: false
                                  })}
                                >
                                  <span className="fa rc-icon rc-cart--xs rc-brand3 no-icon" />
                                  <span className="default-txt">
                                    <FormattedMessage id="checkout" />
                                  </span>
                                </button>
                              ) : (
                                <LoginButton
                                  beforeLoginCallback={async () => {
                                    try {
                                      await this.hanldeUnloginAddToCart({
                                        redirect: true,
                                        needLogin: true
                                      });
                                      sessionItemRoyal.set(
                                        'okta-redirectUrl',
                                        '/cart'
                                      );
                                    } catch (err) {
                                      throw new Error();
                                    }
                                  }}
                                  btnClass={`rc-btn rc-btn--one js-sticky-cta ${
                                    addToCartLoading ? 'ui-btn-loading' : ''
                                  } ${
                                    btnStatus ? '' : 'rc-btn-solid-disabled'
                                  }`}
                                  history={history}
                                >
                                  <span className="fa rc-icon rc-cart--xs rc-brand3 no-icon" />
                                  <span className="default-txt">
                                    <FormattedMessage id="checkout" />
                                  </span>
                                </LoginButton>
                              )} */}
                            </div>
                            <ErrMsgForCheckoutPanel
                              checkOutErrMsg={checkOutErrMsg}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Advantage />
            {isMobile &&
              goodsDetailTab.tabName.map((ele, index) => (
                <>
                  <dl>
                    <div
                      className={`rc-list__accordion-item test-color 
                  ${tabs[index].show ? 'showItem' : 'hiddenItem'}`}
                    >
                      <div
                        className="rc-list__header"
                        onClick={() => {
                          tabs[index].show = !this.state.tabs[index].show;
                          this.setState({ tabs: this.state.tabs });
                        }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ __html: ele }}></div>
                        <span
                          className={`icon-change ${
                            tabs[index].show
                              ? 'rc-icon rc-up rc-brand1'
                              : 'rc-icon rc-down rc-iconography'
                          }`}
                        ></span>
                      </div>
                      <div className={`rc-list__content`}>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: goodsDetailTab.tabContent[index]
                          }}
                        />
                        <LazyLoad height={200}>
                          <img
                            src={goodsDetailTab.tabContent[index].imgUl}
                            alt=""
                          />
                        </LazyLoad>
                      </div>
                    </div>
                  </dl>
                </>
              ))}
            {/* {isMobile && (
              <dl
                data-toggle-group=""
                data-toggle-effect="rc-expand--vertical"
                className=""
              >
                <div
                  className={`rc-list__accordion-item test-color 
                  ${reviewShow ? 'showItem' : 'hiddenItem'}`}
                >
                  <div
                    className="rc-list__header d-flex justify-content-between"
                    onClick={() => {
                      this.setState({ reviewShow: !this.state.reviewShow });
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: 'Reviews' }} />
                    <span
                      className={`icon-change ${
                        reviewShow
                          ? 'rc-icon rc-up rc-brand1'
                          : 'rc-icon rc-down rc-iconography'
                      }`}
                    />
                  </div>
                  <div className={`rc-list__content `}>
                    <p>
                      <Reviews
                        id={goodsId}
                        key={goodsId}
                        isLogin={this.isLogin}
                      />
                    </p>
                  </div>
                </div>
              </dl>
            )} */}
            {!isMobile && goodsDetailTab.tabName.length ? (
              <div className="rc-max-width--xl rc-padding-x--sm">
                <div className="rc-match-heights rc-content-h-middle rc-reverse-layout">
                  <div>
                    <div className="rc-border-bottom rc-border-colour--interface">
                      <nav className="rc-fade--x">
                        <ul
                          className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank"
                          role="tablist"
                        >
                          {goodsDetailTab.tabName.map((ele, index) => (
                            <li key={index}>
                              <button
                                className="rc-tab rc-btn rounded-0 border-top-0 border-right-0 border-left-0"
                                data-toggle={`tab__panel-${index}`}
                                aria-selected={
                                  activeTabIdx === index ? 'true' : 'false'
                                }
                                role="tab"
                                onClick={(e) => this.changeTab(e, index)}
                              >
                                {ele}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                    <div
                      className="rc-tabs tabs-detail"
                      style={{ marginTop: '40px' }}
                    >
                      {goodsDetailTab.tabContent.map((ele, i) => (
                        <div
                          id={`tab__panel-${i}`}
                          key={i}
                          className="rc-tabs__content__single clearfix benefits ingredients rc-showhide"
                          aria-expanded={activeTabIdx === i ? 'true' : 'false'}
                        >
                          <div className="block">
                            <p
                              className="content rc-scroll--x"
                              dangerouslySetInnerHTML={createMarkup(ele)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {/* <div
              id="review-container"
              style={{
                display: !isMobile ? 'none' : 'block'
              }}
            >
              <Reviews id={goodsId} key={goodsId} isLogin={this.isLogin} />
            </div> */}
            {/* <div> */}
            {/* <div
                style={{
                  textAlign: 'center',
                  color: 'rgb(236, 0, 26)',
                  height: '50px',
                  lineHeight: '50px',
                  fontSize: '1.4rem',
                  marginBottom: '1rem'
                }}
              >
                Recommanded for you
              </div> */}
            {/* <HeroCarousel
                history={this.props.history}
                goodsId={this.state.goodsId}
                key={this.state.goodsId}
              /> */}
            {/* <RelatedProduct goodsId={this.state.goodsId} key={this.state.goodsId}/> */}
            <div>
              <Carousel
                location={location}
                history={history}
                goodsId={goodsId}
                key={goodsId}
              />
            </div>
            {/* </div> */}
            <div
              className="sticky-addtocart"
              style={{ transform: 'translateY(-80px)' }}
            >
              <div className="rc-max-width--xl rc-padding-x--md d-sm-flex text-center align-items-center fullHeight justify-content-center">
                <button
                  className={`rc-btn rc-btn--one js-sticky-cta rc-margin-right--xs--mobile ${
                    addToCartLoading ? 'ui-btn-loading' : ''
                  } ${btnStatus ? '' : 'rc-btn-solid-disabled'}`}
                  onClick={this.hanldeAddToCart}
                >
                  <span className="fa rc-icon rc-cart--xs rc-brand3"></span>
                  <span className="default-txt">
                    {form.buyWay === 1 ? (
                      <FormattedMessage id="subscribe" />
                    ) : (
                      <FormattedMessage id="details.addToCart" />
                    )}
                  </span>
                </button>
                {/* {this.isLogin ? (
                  <button
                    className={`rc-btn rc-btn--one js-sticky-cta ${
                      addToCartLoading ? 'ui-btn-loading' : ''
                    } ${btnStatus ? '' : 'rc-btn-solid-disabled'}`}
                    onClick={this.hanldeAddToCart.bind(this, {
                      redirect: true,
                      needLogin: false
                    })}
                  >
                    <span className="fa rc-icon rc-cart--xs rc-brand3 no-icon"></span>
                    <span className="default-txt">
                      <FormattedMessage id="checkout" />
                    </span>
                  </button>
                ) : (
                  <LoginButton
                    beforeLoginCallback={async () => {
                      try {
                        await this.hanldeUnloginAddToCart({
                          redirect: true,
                          needLogin: true
                        });
                        sessionItemRoyal.set('okta-redirectUrl', '/cart');
                      } catch (err) {
                        throw new Error();
                      }
                    }}
                    btnClass={`rc-btn rc-btn--one js-sticky-cta ${
                      addToCartLoading ? 'ui-btn-loading' : ''
                    } ${btnStatus ? '' : 'rc-btn-solid-disabled'}`}
                    history={history}
                  >
                    <span className="fa rc-icon rc-cart--xs rc-brand3 no-icon" />
                    <span className="default-txt">
                      <FormattedMessage id="checkout" />
                    </span>
                  </LoginButton>
                )} */}
                {/* {!this.isLogin &&
                  (form.buyWay ? (
                    <span style={{ marginLeft: '10px' }}>
                      <FormattedMessage id="unLoginSubscriptionTips" />
                    </span>
                  ) : (
                    <button
                      className={`rc-styled-link color-999 ${
                        addToCartLoading ? 'ui-btn-loading' : ''
                      } ${btnStatus ? '' : 'rc-btn-disabled'}`}
                      onClick={this.hanldeAddToCart.bind(this, {
                        redirect: true
                      })}
                    >
                      <FormattedMessage id="GuestCheckout" />
                    </button>
                  ))} */}
              </div>
            </div>
          </main>
        )}
        <aside
          role="modal"
          class="rc-modal rc-hidden"
          data-modal-target="modal-example"
        >
          <div class="rc-modal__container">
            <header class="rc-modal__header">
              <button
                class="rc-btn rc-icon rc-btn--icon-label rc-modal__close rc-close--xs rc-iconography"
                data-modal-trigger="modal-example"
              >
                <FormattedMessage id="close" />
              </button>
            </header>
            <section
              class="rc-modal__content rc-scroll--y"
              style={{ textAlign: 'center' }}
            >
              <div class="rc-margin-top--md" style={{ textAlign: 'center' }}>
                <svg
                  t="1607498763458"
                  class="icon"
                  style={{
                    width: '35px',
                    height: '35px',
                    marginBottom: '20px'
                  }}
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2968"
                  width="200"
                  height="200"
                >
                  <path
                    d="M512 0C230.4 0 0 230.4 0 512c0 281.6 230.4 512 512 512 281.6 0 512-230.4 512-512C1024 230.4 793.6 0 512 0zM512 960c-249.6 0-448-204.8-448-448 0-249.6 204.8-448 448-448 249.6 0 448 198.4 448 448C960 761.6 761.6 960 512 960zM691.2 339.2 454.4 576 332.8 454.4c-19.2-19.2-51.2-19.2-76.8 0C243.2 480 243.2 512 262.4 531.2l153.6 153.6c19.2 19.2 51.2 19.2 70.4 0l51.2-51.2 224-224c19.2-19.2 25.6-51.2 0-70.4C742.4 320 710.4 320 691.2 339.2z"
                    p-id="2969"
                    fill="#47b800"
                  ></path>
                </svg>
                <p style={{ color: '#47b800 !important' }}>
                  <FormattedMessage id="addedtoCart" />
                </p>
                <Link to="/home" style={{ color: '#666', fontWeight: 400 }}>
                  <FormattedMessage id="continueMyPurchases" />
                </Link>
                <p>
                  <FormattedMessage id="or" />
                </p>
              </div>
              <button
                class="rc-btn rc-btn--one"
                style={{ fontWeight: 400 }}
                onClick={() => this.props.history.push('/cart')}
              >
                <FormattedMessage id="goToCart" />
              </button>
            </section>
          </div>
        </aside>
        <Footer />
      </div>
    );
  }
}

export default Details;
