import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
//import LoginButton from '@/components/LoginButton';
import {
  formatMoney,
  distributeLinktoPrecriberOrPaymentPage,
  getDeviceType,
  optimizeImage
} from '@/utils/utils';
import FrequencyMatch from '@/components/FrequencyMatch';
import find from 'lodash/find';
import { inject, observer } from 'mobx-react';
import './index.css';
import { FOOD_DISPENSER_PIC } from '@/utils/constant';
import LazyLoad from 'react-lazyload';
import { toJS } from 'mobx';
import GiftList from './GiftList.tsx';

const localItemRoyal = window.__.localItemRoyal;

@injectIntl
@inject('checkoutStore', 'headerCartStore', 'clinicStore')
@observer
class UnloginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutLoading: false,
      petModalVisible: false,
      isAdd: 0
    };
    this.hubGA = window.__.env.REACT_APP_HUB_GA == '1';
  }
  async componentDidMount() {
    if (
      ['/checkout', '/prescription', '/prescriptionNavigate'].indexOf(
        window.location.pathname
      ) === -1
    ) {
      // await this.props.checkoutStore.removePromotionCode();
    }
    this.props.checkoutStore.updateUnloginCart({ intl: this.props.intl });
  }
  get selectedCartData() {
    return this.props.checkoutStore.cartData.filter(
      (ele) => ele.selected && !ele.isNotShowCart
    ); //isNotShowCart 直接checkout的商品，不在购物车显示需要被过滤掉
  }
  get giftList() {
    return this.props.checkoutStore.giftList || [];
  }
  get totalNum() {
    return (
      this.selectedCartData.reduce((pre, cur) => {
        return Number(pre) + Number(cur.quantity);
      }, 0) +
      this.giftList
        .filter((item) => !item?.isHidden)
        .reduce((total, el) => total + el.buyCount, 0)
    );
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  GAAccessToGuestCheck(type) {
    this.hubGA
      ? window?.dataLayer?.push({
          event: 'cartHeaderClicks',
          cartHeaderClicks: {
            button: type == 'buyNow' ? 'Buy now' : 'Continue as a Guest'
          }
        })
      : window?.dataLayer?.push({
          event: `${window.__.env.REACT_APP_GTM_SITE_ID}guestCheckout`,
          interaction: {
            category: 'checkout',
            action: 'guest checkout',
            label: 'cart pop-in', //"cart page  "
            value: 1
          }
        });
  }
  // async handleCheckout({ type, needLogin = false } = {}) {
  //   this.GAAccessToGuestCheck(type);
  //   try {
  //     const { configStore, checkoutStore, history, clinicStore } = this.props;
  //     localItemRoyal.set('okta-redirectUrl', '/cart-force-to-checkout');
  //     this.setState({ checkoutLoading: true });
  //     await checkoutStore.updateUnloginCart({
  //       isThrowErr: true,
  //       intl: this.props.intl
  //     });

  //     if (needLogin) {
  //     } else {
  //       const url = await distributeLinktoPrecriberOrPaymentPage({
  //         configStore,
  //         checkoutStore,
  //         clinicStore,
  //         isLogin: false
  //       });
  //       url && history.push(url);
  //     }
  //   } catch (err) {
  //     this.props.headerCartStore.setErrMsg(err.message);
  //     throw new Error(err);
  //   } finally {
  //     this.setState({ checkoutLoading: false });
  //   }
  // }

  EditToCart = () => {
    this.hubGA &&
      window?.dataLayer?.push({
        event: 'cartHeaderClicks',
        cartHeaderClicks: {
          button: 'Edit'
        }
      });
  };

  clickBasket = () => {
    this.hubGA &&
      window.dataLayer &&
      dataLayer.push({
        event: 'topPictosClick',
        topPictosClick: {
          itemName: 'Basket'
        }
      });
  };

  render() {
    const { totalNum } = this;
    const { headerCartStore, intl, configStore } = this.props;
    const { paymentAuthority } = configStore;
    return (
      <span
        className="minicart inlineblock"
        onMouseOver={() => {
          headerCartStore.show();
        }}
        onMouseOut={() => {
          headerCartStore.hide();
        }}
      >
        <Link
          to="/cart"
          className="minicart-link"
          data-loc="miniCartOrderBtn"
          onClick={this.clickBasket}
        >
          <em className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon rc-cart--xs rc-iconography rc-interactive" />
          {totalNum > 0 ? (
            <span className="minicart-quantity">{totalNum}</span>
          ) : null}
        </Link>
        {!totalNum ? (
          <div
            className={`popover popover-bottom ${
              headerCartStore.visible ? 'show' : ''
            }`}
          >
            <div className="container cart">
              <div className="minicart__footer__msg text-center minicart-padding">
                <span className="minicart__pointer" />
                <div className="minicart__empty">
                  <img
                    className="cart-img"
                    src={optimizeImage({
                      originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/cart.png`,
                      width: 300
                    })}
                    alt="ROYAL CANIN® online store"
                  />
                  <p className="rc-delta">
                    <FormattedMessage id="header.basketEmpty" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : getDeviceType() === 'PC' ? (
          <div
            className={[
              'popover',
              'popover-bottom',
              headerCartStore.visible ? 'show' : ''
            ].join(' ')}
            onMouseOver={() => {
              headerCartStore.show();
            }}
            onMouseOut={() => {
              headerCartStore.hide();
            }}
          >
            <div className="container cart">
              <div>
                {['jp', 'us'].indexOf(window.__.env.REACT_APP_COUNTRY) < 0 && (
                  <div className="minicart__header cart--head small">
                    <span className="minicart__pointer" />
                    <div className="d-flex minicart_freeshipping_info align-items-center">
                      <em className="rc-icon rc-incompatible--xs rc-brand3 rc-padding-right--xs" />
                      <p>
                        <FormattedMessage id="cart.miniCartTitle" />
                      </p>
                    </div>
                  </div>
                )}

                <div className="minicart-padding rc-bg-colour--brand4 rc-padding-top--sm rc-padding-bottom--xs">
                  <span className="rc-body rc-margin--none">
                    <FormattedMessage
                      id="miniBasket.total"
                      values={{
                        totalPrice: (
                          <span style={{ fontWeight: '500' }}>
                            {formatMoney(this.tradePrice)}
                          </span>
                        )
                      }}
                    />
                  </span>

                  {/* <Link
                    to="/cart"
                    className="rc-styled-link pull-right"
                    role="button"
                    aria-pressed="true"
                    onClick={this.EditToCart}
                  >
                    <FormattedMessage id="chang" />
                  </Link> */}
                </div>
                <div
                  className={`${headerCartStore.errMsg ? '' : 'hidden'}`}
                  style={{ margin: '0 2%' }}
                >
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close"
                    role="alert"
                    style={{ padding: '.5rem' }}
                  >
                    <span className="pl-0">{headerCartStore.errMsg}</span>
                  </aside>
                </div>
                {/* 操作按钮组 start */}
                <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                  <Link
                    to="/cart"
                    className="rc-btn rc-btn--one rc-btn--sm btn-block cart__checkout-btn checkout-btn"
                  >
                    <FormattedMessage id="minicart.seemycart" />
                  </Link>
                  {/* <LoginButton
                    beforeLoginCallback={async () => {
                      try {
                        await this.handleCheckout({
                          type: 'buyNow',
                          needLogin: true
                        });
                      } catch (err) {
                        throw new Error(err);
                      }
                    }}
                    btnClass={`rc-btn rc-btn--one rc-btn--sm btn-block cart__checkout-btn checkout-btn ${
                      this.state.checkoutLoading ? 'ui-btn-loading' : ''
                    }`}
                    intl={intl}
                  >
                    <FormattedMessage id="minicart.checkout" />
                  </LoginButton> */}
                </div>
                {/* {!this.selectedCartData.filter((el) => el.goodsInfoFlag)
                  .length ? (
                  paymentAuthority === 'MEMBER_AND_VISITOR' ? (
                    <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4 text-center">
                      <span
                        id="unLoginCarCheckout"
                        onClick={() => this.handleCheckout({ type: 'guest' })}
                        className={`rc-styled-link color-999 ui-cursor-pointer ${
                          this.state.checkoutLoading
                            ? 'ui-btn-loading ui-btn-loading-border-red'
                            : ''
                        }`}
                      >
                        <FormattedMessage id="guestCheckout" />
                      </span>
                    </div>
                  ) : null
                ) : (
                  <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4 text-center">
                    <FormattedMessage id="unLoginSubscriptionTips" />
                  </div>
                )} */}
                {/* 操作按钮组 end */}

                <div className="rc-bg-colour--brand4 minicart-padding rc-body rc-margin--none rc-padding-y--xs">
                  <span className="rc-meta">
                    <FormattedMessage
                      id="cart.totalProduct_nounit"
                      values={{
                        val: (
                          <b style={{ fontWeight: 500 }}>
                            {intl.formatMessage(
                              { id: 'minicart.totalProduct' },
                              { val: totalNum }
                            )}
                          </b>
                        )
                      }}
                    />
                  </span>
                </div>
                <div className="product-summary limit">
                  {this.selectedCartData.map((item, idx) => {
                    // 折扣价格
                    let discountPrice = (
                      <div className="line-item-total-price justify-content-end pull-right priceBox">
                        <div className="price relative">
                          <div className="strike-through non-adjusted-price">
                            null
                          </div>
                          <b
                            className="pricing line-item-total-price-amount light"
                            style={{
                              color: item.goodsInfoFlag ? '#888' : '#666',
                              textDecoration: item.goodsInfoFlag
                                ? 'line-through'
                                : ''
                              // textDecoration: 'line-through'
                            }}
                          >
                            {formatMoney(
                              (item.sizeList.filter((s) => s.selected)[0] &&
                                item.sizeList.filter((s) => s.selected)[0]
                                  .currentAmount) ||
                                0
                            )}
                          </b>
                        </div>
                      </div>
                    );
                    // 原价
                    let originalPrice = (
                      <div className="line-item-total-price justify-content-end pull-right priceBox">
                        <div className="item-total-07984de212e393df75a36856b6 price relative">
                          <div className="strike-through non-adjusted-price">
                            null
                          </div>
                          <b className="pricing line-item-total-price-amount item-total-07984de212e393df75a36856b6 light">
                            <span
                              className="iconfont font-weight-bold green"
                              style={{ fontSize: '.8em' }}
                            >
                              &#xe675;
                            </span>
                            &nbsp;
                            <span
                              className="red"
                              style={{ fontSize: '.875rem' }}
                            >
                              {formatMoney(
                                item.sizeList.filter((el) => el.selected)[0]
                                  .subscriptionPrice * item.quantity
                              )}
                            </span>
                          </b>
                        </div>
                      </div>
                    );
                    // 日本如果没有折扣不显示折扣价
                    if (
                      window.__.env.REACT_APP_COUNTRY === 'jp' &&
                      item.originalPrice === item.subscribePrice
                    ) {
                      discountPrice = null;
                    }
                    return (
                      <div className="minicart__product" key={idx}>
                        <div className="product-summary__products__item">
                          <div className="product-line-item">
                            <div className="product-line-item-details d-flex flex-row">
                              <div className="item-image">
                                <LazyLoad>
                                  <img
                                    className="product-image"
                                    src={optimizeImage({
                                      originImageUrl: find(
                                        item.sizeList,
                                        (s) => s.selected
                                      ).goodsInfoImg
                                    })}
                                    alt={item.goodsName}
                                    title={item.goodsName}
                                  />
                                </LazyLoad>
                              </div>
                              <div className="wrap-item-title">
                                <div className="item-title">
                                  <div
                                    className="line-item-name ui-text-overflow-line2 text-break"
                                    title={item.goodsName}
                                  >
                                    <span className="light">
                                      {item.goodsName}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-100 overflow-hidden">
                                  <div className="line-item-total-price justify-content-start pull-left">
                                    <div className="item-attributes">
                                      <p className="line-item-attributes">
                                        <FormattedMessage
                                          id="minicart.quantityText"
                                          values={{
                                            specText:
                                              find(
                                                item.sizeList,
                                                (s) => s.selected
                                              ).specText || '',
                                            buyCount: item.quantity
                                          }}
                                        />
                                      </p>
                                    </div>
                                  </div>
                                  {discountPrice}
                                </div>
                                {item.goodsInfoFlag ? (
                                  <div
                                    style={{
                                      width: '100%',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    <div className="line-item-total-price justify-content-start pull-left">
                                      <div className="item-attributes">
                                        <p className="line-item-attributes">
                                          <FormattedMessage id="minicart.frequency" />
                                          :{' '}
                                          <FrequencyMatch
                                            currentId={item.periodTypeId}
                                          />
                                        </p>
                                      </div>
                                    </div>
                                    {originalPrice}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="item-options" />
                          </div>
                          {toJS(
                            item.sizeList.filter((e) => e.selected)[0].planId
                          ) && false
                            ? toJS(
                                item.sizeList.filter((e) => e.selected)[0]
                                  .planGifts
                              ).map((gift) => (
                                <div className="product-line-item-details d-flex flex-row gift-box">
                                  <div className="item-image">
                                    <LazyLoad>
                                      <img
                                        className="product-image"
                                        src={
                                          optimizeImage({
                                            originImageUrl: gift.goodsInfoImg
                                          }) || FOOD_DISPENSER_PIC
                                        }
                                        alt={gift.goodsInfoName}
                                        title={gift.goodsInfoName}
                                      />
                                    </LazyLoad>
                                  </div>
                                  <div className="wrap-item-title">
                                    <div className="item-title">
                                      <div
                                        style={{ color: '#333' }}
                                        className="line-item-name ui-text-overflow-line2 text-break"
                                        title={item.goodsName}
                                      >
                                        <span className="light">
                                          {item.goodsName}
                                        </span>
                                      </div>
                                    </div>

                                    <div
                                      className="w-100 overflow-hidden"
                                      style={{
                                        fontSize: '.75rem'
                                      }}
                                    >
                                      x1{' '}
                                      <FormattedMessage id="smartFeederSubscription.shopmentTimes" />
                                    </div>
                                  </div>
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                    );
                  })}
                  {this.giftList.map((el, i) => (
                    <GiftList data={el} key={i} {...this.props} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </span>
    );
  }
}

export default UnloginCart;
