import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { formatMoney, getFrequencyDict, matchNamefromDict } from '@/utils/utils';
import { IMG_DEFAULT } from '@/utils/constant';
import LazyLoad from 'react-lazyload';

const sessionItemRoyal = window.__.sessionItemRoyal;

@injectIntl
class PayProductInfo extends React.Component {
  static defaultProps = {
    operateBtnVisible: false,
    fixToHeader: false,
    navigateToProDetails: false, // click product name navigate to product detail
    style: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      frequencyList: [],
      pathname:''
    };
    this.handleClickProName = this.handleClickProName.bind(this);
  }
  async componentDidMount() {
    const {pathname} = this.props.location
    this.setState({
      pathname
    })
    getFrequencyDict().then((res) => {
      this.setState({
        frequencyList: res
      });
    });
  }
  handleClickProName(item) {
    if (this.props.navigateToProDetails) {
      sessionItemRoyal.set('recomment-preview', this.props.location.pathname);
      // this.props.history.push(`/details/${item.skuId}`);
      this.props.history.push(
        `/${item.spuName.split(' ').join('-').replace('/', '')}-${item.goodsNo}`
      );
    }
  }
  getProductList(plist) {
    const { details } = this.props;
    console.log(plist, details, 'hahaha');
    const List = plist.map((item, i) => {
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <LazyLoad>
                  <img
                    className="product-image"
                    src={item.pic || IMG_DEFAULT}
                    alt={item.spuName}
                    title={item.spuName}
                  />
                </LazyLoad>
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div
                    className="line-item-name ui-text-overflow-line2 text-break"
                    title={item.spuName}
                    onClick={this.handleClickProName.bind(this, item)}
                  >
                    <span className="light">{item.spuName}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div
                    className="line-item-total-price"
                    style={{ width: '77%' }}
                  >
                    {
                      [
                        item.specDetails,
                        item.num > 1
                          ? this.props.intl.formatMessage(
                              { id: 'items' },
                              {
                                val: item.num
                              }
                            )
                          : this.props.intl.formatMessage(
                              { id: 'item' },
                              {
                                val: item.num
                              }
                            )
                      ]
                        .filter((e) => e)
                        .join(' - ')
                      }
                    <br />
                    {details.subscriptionResponseVO && item.goodsInfoFlag ? (
                      <>
                        <FormattedMessage id="subscription.frequency" /> :{' '}
                        {matchNamefromDict(
                          this.state.frequencyList,
                          item.periodTypeId
                        )}{' '}
                        <span
                          className="iconfont font-weight-bold green"
                          style={{ fontSize: '.8em' }}
                        >
                          &#xe675;
                        </span>
                      </>
                    ) : null}
                  </div>
                  <div className="line-item-total-price text-nowrap">
                    {details.subscriptionResponseVO &&
                    item.subscriptionStatus ? (
                      <>
                        <span className="text-line-through">
                          {formatMoney(item.num * item.originalPrice)}
                        </span>
                        <br />
                        <span style={{ color: 'red' }}>
                          {formatMoney(item.price)}
                        </span>
                      </>
                    ) : (
                      <span>{formatMoney(item.price)}</span>
                    )}
                  </div>
                </div>
                {/* subscriptionDiscountPrice */}
                <div className="item-title">
                  {item.subscriptionDiscountPrice ? (
                    <div>
                      <span
                        className="iconfont font-weight-bold green"
                        style={{ fontSize: '.8em' }}
                      >
                        &#xe675;
                      </span>
                      &nbsp;
                      <FormattedMessage
                        id="confirmation.subscriptionDiscountPriceDes"
                        values={{
                          val1: (
                            <span className="green">
                              {formatMoney(item.subscriptionDiscountPrice)}
                            </span>
                          )
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return List;
  }
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const { details } = this.props;
    let List = details ? this.getProductList(details.tradeItems) : null;
    return (
      <div
        className={`product-summary__inner ${className}`}
        style={{ ...style }}
        id={id}
      >
        <div className="product-summary__recap mt-0 mb-0">
          {details ? (
            <>
              <div className="product-summary__itemnbr checkout--padding border-bottom d-flex align-items-center justify-content-between">
                <span>
                  <FormattedMessage
                    id="payment.totalProduct"
                    values={{
                      val: details.tradeItems.reduce(
                        (total, item) => total + item.num,
                        0
                      )
                    }}
                  />
                </span>
              </div>
              <div className="product-summary__recap__content">
                <div className="checkout--padding">
                  {List}
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
                            {formatMoney(details.tradePrice.goodsPrice)}
                          </span>
                        </p>
                      </div>
                    </div>

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
                            {formatMoney(details.tradePrice.deliveryPrice)}
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* promotion */}
                    {details.tradePrice.subscriptionDiscountPrice ? (
                      <div className="row leading-lines shipping-item">
                        <div className="col-7 start-lines">
                          <p className="order-receipt-label order-shipping-cost">
                            <span className="green">
                              {/* {details.tradePrice.promotionDesc || ( */}
                                <FormattedMessage id="promotion" />
                              {/* )} */}
                            </span>
                          </p>
                        </div>
                        <div className="col-5 end-lines">
                          <p className="text-right">
                            <span className="shipping-total-cost green">
                              -{formatMoney(details.tradePrice.subscriptionDiscountPrice)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : null}
                    {details.tradePrice.promotionDiscountPrice ? (
                      <div className="row leading-lines shipping-item">
                        <div className="col-7 start-lines">
                          <p className="order-receipt-label order-shipping-cost">
                            <span className="green">
                              {/* {details.tradePrice.promotionDesc || ( */}
                                <FormattedMessage id="promotion" />
                              {/* )} */}
                            </span>
                          </p>
                        </div>
                        <div className="col-5 end-lines">
                          <p className="text-right">
                            <span className="shipping-total-cost green">
                              -{formatMoney(details.tradePrice.promotionDiscountPrice)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : null}
                    {/* {details.tradePrice.discountsPrice ? (
                      <div className="row leading-lines shipping-item">
                        <div className="col-7 start-lines">
                          <p className="order-receipt-label order-shipping-cost">
                            <span>
                              {details.tradePrice.promotionDesc || (
                                <FormattedMessage id="promotion" />
                              )}
                            </span>
                          </p>
                        </div>
                        <div className="col-5 end-lines">
                          <p className="text-right">
                            <span className="shipping-total-cost green">
                              -{formatMoney(details.tradePrice.discountsPrice)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : null} */}
                  </div>
                </div>
              </div>
              <div className="product-summary__total grand-total row leading-lines checkout--padding border-top">
                <div className="col-6 start-lines">
                  <span>
                    <FormattedMessage id="totalIncluIVA" />
                  </span>
                </div>
                <div className="col-6 end-lines text-right">
                  <span className="grand-total-sum">
                    {formatMoney(details.tradePrice.totalPrice)}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="pt-2 pb-2">
              <Skeleton color="#f5f5f5" width="100%" count={4} />
            </div>
          )}
        </div>
      </div>
    );
  }
  render() {
    return this.props.fixToHeader ? (
      <div className="rc-bg-colour--brand3" id="J_sidecart_container">
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
      <div style={{ ...this.props.style }}>{this.sideCart()}</div>
    );
  }
}

export default PayProductInfo;
