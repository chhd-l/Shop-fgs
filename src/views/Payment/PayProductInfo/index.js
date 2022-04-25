import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import {
  formatMoney,
  getFrequencyDict,
  getClubLogo,
  formatDate
} from '@/utils/utils';
import { GAInitUnLogin, GAInitLogin, GACheckoutScreenLoad } from '@/utils/GA';
import LazyLoad from 'react-lazyload';
import { v4 as uuidv4 } from 'uuid';
import './index.css';
import FrequencyMatch from '@/components/FrequencyMatch';
import WelcomeBox from '../WelcomeBox';
import PromotionCodeText from './components/promotionCodeText';
import GiftList from '../GiftList/index.tsx';
import { isFirstOrder } from '@/api/user';
import cloneDeep from 'lodash/cloneDeep';
import { IMG_DEFAULT } from '@/utils/constant';
import { nextTick } from 'process';
import LoyaltyPoint from './components/loyaltyPoint';
import cn from 'classnames';
import { PriceDetailsList } from './components';
import { NOTUSEPOINT } from '../PaymentMethod/paymentMethodsConstant';

const guid = uuidv4();
let isGACheckoutLock = false;
const isHubGA = window.__.env.REACT_APP_HUB_GA;
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const isFromFelin = sessionItemRoyal.get('appointment-no');

