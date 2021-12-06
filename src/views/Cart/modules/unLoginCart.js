import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import LoginButton from '@/components/LoginButton';
import { Link } from 'react-router-dom';
import foodDispenserPic from '../../SmartFeederSubscription/img/food_dispenser_pic.png';
import {
  formatMoney,
  getFrequencyDict,
  distributeLinktoPrecriberOrPaymentPage,
  unique,
  cancelPrevRequest,
  getDeviceType,
  handleRecommendation,
  isShowMixFeeding
} from '@/utils/utils';
import {
  GAInitUnLogin,
  GACartScreenLoad,
  GACartChangeSubscription
} from '@/utils/GA';
import { getMixFeedings } from '@/api/details';
import { getGoodsRelationBatch } from '@/api/cart';
import PayProductInfo from '../../Payment/PayProductInfo';
import Loading from '@/components/Loading';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import catsImg from '@/assets/images/banner-list/cats.jpg';
import dogsImg from '@/assets/images/banner-list/dogs.jpg';
import catsImgFr from '@/assets/images/banner-list/cats-fr.png';
import dogsImgFr from '@/assets/images/banner-list/dogs-fr.png';
import { getProductPetConfig } from '@/api/payment';
import BannerTip from '@/components/BannerTip';
import LazyLoad from 'react-lazyload';
import { v4 as uuidv4 } from 'uuid';
import './index.less';
import SubscriptionSelection from '../components/SubscriptionSelection';
import OneOffSelection from '../components/OneOffSelection';
import ClubSelection from '../components/ClubSelection';
import ClubGiftBanner from '../components/ClubGiftBanner';
import ProductCarousel from '@/components/ProductCarousel';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';
import GiftList from '../components/GiftList/index.tsx';
import PromotionCodeText from '../components/PromotionCodeText';
import CartSurvey from '../components/CartSurvey';
import MixFeedingBox from '../components/MixFeedingBox/index.tsx';

