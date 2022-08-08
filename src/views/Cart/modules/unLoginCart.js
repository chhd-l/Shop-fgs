import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { inject, observer } from 'mobx-react';
import { Header, Footer, LoginButton, Loading, BannerTip } from '@/components';
import { Link } from 'react-router-dom';
import { FOOD_DISPENSER_PIC, IMG_DEFAULT } from '@/utils/constant';
import {
  formatMoney,
  getFrequencyDict,
  distributeLinktoPrecriberOrPaymentPage,
  unique,
  isMobile,
  handleRecommendation,
  isShowMixFeeding,
  optimizeImage,
  setSeoConfig
} from '@/utils/utils';
import {
  GAInitUnLogin,
  GACartScreenLoad,
  GACartChangeSubscription
} from '@/utils/GA';
import { getMixFeedings } from '@/api/details';
import { getGoodsRelationBatch, valetGuestMiniCars } from '@/api/cart';
import PayProductInfo from '@/views/Payment/PayProductInfo';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import catsImg from '@/assets/images/banner-list/cats.jpg';
import dogsImg from '@/assets/images/banner-list/dogs.jpg';
import catsImgFr from '@/assets/images/banner-list/cats-fr.png';
import dogsImgFr from '@/assets/images/banner-list/dogs-fr.png';
import LazyLoad from 'react-lazyload';
import './index.less';
import SubscriptionSelection from '../components/SubscriptionSelection';
import OneOffSelection from '../components/OneOffSelection';
import ClubSelection from '../components/ClubSelection';
import ClubGiftBanner from '../components/ClubGiftBanner';
import { QuantityPicker, ProductCarousel } from '@/components/Product';
import { Helmet } from 'react-helmet';
import GiftList from '../components/GiftList/index.tsx';
import PromotionCodeText from '../components/PromotionCodeText';
import CartSurvey from '../components/CartSurvey';
import MixFeedingBox from '../components/MixFeedingBox/index.tsx';
import { ErrorMessage } from '@/components/Message';
import { PriceDetailsList } from '../components';
import {
  GACartButtonClick,
  GACartRecommendedProductClick
} from '@/utils/GA/cart';
import cn from 'classnames';
import { AddItemsVisitor as AddCartItemsVisitor } from '@/framework/cart';
import { handleSizeList } from '@/framework/product';
import { Button, Popover } from '@/components/Common';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const isHubGA = window.__.env.REACT_APP_HUB_GA;