@inject(
  'checkoutStore',
  'loginStore',
  'paymentStore',
  'clinicStore',
  'configStore'
)
@injectIntl
@observer
class PayProductInfo extends React.Component {
  static defaultProps = {
    operateBtnVisible: false,
    fixToHeader: false,
    style: {},
    className: '',
    onClickHeader: () => {},
    headerIcon: null,
    currentPage: '',
    guestEmail: '',
    isGuestCart: false,
    isCheckOut: false,
    deliveryAddress: [],
    welcomeBoxChange: () => {} //welcomeBoxValue值改变事件
  };
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      needHideProductList: props.needHideProductList,
      discount: [], //促销码的折扣信息汇总
      promotionInputValue: this.props.checkoutStore.promotionCode || '', //输入的促销码
      lastPromotionInputValue: '', //上一次输入的促销码
      isClickApply: false, //是否点击apply按钮
      isShowValidCode: false, //是否显示无效promotionCode
      frequencyList: [],
      isFirstOrder: false, //是否是首单
      isStudentPurchase: false //是否填写了学生购student promotion 50% discount
    };
    this.handleClickProName = this.handleClickProName.bind(this);
  }
  get isPromotionCodeInputFocus() {
    return this.props.checkoutStore.promotionCodeInputFocus;
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get totalCount() {
    return formatMoney(
      this.state.productList.reduce(
        (total, item) => total + item.currentAmount,
        0
      )
    );
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let productList;
    if (
      (JSON.stringify(nextProps.data) !==
        JSON.stringify(this.state.productList) &&
        this.props.data.length) ||
      isFromFelin
    ) {
      productList = nextProps.data;
      let list = cloneDeep(productList);
      // 有产品的时候才去展示产品列表，兼容chekcout page获取产品（比如felin appointNo）ga执行
      if (list?.length) {
        !isHubGA && this.GACheck(list);
        isHubGA && this.GAInitialProductArray(list);
      }
      this.setState(
        Object.assign({
          productList: productList || []
        })
      );
    }
  }
  //会员 GA需要的product信息
  GAGetProductLogin(productList) {
    let product = [];
    for (let item of productList) {
      let productItem = {
        brand: (item.goods && item.goods.brandName) || 'ROYAL CANIN',
        club: 'no',
        id: (item.goods && item.goods.goodsNo) || '',
        name: (item.goods && item.goods.goodsName) || '',
        price:
          item.goodsInfoFlag == 1 ? item.subscriptionPrice : item.salePrice,
        quantity: item.buyCount,
        recommendation: 'self-selected',
        type: item.goodsInfoFlag == 1 ? 'subscription' : 'one-time',
        variant: item.specText ? parseInt(item.specText) : '',
        sku: (item.goodsInfos && item.goodsInfos[0].goodsInfoNo) || ''
      };
      if (isFromFelin) {
        // felin特殊处理
        productItem.range = 'Booking';
        productItem.name = "L'Atelier Félin booking";
        productItem.mainItemCode = "L'Atelier Félin booking";
      }
      product.push(productItem);
    }
    return product;
  }
  //游客 GA需要的product信息
  GAGetProductUnlogin(productList) {
    let product = [];
    for (let item of productList) {
      let cur_selected_size =
        item.sizeList?.filter((item2) => {
          return item2.selected == true;
        }) || [];
      let variant = cur_selected_size[0]?.specText;
      let goodsInfoNo = cur_selected_size[0]?.goodsInfoNo;
      let productItem = {
        brand: item.brandName || 'ROYAL CANIN',
        category: item.goodsCateName,
        club: 'no',
        id: item.goodsNo,
        name: item.goodsName,
        price: item.minMarketPrice,
        quantity: item.quantity,
        recommendation: 'self-selected',
        type: 'one-time',
        variant: parseInt(variant),
        sku: goodsInfoNo
      };
      if (isFromFelin) {
        // felin特殊处理
        productItem.range = 'Booking';
        productItem.name = "L'Atelier Félin booking";
        productItem.mainItemCode = "L'Atelier Félin booking";
      }
      product.push(productItem);
    }
    return product;
  }

  //Hub-GA checkout页面初始化
  GAInitialProductArray(productList) {
    if (this.props.currentPage != 'checkout') return; //只允许checkout页面才调用
    let type = '';
    if (isFromFelin) {
      type = 'felin';
    }
    if (!isGACheckoutLock) {
      //防止重复调用
      isGACheckoutLock = true;
      let params = {
        productList,
        frequencyList: this.state.frequencyList,
        props: this.props,
        type,
        isReturnList: true
      };

      this.isLogin
        ? GACheckoutScreenLoad(() => GAInitLogin(params))
        : GACheckoutScreenLoad(() => GAInitUnLogin(params));
    }
  }

  // GA Checkout
  GACheck(productList) {
    if (
      !isGACheckoutLock &&
      window?.dataLayer &&
      dataLayer[0] &&
      dataLayer[0].checkout
    ) {
      //防止重复调用
      isGACheckoutLock = true;
      let product = this.isLogin
        ? this.GAGetProductLogin(productList)
        : this.GAGetProductUnlogin(productList);

      dataLayer[0].checkout.basketAmount = this.tradePrice;
      dataLayer[0].checkout.basketID = guid;
      dataLayer[0].checkout.option = this.isLogin
        ? 'account already created'
        : 'new account';
      dataLayer[0].checkout.step = 2;
      dataLayer[0].checkout.product = product;

      window?.dataLayer?.push({
        checkout: {
          step: '',
          option: ''
        },
        event: window.__.env.REACT_APP_GTM_SITE_ID + 'virtualPageView',
        page: {
          type: 'Checkout',
          virtualPageURL: '/checkout/emailAddress'
        }
      });
    }
  }
  async componentDidMount() {
    //监听Point组件选择积分的时候触发删除coupon
    reaction(
      () => this.props.checkoutStore.selectDiscountWay,
      () => {
        if (this.props.checkoutStore.promotionCode) {
          this.handleClickDeletePromotion();
        }
      }
    );
    //
    if (this.isLogin) {
      //判断该会员是否是第一次下单
      isFirstOrder().then((res) => {
        if (res.context == 0) {
          this.setState({ isFirstOrder: true });
        }
      });
    }
    this.refs.applyButtton.click();
    let productList;

    if (this.props.data.length) {
      productList = this.props.data;
      if (isFromFelin) {
        // felin是异步请求的数据，这里单独处理
        !isHubGA && this.GACheck(productList);
        isHubGA && this.GAInitialProductArray(productList);
      }
    } else if (this.isLogin) {
      productList = this.props.checkoutStore.loginCartData;
    } else {
      productList = this.props.checkoutStore.cartData.filter(
        (ele) => ele.selected
      );
    }

    this.setState(
      Object.assign({
        productList: productList || []
      })
    );
    await getFrequencyDict().then((res) => {
      this.setState({
        frequencyList: res
      });
    });
    if (productList.length && !isFromFelin) {
      !isHubGA && this.GACheck(productList);
      isHubGA && this.GAInitialProductArray(productList);
    }
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
  get promotionVOList() {
    return this.props.checkoutStore.promotionVOList;
  }
  get giftList() {
    return this.props.checkoutStore.giftList || [];
  }
  getProducts(plist) {
    const List = plist.map((el, i) => {
      let selectedSizeItem = el.sizeList.filter((item) => item.selected)[0];
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <LazyLoad>
                  <img
                    className="product-image"
                    src={
                      find(el.sizeList, (s) => s.selected).goodsInfoImg ||
                      IMG_DEFAULT
                    }
                    alt="product image"
                  />
                </LazyLoad>
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div
                    className="line-item-name ui-text-overflow-line2 text-break"
                    title={el.goodsName}
                    onClick={this.handleClickProName.bind(this, el)}
                  >
                    <span className="light">{el.goodsName}</span>
                    {window.__.env.REACT_APP_COUNTRY !== 'ru' &&
                    el.promotions &&
                    el?.goodsInfoFlag > 0 &&
                    el.promotions.includes('club') ? (
                      <img
                        className="clubLogo"
                        src={getClubLogo({ goodsInfoFlag: el.goodsInfoFlag })}
                        alt="club logo"
                      />
                    ) : null}
                  </div>
                </div>
                <div className="line-item-total-price justify-content-start pull-left">
                  <div className="item-attributes">
                    <p className="line-item-attributes">
                      <FormattedMessage
                        id="quantityText"
                        values={{
                          specText: selectedSizeItem.specText || '',
                          buyCount: el.quantity
                        }}
                      />
                    </p>
                  </div>
                </div>
                <div className="line-item-total-price justify-content-end pull-right">
                  <div>
                    {formatMoney(
                      el.sizeList.filter((el) => el.selected)[0][
                        'marketPrice'
                      ] * el.quantity
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="item-options"></div>
          </div>
        </div>
      );
    });
    return List;
  }
  isSubscription(el) {
    return el.goodsInfoFlag && el.goodsInfoFlag != 3;
  }
  handleClickProName(item) {
    sessionItemRoyal.set('recomment-preview', this.props.location.pathname);
    this.props.history.push(
      `/${item?.goodsName
        ?.toLowerCase()
        .split(' ')
        .join('-')
        .replace('/', '')}-${item?.goodsNo}`
    );
  }
  getProductsForLogin(plist) {
    let paramsString = sessionItemRoyal.get('nutrition-recommendation-filter');
    let IndvPetInfo = {};
    if (paramsString) {
      let recommendateInfo = JSON.parse(paramsString);
      IndvPetInfo = recommendateInfo.customerPetsVo;
    }
    // 线下店数量展示和正常流程有区别（没区别）
    let orderSource = sessionItemRoyal.get('orderSource') && false;

    const List = plist.map((el, i) => {
      // 是否是订阅产品
      const isSubscription = this.isSubscription(el);
      const renderAutoshipSavedtipContent = () => {
        // 如果不是订阅状态 或者是订阅状态并且是日本并且价格一致不显示
        if (
          !isSubscription ||
          (window.__.env.REACT_APP_COUNTRY === 'jp' &&
            el.salePrice === el.subscriptionPrice)
        ) {
          return null;
        }
        return (
          <div>
            <span
              className="iconfont font-weight-bold green"
              style={{ fontSize: '.8em' }}
            >
              &#xe675;
            </span>
            <FormattedMessage
              id="cart.autoshipSavedtip"
              values={{
                discount: (
                  <span className="green">
                    {formatMoney(
                      el.buyCount * el.salePrice -
                        el.buyCount * el.subscriptionPrice
                    )}
                  </span>
                )
              }}
            />
          </div>
        );
      };
      const renderPriceContent = () => {
        // 如果不是订阅状态 或者是订阅状态并且是日本并且价格一致不显示
        let topContent =
          !isSubscription ||
          (window.__.env.REACT_APP_COUNTRY === 'jp' &&
            el.salePrice === el.subscriptionPrice) ? null : (
            <>
              <span className="text-line-through">
                {formatMoney(el.buyCount * el.salePrice)}
              </span>
              <br />
            </>
          );
        const endContent = formatMoney(
          isSubscription
            ? el.buyCount * el.subscriptionPrice
            : el.buyCount * el.salePrice
        );
        return (
          <div className="line-item-total-price text-nowrap">
            {topContent}
            <span>{endContent}</span>
          </div>
        );
      };
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <img
                  className="product-image"
                  src={el.goodsInfoImg || IMG_DEFAULT}
                  alt="product image"
                />
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div
                    className="line-item-name ui-text-overflow-line2 text-break"
                    title={
                      el?.goodsInfoFlag === 3 ? (
                        <FormattedMessage
                          id="subscription.personalized"
                          values={{ val1: IndvPetInfo?.name }}
                        />
                      ) : (
                        el.goodsName || el.goods.goodsName
                      )
                    }
                  >
                    <span className="light 11111">
                      {el?.goodsInfoFlag === 3 ? (
                        <FormattedMessage
                          id="subscription.personalized"
                          values={{ val1: IndvPetInfo?.name }}
                        />
                      ) : (
                        el.goodsName || el.goods.goodsName
                      )}
                    </span>
                    {el?.goods?.promotions &&
                    el?.goodsInfoFlag > 0 &&
                    el.goods.promotions.includes('club') ? (
                      <img
                        className="clubLogo"
                        src={getClubLogo({ goodsInfoFlag: el.goodsInfoFlag })}
                        alt="club logo"
                      />
                    ) : null}
                  </div>
                </div>
                {isFromFelin ? (
                  <div className="d-flex flex-column">
                    <span>
                      {el.expertName} – {el.minutes}
                      <FormattedMessage id="min" /> – {el.appointType}
                    </span>
                    <span>
                      <FormattedMessage id="Appointment time" />
                    </span>
                    <span>
                      {el.appointStartTime
                        ? formatDate({
                            date: el.appointStartTime,
                            formatOption: {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            }
                          })
                        : ''}
                    </span>
                  </div>
                ) : null}

                <div
                  className={`${
                    isFromFelin
                      ? 'justify-content-end'
                      : 'justify-content-between'
                  } d-flex align-items-center`}
                >
                  {!isFromFelin ? (
                    <div
                      className="line-item-total-price"
                      style={{ width: '77%' }}
                    >
                      <p className="mb-0">
                        {orderSource === 'L_ATELIER_FELIN' ? (
                          `${10 * el.buyCount}g`
                        ) : (
                          <FormattedMessage
                            id="quantityText"
                            values={{
                              specText: el.specText,
                              buyCount: el.goodsInfoFlag === 3 ? 1 : el.buyCount
                            }}
                          />
                        )}
                      </p>
                      {el.goodsInfoFlag ? (
                        <p className="mb-0">
                          <FormattedMessage id="subscription.frequencyDelivery" />
                          <FormattedMessage id="subscription.deliveryEvery" />{' '}
                          <FrequencyMatch currentId={el.periodTypeId} />
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {renderPriceContent()}
                </div>
                {renderAutoshipSavedtipContent()}
              </div>
            </div>
            <div className="item-options" />
          </div>
        </div>
      );
    });
    return List;
  }
  handleClickPromotionApply = async (falseCodeAndReRequest) => {
    let { discount } = this.state;
    try {
      let result = {};
      if (!this.state.promotionInputValue && !falseCodeAndReRequest) return;
      this.setState({
        isClickApply: !falseCodeAndReRequest,
        isShowValidCode: false,
        lastPromotionInputValue: this.state.promotionInputValue
      });
      // 确认 promotionCode 后使用之前的参数查询一遍 purchase 接口
      let purchasesPara =
        localItemRoyal.get('rc-payment-purchases-param') || {};
      purchasesPara.promotionCode = this.state.promotionInputValue;
      purchasesPara.purchaseFlag = false; // 购物车: true，checkout: false
      purchasesPara.address1 = this.props.deliveryAddress?.address1;
      const tmpParam = Object.assign(purchasesPara, {
        ...this.props
      });

      if (!this.isLogin) {
        purchasesPara.guestEmail = this.props.guestEmail;
        //游客
        result = await this.props.checkoutStore.updateUnloginCart(tmpParam);
      } else {
        purchasesPara.subscriptionFlag = this.props.buyWay === 'frequency';
        //会员
        result = await this.props.checkoutStore.updateLoginCart(tmpParam);
      }

      console.log(result);
      // debugger;

      if (!result?.context?.promotionFlag || result?.context?.couponCodeFlag) {
        //表示输入apply promotionCode成功
        discount.splice(0, 1, 1); //(起始位置,替换个数,插入元素)
        this.setState({ discount });
        this.props.sendPromotionCode(this.state.promotionInputValue);
        this.setState({
          isStudentPurchase: result.context.promotionSubType === 8
        });
        if (result.context.promotionSubType === 8) {
          this.props.welcomeBoxChange('no');
        }
      } else {
        this.setState({
          isShowValidCode: true
        });
        this.props.sendPromotionCode('');
        this.setState({ isStudentPurchase: false });
        setTimeout(() => {
          this.setState({
            isShowValidCode: false
          });
        }, 5000);
      }
      this.setState(
        {
          isClickApply: false,
          promotionInputValue: localItemRoyal.get('rc-promotionCode')
        },
        () => {
          result.code === 'K-000000' && this.handleClickPromotionApply(true);
        }
      );
    } catch (err) {
      console.info('....', err);
      // debugger;
      this.setState({
        isClickApply: false
      });
    }
  };
  handleClickDeletePromotion = async () => {
    try {
      const { checkoutStore } = this.props;
      const { discount } = this.state;
      let result = {};
      await checkoutStore.removePromotionCode();
      await checkoutStore.removeCouponCode();
      // 删除掉之后 promotionCode 后再使用之前的参数查询一遍 purchase接口
      let purchasesPara =
        localItemRoyal.get('rc-payment-purchases-param') || {};
      purchasesPara.promotionCode = '';
      const param = Object.assign(purchasesPara, {
        intl: this.props.intl
      });
      if (!this.props.loginStore.isLogin) {
        // 游客
        result = await checkoutStore.updateUnloginCart(param);
      } else {
        purchasesPara.subscriptionFlag = this.props.buyWay === 'frequency';
        // 会员
        result = await checkoutStore.updateLoginCart(param);
      }
      discount.pop();
      this.props.sendPromotionCode('');
      this.setState({
        discount: [],
        isShowValidCode: false,
        lastPromotionInputValue: '',
        promotionInputValue: '',
        isStudentPurchase: false
      });
    } catch (err) {
      console.log(err);
    }
  };
  getTotalItems() {
    const { headerIcon } = this.props;
    const { productList } = this.state;
    let quantityKeyName = 'quantity';
    if (this.isLogin || this.props.data.length) {
      quantityKeyName = 'buyCount';
    }
    return (
      <div
        className="product-summary__itemnbr border-bottom d-flex align-items-center justify-content-between md:pl-3 md:pr-3 pt-2 pb-2 md:pt-3 md:pb-3"
        onClick={this.props.onClickHeader}
      >
        {headerIcon}
        <span className="medium">
          {window.__.env.REACT_APP_COUNTRY === 'us' && this.props.isCheckOut ? (
            <FormattedMessage
              id="payment.totalProduct2"
              values={{
                val:
                  productList[0]?.goodsInfoFlag === 3
                    ? 1
                    : productList.reduce(
                        (total, item) => total + item[quantityKeyName],
                        0
                      )
              }}
            />
          ) : (
            <FormattedMessage
              id="payment.totalProduct"
              values={{
                val:
                  productList[0]?.goodsInfoFlag === 3 || isFromFelin
                    ? 1
                    : productList.reduce(
                        (total, item) => total + item[quantityKeyName],
                        0
                      )
              }}
            />
          )}
        </span>
        {/*goodsInfoFlag为3的时候是indv需要隐藏edit按钮*/}
        {!localItemRoyal.get('rc-iframe-from-storepotal') &&
        this.props.operateBtnVisible &&
        productList[0]?.goodsInfoFlag != 3 &&
        !isFromFelin ? (
          <Link
            to="/cart"
            className="font-medium hover:underline hover:text-rc-red"
          >
            <FormattedMessage id="edit2" />
          </Link>
        ) : null}

        {/* from-frlin的时候需要将edit换成re-book按钮 */}
        {isFromFelin ? (
          <Link
            to="/felin"
            className="product-summary__cartlink rc-styled-link"
          >
            <FormattedMessage id="re-book" />
          </Link>
        ) : null}
      </div>
    );
  }
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const {
      productList,
      discount,
      needHideProductList,
      isShowValidCode,
      isFirstOrder,
      isStudentPurchase
    } = this.state;
    const { checkoutStore } = this.props;
    const { installMentParam } = checkoutStore;
    const List =
      this.isLogin || this.props.data.length
        ? this.getProductsForLogin(productList)
        : this.getProducts(productList);

    return (
      <div
        className={`product-summary__inner ${className}`}
        style={{ ...style }}
        id={id}
      >
        <div className="product-summary__recap mt-0 mb-0 222">
          {this.getTotalItems()}
          <div className="product-summary__recap__content">
            <div className="checkout--padding">
              {/* <div style={{ padding: '1.25rem 0' }}> */}
              {!needHideProductList && List}
              {this.giftList.map((el, i) => (
                <GiftList {...this.props} pitem={el} key={i} />
              ))}
              {/*新增First Order Welcome Box:1、会员 2、首单 3、未填写学生购student promotion 50% discount*/}
              {!!+window.__.env.REACT_APP_SHOW_CHECKOUT_WELCOMEBOX &&
              this.isLogin &&
              isFirstOrder &&
              !isStudentPurchase ? (
                <WelcomeBox
                  welcomeBoxChange={(value) => {
                    this.props.welcomeBoxChange(value);
                  }}
                />
              ) : null}
              {/* 支付新增promotionCode(选填) */}
              <div className="mb-3 d-flex justify-content-between items-center">
                <span
                  className="rc-input rc-input--inline rc-input--label mr-0"
                  style={{ width: '150px' }}
                >
                  <FormattedMessage id="promotionCode">
                    {(txt) => (
                      <input
                        className="rc-input__control"
                        id="id-promotionCode"
                        type="text"
                        autocomplete="off"
                        name="text"
                        placeholder={txt}
                        value={this.state.promotionInputValue}
                        onChange={this.handlerChange}
                        style={{ background: '#eee' }}
                      />
                    )}
                  </FormattedMessage>

                  <label
                    className="rc-input__label"
                    htmlFor="id-promotionCode"
                  />
                </span>
                <div className="promo-code-submit">
                  <button
                    ref="applyButtton"
                    id="promotionApply"
                    className={`rc-btn rc-btn--md rc-btn--two ${
                      this.state.isClickApply
                        ? 'ui-btn-loading ui-btn-loading-border-red'
                        : ''
                    }`}
                    disabled={sessionItemRoyal.get('recommend_product')}
                    style={{ marginTop: '5px', float: 'right' }}
                    onClick={() => this.handleClickPromotionApply(false)}
                  >
                    <FormattedMessage id="apply" />
                  </button>
                </div>
              </div>
              {isShowValidCode ? (
                <div className="red" style={{ fontSize: '.875rem' }}>
                  <FormattedMessage id="validPromotionCode" />
                </div>
              ) : null}
              {!isShowValidCode &&
                this.state.discount.map((el) => (
                  <>
                    <div
                      className={`row leading-lines shipping-item d-flex`}
                      style={{
                        border: '1px solid #ccc',
                        height: '60px',
                        lineHeight: '60px',
                        overflow: 'hidden',
                        marginBottom: '.625rem'
                      }}
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
                      <div
                        className="col-2"
                        style={{ padding: '0 .9375rem 0 0' }}
                      >
                        <p className="text-right shipping-cost">
                          <span
                            className="rc-icon rc-close--sm rc-iconography"
                            style={{
                              fontSize: '1.125rem',
                              marginLeft: '.625rem',
                              lineHeight: '1.25rem',
                              cursor: 'pointer'
                            }}
                            onClick={this.handleClickDeletePromotion}
                          />
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              <div className="product-summary__fees order-total-summary">
                <PriceDetailsList
                  data={{
                    totalPrice: this.totalPrice,
                    taxFeePrice: this.taxFeePrice,
                    subscriptionDiscountPrice: this.subscriptionDiscountPrice,
                    deliveryPrice: this.deliveryPrice,
                    freeShippingDiscountPrice: this.freeShippingDiscountPrice,
                    freeShippingFlag: this.freeShippingFlag,
                    promotionVOList: this.promotionVOList,
                    isShowValidCode,
                    installMentParam
                  }}
                />
              </div>
            </div>
          </div>

          <div className="product-summary__total px-5 grand-total row leading-lines border-top md:pl-3 md:pr-3 pt-2 pb-2 md:pt-3 md:pb-3">
            <div className="col-6 start-lines">
              <span>
                <FormattedMessage id="totalIncluIVA" />
              </span>
            </div>
            <div className="col-6 end-lines text-right">
              <span className="grand-total-sum">
                {formatMoney(this.tradePrice)}
              </span>
            </div>
          </div>

          {window.__.env.REACT_APP_COUNTRY == 'de' ? (
            <div
              style={{
                fontSize: '.75rem',
                paddingLeft: '1.375rem',
                paddingBottom: '.625rem',
                color: '#999',
                marginTop: '-5px'
              }}
            >
              {<FormattedMessage id="totalIncluMessage" />}
            </div>
          ) : null}

          {/* show Loyalty point */}
          <LoyaltyPoint />
        </div>
      </div>
    );
  }
  handlerChange = (e) => {
    let promotionInputValue = e.target.value;
    this.setState(
      {
        promotionInputValue
      },
      () => {
        this.props.sendPromotionCode(this.state.promotionInputValue);
      }
    );
  };
  render() {
    const { className, fixToHeader, style } = this.props;
    return fixToHeader ? (
      <div
        className="rc-bg-colour--brand3"
        style={{ ...style }}
        id="J_sidecart_container"
      >
        {/* 法国环境不加固定定位 */}
        {this.sideCart({
          className: 'hidden rc-md-up',
          style: {
            background: '#fff',
            zIndex: 9,
            width: 345,
            maxHeight: '88vh',
            overflowY: 'auto',
            position: 'relative'
          },
          id: 'J_sidecart_fix'
        })}
        {this.sideCart()}
      </div>
    ) : (
      <div className={className} style={{ ...style }}>
        {this.sideCart()}
      </div>
    );
  }
}

export default PayProductInfo;
