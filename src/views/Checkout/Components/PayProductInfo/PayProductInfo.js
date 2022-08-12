import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import {
  formatMoney,
  getFrequencyDict,
  getClubLogo,
  formatDate,
  isMobile
} from '@/utils/utils';
import { GAInitUnLogin, GAInitLogin, GACheckoutScreenLoad } from '@/utils/GA';
import { v4 as uuidv4 } from 'uuid';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import cn from 'classnames';
import {
  PriceDetailsList,
  ProductDetailItem,
  LoyaltyPoint,
  ProductCatogeryItemBox,
  ProductCatogeryTitle,
  EditCartBtn,
  PromotionCode
} from './components';
import { DivWrapper } from './style';

const guid = uuidv4();
let isGACheckoutLock = false;
const isHubGA = window.__.env.REACT_APP_HUB_GA;
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const isFromFelin = sessionItemRoyal.get('appointment-no');

const countTotalBuyCounts = (list) => {
  return list.reduce(
    (total, item) => total + (item.goodsInfoFlag === 3 ? 1 : item.buyCount),
    0
  );
};

@inject('checkoutStore', 'loginStore', 'paymentStoreNew')
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
    confirmCalculateServiceFeeAndLoyaltyPoints: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      needHideProductList: props.needHideProductList,
      frequencyList: [],
      cartDetailVisible: isMobile ? false : true,
      // pc minimize logic:
      // 若存在一次+订阅 -> 展示一个一次+一个订阅
      // 若只存在一次，不存在订阅 -> 展示最多两个一次
      // 若只存在订阅，不存在一次 -> 展示最多两个订阅
      // gift不展示
      cartMinimized: false
    };
    this.toggleMobileCartFlod = this.toggleMobileCartFlod.bind(this);
    this.togglePCCartFlod = this.togglePCCartFlod.bind(this);
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get isIndv() {
    return this.state.productList[0]?.goodsInfoFlag === 3;
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
      let variant = item?.specText;
      let goodsInfoNo = item?.goodsInfoNo;
      let productItem = {
        brand: (item.goods && item.goods.brandName) || 'ROYAL CANIN',
        category: item?.goods?.goodsCateName,
        club: 'no',
        id: (item.goods && item.goods.goodsNo) || '',
        name: (item.goods && item.goods.goodsName) || '',
        price: item.minMarketPrice,
        quantity: item.buyCount,
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
  get promotionVOList() {
    return this.props.checkoutStore.promotionVOList;
  }
  get giftList() {
    return this.props.checkoutStore.giftList || [];
  }
  toggleMobileCartFlod() {
    this.setState((cur) => ({
      cartDetailVisible: !cur.cartDetailVisible
    }));
  }
  togglePCCartFlod() {
    this.setState((cur) => ({
      cartMinimized: !cur.cartMinimized
    }));
  }
  isSubscription(el) {
    return el.goodsInfoFlag && el.goodsInfoFlag != 3;
  }
  renderProducts(plist) {
    const { cartMinimized } = this.state;

    // 将单次购买、订阅购买分开
    const singleProducts = plist.filter((p) => !this.isSubscription(p));
    const SingleList = this.renderItemList(singleProducts);

    const subProducts = plist.filter((p) => this.isSubscription(p));
    const SubscriptionList = this.renderItemList(subProducts);
    const subTotleSaved = subProducts.reduce((prev, cur) => {
      return (
        prev +
        cur.buyCount * cur.subscriptionPrice -
        cur.buyCount * cur.salePrice
      );
    }, 0);

    // 若存在一次+订阅 -> 展示一个一次+一个订阅
    // 若只存在一次，不存在订阅 -> 展示最多两个一次
    // 若只存在订阅，不存在一次 -> 展示最多两个订阅
    const singleSplitIdx = cartMinimized
      ? subProducts.length > 0
        ? 1
        : 2
      : singleProducts.length;
    const subSplitIdx = cartMinimized
      ? singleProducts.length > 0
        ? 1
        : 2
      : subProducts.length;

    return (
      <>
        {SingleList.length > 0 ? (
          <ProductCatogeryItemBox>
            <ProductCatogeryTitle
              title={`Sinlge purchase(${countTotalBuyCounts(singleProducts)})`}
            />

            <div>{SingleList.splice(0, singleSplitIdx)}</div>
          </ProductCatogeryItemBox>
        ) : null}

        {SubscriptionList.length > 0 ? (
          <ProductCatogeryItemBox>
            <ProductCatogeryTitle
              title={`Subscription purchase(${countTotalBuyCounts(
                subProducts
              )})`}
              // 订阅产品中，有一个属于club，则显示club logo
              icon={
                find(
                  subProducts,
                  (el) =>
                    el?.goodsInfoFlag > 0 &&
                    el?.goods?.promotions?.includes('club')
                ) ? (
                  <img
                    className="clubLogo w-16"
                    src={getClubLogo()}
                    alt="club logo"
                  />
                ) : null
              }
            />

            <div>{SubscriptionList.splice(0, subSplitIdx)}</div>
            <div className="text-center border-top py-2">
              <span
                className="iconfont font-weight-bold iconrefresh green mr-1"
                style={{ fontSize: '.8em' }}
              />
              <FormattedMessage
                id="product.totalSavedMoneyThanksToSubscription"
                values={{
                  discount: formatMoney(-subTotleSaved)
                }}
              />
            </div>
          </ProductCatogeryItemBox>
        ) : null}
      </>
    );
  }

  renderItemList = (list) => {
    // get indv pet information
    let paramsString = sessionItemRoyal.get('nutrition-recommendation-filter');
    let IndvPetInfo = {};
    if (paramsString) {
      let recommendateInfo = JSON.parse(paramsString);
      IndvPetInfo = recommendateInfo.customerPetsVo;
    }

    return list.map((el, i) => (
      <ProductDetailItem
        el={Object.assign({}, el, {
          displayGoodsName:
            el?.goodsInfoFlag === 3 ? (
              <FormattedMessage
                id="subscription.personalized"
                values={{ val1: IndvPetInfo?.name }}
              />
            ) : (
              el.goodsName || el.goods.goodsName
            )
          // logo:
          //   el?.goodsInfoFlag > 0 && el?.goods?.promotions?.includes('club') ? (
          //     <img
          //       className="clubLogo"
          //       src={getClubLogo({ goodsInfoFlag: el.goodsInfoFlag })}
          //       alt="club logo"
          //     />
          //   ) : null
        })}
        customContentDetail={
          isFromFelin ? (
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
          ) : null
        }
        key={i}
      />
    ));
  };

  getTotalItems() {
    const { headerIcon } = this.props;
    const { productList, cartDetailVisible } = this.state;
    return (
      <div
        className="border-bottom flex items-center justify-between px-5 py-2"
        onClick={this.props.onClickHeader}
      >
        {headerIcon}
        <div>
          <p className="medium text-2xl">{formatMoney(this.tradePrice)}</p>
          {window.__.env.REACT_APP_COUNTRY === 'de' ? (
            <p
              className="text-cs-gray"
              style={{
                fontSize: '.75rem'
              }}
            >
              {<FormattedMessage id="totalIncluMessage" />}
            </p>
          ) : null}
          <p className="">
            {window.__.env.REACT_APP_COUNTRY === 'us' &&
            this.props.isCheckOut ? (
              <FormattedMessage
                id="payment.totalProduct2"
                values={{
                  val: this.isIndv ? 1 : countTotalBuyCounts(productList)
                }}
              />
            ) : (
              <FormattedMessage
                id="payment.totalProduct"
                values={{
                  val:
                    this.isIndv || isFromFelin
                      ? 1
                      : countTotalBuyCounts(productList)
                }}
              />
            )}
          </p>
        </div>
        <EditCartBtn
          className="hidden md:block underline"
          operateBtnVisible={this.props.operateBtnVisible}
          isIndv={this.isIndv}
        />
        <div
          className="block md:hidden underline"
          onClick={this.toggleMobileCartFlod}
        >
          <FormattedMessage
            id={cartDetailVisible ? 'cart.showLessDetails' : 'cart.showDetails'}
          />
        </div>
      </div>
    );
  }
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const {
      productList,
      needHideProductList,
      cartDetailVisible,
      cartMinimized
    } = this.state;
    const {
      checkoutStore: { installMentParam }
    } = this.props;
    const List = this.renderProducts(productList);

    return (
      <DivWrapper
        className={cn(`product-summary__inner`, className)}
        style={{ ...style }}
        id={id}
      >
        <div className="product-summary__recap my-0 222 text-cs-black">
          {this.getTotalItems()}
          <div className={cn({ hidden: !cartDetailVisible })}>
            <div className="product-summary__recap__content">
              <div className="checkout--padding">
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
                      installMentParam
                    }}
                  />
                </div>
              </div>
            </div>

            <PromotionCode {...this.props} />

            {/* show Loyalty point */}
            <LoyaltyPoint />

            <div className="border-top">
              {!needHideProductList && List}
              {this.giftList.length > 0 && !cartMinimized ? (
                <ProductCatogeryItemBox>
                  <ProductCatogeryTitle
                    title={`Gift(${countTotalBuyCounts(this.giftList)})`}
                  />
                  <div>
                    {this.giftList.map((el, i) => (
                      <ProductDetailItem
                        el={Object.assign({}, el, {
                          isGift: true
                        })}
                        key={i}
                      />
                    ))}
                  </div>
                </ProductCatogeryItemBox>
              ) : null}
            </div>
            {/* mobile Edit cart button */}
            <EditCartBtn
              className="text-center underline border-top py-2 block md:hidden"
              operateBtnVisible={this.props.operateBtnVisible}
              isIndv={this.isIndv}
            />
            {/* pc Minimize button */}
            <div
              className="text-center underline border-top py-2 hidden md:block"
              style={{ color: 'rgb(68, 68, 68)' }}
            >
              <span
                class="font-medium underline hover:text-rc-red cursor-pointer"
                onClick={this.togglePCCartFlod}
              >
                <FormattedMessage
                  id={cartMinimized ? 'minimize' : 'maximize'}
                />
              </span>
            </div>
          </div>
        </div>
      </DivWrapper>
    );
  }

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
