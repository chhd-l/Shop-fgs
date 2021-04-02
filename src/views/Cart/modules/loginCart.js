import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { toJS } from 'mobx';
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
  getParaByName
} from '@/utils/utils';
import {
  GAInitLogin,
  GACartScreenLoad,
  GACartChangeSubscription
} from '@/utils/GA';
import find from 'lodash/find';
import Selection from '@/components/Selection';
import cartImg from './images/cart.png';
import {
  updateBackendCart,
  deleteItemFromBackendCart,
  switchSize
} from '@/api/cart';
import { getProductPetConfig } from '@/api/payment';
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
import { v4 as uuidv4 } from 'uuid';
import Club_Logo from '@/assets/images/Logo_club.png';
import Carousel from '../components/Carousel';

const guid = uuidv4();
import foodDispenserPic from '../../SmartFeederSubscription/img/food_dispenser_pic.png';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const isHubGA = process.env.REACT_APP_HUB_GA;

const storeInfo = JSON.parse(sessionItemRoyal.get('storeContentInfo'));
// 税额开关 0: 开, 1: 关
const customTaxSettingOpenFlag = storeInfo?.customTaxSettingOpenFlag;
// 买入价格开关 0：含税，1：不含税
const enterPriceType =
  storeInfo?.systemTaxSetting?.configVOList &&
  storeInfo?.systemTaxSetting?.configVOList[1]?.context;

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
      circleLoading: false
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.hanldeToggleOneOffOrSub = this.hanldeToggleOneOffOrSub.bind(this);
    this.handleChooseSize = this.handleChooseSize.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.subQuantity = this.subQuantity.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  async componentDidMount() {
    if (localItemRoyal.get('rc-iframe-from-storepotal')) {
      this.setState({ circleLoading: true });
    }

    this.getGoodsIdArr();
    const {
      history: {
        location: { search }
      }
    } = this.props;

    await getFrequencyDict().then((res) => {
      this.setState({
        frequencyList: res,
        form: Object.assign(this.state.form, {
          frequencyVal:
            process.env.REACT_APP_FREQUENCY_VAL || res[0] ? res[0].valueEn : '',
          frequencyName:
            process.env.REACT_APP_FREQUENCY_NAME || res[0] ? res[0].name : '',
          frequencyId:
            (process.env.REACT_APP_FREQUENCY_ID &&
              parseInt(process.env.REACT_APP_FREQUENCY_ID)) ||
            res[0]
              ? res[0].id
              : ''
        })
      });
    });

    // 合并购物车(登录后合并非登录态的购物车数据)
    const unloginCartData = this.checkoutStore.cartData;
    if (unloginCartData.length) {
      await mergeUnloginCartData();
      await this.checkoutStore.updateLoginCart();
    }

    if (isHubGA) {
      GAInitLogin({
        productList: this.props.checkoutStore.loginCartData,
        frequencyList: this.state.frequencyList,
        props: this.props
      });
      GACartScreenLoad();
    }
    this.setData();

    //给代客下单用 start
    if (localItemRoyal.get('rc-iframe-from-storepotal')) {
      let timer = null;
      timer = setInterval(async () => {
        if (this.props.checkoutStore.loginCartData.length) {
          clearInterval(timer);
          await this.updateCartCache();
          this.handleCheckout();
        }
      }, 1000);
    }
    //给代客下单用 end
  }
  componentWillUnmount() {}
  get loginCartData() {
    return this.props.checkoutStore.loginCartData;
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

  get btnStatus() {
    const { productList } = this.state;
    let autoShipFlag = false,
      clubFlag = false;
    productList.map((el) => {
      if (el.goods.promotions && el.goods.promotions.includes('club')) {
        clubFlag = true;
      } else if (
        el.goods.promotions &&
        el.goods.promotions.includes('autoship')
      ) {
        autoShipFlag = true;
      }
    });
    return !(clubFlag && autoShipFlag);
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
        minimunAmountPrice: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
      });
      callback && callback();
      this.setData();
    } catch (err) {
      if (isThrowErr) {
        console.log(err);
        throw new Error(err.message);
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
  setData() {
    const { configStore } = this.props;
    console.log(configStore.defaultSubscriptionFrequencyId, '🌏');
    //每次数据变化调用
    !isHubGA && this.GACheckout(this.checkoutStore.loginCartData);
    let productList = this.checkoutStore.loginCartData.map((el) => {
      let filterData =
        this.computedList.filter((item) => item.id === el.periodTypeId)[0] ||
        this.computedList[0];
      el.form = {
        frequencyVal: filterData.valueEn,
        frequencyName: filterData.name,
        frequencyId: configStore.defaultSubscriptionFrequencyId || filterData.id
      };
      return el;
    });
    this.setState({
      productList,
      checkoutLoading: false,
      initLoading: false
    });
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
    this.setState({ checkoutLoading: true });
    await deleteItemFromBackendCart(param);
    await this.updateCartCache();
  }
  handleCheckout = async () => {
    try {
      const { configStore, checkoutStore, history, clinicStore } = this.props;
      const { productList } = this.state;
      this.setState({ checkoutLoading: true });
      await this.updateCartCache({ isThrowErr: true });

      this.checkoutStore.setLoginCartData(productList);
      let autoAuditFlag = false;
      let res = await getProductPetConfig({
        goodsInfos: checkoutStore.loginCartData
      });
      let handledData = checkoutStore.loginCartData.map((el, i) => {
        const tmpGoodsInfo = res.context.goodsInfos[i];
        if (tmpGoodsInfo) {
          el.auditCatFlag = tmpGoodsInfo['auditCatFlag'];
          el.prescriberFlag = tmpGoodsInfo['prescriberFlag'];
        }
        return el;
      });
      checkoutStore.setLoginCartData(handledData);
      let AuditData = handledData.filter((el) => el.auditCatFlag);
      checkoutStore.setAuditData(AuditData);
      autoAuditFlag = res.context.autoAuditFlag;
      checkoutStore.setAutoAuditFlag(autoAuditFlag);
      checkoutStore.setPetFlag(res.context.petFlag);
      const url = await distributeLinktoPrecriberOrPaymentPage({
        configStore,
        checkoutStore,
        clinicStore,
        isLogin: true
      });

      if (localItemRoyal.get('rc-iframe-from-storepotal')) {
        this.setState({ circleLoading: false });
        this.props.checkoutStore.changeFromStorePortal(true);
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
  handleAmountChange(item, e) {
    this.setState({
      errorMsg: ''
    });
    const val = e.target.value;
    if (val === '') {
      item.buyCount = val;
      this.setState({
        productList: this.state.productList
      });
    } else {
      const { quantityMinLimit } = this.state;
      let tmp = parseFloat(val);
      if (isNaN(tmp)) {
        tmp = 1;
        this.showErrMsg(<FormattedMessage id="cart.errorInfo" />);
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit;
        this.showErrMsg(<FormattedMessage id="cart.errorInfo" />);
      }
      if (tmp > process.env.REACT_APP_LIMITED_NUM) {
        tmp = process.env.REACT_APP_LIMITED_NUM;
      }
      item.buyCount = tmp;
      clearTimeout(this.amountTimer);
      this.amountTimer = setTimeout(() => {
        this.updateBackendCart({
          goodsInfoId: item.goodsInfoId,
          goodsNum: item.buyCount,
          verifyStock: false
        });
      }, 500);
    }
  }
  addQuantity(item) {
    if (this.state.checkoutLoading) {
      return;
    }
    this.setState({ errorMsg: '' });
    if (item.buyCount < process.env.REACT_APP_LIMITED_NUM) {
      item.buyCount++;
      this.updateBackendCart({
        goodsInfoId: item.goodsInfoId,
        goodsNum: item.buyCount,
        verifyStock: false
      });
    } else {
      this.showErrMsg(
        <FormattedMessage
          id="cart.errorMaxInfo"
          values={{ val: process.env.REACT_APP_LIMITED_NUM }}
        />
      );
    }
  }
  subQuantity(item) {
    if (this.state.checkoutLoading) {
      return;
    }
    this.setState({ errorMsg: '' });
    if (item.buyCount > 1) {
      item.buyCount--;
      this.updateBackendCart({
        goodsInfoId: item.goodsInfoId,
        goodsNum: item.buyCount,
        verifyStock: false
      });
    } else {
      this.showErrMsg(<FormattedMessage id="cart.errorInfo" />);
    }
  }
  //GA 移除购物车商品 埋点
  GARemoveFromCart(product) {
    console.log(product);
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
    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComRemoveFromCart`,
      ecommerce: {
        remove: {
          products: list
        }
      }
    });
    console.log(dataLayer);
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
      dataLayer.push({
        event: 'removeFromCart'
      });
  }
  getQuantityBox = (pitem) => {
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
            <div className="rc-quantity d-flex">
              <span
                className=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                onClick={this.subQuantity.bind(this, pitem)}
              />
              <input
                className="rc-quantity__input"
                value={pitem.buyCount}
                min="1"
                max="10"
                onChange={this.handleAmountChange.bind(this, pitem)}
              />
              <span
                className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                data-quantity-error-msg="Вы не можете заказать больше 10"
                onClick={this.addQuantity.bind(this, pitem)}
              ></span>
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
                        <div className="text-left ml-1">{sItem.specName}:</div>
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
    let { form } = this.state;
    const Lists = plist.map((pitem, index) => {
      {
        var isGift = !!pitem.subscriptionPlanGiftList;
      }
      return (
        <div className="product-info ">
          <div
            className={`rc-border-all rc-border-colour--interface product-info p-3 rc-padding-bottom--none--mobile
            ${isGift ? 'no-margin-bottom' : 'has-margin-bottom'}`}
            key={index}
          >
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
              <div
                className="product-info__img w-100 mr-2"
                style={{ overflow: 'hidden' }}
              >
                <LazyLoad>
                  <img
                    className="w-100"
                    src={pitem.goodsInfoImg}
                    alt={pitem.goodsName}
                    title={pitem.goodsName}
                  />
                </LazyLoad>
              </div>
              <div className="product-info__desc w-100 relative">
                <div className="line-item-header rc-margin-top--xs rc-padding-right--sm">
                  <Link
                    className="ui-cursor-pointer"
                    to={`/${pitem.goodsName
                      .toLowerCase()
                      .split(' ')
                      .join('-')
                      .replace('/', '')}-${pitem.goods.goodsNo}`}
                  >
                    <h4
                      className="rc-gamma rc-margin--none ui-text-overflow-line2 text-break"
                      title={pitem.goodsName}
                    >
                      {pitem.goodsName}
                    </h4>
                  </Link>
                </div>
                <span className="remove-product-btn">
                  <span
                    className="rc-icon rc-close--sm rc-iconography"
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
                  />
                </span>
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
                        className="stock"
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
                        <span
                          className="availability-msg"
                          style={{ display: 'inline-block' }}
                        >
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
              className={`buyMethodBox ${
                pitem.subscriptionStatus && pitem.subscriptionPrice
                  ? 'rc-two-column'
                  : ''
              }`}
              style={{ marginLeft: '-1rem', marginRight: '-1rem' }}
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
              {pitem.subscriptionStatus && pitem.subscriptionPrice ? (
                <div className="rc-column  rc-padding-left--none--desktop">
                  {!pitem.goods.promotions ||
                  !pitem.goods.promotions.includes('club') ? (
                    <SubscriptionSelection
                      isGift={isGift}
                      pitem={pitem}
                      activeToolTipIndex={this.state.activeToolTipIndex}
                      index={index}
                      toolTipVisible={this.state.toolTipVisible}
                      computedList={this.computedList}
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
                      computedList={this.computedList}
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
          {pitem.goods.promotions && pitem.goods.promotions.includes('club') ? (
            <div
              className="d-flex club-box rc-border-all gift-text-center-mobile-gift rc-border-colour--interface product-info"
              style={{ marginTop: '-1.5rem' }}
            >
              <div className="name-info flex-column-gift d-flex">
                <img className="img" src={foodDispenserPic} />
              </div>
              <div className="logo-info text-center">
                <img
                  style={{ display: 'inline-block' }}
                  src={Club_Logo}
                  alt="Club-logo"
                />
              </div>
              <div className="tips-info mobile-text-center">
                <ul>
                  <li className="rc-list__item">
                    <strong>Best-in-class nutrition</strong> for your pet
                  </li>
                  <li className="rc-list__item">
                    <strong>Adapted tips</strong> to care for your pet
                  </li>
                  <li className="rc-list__item">
                    Your personal <strong>Pet advisor</strong>
                  </li>
                  <li className="rc-list__item">
                    Exclusive <strong>rewards & offers</strong>
                  </li>
                  <li className="rc-list__item">
                    <strong>Free, automatic delivery</strong> on every refill
                  </li>
                </ul>
                {/* You can cancel your subscription anytime, but you will have to
                pay the remaining balance of the dispenser market price of 120
                euros.* */}
              </div>
            </div>
          ) : null}
          {isGift &&
            pitem.subscriptionPlanGiftList.map((gift) => (
              <div className="d-flex food-dispensor-box rc-border-all gift-text-center-mobile-gift rc-border-colour--interface">
                <div className="name-info flex-column-gift rc-main-content__wrapper d-flex">
                  <img
                    className="img"
                    src={gift.goodsInfoImg || foodDispenserPic}
                    alt="goodsInformationImage"
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
    console.log({ item });
    console.log({ status });
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
            <span
              className="rc-input rc-input--inline rc-input--label mr-0"
              style={{
                width: '150px',
                marginBottom: '.625rem',
                overflow: 'hidden'
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
          <div className="col-6 no-padding-left">
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
                onClick={this.handleClickPromotionApply}
              >
                <FormattedMessage id="apply" />
              </button>
            </p>
          </div>
        </div>
        {isShowValidCode ? (
          <div className="red pl-3 pb-3 pt-2" style={{ fontSize: '.875rem' }}>
            <FormattedMessage id="validPromotionCode" />
          </div>
        ) : null}
        {!isShowValidCode &&
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
                <p>
                  {!checkoutStore.couponCodeFitFlag && (
                    <FormattedMessage id="Non appliqué" />
                  )}
                </p>
              </div>
              <div className="col-2" style={{ padding: '0 .9375rem 0 0' }}>
                <p className="text-right shipping-cost">
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
          <div className="col-6 no-padding-left">
            <p className="text-right sub-total text-nowrap">
              {formatMoney(this.totalPrice)}
            </p>
          </div>
        </div>
        {/* 显示订阅折扣 */}
        {/* <div
          className={`row leading-lines shipping-item green ${
            parseFloat(this.subscriptionPrice) > 0 ? 'd-flex' : 'hidden'
          }`}
        >
          <div className="col-8">
            <p>{this.promotionDesc || <FormattedMessage id="promotion" />}</p>
          </div>
          <div className="col-4">
            <p className="text-right shipping-cost">
              - {formatMoney(this.subscriptionPrice)}
            </p>
          </div>
        </div> */}
        {/* 显示 默认折扣 */}
        {parseFloat(this.subscriptionDiscountPrice) > 0 && (
          <div className={`row leading-lines shipping-item green`}>
            <div className="col-8">
              <p>{<FormattedMessage id="promotion" />}</p>
            </div>
            <div className="col-4">
              <p className="text-right shipping-cost text-nowrap">
                <strong>-{formatMoney(this.subscriptionDiscountPrice)}</strong>
              </p>
            </div>
          </div>
        )}

        {/* 显示 promotionCode */}
        {!isShowValidCode &&
          this.promotionVOList?.map((el) => (
            <div className={`row leading-lines shipping-item green d-flex`}>
              <div className="col-6">
                <p>
                  {/* {this.promotionDesc || (
                        <FormattedMessage id="NoPromotionDesc" />
                      )} */}
                  {/* <FormattedMessage id="promotion" /> */}
                  {el.marketingName}
                </p>
              </div>
              <div className="col-6">
                <p className="text-right shipping-cost text-nowrap">
                  {/* - {formatMoney(this.discountPrice)} */}
                  <strong>-{formatMoney(el.discountPrice)}</strong>
                </p>
              </div>
            </div>
          ))}

        {/* <div
          className={`row red ${
            parseInt(this.discountPrice) > 0 ? 'd-flex' : 'hidden'
          }`}
        >
          <div className="col-8">
            <p>
              {this.promotionDesc}({this.promotionDiscount})
            </p>
          </div>
          <div className="col-4">
            <p className="text-right shipping-cost">
              - {formatMoney(this.discountPrice)}
            </p>
          </div>
        </div> */}
        <div className="row">
          <div className="col-8">
            <p>
              <FormattedMessage id="cart.delivery" />
            </p>
          </div>
          <div className="col-4">
            <p className="text-right shipping-cost text-nowrap">
              {formatMoney(this.deliveryPrice)}
            </p>
          </div>
        </div>

        {/* 税额 */}
        {customTaxSettingOpenFlag == 0 && enterPriceType == 1 ? (
          <div className="row">
            <div className="col-8">
              <p>
                <FormattedMessage id="estimatedTax" />
              </p>
            </div>
            <div className="col-4">
              <p className="text-right shipping-cost text-nowrap">
                {customTaxSettingOpenFlag == 0 && enterPriceType == 1 ? (
                  <strong>{subtractionSign}</strong>
                ) : (
                  formatMoney(this.taxFeePrice)
                )}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="group-total">
          <div className="row d-flex align-items-center">
            <div className="col-7 medium">
              <strong>
                <FormattedMessage id="totalIncluIVA" />
              </strong>
            </div>
            <div className="col-5">
              <p className="text-right grand-total-sum medium mb-0 text-nowrap">
                {customTaxSettingOpenFlag == 0 && enterPriceType == 1 ? (
                  <strong>{subtractionSign}</strong>
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
              <span>Order summary</span>
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
  async handleChooseSize(sdItem, pitem) {
    if (sdItem.isEmpty) {
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
    // this.clearPromotionCode();
    this.props.checkoutStore.removePromotionCode();
    await switchSize({
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
    this.setState({
      discount: [],
      isShowValidCode: false,
      lastPromotionInputValue: '',
      promotionInputValue: ''
    });
  }
  async changeFrequencyType(pitem) {
    if (this.state.checkoutLoading) {
      return false;
    }
    this.setState({
      checkoutLoading: true
    });
    // await this.handleRemovePromotionCode();
    // this.clearPromotionCode();
    this.props.checkoutStore.removePromotionCode();
    await switchSize({
      purchaseId: pitem.purchaseId,
      goodsInfoId: pitem.goodsInfoId,
      goodsInfoFlag: pitem.goodsInfoFlag,
      periodTypeId: pitem.periodTypeId
    });

    await this.updateCartCache(this.clearPromotionCode.bind(this));
    this.setState({ checkoutLoading: false });
  }
  handleRemovePromotionCode = async () => {
    const { checkoutStore, loginStore, buyWay } = this.props;
    let { discount } = this.state;
    let result = {};
    await checkoutStore.removePromotionCode();
    // await checkoutStore.removeCouponCodeFitFlag();
    if (loginStore.isLogin) {
      result = await checkoutStore.updateLoginCart({
        promotionCode: '',
        subscriptionFlag: buyWay === 'frequency'
      });
    } else {
      result = await checkoutStore.updateUnloginCart();
    }
    this.clearPromotionCode();
  };
  handleClickPromotionApply = async () => {
    const { checkoutStore, loginStore, buyWay } = this.props;
    let { promotionInputValue, discount } = this.state;
    console.log(promotionInputValue, loginStore.isLogin, 'promotionCode');
    if (!promotionInputValue) return;
    let result = {};
    let lastPromotionInputValue = promotionInputValue;
    this.setState({
      isClickApply: true,
      isShowValidCode: false,
      lastPromotionInputValue,
      discount: []
    });
    if (loginStore.isLogin) {
      result = await checkoutStore.updateLoginCart({
        promotionCode: lastPromotionInputValue,
        subscriptionFlag: buyWay === 'frequency'
      });
    } else {
      result = await checkoutStore.updateUnloginCart({
        promotionCode: lastPromotionInputValue
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
        this.setState({
          isShowValidCode: false,
          promotionInputValue: ''
        });
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
    const { productList, initLoading, errorMsg, goodsIdArr } = this.state;
    const { history, location } = this.props;
    const List = this.getProducts(productList);
    const dogsPic = process.env.REACT_APP_LANG === 'fr' ? dogsImgFr : dogsImg;
    const catsPic = process.env.REACT_APP_LANG === 'fr' ? catsImgFr : catsImg;
    return (
      <div className="Carts">
        {this.state.circleLoading ? (
          <Loading bgColor={'#fff'} opacity={1} />
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
                      </div>
                      <div className="rc-column totals cart__total pt-0">
                        <div className="rc-padding-bottom--xs">
                          <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                            <FormattedMessage id="orderSummary" />
                          </h5>
                        </div>
                        {this.renderSideCart({
                          // fixToHeader: process.env.REACT_APP_LANG !== 'fr'
                          fixToHeader: false
                        })}
                      </div>
                    </div>
                  </>
                )}
                {productList.length === 0 && !initLoading && (
                  <>
                    <div className="rc-text-center">
                      <div className="rc-beta mb-1 mt-3">
                        <FormattedMessage id="cart.yourShoppingCart" />
                      </div>
                      <div className="rc-gamma title-empty mb-0">
                        <FormattedMessage id="header.basketEmpty" />
                      </div>
                    </div>
                    <div className="content-asset">
                      <div className="rc-bg-colour--brand3 rc-padding--sm pt-0 pb-0">
                        <div className="rc-max-width--lg rc-padding-x--lg--mobile">
                          <div>
                            <div className="rc-alpha inherit-fontsize">
                              <p className="text-center">
                                <FormattedMessage id="cart.fullPrice" />
                              </p>
                            </div>
                            <div
                              className="d-flex justify-content-between flex-wrap ui-pet-item text-center"
                              // style={{ margin: '0 10%' }}
                              style={
                                process.env.REACT_APP_LANG === 'fr'
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
                                      alt="Dog"
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
                                      alt="Cat"
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
          {goodsIdArr.length > 0 ? (
            <Carousel
              location={location}
              history={history}
              goodsId={goodsIdArr}
              key="cart-recommendation"
            />
          ) : null}
          <Footer />
        </main>
      </div>
    );
  }
}

export default LoginCart;
