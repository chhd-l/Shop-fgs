import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import { formatMoney, getClubLogo } from '@/utils/utils';
import { IMG_DEFAULT } from '@/utils/constant';
import LazyLoad from 'react-lazyload';
import { FOOD_DISPENSER_PIC } from '@/utils/constant';
import './index.css';
import FrequencyMatch from '@/components/FrequencyMatch';
import { PriceDetailsList } from './components';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('checkoutStore', 'configStore')
@injectIntl
@observer
class PayProductInfo extends React.Component {
  static defaultProps = {
    operateBtnVisible: false,
    fixToHeader: false,
    navigateToProDetails: false, // click product name navigate to product detail
    style: {},
    isRepay: false
  };
  constructor(props) {
    super(props);
    this.state = {
      productList: []
    };
    this.handleClickProName = this.handleClickProName.bind(this);
  }
  get taxFeePrice() {
    return this.props.checkoutStore.taxFeePrice;
  }
  get freeShippingDiscountPrice() {
    return this.props.checkoutStore.freeShippingDiscountPrice;
  }
  get freeShippingFlag() {
    return this.props.checkoutStore.freeShippingFlag;
  }
  get earnedPoint() {
    return this.props.checkoutStore.earnedPoint;
  }
  // 存在分期，且不是repay时，才显示分期信息
  get isShowInstallMent() {
    const { details, isRepay } = this.props;
    return !!details.tradePrice.installmentPrice && !isRepay;
  }
  get totalPrice() {
    const { details } = this.props;
    return this.isShowInstallMent
      ? details.tradePrice.totalAddInstallmentPrice
      : details.tradePrice.totalPrice;
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
    // console.log(plist, details, 'hahaha');
    const List = plist
      .filter((item) => !item?.isHidden)
      .map((item, i) => {
        let isGift = false;
        // item.subscriptionPlanGiftList && item.subscriptionPlanGiftList.length;
        let giftArr = item.subscriptionPlanGiftList;

        item.num = item.goodsInfoFlag === 3 ? 1 : item.num;
        item.spuName =
          item.goodsInfoFlag == 3 ? (
            // ? `${item.petsName}'s personalized subscription`
            <FormattedMessage
              id="subscription.personalized"
              values={{ val1: item.petsName }}
            />
          ) : (
            item.spuName
          );
        return (
          <div
            className="product-summary__products__item"
            key={i}
            style={{ paddingBottom: 0 }}
          >
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
                      {window.__.env.REACT_APP_COUNTRY !== 'ru' &&
                      item.goodsInfoFlag === 2 ? (
                        <img
                          className="clubLogo"
                          src={getClubLogo({
                            goodsInfoFlag: item.goodsInfoFlag
                          })}
                          alt="club-logo"
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
                        {details.appointmentNo ? (
                          <span>
                            {details.specialistType} {details.appointmentTime}
                            <FormattedMessage id="min" />
                          </span>
                        ) : (
                          <FormattedMessage
                            id="quantityText"
                            values={{
                              specText: item.specDetails || '',
                              // window.__.env.REACT_APP_COUNTRY == 'fr'
                              //   ? (item.specDetails || '')
                              //       .toString()
                              //       .replace('.', ',')
                              //   : item.specDetails,
                              buyCount: item.num
                            }}
                          />
                        )}
                      </p>
                      {details.subscriptionResponseVO && item.goodsInfoFlag ? (
                        <p className="mb-0">
                          <FormattedMessage id="subscription.frequencyDelivery" />
                          <FormattedMessage id="subscription.deliveryEvery" />{' '}
                          <FrequencyMatch currentId={item.periodTypeId} />
                          {/* {item.goodsInfoFlag === 3 ? (
                          '30 days'
                        ) : (
                          <FrequencyMatch currentId={item.periodTypeId} />
                        )} */}
                          <span
                            className="iconfont font-weight-bold green"
                            style={{ fontSize: '.8em' }}
                          >
                            &#xe675;
                          </span>
                        </p>
                      ) : null}
                    </div>
                    <div className="line-item-total-price text-nowrap">
                      {details.subscriptionResponseVO &&
                      item.subscriptionStatus &&
                      item.goodsInfoFlag != 3 ? (
                        <>
                          {/* 日本的订阅折扣价和原价一样特别显示 */}
                          {window.__.env.REACT_APP_COUNTRY === 'jp' &&
                          item.splitPrice ===
                            item.subscriptionPrice * item.num ? (
                            <p className="mb-0">
                              {formatMoney(item.splitPrice)}
                            </p>
                          ) : (
                            <>
                              <p className="text-line-through mb-0">
                                {formatMoney(item.splitPrice)}
                              </p>
                              <p className="red mb-0">
                                {formatMoney(item.subscriptionPrice * item.num)}
                              </p>
                            </>
                          )}
                        </>
                      ) : (
                        <p className="mb-0">{formatMoney(item.splitPrice)}</p>
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
            {isGift &&
              false &&
              giftArr.map((gift) => (
                <div className="product-line-item no-border gift-top-border-mobile qhx">
                  <div className="product-line-item-details d-flex flex-row">
                    <div className="item-image">
                      <LazyLoad>
                        <img
                          className="product-image"
                          src={gift.goodsInfoImg || FOOD_DISPENSER_PIC}
                          alt={gift.goodsInfoName}
                          title={gift.goodsInfoName}
                        />
                      </LazyLoad>
                    </div>
                    <div className="wrap-item-title">
                      <div className="item-title">
                        <div
                          className="line-item-name ui-text-overflow-line2 text-break"
                          title={gift.goodsInfoName}
                          // onClick={this.handleClickProName.bind(this, item)}
                        >
                          <span className="light">{gift.goodsInfoName}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div
                          className="line-item-total-price"
                          style={{ width: '77%' }}
                        >
                          x1{' '}
                          <FormattedMessage id="smartFeederSubscription.shopmentTimes" />
                          {/* {[
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
                      .join(' - ')} */}
                          <br />
                          {/* {details.subscriptionResponseVO && item.goodsInfoFlag ? (
                      <>
                        <FormattedMessage id="subscription.frequency" /> :{' '}
                        <FrequencyMatch currentId={item.periodTypeId}/>
                        <span
                          className="iconfont font-weight-bold green"
                          style={{ fontSize: '.8em' }}
                        >
                          &#xe675;
                        </span>
                      </>
                    ) : null} */}
                        </div>
                        {/* <div className="line-item-total-price text-nowrap" style={{display:'none'}}>
                    {details.subscriptionResponseVO &&
                    item.subscriptionStatus ? (
                      <>
                        <span className="text-line-through">
                          {formatMoney(item.splitPrice)}
                        </span>
                        <br />
                        <span className="red">{formatMoney(item.price)}</span>
                      </>
                    ) : item.price < item.splitPrice ? (
                      <>
                        <span className="text-line-through">
                          {formatMoney(item.splitPrice)}
                        </span>
                        <br />
                        <span className="red">{formatMoney(item.price)}</span>
                      </>
                    ) : (
                      <span>{formatMoney(item.price)}</span>
                    )}
                  </div> */}
                      </div>
                      {/* subscriptionDiscountPrice */}
                      {/* <div className="item-title">
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
               */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        );
      });
    return List;
  }
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const { details } = this.props;
    let List = details
      ? this.getProductList(details.tradeItems.concat(details.gifts))
      : null;
    return (
      <div
        className={`product-summary__inner ${className}`}
        style={{ ...style }}
        id={id}
      >
        <div className="product-summary__recap mt-0 mb-0  111">
          {details ? (
            <>
              <div className="product-summary__itemnbr checkout--padding border-bottom d-flex align-items-center justify-content-between">
                <span>
                  <FormattedMessage
                    id="payment.totalProduct"
                    values={{
                      val:
                        details.tradeItems[0].goodsInfoFlag == 3
                          ? 1
                          : details.tradeItems.reduce(
                              (total, item) => total + item.num,
                              0
                            )
                    }}
                  />
                </span>
              </div>

              <div className="product-summary__recap__content confirmation_info">
                <div
                  className="checkout--padding"
                  style={{ padding: '0 1.25rem 1.25rem' }}
                >
                  {List}
                  <div className="product-summary__fees order-total-summary">
                    <PriceDetailsList
                      data={{
                        totalPrice: details?.tradePrice?.goodsPrice,
                        taxFeePrice: details?.tradePrice?.taxFeePrice,
                        subscriptionDiscountPrice:
                          details?.tradePrice?.subscriptionDiscountPrice,
                        deliveryPrice: details?.tradePrice?.deliveryPrice,
                        freeShippingDiscountPrice:
                          this.freeShippingDiscountPrice,
                        freeShippingFlag: this.freeShippingFlag,
                        promotionVOList: details?.tradePrice?.promotionVOList,
                        isShowInstallMent: this.isShowInstallMent,
                        installMentAdditionalFee:
                          details?.tradePrice?.installmentPrice?.additionalFee,
                        serviceFeePrice: details?.tradePrice?.serviceFeePrice,
                        loyaltyPointsPrice: details?.tradePrice?.loyaltyPoints
                      }}
                    />
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
                    {formatMoney(this.totalPrice)}
                  </span>
                </div>
              </div>
              {this.earnedPoint > 0 && (
                <div className="product-summary__total grand-total row leading-lines checkout--padding border-top">
                  <div className="col-6 start-lines">
                    <span>
                      <FormattedMessage id="payment.earnedPoint" />
                    </span>
                  </div>
                  <div className="col-6 end-lines text-right">
                    <span className="grand-total-sum">
                      {this.earnedPoint + 'pt'}
                    </span>
                  </div>
                </div>
              )}
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
