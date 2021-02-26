import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import {
  formatMoney,
  getFrequencyDict,
  matchNamefromDict
} from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { toJS } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

const guid = uuidv4();
let isGACheckoutLock = false
const isHubGA = process.env.REACT_APP_HUB_GA

const sessionItemRoyal = window.__.sessionItemRoyal;
@inject('checkoutStore', 'loginStore', 'paymentStore','clinicStore')
@observer
class PayProductInfo extends React.Component {
  static defaultProps = {
    operateBtnVisible: false,
    fixToHeader: false,
    style: {},
    className: '',
    onClickHeader: () => { },
    headerIcon: null
  };
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      discount: [], //促销码的折扣信息汇总
      promotionInputValue: this.props.checkoutStore.promotionCode || '', //输入的促销码
      lastPromotionInputValue: '', //上一次输入的促销码
      isClickApply: false, //是否点击apply按钮
      isShowValidCode: false, //是否显示无效promotionCode
      frequencyList: [],
      calculatedWeeks:{}
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
    //     if (nextProps.buyWay === 'once') {
    //       this.setState({isShowValidCode:false})
    //     }
    // console.log(nextProps, 'props2')
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
  getComputedWeeks(frequencyList) {
    let calculatedWeeks = {}
    frequencyList.forEach(item => {
      switch (item.type) {
        case 'Frequency_day':
          calculatedWeeks[item.id] = 0
          break;
        case 'Frequency_week':
          calculatedWeeks[item.id] = item.valueEn * 1
          break;
        case 'Frequency_month':
          calculatedWeeks[item.id] = item.valueEn * 4
          break;
      }
    })

    this.setState({
      calculatedWeeks
    },()=>{
      // console.log(this.state.calculatedWeeks)
      // debugger
    })
  }
  //会员 GA需要的product信息
  GAGetProductLogin(productList) {
    let product = []
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
    return product
  }
  //游客 GA需要的product信息
  GAGetProductUnlogin(productList) {
    let product = []
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
    return product
  }

  //会员 HubGA需要的product信息
  HubGAGetProductLogin(productList){
    let arr = []
    for (let item of productList) {
      let subscriptionFrequency = item.periodTypeId ? this.state.calculatedWeeks[item.periodTypeId] : ''
      let range = item.goods.goodsCateName?.split("/")[1];
      let technology = item.goods.goodsCateName?.split("/")[2]

      arr.push({
        'price': item.goodsInfoFlag == 1 ? item.subscriptionPrice : item.salePrice, //Product Price, including discount if promo code activated for this product
        'specie': item.cateId == '1134' ? 'Cat' : 'Dog', //'Cat' or 'Dog',
        'range': range, //Possible values : 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
        'name': item.goodsName, //WeShare product name, always in English
        'mainItemCode': item.goods.goodsNo, //Main item code
        'SKU': item.goodsInfos[0].goodsInfoNo, //product SKU
        'subscription': item.goodsInfoFlag == 1 ? 'Subscription' : 'One Shot', //'One Shot', 'Subscription', 'Club'
        'technology': technology, //'Dry', 'Wet', 'Pack'
        'brand': 'Royal Canin', //'Royal Canin' or 'Eukanuba'
        'size': item.specText, //Same wording as displayed on the site, with units depending on the country (oz, grams…)
        'quantity': item.buyCount, //Number of products, only if already added to cartequals 'Subscription or Club'
        'subscriptionFrequency': item.goodsInfoFlag == 1 ? subscriptionFrequency : '', //Frequency in weeks, to populate only if 'subscription' 
        'recommendationID': this.props.clinicStore.linkClinicId || '', //recommendation ID

        //'sizeCategory': 'Small', //'Small', 'Medium', 'Large', 'Very Large', reflecting the filter present in the PLP
        'breed': ['Beagle', 'Boxer', 'Carlin'], //All animal breeds associated with the product in an array
        'promoCodeName': 'PROMO1234', //Promo code name, only if promo activated     
        'promoCodeAmount': 8 //Promo code amount, only if promo activated
      })
    }
    dataLayer.push({
      'products': arr
    })
    // console.log({ dataLayer })
    // debugger
  }

