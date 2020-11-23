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
import cartImg from './images/cart.png';
import refreshImg from './images/refresh.png';
import PetModal from '@/components/PetModal';
import { toJS } from 'mobx';
import { getProductPetConfig } from '@/api/payment';
import Selection from '@/components/Selection';
import './index.less';

const sessionItemRoyal = window.__.sessionItemRoyal;

@injectIntl
@inject('checkoutStore', 'loginStore')
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
      frequencyList: [],
      discount: [], //促销码的折扣信息汇总
      promotionInputValue: '', //输入的促销码
      lastPromotionInputValue: '', //上一次输入的促销码
      isClickApply: false, //是否点击apply按钮
      isShowValidCode: false //是否显示无效promotionCode
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
  get subscriptionPrice() {
    return this.props.checkoutStore.subscriptionPrice;
  }

  get totalPrice() {
    let totalPrice = 0;
    this.props.checkoutStore.cartData.map((el) => {
      let skuItem = el.sizeList.filter((el) => el.selected)[0];
      if (el.goodsInfoFlag) {
        totalPrice = totalPrice + el.quantity * skuItem.subscriptionPrice;
      } else {
        totalPrice = totalPrice + el.quantity * skuItem.salePrice;
      }
    });
    return totalPrice;
    // return this.props.checkoutStore.totalPrice;
  }
  get tradePrice() {
    return this.totalPrice - this.discountPrice + this.deliveryPrice;
    // return this.props.checkoutStore.tradePrice;
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
  async componentDidMount() {
    await Promise.all([
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
    this.setCartData();
  }
  setCartData() {
    let productList = this.props.checkoutStore.cartData.map((el) => {
      let filterData =
        this.computedList.filter((item) => item.id === el.periodTypeId)[0] ||
        this.computedList[0];
      el.form = {
        frequencyVal: filterData.valueEn,
        frequencyName: filterData.name,
        frequencyId: filterData.id
      };
      return el;
    });
    this.setState({
      productList: productList
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
  handleSelectedItemChange(pitem, data) {
    pitem.form.frequencyVal = data.value;
    pitem.form.frequencyName = data.name;
    pitem.form.frequencyId = data.id;
    pitem.periodTypeId = data.id;
    this.changeFrequencyType(pitem);
    // console.log(data);
    // const { form } = this.state;
    // form.frequencyVal = data.value;
    // form.frequencyName = data.name;
    // form.frequencyId = data.id;
    // this.setState({ form: form }, () => {
    //   // this.props.updateSelectedData(this.state.form);
    // });
  }
  async handleCheckout({ needLogin = false } = {}) {
    sessionItemRoyal.set('okta-redirectUrl', '/cart');
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
        console.log('names', toJS(this.props.checkoutStore.outOfstockProNames));
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
        let autoAuditFlag = false;
        if (this.props.loginStore.isLogin) {
          let res = await getProductPetConfig({
            goodsInfos: this.props.checkoutStore.loginCartData
          });
          let handledData = this.props.checkoutStore.loginCartData.map(
            (el, i) => {
              el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
              el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
              return el;
            }
          );
          this.props.checkoutStore.setLoginCartData(handledData);
          let AuditData = handledData.filter((el) => el.auditCatFlag);
          this.props.checkoutStore.setAuditData(AuditData);
          autoAuditFlag = res.context.autoAuditFlag;
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
              <div style={{ maxWidth: '250px' }}>
                <div>{pitem.goodsSubtitle}</div>
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
                <div
                  className="buyMethod rc-margin-bottom--xs"
                  style={{
                    height: '73px',
                    borderColor: !parseInt(pitem.goodsInfoFlag)
                      ? '#e2001a'
                      : '#d7d7d7',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (pitem.goodsInfoFlag) {
                      pitem.goodsInfoFlag = 0;
                      pitem.periodTypeId = null;
                      this.changeFrequencyType(pitem);
                    }
                  }}
                >
                  <div className="buyMethodInnerBox">
                    <div className="radioBox">
                      <span
                        style={{
                          display: 'inline-block',
                          height: '100%',
                          fontWeight: '100',
                          color: '#666',
                          fontSize: '20px',
                          lineHeight: '56px'
                        }}
                      >
                        <img src={cartImg} />
                        <FormattedMessage id="Single purchase" />
                      </span>
                    </div>
                    <div
                      className="price singlePrice"
                      style={{ fontSize: '22px' }}
                    >
                      {formatMoney(
                        pitem.quantity *
                          pitem.sizeList.filter((el) => el.selected)[0]
                            .salePrice
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="buyMethod rc-margin-bottom--xs rc-margin-left--xs"
                  style={{
                    borderColor: parseInt(pitem.goodsInfoFlag)
                      ? '#e2001a'
                      : '#d7d7d7',
                    cursor: 'pointer',
                    display: pitem.subscriptionStatus? 'block': 'none'
                  }}
                  onClick={() => {
                    if (!pitem.goodsInfoFlag) {
                      pitem.goodsInfoFlag = 1;
                      pitem.periodTypeId = pitem.form.frequencyId;
                      this.changeFrequencyType(pitem);
                    }
                  }}
                >
                  <div className="buyMethodInnerBox">
                    <div className="radioBox">
                      <span
                        style={{
                          fontWeight: '400',
                          color: '#333',
                          display: 'inline-block',
                          marginTop: '5px'
                        }}
                      >
                        <img src={refreshImg} />
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
                      {/* </div> */}
                      <br />
                      Save extra{' '}
                      <b className="product-pricing__card__head__price red  rc-padding-y--none">
                        10%
                      </b>
                    </div>
                    <div className="price">
                      <div
                        style={{
                          fontSize: '15px',
                          textDecoration: 'line-through'
                        }}
                      >
                        {formatMoney(
                          pitem.quantity *
                            pitem.sizeList.filter((el) => el.selected)[0]
                              .salePrice
                        )}
                      </div>
                      <div style={{ color: '#ec001a' }}>
                        {formatMoney(
                          pitem.quantity *
                            pitem.sizeList.filter((el) => el.selected)[0]
                              .subscriptionPrice
                        )}
                      </div>

                      {/* {formatMoney(currentSubscriptionPrice || 0)} */}
                    </div>
                  </div>
                  <div className="freqency">
                    <span>delivery every:</span>
                    <Selection
                      customContainerStyle={{
                        display: 'inline-block',
                        textAlign: 'right'
                      }}
                      selectedItemChange={(data) =>
                        this.handleSelectedItemChange(pitem, data)
                      }
                      optionList={this.computedList}
                      selectedItemData={{
                        value: pitem.form.frequencyVal
                      }}
                      customStyleType="select-one"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rc-margin-bottom--sm rc-md-down">
          <div className="product-card-footer product-card-price d-flex rc-margin-bottom--sm">
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
          </div>
          <div
            className="buyMethod rc-margin-bottom--xs"
            style={{
              height: '73px',
              width: '100%',
              borderColor: !parseInt(pitem.goodsInfoFlag)
                ? '#e2001a'
                : '#d7d7d7',
              cursor: 'pointer'
            }}
            onClick={() => {
              if (pitem.goodsInfoFlag) {
                pitem.goodsInfoFlag = 0;
                pitem.periodTypeId = null;
                this.changeFrequencyType(pitem);
              }
            }}
          >
            <div className="buyMethodInnerBox">
              <div className="radioBox">
                <span
                  style={{
                    display: 'inline-block',
                    height: '100%',
                    fontWeight: '100',
                    color: '#666',
                    fontSize: '20px',
                    lineHeight: '56px'
                  }}
                >
                  <img src={cartImg} />
                  <FormattedMessage id="Single purchase" />
                </span>
              </div>
              <div className="price singlePrice" style={{ fontSize: '22px' }}>
                {formatMoney(
                  pitem.quantity *
                    pitem.sizeList.filter((el) => el.selected)[0].salePrice
                )}
              </div>
            </div>
          </div>
          <div
            className="buyMethod rc-margin-bottom--xs"
            style={{
              display: pitem.subscriptionStatus? 'block': 'none',
              width: '100%',
              borderColor: parseInt(pitem.goodsInfoFlag)
                ? '#e2001a'
                : '#d7d7d7',
              cursor: 'pointer'
            }}
            onClick={() => {
              if (!pitem.goodsInfoFlag) {
                pitem.goodsInfoFlag = 1;
                pitem.periodTypeId = pitem.form.frequencyId;
                this.changeFrequencyType(pitem);
              }
            }}
          >
            <div className="buyMethodInnerBox">
              <div className="radioBox">
                <span
                  style={{
                    fontWeight: '400',
                    color: '#333',
                    display: 'inline-block',
                    marginTop: '5px'
                  }}
                >
                  <img src={refreshImg} />
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
                {/* </div> */}
                <br />
                Save extra{' '}
                <b className="product-pricing__card__head__price red  rc-padding-y--none">
                  10%
                </b>
              </div>
              <div className="price">
                <div
                  style={{
                    fontSize: '15px',
                    textDecoration: 'line-through'
                  }}
                >
                  {formatMoney(
                    pitem.quantity *
                      pitem.sizeList.filter((el) => el.selected)[0].salePrice
                  )}
                </div>
                <div style={{ color: '#ec001a' }}>
                  {formatMoney(
                    pitem.quantity *
                      pitem.sizeList.filter((el) => el.selected)[0]
                        .subscriptionPrice
                  )}
                </div>

                {/* {formatMoney(currentSubscriptionPrice || 0)} */}
              </div>
            </div>
            <div className="freqency">
              <span>delivery every:</span>
              <Selection
                customContainerStyle={{
                  display: 'inline-block',
                  textAlign: 'right'
                }}
                selectedItemChange={(data) =>
                  this.handleSelectedItemChange(pitem, data)
                }
                optionList={this.computedList}
                selectedItemData={{
                  value: form.frequencyVal
                }}
                key={form.frequencyVal}
                customStyleType="select-one"
              />
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
  handlerChange(e) {
    let promotionInputValue = e.target.value;
    this.setState({
      promotionInputValue
    });
  }
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const { checkoutLoading, discount } = this.state;
    const { checkoutStore } = this.props;
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
              <span
                className="rc-input rc-input--inline rc-input--label mr-0"
                style={{ width: '150px', marginBottom: '10px' }}
              >
                <FormattedMessage id="promotionCode">
                  {(txt) => (
                    <input
                      className="rc-input__control"
                      id="id-text2"
                      type="text"
                      name="text"
                      placeholder={txt}
                      value={this.state.promotionInputValue}
                      onChange={(e) => this.handlerChange(e)}
                    />
                  )}
                </FormattedMessage>

                <label className="rc-input__label" for="id-text2"></label>
              </span>
            </div>
            <div className="col-4 no-padding-left">
              <p className="text-right sub-total">
                <button
                  id="promotionApply"
                  className={[
                    'rc-btn',
                    'rc-btn--sm',
                    'rc-btn--two',
                    this.state.isClickApply &&
                      'ui-btn-loading ui-btn-loading-border-red'
                  ].join(' ')}
                  style={{
                    marginTop: '10px',
                    float: 'right',
                    marginBottom: '10px',
                    marginRight: '0'
                  }}
                  onClick={async () => {
                    let result = {};
                    if (!this.state.promotionInputValue) return;
                    this.setState({
                      isClickApply: true,
                      isShowValidCode: false,
                      lastPromotionInputValue: this.state.promotionInputValue
                    });
                    if (!this.props.loginStore.isLogin) {
                      //游客
                      result = await checkoutStore.updateUnloginCart(
                        '',
                        this.state.promotionInputValue
                      );
                    } else {
                      //会员
                      result = await checkoutStore.updateLoginCart(
                        this.state.promotionInputValue,
                        this.props.buyWay === 'frequency'
                      );
                    }
                    if (
                      result.backCode === 'K-000000' &&
                      result.context.promotionDiscount
                    ) {
                      //表示输入apply promotionCode成功
                      discount.splice(0, 1, 1); //(起始位置,替换个数,插入元素)
                      this.setState({ discount });
                      // this.props.sendPromotionCode(
                      //   this.state.promotionInputValue
                      // );
                    } else {
                      this.setState({
                        isShowValidCode: true
                      });
                      // this.props.sendPromotionCode('');
                    }
                    this.setState({
                      isClickApply: false,
                      promotionInputValue: ''
                    });
                  }}
                >
                  <FormattedMessage id="apply" />
                </button>
              </p>
            </div>
            <div className="col-8">
              <FormattedMessage id="total" />
            </div>
            <div className="col-4 no-padding-left">
              <p className="text-right sub-total">
                {formatMoney(this.totalPrice)}
              </p>
            </div>
          </div>
          {/* <div
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
          </div> */}
          {/* 显示订阅折扣 */}
          <div
            className={`row leading-lines shipping-item red ${
              parseInt(this.subscriptionPrice) > 0 ? 'd-flex' : 'hidden'
            }`}
          >
            <div className="col-8">
              <p>{this.promotionDesc || <FormattedMessage id="promotion" />}</p>
            </div>
            <div className="col-4">
              <p className="text-right shipping-cost">
                - {formatMoney(this.subscriptionPrice)}
              </p>
            </div>
          </div>
          {/* 显示 默认折扣 */}
          <div
            className={`row leading-lines shipping-item red ${
              parseInt(this.discountPrice) > 0 &&
              this.state.discount.length === 0
                ? 'd-flex'
                : 'hidden'
            }`}
          >
            <div className="col-8">
              <p>{this.promotionDesc || <FormattedMessage id="promotion" />}</p>
            </div>
            <div className="col-4">
              <p className="text-right shipping-cost">
                - {formatMoney(this.discountPrice)}
              </p>
            </div>
          </div>
          {/* 显示 promotionCode */}
          <div style={{ marginTop: '10px' }}>
            {!this.state.isShowValidCode &&
              this.state.discount.map((el) => (
                <div className={`row leading-lines shipping-item red d-flex`}>
                  <div className="col-6">
                    <p>
                      {this.promotionDesc || (
                        <FormattedMessage id="NoPromotionDesc" />
                      )}
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-right shipping-cost">
                      {/* - {formatMoney(this.discountPrice)} */}
                      <b>-{formatMoney(this.discountPrice)}</b>
                      <span
                        style={{
                          fontSize: '18px',
                          marginLeft: '10px',
                          lineHeight: '20px',
                          cursor: 'pointer'
                        }}
                        onClick={async () => {
                          let result = {};
                          if (!this.props.loginStore.isLogin) {
                            //游客
                            result = await checkoutStore.updateUnloginCart();
                          } else {
                            //会员
                            result = await checkoutStore.updateLoginCart(
                              '',
                              this.props.buyWay === 'frequency'
                            );
                          }
                          if (result.backCode === 'K-000000') {
                            discount.pop();
                            this.setState({
                              discount: discount,
                              isShowValidCode: false
                            });
                          }
                        }}
                      >
                        x
                      </span>
                    </p>
                  </div>
                </div>
              ))}
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
                      this.props.checkoutStore.cartData.filter(
                        (el) => el.goodsInfoFlag
                      ).length > 0 ? (
                        <div
                          className="text-center"
                          style={{ fontSize: '15px' }}
                        >
                          <FormattedMessage id="unLoginSubscriptionTips" />
                        </div>
                      ) : (
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
                      )
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
  async changeFrequencyType(pitem) {
    this.setState({ errorShow: false });
    this.setState(
      {
        productList: this.state.productList
      },
      () => {
        this.updateStock();
      }
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
      <div className="Carts">
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
                    {/* {this.state.productList.some((el) => {
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
                    ) : null} */}
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
