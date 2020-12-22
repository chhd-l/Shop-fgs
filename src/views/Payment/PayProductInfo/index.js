import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import { formatMoney, getFrequencyDict } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { toJS } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

const guid = uuidv4();

const sessionItemRoyal = window.__.sessionItemRoyal;
@inject('checkoutStore', 'loginStore','paymentStore')
@observer
class PayProductInfo extends React.Component {
  static defaultProps = {
    operateBtnVisible: false,
    fixToHeader: false,
    style: {},
    className: '',
    onClickHeader: () => {},
    headerIcon: null,
    step:0,
  };
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      discount: [], //促销码的折扣信息汇总
      promotionInputValue: '', //输入的促销码
      lastPromotionInputValue: '', //上一次输入的促销码
      isClickApply: false, //是否点击apply按钮
      isShowValidCode: false, //是否显示无效promotionCode
      frequencyList: []
    };
    this.handleClickProName = this.handleClickProName.bind(this);
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get totalCount() {
    return formatMoney(
      this.state.productList.reduce(
        (total, item) => total + item.currentAmount,
        0
      )
    );
  }
  get paymentStep() {
    return this.props.paymentStore.paymentStep
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    //     if (nextProps.buyWay === 'once') {
    //       this.setState({isShowValidCode:false})
    //     }
    // console.log(nextProps, 'props2')
    let productList;
    if (
      JSON.stringify(nextProps.data) !==
        JSON.stringify(this.state.productList) &&
      this.props.data.length
    ) {
      productList = nextProps.data;
      this.setState(
        Object.assign({
          productList: productList || []
        })
      );
    }
  }
  //会员
  GACheckout(productList){
    let product = [],
        basketAmount = this.tradePrice,
        basketID = guid,
        option = this.isLogin ? 'account already created':'guest',
        step = this.state.step
    for (let item of productList) {
      product.push({
        brand:item.goods.brandName || 'ROYAL CANIN', //?
        category:item.goods.goodsCateName?JSON.parse(item.goods.goodsCateName)[0]:'',
        club:'no',
        id:item.goods.goodsNo,
        name:item.goods.goodsName,
        price:item.goodsInfoFlag==1?item.subscriptionPrice:item.salePrice,
        quantity:item.buyCount,
        recommendation:'self-selected',
        type:item.goodsInfoFlag==1?'subscription':'one-time',//?
        variant:item.specText?parseInt(item.specText):'',
        sku:item.goodsInfos[0].goodsInfoNo
      })
    }     
    dataLayer[0].checkout.basketAmount = basketAmount
    dataLayer[0].checkout.basketID = basketID
    dataLayer[0].checkout.option = option
    dataLayer[0].checkout.product = product
    dataLayer[0].checkout.step = step
    console.log(dataLayer)
  }
  //游客
  GACheckUnLogin(productList){
        this.getGACheckoutStep()
        console.log(productList)
        let product = [],
        basketAmount = this.tradePrice,
        basketID = guid,
        option = this.isLogin ? 'account already created':'guest',
        step = this.state.step
    for (let item of productList) {
      let cur_selected_size = item.sizeList.filter((item2)=>{
        return item2.selected == true
      })
      let variant = cur_selected_size[0].specText
      let goodsInfoNo = cur_selected_size[0].goodsInfoNo
      product.push({
        brand:item.brandName || 'ROYAL CANIN',
        category:item.goodsCateName?JSON.parse(item.goodsCateName)[0]:'',
        club:'no',
        id:item.goodsNo,
        name:item.goodsName,
        price:item.minMarketPrice,
        quantity:item.quantity,
        recommendation:'self-selected',
        type:'one-time',
        variant:parseInt(variant),
        sku:goodsInfoNo
      })
    }     
    dataLayer[0].checkout.basketAmount = basketAmount
    dataLayer[0].checkout.basketID = basketID
    dataLayer[0].checkout.option = option
    dataLayer[0].checkout.product = product
    dataLayer[0].checkout.step = step
  }
  //获取GA step
  getGACheckoutStep(){
    console.log(this.paymentStep)
    //debugger
  }
  async componentDidMount() {
    let productList;
    if (this.props.data.length) {
      productList = this.props.data;
    } else if (this.isLogin) {
      productList = this.props.checkoutStore.loginCartData;
    } else {
      productList = this.props.checkoutStore.cartData.filter(
        (ele) => ele.selected
      );
    }
    this.setState(
      Object.assign({
        productList: productList || []
      })
    );
    getFrequencyDict().then((res) => {
      this.setState({
        frequencyList: res
      });
    });
    
    if(this.isLogin){
      this.GACheckout(productList)
    }else{
      this.GACheckUnLogin(productList)
    }
    
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
  matchNamefromDict(dictList, id) {
    return find(dictList, (ele) => ele.id.toString() === id.toString())
      ? find(dictList, (ele) => ele.id.toString() === id.toString()).name
      : id;
  }
  getProducts(plist) {
    const List = plist.map((el, i) => {
      let selectedSizeItem = el.sizeList.filter((item) => item.selected)[0];
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <LazyLoad>
                  <img
                    className="product-image"
                    src={find(el.sizeList, (s) => s.selected).goodsInfoImg}
                    alt=""
                  />
                </LazyLoad>
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div
                    className="line-item-name ui-text-overflow-line2 text-break"
                    title={el.goodsName}
                    onClick={this.handleClickProName.bind(this, el)}
                  >
                    <span className="light">{el.goodsName}</span>
                  </div>
                </div>
                <div className="line-item-total-price justify-content-start pull-left">
                  <div className="item-attributes">
                    <p className="line-item-attributes">
                      {selectedSizeItem.specText} -{' '}
                      {el.quantity > 1 ? (
                        <FormattedMessage
                          id="items"
                          values={{ val: el.quantity }}
                        />
                      ) : (
                        <FormattedMessage
                          id="item"
                          values={{ val: el.quantity }}
                        />
                      )}
                    </p>
                  </div>
                </div>
                <div className="line-item-total-price justify-content-end pull-right">
                  <div>{formatMoney(el.currentAmount)}</div>
                </div>
              </div>
            </div>
            <div className="item-options"></div>
          </div>
        </div>
      );
    });
    return List;
  }
  isSubscription(el) {
    return el.goodsInfoFlag;
  }
  handleClickProName(item) {
    sessionItemRoyal.set(
      'rc-goods-cate-name',
      (item.goodsCategory.split('/') && item.goodsCategory.split('/')[1]) || ''
    );
    sessionItemRoyal.set('recomment-preview', this.props.location.pathname);
    // this.props.history.push(
    //   `/details/${
    //     this.isLogin ? item.goodsInfoId : item.sizeList[0].goodsInfoId
    //   }`
    // );
    this.props.history.push(
      `/${item.goodsName.toLowerCase().split(' ').join('-')}-${item.goodsNo}`
    );
  }
  getProductsForLogin(plist) {
    const List = plist.map((el, i) => {
      return (
        <div className="product-summary__products__item" key={i}>
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <LazyLoad>
                  <img className="product-image" src={el.goodsInfoImg} alt="" />
                </LazyLoad>
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div
                    className="line-item-name ui-text-overflow-line2 text-break"
                    title={el.goodsName || el.goods.goodsName}
                  >
                    <span className="light">
                      {el.goodsName || el.goods.goodsName}
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div
                    className="line-item-total-price"
                    style={{ width: '77%' }}
                  >
                    {el.specText} -{' '}
                    {el.buyCount > 1 ? (
                      <FormattedMessage
                        id="items"
                        values={{ val: el.buyCount }}
                      />
                    ) : (
                      <FormattedMessage
                        id="item"
                        values={{ val: el.buyCount }}
                      />
                    )}
                    <br />
                    {el.goodsInfoFlag ? (
                      <>
                        <FormattedMessage id="subscription.frequency" /> :{' '}
                        {this.matchNamefromDict(
                          this.state.frequencyList,
                          el.periodTypeId
                        )}{' '}
                      </>
                    ) : null}
                  </div>
                  <div className="line-item-total-price text-nowrap">
                    {this.isSubscription(el) ? (
                      <>
                        <span className="text-line-through">
                          {formatMoney(el.buyCount * el.salePrice)}
                        </span>
                        <br />
                      </>
                    ) : null}
                    <span>
                      {formatMoney(
                        this.isSubscription(el)
                          ? el.buyCount * el.subscriptionPrice
                          : el.buyCount * el.salePrice
                      )}
                    </span>
                  </div>
                </div>
                {el.goodsInfoFlag ? (
                  <div>
                    <span
                      className="iconfont font-weight-bold green"
                      style={{ fontSize: '.8em' }}
                    >
                      &#xe675;
                    </span>
                    &nbsp; <FormattedMessage id="Vous avez économisé" />{' '}
                    <span className="green">
                      {formatMoney(
                        el.buyCount * el.salePrice -
                          el.buyCount * el.subscriptionPrice
                      )}
                    </span>{' '}
                    <FormattedMessage id="avecLabonnement" />
                    &nbsp; 
                    {/* <FormattedMessage id="confirmation.subscriptionDiscountPriceDes" values={{
                      val1:(
                        <span className="green">
                          {formatMoney(
                            el.buyCount * el.salePrice -
                              el.buyCount * el.subscriptionPrice
                          )}
                        </span>
                      )
                    }}/> */}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="item-options" />
          </div>
        </div>
      );
    });
    return List;
  }
  getTotalItems() {
    const { headerIcon } = this.props;
    const { productList } = this.state;
    let quantityKeyName = 'quantity';
    if (this.isLogin || this.props.data.length) {
      quantityKeyName = 'buyCount';
    }
    return (
      <div
        className="product-summary__itemnbr border-bottom d-flex align-items-center justify-content-between pl-md-3 pr-md-3 pt-2 pb-2 pt-md-3 pb-md-3"
        onClick={this.props.onClickHeader}
      >
        {headerIcon}
        <span className="medium">
          <FormattedMessage
            id="payment.totalProduct"
            values={{
              val: productList.reduce(
                (total, item) => total + item[quantityKeyName],
                0
              )
            }}
          />
        </span>
        {this.props.operateBtnVisible && (
          <Link to="/cart" className="product-summary__cartlink rc-styled-link">
            <FormattedMessage id="edit" />
          </Link>
        )}
      </div>
    );
  }
  sideCart({ className = '', style = {}, id = '' } = {}) {
    const { productList, discount } = this.state;
    const { checkoutStore } = this.props;
    const List =
      this.isLogin || this.props.data.length
        ? this.getProductsForLogin(productList)
        : this.getProducts(productList);
    return (
      <div
        className={`product-summary__inner ${className}`}
        style={{ ...style }}
        id={id}
      >
        <div className="product-summary__recap mt-0 mb-0">
          {this.getTotalItems()}
          <div className="product-summary__recap__content">
            <div className="checkout--padding">
              {List}
              {/* 支付新增promotionCode(选填) */}
              <div className="mb-3 d-flex justify-content-between">
                <span
                  className="rc-input rc-input--inline rc-input--label mr-0"
                  style={{ width: '150px' }}
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
                        onChange={this.handlerChange}
                        style={{ background: '#eee' }}
                      />
                    )}
                  </FormattedMessage>

                  <label className="rc-input__label" htmlFor="id-text2" />
                </span>
                <button
                  id="promotionApply"
                  className={`rc-btn rc-btn--sm rc-btn--two ${
                    this.state.isClickApply
                      ? 'ui-btn-loading ui-btn-loading-border-red'
                      : ''
                  }`}
                  style={{ marginTop: '10px', float: 'right' }}
                  onClick={async () => {
                    let result = {};
                    if (!this.state.promotionInputValue) return;
                    this.setState({
                      isClickApply: true,
                      isShowValidCode: false,
                      lastPromotionInputValue: this.state.promotionInputValue
                    });
                    if (!this.isLogin) {
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
                      !result.context.promotionFlag
                    ) {
                      //表示输入apply promotionCode成功
                      discount.splice(0, 1, 1); //(起始位置,替换个数,插入元素)
                      this.setState({ discount });
                      this.props.sendPromotionCode(
                        this.state.promotionInputValue
                      );
                    } else {
                      this.setState({
                        isShowValidCode: true
                      });
                      this.props.sendPromotionCode('');
                    }
                    this.setState({
                      isClickApply: false,
                      promotionInputValue: ''
                    });
                  }}
                >
                  <FormattedMessage id="apply" />
                </button>
              </div>
              <div className="product-summary__fees order-total-summary">
                <div className="row leading-lines subtotal-item">
                  <div className="col-8 start-lines">
                    <p className="order-receipt-label">
                      <span>
                        <FormattedMessage id="total" />
                      </span>
                    </p>
                  </div>
                  <div className="col-4 end-lines">
                    <p className="text-right">
                      <span className="sub-total">
                        {formatMoney(this.totalPrice)}
                      </span>
                    </p>
                  </div>
                </div>
                {/* 显示订阅折扣 */}
                <div
                  className="row leading-lines shipping-item"
                  style={{
                    display:
                      parseInt(this.subscriptionPrice) > 0 ? 'flex' : 'none'
                  }}
                >
                  <div className="col-7 start-lines">
                    <p
                      className="order-receipt-label order-shipping-cost"
                      style={{ color: '#ec001a' }}
                    >
                      {this.promotionDesc || (
                        <FormattedMessage id="promotion" />
                      )}
                    </p>
                  </div>
                  <div className="col-5 end-lines">
                    <p className="text-right">
                      <span
                        className="shipping-total-cost red"
                        style={{ color: '#ec001a' }}
                      >
                        - {formatMoney(this.subscriptionPrice)}
                      </span>
                    </p>
                  </div>
                </div>
                {/* 显示 默认折扣 */}
                <div
                  className="row leading-lines shipping-item"
                  style={{
                    display:
                      parseInt(this.discountPrice) > 0 &&
                      !this.props.checkoutStore.promotionCode
                        ? 'flex'
                        : 'none'
                  }}
                >
                  <div className="col-7 start-lines">
                    <p
                      className="order-receipt-label order-shipping-cost"
                      style={{ color: '#ec001a' }}
                    >
                      <span>
                        <FormattedMessage id="promotion" />
                      </span>
                    </p>
                  </div>
                  <div className="col-5 end-lines">
                    <p className="text-right">
                      <span
                        className="shipping-total-cost"
                        style={{ color: '#ec001a' }}
                      >
                        - {formatMoney(this.discountPrice)}
                      </span>
                    </p>
                  </div>
                </div>

                {/* 显示 promotionCode */}
                <div style={{ marginTop: '10px' }}>
                  {!this.state.isShowValidCode &&
                  this.props.checkoutStore.promotionCode ? (
                    <div
                      className="flex-layout"
                      style={{ marginRight: '18px' }}
                    >
                      <label className="saveDiscount font14 red">
                        {this.promotionDesc || (
                          <FormattedMessage id="NoPromotionDesc" />
                        )}
                      </label>
                      <div
                        className="text-right red-text"
                        style={{ position: 'relative', paddingTop: '7px' }}
                      >
                        <b>-{formatMoney(this.discountPrice)}</b>
                        <span
                          style={{
                            position: 'absolute',
                            right: '-18px',
                            fontSize: '18px',
                            top: '6px',
                            cursor: 'pointer'
                          }}
                          onClick={async () => {
                            let result = {};
                            if (!this.isLogin) {
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
                      </div>
                    </div>
                  ) : null}
                </div>
                {/* 显示 delivereyPrice */}
                <div className="row leading-lines shipping-item">
                  <div className="col-7 start-lines">
                    <p className="order-receipt-label order-shipping-cost">
                      <span>
                        <FormattedMessage id="delivery" />
                      </span>
                    </p>
                  </div>
                  <div className="col-5 end-lines">
                    <p className="text-right">
                      <span className="shipping-total-cost">
                        {formatMoney(this.deliveryPrice)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-summary__total grand-total row leading-lines border-top pl-md-3 pr-md-3 pt-2 pb-2 pt-md-3 pb-md-3">
            <div className="col-6 start-lines">
              <span>
                <FormattedMessage id="totalIncluIVA" />
              </span>
            </div>
            <div className="col-6 end-lines text-right">
              <span className="grand-total-sum">
                {formatMoney(this.tradePrice)}
              </span>
            </div>
          </div>
          {process.env.REACT_APP_LANG == 'de' ? (
            <div
              style={{
                fontSize: '12px',
                paddingLeft: '22px',
                paddingBottom: '10px',
                color: '#999',
                marginTop: '-5px'
              }}
            >
              {<FormattedMessage id="totalIncluMessage" />}
            </div>
          ) : null}

          {this.state.isShowValidCode ? (
            <div className="red pl-3 pb-3 border-top pt-2">
              Promotion code({this.state.lastPromotionInputValue}) is not Valid
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  handlerChange = (e) => {
    let promotionInputValue = e.target.value;
    this.setState({
      promotionInputValue
    });
  };
  render() {
    const { className, fixToHeader, style } = this.props;
    return fixToHeader ? (
      <div
        className="rc-bg-colour--brand3"
        style={{ ...style }}
        id="J_sidecart_container"
      >
        {/* 法国环境不加固定定位 */}
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
      <div className={className} style={{ ...style }}>
        {this.sideCart()}
      </div>
    );
  }
}

export default PayProductInfo;
