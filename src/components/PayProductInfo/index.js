import React from "react";
import { FormattedMessage } from 'react-intl'
import Skeleton from "react-skeleton-loader";
import { find } from 'lodash'
import { formatMoney, getDictionary } from "@/utils/utils"
import { IMG_DEFAULT } from '@/utils/constant'

class PayProductInfo extends React.Component {
  static defaultProps = {
    operateBtnVisible: false,
    fixToHeader: false
  }
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      frequencyList: []
    };
  }
  async componentDidMount () {
    Promise.all([
      getDictionary({ type: 'Frequency_week' }),
      getDictionary({ type: 'Frequency_month' })
    ]).then(dictList => {
      this.setState({
        frequencyList: [...dictList[0], ...dictList[1]]
      })
<<<<<<< HEAD
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
                      {selectedSizeItem.specText} - {el.quantity > 1 ? <FormattedMessage id="items" values={{ val: el.quantity }}/> : <FormattedMessage id="item" values={{ val: el.quantity }}/>}
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
=======
    })
>>>>>>> f6d6a744272a642a0fb1dac64295a352ea6f8dc0
  }
  matchNamefromDict (dictList, id) {
    return find(dictList, ele => ele.id == id)
      ? find(dictList, ele => ele.id == id).name
      : id
  }
  getProductList (plist) {
    const { details } = this.props
    const List = plist.map((item, i) => {
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <img className="product-image"
                  src={item.pic || IMG_DEFAULT}
                  alt={item.spuName}
                  title={item.spuName} />
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div
                    className="line-item-name ui-text-overflow-line2 text-break"
                    title={item.spuName}>
                    <span className="light">{item.spuName}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="line-item-total-price" style={{ width: '77%' }}>
<<<<<<< HEAD
                    {el.specText} - {el.buyCount > 1 ? <FormattedMessage id="items" values={{ val: el.buyCount }}/> : <FormattedMessage id="item" values={{ val: el.buyCount }}/>}<br />
=======
                    {item.specDetails} - {item.num} {item.num > 1 ? <FormattedMessage id="items" /> : <FormattedMessage id="item" />} {item.num}<br />
>>>>>>> f6d6a744272a642a0fb1dac64295a352ea6f8dc0
                    {
                      details.subscriptionResponseVO && item.subscriptionStatus
                        ? <>
                          <FormattedMessage id="subscription.frequency" /> :
                          {this.matchNamefromDict(this.state.frequencyList, details.subscriptionResponseVO.cycleTypeId)}{' '}
                          <span className="iconfont font-weight-bold red" style={{ fontSize: '.8em' }}>&#xe675;</span>
                        </>
                        : null
                    }
                  </div>
                  <div className="line-item-total-price" style={{ whiteSpace: 'nowrap' }}>
                    {
                      details.subscriptionResponseVO && item.subscriptionStatus
                        ? <><span className="text-line-through">{formatMoney(item.num * item.price)}</span><br /></>
                        : null
                    }
                    <span>{formatMoney(details.subscriptionResponseVO && item.subscriptionStatus ? item.num * item.subscriptionPrice : item.num * item.price)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      );
    });
    return List
  }
  sideCart ({ className = '', style = {}, id = '' } = {}) {
    const { details } = this.props
    let List = details ? this.getProductList(details.tradeItems) : null
    return (
      <div className={`product-summary__inner ${className}`}
        style={{ ...style }}
        id={id}>
        <div className="product-summary__recap mt-0 mb-0">
          {
            this.props.details
              ? <>
                <div className="product-summary__itemnbr checkout--padding border-bottom d-flex align-items-center justify-content-between">
                  <span>
                    <FormattedMessage
                      id="payment.totalProduct"
                      values={{ val: details.tradeItems.reduce((total, item) => total + item.num, 0) }} />
                  </span>
                </div>
                <div className="product-summary__recap__content">
                  <div className="checkout--padding">
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
                              {formatMoney(details.tradePrice.goodsPrice)}
                            </span>
                          </p>
                        </div>
                      </div>
                      {
                        details.tradePrice.discountsPrice
                          ? <div className="row leading-lines shipping-item">
                            <div className="col-7 start-lines">
                              <p className="order-receipt-label order-shipping-cost">
                                <span>{details.tradePrice.promotionDesc}</span>
                              </p>
                            </div>
                            <div className="col-5 end-lines">
                              <p className="text-right">
                                <span className="shipping-total-cost">-{formatMoney(details.tradePrice.discountsPrice)}</span>
                              </p>
                            </div>
                          </div>
                          : null
                      }
                      {/* 显示 delivereyPrice */}
                      <div className="row leading-lines shipping-item">
                        <div className="col-7 start-lines">
                          <p className="order-receipt-label order-shipping-cost">
                            <span><FormattedMessage id="delivery" /></span>
                          </p>
                        </div>
                        <div className="col-5 end-lines">
                          <p className="text-right">
                            <span className="shipping-total-cost">{formatMoney(details.tradePrice.deliveryPrice)}</span>
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
                      {formatMoney(details.tradePrice.totalPrice)}
                    </span>
                  </div>
                </div>
              </>
              : <div className="pt-2 pb-2">
                <Skeleton color="#f5f5f5" width="100%" count={4} />
              </div>
          }
        </div>
      </div>
    );
  }
  render () {
    return this.props.fixToHeader
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
