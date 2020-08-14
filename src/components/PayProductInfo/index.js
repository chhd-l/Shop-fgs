import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl'
import { inject, observer } from 'mobx-react'
import { find } from 'lodash'
import { formatMoney } from "@/utils/utils"
import { getOrderDetails } from "@/api/order"

@inject("checkoutStore", "loginStore")
@observer
class PayProductInfo extends React.Component {
  static defaultProps = {
    operateBtnVisible: false
  }
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      discount: [],//促销码的折扣信息汇总
      promotionInputValue: '',//输入的促销码
      lastPromotionInputValue: "",//上一次输入的促销码
      isClickApply: false,//是否点击apply按钮
      isShowValidCode: false,//是否显示无效promotionCode
    };
  }
  get isLogin () {
    return this.props.loginStore.isLogin
  }
  get totalCount () {
    return formatMoney(this.state.productList.reduce(
      (total, item) => total + item.currentAmount,
      0
    ))
  }
  componentWillReceiveProps (nextProps) {
    //     if (nextProps.buyWay === 'once') {
    //       this.setState({isShowValidCode:false})
    //     }
  }
  async componentDidMount () {

    let productList
    if (window.location.pathname === '/confirmation') {
      let res = await getOrderDetails(sessionStorage.getItem('orderNumber'))
      productList = res.context.tradeItems.map(el => {
        if (this.isLogin) {
          return {
            goodsInfoImg: el.pic,
            goodsName: el.skuName,
            specText: el.specDetails,
            buyCount: el.num,
            salePrice: el.price,
            subscriptionPrice: el.subscriptionPrice
          }
        } else {
          return {
            sizeList: [{
              goodsInfoImg: el.pic,
              specText: el.specDetails,
              buyCount: el.num,
              salePrice: el.price,
              selected: true
            }],
            goodsName: el.skuName,
            quantity: el.num,
            currentAmount: el.price * el.num
          }
        }

      })
    } else {
      if (this.isLogin) {
        productList = this.props.checkoutStore.loginCartData
      } else {
        productList = this.props.checkoutStore.cartData.filter(ele => ele.selected)
      }
    }

    this.setState(Object.assign({
      productList: productList || []
    }));
  }
  get totalPrice () {
    return this.props.checkoutStore.totalPrice
  }
  get tradePrice () {
    return this.props.checkoutStore.tradePrice
  }
  get discountPrice () {
    return this.props.checkoutStore.discountPrice
  }
  get deliveryPrice () {
    return this.props.checkoutStore.deliveryPrice
  }
  get subscriptionPrice () {
    return this.props.checkoutStore.subscriptionPrice
  }
  get promotionDesc () {
    return this.props.checkoutStore.promotionDesc
  }
  getProducts (plist) {
    const List = plist.map((el, i) => {
      let selectedSizeItem = el.sizeList.filter((item) => item.selected)[0];
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <img className="product-image" src={find(el.sizeList, s => s.selected).goodsInfoImg} />
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div
                    className="line-item-name ui-text-overflow-line2 text-break"
                    title={el.goodsName}>
                    <span className="light">{el.goodsName}</span>
                  </div>
                </div>
                <div className="line-item-total-price justify-content-start pull-left">
                  <div className="item-attributes">
                    <p className="line-item-attributes">
                      {selectedSizeItem.specText} - {el.quantity} {el.quantity > 1 ? <FormattedMessage id="items" /> : <FormattedMessage id="item" />}
                    </p>
                  </div>
                </div>
                <div className="line-item-total-price justify-content-end pull-right">
                  <div>
                    {formatMoney(el.currentAmount)}
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
  isSubscription (el) {
    return el.subscriptionStatus && el.subscriptionPrice > 0 && this.props.buyWay === 'frequency'
  }
  getProductsForLogin (plist) {
    console.log(plist, 'aaa')
    const List = plist.map((el, i) => {
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <img className="product-image" src={el.goodsInfoImg} />
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div
                    className="line-item-name ui-text-overflow-line2 text-break"
                    title={el.goodsName}>
                    <span className="light">{el.goodsName}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="line-item-total-price" style={{ width: '77%' }}>
                    {el.specText} -  {el.buyCount > 1 ? <FormattedMessage id="items" /> : <FormattedMessage id="item" />} {el.buyCount}<br />
                    {
                      this.isSubscription(el)
                        ? <><FormattedMessage id="subscription.frequency" /> : {this.props.frequencyName} <span className="iconfont font-weight-bold red" style={{ fontSize: '.8em' }}>&#xe675;</span></>
                        : null
                    }
                  </div>
                  <div className="line-item-total-price" style={{ whiteSpace: 'nowrap' }}>
                    {
                      this.isSubscription(el)
                        ? <><span className="text-line-through">{formatMoney(el.buyCount * el.salePrice)}</span><br /></>
                        : null
                    }
                    <span>{formatMoney(this.isSubscription(el) ? el.buyCount * el.subscriptionPrice : el.buyCount * el.salePrice)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-options"></div>
          </div>
        </div >
      );
    });
    return List
  }
  getTotalItems () {
    const { productList } = this.state
    let quantityKeyName = 'quantity'
    if (this.isLogin) {
      quantityKeyName = 'buyCount'
    }
    return (
      <div className="product-summary__itemnbr checkout--padding border-bottom d-flex align-items-center justify-content-between">
        <span>
          <FormattedMessage
            id="payment.totalProduct"
            values={{ val: productList.reduce((total, item) => total + item[quantityKeyName], 0) }} />
        </span>
        {
          this.props.operateBtnVisible && <Link
            to="/cart"
            className="product-summary__cartlink rc-styled-link">
            <FormattedMessage id="edit" />
          </Link>
        }
      </div>
    )
  }
  sideCart ({ className = '', style = {}, id = '' } = {}) {
    const { productList, discount } = this.state
    const { checkoutStore } = this.props
    const List = this.isLogin ? this.getProductsForLogin(productList) : this.getProducts(productList)
    return (
      <div className={`product-summary__inner ${className}`}
        style={{ ...style }}
        id={id}>
        <div className="product-summary__recap mt-0 mb-0">
          {this.getTotalItems()}
          <div className="product-summary__recap__content">
            <div className="checkout--padding">
              {List}
              {/* 支付新增promotionCode(选填) */}
              {
                this.props.history && this.props.history.location.pathname === '/payment/payment' ? <div className="mb-3">
                  <span
                    class="rc-input rc-input--inline rc-input--label mr-0"
                    style={{ width: "150px" }}
                  >
                    <FormattedMessage id="promotionCode">
                      {txt => (<input
                        className="rc-input__control"
                        id="id-text2"
                        type="text"
                        name="text"
                        placeholder={txt}
                        value={this.state.promotionInputValue}
                        onChange={(e) => this.handlerChange(e)}
                      />)}
                    </FormattedMessage>

                    <label
                      class="rc-input__label"
                      for="id-text2"
                    ></label>
                  </span>
                  <button
                    className={["rc-btn", "rc-btn--sm", "rc-btn--two", this.state.isClickApply && "ui-btn-loading ui-btn-loading-border-red"].join(" ")}
                    style={{ marginTop: "10px", float: "right" }}
                    onClick={async () => {
                      let result = {}
                      if (!this.state.promotionInputValue) return
                      this.setState({
                        isClickApply: true,
                        isShowValidCode: false,
                        lastPromotionInputValue: this.state.promotionInputValue
                      })
                      if (!this.isLogin) {
                        //游客
                        result = await checkoutStore.updateUnloginCart('', this.state.promotionInputValue)
                      } else {
                        //会员
                        result = await checkoutStore.updateLoginCart(this.state.promotionInputValue, this.props.buyWay === 'frequency')
                      }
                      if (result.backCode == 'K-000000' && result.context.promotionDiscount) { //表示输入apply promotionCode成功 
                        discount.splice(0, 1, 1);//(起始位置,替换个数,插入元素)
                        this.setState({ discount });
                        this.props.sendPromotionCode(this.state.promotionInputValue);

                      } else {
                        this.setState({
                          isShowValidCode: true
                        })
                        this.props.sendPromotionCode("");
                      }
                      this.setState({
                        isClickApply: false,
                        promotionInputValue: ''
                      })
                    }}
                  >
                    <FormattedMessage id="apply" />
                  </button>
                </div> : null
              }
              <div className="product-summary__fees order-total-summary">
                <div className="row leading-lines subtotal-item">
                  <div className="col-8 start-lines">
                    <p className="order-receipt-label">
                      <span><FormattedMessage id="total" /></span>
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
                <div className="row leading-lines shipping-item" style={{ display: parseInt(this.subscriptionPrice) > 0 ? 'flex' : 'none' }}>
                  <div className="col-7 start-lines">
                    <p className="order-receipt-label order-shipping-cost" style={{ color: '#ec001a' }}>
                      {/* <span><FormattedMessage id="subscribeDiscount" /></span> */}
                      {this.promotionDesc || <FormattedMessage id="NoPromotionDesc" />}
                    </p>
                  </div>
                  <div className="col-5 end-lines">
                    <p className="text-right">
                      <span className="shipping-total-cost" style={{ color: '#ec001a' }}>- {formatMoney(this.subscriptionPrice)}</span>
                    </p>
                  </div>
                </div>
                {/* 显示 默认折扣 */}
                <div className="row leading-lines shipping-item" style={{ display: parseInt(this.discountPrice) > 0 && this.state.discount.length == 0 ? 'flex' : 'none' }}>
                  <div className="col-7 start-lines">
                    <p className="order-receipt-label order-shipping-cost" style={{ color: '#ec001a' }}>
                      <span><FormattedMessage id="promotion" /></span>
                    </p>
                  </div>
                  <div className="col-5 end-lines">
                    <p className="text-right">
                      <span className="shipping-total-cost" style={{ color: '#ec001a' }}>- {formatMoney(this.discountPrice)}</span>
                    </p>
                  </div>
                </div>

                {/* 显示 promotionCode */}
                <div style={{ marginTop: "10px" }}>
                  {!this.state.isShowValidCode && this.state.discount.map((el) => (
                    <div className="flex-layout" style={{ marginRight: "18px" }}>
                      <label className="saveDiscount font14 red">
                        {this.promotionDesc || <FormattedMessage id="NoPromotionDesc" />}
                      </label>
                      <div
                        className="text-right red-text"
                        style={{ position: "relative", paddingTop: "7px" }}
                      >
                        <b>-{formatMoney(this.discountPrice)}</b>
                        <span
                          style={{
                            position: "absolute",
                            right: "-18px",
                            fontSize: "18px",
                            top: "6px",
                            cursor: "pointer",
                          }}
                          onClick={async () => {
                            let result = {}
                            if (!this.isLogin) {
                              //游客
                              result = await checkoutStore.updateUnloginCart()
                            } else {
                              //会员
                              result = await checkoutStore.updateLoginCart('', this.props.buyWay === 'frequency')
                            }
                            if (result.backCode == 'K-000000') {
                              discount.pop();
                              this.setState({ discount: discount, isShowValidCode: false });
                            }
                          }}
                        >
                          x
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* 显示 delivereyPrice */}
                <div className="row leading-lines shipping-item">
                  <div className="col-7 start-lines">
                    <p className="order-receipt-label order-shipping-cost">
                      <span><FormattedMessage id="delivery" /></span>
                    </p>
                  </div>
                  <div className="col-5 end-lines">
                    <p className="text-right">
                      <span className="shipping-total-cost">{formatMoney(this.deliveryPrice)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-summary__total grand-total row leading-lines checkout--padding border-top">
            <div className="col-6 start-lines order-receipt-label">
              <span><FormattedMessage id="totalIncluIVA" /></span>
            </div>
            <div className="col-6 end-lines text-right">
              <span className="grand-total-sum">
                {formatMoney(this.tradePrice)}
              </span>
            </div>
          </div>
          {this.state.isShowValidCode ? <div className="red pl-3 pb-3 border-top pt-2">Promotion code({this.state.lastPromotionInputValue}) is not Valid</div> : null}

        </div>
      </div>
    );
  }
  handlerChange (e) {
    let promotionInputValue = e.target.value
    this.setState({
      promotionInputValue
    })
  }
  render () {
    return this.props.history && this.props.history.location.pathname === '/payment/payment'
      ? <div className="rc-bg-colour--brand3" id="J_sidecart_container">
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
      : this.sideCart()
  }
}

export default PayProductInfo;
