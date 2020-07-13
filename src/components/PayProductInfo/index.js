import React from "react";
import { FormattedMessage } from 'react-intl'
import { inject } from 'mobx-react'
import { formatMoney } from "@/utils/utils"

@inject("loginStore")
@inject("checkoutStore")
class PayProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: []
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
    window.addEventListener('scroll', e => this.handleScroll(e))
  }
  get totalPrice () {
    return this.props.checkoutStore.cartPrice ? this.props.checkoutStore.cartPrice.totalPrice : 0
  }
  get tradePrice () {
    return this.props.checkoutStore.cartPrice ? this.props.checkoutStore.cartPrice.tradePrice : 0
  }
  get discountPrice () {
    return this.props.checkoutStore.cartPrice ? this.props.checkoutStore.cartPrice.discountPrice : 0
  }
  getProducts (plist) {
    const List = plist.map((el, i) => {
      let selectedSizeItem = el.sizeList.filter((item) => item.selected)[0];
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <img className="product-image" src={el.goodsImg} />
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
                  <div className="line-item-total-price" style={{ width: '73%' }}>
                    {el.specText} - {el.buyCount} {el.buyCount > 1 ? <FormattedMessage id="items" /> : <FormattedMessage id="item" />}<br />
                    {
                      el.subscriptionStatus
                        ? <><FormattedMessage id="subscription.frequency" /> : {this.props.frequencyVal} < span className="rc-icon rc-refresh--xs rc-brand1"></span></>
                        : null
                    }
                  </div>
                  <div className="line-item-total-price sr-only">
                    {formatMoney(el.buyCount * el.salePrice)}
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
  handleScroll (e) {
    // debugger
    // window.pageYOffset
    // 
    // console.log(window.pageYOffset, this.getElementToPageTop(document.querySelector('.product-summary__inner')))
    console.log(window.pageYOffset, document.querySelector('.product-summary__inner').offsetTop)
  }
  getElementToPageTop (el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  render () {
    const { productList } = this.state
    const { checkoutStore } = this.props
    const List = this.isLogin ? this.getProductsForLogin(productList) : this.getProducts(productList)
    return (
      <div className="product-summary__inner">
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
                      <span className="shipping-total-cost">0</span>
                    </p>
                  </div>
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
        </div>
      </div>
    );
  }
}

export default PayProductInfo;
