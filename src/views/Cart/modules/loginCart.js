import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { inject, observer } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import {
  formatMoney,
  mergeUnloginCartData,
  getFrequencyDict,
  distributeLinktoPrecriberOrPaymentPage,
  getDeviceType,
  unique,
  handleRecommendation,
  isShowMixFeeding,
  optimizeImage
} from '@/utils/utils';
import {
  GAInitLogin,
  GACartScreenLoad,
  GACartChangeSubscription
} from '@/utils/GA';
import { getGoodsRelationBatch } from '@/api/cart';
import find from 'lodash/find';
import {
  updateBackendCart,
  deleteItemFromBackendCart,
  switchSize
} from '@/api/cart';
import catsImg from '@/assets/images/banner-list/cats.jpg';
import dogsImg from '@/assets/images/banner-list/dogs.jpg';
import catsImgFr from '@/assets/images/banner-list/cats-fr.png';
import dogsImgFr from '@/assets/images/banner-list/dogs-fr.png';
import LazyLoad from 'react-lazyload';
import './index.less';
import '../index.css';
import PayProductInfo from '../../Payment/PayProductInfo';
import BannerTip from '@/components/BannerTip';
import SubscriptionSelection from '../components/SubscriptionSelection';
import OneOffSelection from '../components/OneOffSelection';
import ClubSelection from '../components/ClubSelection';
import ClubGiftBanner from '../components/ClubGiftBanner';
import { v4 as uuidv4 } from 'uuid';
import ProductCarousel from '@/components/ProductCarousel';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';
import GiftList from '../components/GiftList/index.tsx';
import { FOOD_DISPENSER_PIC } from '@/utils/constant';
import PromotionCodeText from '../components/PromotionCodeText';
import CartSurvey from '../components/CartSurvey';
import { getMixFeedings } from '@/api/details';
import MixFeedingBox from '../components/MixFeedingBox/index.tsx';
import { ErrorMessage } from '@/components/Message';
import { QuantityPicker } from '@/components/Product';
import { PriceDetailsList } from '../components';

const guid = uuidv4();
const sessionItemRoyal = window.__.sessionItemRoyal;
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const isHubGA = window.__.env.REACT_APP_HUB_GA;
const pageLink = window.location.href;
let preventChangeSize = false; // 修改bug: 先选中数量框，再直接点击切换规则，引起的购物车数据重复

