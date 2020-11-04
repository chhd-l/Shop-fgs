import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import LoginButton from '@/components/LoginButton';
import { Link } from 'react-router-dom';
import { formatMoney, getDictionary } from '@/utils/utils';
import { SUBSCRIPTION_DISCOUNT_RATE } from '@/utils/constant';
import { cloneDeep, find, findIndex } from 'lodash';
import catsImg from '@/assets/images/banner-list/cats.jpg';
import dogsImg from '@/assets/images/banner-list/dogs.jpg';
import PetModal from '@/components/PetModal';
import { toJS } from 'mobx';
import { getProductPetConfig } from '@/api/payment';
import Selection from '@/components/Selection';

const sessionItemRoyal = window.__.sessionItemRoyal;

@injectIntl
@inject('checkoutStore')
@observer
class UnLoginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorShow: false,
      errorMsg: '',
      productList: [],
      currentProductIdx: -1,
      loading: true,
      quantityMinLimit: 1,
      quantityMaxLimit: 30,
      checkoutLoading: false,
      validateAllItemsStock: true,
      isPromote: false,
      petModalVisible: false,
      isAdd: 0,
      form: {
        buyWay: 'once', // once/frequency
        frequencyVal: '',
        frequencyName: '',
        frequencyId: -1
      },
      frequencyList: []
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.gotoDetails = this.gotoDetails.bind(this);
    this.headerRef = React.createRef();
  }
  get totalNum() {
    return this.state.productList
      .filter((ele) => ele.selected)
      .reduce((pre, cur) => {
        return pre + cur.quantity;
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
  get isPromote() {
    return parseInt(this.discountPrice) > 0;
  }
  get promotionDesc() {
    return this.props.checkoutStore.promotionDesc;
  }
  get promotionDiscount() {
    return this.props.checkoutStore.promotionDiscount;
  }
  get computedList() {
    return this.state.frequencyList.map((ele) => {
      return {
        value: ele.valueEn,
        ...ele
      };
    });
  }
  componentDidMount() {
    this.setCartData();
    Promise.all([
      getDictionary({ type: 'Frequency_week' }),
      getDictionary({ type: 'Frequency_month' })
    ]).then((dictList) => {
      this.setState(
        {
          frequencyList: [...dictList[0], ...dictList[1]],
          form: Object.assign(this.state.form, {
            frequencyVal: dictList[0][0].valueEn,
            frequencyName: dictList[0][0].name,
            frequencyId: dictList[0][0].id
          })
        },
        () => {
          // this.props.updateSelectedData(this.state.form);
        }
      );
    });
  }
  setCartData() {
    this.setState({
      productList: this.props.checkoutStore.cartData
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
  handleSelectedItemChange(data) {
    console.log(data);
    const { form } = this.state;
    form.frequencyVal = data.value;
    form.frequencyName = data.name;
    form.frequencyId = data.id;
    this.setState({ form: form }, () => {
      // this.props.updateSelectedData(this.state.form);
    });
  }
  async handleCheckout({ needLogin = false } = {}) {
    sessionItemRoyal.set('okta-redirectUrl', '/cart')
    const { history } = this.props;
    this.setState({ checkoutLoading: true });
    try {
      await this.updateStock();
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
        console.log('names', toJS(this.props.checkoutStore.outOfstockProNames))
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
      if (needLogin) {
        // history.push({ pathname: '/login', state: { redirectUrl: '/cart' } })
      } else {
        // this.openPetModal()
        let autoAuditFlag = false
        if(this.isLogin) {
          let res = await getProductPetConfig({goodsInfos: this.props.checkoutStore.loginCartData})
          let handledData = this.props.checkoutStore.loginCartData.map((el, i) => {
            el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag']
            el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag']
            return el
          })
          this.props.checkoutStore.setLoginCartData(handledData)
          let AuditData = handledData.filter(el => el.auditCatFlag)
          this.props.checkoutStore.setAuditData(AuditData)
          autoAuditFlag = res.context.autoAuditFlag
        }else {
          let paramData = this.props.checkoutStore.cartData.map(el => {
            el.goodsInfoId = el.sizeList.filter(item => item.selected)[0].goodsInfoId
            return el
          })
          let res = await getProductPetConfig({goodsInfos: paramData})
          let handledData = paramData.map((el, i) => {
            el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag']
            el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag']
            return el
          })
          this.props.checkoutStore.setCartData(handledData)
          let AuditData = handledData.filter(el => el.auditCatFlag)
          this.props.checkoutStore.setAuditData(AuditData)
          autoAuditFlag = res.context.autoAuditFlag
          this.props.checkoutStore.setPetFlag(res.context.petFlag)
        }
        this.props.checkoutStore.setAutoAuditFlag(autoAuditFlag)
        history.push('/prescription');
      }
    } catch (e) {
      console.log(e);
      this.setState({
        errorShow: true,
        errorMsg: e.toString()
      });
    } finally {
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
  handleAmountChange(e, item) {
    this.setState({ errorShow: false });
    const val = e.target.value;
    if (val === '') {
      item.quantity = val;
      this.setState({
        productList: this.state.productList
      });
    } else {
      const { quantityMinLimit, quantityMaxLimit } = this.state;
      let tmp = parseInt(val);
      if (isNaN(tmp)) {
        tmp = 1;
        this.setState({
          errorShow: true,
          errorMsg: <FormattedMessage id="cart.errorInfo" />
        });
        setTimeout(() => {
          this.setState({
            errorShow: false
          });
        }, 2000);
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit;
        this.setState({
          errorShow: true,
          errorMsg: <FormattedMessage id="cart.errorInfo" />
        });
        setTimeout(() => {
          this.setState({
            errorShow: false
          });
        }, 2000);
      }
      if (tmp > quantityMaxLimit) {
        tmp = quantityMaxLimit;
      }
      item.quantity = tmp;
      this.setState(
        {
          productList: this.state.productList
        },
        () => {
          this.updateStock();
        }
      );
    }
  }
  addQuantity(item) {
    this.setState({ errorShow: false });
    if (item.quantity < 30) {
      item.quantity++;
      this.setState(
        {
          productList: this.state.productList
        },
        () => {
          this.updateStock();
        }
      );
    } else {
      this.showErrMsg(<FormattedMessage id="cart.errorMaxInfo" />);
    }
  }
  subQuantity(item) {
    this.setState({ errorShow: false });
    if (item.quantity > 1) {
      item.quantity--;
      this.setState(
        {
          productList: this.state.productList
        },
        () => {
          this.updateStock();
        }
      );
    } else {
      this.setState({
        errorShow: true,
        errorMsg: <FormattedMessage id="cart.errorInfo" />
      });
      setTimeout(() => {
        this.setState({
          errorShow: false
        });
      }, 2000);
    }
  }
  deleteProduct(item) {
    let { currentProductIdx, productList } = this.state;
    item.confirmTooltipVisible = false;
    productList.splice(currentProductIdx, 1);
    this.setState(
      {
        productList: productList
      },
      () => {
        this.updateStock();
      }
    );
  }
  goBack(e) {
    e.preventDefault();
    const { history } = this.props;
    history.goBack();
  }
  async updateStock() {
    const { productList } = this.state;
    this.setState({ checkoutLoading: true });
    await this.props.checkoutStore.updateUnloginCart(productList);
    this.setState({ checkoutLoading: false });
  }
  gotoDetails(pitem) {
    sessionItemRoyal.set('rc-goods-cate-name', pitem.goodsCateName || '');
    sessionItemRoyal.set('rc-goods-name', pitem.goodsName);
    this.props.history.push('/details/' + pitem.sizeList[0].goodsInfoId);
  }
  toggleSelect(pitem) {
    pitem.selected = !pitem.selected;
    this.setState(
      {
        productList: this.state.productList
      },
      () => {
        this.updateStock();
      }
    );
  }
  getProducts(plist) {
    const { checkoutLoading, form } = this.state;
    console.log(toJS(plist), 'plist');
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
              src={
                find(pitem.sizeList, (s) => s.selected).goodsInfoImg ||
                pitem.goodsImg
              }
              alt={pitem.goodsName}
              title={pitem.goodsName}
            />
          </div>
          <div className="product-info__desc w-100 relative">
            <div className="line-item-header rc-margin-top--xs rc-padding-right--sm">
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
              <div>
                <div>
                  {pitem.goodsDescription}
                </div>
                <div className="align-left flex rc-margin-bottom--xs">
                  <div className="stock__wrapper">
                    <div className="stock">
                      <label className="availability instock">
                        <span className="title-select"></span>
                      </label>
                      <span
                        className="availability-msg"
                        data-ready-to-order="true"
                      >
                        <div>
                          <FormattedMessage id="details.inStock" />
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-quickview product-null product-wrapper product-detail">
                <div className="detail-panel">
                  <section className="attributes">
                    <div data-attr="size" className="swatch">
                      <div className="cart-and-ipay">
                        <div className="rc-swatch __select-size">
                          {/* <div className="rc-swatch__item selected">
                            <span>
                              {find(pitem.sizeList, s => s.selected).specText}
                              <i></i>
                            </span>
                          </div> */}
                          {pitem.goodsSpecs.map((sItem, i) => (
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
                                    this.handleChooseSize(sdItem, pitem, index)
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
                        value={pitem.quantity}
                        min="1"
                        max="10"
                        onChange={(e) => this.handleAmountChange(e, pitem)}
                      />
                      <span
                        className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                        data-quantity-error-msg="Вы не можете заказать больше 10"
                        onClick={() => this.addQuantity(pitem)}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="availability  product-availability">
              <div className="flex justify-content-between rc-md-up">
                
              <div className="buyMethod rc-margin-bottom--xs">
                          <div className="radioBox">
                            <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width ml-2">
                              {/* <FormattedMessage id="email">
                                {(txt) => (
                                  <input
                                    className="rc-input__radio"
                                    id="optsemail"
                                    type="radio"
                                    alt={txt}
                                    name="buyWay"
                                    value="once"
                                    key="1"
                                    // onChange={(event) => this.handleInputChange(event)}
                                    checked
                                  />
                                )}
                              </FormattedMessage> */}
                              <label
                                className="rc-input__label--inline"
                                htmlFor="optsemail"
                              >
                                <span
                                  style={{ fontWeight: '400', color: '#333' }}
                                >
                                  <FormattedMessage id="Single purchase" />
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="price" style={{ fontSize: '22px' }}>
                            {/* {formatMoney(currentUnitPrice)} */}
                          </div>
                        </div>
                        <div className="buyMethod rc-margin-bottom--xs">
                          <div className="radioBox">
                            <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width ml-2">
                              {/* <FormattedMessage id="email">
                                {(txt) => (
                                  <input
                                    className="rc-input__radio"
                                    id="optsemail"
                                    type="radio"
                                    alt={txt}
                                    name="buyWay"
                                    value="once"
                                    key="1"
                                    // onChange={(event) => this.handleInputChange(event)}
                                    checked
                                  />
                                )}
                              </FormattedMessage> */}
                              <label
                                className="rc-input__label--inline"
                                htmlFor="optsemail"
                              >
                                <span
                                  style={{ fontWeight: '400', color: '#333' }}
                                >
                                  <FormattedMessage id="autoship" />
                                  <span
                                    className="info-tooltip delivery-method-tooltip"
                                    onMouseEnter={() => {
                                      this.setState({
                                        toolTipVisible: true
                                      });
                                    }}
                                    onMouseLeave={() => {
                                      this.setState({
                                        toolTipVisible: false
                                      });
                                    }}
                                  >
                                    i
                                  </span>
                                  <ConfirmTooltip
                                    arrowStyle={{ left: '65%' }}
                                    display={this.state.toolTipVisible}
                                    cancelBtnVisible={false}
                                    confirmBtnVisible={false}
                                    updateChildDisplay={(status) =>
                                      this.setState({
                                        toolTipVisible: status
                                      })
                                    }
                                    content={
                                      <FormattedMessage id="subscription.promotionTip2" />
                                    }
                                  />
                                </span>
                              </label>
                            </div>
                            <br />
                            Save extra{' '}
                            <b className="product-pricing__card__head__price red  rc-padding-y--none">
                              10%
                            </b>
                          </div>
                          <div className="freqency">
                            delivery every:
                            <Selection
                              customContainerStyle={{
                                display: 'inline-block',
                                marginLeft: '100px'
                              }}
                              selectedItemChange={(data) =>
                                this.handleSelectedItemChange(data)
                              }
                              optionList={this.computedList}
                              selectedItemData={{
                                value: form.frequencyVal
                              }}
                              key={form.frequencyVal}
                              customStyleType="select-one"
                            />
                          </div>
                          <div className="price">
                            {/* {formatMoney(currentSubscriptionPrice || 0)} */}
                          </div>
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
                  value={pitem.quantity}
                  onChange={(e) => this.handleAmountChange(e, pitem)}
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
                  {formatMoney(
                    pitem.quantity *
                      pitem.sizeList.filter((el) => el.selected)[0].salePrice
                  )}
                </b>
              </div>
            </div>
          </div>
          <div className="availability product-availability">
            <div className="flex justify-content-between flex-wrap">
              <div>
                {find(pitem.sizeList, (s) => s.selected).subscriptionStatus &&
                find(pitem.sizeList, (s) => s.selected).subscriptionPrice >
                  0 ? (
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
                      pitem.quantity <=
                      find(pitem.sizeList, (s) => s.selected).stock
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
                      className={`${
                        pitem.quantity <=
                        find(pitem.sizeList, (s) => s.selected).stock
                          ? ''
                          : 'out-stock'
                      }`}
                    >
                      {pitem.addedFlag &&
                      pitem.quantity <=
                        find(pitem.sizeList, (s) => s.selected).stock ? (
                        <FormattedMessage id="details.inStock" />
                      ) : pitem.addedFlag ? (
                        <FormattedMessage id="details.outStock" />
                      ) : (
                        <FormattedMessage id="details.OffShelves" />
                      )}
                    </div>
                  </span>
                </div>
                {/* <div className="promotion stock" style={{ marginTop: '7px', display: this.isPromote ? 'inline-block' : 'none' }}>
                  <label className={['availability', pitem.addedFlag && pitem.quantity <= find(pitem.sizeList, s => s.selected).stock ? 'instock' : 'outofstock'].join(' ')} >
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
  /**
   *
   * @param {*} pItem 单条product info
   * @param {*} sizeItem 当前product选中的规格信息
   * @param {*} index 当前product的索引
   */
  handleChooseSize(sdItem, pitem, index) {
    pitem.goodsSpecs
      .filter((item) => item.specId === sdItem.specId)[0]
      .chidren.map((item) => {
        if (item.specDetailId === sdItem.specDetailId) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });

    let selectedSpecIds = [];
    let selectedSpecDetailId = [];
    for (let item of pitem.goodsSpecs) {
      const selectedItem = item.chidren.filter((ele) => ele.selected)[0];
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
    // 之前sku pitem.goodsInfoId
    // 增加当前sku selectedGoodsInfo.goodsInfoId
    Array.from(pitem.sizeList, (ele) => {
      if (selectedGoodsInfo.goodsInfoId === ele.goodsInfoId) {
        ele.selected = true;
      } else {
        ele.selected = false;
      }
      return ele;
    });

    const { productList } = this.state;
    // 合并购物车，有相同规格的，删除本条
    const tmpIdx = findIndex(
      productList.filter((el, i) => i !== index),
      (ele) =>
        find(ele.sizeList, (s) => s.selected).goodsInfoId ===
        selectedGoodsInfo.goodsInfoId
    );
    if (tmpIdx > -1) {
      productList.splice(tmpIdx, 1);
    }

    this.setState(
      {
        productList: productList
      },
      () => {
        this.updateStock();
      }
    );
  }
  updateConfirmTooltipVisible(item, status) {
    let { productList } = this.state;
    item.confirmTooltipVisible = status;
    this.setState({
      productList: productList
    });
  }
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const { checkoutLoading } = this.state;
    return (
      <div className={`${className}`} style={{ ...style }} id={id}>
        <div
          className="group-order rc-border-colour--interface cart__total__content rc-border-all"
          style={{ background: '#fff' }}
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
                <a className={`${checkoutLoading ? 'ui-btn-loading' : ''}`}>
                  <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                    {this.totalNum > 0 ? (
                      <LoginButton
                        beforeLoginCallback={async () =>
                          this.handleCheckout({ needLogin: true })
                        }
                        btnClass="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width"
                        history={this.props.history}
                      >
                        <FormattedMessage id="checkout" />
                      </LoginButton>
                    ) : (
                      <div className="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width rc-btn-solid-disabled">
                        <FormattedMessage id="checkout" />
                      </div>
                    )}
                  </div>
                  <div className="rc-padding-y--xs rc-column">
                    {this.totalNum > 0 ? (
                      <div
                        className="text-center"
                        onClick={() => this.handleCheckout()}
                      >
                        <div
                          className="rc-styled-link color-999"
                          aria-pressed="true"
                        >
                          <FormattedMessage id="GuestCheckout" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="rc-styled-link color-999 rc-btn-disabled">
                          <FormattedMessage id="GuestCheckout" />
                        </div>
                      </div>
                    )}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { productList, checkoutLoading } = this.state;
    const List = this.getProducts(this.state.productList);
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
          className={[
            'rc-content--fixed-header',
            productList.length ? '' : 'cart-empty'
          ].join(' ')}
        >
          <div className="rc-bg-colour--brand3 rc-max-width--xl rc-padding--sm rc-bottom-spacing pt-0">
            {productList.length ? (
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
                          zIndex: 9,
                          width: 320,
                          position: 'relative'
                        },
                        id: 'J_sidecart_fix'
                      })}
                      {this.sideCart()}
                    </div>
                    {this.state.productList.some((el) => {
                      const selectedItem = el.sizeList.filter(
                        (s) => s.selected
                      )[0];
                      return (
                        selectedItem.subscriptionStatus &&
                        selectedItem.subscriptionPrice > 0
                      );
                    }) ? (
                      <div className="text-center" style={{ fontSize: '15px' }}>
                        <FormattedMessage id="unLoginSubscriptionTips" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </>
            ) : (
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
                              <img className="w-100" src={dogsImg} alt="Dog" />
                              <br />
                              <h4 className="card__title red">
                                <FormattedMessage id="cart.dogDiet" />
                              </h4>
                            </Link>
                          </div>
                          <div className="ui-item border radius-3">
                            <Link to="/list/cats">
                              <img className="w-100" src={catsImg} alt="Cat" />
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

export default UnLoginCart;
