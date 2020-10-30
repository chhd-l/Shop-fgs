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
import autoship from './images/us_autoship.png';
import icon1 from './images/us_icon1.png';
import icon2 from './images/us_icon2.png';
import icon3 from './images/us_icon3.png';
import icon4 from './images/us_icon4.png';
import cat from './images/cat.png';
import dog from './images/dog.png';
import storeLogo from '@/assets/images/storeLogo.png';
import ImageMagnifier from '@/components/ImageMagnifier';
import { formatMoney } from '@/utils/utils';
// import paymentImg from "./img/payment.jpg";
import { inject, observer } from 'mobx-react';
import BannerTip from '@/components/BannerTip';
import { getRecommendationList } from '@/api/recommendation';
import { sitePurchase } from '@/api/cart';
import './index.css';
import { cloneDeep, findIndex, find } from 'lodash';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';

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
  componentDidMount() {
  }
  checkoutStock() {
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
    for (let i = 0; i < productList.length; i++) {
      if (
        productList[i].recommendationNumber > productList[i].goodsInfo.stock
      ) {
        outOfStockProducts.push(productList[i]);
      } else {
        inStockProducts.push(productList[i]);
      }
    }
    let outOfStockVal = '';
    outOfStockProducts.map((el, i) => {
      if (i === outOfStockProducts.length - 1) {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName;
      } else {
        outOfStockVal = outOfStockVal + el.goodsInfo.goodsInfoName + ',';
      }
    });
    modalList[0].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_cart' },
      { val: outOfStockVal }
    );
    modalList[1].content = this.props.intl.formatMessage(
      { id: 'outOfStockContent_pay' },
      { val: outOfStockVal }
    );
  }
  async hanldeLoginAddToCart() {
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
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
    if (outOfStockProducts.length > 0) {
      this.setState({ modalShow: true, currentModalObj: modalList[0] });
    } else {
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
    console.log(products, 'products');
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
        console.log(historyItem, 'historyItem');
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
    if (needLogin) {
      sessionItemRoyal.set('okta-redirectUrl', '/prescription');
    }
    this.setState({ needLogin });
    let {
      productList,
      outOfStockProducts,
      inStockProducts,
      modalList
    } = this.state;
    let totalPrice;
    inStockProducts.map((el) => {
      console.log(el, 'el');
      totalPrice = el.recommendationNumber * el.goodsInfo.salePrice;
    });
    if (totalPrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
      this.showErrorMsg(
        <FormattedMessage
          id="cart.errorInfo3"
          values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }}
        />
      );
      return false;
    }
    if (outOfStockProducts.length > 0) {
      sessionItemRoyal.set(
        'recommend_product',
        JSON.stringify(inStockProducts)
      );
      this.setState({ modalShow: true, currentModalObj: modalList[1] });
      return false;
    } else {
      sessionItemRoyal.set(
        'recommend_product',
        JSON.stringify(inStockProducts)
      );
      this.props.history.push('/prescription');
    }
  }
  async hanldeClickSubmit() {
    let {
      currentModalObj,
      subDetail,
      outOfStockProducts,
      inStockProducts
    } = this.state;
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

    return (
      <div className="recommendation">
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
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
          <section
            style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}
          >
            <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              IT’S MORE THAN FREE DELIVERY
            </h2>
            <div class="rc-intro inherit-fontsize children-nomargin">
              <p>
                At Royal Canin®, we know that caring for a new puppy can bring a
                lot of questions. That’s why we offer exclusive benefits like
                24/7 access to pet experts, welcome home puppy kits and more
                through the Royal Canin Club. Joining is easy — sign up for
                automatic shipping on your pet’s tailored formulas to become a
                member today.
                <br />
              </p>
              <p>
                Your <strong>free</strong> membership includes:
              </p>
              <p>&nbsp;</p>
            </div>
          </section>

          <div
            class="rc-layout-container rc-two-column"
            style={{ padding: '20px 80px' }}
          >
            <div
              class="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{ width: '550px' }}>
                <div>
                  <i class="rc-icon rc-rate-fill--xs rc-brand1"></i>
                  <strong>The Royal Canin Pet Advisor Live App</strong> - chat
                  with experts around the clock about your pet’s health,
                  nutrition and behavior; track your pet’s growth; view
                  checklists to ensure your home is puppy-proof; and more.
                </div>
                <div>
                  <i class="rc-icon rc-rate-fill--xs rc-brand1"></i>
                  <strong>Specialty Welcome Box + FREE Shipping</strong> -
                  receive an assortment of gifts with your first autoshipment,
                  plus save 30% on your first order and another 5% on every
                  autoship order.
                </div>
                <div>
                  <i class="rc-icon rc-rate-fill--xs rc-brand1"></i>
                  <strong>Personalized Recommendations</strong> - get breeder
                  recommendations for pet food and products as your pet grows.
                </div>
                <div style={{ marginTop: '20px' }}>
                  <button
                    class="rc-btn rc-btn--one"
                    onClick={() => {
                      this.props.history.push('/list/cats');
                    }}
                  >
                    <FormattedMessage id="subscriptionLanding.catButton" />
                  </button>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <button
                    class="rc-btn rc-btn--one"
                    onClick={() => {
                      this.props.history.push('/list/dogs');
                    }}
                  >
                    <FormattedMessage id="subscriptionLanding.dogButton" />
                  </button>
                </div>
              </div>
            </div>
            <div class="rc-column">
              <img src={autoship} style={{ width: '100%' }} />
            </div>
          </div>
          <section
            style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}
          >
            <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              How to Join Royal Canin Club
            </h2>
          </section>
          <div
            class="rc-layout-container rc-four-column"
            style={{ padding: '20px 80px' }}
          >
            <div class="rc-column" style={{ textAlign: 'center' }}>
              <img
                src={icon1}
                style={{
                  width: '100px',
                  display: 'inline-block',
                  marginBottom: '20px'
                }}
              />
              <p>
                Find your <strong>handpicked nutrition products</strong> in your
                cart.
              </p>
            </div>
            <div class="rc-column" style={{ textAlign: 'center' }}>
              <img
                src={icon2}
                style={{
                  width: '100px',
                  display: 'inline-block',
                  marginBottom: '20px'
                }}
              />
              <p>
                Select <strong>automatic shipping</strong> and input your
                payment method.
              </p>
            </div>
            <div class="rc-column" style={{ textAlign: 'center' }}>
              <img
                src={icon3}
                style={{
                  width: '100px',
                  display: 'inline-block',
                  marginBottom: '20px'
                }}
              />
              <p>
                <strong>Receive your product automatically</strong> based on
                your schedule. Change or cancel <strong>at any time</strong>.
              </p>
            </div>
            <div class="rc-column" style={{ textAlign: 'center' }}>
              <img
                src={icon4}
                style={{
                  width: '100px',
                  display: 'inline-block',
                  marginBottom: '20px'
                }}
              />
              <p>
                Get your exclusive<strong> Royal Canin Club perks</strong>,
                including the Royal Canin Pet Advisor Live app.
              </p>
            </div>
          </div>
          <div
            class="rc-layout-container rc-three-column"
            style={{ padding: '20px', background: '#eee' }}
          >
            <div class="rc-column" style={{ textAlign: 'center' }}>
              <img
                src={cat}
                style={{
                  width: '100%',
                  display: 'inline-block',
                  marginBottom: '20px'
                }}
              />
            </div>
            <div
              class="rc-column"
              style={{ textAlign: 'center', paddingTop: '80px' }}
            >
              <h2 style={{ color: '#E2001A' }}>Get Started</h2>
              <p>
                Find your pet’s precise formula, and be sure to choose automatic
                shipping at checkout.
              </p>
              <div>
                <button
                  class="rc-btn rc-btn--sm rc-btn--two"
                  onClick={() => {
                    this.props.history.push('/list/cats');
                  }}
                >
                  Cat
                </button>{' '}
                <button
                  class="rc-btn rc-btn--sm rc-btn--two"
                  onClick={() => {
                    this.props.history.push('/list/dogs');
                  }}
                >
                  Dog
                </button>
              </div>
            </div>
            <div class="rc-column" style={{ textAlign: 'center' }}>
              <img
                src={dog}
                style={{
                  width: '100%',
                  display: 'inline-block',
                  marginBottom: '20px'
                }}
              />
            </div>
          </div>
          <div class="help-page" style={{ marginBottom: '1rem' }}>
            <section style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                Need help?
              </h2>
              <p>
                As true pet lovers and experts in tailored nutrition, we're here
                to help you give your pet the healthiest life possible.
              </p>
            </section>
            <div class="rc-layout-container rc-three-column rc-match-heights rc-padding-bottom--lg rc-max-width--lg">
              <div class="rc-column rc-padding--none">
                <article class="rc-full-width rc-column rc-padding-left--none--desktop">
                  <div class="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                    <div class="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                      <div class="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                        <div style={{width: '100%'}}>
                          <b style={{ color: '#00A4A6' }}><FormattedMessage id="help.byTelephone" /></b>
                          <p>
                            <span style={{ color: 'rgb(102, 102, 102)' }}>
                              {this.props.configStore.contactTimePeriod}
                            </span>
                          </p>
                          <div class="rc-margin-top--xs">
                            <a
                              href="tel: 1-844-673-3772"
                              style={{ color: '#00A4A6' }}
                              class="rc-numeric"
                            >
                              {this.props.configStore.storeContactPhoneNumber}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                        <img
                          class="align-self-center widthAuto ls-is-cached lazyloaded"
                          data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                          data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                          alt="call us"
                          title="call us"
                          srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                          src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              <div class="rc-column rc-padding--none">
                <article class="rc-full-width rc-column rc-padding-left--none--desktop">
                  <div class="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                    <div class="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                      <div class="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                        <div style={{width: '100%'}}>
                          <b style={{ color: '#0087BD' }}><FormattedMessage id="help.byEmail" /></b>
                          <p>
                            <span style={{ color: 'rgb(102, 102, 102)' }}>
                              <FormattedMessage id="help.tip3" />
                            </span>
                          </p>
                          <div class="rc-margin-top--xs">
                            <div
                              href="https://shop.royalcanin.com/help/contact"
                              style={{ color: '#0087BD' }}
                              class="rc-numeric"
                            >
                              {this.props.configStore.storeContactEmail}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                        <img
                          class="align-self-center widthAuto ls-is-cached lazyloaded"
                          data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                          data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                          alt="email us"
                          title="email us"
                          srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                          src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              <div class="rc-column rc-padding--none">
                <article class="rc-full-width rc-column rc-padding-left--none--desktop">
                  <div class="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                    <div class="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                      <div class="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                        <div>
                          <b>Have a question?</b>
                          <p>
                            <span style={{ color: 'rgb(102, 102, 102)' }}>
                              Check out our&nbsp;
                            </span>
                            <Link
                              to="/faq/all"
                              rel="noopener noreferrer"
                              data-link-type="external"
                              style={{
                                color: 'rgb(236, 0, 26)',
                                backgroundColor: 'rgb(255, 255, 255)'
                              }}
                            >
                              FAQs
                            </Link>
                            <span style={{ color: 'rgb(102, 102, 102)' }}>
                              &nbsp;to find the answers you're looking for.
                            </span>
                          </p>
                        </div>
                      </div>
                      <div class="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                        <img
                          class="align-self-center widthAuto ls-is-cached lazyloaded"
                          data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                          data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                          alt="faq"
                          title="faq"
                          srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                          src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            {/* <div class="experience-region experience-main">
              <div class="experience-region experience-main">
                <div class="experience-component experience-layouts-1column">
                  <div class="row rc-margin-x--none">
                    <div class="rc-full-width">
                      <div class="experience-component experience-assets-contactUsBlock">
                        <div class="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                          <div class="rc-layout-container rc-two-column rc-margin-y--sm text-center text-md-left rc-margin-top--lg--mobile">
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
            </div> */}
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default Help;
