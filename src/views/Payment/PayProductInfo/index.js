import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import { formatMoney, getFrequencyDict, getClubLogo } from '@/utils/utils';
import { GAInitUnLogin, GAInitLogin } from '@/utils/GA';
import LazyLoad from 'react-lazyload';
import { v4 as uuidv4 } from 'uuid';
import './index.css';
import FrequencyMatch from '@/components/FrequencyMatch';
import WelcomeBox from '../WelcomeBox';
import GiftList from '../GiftList/index.tsx';
import { isFirstOrder } from '@/api/user';
const guid = uuidv4();
let isGACheckoutLock = false;
const isHubGA = window.__.env.REACT_APP_HUB_GA;

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
@inject(
  'checkoutStore',
  'loginStore',
  'paymentStore',
  'clinicStore',
  'configStore'
)
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
      JSON.stringify(nextProps.data) !==
        JSON.stringify(this.state.productList) &&
      this.props.data.length
    ) {
      productList = nextProps.data;
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
      product.push({
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
      });
    }
    return product;
  }
  //游客 GA需要的product信息
  GAGetProductUnlogin(productList) {
    let product = [];
    for (let item of productList) {
      let cur_selected_size = item.sizeList.filter((item2) => {
        return item2.selected == true;
      });
      let variant = cur_selected_size[0].specText;
      let goodsInfoNo = cur_selected_size[0].goodsInfoNo;
      product.push({
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
      });
    }
    return product;
  }

  //Hub-GA checkout页面初始化
  GAInitialProductArray(productList) {
    if (this.props.currentPage != 'checkout') return; //只允许checkout页面才调用
    if (!isGACheckoutLock) {
      //防止重复调用
      isGACheckoutLock = true;
      this.isLogin
        ? GAInitLogin({
            productList,
            frequencyList: this.state.frequencyList,
            props: this.props
          })
        : GAInitUnLogin({
            productList,
            frequencyList: this.state.frequencyList,
            props: this.props
          });
    }
  }

  // GA Checkout
  GACheck(productList) {
    if (!isGACheckoutLock && dataLayer[0] && dataLayer[0].checkout) {
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

      dataLayer.push({
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
    } else if (this.isLogin) {
      productList = this.props.checkoutStore.loginCartData;
    } else {
      productList = this.props.checkoutStore.cartData.filter(
        (ele) => ele.selected
      );
    }
    // productList.map(el=>{el.goodsInfoFlag=3})
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

    !isHubGA && this.GACheck(productList);
    isHubGA && this.GAInitialProductArray(productList);
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
                    src={find(el.sizeList, (s) => s.selected).goodsInfoImg}
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
                          specText: selectedSizeItem.specText,
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
    // goodsInfoFlag =3作为indv 不需要展示划线价格
    return el.goodsInfoFlag && el.goodsInfoFlag != 3;
  }
  handleClickProName(item) {
    sessionItemRoyal.set('recomment-preview', this.props.location.pathname);
    // this.props.history.push(
    //   `/details/${
    //     this.isLogin ? item.goodsInfoId : item.sizeList[0].goodsInfoId
    //   }`
    // );
    this.props.history.push(
      `/${item.goodsName.toLowerCase().split(' ').join('-').replace('/', '')}-${
        item.goodsNo
      }`
    );
  }
  getProductsForLogin(plist) {
    let paramsString = sessionItemRoyal.get('nutrition-recommendation-filter');
    let IndvPetInfo = {};
    if (paramsString) {
      let recommendateInfo = JSON.parse(paramsString);
      IndvPetInfo = recommendateInfo.customerPetsVo;
    }
    // 线下店数量展示和正常流程有区别
    let orderSource = sessionItemRoyal.get('orderSource');
    const List = plist.map((el, i) => {
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <img
                  className="product-image"
                  src={el.goodsInfoImg}
                  alt="product image"
                />
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div
                    className="line-item-name ui-text-overflow-line2 text-break"
                    title={
                      el?.goodsInfoFlag == 3 ? (
                        // ? `${IndvPetInfo?.name}'s personalized subscription`
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
                      {el?.goodsInfoFlag == 3 ? (
                        // ? `${IndvPetInfo?.name}'s personalized subscription`
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
                <div className="d-flex align-items-center justify-content-between">
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
                            specText:
                              // el.goodsInfoFlag == 3
                              //   ? (window.__.env.REACT_APP_COUNTRY == 'fr'
                              //       ? (el.buyCount / 1000)
                              //           .toString()
                              //           .replace('.', ',')
                              //       : el.buyCount / 1000) + ' kg '
                              //   : el.specText,
                              el.specText,
                            buyCount: el.goodsInfoFlag == 3 ? 1 : el.buyCount
                          }}
                        />
                      )}
                    </p>
                    {el.goodsInfoFlag ? (
                      <p className="mb-0">
                        <FormattedMessage id="subscription.frequency" />{' '}
                        <FrequencyMatch currentId={el.periodTypeId} />
                        {/* {el.goodsInfoFlag == 3 ? (
                          '30 days'
                        ) : (
                          <FrequencyMatch currentId={el.periodTypeId} />
                        )} */}
                      </p>
                    ) : null}
                  </div>
                  <div className="line-item-total-price text-nowrap">
                    {this.isSubscription(el) ? (
                      <>
                        <span className="text-line-through">
                          {formatMoney(el.buyCount * el.salePrice)}
                        </span>
                        <br />
                      </>
                    ) : null}
                    <span>
                      {formatMoney(
                        this.isSubscription(el)
                          ? el.buyCount * el.subscriptionPrice
                          : el.buyCount * el.salePrice
                      )}
                    </span>
                  </div>
                </div>
                {this.isSubscription(el) ? (
                  <div>
                    <span
                      className="iconfont font-weight-bold green"
                      style={{ fontSize: '.8em' }}
                    >
                      &#xe675;
                    </span>{' '}
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
                    {/* <FormattedMessage id="confirmation.subscriptionDiscountPriceDes" values={{
                      val1:(
                        <span className="green">
                          {formatMoney(
                            el.buyCount * el.salePrice -
                              el.buyCount * el.subscriptionPrice
                          )}
                        </span>
                      )
                    }}/> */}
                  </div>
                ) : null}
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
      console.log('------- ', purchasesPara);
      if (!this.isLogin) {
        purchasesPara.guestEmail = this.props.guestEmail;
        //游客
        result = await this.props.checkoutStore.updateUnloginCart(
          purchasesPara
        );
      } else {
        purchasesPara.subscriptionFlag = this.props.buyWay === 'frequency';
        //会员
        result = await this.props.checkoutStore.updateLoginCart(purchasesPara);
      }

      if (!result.context.promotionFlag || result.context.couponCodeFlag) {
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
          promotionInputValue: ''
        },
        () => {
          result.code === 'K-000000' && this.handleClickPromotionApply(true);
        }
      );
    } catch (err) {
      console.info('....', err);
      debugger;
      this.setState({
        isClickApply: false
      });
    }
  };
  getTotalItems() {
    const { headerIcon } = this.props;
    const { productList } = this.state;
    console.info('productList', productList);
    let quantityKeyName = 'quantity';
    if (this.isLogin || this.props.data.length) {
      quantityKeyName = 'buyCount';
    }
    return (
      <div
        className="product-summary__itemnbr border-bottom d-flex align-items-center justify-content-between pl-md-3 pr-md-3 pt-2 pb-2 pt-md-3 pb-md-3"
        onClick={this.props.onClickHeader}
      >
        {headerIcon}
        <span className="medium">
          {window.__.env.REACT_APP_COUNTRY == 'us' && this.props.isCheckOut ? (
            <FormattedMessage
              id="payment.totalProduct2"
              values={{
                val:
                  productList[0]?.goodsInfoFlag == 3
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
                  productList[0]?.goodsInfoFlag == 3
                    ? 1
                    : productList.reduce(
                        (total, item) => total + item[quantityKeyName],
                        0
                      )
              }}
            />
          )}
        </span>
        {/* goodsInfoFlag为3的时候是indv需要隐藏edit按钮 */}
        {!localItemRoyal.get('rc-iframe-from-storepotal') &&
        this.props.operateBtnVisible &&
        productList[0]?.goodsInfoFlag != 3 ? (
          <Link to="/cart" className="product-summary__cartlink rc-styled-link">
            <FormattedMessage id="edit2" />
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
    const subtractionSign = '-';
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
              {this.giftList.map((el) => (
                <GiftList pitem={el} />
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
              <div className="mb-3 d-flex justify-content-between">
                <span
                  className="rc-input rc-input--inline rc-input--label mr-0"
                  style={{ width: '150px' }}
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
                        style={{ background: '#eee' }}
                      />
                    )}
                  </FormattedMessage>

                  <label className="rc-input__label" htmlFor="id-text2" />
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
                    style={{ marginTop: '5px', float: 'right' }}
                    onClick={() => this.handleClickPromotionApply(false)}
                  >
                    <FormattedMessage id="apply" />
                  </button>
                </div>
              </div>
              {isShowValidCode ? (
                <div className="red" style={{ fontSize: '.875rem' }}>
                  {/* Promotion code({this.state.lastPromotionInputValue}) is not Valid */}
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
                            onClick={async () => {
                              let result = {};
                              await checkoutStore.removePromotionCode();
                              await checkoutStore.removeCouponCode();
                              // 删除掉之后 promotionCode 后再使用之前的参数查询一遍 purchase接口
                              let purchasesPara =
                                localItemRoyal.get(
                                  'rc-payment-purchases-param'
                                ) || {};
                              purchasesPara.promotionCode = '';
                              if (!this.props.loginStore.isLogin) {
                                // 游客
                                result = await checkoutStore.updateUnloginCart(
                                  purchasesPara
                                );
                              } else {
                                purchasesPara.subscriptionFlag =
                                  this.props.buyWay === 'frequency';
                                // 会员
                                result = await checkoutStore.updateLoginCart(
                                  purchasesPara
                                );
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
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  </>
                ))}

              <div className="product-summary__fees order-total-summary">
                <div className="row leading-lines subtotal-item">
                  <div className="col-8 start-lines">
                    <p className="order-receipt-label">
                      <span>
                        <FormattedMessage id="total2" />
                      </span>
                    </p>
                  </div>
                  <div className="col-4 end-lines">
                    <p className="text-right">
                      <span className="sub-total">
                        {formatMoney(this.totalPrice)}
                      </span>
                    </p>
                  </div>
                </div>
                {/* 显示订阅折扣 */}
                {/* <div
                  className="row leading-lines shipping-item"
                  style={{
                    display:
                      parseFloat(this.subscriptionPrice) > 0 ? 'flex' : 'none'
                  }}
                >
                  <div className="col-7 start-lines">
                    <p
                      className="order-receipt-label order-shipping-cost"
                      style={{ color: '#ec001a' }}
                    >
                      {this.promotionDesc || (
                        <FormattedMessage id="promotion" />
                      )}
                    </p>
                  </div>
                  <div className="col-5 end-lines">
                    <p className="text-right">
                      <span
                        className="shipping-total-cost red"
                        style={{ color: '#ec001a' }}
                      >
                        - {formatMoney(this.subscriptionPrice)}
                      </span>
                    </p>
                  </div>
                </div> */}
                {/* 显示 默认折扣 */}
                <div
                  className={`row leading-lines shipping-item green ${
                    parseFloat(this.subscriptionDiscountPrice) > 0
                      ? 'd-flex'
                      : 'hidden'
                  }`}
                >
                  <div className="col-7 start-lines">
                    <p className="order-receipt-label order-shipping-cost">
                      <span>
                        <FormattedMessage id="promotion" />
                      </span>
                    </p>
                  </div>
                  <div className="col-5 end-lines">
                    <p className="text-right">
                      <span className="shipping-total-cost">
                        <strong>
                          -{formatMoney(this.subscriptionDiscountPrice)}
                        </strong>
                      </span>
                    </p>
                  </div>
                </div>

                {/* 显示 promotionCode */}
                {!isShowValidCode
                  ? this.promotionVOList?.map((el, i) => (
                      <div
                        className="row leading-lines shipping-item green"
                        key={i}
                      >
                        <div className="col-7 start-lines">
                          <p className="order-receipt-label order-shipping-cost">
                            {el.marketingName}
                          </p>
                        </div>
                        <div className="col-5 end-lines">
                          <p className="text-right">
                            <span className="shipping-total-cost">
                              <strong>-{formatMoney(el.discountPrice)}</strong>
                            </span>
                          </p>
                        </div>
                      </div>
                    ))
                  : null}

                {/* 显示 delivereyPrice */}
                <div className="row leading-lines shipping-item">
                  <div className="col-7 start-lines">
                    <p className="order-receipt-label order-shipping-cost">
                      <span>
                        <FormattedMessage id="cart.delivery" />
                      </span>
                    </p>
                  </div>
                  <div className="col-5 end-lines">
                    <p className="text-right">
                      <span className="shipping-total-cost">
                        {formatMoney(this.deliveryPrice)}
                      </span>
                    </p>
                  </div>
                </div>

                {/* 运费折扣 俄罗斯 */}
                {this.freeShippingFlag ? (
                  <div className="row leading-lines shipping-item green">
                    <div className="col-7 start-lines">
                      <p className="order-receipt-label order-shipping-cost">
                        <span>
                          <FormattedMessage id="payment.shippingDiscount" />
                        </span>
                      </p>
                    </div>
                    <div className="col-5 end-lines">
                      <p className="text-right">
                        <span className="shipping-total-cost">
                          {this.freeShippingDiscountPrice > 0 && '-'}
                          {formatMoney(this.freeShippingDiscountPrice)}
                        </span>
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
                  <div className="row leading-lines shipping-item">
                    <div className="col-7 start-lines">
                      <p className="order-receipt-label order-shipping-cost">
                        <span>
                          <FormattedMessage id="estimatedTax" />
                        </span>
                      </p>
                    </div>
                    <div className="col-5 end-lines">
                      <p className="text-right">
                        <span className="shipping-total-cost rc_pay_product_info">
                          {!this.isLogin &&
                          window.__.env.REACT_APP_COUNTRY == 'us' ? (
                            <>
                              {/* 是否在cart页面 */}
                              {this.props.isGuestCart && subtractionSign}
                              {/* 是否在checkout页面 */}
                              {this.props.isCheckOut &&
                              this.props.deliveryAddress?.address1 == '' ? (
                                <>
                                  <strong>{subtractionSign}</strong>
                                </>
                              ) : (
                                <>{formatMoney(this.taxFeePrice)}</>
                              )}
                            </>
                          ) : (
                            <>{formatMoney(this.taxFeePrice)}</>
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                ) : null}

                {!this.isLogin &&
                this.props.isGuestCart &&
                window.__.env.REACT_APP_COUNTRY == 'us' ? (
                  <>
                    <div
                      class="row rc-margin-bottom--xs"
                      style={{ marginBottom: '0', marginTop: '1rem' }}
                    >
                      <div
                        class="col-12 greenColorText text-center"
                        style={{ padding: '0' }}
                      >
                        <span>
                          <FormattedMessage
                            id="cart.firstOrderDiscountTip"
                            defaultMessage={' '}
                          />
                        </span>
                      </div>
                    </div>
                  </>
                ) : null}

                {/* 分期明细 */}
                {installMentParam ? (
                  <div className="row leading-lines shipping-item red">
                    <div className="col-7 start-lines">
                      <p className="order-receipt-label order-shipping-cost">
                        <FormattedMessage id="installMent.additionalFee" />
                      </p>
                    </div>
                    <div className="col-5 end-lines">
                      <p className="text-right">
                        <span className="shipping-total-cost">
                          <strong>
                            {formatMoney(installMentParam.additionalFee)}
                          </strong>
                        </span>
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="product-summary__total grand-total row leading-lines border-top pl-md-3 pr-md-3 pt-2 pb-2 pt-md-3 pb-md-3">
            <div className="col-6 start-lines">
              <span>
                <FormattedMessage id="totalIncluIVA" />
              </span>
            </div>
            <div className="col-6 end-lines text-right">
              <span className="grand-total-sum">
                {/* 是否登录 */}
                {!this.isLogin && window.__.env.REACT_APP_COUNTRY == 'us' ? (
                  <>
                    {/* 是否在cart页面 */}
                    {this.props.isGuestCart && (
                      <>
                        {this.props.configStore?.customTaxSettingOpenFlag ==
                          0 && this.props.configStore?.enterPriceType == 1 ? (
                          <strong>{subtractionSign}</strong>
                        ) : (
                          formatMoney(this.tradePrice)
                        )}
                      </>
                    )}
                    {/* 是否在checkout页面 */}
                    {this.props.isCheckOut &&
                    this.props.deliveryAddress?.address1 == '' ? (
                      <>
                        <strong>{subtractionSign}</strong>
                      </>
                    ) : (
                      <>{formatMoney(this.tradePrice)}</>
                    )}
                  </>
                ) : (
                  <>{formatMoney(this.tradePrice)}</>
                )}
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

          {/* {this.state.isShowValidCode ? (
            <div className="red pl-3 pb-3 border-top pt-2">
              Promotion code({this.state.lastPromotionInputValue}) is not Valid
            </div>
          ) : null} */}
        </div>
      </div>
    );
  }
  handlerChange = (e) => {
    let promotionInputValue = e.target.value;
    this.setState({
      promotionInputValue
    });
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
