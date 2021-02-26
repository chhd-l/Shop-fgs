import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import LoginButton from '@/components/LoginButton';
import {
  formatMoney,
  distributeLinktoPrecriberOrPaymentPage,
  getFrequencyDict,
  getDeviceType
} from '@/utils/utils';
import find from 'lodash/find';
import { inject, observer } from 'mobx-react';
//import PetModal from '@/components/PetModal';
import { getProductPetConfig } from '@/api/payment';
import './index.css';
import foodDispenserPic from '../../../views/SmartFeederSubscription/img/food_dispenser_pic.png';
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
import { toJS } from 'mobx';
@injectIntl
@inject('checkoutStore', 'headerCartStore', 'clinicStore')
@observer
class UnloginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutLoading: false,
      petModalVisible: false,
      isAdd: 0,
      frequencyList: []
    };
    this.hubGA = process.env.REACT_APP_HUB_GA == '1';
  }
  async componentDidMount() {
    if (window.location.pathname !== '/checkout') {
      await this.props.checkoutStore.removePromotionCode();
    }
    getFrequencyDict().then((res) => {
      this.setState({
        frequencyList: res
      });
    });
    this.props.checkoutStore.updateUnloginCart();
  }
  get selectedCartData() {
    return this.props.checkoutStore.cartData.filter((ele) => ele.selected);
  }
  get totalNum() {
    return this.selectedCartData.reduce((pre, cur) => {
      return pre + cur.quantity;
    }, 0);
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  GAAccessToGuestCheck() {
    this.hubGA ? dataLayer.push({
      'event': 'cartHeaderClicks',
      'cartHeaderClicks': {
        'button': 'Continue as a Guest',
      }
    }) :
      dataLayer.push({
        event: `${process.env.REACT_APP_GTM_SITE_ID}guestCheckout`,
        interaction: {
          category: 'checkout',
          action: 'guest checkout',
          label: 'cart pop-in', //"cart page  "
          value: 1
        }
      });
  }
  async handleCheckout({ needLogin = false } = {}) {
    this.GAAccessToGuestCheck();
    try {
      const {
        configStore,
        checkoutStore,
        history,
        headerCartStore,
        clinicStore
      } = this.props;
      sessionItemRoyal.set('okta-redirectUrl', '/cart');
      this.setState({ checkoutLoading: true });
      checkoutStore.updateUnloginCart();

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
      if (needLogin) {
        // history.push({ pathname: '/login', state: { redirectUrl: '/cart' } })
      } else {
        let autoAuditFlag = false;
        if (this.isLogin) {
        } else {
          let paramData = checkoutStore.cartData.map((el) => {
            el.goodsInfoId = el.sizeList.filter(
              (item) => item.selected
            )[0].goodsInfoId;
            return el;
          });
          let res = await getProductPetConfig({ goodsInfos: paramData });
          let handledData = paramData.map((el, i) => {
            el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
            el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
            return el;
          });
          checkoutStore.setCartData(handledData);
          let AuditData = handledData.filter((el) => el.auditCatFlag);
          checkoutStore.setAuditData(AuditData);
          autoAuditFlag = res.context.autoAuditFlag;
          checkoutStore.setPetFlag(res.context.petFlag);
        }
        checkoutStore.setAutoAuditFlag(autoAuditFlag);
        const url = distributeLinktoPrecriberOrPaymentPage({
          configStore,
          checkoutStore,
          clinicStore,
          isLogin: false
        });
        url && history.push(url);
        // history.push('/prescription');
      }
    } catch (err) {
    } finally {
      this.setState({ checkoutLoading: false });
    }
  }

  EditToCart = () => {
    this.hubGA && dataLayer.push({
      'event': 'cartHeaderClicks',
      'cartHeaderClicks': {
        'button': 'Edit',
      }
    })
  }

  render() {
    const { headerCartStore } = this.props;
    let { frequencyList } = this.state;
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
          <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon rc-cart--xs rc-iconography rc-interactive"></i>
          {this.totalNum > 0 ? (
            <span className="minicart-quantity">{this.totalNum}</span>
          ) : (
            ''
          )}
        </Link>
        {!this.totalNum ? (
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
                <div className="minicart__header cart--head small">
                  <span className="minicart__pointer"></span>
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
                    onClick={this.EditToCart}
                  >
                    <FormattedMessage id="chang" />
                  </Link>
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
                <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                  <LoginButton
                    beforeLoginCallback={async () =>
                      this.handleCheckout({ needLogin: true })
                    }
                    btnClass={`rc-btn rc-btn--one rc-btn--sm btn-block cart__checkout-btn checkout-btn ${
                      this.state.checkoutLoading ? 'ui-btn-loading' : ''
                    }`}
                    history={this.props.history}
                  >
                    <FormattedMessage id="checkout" />
                  </LoginButton>
                </div>
                {!this.selectedCartData.filter((el) => el.goodsInfoFlag)
                  .length ? (
                  <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4 text-center">
                    <span
                      id="unLoginCarCheckout"
                      onClick={() => this.handleCheckout()}
                      className={`rc-styled-link color-999 ui-cursor-pointer ${
                        this.state.checkoutLoading
                          ? 'ui-btn-loading ui-btn-loading-border-red'
                          : ''
                      }`}
                    >
                      <FormattedMessage id="guestCheckout" />
                    </span>
                  </div>
                ) : (
                  <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4 text-center">
                    <FormattedMessage id="unLoginSubscriptionTips" />
                  </div>
                )}

                <div className="rc-bg-colour--brand4 minicart-padding rc-body rc-margin--none rc-padding-y--xs">
                  <span className="rc-meta">
                    <FormattedMessage
                      id="cart.totalProduct_nounit"
                      values={{
                        val: (
                          <b style={{ fontWeight: 500 }}>
                            {this.props.intl.formatMessage(
                              { id: 'payment.totalProduct' },
                              { val: this.totalNum }
                            )}
                          </b>
                        )
                      }}
                    />
                  </span>
                </div>
                <div className="minicart-error cart-error"></div>
                <div className="product-summary limit">
                  {this.selectedCartData.map((item, idx) => (
                    <div className="minicart__product" key={item.goodsId + idx}>
                      <div>
                        <div className="product-summary__products__item">
                          <div className="product-line-item">
                            <div className="product-line-item-details d-flex flex-row">
                              <div className="item-image">
                                {/* <LazyLoad> */}
                                <img
                                  className="product-image"
                                  src={
                                    find(item.sizeList, (s) => s.selected)
                                      .goodsInfoImg
                                  }
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
                                  className="w-100"
                                  style={{ overflow: 'hidden' }}
                                >
                                  <div className="line-item-total-price justify-content-start pull-left">
                                    <div className="item-attributes">
                                      <p className="line-item-attributes">
                                        {
                                          find(item.sizeList, (s) => s.selected)
                                            .specText
                                        }{' '}
                                        - <FormattedMessage id="quantityText" />
                                        ：{item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="line-item-total-price justify-content-end pull-right priceBox">
                                    <div className="price relative">
                                      <div className="strike-through non-adjusted-price">
                                        null
                                      </div>
                                      <b
                                        className="pricing line-item-total-price-amount light"
                                        style={{
                                          color: item.goodsInfoFlag
                                            ? '#888'
                                            : '#666',
                                          textDecoration: item.goodsInfoFlag
                                            ? 'line-through'
                                            : 'inhert'
                                          // textDecoration: 'line-through'
                                        }}
                                      >
                                        {formatMoney(
                                          (item.sizeList.filter(
                                            (s) => s.selected
                                          )[0] &&
                                            item.sizeList.filter(
                                              (s) => s.selected
                                            )[0].currentAmount) ||
                                            0
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
                                            (el) => {
                                              return (
                                                el.id === item.periodTypeId
                                              );
                                            }
                                          )[0] &&
                                            (frequencyList || []).filter(
                                              (el) => {
                                                return (
                                                  el.id === item.periodTypeId
                                                );
                                              }
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
                                              item.sizeList.filter(
                                                (el) => el.selected
                                              )[0].subscriptionPrice *
                                                item.quantity
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
                          </div>
                          {toJS(item.sizeList.filter(e=>e.selected)[0].planId)
                            ? toJS(item.sizeList.filter(e=>e.selected)[0].planGifts).map(
                                (gift) => (
                                  <div className="product-line-item-details d-flex flex-row gift-box">
                                    <div className="item-image">
                                      {/* <LazyLoad> */}
                                      <img
                                        className="product-image"
                                        src={
                                          gift.goodsInfoImg || foodDispenserPic
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
                                          overflow: 'hidden',
                                          fontSize: '12px'
                                        }}
                                      >
                                        x1 <FormattedMessage id="smartFeederSubscription.shopmentTimes" />
                                      </div>
                                    </div>
                                  </div>
                                )
                              )
                            : null}
                        </div>
                      </div>
                    </div>
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
