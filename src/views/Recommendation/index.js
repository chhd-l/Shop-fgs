import React, { useRef } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import recommendation1 from '@/assets/images/recommendation1.png';
import recommendation2 from '@/assets/images/recommendation2.png';
import recommendation3 from '@/assets/images/recommendation3.png';
import recommendation4 from '@/assets/images/recommendation4.png';
import storeLogo from '@/assets/images/storeLogo.png';
import ImageMagnifier from '@/components/ImageMagnifier';
import { formatMoney } from '@/utils/utils';
// import paymentImg from "./img/payment.jpg";
import { inject, observer } from 'mobx-react';
import BannerTip from '@/components/BannerTip';
import { getRecommendationList } from '@/api/recommendation';
import { getPrescriptionById } from '@/api/clinic';
import { sitePurchase } from '@/api/cart';
import './index.css';
import { cloneDeep, findIndex, find } from 'lodash';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';
import Modal from './components/Modal';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class Help extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      details: {
        id: '',
        goodsName: '',
        goodsImg:
          'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004142026536251.jpg',
        goodsDescription: '',
        sizeList: [],
        images: [],
        goodsCategory: '',
        goodsSpecDetails: [],
        goodsSpecs: []
      },
      productList: [],
      currentDetail: {},
      images: [],
      activeIndex: 0,
      prescriberInfo: {},
      loading: false,
      buttonLoading: false,
      errorMsg: '',
      modalShow: false,
      modalList: [
        {
          title: this.props.intl.messages.isContinue,
          content: this.props.intl.messages.outOfStockContent_cart,
          type: 'addToCart'
        },
        {
          title: this.props.intl.messages.isContinue,
          content: this.props.intl.messages.outOfStockContent_pay,
          type: 'payNow'
        }
      ],
      currentModalObj: {
        title: this.props.intl.messages.isContinue,
        content: this.props.intl.messages.outOfStockContent_cart,
        type: 'addToCart'
      },
      outOfStockProducts: [],
      inStockProducts: [],
      needLogin: false
    };
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    this.setState({ loading: true });
    // console.log(window.location, 'location', this.props)
    getRecommendationList(this.props.match.params.id).then((res) => {
      console.log(res, 'aaa');
      let productList = res.context.recommendationGoodsInfoRels;
      productList.map((el) => {
        if(!el.goodsInfo.goodsInfoImg) {
          el.goodsInfo.goodsInfoImg = el.goodsInfo.goods.goodsImg
        }
        el.goodsInfo.goods.sizeList = el.goodsInfos.map((g) => {
          g = Object.assign({}, g, { selected: false });
          console.log(g.goodsInfoId, el, 'hhhh')
          if(g.goodsInfoId === el.goodsInfo.goodsInfoId) {
            g.selected = true
          }
          return g;
        });
        let specList = el.goodsSpecs;
        let specDetailList = el.goodsSpecDetails;
        specList.map((sItem) => {
          sItem.chidren = specDetailList.filter((sdItem, i) => {
            return sdItem.specId === sItem.specId;
          });
          console.log(sItem, el,'hhhh')
          
          sItem.chidren.map(child => {
            if(el.goodsInfo.mockSpecDetailIds.indexOf(child.specDetailId) > -1) {
              console.log(child, 'child')
              child.selected = true
            }
          })
        });
        el.goodsInfo.goods.goodsInfos = el.goodsInfos;
        el.goodsInfo.goods.goodsSpecDetails = el.goodsSpecDetails;
        el.goodsInfo.goods.goodsSpecs = specList;
      });

      this.setState({ productList }, () => {
        this.checkoutStock()
      });
      getPrescriptionById({id: res.context.prescriberId}).then(res => {
      // getPrescriptionById({ id: '2304' }).then((res) => {
      //   console.log(res, 'bbb');
        this.props.clinicStore.setLinkClinicId(res.context.id);
        this.props.clinicStore.setLinkClinicName(res.context.prescriberName);
        this.setState({ prescriberInfo: res.context, loading: false });
      });
    }).catch(err => {
      this.props.history.push('/')
    })
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }
  }
  checkoutStock() {
    let { productList, outOfStockProducts, inStockProducts, modalList } = this.state;
    for (let i = 0; i < productList.length; i++) {
      if(productList[i].recommendationNumber > productList[i].goodsInfo.stock) {
        outOfStockProducts.push(productList[i])
      }else {
        inStockProducts.push(productList[i])
      }
    }
    let outOfStockVal = ''
    outOfStockProducts.map((el, i) => {
      if(i === outOfStockProducts.length - 1) {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName
      }else {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName + ','
      }
    })
    modalList[0].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_cart' },
      { val:  outOfStockVal}
    )
    modalList[1].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_pay' },
      { val:  outOfStockVal}
    )
  }
  async hanldeLoginAddToCart() {
    let { productList, outOfStockProducts, inStockProducts, modalList } = this.state;
    // console.log(outOfStockProducts, inStockProducts, '...1')
    // return 
    
    

      // for (let i = 0; i < productList.length; i++) {
      //   if(productList[i].recommendationNumber > productList[i].goodsInfo.stock) {
      //     outOfStockProducts.push(productList[i])
      //     this.setState({ buttonLoading: false });
      //     continue
      //   }else {
      //     inStockProducts.push(productList[i])
      //   }
      // }
      if(outOfStockProducts.length > 0) {
        this.setState({modalShow: true, currentModalObj: modalList[0]})
      }else {
        this.setState({ buttonLoading: true });
        for (let i = 0; i < inStockProducts.length; i++) {
          try {
            await sitePurchase({
              goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
              goodsNum: inStockProducts[i].recommendationNumber,
              goodsCategory: ''
            });
            await this.props.checkoutStore.updateLoginCart();
          } catch (e) {
            this.setState({ buttonLoading: false });
          }
        }
        this.props.history.push('/cart');
      }
  }
  async hanldeUnloginAddToCart(products, path) {
    console.log(products,'products')
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      // this.setState({ checkOutErrMsg: "" });
      // if (this.state.loading) {
      //   return false;
      // }
      // const { history } = this.props;
      // const { currentUnitPrice, quantity, instockStatus } = this.state;
      // const { goodsId, sizeList } = this.state.details;
      // const currentSelectedSize = find(sizeList, (s) => s.selected);
      // let quantityNew = quantity;
      
      let tmpData = Object.assign({}, product.goodsInfo.goods, {
        quantity: quantityNew
      });
      
      let quantityNew = product.recommendationNumber;
      let cartDataCopy = cloneDeep(
        toJS(this.props.checkoutStore.cartData).filter((el) => el)
      );

      // if (!instockStatus || !quantityNew) {
      //   return false;
      // }
      // this.setState({ addToCartLoading: true });
      let flag = true;
      if (cartDataCopy && cartDataCopy.length) {
        const historyItem = find(
          cartDataCopy,
          (c) =>
            c.goodsId === product.goodsInfo.goodsId &&
            product.goodsInfo.goodsInfoId ===
              c.sizeList.filter((s) => s.selected)[0].goodsInfoId
        );
        console.log(historyItem, 'historyItem')
        if (historyItem) {
          flag = false;
          quantityNew += historyItem.quantity;
          if (quantityNew > 30) {
            // this.setState({
            //   checkOutErrMsg: <FormattedMessage id="cart.errorMaxInfo" />,
            // });
            this.setState({ addToCartLoading: false });
            return;
          }
          tmpData = Object.assign(tmpData, { quantity: quantityNew });
        }
      }

      // 超过库存时，修改产品数量为最大值替换
      // let res = await miniPurchases({
      //   goodsInfoDTOList: [
      //     {
      //       goodsInfoId: currentSelectedSize.goodsInfoId,
      //       goodsNum: quantityNew
      //     }
      //   ]
      // });
      // let tmpObj = find(
      //   res.context.goodsList,
      //   (ele) => ele.goodsInfoId === currentSelectedSize.goodsInfoId
      // );
      // if (tmpObj) {
      //   if (quantityNew > tmpObj.stock) {
      //     quantityNew = tmpObj.stock;
      //     if (flag) {
      //       this.setState({
      //         quantity: quantityNew
      //       });
      //     }
      //     tmpData = Object.assign(tmpData, { quantity: quantityNew });
      //   }
      // }

      const idx = findIndex(
        cartDataCopy,
        (c) =>
          c.goodsId === product.goodsInfo.goodsId &&
          product.goodsInfo.goodsInfoId ===
            find(c.sizeList, (s) => s.selected).goodsInfoId
      );
      tmpData = Object.assign(tmpData, {
        currentAmount: product.goodsInfo.marketPrice * quantityNew,
        selected: true,
        quantity: quantityNew
      });
      console.log(idx, 'idx');
      if (idx > -1) {
        cartDataCopy.splice(idx, 1, tmpData);
      } else {
        if (cartDataCopy.length >= 30) {
          this.setState({
            checkOutErrMsg: <FormattedMessage id="cart.errorMaxCate" />
          });
          return;
        }
        cartDataCopy.push(tmpData);
      }
      console.log(cartDataCopy, 'cartDataCopy');
      await this.props.checkoutStore.updateUnloginCart(cartDataCopy);
    }
    // this.setState({ addToCartLoading: false });
    // if (redirect) {
    //   if (
    //     this.checkoutStore.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT
    //   ) {
    //     this.setState({
    //       checkOutErrMsg: (
    //         <FormattedMessage
    //           id="cart.errorInfo3"
    //           values={{
    //             val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT),
    //           }}
    //         />
    //       ),
    //     });
    //     return false;
    //   }
    //   if (this.props.checkoutStore.offShelvesProNames.length) {
    //     this.setState({
    //       checkOutErrMsg: (
    //         <FormattedMessage
    //           id="cart.errorInfo4"
    //           values={{
    //             val: this.props.checkoutStore.offShelvesProNames.join("/"),
    //           }}
    //         />
    //       ),
    //     });
    //     return false;
    //   }
    //   if (this.checkoutStore.outOfstockProNames.length) {
    //     this.setState({
    //       checkOutErrMsg: (
    //         <FormattedMessage
    //           id="cart.errorInfo2"
    //           values={{ val: this.checkoutStore.outOfstockProNames.join("/") }}
    //         />
    //       ),
    //     });
    //     return false;
    //   }
    //   if (needLogin) {
    //     // history.push({ pathname: '/login', state: { redirectUrl: '/cart' } })
    //   } else {
    //     history.push("/prescription");
    //   }
    // }
    // // todo 改为mobx
    // this.headerRef.current && this.headerRef.current.handleCartMouseOver();
    // setTimeout(() => {
    //   this.headerRef.current && this.headerRef.current.handleCartMouseOut();
    // }, 1000);
    this.props.history.push(path);
  }
  showErrorMsg = (msg) => {
    this.setState({
      errorMsg: msg
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  };
  async buyNow(needLogin) {
    if(needLogin) {
      sessionItemRoyal.set('okta-redirectUrl', '/prescription')
    }
    this.setState({needLogin})
    let { productList, outOfStockProducts, inStockProducts, modalList } = this.state;
    let totalPrice 
    inStockProducts.map(el => {
      console.log(el, 'el')
      totalPrice = el.recommendationNumber * el.goodsInfo.salePrice
    })
    if (totalPrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
      this.showErrorMsg(
        <FormattedMessage
          id="cart.errorInfo3"
          values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }}
        />
      );
      return false;
    }
    if(outOfStockProducts.length > 0) {
      sessionItemRoyal.set('recommend_product', JSON.stringify(inStockProducts))
      this.setState({modalShow: true, currentModalObj: modalList[1]})
      return false
    }else {
      sessionItemRoyal.set('recommend_product', JSON.stringify(inStockProducts))
      this.props.history.push('/prescription');
    }
  }
  async hanldeClickSubmit() {
    let { currentModalObj, subDetail, outOfStockProducts, inStockProducts } = this.state;
    this.setState({ loading: true, modalShow: false });
    if (currentModalObj.type === 'addToCart') {
      for (let i = 0; i < inStockProducts.length; i++) {
        try {
          await sitePurchase({
            goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
            goodsNum: inStockProducts[i].recommendationNumber,
            goodsCategory: ''
          });
          await this.props.checkoutStore.updateLoginCart();
        } catch (e) {
          this.setState({ buttonLoading: false });
        }
      }
      this.props.history.push('/cart');
    } else if (currentModalObj.type === 'payNow') {
      // for (let i = 0; i < inStockProducts.length; i++) {
      //   try {
      //     await sitePurchase({
      //       goodsInfoId: inStockProducts[i].goodsInfo.goodsInfoId,
      //       goodsNum: inStockProducts[i].recommendationNumber,
      //       goodsCategory: ''
      //     });
      //     await this.props.checkoutStore.updateLoginCart();
      //   } catch (e) {
      //     this.setState({ buttonLoading: false });
      //   }
      // }
      this.props.history.push('/prescription');
    }
  }
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: ''
      }
    };
    // const { details, images } = this.state
    console.log('props', this.props);
    let details = JSON.parse(sessionItemRoyal.get('detailsTemp'));
    let images = JSON.parse(sessionItemRoyal.get('imagesTemp'));
    let { productList, activeIndex, prescriberInfo, currentModalObj } = this.state;
    let MaxLinePrice,
      MinLinePrice,
      MaxMarketPrice,
      MinMarketPrice,
      MaxSubPrice,
      MinSubPrice;
    if (productList.length) {
      MaxLinePrice = Math.max.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.linePrice || 0)
      );
      MinLinePrice = Math.min.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.linePrice || 0)
      );
      MaxMarketPrice = Math.max.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
      );
      MinMarketPrice = Math.min.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
      );
      MaxSubPrice = Math.min.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.subscriptionPrice || 0)
      );
      MinSubPrice = Math.min.apply(
        null,
        productList[activeIndex].goodsInfos.map((g) => g.subscriptionPrice || 0)
      );
    }
    console.log(
      MaxLinePrice,
      MinLinePrice,
      MaxMarketPrice,
      MinMarketPrice,
      MaxSubPrice,
      MinSubPrice,
      'aaaaa'
    );

    return (
      <div className="recommendation">
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
        />
        <Modal
          key="1"
          needLogin={this.state.needLogin}
          visible={this.state.modalShow}
          confirmLoading={this.state.submitLoading}
          modalTitle={currentModalObj.title}
          confirmBtnText={<FormattedMessage id="yes" />}
          cancelBtnVisible={<FormattedMessage id="cancel" />}
          close={() => {
            this.setState({ modalShow: false });
          }}
          hanldeClickConfirm={() => this.hanldeClickSubmit()}
        >
          <span>{currentModalObj.content}</span>
        </Modal>
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <div
            className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
              this.state.errorMsg ? '' : 'hidden'
            }`}
            style={{
              width: '50%',
              margin: '20px auto 0'
            }}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close"
              role="alert"
            >
              {this.state.errorMsg}
            </aside>
          </div>
          <section style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}>
            <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              Discover your personally-selected nutrition recommendation below.
            </h2>
            <p>
              Click to get started now for your shopping, or continue reading to
              find out more about the benefits of veterinary health nutrition.
            </p>
            <p>
              <button
                class={`rc-btn rc-btn--one ${
                  this.state.buttonLoading ? 'ui-btn-loading' : ''
                } ${this.state.inStockProducts.length? '': 'rc-btn-solid-disabled'}`}
                onClick={() => {
                  if (this.props.loginStore.isLogin) {
                    this.hanldeLoginAddToCart();
                  } else {
                    this.hanldeUnloginAddToCart(productList, '/cart');
                  }
                }}
              >
                View in cart
              </button>
            </p>
          </section>
          <section className="recommendProduct">
            {this.state.loading ? (
              <Skeleton color="#f5f5f5" width="100%" height="100%" />
            ) : (
              productList.length && (
                <div>
                <div className="recommendProductInner" style={{display: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)? 'none': 'flex'}}>
                  <div className="left">
                    <div
                      style={{
                        padding: '32px',
                        textAlign: 'center',
                        fontWeight: '500'
                      }}
                    >
                      Recommendation Package
                    </div>
                    <ul>
                      {productList.map((el, i) => (
                        <li
                          onClick={() => this.setState({ activeIndex: i })}
                          className={`${i === activeIndex ? 'active' : ''}`}
                        >
                          <i></i>
                          <img
                            src={
                              el.goodsInfo.goodsInfoImg ||
                              el.goodsInfo.goods.goodsImg
                            }
                          />
                          <span className="proName">
                            {el.goodsInfo.goodsInfoName}
                          </span>
                          <span>X {el.recommendationNumber}</span>
                        </li>
                      ))}
                      <p ref="p" style={{ marginTop: '60px' }}>
                        {
                          this.props.loginStore.isLogin?(
                            <button ref="loginButton" class={`rc-btn rc-btn--one ${this.state.buttonLoading?'ui-btn-loading': ''}`} onClick={() => this.buyNow()}>Buy now</button>
                          ): (
                            <LoginButton
                              beforeLoginCallback={async () => this.buyNow(true)}
                              btnClass={`rc-btn rc-btn--one ${
                                this.state.buttonLoading ? 'ui-btn-loading' : ''
                              } ${this.state.inStockProducts.length? '': 'rc-btn-solid-disabled'}`}
                              history={this.props.history}
                            >
                              <FormattedMessage id="checkout" />
                            </LoginButton>
                          )
                        }
                      </p>
                      {!this.props.loginStore.isLogin && (
                        <p>
                          <button
                            className={`rc-styled-link color-999`}
                            onClick={() => {
                              // this.hanldeUnloginAddToCart(
                              //   productList,
                              //   '/prescription'
                              // );
                              this.buyNow()
                            }}
                          >
                            <FormattedMessage id="Buy as a guest" />
                          </button>
                        </p>
                      )}
                    </ul>
                  </div>
                  <div className="right">
                    <div className="main">
                      <div className="pic">
                        <ImageMagnifier
                          sizeList={[productList[activeIndex].goodsInfo]}
                          // video={details.goodsVideo}
                          images={[productList[activeIndex].goodsInfo]}
                          minImg={
                            productList[activeIndex].goodsInfo.goodsInfoImg
                          }
                          maxImg={
                            productList[activeIndex].goodsInfo.goodsInfoImg
                          }
                          config={false}
                        />
                      </div>

                      <div className="text">
                        <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                          {productList[activeIndex].goodsInfo.goodsInfoName}
                        </h2>

                        {/* <h4>
                            From {formatMoney(Math.min.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))} to {formatMoney(Math.max.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))}
                          </h4> */}
                        {false && MaxLinePrice > 0 && (
                          <div className="product-pricing__card__head d-flex align-items-center">
                            <div className="rc-input product-pricing__card__head__title">
                              <FormattedMessage id="listPrice" />
                            </div>
                            <b
                              className="product-pricing__card__head__price  rc-padding-y--none text-line-through"
                              style={{
                                flex: 3,
                                fontWeight: '200',
                                fontSize: '24px',
                                // color: 'rgba(102,102,102,.7)'
                              }}
                            >
                              {MaxLinePrice > 0 ? (
                                MaxLinePrice === MinLinePrice ? (
                                  <span>{formatMoney(MaxLinePrice)}</span>
                                ) : (
                                  <span>
                                    From {formatMoney(MinLinePrice)} to{' '}
                                    {formatMoney(MaxLinePrice)}
                                  </span>
                                )
                              ) : null}
                            </b>
                          </div>
                        )}
                        <div className="product-pricing__card__head d-flex align-items-center">
                          <div className="rc-input product-pricing__card__head__title">
                            <FormattedMessage id="price" />
                          </div>
                          <b
                            className="rc-padding-y--none"
                            style={{
                              flex: 3,
                              fontWeight: '200',
                              fontSize: '24px',
                              // color: 'rgba(102,102,102,.7)'
                            }}
                          >
                            {MaxMarketPrice > 0 ? (
                              MaxMarketPrice === MinMarketPrice ? (
                                <span>{formatMoney(MaxMarketPrice)}</span>
                              ) : (
                                <span>
                                  From {formatMoney(MinMarketPrice)} to{' '}
                                  {formatMoney(MaxMarketPrice)}
                                </span>
                              )
                            ) : null}
                          </b>
                        </div>
                        {MaxSubPrice > 0 && (
                          <div className="product-pricing__card__head d-flex align-items-center">
                            <div className="rc-input product-pricing__card__head__title">
                              <FormattedMessage id="autoship" />
                            </div>
                            <b
                              className="rc-padding-y--none"
                              style={{
                                flex: 3,
                                fontWeight: '200',
                                fontSize: '24px',
                                // color: 'rgba(102,102,102,.7)'
                              }}
                            >
                              {MaxSubPrice > 0 ? (
                                MaxSubPrice === MinSubPrice ? (
                                  <span>{formatMoney(MaxSubPrice)}</span>
                                ) : (
                                  <span>
                                    From {formatMoney(MinSubPrice)} to{' '}
                                    {formatMoney(MaxSubPrice)}
                                  </span>
                                )
                              ) : null}
                            </b>
                          </div>
                        )}

                        <p style={{ width: '350px' }}>
                          {productList[activeIndex].goodsInfo.goods
                            .goodsDescription || 'none'}
                        </p>
                        <p>
                          <button
                            class="rc-btn rc-btn--two"
                            onClick={() => {
                              this.props.history.push(
                                '/details/' +
                                  productList[activeIndex].goodsInfo.goodsInfoId
                              );
                            }}
                          >
                            View Detail
                          </button>
                        </p>
                      </div>
                    </div>
                    <div className="description">
                      <img
                        src={storeLogo}
                        style={{
                          float: 'left',
                          width: '60px',
                          marginRight: '20px'
                        }}
                      />
                      <p
                        style={{
                          fontSize: '16px',
                          color: '#666666',
                          fontWeight: '500',
                          letterSpacing: '0'
                        }}
                      >
                        {prescriberInfo.prescriberName}
                      </p>
                      <p
                        style={{
                          fontSize: '12px',
                          letterSpacing: '0'
                        }}
                      >
                        {`${prescriberInfo.phone}, ${prescriberInfo.primaryZip}, ${prescriberInfo.primaryCity}`}
                      </p>
                      <p
                        style={{
                          fontSize: '12px',
                          letterSpacing: '0'
                        }}
                      >
                        {`${prescriberInfo.location}`}
                      </p>
                    </div>
                    <p
                      style={{
                        textAlign: 'center',
                        fontSize: '12px',
                        color: '#ccc',
                        marginBottom: '60px',
                        letterSpacing: '0'
                      }}
                    >
                      Royal Canin’s feeding guidelines can also be found on the
                      product packaging.
                    </p>
                  </div>
                </div>
                <div className="recommendProductInnerMobile" style={{display: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)? 'block': 'none'}}>
                  <div className="top">
                    <div
                      style={{
                        padding: '32px 20px',
                        textAlign: 'center',
                        fontWeight: '500',
                        float: 'left'
                      }}
                    >
                      Recommendation Package
                    </div>
                    <p ref="p" style={{ marginTop: '60px', textAlign: 'left' }}>
                        {
                          this.props.loginStore.isLogin?(
                            <button ref="loginButton" class={`rc-btn rc-btn--one ${this.state.buttonLoading?'ui-btn-loading': ''}`} onClick={() => this.buyNow()}>Buy now</button>
                          ): (
                            <LoginButton
                              beforeLoginCallback={async () => this.buyNow(true)}
                              btnClass={`rc-btn rc-btn--one ${
                                this.state.buttonLoading ? 'ui-btn-loading' : ''
                              } ${this.state.inStockProducts.length? '': 'rc-btn-solid-disabled'}`}
                              history={this.props.history}
                            >
                              <FormattedMessage id="checkout" />
                            </LoginButton>
                          )
                        }
                        {
                          !this.props.loginStore.isLogin && (
                              <button
                                className={`rc-styled-link color-999`}
                                onClick={() => {
                                  // this.hanldeUnloginAddToCart(
                                  //   productList,
                                  //   '/prescription'
                                  // );
                                  this.buyNow()
                                }}
                              >
                                <FormattedMessage id="Buy as a guest" />
                              </button>
                          )
                        }
                      </p>
                      {/* {!this.props.loginStore.isLogin && (
                        <p>
                          <button
                            className={`rc-styled-link color-999`}
                            onClick={() => {
                              // this.hanldeUnloginAddToCart(
                              //   productList,
                              //   '/prescription'
                              // );
                              this.buyNow()
                            }}
                          >
                            <FormattedMessage id="Buy as a guest" />
                          </button>
                        </p>
                      )} */}
                    <ul style={{overflow: 'hidden' , marginTop: '40px', display: 'inline-block'}}>
                      {productList.map((el, i) => (
                        <li
                          onClick={() => this.setState({ activeIndex: i })}
                          className={`${i === activeIndex ? 'active' : ''}`}
                        >
                          <i></i>
                          <img
                            style={{height: '65px'}}
                            src={
                              el.goodsInfo.goodsInfoImg ||
                              el.goodsInfo.goods.goodsImg
                            }
                          />
                          <span className="proName">
                            {el.goodsInfo.goodsInfoName}
                          </span>
                          <span>X {el.recommendationNumber}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="right">
                    <div className="main">
                      <div className="pic">
                        <ImageMagnifier
                          sizeList={[productList[activeIndex].goodsInfo]}
                          // video={details.goodsVideo}
                          images={[productList[activeIndex].goodsInfo]}
                          minImg={
                            productList[activeIndex].goodsInfo.goodsInfoImg
                          }
                          maxImg={
                            productList[activeIndex].goodsInfo.goodsInfoImg
                          }
                          config={false}
                        />
                      </div>

                      <div className="text">
                        <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                          {productList[activeIndex].goodsInfo.goodsInfoName}
                        </h2>

                        {/* <h4>
                            From {formatMoney(Math.min.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))} to {formatMoney(Math.max.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))}
                          </h4> */}
                        {MaxLinePrice > 0 && (
                          <div className="product-pricing__card__head d-flex align-items-center">
                            <div className="rc-input product-pricing__card__head__title">
                              <FormattedMessage id="listPrice" />
                            </div>
                            <b
                              className="product-pricing__card__head__price  rc-padding-y--none text-line-through"
                              style={{
                                fontWeight: '200',
                                fontSize: '24px',
                                color: 'rgba(102,102,102,.7)'
                              }}
                            >
                              {MaxLinePrice > 0 ? (
                                MaxLinePrice === MinLinePrice ? (
                                  <span>{formatMoney(MaxLinePrice)}</span>
                                ) : (
                                  <span>
                                    From {formatMoney(MinLinePrice)} to{' '}
                                    {formatMoney(MaxLinePrice)}
                                  </span>
                                )
                              ) : null}
                            </b>
                          </div>
                        )}
                        <div className="product-pricing__card__head d-flex align-items-center">
                          <div className="rc-input product-pricing__card__head__title">
                            <FormattedMessage id="price" />
                          </div>
                          <b
                            className="rc-padding-y--none"
                            style={{
                              fontWeight: '200',
                              fontSize: '24px',
                              // color: 'rgba(102,102,102,.7)'
                            }}
                          >
                            {MaxMarketPrice > 0 ? (
                              MaxMarketPrice === MinMarketPrice ? (
                                <span>{formatMoney(MaxMarketPrice)}</span>
                              ) : (
                                <span>
                                  From {formatMoney(MinMarketPrice)} to{' '}
                                  {formatMoney(MaxMarketPrice)}
                                </span>
                              )
                            ) : null}
                          </b>
                        </div>
                        {MaxSubPrice > 0 && (
                          <div className="product-pricing__card__head d-flex align-items-center">
                            <div className="rc-input product-pricing__card__head__title">
                              <FormattedMessage id="autoship" />
                            </div>
                            <b
                              className="rc-padding-y--none"
                              style={{
                                fontWeight: '200',
                                fontSize: '24px',
                                // color: 'rgba(102,102,102,.7)'
                              }}
                            >
                              {MaxSubPrice > 0 ? (
                                MaxSubPrice === MinSubPrice ? (
                                  <span>{formatMoney(MaxSubPrice)}</span>
                                ) : (
                                  <span>
                                    From {formatMoney(MinSubPrice)} to{' '}
                                    {formatMoney(MaxSubPrice)}
                                  </span>
                                )
                              ) : null}
                            </b>
                          </div>
                        )}

                        <p style={{ width: '350px' }}>
                          {productList[activeIndex].goodsInfo.goods
                            .goodsDescription || 'none'}
                        </p>
                        <p>
                          <button
                            class="rc-btn rc-btn--two"
                            onClick={() => {
                              this.props.history.push(
                                '/details/' +
                                  productList[activeIndex].goodsInfo.goodsInfoId
                              );
                            }}
                          >
                            View Detail
                          </button>
                        </p>
                      </div>

                      {/* <div className="text">
                      <h2 style={{ color: '#E2001A', marginTop: '40px'}}>
                        { productList[activeIndex].goodsInfo.goodsInfoName}
                      </h2>
                      <h4>
                        From {formatMoney(Math.min.apply(null, productList[activeIndex].goodsInfos.map(g => g.marketPrice || 0)))}} to $40.99
                      </h4>
                      <p>
                        Renal + hypoallergenic is a complete dietetic food for adult dogs, formulated to support renal function during chronic kidney disease and intended for the reduction of intolerances to certain ingredients…
                      </p>
                      <p>
                        <button class="rc-btn rc-btn--two">View Detail</button>
                      </p>
                      </div> */}
                    </div>
                    <div className="description">
                      <img
                        src={storeLogo}
                        style={{
                          float: 'left',
                          width: '40px',
                          marginRight: '20px'
                        }}
                      />
                      <p
                        style={{
                          fontSize: '16px',
                          color: '#666666',
                          fontWeight: '500',
                          letterSpacing: '0'
                        }}
                      >
                        {prescriberInfo.prescriberName}
                      </p>
                      <p
                        style={{
                          fontSize: '12px',
                          letterSpacing: '0'
                        }}
                      >
                        {prescriberInfo.primaryCity}
                      </p>
                    </div>
                    <p
                      style={{
                        textAlign: 'center',
                        fontSize: '12px',
                        color: '#ccc',
                        marginBottom: '60px',
                        letterSpacing: '0'
                      }}
                    >
                      Royal Canin’s feeding guidelines can also be found on the
                      product packaging.
                    </p>
                  </div>
                </div>
                </div>
              )
            )}
          </section>

          <div
            class="rc-layout-container rc-two-column"
            style={{ padding: '68px' }}
          >
            <div
              class="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#E2001A' }}>
                  Veterinary health nutrition
                </h2>
                <p>
                  At Royal Canin, we believe that nutrition plays a key role in
                  supporting the health and well-being of cats and dogs. This is
                  why we have designed ROYAL CANIN® Veterinary diets around
                  proven nutritional science in order to address specific pet
                  conditions. Follow your veterinarian's nutritional
                  recommendation here below.
                </p>
                {/* <button class="rc-btn rc-btn--one" onClick={() => this.setState({isAddNewCard: true, paymentCompShow: true})}>View in Cart</button> */}
              </div>
            </div>
            <div class="rc-column">
              <img src={recommendation1} style={{ width: '100%' }} />
            </div>
          </div>
          <div class="help-page" style={{ marginBottom: '1rem' }}>
            <section style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                Our pet experts are here to help you
              </h2>
              <p>
                We're pet lovers and experts in cat and dog nutrition and we're
                ready to to help you with any questions you might have.
              </p>
            </section>
            <div class="experience-region experience-main">
              <div class="experience-region experience-main">
                <div class="experience-component experience-layouts-1column">
                  <div class="row rc-margin-x--none">
                    <div class="rc-full-width">
                      <div class="experience-component experience-assets-contactUsBlock">
                        <div class="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                          <div class="rc-layout-container rc-two-column rc-margin-y--sm text-center text-md-left rc-margin-top--lg--mobile">
                            {/* <div class="rc-padding-bottom--none--mobile" style={{ width: '40%' }}>
                              <h1 class="rc-beta" style={{ margin: '0 0 0 1rem' }}>
                                <font style={{ verticalAlign: "inherit" }}>
                                  <font style={{ verticalAlign: "inherit" }}><FormattedMessage id="help.needHelp" /></font>
                                </font>
                              </h1>
                            </div>
                            <div style={{ width: '60%' }}>
                              <div class="rc-large-body inherit-fontsize children-nomargin">
                                <p>
                                  <FormattedMessage id="help.tip1" /><br /><FormattedMessage id="help.tip4" />
                                </p>
                              </div>
                            </div> */}
                          </div>
                          <div class="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center text-md-left">
                            <div class="rc-column rc-double-width rc-padding--none">
                              <article class="rc-full-width rc-column rc-margin-top--md--mobile">
                                <div class="rc-border-all rc-border-colour--interface fullHeight">
                                  <div class="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div class="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div class="w-100">
                                        <b style={{ color: '#00BCA3' }}>
                                          <FormattedMessage id="help.byTelephone" />
                                        </b>
                                        <p>
                                          {
                                            this.props.configStore
                                              .contactTimePeriod
                                          }
                                        </p>
                                        <div class="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            class="rc-numeric rc-md-up"
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                        <div class="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            class="rc-alpha rc-border--none rc-md-down"
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="rc-column rc-content-v-middle">
                                      <img
                                        class="align-self-center widthAuto"
                                        src={callImg}
                                        alt="By telephone"
                                        title="By telephone"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </article>
                              <article class="rc-full-width rc-column">
                                <div class="rc-border-all rc-border-colour--interface fullHeight">
                                  <div class="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div class="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div class="w-100">
                                        <b style={{ color: '#0087BD' }}>
                                          <font
                                            style={{ verticalAlign: 'inherit' }}
                                          >
                                            <font
                                              style={{
                                                verticalAlign: 'inherit'
                                              }}
                                            >
                                              <FormattedMessage id="help.byEmail" />
                                            </font>
                                          </font>
                                        </b>
                                        <p>
                                          <span
                                            style={{ color: 'rgb(0, 0, 0)' }}
                                          >
                                            <font
                                              style={{
                                                verticalAlign: 'inherit'
                                              }}
                                            >
                                              <font
                                                style={{
                                                  verticalAlign: 'inherit'
                                                }}
                                              >
                                                <FormattedMessage id="help.tip3" />
                                              </font>
                                            </font>
                                          </span>
                                        </p>
                                        <div class="rc-margin-top--xs">
                                          <p
                                            class="rc-numeric rc-md-up"
                                            style={{
                                              color: 'rgb(0, 135, 189)'
                                            }}
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactEmail
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="rc-column rc-content-v-middle">
                                      <img
                                        class="align-self-center widthAuto"
                                        src={emailImg}
                                        alt="By email"
                                        title="By email"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </div>
                            <div class="rc-column rc-triple-width">
                              <div
                                class="background-cover"
                                style={{
                                  backgroundImage: `url(${require('@/assets/images/slider-img-help.jpg?sw=802&amp;sh=336&amp;sm=cut&amp;sfrm=png')})`
                                }}
                              >
                                <picture class="rc-card__image">
                                  <img src={helpImg} alt=" " title=" " />
                                </picture>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              Why Royal Canin?
            </h2>
            <p>
              Your pet means the world to you, and their health and happiness
              means the world to us !
            </p>
          </section>
          <section
            className="picList"
            style={{ textAlign: 'center', display: 'flex' }}
          >
            <li>
              <img src={recommendation2} />
            </li>
            <li>
              <img src={recommendation3} />
            </li>
            <li>
              <img src={recommendation4} />
            </li>
          </section>
          <section style={{ padding: '40px 68px', background: '#f6f6f6' }}>
            <p>
              Donec nec ornare risus. Nunc id interdum eros, a pellentesque
              turpis. Nullam tellus metus, rutrum ut tortor at, bibendum
              molestie nulla. Donec commodo pretium urna. Morbi arcu turpis,
              feugiat vel luctus in, placerat in leo. Fusce tincidunt dui ac dui
              ultricies, dictum sagittis est venenatis. Nullam imperdiet
              fermentum scelerisque. Etiam ante magna, maximus eleifend gravida
              ut, venenatis nec justo. Donec eu tincidunt erat. Suspendisse
              vehicula nibh a metus vestibulum, quis maximus turpis scelerisque.
              Maecenas ac lectus justo. Sed id justo id orci consectetur tempor.
              Cras ut diam in quam tempor volutpat ut a enim. Vivamus lacinia
              mauris sed accumsan dapibus.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    );
  }
}

export default Help;
