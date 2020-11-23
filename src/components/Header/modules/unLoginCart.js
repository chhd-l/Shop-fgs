import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import LoginButton from '@/components/LoginButton';
import { formatMoney } from '@/utils/utils';
import { find } from 'lodash';
import { inject, observer } from 'mobx-react';
//import PetModal from '@/components/PetModal';
import { getProductPetConfig } from '@/api/payment';
import './index.css'

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('checkoutStore', 'headerCartStore')
@observer
class UnloginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutLoading: false,
      petModalVisible: false,
      isAdd: 0
    };
  }
  componentDidMount() {
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
  async handleCheckout({ needLogin = false } = {}) {
    sessionItemRoyal.set('okta-redirectUrl', '/cart');
    const { history } = this.props;
    this.setState({ checkoutLoading: true });
    this.props.checkoutStore.updateUnloginCart();
    this.setState({ checkoutLoading: false });
    if (this.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
      this.props.headerCartStore.setErrMsg(
        <FormattedMessage
          id="cart.errorInfo3"
          values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }}
        />
      );
      return false;
    }

    // 存在下架商品，不能下单
    if (this.props.checkoutStore.offShelvesProNames.length) {
      this.props.headerCartStore.setErrMsg(
        <FormattedMessage
          id="cart.errorInfo4"
          values={{
            val: this.props.checkoutStore.offShelvesProNames.join('/')
          }}
        />
      );
      return false;
    }

    if (this.props.checkoutStore.outOfstockProNames.length) {
      console.log(this.props.checkoutStore.outOfstockProNames, 'names');
      this.props.headerCartStore.setErrMsg(
        <FormattedMessage
          id="cart.errorInfo2"
          values={{
            val: this.props.checkoutStore.outOfstockProNames.join('/')
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
        let paramData = this.props.checkoutStore.cartData.map((el) => {
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
        this.props.checkoutStore.setCartData(handledData);
        let AuditData = handledData.filter((el) => el.auditCatFlag);
        this.props.checkoutStore.setAuditData(AuditData);
        autoAuditFlag = res.context.autoAuditFlag;
        this.props.checkoutStore.setPetFlag(res.context.petFlag);
      }
      this.props.checkoutStore.setAutoAuditFlag(autoAuditFlag);
      history.push('/prescription');
    }
  }
  openPetModal() {
    this.setState({
      petModalVisible: true
    });
  }
  closePetModal() {
    if (this.state.isAdd === 2) {
      this.setState({
        isAdd: 0
      });
    }
    this.setState({
      petModalVisible: false
    });
  }
  petComfirm() {
    this.props.history.push('/prescription');
  }
  openNew() {
    this.setState({
      isAdd: 1
    });
    this.openPetModal();
  }
  closeNew() {
    this.setState({
      isAdd: 2
    });
    this.openPetModal();
  }
  render() {
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
          <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon rc-cart--xs rc-iconography rc-interactive"></i>
          {this.totalNum > 0 ? (
            <span className="minicart-quantity">{this.totalNum}</span>
          ) : (
            ''
          )}
        </Link>
        {!this.totalNum ? (
          <div
            className={[
              'popover',
              'popover-bottom',
              headerCartStore.visible ? 'show' : ''
            ].join(' ')}
          >
            <div className="container cart">
              <div className="minicart__footer__msg text-center minicart-padding">
                <span className="minicart__pointer"></span>
                <div className="minicart__empty">
                  <img
                    className="cart-img"
                    src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwbedbf812/images/cart.png"
                    alt="Интернет-магазин ROYAL CANIN®"
                  />
                  <p className="rc-delta">
                    <FormattedMessage id="header.basketEmpty" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
                    <b>{formatMoney(this.tradePrice)}</b>
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
                <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4 text-center">
                  <span
                    id="unLoginCarCheckout"
                    onClick={() => this.handleCheckout()}
                    className={`rc-styled-link color-999 ${
                      this.state.checkoutLoading
                        ? 'ui-btn-loading ui-btn-loading-border-red'
                        : ''
                    }`}
                  >
                    <FormattedMessage id="GuestCheckout" />
                  </span>
                </div>
                <div className="rc-bg-colour--brand4 minicart-padding rc-body rc-margin--none rc-padding-y--xs">
                  <span className="rc-meta">
                    <FormattedMessage
                      id="cart.totalProduct"
                      values={{ val: this.selectedCartData.length }}
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
                                <img
                                  className="product-image"
                                  src={
                                    find(item.sizeList, (s) => s.selected)
                                      .goodsInfoImg
                                  }
                                  alt={item.goodsName}
                                  title={item.goodsName}
                                />
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
                                <div className="line-item-total-price justify-content-start pull-left">
                                  <div className="item-attributes">
                                    <p className="line-item-attributes">
                                      {
                                        find(item.sizeList, (s) => s.selected)
                                          .specText
                                      }{' '}
                                      -{' '}
                                      {item.quantity > 1
                                        ? `${item.quantity} products`
                                        : `${item.quantity} product`}
                                    </p>
                                  </div>
                                </div>
                                <div className="line-item-total-price justify-content-end pull-right priceBox">
                                  <div className="price relative">
                                    <div className="strike-through non-adjusted-price">
                                      null
                                    </div>
                                    <b className="pricing line-item-total-price-amount light">
                                      {formatMoney(item.currentAmount)}
                                    </b>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="item-options"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <PetModal visible={this.state.petModalVisible}
                  isAdd={this.state.isAdd}
                  productList={this.selectedCartData}
                  openNew={() => this.openNew()}
                  closeNew={() => this.closeNew()}
                  confirm={()=>this.petComfirm()}
                  close={() => this.closePetModal()}/> */}
      </span>
    );
  }
}

export default UnloginCart;
