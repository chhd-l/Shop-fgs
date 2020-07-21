import React from "react";
import { FormattedMessage } from 'react-intl'
import { inject, observer } from 'mobx-react'
import { find } from 'lodash'
import { formatMoney } from "@/utils/utils"

@inject("checkoutStore", "loginStore")
@observer
class PayProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      discount: [],//促销码的折扣信息汇总
      promotionInputValue: '',//输入的促销码
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
  componentDidMount () {
    let productList
    if (this.isLogin) {
      productList = this.props.checkoutStore.loginCartData
    } else {
      productList = this.props.checkoutStore.cartData.filter(ele => ele.selected)
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
                    className="line-item-name capitalize ui-text-overflow-line2 text-break"
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
    return el.subscriptionStatus && this.props.buyWay === 'frequency'
  }
  getProductsForLogin (plist) {
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
                    className="line-item-name capitalize ui-text-overflow-line2 text-break"
                    title={el.goodsName}>
                    <span className="light">{el.goodsName}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="line-item-total-price" style={{ width: '75%' }}>
                    {el.specText} - {el.buyCount} {el.buyCount > 1 ? <FormattedMessage id="items" /> : <FormattedMessage id="item" />}<br />
                    {
                      this.isSubscription(el)
                        ? <><FormattedMessage id="subscription.frequency" /> : {this.props.frequencyName} < span className="rc-icon rc-refresh--xs rc-brand1"></span></>
                        : null
                    }
                  </div>
                  <div className="line-item-total-price" style={{ whiteSpace: 'nowrap' }}>
                    {
                      this.isSubscription(el)
                        ? <><span style={{ textDecoration: 'line-through' }}>{formatMoney(el.buyCount * el.salePrice)}</span><br /></>
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
      <div className="product-summary__itemnbr checkout--padding rc-bg-colour--brand4">
        {productList.reduce((total, item) => total + item[quantityKeyName], 0)}&nbsp;
        {productList.reduce((total, item) => total + item[quantityKeyName], 0) > 1 ? <FormattedMessage id="items" /> : <FormattedMessage id="item" />}&nbsp;
        <FormattedMessage id="payment.totalProduct" />
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
        <div className="product-summary__recap">
          {this.getTotalItems()}
          <div className="product-summary__recap__content">
            <div className="rc-border-colour--interface rc-border-left rc-border-right checkout--padding">
              {List}
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
                <div className="row leading-lines shipping-item" style={{ display: parseInt(this.discountPrice) > 0 ? 'flex' : 'none' }}>
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
                {/* 输入promotionCode显示获取的折扣 */}
                <div style={{ marginTop: "10px" }}>
                  {this.state.discount.map((el) => (
                    <div className="flex-layout" style={{ marginRight: "18px" }}>
                      <label className="saveDiscount font16">
                        save amount
                      </label>
                      <div
                        className="text-right red-text"
                        style={{ position: "relative" }}
                      >
                        <b>-{formatMoney(this.discountPrice)}</b>
                        <span
                          style={{
                            position: "absolute",
                            right: "-18px",
                            fontSize: "18px",
                            bottom: "8px",
                            cursor: "pointer",
                          }}
                          onClick={async () => {
                            discount.pop();
                            this.setState({ discount: discount });
                            if (!this.isLogin) {
                              //游客
                              await checkoutStore.updateUnloginCart()
                            } else {
                              //会员
                              await checkoutStore.updateLoginCart()
                            }
                          }}
                        >
                          x
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="product-summary__total grand-total row leading-lines rc-bg-colour--brand4 checkout--padding">
            <div className="col-6 start-lines order-receipt-label">
              <span><FormattedMessage id="totalIncluIVA" /></span>
            </div>
            <div className="col-6 end-lines text-right">
              <span className="grand-total-sum">
                {formatMoney(this.tradePrice)}
              </span>
            </div>
          </div>
          {/* 支付新增promotionCode(选填) */}
          {
            this.props.history && this.props.history.location.pathname === '/payment/payment' && this.state.discount.length == 0 ? <div className="footer" style={{ marginTop: "10px" }}>
              <span
                class="rc-input rc-input--inline rc-input--label"
                style={{ width: "200px", marginLeft: "5px" }}
              >
                <input
                  class="rc-input__control"
                  id="id-text2"
                  type="text"
                  name="text"
                  placeholder="Promotional Code"
                  value={this.state.promotionInputValue}
                  onChange={(e) => this.handlerChange(e)}
                />
                <label
                  class="rc-input__label"
                  for="id-text2"
                ></label>
              </span>
              <button
                class="rc-btn rc-btn--sm rc-btn--two"
                style={{ marginTop: "10px", float: "right" }}
                onClick={async () => {
                  discount.push(1);
                  this.setState({ discount });
                  if (!this.isLogin) {
                    //游客
                    await checkoutStore.updateUnloginCart('', this.state.promotionInputValue)
                  } else {
                    //会员
                    await checkoutStore.updateLoginCart('', this.state.promotionInputValue)
                  }
                  this.setState({
                    promotionInputValue: ''
                  })
                }}
              >
                <FormattedMessage id="apply" />
              </button>
            </div> : null
          }
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
      ? <div id="J_sidecart_container">
        {this.sideCart({
          className: 'hidden position-fixed rc-md-up',
          style: {
            background: '#fff',
            zIndex: 9,
            width: 345,
            maxHeight: '88vh',
            overflowY: 'auto'
          },
          id: 'J_sidecart_fix'
        })}
        {this.sideCart()}
      </div>
      : this.sideCart()
  }
}

export default PayProductInfo;