const guid = uuidv4();
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const isGift = true;
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const isHubGA = window.__.env.REACT_APP_HUB_GA;
const pageLink = window.location.href;

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
      promotionsVisible: false
    };
    this.amountChanger = this.amountChanger.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.hanldeToggleOneOffOrSub = this.hanldeToggleOneOffOrSub.bind(this);
  }
  get totalNum() {
    return this.state.productList
      .filter((ele) => ele.selected)
      .reduce((pre, cur) => {
        return pre + cur.quantity;
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
    productList.map((el) => {
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
  async componentDidMount() {
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
    GACartScreenLoad();
    GAInitUnLogin({
      productList: this.props.checkoutStore.cartData,
      frequencyList: this.state.frequencyList,
      props: this.props
    });
    this.setCartData({ initPage: true });
  }
  GACheckUnLogin(productList) {
    let product = [],
      basketAmount = this.tradePrice,
      basketID = guid,
      option = '',
      step = 1;
    for (let item of productList) {
      let cur_selected_size = item.sizeList.filter((item2) => {
        return item2.selected == true;
      });
      let variant = cur_selected_size[0].specText;
      let goodsInfoNo = cur_selected_size[0].goodsInfoNo;
      product.push({
        brand: item.brandName || 'ROYAL CANIN',
        // category: item.goodsCateName ? JSON.parse(item.goodsCateName)[0] : '',
        category: item.goodsCateName,
        club: 'no',
        id: item.goodsNo,
        name: item.goodsName,
        price:
          item.goodsInfoFlag == 1
            ? item.minSubscriptionPrice
            : item.minMarketPrice,
        quantity: item.quantity,
        recommendation: 'self-selected',
        type: item.goodsInfoFlag == 1 ? 'subscription' : 'one-time',
        variant: parseInt(variant),
        sku: goodsInfoNo
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
  setCartData({ initPage = false } = {}) {
    !isHubGA && this.GACheckUnLogin(this.props.checkoutStore.cartData);
    const { configStore } = this.props;
    let productList = this.props.checkoutStore.cartData.map((el) => {
      let filterData =
        this.computedList.filter((item) => item.id === el.periodTypeId)[0] ||
        this.computedList[0];
      if (el.goodsInfoFlag) {
        el.form = {
          frequencyVal: filterData.valueEn,
          frequencyName: filterData.name,
          frequencyId:
            filterData.id ||
            el.goods.defaultFrequencyId ||
            configStore.defaultSubscriptionFrequencyId,
          //GA 计算周数
          frequencyType: filterData.type
        };
      } else {
        if (el.promotions?.includes('club')) {
          el.form = {
            frequencyVal: filterData.valueEn,
            frequencyName: filterData.name,
            frequencyId:
              el.goods?.defaultFrequencyId ||
              configStore.info?.storeVO.defaultSubscriptionClubFrequencyId ||
              filterData.id,
            frequencyType: filterData.type
          };
        } else {
          el.form = {
            frequencyVal: filterData.valueEn,
            frequencyName: filterData.name,
            frequencyId:
              el.goods?.defaultFrequencyId ||
              configStore.info?.storeVO.defaultSubscriptionFrequencyId ||
              filterData.id,
            frequencyType: filterData.type
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
    dataLayer.push({
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
    if (!this.btnStatus) {
      return false;
    }
    try {
      this.GAAccessToGuestCheck();
      localItemRoyal.set('okta-redirectUrl', '/cart');
      const { configStore, checkoutStore, history, clinicStore } = this.props;
      this.setState({ checkoutLoading: true });
      await this.updateStock({ isThrowErr: true });
      if (needLogin) {
        // history.push({ pathname: '/login', state: { redirectUrl: '/cart' } })
      } else {
        let autoAuditFlag = false;
        if (this.props.loginStore.isLogin) {
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
        const url = await distributeLinktoPrecriberOrPaymentPage({
          configStore,
          checkoutStore,
          clinicStore,
          isLogin: false
        });
        url && history.push(url);
        // history.push('/prescription');
      }
    } catch (e) {
      console.log(e);
      this.showErrMsg(e.message);
      throw new Error(e);
    } finally {
      this.setState({ checkoutLoading: false });
    }
  }
  amountChanger(item, e) {
    this.handleAmountChange({ val: +e.target.value, item });
  }
  handleAmountChange({ val, item }) {
    let err;
    let { productList } = this.state;
    this.setState({ errorMsg: '' });
    if (val === '') {
      item.quantity = val;
      this.setState({
        productList
      });
    } else {
      const { quantityMinLimit } = this.state;
      let tmp = parseFloat(val);
      if (isNaN(tmp)) {
        tmp = 1;
        err = <FormattedMessage id="cart.errorInfo" />;
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit;
        err = <FormattedMessage id="cart.errorInfo" />;
      }

      // 单个产品总数量不能超过限制
      if (tmp > +window.__.env.REACT_APP_LIMITED_NUM) {
        tmp = +window.__.env.REACT_APP_LIMITED_NUM;
        err = (
          <FormattedMessage
            id="cart.errorMaxInfo"
            values={{ val: window.__.env.REACT_APP_LIMITED_NUM }}
          />
        );
      }

      // 所有产品总数量不能超过限制
      const otherProsNum = productList
        .filter((p) => p.goodsId !== item.goodsId)
        .reduce((pre, cur) => {
          return Number(pre) + Number(cur.quantity);
        }, 0);
      if (
        otherProsNum + tmp >
        +window.__.env.REACT_APP_LIMITED_NUM_ALL_PRODUCT
      ) {
        tmp = +window.__.env.REACT_APP_LIMITED_NUM_ALL_PRODUCT - otherProsNum;
        err = (
          <FormattedMessage
            id="cart.errorAllProductNumLimit"
            values={{ val: window.__.env.REACT_APP_LIMITED_NUM_ALL_PRODUCT }}
          />
        );
      }
      item.quantity = tmp;
      this.setState(
        {
          productList
        },
        () => {
          this.updateStock();
        }
      );
      if (err) {
        this.showErrMsg(err);
      }
    }
  }
  //GA 移除购物车商品 埋点
  GARemoveFromCart(product) {
    if (isHubGA) return;
    const cur_selected_size = product.sizeList.filter((item) => {
      return item.selected == true;
    });
    const variant = cur_selected_size[0].specText;
    const goodsInfoNo = cur_selected_size[0].goodsInfoNo;
    const list = [
      {
        name: product.goodsName,
        id: product.goodsNo,
        club: 'no',
        type: product.goodsInfoFlag == 1 ? 'subscription' : 'one-time',
        price:
          product.goodsInfoFlag == 1
            ? product.minSubscriptionPrice
            : product.minMarketPrice,
        brand: 'Royal Canin',
        category: product.goodsCateName,
        variant: variant,
        quantity: product.quantity ? product.quantity : '',
        recommendation: 'self-selected', //self-selected, recommanded
        sku: goodsInfoNo
      }
    ];
    dataLayer.push({
      event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComRemoveFromCart`,
      ecommerce: {
        remove: {
          products: list
        }
      }
    });
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
        !isHubGA && this.GARemoveFromCart(product);
        isHubGA &&
          dataLayer.push({
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
        isThrowErr,
        minimunAmountPrice: formatMoney(window.__.env.REACT_APP_MINIMUM_AMOUNT),
        intl: this.props.intl
      });
      callback && callback();
      this.getGoodsIdArr(); //删除相关商品
      this.setState({ checkoutLoading: false });
      //增加数量 重新埋点 start
      !isHubGA && this.GACheckUnLogin(this.props.checkoutStore.cartData);
      //增加数量 重新埋点 end
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
    let isGift = !!pitem.subscriptionPlanGiftList;
    return (
      <div
        className="cart-quantity-container"
        // style={{
        //   display: `${isGift ? 'initial' : 'none'}`,
        //   position: 'relative',
        //   top: '1.2rem',
        //   margin: '0 2rem'
        // }}
      >
        <div className="product-card-footer product-card-price d-flex">
          <div
            className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto"
            // style={{ margin: `${isGift ? '0 auto' : 'auto'}` }}
          >
            <div>
              <FormattedMessage id="quantity" />:{' '}
            </div>
            <div className="rc-quantity d-flex">
              <span
                className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                onClick={this.handleAmountChange.bind(this, {
                  val: pitem.quantity - 1,
                  item: pitem
                })}
              />
              <input
                className="rc-quantity__input"
                value={pitem.quantity}
                min="1"
                max="10"
                onChange={this.amountChanger.bind(this, pitem)}
              />
              <span
                className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                data-quantity-error-msg="Вы не можете заказать больше 10"
                onClick={this.handleAmountChange.bind(this, {
                  val: pitem.quantity + 1,
                  item: pitem
                })}
              />
            </div>
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
                  {/* <div className="rc-swatch__item selected">
              <span>
                {find(pitem.sizeList, s => s.selected).specText}
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
                confirm={(e) => this.deleteProduct(pitem)}
                updateChildDisplay={(status) =>
                  this.updateConfirmTooltipVisible(pitem, status)
                }
                content={<FormattedMessage id="confirmDeleteProduct" />}
              />
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
              <div
                className="product-info__img mr-2"
                style={{ overflow: 'hidden' }}
              >
                <LazyLoad>
                  <img
                    className="w-100"
                    src={
                      find(pitem.sizeList, (s) => s.selected).goodsInfoImg ||
                      pitem.goodsImg
                    }
                    alt={pitem.goodsName}
                    title={pitem.goodsName}
                  />
                </LazyLoad>
              </div>
              <div
                className="product-info__desc ui-text-overflow-line2 ui-text-overflow-md-line1 relative"
                style={{ flex: 1 }}
              >
                <Link
                  className="ui-cursor-pointer rc-margin-top--xs rc-padding-right--sm align-items-md-center flex-column flex-md-row"
                  to={`/${pitem.goodsName
                    .toLowerCase()
                    .split(' ')
                    .join('-')
                    .replace('/', '')}-${pitem.goodsNo}`}
                  style={{ marginTop: '0' }}
                >
                  <h4
                    className="rc-gamma rc-margin--none ui-text-overflow-line2 ui-text-overflow-md-line1 d-md-inline-block cart-item-md__tagging_title order-2"
                    title={pitem.goodsName}
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
                        <div className="stock">
                          <label
                            className={[
                              'availability',
                              pitem.addedFlag &&
                              pitem.quantity <=
                                pitem.sizeList.filter((el) => el.selected)[0]
                                  .stock
                                ? 'instock'
                                : 'outofstock'
                            ].join(' ')}
                          >
                            <span className="title-select">
                              {/* <FormattedMessage id="details.availability" /> : */}
                            </span>
                          </label>
                          <span
                            className="availability-msg"
                            style={{ display: 'inline-block' }}
                          >
                            <div
                              className={[
                                pitem.addedFlag &&
                                pitem.quantity <=
                                  pitem.sizeList.filter((el) => el.selected)[0]
                                    .stock
                                  ? ''
                                  : 'out-stock'
                              ].join(' ')}
                            >
                              {pitem.addedFlag &&
                              pitem.quantity <=
                                pitem.sizeList.filter((el) => el.selected)[0]
                                  .stock ? (
                                <FormattedMessage id="details.inStock" />
                              ) : pitem.addedFlag ? (
                                <FormattedMessage id="details.outStock" />
                              ) : (
                                <FormattedMessage id="details.OffShelves" />
                              )}
                            </div>
                          </span>
                          {/* <label className="availability instock">
                        <span className="title-select"></span>
                      </label>
                      <span
                        className="availability-msg"
                        data-ready-to-order="true"
                      >
                        <div>
                          <FormattedMessage id="details.inStock" />
                        </div>
                      </span> */}
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
              className={`buyMethodBox ${
                pitem.sizeList.filter((el) => el.selected)[0]
                  .subscriptionStatus &&
                pitem.sizeList.filter((el) => el.selected)[0].subscriptionPrice
                  ? 'rc-two-column'
                  : ''
              }`}
              style={{ marginLeft: '-1rem', marginRight: '-1rem' }}
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
              {pitem.sizeList.filter((el) => el.selected)[0]
                .subscriptionStatus &&
              pitem.sizeList.filter((el) => el.selected)[0].subscriptionPrice &&
              formatMoney(this.tradePrice) !== '0,00 €' ? (
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
          plist.filter((el) => el.goodsNo === mixFeedings[index].goods.goodsNo)
            .length === 0 ? (
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
            />
          ) : null}

          {pitem.promotions &&
          pitem.promotions.includes('club') &&
          pitem.goodsInfoFlag === 2 &&
          window.__.env.REACT_APP_COUNTRY !== 'ru' ? (
            <ClubGiftBanner intl={this.props.intl} />
          ) : null}
          {isGift &&
            false &&
            pitem.subscriptionPlanGiftList.map((gift) => (
              <div className="d-flex food-dispensor-box rc-border-all gift-text-center-mobile-gift rc-border-colour--interface product-info">
                <div className="name-info flex-column-gift rc-main-content__wrapper d-flex">
                  <img
                    className="img"
                    src={gift.goodsInfoImg || foodDispenserPic}
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
    // 合并购物车，有相同规格的，删除本条
    const tmpIdx = findIndex(
      productList.filter((el, i) => i !== index),
      (ele) =>
        find(ele.sizeList, (s) => s.selected).goodsInfoId ===
        selectedGoodsInfo.goodsInfoId
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
              } rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width`}
              history={this.props.history}
            >
              <FormattedMessage id="checkout" />
            </LoginButton>
          ) : (
            <div
              className={`${
                this.btnStatus ? '' : 'rc-btn-solid-disabled'
              } rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width rc-btn-solid-disabled`}
            >
              <FormattedMessage id="checkout" />
            </div>
          )}
        </div>
        <div className="rc-padding-y--xs rc-column">
          {this.totalNum > 0 ? (
            this.props.checkoutStore.cartData.filter((el) => el.goodsInfoFlag)
              .length > 0 ? (
              <div className="text-center" style={{ fontSize: '.9375rem' }}>
                <FormattedMessage id="unLoginSubscriptionTips" />
              </div>
            ) : window.__.env.REACT_APP_COUNTRY !== 'us' ? (
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
          ) : window.__.env.REACT_APP_COUNTRY !== 'us' ? (
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
    const { checkoutLoading, discount, mobileCartVisibleKey, promotionCode } =
      this.state;
    const { checkoutStore } = this.props;
    const subtractionSign = '-';
    return (
      <div className={`${className}`} style={{ ...style }} id={id}>
        <div
          className="group-order rc-border-colour--interface cart__total__content rc-border-all"
          style={{ background: '#fff' }}
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
              <span
                className="rc-input rc-input--inline rc-input--label mr-0"
                style={{
                  width: '150px',
                  marginBottom: '.625rem',
                  overflow: 'hidden',
                  marginTop: '0px'
                }}
              >
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
            <div className="col-6 no-padding-left mb-4">
              <p className="text-right sub-total">
                <button
                  id="promotionApply"
                  className={`rc-btn rc-btn--sm rc-btn--two mr-0 ${
                    this.state.isClickApply
                      ? 'ui-btn-loading ui-btn-loading-border-red'
                      : ''
                  }`}
                  style={{
                    marginTop: '.625rem',
                    float: 'right',
                    marginBottom: '.625rem'
                  }}
                  onClick={() => this.handleClickPromotionApply(false)}
                >
                  <FormattedMessage id="apply" />
                </button>
              </p>
            </div>
          </div>
          {this.state.isShowValidCode ? (
            <div className="red pl-3 pb-3 pt-2" style={{ fontSize: '.875rem' }}>
              {/* Promotion code({this.state.lastPromotionInputValue}) is not Valid */}
              <FormattedMessage id="validPromotionCode" />
            </div>
          ) : null}
          {!this.state.isShowValidCode &&
            this.state.discount.map((el, i) => (
              <div
                className={`row leading-lines shipping-item d-flex`}
                style={{
                  margin: '.625rem',
                  border: '1px solid #ccc',
                  height: '60px',
                  lineHeight: '60px',
                  overflow: 'hidden'
                }}
                key={i}
              >
                <div
                  className={`${
                    !checkoutStore.couponCodeFitFlag ? 'col-6' : 'col-10'
                  }`}
                >
                  <p
                    style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden'
                    }}
                  >
                    {this.promotionDesc || (
                      <FormattedMessage id="NoPromotionDesc" />
                    )}
                  </p>
                </div>
                <div
                  className={`${
                    !checkoutStore.couponCodeFitFlag ? 'col-4' : 'col-0'
                  } red`}
                  style={{ padding: 0 }}
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
                      className="rc-icon rc-close--sm rc-iconography"
                      style={{
                        fontSize: '1.125rem',
                        marginLeft: '.625rem',
                        lineHeight: '1.25rem',
                        cursor: 'pointer'
                      }}
                      onClick={this.handleRemovePromotionCode}
                    />
                  </p>
                </div>
              </div>
            ))}
          <div className="row">
            <div className="col-6">
              <FormattedMessage id="total2" />
            </div>
            <div className="col-6 no-padding-left mb-4">
              <p className="text-right sub-total">
                {formatMoney(this.totalPrice)}
              </p>
            </div>
          </div>
          {/* 显示 默认折扣 */}
          {parseFloat(this.subscriptionDiscountPrice) > 0 && (
            <div className={`row leading-lines shipping-item green`}>
              <div className="col-6">
                <p>{<FormattedMessage id="promotion" />}</p>
              </div>
              <div className="col-6">
                <p className="text-right shipping-cost mb-4">
                  - {formatMoney(this.subscriptionDiscountPrice)}
                </p>
              </div>
            </div>
          )}
          {/* 显示 promotionCode */}
          <div>
            {!this.state.isShowValidCode &&
              this.promotionVOList?.map((el, i) => (
                <PromotionCodeText el={el} i={i} key={i} />
              ))}
          </div>

          <div className="row">
            <div className="col-8">
              <p>
                <FormattedMessage id="cart.delivery" />
              </p>
            </div>
            <div className="col-4">
              <p className="text-right shipping-cost mb-4">
                {formatMoney(this.deliveryPrice)}
              </p>
            </div>
          </div>

          {/* 运费折扣 */}
          {this.freeShippingFlag ? (
            <div className="row green">
              <div className="col-8">
                <p>
                  <FormattedMessage id="payment.shippingDiscount" />
                </p>
              </div>
              <div className="col-4">
                <p className="text-right shipping-cost mb-4">
                  {this.freeShippingDiscountPrice > 0 && '-'}
                  {formatMoney(this.freeShippingDiscountPrice)}
                </p>
              </div>
            </div>
          ) : null}

          {/*
            customTaxSettingOpenFlag 税额开关 0: 开, 1: 关
            enterPriceType 买入价格开关 0：含税，1：不含税
          */}
          {this.props.configStore?.customTaxSettingOpenFlag == 0 &&
          this.props.configStore?.enterPriceType == 1 ? (
            <div className="row">
              <div className="col-8">
                <p>
                  <FormattedMessage id="estimatedTax" />
                </p>
              </div>
              <div className="col-4">
                <p className="text-right shipping-cost rc_un_login_cart mb-4">
                  {this.taxFeePrice > 0 ? (
                    formatMoney(this.taxFeePrice)
                  ) : (
                    <strong>{subtractionSign}</strong>
                  )}
                </p>
              </div>
            </div>
          ) : null}
          {window.__.env.REACT_APP_COUNTRY === 'us'?<div className="row rc-margin-bottom--xs">
            <div className="col-12 greenColorText text-center">
              <FormattedMessage
                id="cart.firstOrderDiscountTip"
                defaultMessage={' '}
              />
            </div>
          </div>:null}
          

          <div className="group-total">
            <div className="row d-flex align-items-center">
              <div className="col-7 medium">
                <strong>
                  <FormattedMessage id="totalIncluIVA" />
                </strong>
              </div>
              <div className="col-5">
                <p className="text-right grand-total-sum medium mb-0 mb-4">
                  {this.props.configStore?.customTaxSettingOpenFlag == 0 &&
                  this.props.configStore?.enterPriceType == 1 ? (
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
          className: 'hidden rc-md-up',
          style: {
            background: '#fff',
            zIndex: 9,
            width: 320,
            position: 'relative'
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
    const { checkoutStore, loginStore, buyWay, intl } = this.props;
    let { promotionInputValue, discount } = this.state;
    if (!promotionInputValue && !falseCodeAndReRequest) return;

    let result = {};
    this.setState({
      isClickApply: !falseCodeAndReRequest,
      isShowValidCode: false,
      lastPromotionInputValue: promotionInputValue
    });
    if (loginStore.isLogin) {
      result = await checkoutStore.updateLoginCart({
        promotionCode: promotionInputValue,
        subscriptionFlag: buyWay === 'frequency',
        intl
      });
    } else {
      result = await checkoutStore.updateUnloginCart({
        promotionCode: promotionInputValue,
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
    this.setState({
      isClickApply: false,
      promotionInputValue: ''
    });
  };
  handleRemovePromotionCode = async () => {
    const { checkoutStore, loginStore, buyWay, intl } = this.props;
    let { discount } = this.state;
    let result = {};
    // await checkoutStore.removeCouponCodeFitFlag();
    await checkoutStore.removePromotionCode();
    await checkoutStore.removeCouponCode();
    if (!loginStore.isLogin) {
      //游客
      result = await checkoutStore.updateUnloginCart({ intl });
    } else {
      //会员
      result = await checkoutStore.updateLoginCart({
        promotionCode: '',
        subscriptionFlag: buyWay === 'frequency',
        intl
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
    const { productList, errorMsg, goodsIdArr } = this.state;
    const { history, location } = this.props;
    const List = this.getProducts(this.state.productList);

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
        {this.state.checkoutLoading ? (
          <Loading
            bgColor={'#000'}
            opacity={this.state.checkoutLoading ? 0.3 : 1}
          />
        ) : null}
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
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
                          to="/home"
                          className="ui-cursor-pointer-pure"
                        >
                          <span className="rc-header-with-icon rc-header-with-icon--gamma">
                            <span className="rc-icon rc-left rc-iconography rc-icon-btnback" />
                            {txt}
                          </span>
                        </DistributeHubLinkOrATag>
                      )}
                    </FormattedMessage>
                  </div>
                </div>
                <div className="rc-layout-container rc-three-column cart cart-page pt-0">
                  <div className="rc-column rc-double-width pt-0">
                    {errorMsg ? (
                      <div className="rc-padding-bottom--xs cart-error-messaging cart-error">
                        <aside
                          className="rc-alert rc-alert--error rc-alert--with-close text-break"
                          role="alert"
                        >
                          <span className="pl-0">{errorMsg}</span>
                        </aside>
                      </div>
                    ) : null}
                    <div className="rc-padding-bottom--xs">
                      <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                        <FormattedMessage id="cart.yourShoppingCart" />
                      </h5>
                    </div>
                    <div id="product-cards-container">{List}</div>
                    <div id="product-cards-container">
                      {this.giftList.map((el) => (
                        <GiftList pitem={el} />
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
                  <h1
                    className="rc-beta mb-1 mt-3"
                    style={{ fontSize: '18px' }}
                  >
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

export default UnLoginCart;
