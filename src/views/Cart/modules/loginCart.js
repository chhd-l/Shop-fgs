import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfirmTooltip from '@/components/ConfirmTooltip';
//import PetModal from '@/components/PetModal';
import BannerTip from '@/components/BannerTip';
import { Link } from 'react-router-dom';
import { formatMoney, mergeUnloginCartData } from '@/utils/utils';
//import { SUBSCRIPTION_DISCOUNT_RATE } from '@/utils/constant';
import { find } from 'lodash';
//import { getPetList } from '@/api/pet';
//import { getCustomerInfo } from '@/api/user';
import {
  updateBackendCart,
  deleteItemFromBackendCart,
  switchSize
} from '@/api/cart';
import { getProductPetConfig } from '@/api/payment';
import catsImg from '@/assets/images/banner-list/cats.jpg';
import dogsImg from '@/assets/images/banner-list/dogs.jpg';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('checkoutStore')
@injectIntl
@observer
class LoginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorShow: false,
      errorMsg: '',
      productList: [],
      currentProductIdx: -1,
      quantityMinLimit: 1,
      quantityMaxLimit: 30,
      deleteLoading: false,
      checkoutLoading: false,
      petModalVisible: false,
      isAdd: 0,
      initLoading: true
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.gotoDetails = this.gotoDetails.bind(this);
    this.headerRef = React.createRef();
  }
  async componentDidMount() {
    // 合并购物车(登录后合并非登录态的购物车数据)
    const unloginCartData = this.checkoutStore.cartData;
    if (unloginCartData.length) {
      await mergeUnloginCartData();
      await this.checkoutStore.updateLoginCart();
    }
    this.setData();
  }
  get checkoutStore() {
    return this.props.checkoutStore;
  }
  get totalNum() {
    return this.state.productList.reduce((prev, cur) => {
      return prev + cur.buyCount;
    }, 0);
  }
  get totalPrice() {
    return this.props.checkoutStore.totalPrice;
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  get discountPrice() {
    return this.props.checkoutStore.discountPrice;
  }
  get deliveryPrice() {
    return this.props.checkoutStore.deliveryPrice;
  }
  get subscriptionPrice() {
    return this.props.checkoutStore.subscriptionPrice;
  }
  get promotionDesc() {
    return this.props.checkoutStore.promotionDesc;
  }
  get promotionDiscount() {
    return this.props.checkoutStore.promotionDiscount;
  }
  get isPromote() {
    return parseInt(this.discountPrice) > 0;
  }
  async updateCartCache() {
    this.setState({ checkoutLoading: true });
    await this.checkoutStore.updateLoginCart();
    this.setData();
    this.setState({ checkoutLoading: false });
  }
  setData() {
    this.setState({
      productList: this.checkoutStore.loginCartData,
      checkoutLoading: false,
      initLoading: false
    });
  }
  /**
   * 加入后台购物车
   */
  async updateBackendCart(param) {
    this.setState({ checkoutLoading: true });
    await updateBackendCart(param);
    await this.updateCartCache();
    this.setState({ checkoutLoading: false });
  }
  /**
   * 删除某个产品
   *
   */
  async deleteItemFromBackendCart(param) {
    this.setState({ checkoutLoading: true });
    await deleteItemFromBackendCart(param);
    await this.updateCartCache();
  }
  async handleCheckout() {
    try {
      const { productList } = this.state;
      this.setState({ checkoutLoading: true });
      await this.updateCartCache();
      this.setState({ checkoutLoading: false });
      // 价格未达到底限，不能下单
      if (this.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
        window.scrollTo({ behavior: 'smooth', top: 0 });
        this.showErrMsg(
          <FormattedMessage
            id="cart.errorInfo3"
            values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }}
          />
        );
        return false;
      }

      // 存在下架商品，不能下单
      if (this.props.checkoutStore.offShelvesProNames.length) {
        window.scrollTo({ behavior: 'smooth', top: 0 });
        this.showErrMsg(
          <FormattedMessage
            id="cart.errorInfo4"
            values={{
              val: this.props.checkoutStore.offShelvesProNames.join('/')
            }}
          />
        );
        return false;
      }

      // 库存不够，不能下单
      if (this.props.checkoutStore.outOfstockProNames.length) {
        window.scrollTo({ behavior: 'smooth', top: 0 });
        this.showErrMsg(
          <FormattedMessage
            id="cart.errorInfo2"
            values={{
              val: this.props.checkoutStore.outOfstockProNames.join('/')
            }}
          />
        );
        return false;
      }

      this.checkoutStore.setLoginCartData(productList);
      // this.openPetModal()
      let autoAuditFlag = false
      let res = await getProductPetConfig({goodsInfos: this.props.checkoutStore.loginCartData})
      let handledData = this.props.checkoutStore.loginCartData.map((el, i) => {
        el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag']
        return el
      })
      let AuditData = handledData.filter(el => el.auditCatFlag)
      this.props.checkoutStore.setAuditData(AuditData)
      autoAuditFlag = res.context.autoAuditFlag
      this.props.checkoutStore.setAutoAuditFlag(autoAuditFlag)
      this.props.history.push('/prescription');
    } catch (err) {
      this.setState({ checkoutLoading: false });
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
  showErrMsg(msg) {
    this.setState({
      errorShow: true,
      errorMsg: msg
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorShow: false
      });
    }, 3000);
  }
  handleAmountChange(value, item) {
    this.setState({
      errorShow: false
    });
    const val = value;
    if (val === '') {
      item.buyCount = val;
      this.setState({
        productList: this.state.productList
      });
    } else {
      const { quantityMinLimit, quantityMaxLimit } = this.state;
      let tmp = parseInt(val);
      if (isNaN(tmp)) {
        tmp = 1;
        this.showErrMsg(<FormattedMessage id="cart.errorInfo" />);
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit;
        this.showErrMsg(<FormattedMessage id="cart.errorInfo" />);
      }
      if (tmp > quantityMaxLimit) {
        tmp = quantityMaxLimit;
      }
      item.buyCount = tmp;
      clearTimeout(this.amountTimer);
      this.amountTimer = setTimeout(() => {
        this.updateBackendCart({
          goodsInfoId: item.goodsInfoId,
          goodsNum: item.buyCount,
          verifyStock: false
        });
      }, 500);
    }
  }
  addQuantity(item) {
    if (this.state.checkoutLoading) {
      return;
    }
    this.setState({ errorShow: false });
    if (item.buyCount < 30) {
      item.buyCount++;
      this.updateBackendCart({
        goodsInfoId: item.goodsInfoId,
        goodsNum: item.buyCount,
        verifyStock: false
      });
    } else {
      this.showErrMsg(<FormattedMessage id="cart.errorMaxInfo" />);
    }
  }
  subQuantity(item) {
    if (this.state.checkoutLoading) {
      return;
    }
    this.setState({ errorShow: false });
    if (item.buyCount > 1) {
      item.buyCount--;
      this.updateBackendCart({
        goodsInfoId: item.goodsInfoId,
        goodsNum: item.buyCount,
        verifyStock: false
      });
    } else {
      this.showErrMsg(<FormattedMessage id="cart.errorInfo" />);
    }
  }
  async deleteProduct(item) {
    let { currentProductIdx, productList } = this.state;
    item.confirmTooltipVisible = false;
    this.setState({
      productList: productList,
      deleteLoading: true
    });
    await this.deleteItemFromBackendCart({
      goodsInfoIds: [productList[currentProductIdx].goodsInfoId]
    });
    this.setState({ deleteLoading: false });
  }
  goBack(e) {
    e.preventDefault();
    this.props.history.goBack();
  }
  gotoDetails(pitem) {
    sessionItemRoyal.set('rc-goods-cate-name', pitem.goodsCateName || '');
    sessionItemRoyal.set('rc-goods-name', pitem.goodsName);
    this.props.history.push('/details/' + pitem.goodsInfoId);
  }
  toggleSelect(pitem) {
    // todo 请求接口
    // pitem.selected = !pitem.selected
    // this.setState({
    //   productList: this.state.productList
    // })
  }
  getProducts(plist) {
    const Lists = plist.map((pitem, index) => (
      <div
        className="rc-border-all rc-border-colour--interface product-info"
        key={index}
      >
        {pitem.goodsPromotion ? (
          <span
            className="position-absolute bg-primary text-white pl-2 pr-2"
            style={{ bottom: '-1px', left: '-1px', fontSize: '.9em' }}
          >
            {pitem.goodsPromotion}
          </span>
        ) : null}

        <div
          className="rc-input rc-input--inline position-absolute hidden"
          style={{ left: '1%' }}
          onClick={() => this.toggleSelect(pitem)}
        >
          {pitem.selected ? (
            <input
              type="checkbox"
              className="rc-input__checkbox"
              key={1}
              checked
            />
          ) : (
            <input type="checkbox" className="rc-input__checkbox" key={2} />
          )}
          <label className="rc-input__label--inline">&nbsp;</label>
        </div>
        <div className="d-flex pl-3">
          <div className="product-info__img w-100">
            <img
              className="product-image"
              style={{ maxWidth: '100px' }}
              src={pitem.goodsInfoImg}
              alt={pitem.goodsName}
              title={pitem.goodsName}
            />
          </div>
          <div className="product-info__desc w-100 relative">
            <div
              className="line-item-header rc-margin-top--xs rc-padding-right--sm"
              style={{ width: '80%' }}
            >
              <a
                className="ui-cursor-pointer"
                onClick={() => this.gotoDetails(pitem)}
              >
                <h4
                  className="rc-gamma rc-margin--none ui-text-overflow-line2 text-break"
                  title={pitem.goodsName}
                >
                  {pitem.goodsName}
                </h4>
              </a>
            </div>
            <div className="cart-product-error-msg"></div>
            <span className="remove-product-btn">
              <span
                className="rc-icon rc-close--sm rc-iconography"
                onClick={() => {
                  this.updateConfirmTooltipVisible(pitem, true);
                  this.setState({ currentProductIdx: index });
                }}
              />
              <ConfirmTooltip
                containerStyle={{ transform: 'translate(-89%, 105%)' }}
                arrowStyle={{ left: '89%' }}
                display={pitem.confirmTooltipVisible}
                confirm={(e) => this.deleteProduct(pitem)}
                updateChildDisplay={(status) =>
                  this.updateConfirmTooltipVisible(pitem, status)
                }
              />
            </span>
            <div className="product-edit rc-margin-top--sm--mobile rc-margin-bottom--xs rc-padding--none rc-margin-top--xs d-flex flex-column flex-sm-row justify-content-between">
              <div className="product-quickview product-null product-wrapper product-detail">
                <div className="detail-panel">
                  <section className="attributes">
                    <div data-attr="size" className="swatch">
                      <div className="cart-and-ipay">
                        <div className="rc-swatch __select-size">
                          {/* <div className="rc-swatch__item selected">
                            <span>
                              {pitem.specText}
                              <i></i>
                            </span>
                          </div> */}
                          {(pitem.goodsSpecs || []).map((sItem, i) => (
                            <div key={i} className="overflow-hidden">
                              <div className="text-left ml-1">
                                {sItem.specName}:
                              </div>
                              {sItem.chidren.map((sdItem, i2) => (
                                <div
                                  className={`rc-swatch__item ${
                                    sdItem.selected ? 'selected' : ''
                                  }`}
                                  key={i2}
                                  onClick={() =>
                                    this.handleChooseSize(sdItem, pitem)
                                  }
                                >
                                  <span key={i2}>
                                    {sdItem.detailName}
                                    <i></i>
                                  </span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="rc-md-up">
                <div className="product-card-footer product-card-price d-flex">
                  <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
                    <div className="rc-quantity d-flex">
                      <span
                        className=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                        onClick={() => this.subQuantity(pitem)}
                      ></span>
                      <input
                        className="rc-quantity__input"
                        value={pitem.buyCount}
                        min="1"
                        max="10"
                        onChange={(e) =>
                          this.handleAmountChange(e.target.value, pitem)
                        }
                      />
                      <span
                        className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                        data-quantity-error-msg="Вы не можете заказать больше 10"
                        onClick={() => this.addQuantity(pitem)}
                      ></span>
                    </div>
                  </div>
                  <div className="line-item-total-price d-flex justify-content-center">
                    <p className="line-item-price-info line-item-total-price-amount rc-margin-bottom--none rc-margin-right--xs flex-grow-1 text-right">
                      =
                    </p>
                    <div className="price">
                      <b className="pricing line-item-total-price-amount light">
                        {formatMoney(pitem.buyCount * pitem.salePrice)}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="availability  product-availability">
              <div className="flex justify-content-between rc-md-up">
                <div>
                  {pitem.subscriptionStatus && pitem.subscriptionPrice > 0 ? (
                    <>
                      <span
                        className="iconfont font-weight-bold red mr-1"
                        style={{ fontSize: '.9em' }}
                      >
                        &#xe675;
                      </span>
                      <FormattedMessage id="autoshop" />
                    </>
                  ) : null}
                </div>
                <div className="stock__wrapper">
                  <div className="stock">
                    <label
                      className={`availability ${
                        pitem.addedFlag && pitem.buyCount <= pitem.stock
                          ? 'instock'
                          : 'outofstock'
                      }`}
                    >
                      <span className="title-select">
                        <FormattedMessage id="details.availability" /> :
                      </span>
                    </label>
                    <span className="availability-msg">
                      {pitem.addedFlag && pitem.buyCount <= pitem.stock ? (
                        <div>
                          <FormattedMessage id="details.inStock" />
                        </div>
                      ) : (
                        <div className="out-stock">
                          {pitem.addedFlag ? (
                            <FormattedMessage id="details.outStock" />
                          ) : (
                            <FormattedMessage id="details.OffShelves" />
                          )}
                        </div>
                      )}
                    </span>
                  </div>
                  {/* <div className="promotion stock" style={{ display: parseInt(this.discountPrice) > 0 ? 'inline-block' : 'none' }}>
                    <label className={['availability', pitem.addedFlag && pitem.buyCount <= pitem.stock ? 'instock' : 'outofstock'].join(' ')} >
                      <span><FormattedMessage id="promotion" /> :</span>
                    </label>
                    <span className="availability-msg">
                      25% OFF
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rc-margin-bottom--sm rc-md-down">
          <div className="product-card-footer product-card-price d-flex">
            <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
              <div className="rc-quantity d-flex">
                <span
                  className=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                  onClick={() => this.subQuantity(pitem)}
                ></span>
                <input
                  className="rc-quantity__input"
                  value={pitem.buyCount}
                  onChange={(e) =>
                    this.handleAmountChange(e.target.value, pitem)
                  }
                  min="1"
                  max="10"
                />
                <span
                  className=" rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                  onClick={() => this.addQuantity(pitem)}
                ></span>
              </div>
            </div>
            <div className="line-item-total-price d-flex justify-content-center">
              <p className="line-item-price-info line-item-total-price-amount rc-margin-bottom--none rc-margin-right--xs flex-grow-1 text-right">
                =
              </p>
              <div className="price">
                <div className="strike-through non-adjusted-price">null</div>
                <b className="pricing line-item-total-price-amount light">
                  {formatMoney(pitem.buyCount * pitem.salePrice)}
                </b>
              </div>
            </div>
          </div>
          <div className="availability  product-availability">
            <div className="flex justify-content-between flex-wrap">
              <div>
                {pitem.subscriptionStatus && pitem.subscriptionPrice > 0 ? (
                  <>
                    <span
                      className="iconfont font-weight-bold red mr-1"
                      style={{ fontSize: '.9em' }}
                    >
                      &#xe675;
                    </span>
                    <FormattedMessage id="details.Subscription" />
                  </>
                ) : null}
              </div>
              <div className="stock__wrapper">
                <div className="stock" style={{ margin: '.5rem 0 -.4rem' }}>
                  <label
                    className={[
                      'availability',
                      pitem.addedFlag && pitem.buyCount <= pitem.stock
                        ? 'instock'
                        : 'outofstock'
                    ].join(' ')}
                  >
                    <span className="title-select">
                      <FormattedMessage id="details.availability" /> :
                    </span>
                  </label>
                  <span className="availability-msg">
                    <div
                      className={[
                        pitem.addedFlag && pitem.buyCount <= pitem.stock
                          ? ''
                          : 'out-stock'
                      ].join(' ')}
                    >
                      {pitem.addedFlag && pitem.buyCount <= pitem.stock ? (
                        <FormattedMessage id="details.inStock" />
                      ) : pitem.addedFlag ? (
                        <FormattedMessage id="details.outStock" />
                      ) : (
                        <FormattedMessage id="details.OffShelves" />
                      )}
                    </div>
                  </span>
                </div>
                {/* <div className="promotion stock" style={{ marginTop: '7px', display: parseInt(this.discountPrice) > 0 ? 'inline-block' : 'none' }}>
                  <label className={['availability', pitem.addedFlag && pitem.buyCount <= pitem.stock ? 'instock' : 'outofstock'].join(' ')} >
                    <span><FormattedMessage id="promotion" /> :</span>
                  </label>
                  <span className="availability-msg">
                    25% OFF
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
    return Lists;
  }
  updateConfirmTooltipVisible(item, status) {
    let { productList } = this.state;
    item.confirmTooltipVisible = status;
    this.setState({
      productList: productList
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
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const { checkoutLoading } = this.state;
    return (
      <div
        className={`group-order rc-border-all rc-border-colour--interface cart__total__content ${className}`}
        style={{ ...style }}
        id={id}
      >
        <div className="row">
          <div className="col-12 total-items medium">
            <FormattedMessage
              id="cart.totalProduct"
              values={{ val: this.totalNum }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <FormattedMessage id="total" />
          </div>
          <div className="col-4 no-padding-left">
            <p className="text-right sub-total">
              {formatMoney(this.totalPrice)}
            </p>
          </div>
        </div>
        <div
          className={`row red ${
            parseInt(this.discountPrice) > 0 ? 'd-flex' : 'hidden'
          }`}
        >
          <div className="col-8">
            <p>
              {this.promotionDesc}({this.promotionDiscount})
            </p>
          </div>
          <div className="col-4">
            <p className="text-right shipping-cost">
              - {formatMoney(this.discountPrice)}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <p>
              <FormattedMessage id="delivery" />
            </p>
          </div>
          <div className="col-4">
            <p className="text-right shipping-cost">
              {formatMoney(this.deliveryPrice)}
            </p>
          </div>
        </div>
        <div className="group-total">
          <div className="row">
            <div className="col-7 medium">
              <strong>
                <FormattedMessage id="totalIncluIVA" />
              </strong>
            </div>
            <div className="col-5">
              <p className="text-right grand-total-sum medium">
                {formatMoney(this.tradePrice)}
              </p>
            </div>
          </div>
          <div className="row checkout-proccess">
            <div className="col-lg-12 checkout-continue">
              <a onClick={() => this.handleCheckout()}>
                <div className="rc-padding-y--xs rc-column">
                  <div
                    data-oauthlogintargetendpoint="2"
                    className={`rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width ${
                      checkoutLoading ? 'ui-btn-loading' : ''
                    } `}
                    aria-pressed="true"
                  >
                    <FormattedMessage id="checkout" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  async handleChooseSize(sdItem, pitem) {
    if (this.state.changSizeLoading) {
      return false;
    }
    this.setState({ changSizeLoading: true });

    const otherGoodsSpecs = pitem.goodsSpecs.filter(
      (s) => s.specId !== sdItem.specId
    );
    let selectedSpecIds = [sdItem.specId];
    let selectedSpecDetailId = [sdItem.specDetailId];
    for (let item of otherGoodsSpecs) {
      const selectedItem = find(item.chidren, (ele) => ele.selected);
      selectedSpecIds.push(selectedItem.specId);
      selectedSpecDetailId.push(selectedItem.specDetailId);
    }

    const selectedGoodsInfo = pitem.goodsInfos.filter(
      (ele) =>
        ele.mockSpecIds.sort().toString() ===
          selectedSpecIds.sort().toString() &&
        ele.mockSpecDetailIds.sort().toString() ===
          selectedSpecDetailId.sort().toString()
    )[0];
    // this.setState({ deleteLoading: true })
    // // 先删除改之前sku
    // await deleteItemFromBackendCart({ goodsInfoIds: [pitem.goodsInfoId] })
    // // 再增加当前sku
    // await this.updateBackendCart({ goodsInfoId: selectedGoodsInfo.goodsInfoId, goodsNum: pitem.buyCount, verifyStock: false })
    await switchSize({
      purchaseId: pitem.purchaseId,
      goodsInfoId: selectedGoodsInfo.goodsInfoId
    });
    this.updateCartCache();
    this.setState({ changSizeLoading: false });
  }
  render() {
    const { productList, checkoutLoading, initLoading } = this.state;
    const List = this.getProducts(productList);
    const event = {
      page: {
        type: 'Cart',
        theme: ''
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header
          ref={this.headerRef}
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main
          className={`rc-content--fixed-header ${
            productList.length ? '' : 'cart-empty'
          }`}
        >
          <BannerTip />
          <div className="rc-bg-colour--brand3 rc-max-width--xl rc-padding--sm rc-bottom-spacing pt-0">
            {initLoading ? (
              <div className="mt-4">
                <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
              </div>
            ) : (
              <>
                {productList.length > 0 && (
                  <>
                    <div className="rc-layout-container rc-one-column pt-1">
                      <div className="rc-column">
                        <FormattedMessage id="continueShopping">
                          {(txt) => (
                            <a
                              tabIndex="1"
                              className="ui-cursor-pointer-pure"
                              onClick={(e) => this.goBack(e)}
                              title={txt}
                            >
                              <span className="rc-header-with-icon rc-header-with-icon--gamma">
                                <span className="rc-icon rc-left rc-iconography"></span>
                                {txt}
                              </span>
                            </a>
                          )}
                        </FormattedMessage>
                      </div>
                    </div>
                    <div className="rc-layout-container rc-three-column cart cart-page pt-0">
                      <div className="rc-column rc-double-width pt-0">
                        <div
                          className="rc-padding-bottom--xs cart-error-messaging cart-error"
                          style={{
                            display: this.state.errorShow ? 'block' : 'none'
                          }}
                        >
                          <aside
                            className="rc-alert rc-alert--error rc-alert--with-close text-break"
                            role="alert"
                          >
                            <span style={{ paddingLeft: 0 }}>
                              {this.state.errorMsg}
                            </span>
                          </aside>
                        </div>
                        <div className="rc-padding-bottom--xs">
                          <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                            <FormattedMessage id="cart.yourShoppingCart" />
                          </h5>
                        </div>
                        <div id="product-cards-container">{List}</div>
                      </div>
                      <div className="rc-column totals cart__total pt-0">
                        <div className="rc-padding-bottom--xs">
                          <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                            <FormattedMessage id="orderSummary" />
                          </h5>
                        </div>
                        <div id="J_sidecart_container">
                          {this.sideCart({
                            className: 'hidden rc-md-up',
                            style: {
                              background: '#fff',
                              zIndex: 9,
                              width: 320,
                              position: 'relative'
                            },
                            id: 'J_sidecart_fix'
                          })}
                          {this.sideCart()}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {productList.length == 0 && !initLoading && (
                  <>
                    <div className="rc-text-center">
                      <div className="rc-beta mb-1 mt-3">
                        <FormattedMessage id="cart.yourShoppingCart" />
                      </div>
                      <div className="rc-gamma title-empty mb-0">
                        <FormattedMessage id="header.basketEmpty" />
                      </div>
                    </div>
                    <div className="content-asset">
                      <div className="rc-bg-colour--brand3 rc-padding--sm pt-0 pb-0">
                        <div className="rc-max-width--lg rc-padding-x--lg--mobile">
                          <div>
                            <div className="rc-alpha inherit-fontsize">
                              <p className="text-center">
                                <FormattedMessage id="cart.fullPrice" />
                              </p>
                            </div>
                            <div
                              className="d-flex justify-content-between flex-wrap ui-pet-item text-center"
                              style={{ margin: '0 10%' }}
                            >
                              <div className="ui-item border radius-3">
                                <Link to="/list/dogs">
                                  <img
                                    className="w-100"
                                    src={dogsImg}
                                    alt="Dog"
                                  />
                                  <br />
                                  <h4 className="card__title red">
                                    <FormattedMessage id="cart.dogDiet" />
                                  </h4>
                                </Link>
                              </div>
                              <div className="ui-item border radius-3">
                                <Link to="/list/cats">
                                  <img
                                    className="w-100"
                                    src={catsImg}
                                    alt="Cat"
                                  />
                                  <br />
                                  <h4 className="card__title red">
                                    <FormattedMessage id="cart.catDiet" />
                                  </h4>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </main>
        <Footer />
        {/* <PetModal visible={this.state.petModalVisible}
          isAdd={this.state.isAdd}
          productList={this.state.productList}
          openNew={() => this.openNew()}
          closeNew={() => this.closeNew()}
          confirm={() => this.petComfirm()}
          close={() => this.closePetModal()} /> */}
      </div>
    );
  }
}

export default LoginCart;