@injectIntl
@inject('checkoutStore', 'loginStore', 'clinicStore', 'configStore')
@observer
class UnLoginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotionCode: '',
      mobileCartVisibleKey: 'less',
      errorMsg: '',
      productList: [],
      currentProductIdx: -1,
      loading: true,
      quantityMinLimit: 1,
      quantityMaxLimit: 30,
      checkoutLoading: false,
      validateAllItemsStock: true,
      isPromote: false,
      petModalVisible: false,
      isAdd: 0,
      form: {
        buyWay: 'once', // once/frequency
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
      subscriptionDiscount: 0,
      activeToolTipIndex: 0,
      goodsIdArr: [],
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      relatedGoodsList: [],
      mixFeedings: [],
      promotionsVisible: false,
      circleLoading: false
    };
    this.hanldeToggleOneOffOrSub = this.hanldeToggleOneOffOrSub.bind(this);
    this.showErrMsg = this.showErrMsg.bind(this);
  }
  async componentDidMount() {
    console.log('unLoginPage');
    const guestId = sessionItemRoyal.get('rc-guestId', guestId);
    if (guestId) {
      this.setState({ circleLoading: true });

      let res = await valetGuestMiniCars(guestId);
      let goodsList = res.context.goodsList.map((item) => {
        item.goodsInfos = item.goodsInfos.map((g) => {
          g.selected = g.goodsInfoId === item.goodsInfoId;
          return g;
        });
        item.sizeList = handleSizeList({
          goodsInfos: item.goodsInfos,
          goodsSpecDetails: item.goodsSpecDetails,
          goodsSpecs: item.goodsSpecs,
          defaultSkuNo: item.goodsInfoNo
        });
        return item;
      });

      await AddCartItemsVisitor({
        cartItemList: goodsList.map((item) =>
          Object.assign({}, item, {
            selected: true,
            quantity: item.buyCount
          })
        ),
        showPCMiniCartPop: false
      });
    }

    setSeoConfig({
      pageName: 'Cart page'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
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
    GACartScreenLoad(() =>
      GAInitUnLogin({
        productList: this.props.checkoutStore.cartData,
        frequencyList: this.state.frequencyList,
        props: this.props,
        isReturnList: true
      })
    );
    this.setCartData({ initPage: true });

    if (guestId) {
      await this.handleCheckout();
    }
    // shop推荐链接超出数量，页面加载不出来的问题(只要加购报错都跳转到购物车界面，把错误message带过去显示)
    const errMsg = this.props.history.location?.state?.errMsg;
    // const errMsg = funcUrl({ name: 'errorMsg' });
    if (errMsg) {
      this.showErrMsg(errMsg);
    }
  }
  get totalNum() {
    return this.state.productList
      .filter((ele) => ele.selected)
      .reduce((pre, cur) => {
        return pre + cur.buyCount;
      }, 0);
  }
  get subscriptionPrice() {
    return this.props.checkoutStore.subscriptionPrice;
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
  get isPromote() {
    return parseFloat(this.discountPrice) > 0;
  }
  get promotionDesc() {
    return this.props.checkoutStore.promotionDesc;
  }
  get promotionDiscount() {
    return this.props.checkoutStore.promotionDiscount;
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
  get loginCartData() {
    return this.props.checkoutStore.loginCartData;
  }
  get unLoginCartData() {
    return this.props.checkoutStore.cartData;
  }
  get giftList() {
    return this.props.checkoutStore.giftList || [];
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
      // if (el.promotions && el.promotions.includes('club')) {
      //   clubFlag = true;
      // } else if (el.promotions && el.promotions.includes('autoship')) {
      //   autoShipFlag = true;
      // }
    });
    return numFlag;
  }

  getGoodsIdArr = () => {
    let goodsIdArr = this.unLoginCartData.map((item) => item.goodsId);
    this.setState({ goodsIdArr });
    getGoodsRelationBatch({ goodsIds: goodsIdArr }).then((res) => {
      this.setState({ relatedGoodsList: res.context.goods });
    });
  };

  setCartData({ initPage = false } = {}) {
    const { configStore } = this.props;
    let productList = this.props.checkoutStore.cartData.map((el) => {
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
            configStore?.defaultSubscriptionFrequencyId,
          //GA 计算周数
          frequencyType: filterData?.type
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
              mixFeeding.buyCount = 1;
            }
            return mixFeeding;
          });
          this.setState({ mixFeedings });
        }
      });
    }

    this.setState(
      {
        productList
      },
      () => {
        this.queryEmptyCartSeo();
      }
    );
  }
  // 若为空购物车，则要用其他seo
  queryEmptyCartSeo() {
    if (!this.state.productList.length) {
      // 延时是为了，页面初始化时，先请求Cart page的seo，再请求Empty Cart page时，会导致第一个先回来
      setTimeout(() => {
        setSeoConfig({
          pageName: 'Empty Cart page'
        }).then((res) => {
          this.setState({ seoConfig: res });
        });
      }, 1000);
    }
  }
  showErrMsg(msg) {
    window.scrollTo({ behavior: 'smooth', top: 0 });
    clearTimeout(this.timer);
    this.setState({
      errorMsg: msg
    });
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 3000);
  }
  handleSelectedItemChange(pitem, data) {
    pitem.form.frequencyVal = data.value;
    pitem.form.frequencyName = data.name;
    pitem.form.frequencyId = data.id;
    pitem.periodTypeId = data.id;
    this.changeFrequencyType(pitem);
  }
  GAAccessToGuestCheck() {
    if (isHubGA) return;
    window?.dataLayer?.push({
      event: `${window.__.env.REACT_APP_GTM_SITE_ID}guestCheckout`,
      interaction: {
        category: 'checkout',
        action: 'guest checkout',
        label: 'cart page', //"cart page cart pop-in "
        value: 1
      }
    });
  }
  savePromotionCode = (promotionCode) => {
    this.setState({
      promotionCode
    });
  };
  toggleMobileCart(name) {
    this.setState({ mobileCartVisibleKey: name });
  }
  async handleCheckout({ needLogin = false } = {}) {
    GACartButtonClick('Guest checkout');
    if (!this.btnStatus) {
      return false;
    }
    try {
      this.GAAccessToGuestCheck();
      localItemRoyal.set('okta-redirectUrl', '/cart-force-to-checkout');
      const { configStore, checkoutStore, history, clinicStore } = this.props;
      this.setState({ checkoutLoading: true });
      await this.updateStock({ isThrowErr: true });
      if (!needLogin) {
        const url = await distributeLinktoPrecriberOrPaymentPage({
          configStore,
          checkoutStore,
          clinicStore,
          isLogin: false
        });
        url && history.push(url);
      }
    } catch (e) {
      console.log(e);
      this.showErrMsg(e.message);
      throw new Error(e);
    } finally {
      this.setState({ checkoutLoading: false });
    }
  }
  deleteProduct(item) {
    let { currentProductIdx, productList } = this.state;
    const product = productList[currentProductIdx];
    item.confirmTooltipVisible = false;
    productList.splice(currentProductIdx, 1);
    this.setState(
      {
        productList
      },
      () => {
        this.updateStock();
        isHubGA &&
          window?.dataLayer?.push({
            event: 'removeFromCart'
          });
        this.queryEmptyCartSeo();
      }
    );
  }
  async updateStock({ isThrowErr, callback } = {}) {
    try {
      const { productList } = this.state;
      this.setState({ checkoutLoading: true });
      await this.props.checkoutStore.updateUnloginCart({
        cartData: productList,
        isThrowErr
      });
      callback && callback();
      this.getGoodsIdArr(); //删除相关商品
      this.setState({ checkoutLoading: false });
    } catch (err) {
      throw new Error(err.message);
    }
  }
  toggleSelect(pitem) {
    pitem.selected = !pitem.selected;
    this.setState(
      {
        productList: this.state.productList
      },
      () => {
        this.updateStock();
      }
    );
  }
  getQuantityBox = (pitem) => {
    const {
      configStore: {
        info: { skuLimitThreshold }
      }
    } = this.props;
    const { productList } = this.state;
    return (
      <div className="cart-quantity-container">
        <div className="product-card-footer product-card-price d-flex">
          <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
            <div>
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
                      return Number(pre) + Number(cur.buyCount);
                    }, 0),
                errorMsg: (
                  <FormattedMessage
                    id="cart.errorAllProductNumLimit"
                    values={{ val: skuLimitThreshold.skuMaxNum }}
                  />
                )
              }}
              updateQuantity={(val) => {
                pitem.quantity = val;
                pitem.buyCount = val;
                setTimeout(() => {
                  this.updateStock();
                });
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
        // style={{ display: `${isGift ? 'initial' : 'none'}` }}
      >
        <div className="detail-panel">
          <section className="attributes">
            <div data-attr="size" className="swatch">
              <div className="cart-and-ipay">
                <div className="rc-swatch __select-size">
                  {(pitem.goodsSpecs || []).map((sItem, i) => (
                    <div key={i} className="overflow-hidden">
                      <div className="text-left ml-1 text-capitalize">
                        {sItem.specName}:
                      </div>
                      {sItem.chidren.map((sdItem, i2) => (
                        <div
                          style={{
                            display:
                              !sdItem.selected && isGift ? 'none' : 'initial'
                          }}
                          className={cn(`rc-swatch__item`, {
                            selected: sdItem.selected,
                            outOfStock: sdItem.isEmpty
                          })}
                          key={i2}
                          onClick={() =>
                            this.handleChooseSize(sdItem, pitem, index)
                          }
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
            className={`rc-border-all rc-border-colour--interface product-info p-3 rc-padding-bottom--none--mobile ${
              isGift ? 'no-margin-bottom' : 'has-margin-bottom'
            }`}
          >
            <span className="remove-product-btn z-50">
              <Popover
                display={pitem.confirmTooltipVisible}
                confirm={(e) => this.deleteProduct(pitem)}
                updateChildDisplay={(status) =>
                  this.updateConfirmTooltipVisible(pitem, status)
                }
                content={<FormattedMessage id="confirmDeleteProduct" />}
              >
                <span
                  className="rc-icon rc-close--sm rc-iconography inline-block w-8 h-8 position-relative"
                  onClick={() => {
                    this.updateConfirmTooltipVisible(
                      pitem,
                      !pitem.confirmTooltipVisible
                    );
                    this.setState({ currentProductIdx: index });
                  }}
                />
              </Popover>
            </span>
            <div
              className="rc-input rc-input--inline position-absolute hidden"
              style={{ left: '1%' }}
              onClick={() => this.toggleSelect(pitem)}
            >
              <input
                type="checkbox"
                className="rc-input__checkbox"
                checked={pitem.selected}
              />
              <label className="rc-input__label--inline">&nbsp;</label>
            </div>
            <div className="d-flex">
              <div className="product-info__img mr-2 overflow-hidden flex-shrink-0">
                <LazyLoad>
                  <img
                    className="w-100"
                    src={
                      optimizeImage({
                        originImageUrl: pitem.goodsInfoImg
                      }) ||
                      optimizeImage({ originImageUrl: pitem.goodsImg }) ||
                      IMG_DEFAULT
                    }
                    alt={pitem.goodsName}
                    title={pitem.goodsName}
                  />
                </LazyLoad>
              </div>
              <div
                className="product-info__desc relative flex-shrink-0"
                style={{ flex: 1, width: 'calc(100% - 100px)' }}
              >
                <Link
                  className="ui-cursor-pointer rc-margin-top--xs inline-block mr-5 md:inline align-items-md-center flex-column flex-md-row mt-0"
                  to={`/${pitem.goodsName
                    .toLowerCase()
                    .split(' ')
                    .join('-')
                    .replace('/', '')}-${pitem.goods.goodsNo}`}
                >
                  <h4
                    className="rc-gamma rc-margin--none d-md-inline-block cart-item-md__tagging_title order-2"
                    title={pitem.goodsName}
                    style={{ wordBreak: 'break-word' }}
                  >
                    {pitem.goodsName}
                  </h4>
                  {pitem.taggingForImageAtCart?.taggingImgUrl ? (
                    <LazyLoad className="order-1 md:order-3">
                      <img
                        src={pitem.taggingForImageAtCart?.taggingImgUrl}
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
                    {pitem.goodsSubtitle}
                  </div> */}
                    <div className="align-left flex">
                      <div className="stock__wrapper">
                        <div className="stock flex">
                          <label
                            className={cn(
                              'availability',
                              pitem.addedFlag && pitem.buyCount <= pitem.stock
                                ? 'instock'
                                : 'outofstock'
                            )}
                          >
                            <span className="title-select">
                              {/* <FormattedMessage id="details.availability" /> : */}
                            </span>
                          </label>
                          <span className="availability-msg inline-block">
                            <div
                              className={cn(
                                pitem.addedFlag && pitem.buyCount <= pitem.stock
                                  ? ''
                                  : 'out-stock'
                              )}
                            >
                              <FormattedMessage
                                id={
                                  pitem.addedFlag &&
                                  pitem.buyCount <= pitem.stock
                                    ? 'details.inStock'
                                    : pitem.addedFlag
                                    ? 'details.outStock'
                                    : 'details.OffShelves'
                                }
                              />
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!isGift && this.getSizeBox(pitem, index)}
                  {!isGift && this.getQuantityBox(pitem, index)}
                </div>
              </div>
            </div>
            <div
              className={cn(`buyMethodBox -mx-4`, {
                'rc-two-column':
                  pitem.subscriptionStatus && pitem.subscriptionPrice
              })}
            >
              <div className="rc-column">
                <OneOffSelection
                  isGift={isGift}
                  pitem={pitem}
                  isLogin={false}
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
              this.tradePrice !== 0 ? (
                <div className="rc-column  rc-padding-left--none--desktop">
                  {!pitem.promotions || !pitem.promotions.includes('club') ? (
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
                      isLogin={false}
                      setState={this.setState.bind(this)}
                    />
                  ) : null}
                  {pitem.promotions && pitem.promotions.includes('club') ? (
                    <ClubSelection
                      isGift={isGift}
                      pitem={pitem}
                      activeToolTipIndex={this.state.activeToolTipIndex}
                      index={index}
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
                      isLogin={false}
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
              isLogin={false}
              mixFeedingData={mixFeedings[index]}
              goodsInfoFlag={pitem.goodsInfoFlag}
              periodTypeId={pitem.periodTypeId}
              beforeUpdate={() => {
                this.setState({ checkoutLoading: true });
              }}
              update={() => {
                this.setCartData({ initPage: true });
                this.setState({ checkoutLoading: false });
              }}
              intl={intl}
            />
          ) : null}

          {pitem.promotions &&
          pitem.promotions.includes('club') &&
          pitem.goodsInfoFlag === 2 &&
          window.__.env.REACT_APP_COUNTRY !== 'ru' ? (
            <ClubGiftBanner intl={intl} />
          ) : null}
          {isGift &&
            false &&
            pitem.subscriptionPlanGiftList.map((gift) => (
              <div className="d-flex food-dispensor-box rc-border-all gift-text-center-mobile-gift rc-border-colour--interface product-info">
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
  /**
   *
   * @param {*} pItem 单条product info
   * @param {*} sizeItem 当前product选中的规格信息
   * @param {*} index 当前product的索引
   */
  // tododo 有个bug是，存在两个sku，同spu，切换规格时，没有数量合并，只是删除操作的那条数据
  async handleChooseSize(sdItem, pitem, index) {
    if (sdItem.isEmpty || sdItem.isUnitPriceZero) {
      return false;
    }
    pitem.goodsSpecs
      .filter((item) => item.specId === sdItem.specId)[0]
      .chidren.map((item) => {
        item.selected = item.specDetailId === sdItem.specDetailId;
        return item;
      });

    let selectedSpecIds = [];
    let selectedSpecDetailId = [];
    for (let item of pitem.goodsSpecs) {
      const selectedItem = item.chidren.filter((ele) => ele.selected)[0];
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
    // 之前sku pitem.goodsInfoId
    // 增加当前sku selectedGoodsInfo.goodsInfoId
    Array.from(pitem.sizeList, (ele) => {
      ele.selected = selectedGoodsInfo.goodsInfoId === ele.goodsInfoId;
      return ele;
    });

    const { productList } = this.state;
    // 把选中的规则，平铺到了最外层，同会员购物车数据结构; 把goods对象平铺到最外层，同会员购物车数据结构
    const selectedSize = find(pitem.sizeList, (s) => s.selected);
    // 删除selectedGoodsInfo的相关属性，否则最外层相关值会被覆盖
    delete selectedSize.periodTypeId;
    delete selectedSize.goodsInfoFlag;
    delete selectedSize.goods;
    delete selectedSize.questionParams;
    delete selectedSize.recommendationId;
    delete selectedSize.recommendationName;
    delete selectedSize.referenceData;
    delete selectedSize.referenceObject;
    delete selectedSize.recommendationInfos;
    delete selectedSize.buyCount;

    productList[index] = pitem = Object.assign(
      {},
      pitem,
      pitem.goods,
      selectedSize
    );

    // 合并购物车，有相同规格的，删除本条
    const tmpIdx = findIndex(
      productList.filter((el, i) => i !== index),
      (ele) => ele.goodsInfoId === selectedGoodsInfo.goodsInfoId
    );
    if (tmpIdx > -1) {
      productList.splice(tmpIdx, 1);
    }
    // await this.handleRemovePromotionCode();
    // this.props.checkoutStore.removePromotionCode();
    this.setState(
      {
        productList
      },
      () => {
        this.updateStock({ callback: this.clearPromotionCode.bind(this) });
      }
    );
  }
  updateConfirmTooltipVisible(item, status) {
    let { productList } = this.state;
    item.confirmTooltipVisible = status;
    this.setState({
      productList: productList
    });
  }
  handlerChange = (e) => {
    this.setState({
      isShowValidCode: false,
      promotionInputValue: e.target.value
    });
  };
  getCheckotBtn = () => {
    const { configStore } = this.props;
    const { paymentAuthority } = configStore;
    const { checkoutLoading, mobileCartVisibleKey } = this.state;
    return (
      <a className={`${checkoutLoading ? 'ui-btn-loading' : ''}`}>
        <div className="rc-padding-y--xs rc-column">
          {this.totalNum > 0 ? (
            <LoginButton
              beforeLoginCallback={async () => {
                try {
                  await this.handleCheckout({ needLogin: true });
                } catch (err) {
                  throw new Error(err);
                }
              }}
              btnClass={`${this.btnStatus ? '' : 'rc-btn-solid-disabled'} ${
                checkoutLoading ? 'ui-btn-loading' : ''
              } rc-btn rc-btn--one rc-btn--lg btn-block checkout-btn cart__checkout-btn rc-full-width`}
            >
              <FormattedMessage id="checkout" />
            </LoginButton>
          ) : (
            <Button
              type="primary"
              size="small"
              disabled={!this.btnStatus}
              className={`btn-block checkout-btn cart__checkout-btn rc-full-width rc-btn-solid-disabled`}
            >
              <FormattedMessage id="checkout" />
            </Button>
          )}
        </div>
        <div className="rc-padding-y--xs rc-column">
          {this.totalNum > 0 ? (
            this.props.checkoutStore.cartData.filter((el) => el.goodsInfoFlag)
              .length > 0 ? (
              <div className="text-center" style={{ fontSize: '.9375rem' }}>
                <FormattedMessage id="unLoginSubscriptionTips" />
              </div>
            ) : paymentAuthority === 'MEMBER_AND_VISITOR' ? (
              <div
                className="text-center"
                onClick={() => this.handleCheckout()}
              >
                <div
                  className={`rc-styled-link color-999 ${
                    checkoutLoading
                      ? 'ui-btn-loading ui-btn-loading-border-red'
                      : ''
                  }`}
                  aria-pressed="true"
                >
                  <FormattedMessage id="guestCheckout" />
                </div>
              </div>
            ) : null
          ) : paymentAuthority === 'MEMBER_AND_VISITOR' ? (
            <div className="text-center">
              <div className="rc-styled-link color-999 rc-btn-disabled">
                <FormattedMessage id="guestCheckout" />
                {mobileCartVisibleKey === 'less'
                  ? formatMoney(this.tradePrice)
                  : null}
              </div>
            </div>
          ) : null}
        </div>
      </a>
    );
  };
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const { mobileCartVisibleKey, promotionCode } = this.state;
    const { checkoutStore } = this.props;
    const subtractionSign = '-';

    return (
      <div className={`${className}`} style={{ ...style }} id={id}>
        <div className="group-order rc-border-colour--interface cart__total__content rc-border-all bg-white">
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
              <span className="rc-input rc-input--inline rc-input--label mr-0 w-full mb-2.5 mt-0 overflow-hidden">
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
              <p className="text-right sub-total">
                <button
                  id="promotionApply"
                  className={`rc-btn rc-btn--sm rc-btn--two mr-0 ${
                    this.state.isClickApply
                      ? 'ui-btn-loading ui-btn-loading-border-red my-2.5 float-right'
                      : ''
                  }`}
                  onClick={() => this.handleClickPromotionApply(false)}
                >
                  <FormattedMessage id="apply" />
                </button>
              </p>
            </div>
          </div>
          {this.state.validPromotionCodeErrMsg ? (
            <div className="red pl-3 pb-3 pt-2 text-sm">
              {this.state.validPromotionCodeErrMsg}
            </div>
          ) : null}
          {this.state.isShowValidCode ? (
            <div className="red pl-3 pb-3 pt-2 text-sm">
              <FormattedMessage id="validPromotionCode" />
            </div>
          ) : null}
          {!this.state.isShowValidCode &&
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
                      className="rc-icon rc-close--sm rc-iconography ml-2.5 cursor-pointer leading-5 text-lg"
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
              isShowValidCode: this.state.isShowValidCode
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
                <p className="text-right grand-total-sum medium mb-0">
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
                {this.getCheckotBtn()}
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
                isGuestCart={true}
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
              {this.getCheckotBtn()}
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
          className: 'hidden rc-md-up relative bg-white',
          style: {
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
  async changeFrequencyType(pitem) {
    this.setState({ errorMsg: '' });
    // await this.handleRemovePromotionCode();
    // this.props.checkoutStore.removePromotionCode();
    this.setState(
      {
        productList: this.state.productList
      },
      () => {
        this.updateStock({ callback: this.clearPromotionCode.bind(this) });
      }
    );
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
  handleClickPromotionApply = async (falseCodeAndReRequest) => {
    //falseCodeAndReRequest 需要重新请求code填充公共code
    const { checkoutStore, loginStore, buyWay } = this.props;
    let { promotionInputValue, discount } = this.state;
    if (!promotionInputValue && !falseCodeAndReRequest) return;

    let result = {};
    this.setState({
      isClickApply: !falseCodeAndReRequest,
      isShowValidCode: false,
      lastPromotionInputValue: promotionInputValue
    });
    try {
      if (loginStore.isLogin) {
        result = await checkoutStore.updateLoginCart({
          promotionCode: promotionInputValue,
          subscriptionFlag: buyWay === 'frequency',
          isThrowValidPromotionCodeErr: true
        });
      } else {
        result = await checkoutStore.updateUnloginCart({
          promotionCode: promotionInputValue,
          isThrowValidPromotionCodeErr: true
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
              isShowValidCode: false
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
    } catch (err) {
      this.setState({
        validPromotionCodeErrMsg: err.message
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          validPromotionCodeErrMsg: '',
          promotionInputValue: ''
        });
      }, 4000);
    } finally {
      this.setState({
        isClickApply: false,
        promotionInputValue: ''
      });
    }
  };
  handleRemovePromotionCode = async () => {
    const { checkoutStore, loginStore, buyWay } = this.props;
    let { discount } = this.state;
    let result = {};
    // await checkoutStore.removeCouponCodeFitFlag();
    await checkoutStore.removePromotionCode();
    await checkoutStore.removeCouponCode();
    if (!loginStore.isLogin) {
      //游客
      result = await checkoutStore.updateUnloginCart();
    } else {
      //会员
      result = await checkoutStore.updateLoginCart({
        promotionCode: '',
        subscriptionFlag: buyWay === 'frequency'
      });
    }
    this.setState({
      discount: [],
      isShowValidCode: false,
      lastPromotionInputValue: '',
      promotionInputValue: ''
    });
  };
  hanldeToggleOneOffOrSub({ goodsInfoFlag, periodTypeId: frequencyId, pitem }) {
    // goodsInfoFlag 1-订阅 0-单次购买
    // 当前状态与需要切换的状态相同时，直接返回
    if (pitem.goodsInfoFlag) {
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
    const { productList, errorMsg } = this.state;
    const List = this.getProducts(this.state.productList);

    const dogsPic =
      window.__.env.REACT_APP_COUNTRY === 'fr' ? dogsImgFr : dogsImg;
    const catsPic =
      window.__.env.REACT_APP_COUNTRY === 'fr' ? catsImgFr : catsImg;
    return (
      <div className="Carts">
        <Helmet>
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
            {productList.length ? (
              <>
                <div className="rc-layout-container rc-one-column pt-1">
                  <div className="rc-column d-flex">
                    <FormattedMessage id="continueShopping">
                      {(txt) => (
                        <DistributeHubLinkOrATag
                          href=""
                          to="/"
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
                    {window.__.env.REACT_APP_COUNTRY === 'us' && <CartSurvey />}
                  </div>
                  <div className="rc-column totals cart__total pt-0">
                    <div className="rc-padding-bottom--xs">
                      <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                        <FormattedMessage id="orderSummary" />
                      </h5>
                    </div>
                    {this.renderSideCart({
                      fixToHeader: false
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="rc-text-center">
                  <h1 className="rc-beta mb-1 mt-3 text-18">
                    <FormattedMessage id="cart.yourShoppingCart" />
                  </h1>
                  <div className="rc-gamma title-empty mb-0 text-center text-base md:text-2xl">
                    <FormattedMessage id="header.basketEmpty" />
                  </div>
                </div>
                <div className="content-asset">
                  <div className="rc-bg-colour--brand3 rc-padding--sm pt-0 pb-0">
                    <div className="rc-max-width--lg rc-padding-x--lg--mobile">
                      <div>
                        <div className="rc-alpha">
                          <h2 className="text-center text-lg md:text-3xl">
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
          </div>
          {this.state.relatedGoodsList.length > 0 ? (
            <ProductCarousel
              goodsList={this.state.relatedGoodsList}
              onClick={(product) => GACartRecommendedProductClick(product)}
            />
          ) : null}
          <Footer />
        </main>
      </div>
    );
  }
}

export default UnLoginCart;
