import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { toJS } from 'mobx';
import cloneDeep from 'lodash/cloneDeep';
import Help from './modules/Help';
import FAQ from './modules/FAQ';
import Details from './modules/Details';
import StaticPage from './modules/StaticPage';
import { getDetails, getLoginDetails, getDetailsBySpuNo } from '@/api/details';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './index.less';
import Swiper from 'swiper';
import Selection from '@/components/Selection';
import 'swiper/swiper-bundle.min.css';
import { getDeviceType, getParaByName,distributeLinktoPrecriberOrPaymentPage } from '@/utils/utils';
import goodsDetailTab from './modules/goodsDetailTab.json';
import { sitePurchase } from '@/api/cart';
import foodPic from './img/food_pic.png';
import foodDispenserPic from './img/food_dispenser_pic.png';
import foodPic2 from './img/step2_food.png';
import LazyLoad from 'react-lazyload';
const productObj = {
  img: foodPic,
  title: 'Sterilised Mini',
  detail: 'Dry Dog Food'
};
const isMobile = getDeviceType() !== 'PC';
const productList = Array(6)
  .fill(productObj)
  .map((item, i) => {
    return { ...item, id: i };
  });
const Step1Pc = (props) => {
  return (
    <div className="margin12">
      <div
        className="rc-card-grid rc-match-heights rc-card-grid--fixed rc-three-column"
        style={{ margin: '0 10rem 2rem' }}
      >
        {(props.productList || []).map((item) => (
          <div
            className="rc-grid"
            onClick={() => {
              props.clickItem(item);
            }}
          >
            <article
              className={`rc-card rc-card--a ${item.choosed ? 'active' : ''}`}
            >
              <picture className="rc-card__image">
                <img src={item.img} alt="A Dachshund jumping" />
              </picture>
              <div className="rc-card__body">
                <header>
                  <h1 className="rc-card__title rc-text--center">
                    {item.title}
                  </h1>
                </header>
                <p className="rc-text--center">{item.detail}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
      <div className="rc-text--center">
        <button
          disabled={props.isDisabled}
          className="rc-btn rc-btn--two rc-padding-right--xl button192"
          onClick={() => {
            props.toOtherStep('step2');
          }}
        >
          view product details
        </button>
        <button
          disabled={props.isDisabled}
          className="rc-btn rc-btn--one button192"
          onClick={() => {
            props.toOtherStep('step3');
          }}
        >
          choose product
        </button>
      </div>
    </div>
  );
};
class Step1H5 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 0
    });
  }
  render() {
    return (
      <>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {this.props.productList.map((item) => (
              <div className="swiper-slide">
                <div>
                  <img src={item.img} />
                  <div className="title">{item.title}</div>
                  <div className="des">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <div className="rc-layout-container rc-two-column  rc-text--center rc-margin-top--md">
          <div className="rc-column">
            <button
              disabled={props.isDisabled}
              className="rc-btn rc-btn--two button192"
              onClick={() => {
                this.props.toOtherStep('step2');
              }}
            >
              view product details
            </button>
          </div>
          <div className="rc-column">
            <button
              disabled={props.isDisabled}
              className="rc-btn rc-btn--one button192"
              onClick={() => {
                this.props.toOtherStep('step3');
              }}
            >
              choose product
            </button>
          </div>
        </div>
      </>
    );
  }
}
const Step1 = (props) => {
  return (
    <div className="choose_product">
      {isMobile ? (
        <Step1H5
          isDisabled={props.isDisabled}
          productList={props.productList}
          toOtherStep={props.toOtherStep}
          clickItem={props.clickItem}
        />
      ) : (
        <Step1Pc
          isDisabled={props.isDisabled}
          productList={props.productList}
          toOtherStep={props.toOtherStep}
          clickItem={props.clickItem}
        />
      )}
    </div>
  );
};
const Step2 = (props) => {
  return (
    <div className="margin12 product_detail">
      <div>
        <div className="rc-layout-container rc-five-column">
          <div className="rc-column">
            <LazyLoad>
              <img src={foodPic2} />
            </LazyLoad>
          </div>
          <div className="rc-column rc-double-width">
            <div className="title">Jack Russel Terrier</div>
            <div className="sub_title">Dry Dog Food</div>
            <div>
              Royal Canin Jack Russell Terrier Adult dry dog food is designed to
              meet the nutritional needs of purebred Jack Russell Terriers 10
              months and older Royal Canin knows what makes your Jack Russell
              Terrier magnificent is in the details. Small but mighty, the Jack
              Russell is an energetic dog that requires a ton of activity. They
              can benefit from the right diet to help maintain muscle mass,
              protect their skin and coat, and help with dental care, especially
              as your good-looking little pal becomes older.
            </div>
          </div>
        </div>
      </div>
      <Details goodsDetailTab={props.goodsDetailTab} />
      <div className="rc-text--center rc-md-up">
        <button
          className="rc-btn rc-btn--sm rc-btn--two button192"
          onClick={() => {
            props.toOtherStep('step1');
          }}
        >
          select another product
        </button>
        <button
          className="rc-btn rc-btn--sm rc-btn--one button192"
          onClick={() => {
            props.toOtherStep('step3');
          }}
        >
          Conﬁrm this product
        </button>
      </div>
      <div className="rc-layout-container rc-two-column  rc-text--center rc-margin-top--md rc-md-down">
        <div className="rc-column">
          <button
            disabled={props.isDisabled}
            className="rc-btn rc-btn--two button192"
            onClick={() => {
              this.props.toOtherStep('step1');
            }}
          >
            select another product
          </button>
        </div>
        <div className="rc-column">
          <button
            disabled={props.isDisabled}
            className="rc-btn rc-btn--one button192"
            onClick={() => {
              this.props.toOtherStep('step3');
            }}
          >
            Conﬁrm this product
          </button>
        </div>
      </div>
    </div>
  );
};
const Step3 = (props) => {
  const computedList = [
    { name: 'test', value: 1 },
    { name: 'test1', value: 11 },
    { name: 'test11', value: 111 }
  ];
  const handleSelectedItemChange = ()=> {
    console.info('test')
  }
  return (
    <div className="confirm_product">
      <div className="title text-center">
        <span
          className="back_button rc_md_up rc-styled-link"
          onClick={() => {
            props.toOtherStep('step1');
          }}
        >
          <span className="rc-icon rc-plus--xs rc-iconography icon_back"></span>
          go back to product
        </span>
        Get your kibble refills delivered automatically, just select your
        desired delivery frequency and add to cart
      </div>
      <div className="rc-layout-container rc-three-column wrap_container margin_for_1rem">
        <div className="rc-column wrap_item free_sampling">
          <div className="pad_3rem_pc">
            <img src={foodDispenserPic} />
            <h6>PETKIT FRESH ELEMENT Mini</h6>
            <p>x1 Delivered at the first shipment</p>
          </div>
          <span className="rc-icon rc-plus--xs rc-iconography rc-quantity__btn side_icon"></span>
        </div>
        <div className="rc-column wrap_item food_info">
          <div className="pad_2rem_pc">
            <div className="for_h5_img">
              <img src={foodPic2} />
              <h6 className="rc-hero__section--text product_name">
                Jack Russel Terrier
              </h6>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div
                className="cart-and-ipay"
                style={{ float: 'left', width: '36%' }}
              >
                <div className="rc-swatch __select-size">
                  {/* <div className="rc-swatch__item selected">
                            <span>
                              {find(pitem.sizeList, s => s.selected).specText}
                              <i></i>
                            </span>
                          </div> */}
                  <div className="overflow-hidden">
                    <div className="text-left ml-1 font_size12 pad_b_5">
                      size:
                    </div>
                    <div
                      className={`rc-swatch__item`}
                      // key={i2}
                      // onClick={() =>
                      //   this.handleChooseSize(sdItem, pitem, index)
                      // }
                    >
                      <span>
                        3kg
                        <i></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="product-card-footer product-card-price d-flex"
                style={{ width: '62%' }}
              >
                <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
                  <div className="text-left ml-1 font_size12 pad_b_5">
                    Quantity:
                  </div>
                  <div className="rc-quantity d-flex">
                    <span
                      className=" rc-icon rc-minus--xs rc-iconography rc-quantity__btn js-qty-minus"
                      style={{ transform: 'scale(0.8)' }}
                      // onClick={() => this.subQuantity(pitem)}
                    ></span>
                    <input
                      className="rc-quantity__input"
                      value="1"
                      min="1"
                      max="10"
                      disabled
                      // onChange={(e) =>
                      //   this.handleAmountChange(e.target.value, pitem)
                      // }
                    />
                    <span
                      className="rc-icon rc-plus--xs rc-iconography rc-quantity__btn js-qty-plus"
                      style={{ transform: 'scale(0.8)' }}
                      // onClick={() => this.addQuantity(pitem)}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <p className="frequency">select your frequency</p>
            <div>
              <Selection
                customContainerStyle={{}}
                selectedItemChange={(data) =>
                  handleSelectedItemChange(pitem, data)
                }
                optionList={computedList}
                selectedItemData={{
                  value: 1
                }}
                customStyleType="select-one"
              />
            </div>
          </div>
          <span className="rc-icon rc-arrow--xs rc-iconography rc-quantity__btn side_icon"></span>
        </div>
        <div className="rc-column wrap_item check_order">
          <h5 className="text-center h5_left_text">summary</h5>
          <div className="d-flex">
            <div style={{ width: '70%' }}>
              <h6>Jack Russel Terrier</h6>
              <div className="font_size12 rc-margin-bottom--xs">
                Smart feeder subscription
              </div>
            </div>
            <div className="font_size20">26,50€</div>
          </div>
          <div className="d-flex">
            <div style={{ width: '70%' }}>
              <h6>PETKIT Dispenser</h6>
              <div className="font_size12 rc-margin-bottom--xs">
                x1 Delivered at the first shipment
              </div>
            </div>
            <div></div>
          </div>
          <div className="d-flex font_size20 shipping">
            <div style={{ width: '70%' }}>Shipping</div>
            <div>free</div>
          </div>
          <div className="d-flex total">
            <div style={{ width: '70%' }}>TOTAL</div>
            <div>26,50€</div>
          </div>
          <div>
            <div className="rc-layout-container rc-two-column  rc-text--center">
              <div className="rc-column">
                <button
                  onClick={props.hanldeAddToCart}
                  className="rc-btn rc-btn--two wid100 11111"
                >
                  Add to cart
                </button>
              </div>
              <div className="rc-column">
                <button className="rc-btn rc-btn--one wid100">
                  Go to Checkout
                </button>
              </div>
            </div>
          </div>
          {/* <button class="rc-btn rc-btn--one">Add to cart</button>
            <button class="rc-btn rc-btn--two">Go to Checkout</button>*/}
        </div>
      </div>
      <div
        className="rc_md_down text-center"
        style={{ background: '#f7f7f7', padding: '0 1rem' }}
      >
        <span
          className="rc-styled-link"
          onClick={() => {
            props.toOtherStep('step1');
          }}
        >
          <span className="rc-icon rc-plus--xs icon_back rc-iconography"></span>
          go back to product
        </span>
      </div>

      <div className="rc_md_up">
        <br />
        <br />
      </div>
    </div>
  );
};

@inject(
  'checkoutStore',
  'loginStore',
  'headerCartStore',
  'configStore',
  'clinicStore'
)
@observer
class SmartFeederSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      loading: false,
      headerHide: false,
      stepName: 'step3',
      addToCartLoading: false,
      isDisabled: true,
      checkOutErrMsg: '',
      productList: [...productList],
      requestJson: {
        prefixBreed: '',
        prefixFn: '',
        utmCampaign: '',
        utmMedium: '',
        utmSource: ''
      },
      form: {
        buyWay: 1,
        frequencyId: 5744,
        frequencyName: '1 semaine(s)',
        frequencyVal: '1'
      },
      details: {
        id: '',
        goodsName: '',
        goodsDescription: '',
        sizeList: [],
        images: [],
        goodsSpecDetails: [],
        goodsSpecs: [],
        taggingForText: null,
        taggingForImage: null
      },// 选中的商品
      activeTabIdx: 0,
      goodsDetailTab: {
        tabName: [],
        tabContent: []
      },
      quantity: 1,
      stock: 0,
      instockStatus: true,
      quantityMinLimit: 1,
      quantityMaxLimit: 30,
      currentUnitPrice: 0,
      currentLinePrice: 0,
      currentSubscriptionPrice: 0,
      currentSubscriptionStatus: 0,
      imageMagnifierCfg: {
        show: false
        // config: {},
      },
      loading: true,
      errMsg: '',
      checkOutErrMsg: '',
      addToCartLoading: false,
      tradePrice: '',
      specList: [],
      tabsValue: [],
      petModalVisible: false,
      isAdd: 0,
      productRate: 0,
      replyNum: 0,
      goodsId: null,
      minMarketPrice: 0,
      minSubscriptionPrice: 0,
      toolTipVisible: false,
      relatedProduct: [],
      // form: {
      //   buyWay: 1, //0 - once/ 1 - frequency
      //   frequencyVal: '',
      //   frequencyName: '',
      //   frequencyId: -1
      // },
      frequencyList: [],
      tabs: [],
      reviewShow: false,
      goodsNo: '', // SPU
      breadCrumbs: [],
    };
  }

  toScroll = (anchorName) => {
    let anchorElement = document.getElementById(anchorName);
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) {
      anchorElement.scrollIntoView();
    }
  };
  toOtherStep = (stepName = 'step1') => {
    this.setState({
      stepName
    });
    this.toScroll(stepName);
  };
  clickItem = (item) => {
    let productLists = [...this.state.productList];
    let isDisabled = true;
    productLists.forEach((product) => {
      if (item.id == product.id) {
        product.choosed = true;
        isDisabled = false;
      } else {
        product.choosed = false;
      }
    });
    this.setState({
      productList: productLists,
      isDisabled,
      // details
    });

    // this.details = item;
  };
  get btnStatus() {
    return true;
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  getUrlParam = () => {
    const { search } = this.props.history.location;
    const utmSource = getParaByName(search, 'utm_source');
    const utmMedium = getParaByName(search, 'utm_medium');
    const utmCampaign = getParaByName(search, 'utm_campaign');
    const prefixFn = getParaByName(search, 'prefn1');
    const prefixBreed = getParaByName(search, 'prefv1');
    const requestJson = {
      utmSource,
      utmMedium,
      utmCampaign,
      prefixFn,
      prefixBreed
    };
    this.setState({
      requestJson
    });
  }
  hanldeAddToCart = ({ redirect = false, needLogin = false } = {}) => {
    try {
      const { loading } = this.state;
      if (!this.btnStatus || loading) return false;
      this.setState({ checkOutErrMsg: '' });
      if (this.isLogin) {
        this.hanldeLoginAddToCart({ redirect });
      } else {
        this.hanldeUnloginAddToCart({ redirect, needLogin });
      }
    } catch (err) {}
  };
  async hanldeUnloginAddToCart({ redirect = false, needLogin = false }) {
    const {
      configStore,
      checkoutStore,
      history,
      headerCartStore,
      clinicStore
    } = this.props;
    const {
      currentUnitPrice,
      quantity,
      instockStatus,
      form,
      details,
      loading
    } = this.state;
    const { goodsId, sizeList } = details;
    // 加入购物车 埋点start
    this.GAAddToCar(quantity, details);
    // 加入购物车 埋点end
    this.setState({ checkOutErrMsg: '' });
    if (!this.btnStatus || loading) {
      throw new Error();
    }
    const currentSelectedSize = find(sizeList, (s) => s.selected);
    let quantityNew = quantity;
    let tmpData = Object.assign({}, details, {
      quantity: quantityNew
    });
    let cartDataCopy = cloneDeep(
      toJS(checkoutStore.cartData).filter((el) => el)
    );

    if (!instockStatus || !quantityNew) {
      throw new Error();
    }
    this.setState({ addToCartLoading: true });
    let flag = true;
    if (cartDataCopy && cartDataCopy.length) {
      const historyItem = find(
        cartDataCopy,
        (c) =>
          c.goodsId === goodsId &&
          currentSelectedSize.goodsInfoId ===
            c.sizeList.filter((s) => s.selected)[0].goodsInfoId
      );
      if (historyItem) {
        flag = false;
        quantityNew += historyItem.quantity;
        if (quantityNew > process.env.REACT_APP_LIMITED_NUM) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorMaxInfo"
              values={{ val: process.env.REACT_APP_LIMITED_NUM }}
            />
          );
          this.setState({ addToCartLoading: false });
          return;
        }
        tmpData = Object.assign(tmpData, {
          quantity: quantityNew,
          goodsInfoFlag: parseInt(form.buyWay)
        });
        if (parseInt(form.buyWay)) {
          tmpData.periodTypeId = form.frequencyId;
        }
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
        c.goodsId === goodsId &&
        currentSelectedSize.goodsInfoId ===
          find(c.sizeList, (s) => s.selected).goodsInfoId
    );
    tmpData = Object.assign(tmpData, {
      currentAmount: currentUnitPrice * quantityNew,
      selected: true,
      goodsInfoFlag: parseInt(form.buyWay)
    });
    if (parseInt(form.buyWay)) {
      tmpData.periodTypeId = form.frequencyId;
    }
    if (idx > -1) {
      cartDataCopy.splice(idx, 1, tmpData);
    } else {
      if (cartDataCopy.length >= process.env.REACT_APP_LIMITED_CATE_NUM) {
        this.showCheckoutErrMsg(
          <FormattedMessage
            id="cart.errorMaxCate"
            values={{ val: process.env.REACT_APP_LIMITED_CATE_NUM }}
          />
        );
        return;
      }
      if (Object.keys(this.state.requestJson).length > 0) {
        //requestJson是shelter和breeder产品的参数，有就加上
        tmpData = { ...tmpData, ...this.state.requestJson };
      }
      cartDataCopy.push(tmpData);
    }

    await checkoutStore.updateUnloginCart(cartDataCopy);
    try {
      if (redirect) {
        if (checkoutStore.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo3"
              values={{
                val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
              }}
            />
          );
          throw new Error();
        }
        if (checkoutStore.offShelvesProNames.length) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo4"
              values={{
                val: checkoutStore.offShelvesProNames.join('/')
              }}
            />
          );
          throw new Error();
        }
        if (checkoutStore.outOfstockProNames.length) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo2"
              values={{ val: checkoutStore.outOfstockProNames.join('/') }}
            />
          );
          throw new Error();
        }
        if (needLogin) {
          // history.push({ pathname: '/login', state: { redirectUrl: '/cart' } })
        } else {
          let autoAuditFlag = false;
          if (this.isLogin) {
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
            isLogin: this.isLogin
          });
          url && history.push(url);
          // history.push('/prescription');
        }
      }
    } catch (err) {
      console.log(err);
      this.setState({ errMsg: err.message.toString() });
    } finally {
      this.setState({ addToCartLoading: false });
    }
    if (isMobile) {
      this.refs.showModalButton.click();
    } else {
      headerCartStore.show();
      setTimeout(() => {
        headerCartStore.hide();
      }, 4000);
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.queryDetails()
    this.getUrlParam();
  }

  //加入购物车，埋点
  GAAddToCar = (num, item) => {
    let cur_selected_size = item.sizeList.filter((item2) => {
      return item2.selected == true;
    });
    let variant = cur_selected_size[0].specText;
    let goodsInfoNo = cur_selected_size[0].goodsInfoNo;
    let { form } = this.state;
    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComAddToBasket`,
      ecommerce: {
        add: {
          products: [
            {
              name: item.goodsName,
              id: item.goodsNo,
              club: 'no',
              type: form.buyWay == 0 ? 'one-time' : 'subscription',
              price:
                form.buyWay == 0
                  ? cur_selected_size[0].marketPrice
                  : cur_selected_size[0].subscriptionPrice,
              brand: item.brandName || 'Royal Canin',
              category: item.goodsCateName,
              variant: parseInt(variant),
              quantity: num,
              recommendation: 'self-selected',
              sku: goodsInfoNo
            }
          ]
        }
      }
    });
  };
  async queryDetails() {
    // const { id, goodsNo } = this.state;
    // let requestName;
    // let param;
    // if (goodsNo) {
    //   requestName = getDetailsBySpuNo;
    //   param = goodsNo;
    // } else {
    //   requestName = this.isLogin ? getLoginDetails : getDetails;
    //   param = id;
    // }
    let requestName = getDetailsBySpuNo;
    let param = 1293;
    Promise.all([requestName(param)])
      .then((resList) => {
        const res = resList[0];
        if (res && res.context) {
          this.setState({
            productRate: res.context.avgEvaluate
          });
        }
        if (res && res.context && res.context.goods) {
          let pageLink = window.location.href.split('-');
          pageLink.splice(pageLink.length - 1, 1);
          pageLink = pageLink.concat(res.context.goods.goodsNo).join('-');
          this.setState(
            {
              productRate: res.context.goods.avgEvaluate,
              replyNum: res.context.goods.goodsEvaluateNum,
              goodsId: res.context.goods.goodsId,
              minMarketPrice: res.context.goods.minMarketPrice,
              minSubscriptionPrice: res.context.goods.minSubscriptionPrice,
              details: Object.assign(this.state.details, {
                taggingForText: (res.context.taggingList || []).filter(
                  (e) =>
                    e.taggingType === 'Text' &&
                    e.showPage &&
                    e.showPage.includes('PDP')
                )[0],
                taggingForImage: (res.context.taggingList || []).filter(
                  (e) =>
                    e.taggingType === 'Image' &&
                    e.showPage &&
                    e.showPage.includes('PDP')
                )[0]
              }),
              spuImages: res.context.images,
              // breadCrumbs: [{ name: res.context.goods.goodsName }],
              pageLink
            },
            () => {
              console.info('...')
            }
          );
          // setSeoConfig({
          //   goodsId: res.context.goods.goodsId,
          //   categoryId: '',
          //   pageName: 'Product Detail Page'
          // }).then((res) => {
          //   this.setState({ seoConfig: res });
          // });
          // setSeoConfig({
          //   goodsId: res.context.goods.goodsId,
          //   categoryId: '',
          //   pageName: 'Product Detail Page'
          // });
        } else {
          this.setState({
            errMsg: <FormattedMessage id="details.errMsg" />
          });
        }
        let sizeList = [];
        let goodsInfos = res.context.goodsInfos || [];
        let isSkuNoQuery = res.context.isSkuNoQuery;
        let choosedSpecsArr = [];
        if (isSkuNoQuery) {
          // 通过sku查询
          let specsItem = goodsInfos.filter(
            (item) => item.goodsInfoNo == this.state.goodsNo
          );
          choosedSpecsArr =
            specsItem && specsItem[0] && specsItem[0].mockSpecDetailIds;
        }
        if (res && res.context && res.context.goodsSpecDetails) {
          let specList = res.context.goodsSpecs;
          let specDetailList = res.context.goodsSpecDetails;
          specList.map((sItem, index) => {
            sItem.chidren = specDetailList.filter((sdItem, i) => {
              if (index === 0) {
                // console.log(goodsInfos.filter(goodEl => goodEl.mockSpecDetailIds.includes(sdItem.specDetailId)), 'aaaa')
                let filterproducts = goodsInfos.filter((goodEl) =>
                  goodEl.mockSpecDetailIds.includes(sdItem.specDetailId)
                );
                sdItem.goodsInfoUnit = filterproducts[0].goodsInfoUnit;
                sdItem.isEmpty = filterproducts.every(
                  (item) => item.stock === 0
                );
                // filterproduct.goodsInfoWeight = parseFloat(sdItem.detailName)
              }
              return sdItem.specId === sItem.specId;
            });
            let defaultSelcetdSku = -1;
            if (choosedSpecsArr.length) {
              for (let i = 0; i < choosedSpecsArr.length; i++) {
                let specDetailIndex = sItem.specDetailIds.indexOf(
                  choosedSpecsArr[i]
                );
                if (specDetailIndex > -1) {
                  defaultSelcetdSku = specDetailIndex;
                }
              }
            }
            console.info('defaultSelcetdSku', defaultSelcetdSku);
            if (defaultSelcetdSku > -1) {
              // 默认选择该sku
              if (!sItem.chidren[defaultSelcetdSku].isEmpty) {
                // 如果是sku进来的，需要默认当前sku被选择
                sItem.chidren[defaultSelcetdSku].selected = true;
              }
            } else {
              if (sItem.chidren.length > 1 && !sItem.chidren[1].isEmpty) {
                sItem.chidren[1].selected = true;
              } else {
                for (let i = 0; i < sItem.chidren.length; i++) {
                  if (sItem.chidren[i].isEmpty) {
                  } else {
                    sItem.chidren[i].selected = true;
                    break;
                  }
                }
              }
            }
            return sItem;
          });
          console.log(specList, 'specList');
          // this.setState({ specList });
          sizeList = goodsInfos.map((g, i) => {
            // g = Object.assign({}, g, { selected: false });
            g = Object.assign({}, g, { selected: i === 0 });
            if (g.selected && !g.subscriptionStatus) {
              let { form } = this.state;
              form.buyWay = 0;
              this.setState({ form });
            }
            return g;
          });
          console.log(sizeList, 'sizeList');

          // const selectedSize = find(sizeList, s => s.selected)

          const { goodsDetailTab, tabs } = this.state;
          try {
            let tmpGoodsDetail = res.context.goods.goodsDetail;
            if (tmpGoodsDetail) {
              tmpGoodsDetail = JSON.parse(tmpGoodsDetail);
              console.log(tmpGoodsDetail, 'tmpGoodsDetail');
              for (let key in tmpGoodsDetail) {
                if (tmpGoodsDetail[key]) {
                  console.log(tmpGoodsDetail[key], 'ghaha');
                  if (process.env.REACT_APP_LANG === 'fr') {
                    let tempObj = {};
                    let tempContent = '';
                    try {
                      if (key === 'Description') {
                        tmpGoodsDetail[key].map((el) => {
                          if (
                            Object.keys(JSON.parse(el))[0] ===
                            'EretailShort Description'
                          ) {
                            tempContent =
                              tempContent +
                              `<p style="white-space: pre-line">${
                                Object.values(JSON.parse(el))[0]
                              }</p>`;
                          }
                        });
                      } else if (key === 'Bénéfices') {
                        tmpGoodsDetail[key].map((el) => {
                          tempContent =
                            tempContent +
                            `<li>
                            <div class="list_title">${
                              Object.keys(JSON.parse(el))[0]
                            }</div>
                            <div class="list_item" style="padding-top: 15px; margin-bottom: 20px;">${
                              Object.values(JSON.parse(el))[0]['Description']
                            }</div>
                          </li>`;
                        });
                        tempContent = `<ul class="ui-star-list rc_proudct_html_tab2 list-paddingleft-2">
                          ${tempContent}
                        </ul>`;
                      } else if (key === 'Composition') {
                        tmpGoodsDetail[key].map((el) => {
                          tempContent =
                            tempContent +
                            `<p>
                            
                            <div class="content">${
                              Object.values(JSON.parse(el))[0]
                            }</div> 
                          </p>`;
                        });
                      } else {
                        tempContent = tmpGoodsDetail[key];
                      }
                      goodsDetailTab.tabName.push(key);
                      goodsDetailTab.tabContent.push(tempContent);
                    } catch (e) {
                      console.log(e);
                    }
                  } else {
                    goodsDetailTab.tabName.push(key);
                    goodsDetailTab.tabContent.push(tmpGoodsDetail[key]);
                  }
                  console.log(tmpGoodsDetail[key], 'ghaha');
                  tabs.push({ show: false });
                  // goodsDetailTab.tabContent.push(translateHtmlCharater(tmpGoodsDetail[key]))
                }
              }
            }
            this.setState({
              goodsDetailTab,
              tabs
            });
          } catch (err) {
            console.log(err, 'err');
            getDict({
              type: 'goodsDetailTab',
              storeId: process.env.REACT_APP_STOREID
            }).then((res) => {
              goodsDetailTab.tabName = res.context.sysDictionaryVOS.map(
                (ele) => ele.name
              );
              this.setState({
                goodsDetailTab
              });
            });
          }
          let images = [];
          // if (res.context.goodsInfos.every((el) => !el.goodsInfoImg)) {
          //   if (res.context.images.length) {
          //     images = res.context.images;
          //   }
          // } else {
          //   images = res.context.goodsInfos.filter((el) => el.goodsInfoImg);
          // }
          // let filterImages = res.context.goodsInfos.filter((el) => el.goodsInfoImg)
          // if(filterImages.length) {
          //   images = res.context.goodsInfos.map((el) => el.goodsInfoImg)
          // }else {
          //   ima
          // }
          images = res.context.goodsInfos;
          this.setState(
            {
              details: Object.assign(
                {},
                this.state.details,
                res.context.goods,
                {
                  sizeList,
                  goodsInfos: res.context.goodsInfos,
                  goodsSpecDetails: res.context.goodsSpecDetails,
                  goodsSpecs: res.context.goodsSpecs
                }
              ),
              images,
              // images: res.context.images.concat(res.context.goodsInfos),
              // images: res.context.goodsInfos.every(el => !el.goodsInfoImg)?res.context.images: res.context.goodsInfos,
              specList
            },
            () => {
              //Product Detail Page view 埋点start
              // this.GAProductDetailPageView(this.state.details);
              //Product Detail Page view 埋点end
              this.matchGoods();
            }
          );
        } else {
          let sizeList = [];
          let goodsInfos = res.context.goodsInfos || [];
          sizeList = goodsInfos.map((g, i) => {
            g = Object.assign({}, g, { selected: i === 0 });
            if (g.selected && !g.subscriptionStatus) {
              let { form } = this.state;
              form.buyWay = 0;
              this.setState({ form });
            }
            return g;
          });

          // const selectedSize = find(sizeList, s => s.selected)

          const { goodsDetailTab, tabs } = this.state;
          // try {
          //   let tmpGoodsDetail = res.context.goods.goodsDetail;
          //   if (tmpGoodsDetail) {
          //     tmpGoodsDetail = JSON.parse(tmpGoodsDetail);
          //     for (let key in tmpGoodsDetail) {
          //       if (tmpGoodsDetail[key]) {
          //         goodsDetailTab.tabName.push(key);
          //         goodsDetailTab.tabContent.push(tmpGoodsDetail[key]);
          //         tabs.push({ show: false });
          //         // goodsDetailTab.tabContent.push(translateHtmlCharater(tmpGoodsDetail[key]))
          //       }
          //     }
          //   }
          //   this.setState({
          //     goodsDetailTab: goodsDetailTab,
          //     tabs
          //   });
          // } catch (err) {
          //   getDict({
          //     type: 'goodsDetailTab',
          //     storeId: process.env.REACT_APP_STOREID
          //   }).then((res) => {
          //     goodsDetailTab.tabName = res.context.sysDictionaryVOS.map(
          //       (ele) => ele.name
          //     );
          //     this.setState({
          //       goodsDetailTab: goodsDetailTab
          //     });
          //   });
          // }
          try {
            let tmpGoodsDetail = res.context.goods.goodsDetail;
            console.log(JSON.parse(tmpGoodsDetail), 'tmpGoodsDetail');
            if (tmpGoodsDetail) {
              tmpGoodsDetail = JSON.parse(tmpGoodsDetail);
              console.log(tmpGoodsDetail, 'tmpGoodsDetail');
              for (let key in tmpGoodsDetail) {
                if (tmpGoodsDetail[key]) {
                  console.log(tmpGoodsDetail[key], 'ghaha');
                  if (process.env.REACT_APP_LANG === 'fr') {
                    let tempObj = {};
                    let tempContent = '';
                    try {
                      if (key === 'Description') {
                        tmpGoodsDetail[key].map((el) => {
                          if (
                            Object.keys(JSON.parse(el))[0] ===
                            'EretailShort Description'
                          ) {
                            tempContent =
                              tempContent +
                              `<p style="white-space: pre-line">${
                                Object.values(JSON.parse(el))[0]
                              }</p>`;
                          }
                        });
                      } else if (key === 'Bénéfices') {
                        tmpGoodsDetail[key].map((el) => {
                          tempContent =
                            tempContent +
                            `<li>
                            <div class="list_title">${
                              Object.keys(JSON.parse(el))[0]
                            }</div>
                            <div class="list_item" style="padding-top: 15px; margin-bottom: 20px;">${
                              Object.values(JSON.parse(el))[0]['Description']
                            }</div>
                          </li>`;
                        });
                        tempContent = `<ul class="ui-star-list rc_proudct_html_tab2 list-paddingleft-2">
                          ${tempContent}
                        </ul>`;
                      } else if (key === 'Composition') {
                        if (res.context.goods.goodsType !== 2) {
                          tmpGoodsDetail[key].map((el) => {
                            tempContent =
                              tempContent +
                              `<p>
                              
                              <div class="content">${
                                Object.values(JSON.parse(el))[0]
                              }</div> 
                            </p>`;
                          });
                        } else {
                          tmpGoodsDetail[key].map((el) => {
                            let contentObj = JSON.parse(el);
                            let contentValue = '';
                            Object.values(Object.values(contentObj)[0]).map(
                              (el) => {
                                contentValue += `<p>${el}</p>`;
                              }
                            );
                            console.log(tempContent, 'heiheihaha');
                            tempContent =
                              tempContent +
                              `
                              <div class="title">
                                ${Object.keys(contentObj)[0]}
                              </div>
                              <div class="content">${contentValue}</div> 
                            `;
                          });
                        }
                      } else {
                        tempContent = tmpGoodsDetail[key];
                      }
                      goodsDetailTab.tabName.push(key);
                      goodsDetailTab.tabContent.push(tempContent);
                    } catch (e) {
                      console.log(e);
                    }
                  } else {
                    goodsDetailTab.tabName.push(key);
                    goodsDetailTab.tabContent.push(tmpGoodsDetail[key]);
                  }
                  console.log(tmpGoodsDetail[key], 'ghaha');
                  tabs.push({ show: false });
                  // goodsDetailTab.tabContent.push(translateHtmlCharater(tmpGoodsDetail[key]))
                }
              }
            }
            this.setState({
              goodsDetailTab,
              tabs
            });
          } catch (err) {
            console.log(err, 'tmpGoodsDetail');
            getDict({
              type: 'goodsDetailTab',
              storeId: process.env.REACT_APP_STOREID
            }).then((res) => {
              goodsDetailTab.tabName = res.context.sysDictionaryVOS.map(
                (ele) => ele.name
              );
              this.setState({
                goodsDetailTab
              });
            });
          }
          let images = [];
          // if (res.context.goodsInfos.every((el) => !el.goodsInfoImg)) {
          //   if (res.context.images.length) {
          //     images = res.context.images;
          //   }
          // } else {
          //   images = res.context.goodsInfos.filter((el) => el.goodsInfoImg);
          // }
          images = res.context.goodsInfos;
          this.setState(
            {
              details: Object.assign(
                {},
                this.state.details,
                res.context.goods,
                {
                  sizeList,
                  goodsInfos: res.context.goodsInfos,
                  goodsSpecDetails: res.context.goodsSpecDetails,
                  goodsSpecs: res.context.goodsSpecs
                }
              ),
              images
            },
            () => {
              console.info('// 选中的商品', details)
              //Product Detail Page view 埋点start
              // this.GAProductDetailPageView(this.state.details);
              //Product Detail Page view 埋点end
              this.bundleMatchGoods();
            }
          );
          // 没有规格的情况
          // this.setState({
          //   errMsg: <FormattedMessage id="details.errMsg" />
          // });
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          errMsg: e.message ? (
            e.message.toString()
          ) : (
            <FormattedMessage id="details.errMsg2" />
          )
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
          initing: false
        });
      });
  }
  bundleMatchGoods = () => {
    let {
      details,
      currentUnitPrice,
      currentSubscriptionPrice,
      currentSubscriptionStatus,
      stock
    } = this.state;

    currentUnitPrice = details.goodsInfos[0].salePrice;
    currentSubscriptionPrice = details.goodsInfos[0].subscriptionPrice;
    currentSubscriptionStatus = details.goodsInfos[0].subscriptionStatus;
    stock = details.goodsInfos[0].stock;
    details.sizeList[0].selected = true;
    this.setState(
      {
        details,
        currentUnitPrice,
        currentSubscriptionPrice,
        currentSubscriptionStatus,
        stock
      },
      () => {
        this.updateInstockStatus();
      }
    );
  }
  matchGoods = () => {
    let {
      specList,
      details,
      currentUnitPrice,
      currentLinePrice,
      currentSubscriptionPrice,
      currentSubscriptionStatus,
      stock
    } = this.state;
    let selectedArr = [];
    let idArr = [];
    let baseSpecId = details.baseSpec;
    specList.map((el) => {
      if (el.chidren.filter((item) => item.selected).length) {
        selectedArr.push(el.chidren.filter((item) => item.selected)[0]);
      }
      return el;
    });
    selectedArr = selectedArr.sort((a, b) => a.specDetailId - b.specDetailId);
    idArr = selectedArr.map((el) => el.specDetailId);
    currentUnitPrice = details.marketPrice;

    details.sizeList.map((item, i) => {
      item.basePrice = 0;
      details.goodsSpecDetails.map((el) => {
        if (
          el.specId === baseSpecId &&
          item.mockSpecDetailIds.includes(el.specDetailId)
        ) {
          item.baseSpecLabel = el.detailName;
        }
        return el;
      });
      let specTextArr = [];
      for (let specItem of specList) {
        for (let specDetailItem of specItem.chidren) {
          if (
            item.mockSpecIds.includes(specDetailItem.specId) &&
            item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
          ) {
            specTextArr.push(specDetailItem.detailName);
          }
          // console.log(item.mo)
          if (
            item.mockSpecIds.includes(baseSpecId) &&
            item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
          ) {
            console.log(
              specDetailItem.detailName,
              'specDetailItem.detailName',
              i
            );
            item.baseSpecLabel = specDetailItem.detailName;
          }
        }
      }
      item.specText = specTextArr.join(' ');
      if (item.mockSpecDetailIds.sort().join(',') === idArr.join(',')) {
        console.log(item, 'item');
        item.selected = true;
        currentUnitPrice = item.salePrice;
        currentLinePrice = item.linePrice;
        currentSubscriptionPrice = item.subscriptionPrice;
        currentSubscriptionStatus = item.subscriptionStatus;
        stock = item.stock;
      } else {
        item.selected = false;
      }

      return item;
    });
    console.log(details, 'details');
    this.setState(
      {
        details,
        currentUnitPrice,
        currentLinePrice,
        currentSubscriptionPrice,
        currentSubscriptionStatus,
        stock
      },
      () => {
        this.updateInstockStatus();
      }
    );
  }
  updateInstockStatus = () => {
    this.setState({
      instockStatus: this.state.quantity <= this.state.stock
    });
  }
  hanldeLoginAddToCart = async () => {
    try {
      const {
        configStore,
        checkoutStore,
        history,
        clinicStore,
        headerCartStore
      } = this.props;
      const { quantity, form, details } = this.state;
      console.info('details', details)
      this.GAAddToCar(quantity, details);

      const { sizeList } = details;
      let currentSelectedSize;
      this.setState({ addToCartLoading: true });
      if (details.goodsSpecDetails) {
        currentSelectedSize = find(sizeList, (s) => s.selected);
      } else {
        currentSelectedSize = sizeList[0];
      }
      console.info('currentSelectedSize', currentSelectedSize)

      let param = {
        goodsInfoId: currentSelectedSize.goodsInfoId,
        goodsNum: quantity,
        goodsInfoFlag: parseInt(form.buyWay)
      };
      if (parseInt(form.buyWay)) {
        param.periodTypeId = form.frequencyId;
      }

      if (Object.keys(this.state.requestJson).length > 0) {
        param = { ...param, ...this.state.requestJson };
      }
      await sitePurchase(param);
      await checkoutStore.updateLoginCart();
      if (isMobile) {
        // this.refs.showModalButton.click();
      } else {
        headerCartStore.show();
        setTimeout(() => {
          headerCartStore.hide();
        }, 4000);
      }

      if (redirect) {
        if (checkoutStore.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo3"
              values={{
                val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
              }}
            />
          );
          return false;
        }

        // 存在下架商品，不能下单
        if (checkoutStore.offShelvesProNames.length) {
          this.showCheckoutErrMsg(
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
          this.showCheckoutErrMsg(
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
          this.showCheckoutErrMsg(
            <FormattedMessage
              id="cart.errorInfo5"
              values={{
                val: checkoutStore.deletedProNames.join('/')
              }}
            />
          );
          return false;
        }
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
          isLogin: this.isLogin
        });
        url && history.push(url);
        // history.push('/prescription');
      }
    } catch (err) {
      console.log(err);
      this.setState({ errMsg: err.message.toString() });
    } finally {
      this.setState({ addToCartLoading: false });
    }
  };
  handleScroll = () => {
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    console.info('scrollTop', scrollTop);
    if (scrollTop > 120 && this.state.stepName == 'step1') {
      this.setState({ headerHide: true });
    } else {
      this.setState({ headerHide: false });
    }
  };
  render() {
    const { location, history, match } = this.props;
    const { headerHide, stepName } = this.state;
    let stepCom = null;
    return (
      <div>
        {!headerHide ? (
          <Header
            showMiniIcons={true}
            showUserIcon={true}
            location={location}
            history={history}
            match={match}
          />
        ) : (
          <div className="rc-text--center rc-header">
            <button
              onClick={() => {
                this.toScroll('step1');
              }}
              className="rc-btn rc-btn--one"
            >
              choose your product
            </button>
          </div>
        )}
        <main className="rc-content--fixed-header smartfeedersubscription">
          <StaticPage />
          <div id="step1"></div>
          <div id="step2"></div>
          <div id="step3"></div>
          <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil h5_no_pad">
            <h2 className="smartfeedersubscription-title">
              {stepName == 'step3'
                ? 'Finalise your order'
                : 'Select your product'}
            </h2>
            {(() => {
              switch (stepName) {
                case 'step1':
                  stepCom = (
                    <Step1
                      isDisabled={this.state.isDisabled}
                      productList={this.state.productList}
                      clickItem={this.clickItem}
                      toOtherStep={this.toOtherStep}
                    />
                  );
                  break;
                case 'step2':
                  stepCom = (
                    <Step2
                      goodsDetailTab={goodsDetailTab.data}
                      toOtherStep={this.toOtherStep}
                    />
                  );
                  break;
                case 'step3':
                  stepCom = (
                    <Step3
                      toOtherStep={this.toOtherStep}
                      hanldeAddToCart={this.hanldeAddToCart}
                    />
                  );
                  break;
              }
              return stepCom;
            })()}
          </section>
          <FAQ />
          <Help />
        </main>
        <Footer />
      </div>
    );
  }
}

export default SmartFeederSubscription;