  //游客 HubGA需要的product信息
  HubGAGetProductUnlogin(productList){
    let arr = []
    for (let item of productList) {
      let cur_selected_size = item.sizeList.filter((item2) => {
        return item2.selected == true;
      });
      let variant = cur_selected_size[0].specText;
      let goodsInfoNo = cur_selected_size[0].goodsInfoNo;
      let price = item.goodsInfoFlag ? cur_selected_size[0].subscriptionPrice : cur_selected_size[0].marketPrice
      let subscriptionFrequency = item.form ? this.state.calculatedWeeks[item.form.frequencyId] : ''

      arr.push({
        'price': price, //Product Price, including discount if promo code activated for this product
        'specie': item.cateId == '1134' ? 'Cat' : 'Dog', //'Cat' or 'Dog',
        'range': item.goodsCateName?.split("/")[1], //Possible values : 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
        'name': item.goodsName, //WeShare product name, always in English
        'mainItemCode': item.goodsNo, //Main item code
        'SKU': goodsInfoNo, //product SKU
        'subscription': item.goodsInfoFlag == 1 ? 'Subscription' : 'One Shot', //'One Shot', 'Subscription', 'Club'
        'technology': item.goodsCateName?.split("/")[2], //'Dry', 'Wet', 'Pack'
        'brand': 'Royal Canin', //'Royal Canin' or 'Eukanuba'
        'size': variant, //Same wording as displayed on the site, with units depending on the country (oz, grams…)
        'quantity': item.quantity, //Number of products, only if already added to cartequals 'Subscription or Club'
        'subscriptionFrequency': item.goodsInfoFlag == 1 ? subscriptionFrequency : '', //Frequency in weeks, to populate only if 'subscription' 

        'recommendationID': this.props.clinicStore.linkClinicId || '', //recommendation ID
        //'sizeCategory': 'Small', //'Small', 'Medium', 'Large', 'Very Large', reflecting the filter present in the PLP
        'breed': ['Beagle', 'Boxer', 'Carlin'], //All animal breeds associated with the product in an array

        'promoCodeName': 'PROMO1234', //Promo code name, only if promo activated     
        'promoCodeAmount': 8 //Promo code amount, only if promo activated
      })
    }
    dataLayer.push({
      'products': arr
    })

    // console.log({ dataLayer })
    // debugger
  }

  GAInitialProductArray(productList){
    if(!isGACheckoutLock){//防止重复调用
      isGACheckoutLock = true
      this.getComputedWeeks(this.state.frequencyList)
      this.isLogin ? this.HubGAGetProductLogin(productList) : this.HubGAGetProductUnlogin(productList)
    }
  }

