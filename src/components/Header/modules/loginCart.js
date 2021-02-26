import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage, injectIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import {
  formatMoney,
  distributeLinktoPrecriberOrPaymentPage,
  getFrequencyDict,
  getDeviceType
} from '@/utils/utils';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { getProductPetConfig } from '@/api/payment';
import './index.css';
import foodDispenserPic from '../../../views/SmartFeederSubscription/img/food_dispenser_pic.png';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
@injectIntl
@inject('checkoutStore', 'headerCartStore', 'clinicStore')
@observer
class LoginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutLoading: false,
      frequencyList: []
    };
    this.handleCheckout = this.handleCheckout.bind(this);
  }
  async componentDidMount() {
    if (window.location.pathname !== '/checkout') {
      await this.checkoutStore.removePromotionCode();
    }
    await getFrequencyDict().then((res) => {
      this.setState({
        frequencyList: res
      });
    });
    const pathname = this.props.history.location.pathname;
    if (
      !sessionItemRoyal.get('recommend_product') &&
      pathname !== '/checkout'
    ) {
      this.checkoutStore.updateLoginCart();
    }
  }

  get checkoutStore() {
    return this.props.checkoutStore;
  }
  get cartData() {
    return this.props.checkoutStore.loginCartData.slice();
  }
  get totalNum() {
    return this.cartData.reduce((prev, cur) => {
      return prev + cur.buyCount;
    }, 0);
  }
  get loading() {
    return this.checkoutStore.loadingCartData;
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  async handleCheckout() {
    try {
      const {
        configStore,
        checkoutStore,
        history,
        headerCartStore,
        clinicStore
      } = this.props;
      this.setState({ checkoutLoading: true });
      checkoutStore.updateLoginCart();
      if (this.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
        headerCartStore.setErrMsg(
          <FormattedMessage
            id="cart.errorInfo3"
            values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }}
          />
        );
        return false;
      }

      // 存在下架商品，不能下单
      if (checkoutStore.offShelvesProNames.length) {
        headerCartStore.setErrMsg(
          <FormattedMessage
            id="cart.errorInfo4"
            values={{
              val: checkoutStore.offShelvesProNames.join('/')
            }}
          />
        );
        return false;
      }

      // 库存不够，不能下单
      if (checkoutStore.outOfstockProNames.length) {
        headerCartStore.setErrMsg(
          <FormattedMessage
            id="cart.errorInfo2"
            values={{
              val: checkoutStore.outOfstockProNames.join('/')
            }}
          />
        );
        return false;
      }

      // 存在被删除商品，不能下单
      if (checkoutStore.deletedProNames.length) {
        headerCartStore.setErrMsg(
          <FormattedMessage
            id="cart.errorInfo5"
            values={{
              val: checkoutStore.deletedProNames.join('/')
            }}
          />
        );
        return false;
      }

      let autoAuditFlag = false;
      let res = await getProductPetConfig({
        goodsInfos: checkoutStore.loginCartData
      });
      let handledData = checkoutStore.loginCartData.map((el, i) => {
        el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
        el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
        return el;
      });
      checkoutStore.setLoginCartData(handledData);
      let AuditData = handledData.filter((el) => el.auditCatFlag);
      checkoutStore.setAuditData(AuditData);
      autoAuditFlag = res.context.autoAuditFlag;
      checkoutStore.setAutoAuditFlag(autoAuditFlag);
      checkoutStore.setPetFlag(res.context.petFlag);
      const url = distributeLinktoPrecriberOrPaymentPage({
        configStore,
        checkoutStore,
        clinicStore,
        isLogin: true
      });
      url && history.push(url);
      // history.push('/prescription');
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ checkoutLoading: false });
    }
  }
  render() {
    const { totalNum, cartData, loading } = this;
    const { frequencyList } = this.state;
    // console.log(cartData, 'cartData', frequencyList);
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
        <Link to="/cart" className="minicart-link" data-loc="miniCartOrderBtn">
          <i className="minicart-icon rc-btn rc-btn less-width-xs rc-btn--icon rc-icon rc-cart--xs rc-iconography rc-interactive"></i>
          {totalNum > 0 ? (
            <span className="minicart-quantity">{totalNum}</span>
          ) : (
            ''
          )}
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
                    src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/cart.png`}
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
                <div className="minicart__header cart--head small">
                  <span className="minicart__pointer" />
                  <div className="d-flex minicart_freeshipping_info align-items-center">
                    <i className="rc-icon rc-incompatible--xs rc-brand3 rc-padding-right--xs"></i>
                    <p>
                      {process.env.REACT_APP_IS_PROMOTION === 'true' ? (
                        <FormattedMessage id="cart.miniCartTitle" />
                      ) : (
                        <FormattedMessage id="miniBasket" />
                      )}
                    </p>
                  </div>
                </div>
                <div className="minicart-padding rc-bg-colour--brand4 rc-padding-top--sm rc-padding-bottom--xs">
                  <span className="rc-body rc-margin--none">
                    <FormattedMessage id="total" />{' '}
                    <span style={{ fontWeight: '500' }}>
                      {formatMoney(this.tradePrice)}
                    </span>
                  </span>
                  <Link
                    to="/cart"
                    className="rc-styled-link pull-right"
                    role="button"
                    aria-pressed="true"
                  >
                    <FormattedMessage id="chang" />
                  </Link>
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
                <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                  <a
                    onClick={this.handleCheckout}
                    className={`rc-btn rc-btn--one rc-btn--sm btn-block cart__checkout-btn text-white checkout-btn ${
                      this.state.checkoutLoading ? 'ui-btn-loading' : ''
                    }`}
                  >
                    <FormattedMessage id="checkout" />
                  </a>
                </div>
                <div className="rc-bg-colour--brand4 minicart-padding rc-body rc-margin--none rc-padding-y--xs">
                  <span className="rc-meta">
                    <FormattedMessage
                      id="cart.totalProduct_nounit"
                      values={{
                        val: (
                          <b style={{ fontWeight: 500 }}>
                            {this.props.intl.formatMessage(
                              { id: 'payment.totalProduct' },
                              { val: totalNum }
                            )}
                          </b>
                        )
                      }}
                    />
                  </span>
                </div>
                <div className="minicart-error cart-error"></div>
                <div className="product-summary limit">
                  {!cartData.length && loading ? (
                    <div className="pt-2 pb-2">
                      <Skeleton color="#f5f5f5" width="100%" count={2} />
                    </div>
                  ) : (
                    cartData.map((item, index) => (
                      <div
                        className="minicart__product"
                        key={index}
                        // key={item.goodsInfoId}
                      >
                        <div>
                          <div
                            className="product-summary__products__item"
                            style={{ paddingBottom: 0 }}
                          >
                            <div className="product-line-item">
                              <div className="product-line-item-details d-flex flex-row">
                                <div className="item-image">
                                  {/* <LazyLoad> */}
                                  <img
                                    className="product-image"
                                    src={item.goodsInfoImg}
                                    alt={item.goodsName}
                                    title={item.goodsName}
                                  />
                                  {/* </LazyLoad> */}
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
                                  <div
                                    style={{
                                      width: '100%',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    <div className="line-item-total-price justify-content-start pull-left">
                                      <div className="item-attributes">
                                        {process.env.REACT_APP_LANG !== 'de' ? (
                                          <p className="line-item-attributes">
                                            {item.specText} -{' '}
                                            {item.buyCount > 1
                                              ? `${item.buyCount} `
                                              : `${item.buyCount} `}
                                            <FormattedMessage id="quantityText" />
                                            (s)
                                          </p>
                                        ) : (
                                          <p className="line-item-attributes">
                                            {item.specText} -{' '}
                                            {`Anzahl: ${item.buyCount}`}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="line-item-total-price justify-content-end pull-right priceBox">
                                      <div className="item-total-07984de212e393df75a36856b6 price relative">
                                        <div className="strike-through non-adjusted-price">
                                          null
                                        </div>
                                        <b
                                          className="pricing line-item-total-price-amount item-total-07984de212e393df75a36856b6 light"
                                          style={{
                                            color: item.goodsInfoFlag
                                              ? '#888'
                                              : '#666',
                                            textDecoration: item.goodsInfoFlag
                                              ? 'line-through'
                                              : 'inhert',
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
                                            <FormattedMessage id="subscription.frequency" />
                                            :{' '}
                                            {(frequencyList || []).filter(
                                              (el) =>
                                                el.id === item.periodTypeId
                                            )[0] &&
                                              (frequencyList || []).filter(
                                                (el) =>
                                                  el.id === item.periodTypeId
                                              )[0].name}
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
                                              style={{ fontSize: '14px' }}
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
                              <div className="item-options"></div>
                              <div className="line-item-promo item-07984de212e393df75a36856b6"></div>
                            </div>
                            {console.info(
                              'item.subscriptionPlanGiftList',
                              toJS(item.subscriptionPlanGiftList)
                            )}
                            {toJS(item.planId)
                              ? toJS(item.subscriptionPlanGiftList).map(
                                  (gift) => (
                                    <div className="product-line-item-details d-flex flex-row gift-box">
                                      <div className="item-image">
                                        {/* <LazyLoad> */}
                                        <img
                                          className="product-image"
                                          src={
                                            gift.goodsInfoImg ||
                                            foodDispenserPic
                                          }
                                          alt={gift.goodsInfoName}
                                          title={gift.goodsInfoName}
                                        />
                                        {/* </LazyLoad> */}
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
                                            fontSize: '12px'
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
                      </div>
                    ))
                  )}
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
