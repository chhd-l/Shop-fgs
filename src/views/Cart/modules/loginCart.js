import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfirmTooltip from '@/components/ConfirmTooltip';
//import PetModal from '@/components/PetModal';
import { Link } from 'react-router-dom';
import {
  formatMoney,
  mergeUnloginCartData,
  getFrequencyDict,
  distributeLinktoPrecriberOrPaymentPage,
  getDeviceType
} from '@/utils/utils';
//import { SUBSCRIPTION_DISCOUNT_RATE } from '@/utils/constant';
import find from 'lodash/find';
import Selection from '@/components/Selection';
import cartImg from './images/cart.png';
import refreshImg from './images/refresh.png';
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
import catsImgFr from '@/assets/images/banner-list/cats-fr.png';
import dogsImgFr from '@/assets/images/banner-list/dogs-fr.png';
import LazyLoad from 'react-lazyload';
import './index.less';
import '../index.css';
import BannerTip from '@/components/BannerTip';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
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
      initLoading: true,
      form: {
        buyWay: 0, //0 - once/ 1 - frequency
        frequencyVal: '',
        frequencyName: '',
        frequencyId: -1
      },
      frequencyList: [],
      discount: [], //促销码的折扣信息汇总
      promotionInputValue: '', //输入的促销码
      lastPromotionInputValue: '', //上一次输入的促销码
      isClickApply: false, //是否点击apply按钮
      isShowValidCode: false, //是否显示无效promotionCode
      isMobile: getDeviceType() === 'H5',
      activeToolTipIndex: 0
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.gotoDetails = this.gotoDetails.bind(this);
  }
  async componentDidMount() {
    await getFrequencyDict().then((res) => {
      if(process.env.REACT_APP_ACCESS_PATH === 'https://shopstg.royalcanin.com/fr/') {
        this.setState({
          frequencyList: res,
          form: Object.assign(this.state.form, {
            frequencyVal: '4',
            frequencyName: '4 semaine(s)',
            frequencyId: 3560
          })
        });
      }else {
        this.setState({
          frequencyList: res,
          form: Object.assign(this.state.form, {
            frequencyVal: res[0] ? res[0].valueEn : '',
            frequencyName: res[0] ? res[0].name : '',
            frequencyId: res[0] ? res[0].id : ''
          })
        });
      }
    });

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
  get computedList() {
    return this.state.frequencyList.map((ele) => {
      delete ele.value;
      return {
        value: ele.valueEn,
        ...ele
      };
    });
  }
  handleSelectedItemChange(pitem, data) {
    pitem.form.frequencyVal = data.value;
    pitem.form.frequencyName = data.name;
    pitem.form.frequencyId = data.id;
    pitem.periodTypeId = data.id;
    this.changeFrequencyType(pitem);
  }
  async updateCartCache() {
    this.setState({ checkoutLoading: true });
    await this.checkoutStore.updateLoginCart();
    this.setData();
    this.setState({ checkoutLoading: false });
  }
  setData() {
    let productList = this.checkoutStore.loginCartData.map((el) => {
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
      productList: productList,
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
  handleCheckout = async () => {
    try {
      const { configStore, checkoutStore, history, clinicStore } = this.props;
      const { productList } = this.state;
      this.setState({ checkoutLoading: true });
      await this.updateCartCache();

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
      if (checkoutStore.offShelvesProNames.length) {
        window.scrollTo({ behavior: 'smooth', top: 0 });
        this.showErrMsg(
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
        window.scrollTo({ behavior: 'smooth', top: 0 });
        this.showErrMsg(
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
        window.scrollTo({ behavior: 'smooth', top: 0 });
        this.showErrMsg(
          <FormattedMessage
            id="cart.errorInfo5"
            values={{
              val: checkoutStore.deletedProNames.join('/')
            }}
          />
        );
        return false;
      }

      this.checkoutStore.setLoginCartData(productList);
      // this.openPetModal()
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
    } finally {
      this.setState({ checkoutLoading: false });
    }
  };
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
    if (item.buyCount < process.env.REACT_APP_LIMITED_NUM) {
      item.buyCount++;
      this.updateBackendCart({
        goodsInfoId: item.goodsInfoId,
        goodsNum: item.buyCount,
        verifyStock: false
      });
    } else {
      this.showErrMsg(
        <FormattedMessage
          id="cart.errorMaxInfo"
          values={{ val: process.env.REACT_APP_LIMITED_NUM }}
        />
      );
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
  //GA 移除购物车商品 埋点
  GARemoveFromCart(product){
    console.log(product)
    //debugger
    const list = product.map((item,index)=>{
      return {
        'name': item.goodsName, 
        'id': item.goodsId, 
        'club': 'no', 
        'type': '', //club, subscription, one-time
        'price': item.marketPrice,
        'brand': 'Royal Canin',
        'category': item.goodsCategory,
        'variant': item.goodsWeight,
        'quantity': item.buyCount,
        'recommendation':'recommended',//self-selected, recommanded
        'sku':item.goodsInfos.length&&item.goodsInfos[0].goodsInfoId
      }
    })

    console.log(list)
    //debugger

    dataLayer.push({
      'event': `${process.env.REACT_APP_GTM_SITE_ID}eComRemoveFromCartt`,
      'ecommerce': {
           'remove': {
                 'products': list
             }
         }
    })
    console.log(dataLayer)
    //debugger
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

    //this.GARemoveFromCart(productList[currentProductIdx])
  }
  goBack(e) {
    e.preventDefault();
    this.props.history.goBack();
  }
  gotoDetails(pitem) {
    sessionItemRoyal.set('rc-goods-cate-name', pitem.goodsCateName || '');
    
    this.props.history.push(`/${pitem.goodsName.toLowerCase().split(' ').join('-')}-${pitem.goodsNo}`);
    // this.props.history.push('/details/' + pitem.goodsInfoId);
  }
  toggleSelect(pitem) {
    // todo 请求接口
    // pitem.selected = !pitem.selected
    // this.setState({
    //   productList: this.state.productList
    // })
  }
  getProducts(plist) {
    let { form, isMobile } = this.state;
    console.log(plist, 'ssss');
    const Lists = plist.map((pitem, index) => {
      return (
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
              <LazyLoad>
                <img
                  className="product-image"
                  style={{ maxWidth: '100px' }}
                  src={pitem.goodsInfoImg}
                  alt={pitem.goodsName}
                  title={pitem.goodsName}
                />
              </LazyLoad>
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
                <div
                  style={{
                    maxWidth: '250px',
                    width: isMobile ? '9rem' : 'inherit'
                  }}
                >
                  <div className="productGoodsSubtitle">
                    {pitem.goods.goodsSubtitle}
                  </div>
                  <div className="align-left flex rc-margin-bottom--xs">
                    {/* <div className="stock__wrapper">
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
                  </div> */}
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
                          {/* <FormattedMessage id="details.availability" /> : */}
                        </span>
                      </label>
                      <span
                        className="availability-msg"
                        style={{ display: 'inline-block' }}
                      >
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
                            {pitem.goodsSpecs &&
                              pitem.goodsSpecs.map((sItem, i) => (
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
                                        this.handleChooseSize(
                                          sdItem,
                                          pitem,
                                          index
                                        )
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
                      <div className="rc-quantity d-flex" >
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
                          <LazyLoad>
                            <img src={cartImg} />
                          </LazyLoad>
                          <FormattedMessage id="singlePurchase" />
                        </span>
                      </div>
                      <div
                        className="price singlePrice"
                        style={{ fontSize: '22px' }}
                      >
                        {/* {formatMoney(
                        pitem.quantity *
                          pitem.sizeList.filter((el) => el.selected)[0].salePrice
                      )} */}
                        {formatMoney(pitem.buyCount * pitem.salePrice)}
                      </div>
                    </div>
                  </div>
                  {pitem.subscriptionStatus ? (
                    <div
                      className="buyMethod rc-margin-bottom--xs rc-margin-left--xs"
                      style={{
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
                            <LazyLoad>
                              <img src={refreshImg} />
                            </LazyLoad>
                            <FormattedMessage id="autoship" />
                            <span
                              className="info-tooltip delivery-method-tooltip"
                              onMouseEnter={() => {
                                this.setState({
                                  toolTipVisible: true,
                                  activeToolTipIndex: index
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
                              display={this.state.toolTipVisible && index === this.state.activeToolTipIndex}
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

                          <FormattedMessage
                            id="saveExtraMoney"
                            values={{
                              val: (
                                <b className="product-pricing__card__head__price red  rc-padding-y--none">
                                  {formatMoney(
                                    pitem.buyCount * pitem.salePrice -
                                      pitem.buyCount * pitem.subscriptionPrice
                                  )}
                                </b>
                              )
                            }}
                          />
                        </div>
                        <div className="price">
                          <div
                            style={{
                              fontSize: '15px',
                              textDecoration: 'line-through'
                            }}
                          >
                            {formatMoney(pitem.buyCount * pitem.salePrice)}
                          </div>
                          <div style={{ color: '#ec001a' }}>
                            {formatMoney(
                              pitem.buyCount * pitem.subscriptionPrice
                            )}
                          </div>

                          {/* {formatMoney(currentSubscriptionPrice || 0)} */}
                        </div>
                      </div>
                      <div className="freqency">
                        <span>
                          <FormattedMessage id="subscription.frequency" />:
                        </span>
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
                            // value: pitem.periodTypeId
                          }}
                          key={index}
                          customStyleType="select-one"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="rc-margin-bottom--sm rc-md-down">
            <div className="product-card-footer product-card-price d-flex rc-margin-bottom--sm"  >
              <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
                <div className="rc-quantity d-flex">
                  <span
                    className=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                    onClick={() => this.subQuantity(pitem)}
                  ></span>
                  <input
                    className="rc-quantity__input"
                    value={pitem.buyCount}
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
                    <LazyLoad>
                      <img src={cartImg} />
                    </LazyLoad>
                    <span style={{ fontSize: '16px' }}>
                      <FormattedMessage id="singlePurchase" />
                    </span>
                  </span>
                </div>
                <div className="price singlePrice" style={{ fontSize: '18px' }}>
                  {formatMoney(pitem.buyCount * pitem.salePrice)}
                </div>
              </div>
            </div>
            {pitem.subscriptionStatus ? (
              <div
                className="buyMethod rc-margin-bottom--xs"
                style={{
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
                      <LazyLoad>
                        <img src={refreshImg} />
                      </LazyLoad>
                      <FormattedMessage id="autoship" />
                      <span
                        className="info-tooltip delivery-method-tooltip"
                        onMouseEnter={() => {
                          this.setState({
                            toolTipVisible: true,
                            activeToolTipIndex: index
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
                        display={this.state.toolTipVisible && index === this.state.activeToolTipIndex}
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
                    <br />
                    <FormattedMessage
                      id="saveExtraMoney"
                      values={{
                        val: (
                          <b className="product-pricing__card__head__price red  rc-padding-y--none">
                            {formatMoney(
                              pitem.buyCount * pitem.salePrice -
                                pitem.buyCount * pitem.subscriptionPrice
                            )}
                          </b>
                        )
                      }}
                    />
                  </div>
                  <div className="price">
                    <div
                      style={{
                        fontSize: '15px',
                        textDecoration: 'line-through'
                      }}
                    >
                      {formatMoney(pitem.buyCount * pitem.salePrice)}
                    </div>
                    <div style={{ color: '#ec001a' }}>
                      {formatMoney(pitem.buyCount * pitem.subscriptionPrice)}
                    </div>

                    {/* {formatMoney(currentSubscriptionPrice || 0)} */}
                  </div>
                </div>
                <div className="freqency">
                  <span>
                    <FormattedMessage id="subscription.frequency" />:
                  </span>
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
            ) : null}
          </div>
          {/* <div className="rc-margin-bottom--sm rc-md-down">
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
                </div>
              </div>
            </div>
          </div> */}
        </div>
      );
    });
    return Lists;
  }
  updateConfirmTooltipVisible(item, status) {
    let { productList } = this.state;
    item.confirmTooltipVisible = status;
    this.setState({
      productList: productList
    });
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
  handlerChange(e) {
    let promotionInputValue = e.target.value;
    this.setState({
      promotionInputValue
    });
  }
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const { checkoutLoading, discount } = this.state;
    const { checkoutStore, loginStore } = this.props;
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
          <div className="col-6">
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

              <label className="rc-input__label" htmlFor="id-text2" />
            </span>
          </div>
          <div className="col-6 no-padding-left">
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
                  if (!loginStore.isLogin) {
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
          <div className="col-6">
            <FormattedMessage id="total" />
          </div>
          <div className="col-6 no-padding-left">
            <p className="text-right sub-total">
              {formatMoney(this.totalPrice)}
            </p>
          </div>
        </div>
        {/* 显示订阅折扣 */}
        <div
          className={`row leading-lines shipping-item red ${
            parseFloat(this.subscriptionPrice) > 0 ? 'd-flex' : 'hidden'
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
            parseInt(this.discountPrice) > 0 && this.state.discount.length === 0
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
                        if (!loginStore.isLogin) {
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
          {this.state.isShowValidCode ? (
            <div className="red pl-3 pb-3 border-top pt-2">
              Promotion code({this.state.lastPromotionInputValue}) is not Valid
            </div>
          ) : null}

          <div className="row checkout-proccess">
            <div className="col-lg-12 checkout-continue">
              <a onClick={this.handleCheckout}>
                <div className="rc-padding-y--xs rc-column">
                  <div
                    data-oauthlogintargetendpoint="2"
                    className={`rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width ${
                      checkoutLoading ? 'ui-btn-loading' : ''
                    }`}
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
  renderSideCart({ fixToHeader = true }) {
    return fixToHeader ? (
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
    ) : (
      this.sideCart()
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
    await switchSize({
      purchaseId: pitem.purchaseId,
      goodsInfoId: selectedGoodsInfo.goodsInfoId,
      periodTypeId: pitem.periodTypeId,
      goodsInfoFlag: pitem.goodsInfoFlag
    });
    this.updateCartCache();
    this.setState({ changSizeLoading: false });
  }
  async changeFrequencyType(pitem) {
    if (this.state.changSizeLoading) {
      return false;
    }
    this.setState({ changSizeLoading: true });
    await switchSize({
      purchaseId: pitem.purchaseId,
      goodsInfoId: pitem.goodsInfoId,
      goodsInfoFlag: pitem.goodsInfoFlag,
      periodTypeId: pitem.periodTypeId
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
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      }
    };
    const dogsPic = process.env.REACT_APP_LANG === 'fr'?dogsImgFr:dogsImg
    const catsPic = process.env.REACT_APP_LANG === 'fr'?catsImgFr:catsImg
    return (
      <div className="Carts">
        <GoogleTagManager additionalEvents={event} />
        <Header
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
                        {this.renderSideCart({
                          fixToHeader: process.env.REACT_APP_LANG !== 'fr'
                        })}
                      </div>
                    </div>
                  </>
                )}
                {productList.length === 0 && !initLoading && (
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
                              // style={{ margin: '0 10%' }}
                              style={process.env.REACT_APP_LANG === 'fr'?{}:{ margin: '0 10%' }}
                            >
                              <div className="ui-item border radius-3">
                                <Link to="/dogs">
                                  <LazyLoad>
                                    <img
                                      className="w-100"
                                      src={dogsPic}
                                      alt="Dog"
                                    />
                                  </LazyLoad>
                                  <br />
                                  <h4 className="card__title red">
                                    <FormattedMessage id="cart.dogDiet" />
                                  </h4>
                                </Link>
                              </div>
                              <div className="ui-item border radius-3">
                                <Link to="/cats">
                                  <LazyLoad>
                                    <img
                                      className="w-100"
                                      src={catsPic}
                                      alt="Cat"
                                    />
                                  </LazyLoad>
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
