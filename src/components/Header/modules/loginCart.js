import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import FrequencyMatch from '@/components/FrequencyMatch';
import {
  formatMoney,
  distributeLinktoPrecriberOrPaymentPage,
  getDeviceType,
  optimizeImage
} from '@/utils/utils';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import './index.css';
import { FOOD_DISPENSER_PIC } from '@/utils/constant';
import GiftList from './GiftList.tsx';
import LazyLoad from 'react-lazyload';

const sessionItemRoyal = window.__.sessionItemRoyal;

@injectIntl
@inject('checkoutStore', 'headerCartStore', 'clinicStore')
@observer
class LoginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutLoading: false
    };
    //this.handleCheckout = this.handleCheckout.bind(this);
    this.hubGA = window.__.env.REACT_APP_HUB_GA == '1';
  }
  async componentDidMount() {
    if (
      ['/checkout', '/prescription', '/prescriptionNavigate'].indexOf(
        window.location.pathname
      ) === -1
    ) {
      // await this.checkoutStore.removePromotionCode();
    }
    const pathname = this.props.history.location.pathname;
    //alert(pathname);
    if (
      !sessionItemRoyal.get('recommend_product') &&
      pathname !== '/checkout'
    ) {
      this.checkoutStore.updateLoginCart({ intl: this.props.intl });
    }
  }

  get checkoutStore() {
    return this.props.checkoutStore;
  }
  get cartData() {
    return this.props.checkoutStore.loginCartData
      .slice()
      ?.filter((el) => !el.isNotShowCart); //isNotShowCart 直接checkout的商品，不在购物车显示需要被过滤掉
  }
  get giftList() {
    return this.props.checkoutStore.giftList || [];
  }
  get totalNum() {
    return (
      this.cartData.reduce((prev, cur) => {
        return Number(prev) + Number(cur.buyCount);
      }, 0) +
      this.giftList
        .filter((item) => !item?.isHidden)
        .reduce((total, el) => total + el.buyCount, 0)
    );
  }
  get loading() {
    return this.checkoutStore.isLoadingCartData;
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  // async handleCheckout() {
  //   try {
  //     const { checkoutStore, history, clinicStore, configStore } = this.props;
  //     this.setState({ checkoutLoading: true });
  //     await checkoutStore.updateLoginCart({
  //       isThrowErr: true,
  //       intl: this.props.intl
  //     });

  //     const url = await distributeLinktoPrecriberOrPaymentPage({
  //       configStore,
  //       checkoutStore,
  //       clinicStore,
  //       isLogin: true
  //     });
  //     url && history.push(url);
  //   } catch (err) {
  //     console.log(err);
  //     this.props.headerCartStore.setErrMsg(err.message);
  //   } finally {
  //     this.setState({ checkoutLoading: false });
  //   }

  //   this.hubGA &&
  //     window?.dataLayer?.push({
  //       event: 'cartHeaderClicks',
  //       cartHeaderClicks: {
  //         button: 'Buy now'
  //       }
  //     });
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
    const { totalNum, cartData, loading } = this;
    const { headerCartStore } = this.props;
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
          <em className="minicart-icon rc-btn rc-btn less-width-xs rc-btn--icon rc-icon rc-cart--xs rc-iconography rc-interactive" />
          {totalNum > 0 ? (
            <span className="minicart-quantity">{totalNum}</span>
          ) : null}
        </Link>
        {!totalNum && !loading ? (
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
            className={`popover popover-bottom ${
              headerCartStore.visible ? 'show' : ''
            }`}
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
                    className="rc-alert rc-alert--error rc-alert--with-close text-break"
                    role="alert"
                    style={{ padding: '.5rem' }}
                  >
                    <span className="pl-0">{headerCartStore.errMsg}</span>
                  </aside>
                </div>
                {/* 操作按钮组 */}
                <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                  <Link
                    to="/cart"
                    className="rc-btn rc-btn--one rc-btn--sm btn-block cart__checkout-btn text-white checkout-btn"
                  >
                    <FormattedMessage id="minicart.seemycart" />
                  </Link>
                  {/* <a
                    onClick={this.handleCheckout}
                    className={`rc-btn rc-btn--one rc-btn--sm btn-block cart__checkout-btn text-white checkout-btn ${
                      this.state.checkoutLoading ? 'ui-btn-loading' : ''
                    }`}
                  >
                    <FormattedMessage id="minicart.checkout" />
                  </a> */}
                </div>
                {/* 总条数在购物车里边 */}
                <div className="rc-bg-colour--brand4 minicart-padding rc-body rc-margin--none rc-padding-y--xs">
                  <span className="rc-meta">
                    <FormattedMessage
                      id="cart.totalProduct_nounit"
                      values={{
                        val: (
                          <b style={{ fontWeight: 500 }}>
                            {this.props.intl.formatMessage(
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
                  {!cartData.length && loading ? (
                    <div className="pt-2 pb-2">
                      <Skeleton color="#f5f5f5" width="100%" count={2} />
                    </div>
                  ) : (
                    cartData.map((item, index) => {
                      // 是否显示折扣价格
                      let showDiscountPrice = true;
                      // 日本如果没有则扣不显示折扣价
                      if (
                        window.__.env.REACT_APP_COUNTRY === 'jp' &&
                        item.originalPrice === item.subscribePrice
                      ) {
                        showDiscountPrice = false;
                      }
                      return (
                        <div className="minicart__product" key={index}>
                          <div className="product-summary__products__item pb-0">
                            <div className="product-line-item">
                              <div className="product-line-item-details d-flex flex-row">
                                <div className="item-image">
                                  <LazyLoad>
                                    <img
                                      className="product-image"
                                      src={optimizeImage({
                                        originImageUrl: item.goodsInfoImg
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
                                              specText: item.specText || '',
                                              buyCount: item.buyCount
                                            }}
                                          />
                                        </p>
                                      </div>
                                    </div>
                                    <div className="line-item-total-price justify-content-end pull-right priceBox">
                                      <div className="price relative">
                                        <div className="strike-through non-adjusted-price">
                                          null
                                        </div>

                                        {showDiscountPrice && (
                                          <b
                                            className="pricing line-item-total-price-amount light"
                                            style={{
                                              color: item.goodsInfoFlag
                                                ? '#888'
                                                : '#666',
                                              textDecoration: item.goodsInfoFlag
                                                ? 'line-through'
                                                : '',
                                              display:
                                                item.goodsInfoFlag &&
                                                item.subscriptionPlanGiftList
                                                  ? 'none'
                                                  : 'initial'
                                            }}
                                          >
                                            {formatMoney(
                                              item.salePrice * item.buyCount
                                            )}
                                          </b>
                                        )}
                                      </div>
                                    </div>
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
                                                item.goodsInfoFlag &&
                                                  item.subscriptionPlanGiftList
                                                  ? item.settingPrice *
                                                      item.buyCount
                                                  : item.subscriptionPrice *
                                                      item.buyCount
                                              )}
                                            </span>
                                          </b>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="item-options" />
                              <div className="line-item-promo item-07984de212e393df75a36856b6" />
                            </div>
                            {toJS(item.subscriptionPlanGiftList) && false
                              ? toJS(item.subscriptionPlanGiftList).map(
                                  (gift, i) => (
                                    <div
                                      className="product-line-item-details d-flex flex-row gift-box"
                                      key={i}
                                    >
                                      <div className="item-image">
                                        <LazyLoad>
                                          <img
                                            className="product-image"
                                            src={
                                              optimizeImage({
                                                originImageUrl:
                                                  gift.goodsInfoImg
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
                                            title={gift.goodsInfoName}
                                          >
                                            <span className="light">
                                              {gift.goodsInfoName}
                                            </span>
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            width: '100%',
                                            overflow: 'hidden',
                                            fontSize: '.75rem'
                                          }}
                                        >
                                          x1
                                          <FormattedMessage id="smartFeederSubscription.shopmentTimes" />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                      );
                    })
                  )}
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

export default LoginCart;