@inject('checkoutStore', 'loginStore', 'clinicStore', 'configStore')
@injectIntl
@observer
class LoginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotionCode: '',
      mobileCartVisibleKey: 'less',
      errorMsg: '',
      productList: [],
      currentProductIdx: -1,
      quantityMinLimit: 1,
      quantityMaxLimit: 10,
      deleteLoading: false,
      checkoutLoading: false,
      petModalVisible: false,
      isAdd: 0,
      initLoading: true,
      form: {
        buyWay: 0, //0 - once/ 1 - frequency
        frequencyVal: '',
        frequencyName: '',
        frequencyId: -1
      },
      frequencyList: [],
      discount: [], //促销码的折扣信息汇总
      promotionInputValue: '', //输入的促销码
      lastPromotionInputValue: '', //上一次输入的促销码
      isClickApply: false, //是否点击apply按钮
      isShowValidCode: false, //是否显示无效promotionCode
      activeToolTipIndex: 0,
      goodsIdArr: [],
      circleLoading: false,
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      relatedGoodsList: [],
      mixFeedings: []
    };
    this.hanldeToggleOneOffOrSub = this.hanldeToggleOneOffOrSub.bind(this);
    this.handleChooseSize = this.handleChooseSize.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.showErrMsg = this.showErrMsg.bind(this);
  }
  async componentDidMount() {
    console.log('loginPage');
    try {
      if (sessionItemRoyal.get('rc-iframe-from-storepotal')) {
        this.setState({ circleLoading: true });
      }

      setSeoConfig({
        pageName: 'Cart page'
      }).then((res) => {
        this.setState({ seoConfig: res });
      });
      this.setState(
        {
          promotionInputValue: this.props.checkoutStore.promotionCode
        },
        () => {
          setTimeout(() => {
            document.getElementById('promotionApply') &&
              document.getElementById('promotionApply').click();
          });
        }
      );
      this.getGoodsIdArr();

      await getFrequencyDict().then((res) => {
        this.setState({
          frequencyList: res,
          form: Object.assign(this.state.form, {
            frequencyVal: res[0]?.valueEn || '',
            frequencyName: res[0]?.name || '',
            frequencyId: res[0]?.id || ''
          })
        });
      });

      // 合并购物车(登录后合并非登录态的购物车数据)
      const unloginCartData = this.checkoutStore.cartData;
      if (unloginCartData.length) {
        await mergeUnloginCartData();
        await this.checkoutStore.updateLoginCart({ intl: this.props.intl });
      }

      GACartScreenLoad(() =>
        GAInitLogin({
          productList: this.loginCartData,
          frequencyList: this.state.frequencyList,
          props: this.props,
          isReturnList: true
        })
      );
      setTimeout(() => {
        this.setData({ initPage: true });
      }, 2000);
      // let indv = this.loginCartData.filter(el=>el.goodsInfoFlag==3)
      // if(indv.length){
      //   setTimeout(()=>{
      //     this.setData({ initPage: true });
      //   },2000)
      // }else{
      //   this.setData({ initPage: true });
      // }

      //给代客下单用 start
      if (sessionItemRoyal.get('rc-iframe-from-storepotal')) {
        console.log(222);
        let timer = null;
        timer = setInterval(async () => {
          if (this.loginCartData.length) {
            console.log(333);
            clearInterval(timer);
            await this.updateCartCache();
            this.handleCheckout();
          }
        }, 1000);
      }
      //给代客下单用 end
    } catch (err) {
      console.log(666);
    }
  }
  componentWillUnmount() {}
  get loginCartData() {
    return this.props.checkoutStore.loginCartData.filter(
      (el) => !el.isNotShowCart
    );
  }
  get giftList() {
    return this.props.checkoutStore.giftList || [];
  }
  get checkoutStore() {
    return this.props.checkoutStore;
  }
  get totalNum() {
    return this.state.productList.reduce((prev, cur) => {
      return prev + cur.buyCount;
    }, 0);
  }
  get totalPrice() {
    return this.props.checkoutStore.totalPrice;
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  get discountPrice() {
    return this.props.checkoutStore.discountPrice;
  }
  get promotionDiscountPrice() {
    return this.props.checkoutStore.promotionDiscountPrice;
  }
  get subscriptionDiscountPrice() {
    return this.props.checkoutStore.subscriptionDiscountPrice;
  }
  get deliveryPrice() {
    return this.props.checkoutStore.deliveryPrice;
  }
  get freeShippingDiscountPrice() {
    return this.props.checkoutStore.freeShippingDiscountPrice;
  }
  get freeShippingFlag() {
    return this.props.checkoutStore.freeShippingFlag;
  }
  get taxFeePrice() {
    return this.props.checkoutStore.taxFeePrice;
  }
  get subscriptionPrice() {
    return this.props.checkoutStore.subscriptionPrice;
  }
  get promotionDesc() {
    return this.props.checkoutStore.promotionDesc;
  }
  get promotionDiscount() {
    return this.props.checkoutStore.promotionDiscount;
  }
  // 可购买状态
  get btnStatus() {
    const { productList } = this.state;
    let autoShipFlag = false,
      clubFlag = false,
      numFlag = true;
    var reg = /^[0-9]*/;
    productList.forEach((el) => {
      if (!reg.test(el.buyCount)) {
        numFlag = false;
      }
      // if (el.goods.promotions && el.goods.promotions.includes('club')) {
      //   clubFlag = true;
      // } else if (
      //   el.goods.promotions &&
      //   el.goods.promotions.includes('autoship')
      // ) {
      //   autoShipFlag = true;
      // }
    });
    return numFlag;
  }
  get promotionVOList() {
    return this.props.checkoutStore.promotionVOList;
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
  getGoodsIdArr = () => {
    let goodsIdArr = this.loginCartData.map((item) => item.goodsId);
    getGoodsRelationBatch({ goodsIds: goodsIdArr }).then((res) => {
      this.setState({ relatedGoodsList: res.context.goods });
    });
    this.setState({ goodsIdArr });
  };
  handleSelectedItemChange(pitem, data) {
    pitem.form.frequencyVal = data.value;
    pitem.form.frequencyName = data.name;
    pitem.form.frequencyId = data.id;
    pitem.periodTypeId = data.id;
    this.changeFrequencyType(pitem);
  }
  async updateCartCache({ callback, isThrowErr = false } = {}) {
    try {
      this.setState({ checkoutLoading: true });
      await this.checkoutStore.updateLoginCart({
        isThrowErr,
        intl: this.props.intl
      });
      callback && callback();
      this.setData();
    } catch (err) {
      if (isThrowErr) {
        console.log(err);
        console.log(555);
        throw new Error(err?.message || err);
      }
    } finally {
      this.setState({ checkoutLoading: false });
    }
  }
  GACheckout(productList) {
    let product = [],
      basketAmount = this.tradePrice,
      basketID = guid,
      option = '',
      step = 1;
    for (let item of productList) {
      product.push({
        brand: item.goods.brandName || 'ROYAL CANIN',
        //category:item.goods.goodsCateName?JSON.parse(item.goods.goodsCateName)[0]:'',
        category: item.goods.goodsCateName,
        club: 'no',
        id: item.goods.goodsNo,
        name: item.goods.goodsName,
        price:
          item.goodsInfoFlag == 1 ? item.subscriptionPrice : item.salePrice,
        quantity: item.buyCount,
        recommendation: 'self-selected',
        type: item.goodsInfoFlag == 1 ? 'subscription' : 'one-time',
        variant: item.specText ? parseInt(item.specText) : '',
        sku: item.goodsInfos && item.goodsInfos[0]?.goodsInfoNo
      });
    }
    try {
      dataLayer[0].checkout.basketAmount = basketAmount;
      dataLayer[0].checkout.basketID = basketID;
      dataLayer[0].checkout.option = option;
      dataLayer[0].checkout.product = product;
      dataLayer[0].checkout.step = step;
    } catch (err) {
      console.log(err);
    }
  }
  setData({ initPage = false } = {}) {
    const { configStore } = this.props;
    //每次数据变化调用
    // !isHubGA && this.GACheckout(this.loginCartData);
    let productList = this.loginCartData.map((el) => {
      // 德国的购物车有问题，先前选择的1周的，直接显示默认值，因为统一返回了那三个frequency
      let filterData =
        this.computedList.filter((item) => item.id === el.periodTypeId)[0] ||
        this.computedList[0];
      if (el.goodsInfoFlag) {
        el.form = {
          frequencyVal: filterData?.valueEn,
          frequencyName: filterData?.name,
          frequencyId:
            filterData?.id ||
            el.goods.defaultFrequencyId ||
            configStore?.defaultSubscriptionFrequencyId
        };
      } else {
        if (el.promotions?.includes('club')) {
          el.form = {
            frequencyVal: filterData?.valueEn,
            frequencyName: filterData?.name,
            frequencyId:
              el.goods?.defaultFrequencyId ||
              configStore.info?.storeVO.defaultSubscriptionClubFrequencyId ||
              filterData?.id,
            frequencyType: filterData?.type
          };
        } else {
          el.form = {
            frequencyVal: filterData?.valueEn,
            frequencyName: filterData?.name,
            frequencyId:
              el.goods?.defaultFrequencyId ||
              configStore.info?.storeVO?.defaultSubscriptionFrequencyId ||
              filterData?.id,
            frequencyType: filterData?.type
          };
        }
      }
      return el;
    });

    if (isShowMixFeeding()) {
      getMixFeedings(productList.map((el) => el.goodsId)).then((res) => {
        let unHandleMixFeedings = res?.context;
        if (unHandleMixFeedings && unHandleMixFeedings.length) {
          let mixFeedings = productList.map((el, i) => {
            let mixFeeding = handleRecommendation(
              unHandleMixFeedings[i].goodsRelationAndRelationInfos.filter(
                (el) => el.sort === 0
              )[0] || unHandleMixFeedings[i].goodsRelationAndRelationInfos[0]
            );
            if (mixFeeding) {
              mixFeeding.quantity = 1;
            }
            return mixFeeding;
          });
          this.setState({ mixFeedings });
        }
      });
    }

    this.setState(
      {
        productList,
        checkoutLoading: false,
        initLoading: false
      },
      () => {
        // 若为空购物车，则要用其他seo
        if (!this.state.productList.length) {
          // 延时是为了，页面初始化时，先请求Cart page的seo，再请求Empty Cart page时，会导致第一个先回来
          setTimeout(() => {
            setSeoConfig({
              pageName: 'Empty Cart page'
            }).then((res) => {
              this.setState({ seoConfig: res });
            });
          }, 1000);
        }
      }
    );
  }
  /**
   * 加入后台购物车
   */
  async updateBackendCart(param) {
    this.setState({ checkoutLoading: true });
    await updateBackendCart(param);
    await this.updateCartCache();
    this.setState({ checkoutLoading: false });
  }
  /**
   * 删除某个产品
   *
   */
  async deleteItemFromBackendCart(param) {
    try {
      this.setState({ checkoutLoading: true });
      //后端加了限制调purchase几口5次后不能操作，提示错误信息
      await deleteItemFromBackendCart(param);
      await this.updateCartCache();
      this.getGoodsIdArr();
    } catch (err) {
      console.log(err);
      window.scrollTo({ behavior: 'smooth', top: 0 });
      this.showErrMsg(err.message);
    }
  }
  handleCheckout = async () => {
    if (!this.btnStatus) {
      return false;
    }
    try {
      const { configStore, checkoutStore, history, clinicStore } = this.props;
      this.setState({ checkoutLoading: true });
      await this.updateCartCache({ isThrowErr: true });
      const url = await distributeLinktoPrecriberOrPaymentPage({
        configStore,
        checkoutStore,
        clinicStore,
        isLogin: true
      });

      if (sessionItemRoyal.get('rc-iframe-from-storepotal')) {
        this.setState({ circleLoading: false });
      }

      url && history.push(url);
      // history.push('/prescription');
    } catch (err) {
      console.log(err);
      window.scrollTo({ behavior: 'smooth', top: 0 });
      this.showErrMsg(err.message);
    } finally {
      this.setState({ checkoutLoading: false, circleLoading: false });
    }
  };
  showErrMsg(msg) {
    if (msg) {
      window.scrollTo(0, 0);
    }
    this.setState({
      errorMsg: msg
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 3000);
  }

  //GA 移除购物车商品 埋点
  GARemoveFromCart(product) {
    const list = [
      {
        name: product.goodsName,
        id: product.goods.goodsNo,
        club: 'no',
        type: product.goodsInfoFlag == 1 ? 'subscription' : 'one-time',
        price:
          product.goodsInfoFlag == 1
            ? product.subscriptionPrice
            : product.salePrice,
        brand: 'Royal Canin',
        category: product.goods.goodsCateName,
        variant: product.specText,
        quantity: product.buyCount,
        recommendation: 'self-selected', //self-selected, recommanded
        sku: product.goodsInfoNo
      }
    ];
    window?.dataLayer?.push({
      event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComRemoveFromCart`,
      ecommerce: {
        remove: {
          products: list
        }
      }
    });
  }
  async deleteProduct(item) {
    let { currentProductIdx, productList } = this.state;
    item.confirmTooltipVisible = false;
    this.setState({
      productList,
      deleteLoading: true
    });
    await this.deleteItemFromBackendCart({
      goodsInfoIds: [productList[currentProductIdx].goodsInfoId]
    });
    this.setState({ deleteLoading: false });

    !isHubGA && this.GARemoveFromCart(productList[currentProductIdx]);
    isHubGA &&
      window?.dataLayer?.push({
        event: 'removeFromCart'
      });
  }
  getQuantityBox = (pitem) => {
    const {
      configStore: {
        info: { skuLimitThreshold }
      }
    } = this.props;
    const { productList } = this.state;
    let isGift = !!pitem.subscriptionPlanGiftList;
    return (
      <div className="cart-quantity-container">
        <div className="product-card-footer product-card-price d-flex">
          <div
            className={`line-item-quantity text-lg-center rc-margin-right--xs mr-auto ${
              isGift ? 'rc-padding-right--xs' : ''
            }`}
          >
            <div style={{ marginTop: '.75rem' }}>
              <FormattedMessage id="quantity" />:{' '}
            </div>
            <QuantityPicker
              initQuantity={pitem.buyCount}
              min={1}
              max={skuLimitThreshold.skuMaxNum}
              initRestTotalLimitConf={{
                num:
                  skuLimitThreshold.totalMaxNum -
                  productList
                    .filter((p) => p.goodsId !== pitem.goodsId)
                    .reduce((pre, cur) => {
                      return Number(pre) + Number(cur.quantity);
                    }, 0),
                errorMsg: (
                  <FormattedMessage
                    id="cart.errorAllProductNumLimit"
                    values={{ val: skuLimitThreshold.skuMaxNum }}
                  />
                )
              }}
              updateQuantity={(val) => {
                pitem.buyCount = val;
                if (val) {
                  this.updateBackendCart({
                    goodsInfoId: pitem.goodsInfoId,
                    goodsNum: pitem.buyCount,
                    verifyStock: false,
                    periodTypeId: pitem.periodTypeId,
                    goodsInfoFlag: pitem.goodsInfoFlag
                  });
                }
              }}
              showError={this.showErrMsg}
            />
          </div>
        </div>
      </div>
    );
  };
  getSizeBox = (pitem, index) => {
    let isGift = !!pitem.subscriptionPlanGiftList;
    return (
      <div
        className={`product-quickview product-null product-wrapper product-detail ${
          isGift ? 'gift-size-mobile-fr' : ''
        }`}
      >
        <div className="detail-panel">
          <section className="attributes">
            <div data-attr="size" className="swatch">
              <div className="cart-and-ipay">
                <div className="rc-swatch __select-size">
                  {/* <div className="rc-swatch__item selected">
              <span>
                {find(pitem.sizeList, s => s.selected).specText}
                <em></em>
              </span>
            </div> */}
                  {pitem.goodsSpecs &&
                    pitem.goodsSpecs.map((sItem, i) => (
                      <div key={i} className="overflow-hidden">
                        <div className="text-left ml-1 text-capitalize">
                          {sItem.specName}:
                        </div>
                        {sItem.chidren.map((sdItem, i2) => (
                          <div
                            style={{
                              display: `${
                                !sdItem.selected && isGift ? 'none' : 'initial'
                              }`
                            }}
                            className={`rc-swatch__item ${
                              sdItem.selected ? 'selected' : ''
                            } ${sdItem.isEmpty ? 'outOfStock' : ''}`}
                            key={i2}
                            onClick={this.handleChooseSize.bind(
                              this,
                              sdItem,
                              pitem,
                              index
                            )}
                          >
                            <span key={i2}>{sdItem.detailName}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };
  getProducts(plist) {
    const { intl } = this.props;
    const { mixFeedings } = this.state;
    const Lists = plist.map((pitem, index) => {
      {
        var isGift = !!pitem.subscriptionPlanGiftList;
      }
      return (
        <div className="product-info" key={index}>
          <div
            className={`rc-border-all rc-border-colour--interface product-info p-3 rc-padding-bottom--none--mobile
            ${isGift ? 'no-margin-bottom' : 'has-margin-bottom'}`}
          >
            <span className="remove-product-btn z-50">
              <span
                className="rc-icon rc-close--sm rc-iconography inline-block"
                style={{ width: '32px', height: '32px' }}
                onClick={() => {
                  this.updateConfirmTooltipVisible(pitem, true);
                  this.setState({ currentProductIdx: index });
                }}
              />
              <ConfirmTooltip
                containerStyle={{ transform: 'translate(-89%, 105%)' }}
                arrowStyle={{ left: '89%' }}
                display={pitem.confirmTooltipVisible}
                confirm={this.deleteProduct.bind(this, pitem)}
                updateChildDisplay={(status) =>
                  this.updateConfirmTooltipVisible(pitem, status)
                }
                content={<FormattedMessage id="confirmDeleteProduct" />}
              />
            </span>
            <div
              className="rc-input rc-input--inline position-absolute hidden"
              style={{ left: '1%' }}
            >
              <input
                type="checkbox"
                className="rc-input__checkbox"
                checked={pitem.selected}
              />
              <label className="rc-input__label--inline">&nbsp;</label>
            </div>
            <div className="d-flex">
              <div className="product-info__img mr-2 overflow-hidden">
                <LazyLoad>
                  <img
                    className="w-100"
                    src={optimizeImage({ originImageUrl: pitem.goodsInfoImg })}
                    alt={pitem.goodsName}
                    title={pitem.goodsName}
                  />
                </LazyLoad>
              </div>
              <div className="product-info__desc relative" style={{ flex: 1 }}>
                <Link
                  className="ui-cursor-pointer rc-margin-top--xs rc-padding-right--sm  align-items-md-center flex-column flex-md-row mt-0"
                  to={`/${pitem.goodsName
                    .toLowerCase()
                    .split(' ')
                    .join('-')
                    .replace('/', '')}-${pitem.goods.goodsNo}`}
                >
                  <h4
                    className="rc-gamma rc-margin--none ui-text-overflow-line2 ui-text-overflow-md-line1 d-md-inline-block cart-item-md__tagging_title order-2"
                    title={pitem.goodsName}
                  >
                    {pitem.goodsName}
                  </h4>
                  {pitem.taggingForImage?.taggingImgUrl ? (
                    <LazyLoad className="order-1 md:order-3">
                      <img
                        src={pitem.taggingForImage?.taggingImgUrl}
                        className="cart-item__tagging_image ml-2"
                        alt="tagging image"
                      />
                    </LazyLoad>
                  ) : null}
                </Link>
                <div className="product-edit rc-margin-top--sm--mobile rc-margin-bottom--xs rc-padding--none rc-margin-top--xs d-flex flex-column flex-sm-row justify-content-between">
                  <div
                    style={{
                      maxWidth: '250px',
                      width: isMobile ? '9rem' : 'inherit'
                    }}
                  >
                    {/* <div className="productGoodsSubtitle">
                    {pitem.goods.goodsSubtitle}
                  </div> */}
                    <div className="align-left flex">
                      <div
                        className="stock flex"
                        style={{ margin: '.5rem 0 -.4rem' }}
                      >
                        <label
                          className={[
                            'availability',
                            pitem.addedFlag && pitem.buyCount <= pitem.stock
                              ? 'instock'
                              : 'outofstock'
                          ].join(' ')}
                        >
                          <span className="title-select">
                            {/* <FormattedMessage id="details.availability" /> : */}
                          </span>
                        </label>
                        <span className="availability-msg inline-block">
                          <div
                            className={[
                              pitem.addedFlag && pitem.buyCount <= pitem.stock
                                ? ''
                                : 'out-stock'
                            ].join(' ')}
                          >
                            {pitem.addedFlag &&
                            pitem.buyCount <= pitem.stock ? (
                              <FormattedMessage id="details.inStock" />
                            ) : pitem.addedFlag ? (
                              <FormattedMessage id="details.outStock" />
                            ) : (
                              <FormattedMessage id="details.OffShelves" />
                            )}
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                  {!isGift && this.getSizeBox(pitem, index)}
                  {!isGift && this.getQuantityBox(pitem, index)}
                </div>
              </div>
            </div>
            <div
              className={`buyMethodBox -mx-4 ${
                pitem.subscriptionStatus && pitem.subscriptionPrice
                  ? 'rc-two-column'
                  : ''
              }`}
            >
              <div className="rc-column">
                <OneOffSelection
                  isGift={isGift}
                  pitem={pitem}
                  isLogin={true}
                  chooseOneOff={this.hanldeToggleOneOffOrSub.bind(this, {
                    goodsInfoFlag: 0,
                    periodTypeId: null,
                    pitem
                  })}
                />
                {isGift && this.getSizeBox(pitem, index)}
                {isGift && this.getQuantityBox(pitem, index)}
              </div>
              {pitem.subscriptionStatus &&
              pitem.subscriptionPrice &&
              formatMoney(this.tradePrice) !== '0,00 €' ? (
                <div className="rc-column  rc-padding-left--none--desktop">
                  {!pitem.goods.promotions ||
                  !pitem.goods.promotions.includes('club') ? (
                    <SubscriptionSelection
                      isGift={isGift}
                      pitem={pitem}
                      activeToolTipIndex={this.state.activeToolTipIndex}
                      index={index}
                      toolTipVisible={this.state.toolTipVisible}
                      computedList={this.computedList.filter(
                        (el) => el.goodsInfoFlag === 1
                      )}
                      chooseSubscription={this.hanldeToggleOneOffOrSub.bind(
                        this,
                        {
                          goodsInfoFlag: 1,
                          periodTypeId: pitem.form.frequencyId,
                          pitem
                        }
                      )}
                      changeFrequency={(pitem, data) =>
                        this.handleSelectedItemChange(pitem, data)
                      }
                      isLogin={true}
                      setState={this.setState.bind(this)}
                    />
                  ) : null}
                  {pitem.goods.promotions &&
                  pitem.goods.promotions.includes('club') ? (
                    <ClubSelection
                      isGift={isGift}
                      pitem={pitem}
                      activeToolTipIndex={this.state.activeToolTipIndex}
                      index={index}
                      toolTipVisible={this.state.toolTipVisible}
                      computedList={this.computedList.filter(
                        (el) => el.goodsInfoFlag === 2
                      )}
                      chooseSubscription={this.hanldeToggleOneOffOrSub.bind(
                        this,
                        {
                          goodsInfoFlag: 2,
                          periodTypeId: pitem.form.frequencyId,
                          pitem
                        }
                      )}
                      changeFrequency={(pitem, data) =>
                        this.handleSelectedItemChange(pitem, data)
                      }
                      isLogin={true}
                      setState={this.setState.bind(this)}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          {mixFeedings &&
          mixFeedings[index] &&
          plist.filter(
            (el) => el.goods.goodsNo === mixFeedings[index].goods.goodsNo
          ).length === 0 ? (
            <MixFeedingBox
              isLogin={true}
              mixFeedingData={mixFeedings[index]}
              goodsInfoFlag={pitem.goodsInfoFlag}
              periodTypeId={pitem.periodTypeId}
              beforeUpdate={() => {
                this.setState({ checkoutLoading: true });
              }}
              update={() => {
                this.setData({ initPage: true });
                this.setState({ checkoutLoading: false });
              }}
              intl={intl}
            />
          ) : null}
          {pitem.goods.promotions &&
          pitem.goods.promotions.includes('club') &&
          pitem.goodsInfoFlag === 2 &&
          window.__.env.REACT_APP_COUNTRY !== 'ru' ? (
            <ClubGiftBanner intl={intl} />
          ) : null}
          {isGift &&
            false &&
            pitem.subscriptionPlanGiftList.map((gift) => (
              <div className="d-flex food-dispensor-box rc-border-all gift-text-center-mobile-gift rc-border-colour--interface">
                <div className="name-info flex-column-gift rc-main-content__wrapper d-flex">
                  <img
                    className="img"
                    src={
                      optimizeImage({ originImageUrl: gift.goodsInfoImg }) ||
                      FOOD_DISPENSER_PIC
                    }
                    alt="goods Information Image"
                  />
                  <div className="mobile-text-center">
                    <div>{gift.goodsInfoName}</div>
                    <div>
                      x1{' '}
                      <FormattedMessage id="smartFeederSubscription.shopmentTimes" />
                    </div>
                  </div>
                </div>
                <div className="tips-info mobile-text-center">
                  You can cancel your subscription anytime, but you will have to
                  pay the remaining balance of the dispenser market price of 120
                  euros.*
                </div>
              </div>
            ))}
        </div>
      );
    });
    return Lists;
  }
  savePromotionCode = (promotionCode) => {
    this.setState({
      promotionCode
    });
  };
  toggleMobileCart(name) {
    this.setState({ mobileCartVisibleKey: name });
  }
  updateConfirmTooltipVisible(item, status) {
    let { productList } = this.state;
    item.confirmTooltipVisible = status;
    this.setState({
      productList
    });
  }
  handlerChange = (e) => {
    this.setState({
      isShowValidCode: false,
      promotionInputValue: e.target.value
    });
  };
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const { checkoutStore } = this.props;
    const {
      checkoutLoading,
      promotionCode,
      isShowValidCode,
      mobileCartVisibleKey
    } = this.state;
    const subtractionSign = '-';
    return (
      <div
        className={`group-order rc-border-all rc-border-colour--interface cart__total__content ${className}`}
        style={{ ...style }}
        id={id}
      >
        <div className="row">
          <div className="col-12 total-items medium">
            <FormattedMessage
              id="cart.totalProduct"
              values={{ val: this.totalNum }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <span className="rc-input rc-input--inline rc-input--label mr-0 w-full mt-0 overflow-hidden mb-2.5">
              <FormattedMessage id="promotionCode">
                {(txt) => (
                  <input
                    className="rc-input__control"
                    id="id-text2"
                    type="text"
                    name="text"
                    placeholder={txt}
                    value={this.state.promotionInputValue}
                    onChange={this.handlerChange}
                  />
                )}
              </FormattedMessage>

              <label className="rc-input__label" htmlFor="id-text2" />
            </span>
          </div>
          <div className="col-6 no-padding-left">
            <p className="text-right sub-total mb-4">
              <button
                id="promotionApply"
                className={`rc-btn rc-btn--sm rc-btn--two mr-0 my-2.5 float-right ${
                  this.state.isClickApply
                    ? 'ui-btn-loading ui-btn-loading-border-red'
                    : ''
                }`}
                onClick={() => this.handleClickPromotionApply(false)}
              >
                <FormattedMessage id="apply" />
              </button>
            </p>
          </div>
        </div>
        {isShowValidCode ? (
          <div className="red pl-3 pb-3 pt-2 text-sm">
            <FormattedMessage id="validPromotionCode" />
          </div>
        ) : null}
        {!isShowValidCode &&
          this.state.discount.map((el, i) => (
            <div
              className={`row leading-lines shipping-item d-flex m-2.5 overflow-hidden`}
              style={{
                border: '1px solid #ccc',
                height: '60px',
                lineHeight: '60px'
              }}
              key={i}
            >
              <div
                className={`${
                  !checkoutStore.couponCodeFitFlag ? 'col-6' : 'col-10'
                }`}
              >
                <p className="truncate">
                  {this.promotionDesc || (
                    <FormattedMessage id="NoPromotionDesc" />
                  )}
                </p>
              </div>
              <div
                className={`${
                  !checkoutStore.couponCodeFitFlag ? 'col-4' : 'col-0'
                } red p-0`}
              >
                <p className="mb-4">
                  {!checkoutStore.couponCodeFitFlag && (
                    <FormattedMessage id="Non appliqué" />
                  )}
                </p>
              </div>
              <div className="col-2" style={{ padding: '0 .9375rem 0 0' }}>
                <p className="text-right shipping-cost mb-4">
                  <span
                    className="rc-icon rc-close--sm rc-iconography ml-2.5 text-lg leading-5 cursor-pointer"
                    onClick={this.handleRemovePromotionCode}
                  />
                </p>
              </div>
            </div>
          ))}
        <PriceDetailsList
          data={{
            totalPrice: this.totalPrice,
            taxFeePrice: this.taxFeePrice,
            subscriptionDiscountPrice: this.subscriptionDiscountPrice,
            deliveryPrice: this.deliveryPrice,
            freeShippingDiscountPrice: this.freeShippingDiscountPrice,
            freeShippingFlag: this.freeShippingFlag,
            promotionVOList: this.promotionVOList,
            isShowValidCode
          }}
        />

        <div className="group-total">
          <div className="row d-flex align-items-center">
            <div className="col-7 medium">
              <strong>
                <FormattedMessage id="totalIncluIVA" />
              </strong>
            </div>
            <div className="col-5">
              <p className="text-right grand-total-sum medium mb-0 text-nowrap">
                {this.props.configStore?.customTaxSettingOpenFlag &&
                this.props.configStore?.enterPriceType === 'NO_TAX' ? (
                  <>
                    {this.tradePrice > 0 ? (
                      formatMoney(this.tradePrice)
                    ) : (
                      <strong>{subtractionSign}</strong>
                    )}
                  </>
                ) : (
                  formatMoney(this.tradePrice)
                )}
              </p>
            </div>
          </div>

          <div className="row checkout-proccess rc-md-up">
            <div className="col-lg-12 checkout-continue">
              <a onClick={this.handleCheckout}>
                <div className="rc-padding-y--xs rc-column">
                  <div
                    data-oauthlogintargetendpoint="2"
                    className={`rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width ${
                      this.btnStatus ? '' : 'rc-btn-solid-disabled'
                    } ${checkoutLoading ? 'ui-btn-loading' : ''}`}
                    aria-pressed="true"
                  >
                    <FormattedMessage id="checkout" />
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="checkout-product-summary rc-bg-colour--brand3 rc-border-all rc-border-colour--brand4 rc-md-down">
            <div
              className={`order-summary-title rc-padding--none align-items-center justify-content-center text-center ${
                mobileCartVisibleKey === 'less' ? 'd-flex' : 'hidden'
              }`}
              onClick={this.toggleMobileCart.bind(this, 'more')}
            >
              <span
                className="rc-icon rc-up rc-iconography"
                style={{ transform: 'scale(.7)' }}
              />
              <span>
                <FormattedMessage id="mobile.cart.orderSummary" />
              </span>
            </div>
            <PayProductInfo
              data={[]}
              needHideProductList={true}
              fixToHeader={false}
              style={{
                background: '#fff',
                maxHeight: '80vh'
              }}
              className={`${mobileCartVisibleKey === 'more' ? '' : 'hidden'}`}
              ref="payProductInfo"
              location={this.props.location}
              history={history}
              buttonForCart={true}
              // frequencyName={subForm.frequencyName}
              // buyWay={subForm.buyWay}
              sendPromotionCode={this.savePromotionCode}
              promotionCode={promotionCode}
              operateBtnVisible={false}
              onClickHeader={this.toggleMobileCart.bind(this, 'less')}
              headerIcon={
                <span className="rc-icon rc-down--xs rc-iconography" />
              }
            />
            <div className="col-lg-12">
              <a onClick={this.handleCheckout}>
                <div className="rc-padding-y--xs rc-column">
                  <div
                    data-oauthlogintargetendpoint="2"
                    className={`rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width ${
                      this.btnStatus ? '' : 'rc-btn-solid-disabled'
                    } ${checkoutLoading ? 'ui-btn-loading' : ''}`}
                    aria-pressed="true"
                  >
                    <FormattedMessage id="checkout" />{' '}
                    {mobileCartVisibleKey === 'less'
                      ? formatMoney(this.tradePrice)
                      : null}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderSideCart({ fixToHeader = true }) {
    return fixToHeader ? (
      <div id="J_sidecart_container">
        {this.sideCart({
          className: 'hidden rc-md-up relative',
          style: {
            background: '#fff',
            zIndex: 9,
            width: 320
          },
          id: 'J_sidecart_fix'
        })}
        {this.sideCart()}
      </div>
    ) : (
      this.sideCart()
    );
  }
  async handleChooseSize(sdItem, pitem) {
    console.log('click handleChooseSize');
    if (preventChangeSize || sdItem.isEmpty || sdItem.isUnitPriceZero) {
      return false;
    }
    if (this.state.checkoutLoading) {
      return false;
    }
    this.setState({ checkoutLoading: true });

    const otherGoodsSpecs = pitem.goodsSpecs.filter(
      (s) => s.specId !== sdItem.specId
    );
    let selectedSpecIds = [sdItem.specId];
    let selectedSpecDetailId = [sdItem.specDetailId];
    for (let item of otherGoodsSpecs) {
      const selectedItem = find(item.chidren, (ele) => ele.selected);
      selectedSpecIds.push(selectedItem.specId);
      selectedSpecDetailId.push(selectedItem.specDetailId);
    }

    const selectedGoodsInfo = pitem.goodsInfos.filter(
      (ele) =>
        unique(ele.mockSpecIds).sort().toString() ===
          selectedSpecIds.sort().toString() &&
        unique(ele.mockSpecDetailIds).sort().toString() ===
          selectedSpecDetailId.sort().toString()
    )[0];
    // await this.handleRemovePromotionCode();
    this.clearPromotionCode();
    // this.props.checkoutStore.removePromotionCode();
    await switchSize({
      recommendationInfos: pitem.recommendationInfos,
      recommendationId: pitem.recommendationId,
      recommendationName: pitem.recommendationName,
      purchaseId: pitem.purchaseId,
      goodsInfoId: selectedGoodsInfo.goodsInfoId,
      periodTypeId: pitem.periodTypeId,
      goodsInfoFlag: pitem.goodsInfoFlag
    });
    await this.updateCartCache({
      callback: this.clearPromotionCode.bind(this)
    });
    this.setState({ checkoutLoading: false });
  }
  // 切换规格/单次订阅购买时，清空promotion code
  clearPromotionCode() {
    this.handleClickPromotionApply();
    // this.setState({
    //   discount: [],
    //   isShowValidCode: false,
    //   lastPromotionInputValue: '',
    //   promotionInputValue: ''
    // });
  }
  async changeFrequencyType(pitem) {
    if (this.state.checkoutLoading) {
      return false;
    }
    this.setState({
      checkoutLoading: true
    });
    // await this.handleRemovePromotionCode();
    this.clearPromotionCode();
    // this.props.checkoutStore.removePromotionCode();
    await switchSize({
      recommendationInfos: pitem.recommendationInfos,
      recommendationId: pitem.recommendationId,
      recommendationName: pitem.recommendationName,
      purchaseId: pitem.purchaseId,
      goodsInfoId: pitem.goodsInfoId,
      goodsInfoFlag: pitem.goodsInfoFlag,
      periodTypeId: pitem.periodTypeId
    });

    await this.updateCartCache(this.clearPromotionCode.bind(this));
    this.setState({ checkoutLoading: false });
  }
  handleRemovePromotionCode = async () => {
    const { checkoutStore, loginStore, buyWay, intl } = this.props;
    let { discount } = this.state;
    let result = {};
    await checkoutStore.removePromotionCode();
    await checkoutStore.removeCouponCode();
    // await checkoutStore.removeCouponCodeFitFlag();
    if (loginStore.isLogin) {
      result = await checkoutStore.updateLoginCart({
        promotionCode: '',
        subscriptionFlag: buyWay === 'frequency',
        intl
      });
    } else {
      result = await checkoutStore.updateUnloginCart({ intl });
    }
    this.setState({
      discount: [],
      isShowValidCode: false,
      lastPromotionInputValue: '',
      promotionInputValue: ''
    });
  };
  handleClickPromotionApply = async (falseCodeAndReRequest = false) => {
    //falseCodeAndReRequest 需要重新请求code填充公共code
    const { checkoutStore, loginStore, buyWay, intl } = this.props;
    let { promotionInputValue, discount } = this.state;
    if (!promotionInputValue && !falseCodeAndReRequest) return;
    let result = {};
    let lastPromotionInputValue = promotionInputValue;
    this.setState({
      isClickApply: !falseCodeAndReRequest,
      isShowValidCode: false,
      lastPromotionInputValue,
      discount: []
    });
    if (loginStore.isLogin) {
      result = await checkoutStore.updateLoginCart({
        promotionCode: lastPromotionInputValue,
        subscriptionFlag: buyWay === 'frequency',
        intl
      });
    } else {
      result = await checkoutStore.updateUnloginCart({
        promotionCode: lastPromotionInputValue,
        intl
      });
    }
    if (
      result &&
      (!result.context.promotionFlag || result.context.couponCodeFlag)
    ) {
      //表示输入apply promotionCode成功
      discount.splice(0, 1, 1); //(起始位置,替换个数,插入元素)
      this.setState({ discount });
      // this.props.sendPromotionCode(
      //   this.state.promotionInputValue
      // );
    } else {
      this.setState({
        isShowValidCode: true
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState(
          {
            isShowValidCode: false,
            promotionInputValue: ''
          },
          () => {
            // 本次失败之后公共的code也被清空了，需要重新请求code填充公共code
            result &&
              result.code === 'K-000000' &&
              this.handleClickPromotionApply(true);
          }
        );
      }, 4000);
      // this.props.sendPromotionCode('');
    }
    this.setState({
      isClickApply: false
      // promotionInputValue: ''
    });
  };
  hanldeToggleOneOffOrSub({ goodsInfoFlag, periodTypeId: frequencyId, pitem }) {
    // goodsInfoFlag 1-订阅 0-单次购买
    // 当前状态与需要切换的状态相同时，直接返回
    if (goodsInfoFlag) {
      isHubGA && GACartChangeSubscription('Autoship');
    } else {
      isHubGA && GACartChangeSubscription('Single purchase');
    }

    if (pitem.goodsInfoFlag === goodsInfoFlag) {
      return false;
    }
    this.setState({ checkoutLoading: true });
    pitem.goodsInfoFlag = goodsInfoFlag;
    pitem.periodTypeId = frequencyId;
    this.changeFrequencyType(pitem);
  }
  render() {
    const { productList, initLoading, errorMsg } = this.state;
    const List = this.getProducts(productList);
    const dogsPic =
      window.__.env.REACT_APP_COUNTRY === 'fr' ? dogsImgFr : dogsImg;
    const catsPic =
      window.__.env.REACT_APP_COUNTRY === 'fr' ? catsImgFr : catsImg;
    return (
      <div className="Carts">
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        {this.state.circleLoading || this.state.checkoutLoading ? (
          <Loading
            bgColor={'#000'}
            opacity={this.state.checkoutLoading ? 0.3 : 1}
          />
        ) : null}
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main
          className={`rc-content--fixed-header ${
            productList.length ? '' : 'cart-empty'
          }`}
        >
          <BannerTip />
          <div className="rc-bg-colour--brand3 rc-max-width--xl rc-padding--sm rc-bottom-spacing pt-0 rc-padding-x--none--mobile">
            {initLoading ? (
              <div className="mt-4">
                <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
              </div>
            ) : (
              <>
                {productList.length > 0 && (
                  <>
                    <div className="rc-layout-container rc-one-column pt-1">
                      <div className="rc-column d-flex">
                        <FormattedMessage id="continueShopping">
                          {(txt) => (
                            <DistributeHubLinkOrATag
                              href=""
                              to="/home"
                              className="ui-cursor-pointer-pure"
                            >
                              <span className="rc-header-with-icon rc-header-with-icon--gamma">
                                <span
                                  className="rc-icon rc-left rc-iconography rc-icon-btnback"
                                  style={{ transform: 'scale(.8)' }}
                                />
                                {txt}
                              </span>
                            </DistributeHubLinkOrATag>
                          )}
                        </FormattedMessage>
                      </div>
                    </div>
                    <div className="rc-layout-container rc-three-column cart cart-page pt-0">
                      <div className="rc-column rc-double-width pt-0">
                        <ErrorMessage msg={errorMsg} />

                        <div className="rc-padding-bottom--xs">
                          <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                            <FormattedMessage id="cart.yourShoppingCart" />
                          </h5>
                        </div>
                        <div id="product-cards-container">{List}</div>
                        <div id="product-cards-container">
                          {this.giftList.map((el, i) => (
                            <GiftList {...this.props} pitem={el} key={i} />
                          ))}
                        </div>
                        {window.__.env.REACT_APP_COUNTRY === 'us' && (
                          <CartSurvey />
                        )}
                      </div>
                      <div className="rc-column totals cart__total pt-0">
                        <div className="rc-padding-bottom--xs">
                          <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                            <FormattedMessage id="orderSummary" />
                          </h5>
                        </div>
                        {this.renderSideCart({
                          // fixToHeader: window.__.env.REACT_APP_COUNTRY !== 'fr'
                          fixToHeader: false
                        })}
                      </div>
                    </div>
                  </>
                )}
                {productList.length === 0 && !initLoading && (
                  <>
                    <div className="rc-text-center">
                      <h1 className="rc-beta mb-1 mt-3 text-18">
                        <FormattedMessage id="cart.yourShoppingCart" />
                      </h1>
                      <div className="rc-gamma title-empty mb-0 text-center">
                        <FormattedMessage id="header.basketEmpty" />
                      </div>
                    </div>
                    <div className="content-asset">
                      <div className="rc-bg-colour--brand3 rc-padding--sm pt-0 pb-0">
                        <div className="rc-max-width--lg rc-padding-x--lg--mobile">
                          <div>
                            <div className="rc-alpha inherit-fontsize">
                              <h2 className="text-center">
                                <FormattedMessage id="cart.fullPrice" />
                              </h2>
                            </div>
                            <div
                              className="d-flex justify-content-between flex-wrap ui-pet-item text-center"
                              style={
                                window.__.env.REACT_APP_COUNTRY === 'fr'
                                  ? {}
                                  : { margin: '0 10%' }
                              }
                            >
                              <div className="ui-item border radius-3">
                                <Link to="/dogs">
                                  <LazyLoad>
                                    <img
                                      className="w-100"
                                      src={dogsPic}
                                      alt="Dog products"
                                    />
                                  </LazyLoad>
                                  <br />
                                  <h4 className="card__title red">
                                    <FormattedMessage id="cart.dogDiet" />
                                  </h4>
                                </Link>
                              </div>
                              <div className="ui-item border radius-3">
                                <Link to="/cats">
                                  <LazyLoad>
                                    <img
                                      className="w-100"
                                      src={catsPic}
                                      alt="Cat products"
                                    />
                                  </LazyLoad>
                                  <br />
                                  <h4 className="card__title red">
                                    <FormattedMessage id="cart.catDiet" />
                                  </h4>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          {this.state.relatedGoodsList.length > 0 ? (
            <ProductCarousel goodsList={this.state.relatedGoodsList} />
          ) : null}
          <Footer />
        </main>
      </div>
    );
  }
}

export default LoginCart;