  // GA Checkout
  GACheck(productList) {
    if (!isGACheckoutLock) { //防止重复调用
      isGACheckoutLock = true
      let product = this.isLogin ? this.GAGetProductLogin(productList) : this.GAGetProductUnlogin(productList)

      dataLayer[0].checkout.basketAmount = this.tradePrice;
      dataLayer[0].checkout.basketID = guid;
      dataLayer[0].checkout.option = this.isLogin ? 'account already created' : 'new account';
      dataLayer[0].checkout.step = 2;
      dataLayer[0].checkout.product = product;
      

      dataLayer.push({
        checkout: {
          step: '',
          option: ''
        },
        event: process.env.REACT_APP_GTM_SITE_ID+'virtualPageView',
        page: {
          type: 'Checkout',
          virtualPageURL: '/checkout/emailAddress'
        }
      })
    }


  }
  async componentDidMount() {
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

    (!isHubGA)&&this.GACheck(productList)
    isHubGA && this.GAInitialProductArray(productList)
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
  get subscriptionPrice() {
    return this.props.checkoutStore.subscriptionPrice;
  }
  get promotionDesc() {
    return this.props.checkoutStore.promotionDesc;
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
                    alt=""
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
                  </div>
                </div>
                <div className="line-item-total-price justify-content-start pull-left">
                  <div className="item-attributes">
                    <p className="line-item-attributes">
                      {selectedSizeItem.specText} -{' '}
                      {el.quantity > 1 ? (
                        <FormattedMessage
                          id="items"
                          values={{ val: el.quantity }}
                        />
                      ) : (
                          <FormattedMessage
                            id="item"
                            values={{ val: el.quantity }}
                          />
                        )}
                    </p>
                  </div>
                </div>
                <div className="line-item-total-price justify-content-end pull-right">
                  <div>{formatMoney(el.sizeList.filter(el => el.selected)[0]['marketPrice'] * el.quantity )}</div>
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
    return el.goodsInfoFlag;
  }
  handleClickProName(item) {
    sessionItemRoyal.set('recomment-preview', this.props.location.pathname);
    // this.props.history.push(
    //   `/details/${
    //     this.isLogin ? item.goodsInfoId : item.sizeList[0].goodsInfoId
    //   }`
    // );
    this.props.history.push(
      `/${item.goodsName.toLowerCase().split(' ').join('-').replace('/', '')}-${item.goodsNo
      }`
    );
  }
  getProductsForLogin(plist) {
    const List = plist.map((el, i) => {
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <LazyLoad>
                  <img className="product-image" src={el.goodsInfoImg} alt="" />
                </LazyLoad>
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div
                    className="line-item-name ui-text-overflow-line2 text-break"
                    title={el.goodsName || el.goods.goodsName}
                  >
                    <span className="light">
                      {el.goodsName || el.goods.goodsName}
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div
                    className="line-item-total-price"
                    style={{ width: '77%' }}
                  >
                    {el.specText} -{' '}
                    {el.buyCount > 1 ? (
                      <FormattedMessage
                        id="items"
                        values={{ val: el.buyCount }}
                      />
                    ) : (
                        <FormattedMessage
                          id="item"
                          values={{ val: el.buyCount }}
                        />
                      )}
                    <br />
                    {el.goodsInfoFlag ? (
                      <>
                      <span>
                        <FormattedMessage id="subscription.frequency" /> :{' '}
                        {matchNamefromDict(
                          this.state.frequencyList,
                          el.periodTypeId
                        )}{' '}
                      </span>
                      </>
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
                {el.goodsInfoFlag ? (
                  <div>
                    <span
                      className="iconfont font-weight-bold green"
                      style={{ fontSize: '.8em' }}
                    >
                      &#xe675;
                    </span>
                    &nbsp; <FormattedMessage id="Vous avez économisé" />{' '}
                    <span className="green">
                      {formatMoney(
                        el.buyCount * el.salePrice -
                        el.buyCount * el.subscriptionPrice
                      )}
                    </span>{' '}
                    <FormattedMessage id="avecLabonnement" />
                    &nbsp;
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
  getTotalItems() {
    const { headerIcon } = this.props;
    const { productList } = this.state;
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
          <FormattedMessage
            id="payment.totalProduct"
            values={{
              val: productList.reduce(
                (total, item) => total + item[quantityKeyName],
                0
              )
            }}
          />
        </span>
        {this.props.operateBtnVisible && (
          <Link to="/cart" className="product-summary__cartlink rc-styled-link">
            <FormattedMessage id="edit" />
          </Link>
        )}
      </div>
    );
  }
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const { productList, discount } = this.state;
    const { checkoutStore } = this.props;
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
        <div className="product-summary__recap mt-0 mb-0">
          {this.getTotalItems()}
          <div className="product-summary__recap__content">
            <div className="checkout--padding">
              {List}
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
                <button
                  ref="applyButtton"
                  id="promotionApply"
                  className={`rc-btn rc-btn--sm rc-btn--two ${this.state.isClickApply
                      ? 'ui-btn-loading ui-btn-loading-border-red'
                      : ''
                    }`}
                  style={{ marginTop: '10px', float: 'right' }}
                  onClick={async () => {
                    try {
                      let result = {};
                      if (!this.state.promotionInputValue) return;
                      this.setState({
                        isClickApply: true,
                        isShowValidCode: false,
                        lastPromotionInputValue: this.state.promotionInputValue
                      });
                      if (!this.isLogin) {
                        //游客
                        result = await checkoutStore.updateUnloginCart(
                          '',
                          this.state.promotionInputValue
                        );
                      } else {
                        //会员
                        result = await checkoutStore.updateLoginCart(
                          this.state.promotionInputValue,
                          this.props.buyWay === 'frequency'
                        );
                      }
                      if (
                        result.backCode === 'K-000000' &&
                        (!result.context.promotionFlag ||
                          result.context.couponCodeFlag)
                      ) {
                        //表示输入apply promotionCode成功
                        discount.splice(0, 1, 1); //(起始位置,替换个数,插入元素)
                        this.setState({ discount });
                        this.props.sendPromotionCode(
                          this.state.promotionInputValue
                        );
                      } else {
                        this.setState({
                          isShowValidCode: true
                        });
                        this.props.sendPromotionCode('');
                      }
                      this.setState({
                        isClickApply: false,
                        promotionInputValue: ''
                      });
                    } catch (err) {
                      this.setState({
                        isClickApply: false
                      });
                    }
                  }}
                >
                  <FormattedMessage id="apply" />
                </button>
              </div>
              {this.state.isShowValidCode ? (
                <div className="red" style={{ fontSize: '14px' }}>
                  {/* Promotion code({this.state.lastPromotionInputValue}) is not Valid */}
                  <FormattedMessage id="validPromotionCode" />
                </div>
              ) : null}
              {!this.state.isShowValidCode &&
                this.state.discount.map((el) => (
                  <>
                    <div
                      className={`row leading-lines shipping-item d-flex`}
                      style={{
                        border: '1px solid #ccc',
                        height: '60px',
                        lineHeight: '60px',
                        overflow: 'hidden',
                        marginBottom: '10px'
                      }}
                    >
                      <div className={`${!checkoutStore.couponCodeFitFlag ? 'col-6' : 'col-10'}`}>
                        <p style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                          {this.promotionDesc || (
                            <FormattedMessage id="NoPromotionDesc" />
                          )}
                        </p>
                      </div>
                      <div className={`${!checkoutStore.couponCodeFitFlag ? 'col-4' : 'col-0'} red`} style={{ padding: 0 }}>
                        <p>
                          {!checkoutStore.couponCodeFitFlag && (
                            <FormattedMessage id="Non appliqué" />
                          )}
                        </p>
                      </div>
                      <div className="col-2" style={{ padding: '0 15px 0 0' }}>
                        <p className="text-right shipping-cost">
                          <span
                            className="rc-icon rc-close--sm rc-iconography"
                            style={{
                              fontSize: '18px',
                              marginLeft: '10px',
                              lineHeight: '20px',
                              cursor: 'pointer'
                            }}
                            onClick={async () => {
                              let result = {};
                              await checkoutStore.removePromotionCode()
                              if (!this.props.loginStore.isLogin) {
                                //游客
                                result = await checkoutStore.updateUnloginCart();
                              } else {
                                //会员
                                result = await checkoutStore.updateLoginCart(
                                  '',
                                  this.props.buyWay === 'frequency'
                                );
                              }
                              if (result && result.backCode === 'K-000000') {
                                discount.pop();
                                this.props.sendPromotionCode('');
                                this.setState({
                                  discount: [],
                                  isShowValidCode: false,
                                  lastPromotionInputValue: '',
                                  promotionInputValue: ''
                                });
                              }
                            }}
                          ></span>
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
                        <FormattedMessage id="total" />
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
                  className={`row leading-lines shipping-item green ${parseFloat(this.subscriptionDiscountPrice) > 0 ? 'd-flex': 'hidden'}`}
                >
                  <div className="col-7 start-lines">
                    <p
                      className="order-receipt-label order-shipping-cost"
                    >
                      <span>
                        <FormattedMessage id="promotion" />
                      </span>
                    </p>
                  </div>
                  <div className="col-5 end-lines">
                    <p className="text-right">
                      <span
                        className="shipping-total-cost"
                      >
                        <b>-{formatMoney(this.subscriptionDiscountPrice)}</b>
                      </span>
                    </p>
                  </div>
                </div>

                {/* 显示 promotionCode */}
                {!this.state.isShowValidCode && this.promotionDiscountPrice > 0 
                // &&
                //   this.props.checkoutStore.promotionCode 
                  ? (
                    <div className="row leading-lines shipping-item flex-layout green">
                      <label
                        className="saveDiscount font14"
                        style={{ flex: 2 }}
                      >
                        {/* {this.promotionDesc || (
                        <FormattedMessage id="NoPromotionDesc" />
                      )} */}
                        <FormattedMessage id="promotion" />
                      </label>
                      <div
                        className="text-right"
                        style={{
                          position: 'relative',
                          textAlign: 'right',
                          flex: 1
                        }}
                      >
                        <b>-{formatMoney(this.promotionDiscountPrice)}</b>
                      </div>
                    </div>
                  ) : null}
                {/* 显示 delivereyPrice */}
                <div className="row leading-lines shipping-item">
                  <div className="col-7 start-lines">
                    <p className="order-receipt-label order-shipping-cost">
                      <span>
                        <FormattedMessage id="delivery" />
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
                {formatMoney(this.tradePrice)}
              </span>
            </div>
          </div>
          {process.env.REACT_APP_LANG == 'de' ? (
            <div
              style={{
                fontSize: '12px',
                paddingLeft: '22px',
                paddingBottom: '10px',
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
