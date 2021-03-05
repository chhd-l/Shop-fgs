import React, { Component, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { toJS } from 'mobx';
import cloneDeep from 'lodash/cloneDeep';
import Help from './modules/Help';
import FAQ from './modules/FAQ';
import Details from './modules/Details';
import StaticPage from './modules/StaticPage';
import { getProductPetConfig } from '@/api/payment';
import { IMG_DEFAULT } from '@/utils/constant';
import { getDetails, getLoginDetails, getDetailsBySpuNo } from '@/api/details';
import { getFoodDispenserList, getFoodDispenserDes } from '@/api/dispenser';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginButton from '@/components/LoginButton';
import './index.less';
import AddCartSuccessMobile from '../Details/components/AddCartSuccessMobile';
// import Swiper from 'swiper';
import Selection from '@/components/Selection';
import { FormattedMessage, injectIntl } from 'react-intl';
// import 'swiper/swiper-bundle.min.css';
import Slider from 'react-slick';
import {
  getDeviceType,
  getParaByName,
  formatMoney,
  distributeLinktoPrecriberOrPaymentPage,
  getFrequencyDict
} from '@/utils/utils';
import goodsDetailTabs from './modules/goodsDetailTab.json';
import { sitePurchase } from '@/api/cart';
import foodPic from './img/food_pic.png';
import foodDispenserPic from './img/food_dispenser_pic.png';
import foodPic2 from './img/step2_food.png';
import LazyLoad from 'react-lazyload';

const isMobile = getDeviceType() !== 'PC';
const Step1Pc = (props) => {
  return (
    <div className="margin12">
      <div className="rc-card-grid rc-match-heights rc-card-grid--fixed rc-three-column">
        {(props.productList || []).map((item) => (
          <div
            className="rc-grid"
            key={item.goodsInfoId}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              props.clickItem(item);
            }}
          >
            <article
              className={`rc-card rc-card--a ${item.choosed ? 'active' : ''}`}
            >
              <picture
                className="rc-card__image"
                style={{ paddingTop: '.5rem' }}
              >
                <img
                  src={item.goodsInfoImg || IMG_DEFAULT}
                  alt={item.goodsInfoName}
                  style={{ maxHeight: '10rem' }}
                />
              </picture>
              <div className="rc-card__body">
                <header>
                  <h1
                    className="rc-card__title rc-text--center"
                    style={{ height: '2em' }}
                  >
                    {item.goodsInfoName}
                  </h1>
                </header>
                <p className="rc-text--center" style={{ height: '2em' }}>
                  {item.goodsCateName}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
      <Test />
      <div className="rc-text--center">
        <button
          disabled={props.isDisabled}
          className="rc-btn rc-btn--two rc-padding-right--xl button192"
          onClick={() => {
            props.toOtherStep('step2');
          }}
        >
          <FormattedMessage id="smartFeederSubscription.viewProductDetails" />
        </button>
        <button
          disabled={props.isDisabled}
          className="rc-btn rc-btn--one button192"
          onClick={() => {
            props.toOtherStep('step3');
          }}
        >
          <FormattedMessage id="smartFeederSubscription.chooseProduct" />
        </button>
      </div>
    </div>
  );
};
// 不引入样式有问题
const Test = () => {
  return (
    <div className="margin12" style={{ display: 'none' }}>
      <div className="rc-card-grid rc-match-heights rc-card-grid--fixed rc-three-column">
        <div class="rc-grid">
          <article class="rc-card rc-card--a">test</article>
        </div>
      </div>
    </div>
  );
};
class Step1H5 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.slideWidth = document.body.clientWidth / 1.5;
  }
  componentDidMount() {
    // new Swiper('.swiper-container', {
    //   slidesPerView: 'auto',
    //   spaceBetween: 0
    // });
  }
  render() {
    const settings = {
      className: 'slider variable-width',
      // dots: true,
      // infinite: true,
      // centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      variableWidth: true
    };
    return (
      <>
        <div className="swiper-container">
          {/* <div className="swiper-wrapper"> */}
          <Slider {...settings}>
            {this.props.productList.map((item) => (
              <div
                style={{ width: this.slideWidth }}
                className={`swiper-slide  ${item.choosed ? 'active' : ''}`}
                onClick={() => {
                  this.props.clickItem(item);
                }}
                key={item.goodsInfoId}
              >
                <div>
                  <img
                    src={item.goodsInfoImg}
                    className="m-auto"
                    style={{ maxHeight: '12rem' }}
                  />
                  <div className="title">{item.goodsInfoName}</div>
                  <div className="des">{item.goodsCateName}</div>
                </div>
              </div>
            ))}
          </Slider>
          {/* </div> */}
          <div className="swiper-pagination"></div>
        </div>
        <div className="rc-layout-container rc-two-column  rc-text--center rc-margin-top--md">
          <div className="rc-column">
            <button
              disabled={this.props.isDisabled}
              className="rc-btn rc-btn--two button192"
              onClick={() => {
                this.props.toOtherStep('step2');
              }}
            >
              <FormattedMessage id="smartFeederSubscription.viewProductDetails" />
            </button>
          </div>
          <div className="rc-column">
            <button
              disabled={this.props.isDisabled}
              className="rc-btn rc-btn--one button192"
              onClick={() => {
                this.props.toOtherStep('step3');
              }}
            >
              <FormattedMessage id="smartFeederSubscription.chooseProduct" />
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
  const createMarkup = (text) => ({ __html: text });
  console.info('detailsdetailsdetails', props.details);
  return (
    <div className="margin12 product_detail">
      <div>
        <div className="rc-layout-container rc-five-column">
          <div className="rc-column  rc-header__center d-flex">
            <LazyLoad>
              <img src={foodPic2} />
            </LazyLoad>
          </div>
          <div className="rc-column rc-double-width">
            <div className="title">{props.details.goodsInfoName}</div>
            <div className="sub_title">{props.foodFllType}</div>
            <div>
              <div className="block">
                <p
                  className="content rc-scroll--x"
                  style={{ marginBottom: '4rem' }}
                  dangerouslySetInnerHTML={createMarkup(
                    props.goodsDetailTab?.tabContent[0]
                  )}
                />
              </div>
              {/* Royal Canin Jack Russell Terrier Adult dry dog food is designed to
              meet the nutritional needs of purebred Jack Russell Terriers 10
              months and older Royal Canin knows what makes your Jack Russell
              Terrier magnificent is in the details. Small but mighty, the Jack
              Russell is an energetic dog that requires a ton of activity. They
              can benefit from the right diet to help maintain muscle mass,
              protect their skin and coat, and help with dental care, especially
              as your good-looking little pal becomes older. */}
            </div>
          </div>
        </div>
      </div>
      <Details goodsDetailTab={props.goodsDetailTab} details={props.details} />
      <div className="rc-text--center rc-md-up">
        <button
          className="rc-btn rc-btn--sm rc-btn--two button192"
          onClick={() => {
            props.toOtherStep('step1');
          }}
        >
          <FormattedMessage id="smartFeederSubscription.selectAnotherProduct" />
        </button>
        <button
          className="rc-btn rc-btn--sm rc-btn--one button192"
          onClick={() => {
            props.toOtherStep('step3');
          }}
        >
          <FormattedMessage id="smartFeederSubscription.conﬁrmThisProduct" />
        </button>
      </div>
      <div className="rc-layout-container rc-two-column  rc-text--center rc-margin-top--md rc-md-down">
        <div className="rc-column">
          <button
            disabled={props.isDisabled}
            className="rc-btn rc-btn--two button192"
            onClick={() => {
              props.toOtherStep('step1');
            }}
          >
            <FormattedMessage id="smartFeederSubscription.selectAnotherProduct" />
          </button>
        </div>
        <div className="rc-column">
          <button
            disabled={props.isDisabled}
            className="rc-btn rc-btn--one button192"
            onClick={() => {
              props.toOtherStep('step3');
            }}
          >
            <FormattedMessage id="smartFeederSubscription.conﬁrmThisProduct" />
          </button>
        </div>
      </div>
    </div>
  );
};
const Step3 = (props) => {
  const defaultInfo = { planGifts: [{}], planProds: [{}] };
  const [detailInfo, setDetailInfo] = useState(defaultInfo);
  const [frequencyList, setFrequencyList] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const handleSelectedItemChange = (data) => {
    setSelectedFrequency(data.value);
    let step3Data = Object.assign({}, detailInfo, { frequencyId: data.id });
    props.getStep3Choosed(step3Data);
    console.info('test', data);
  };
  const getDes = async () => {
    let { goodsInfoId, packageId, planId } = props.details;
    let res = await getFoodDispenserDes({
      planId,
      packageId,
      goodsInfoId,
      storeId: process.env.REACT_APP_STOREID
    });
    res = res.context;
    setDetailInfo(res);
    await getFrequencyDict().then((ress) => {
      let list = ress
        .filter((item) => res.frequencies?.includes(item.id.toString()))
        .map((item) => ({ ...item, value: item.id }));
      console.info('list', list);
      console.info('list', list[0] && list[0].id);
      setFrequencyList(list);
      const frequencyId = list[0] && list[0].id;
      let step3Data = Object.assign({}, res, { frequencyId });
      props.getStep3Choosed(step3Data);
      // 初始赋值失败
      setTimeout(() => {
        let defaultVal = list[0] && list[0].id;
        setSelectedFrequency(list[0].value);
      }, 1000);
    });
  };
  useEffect(() => {
    getDes();
  }, []);
  return (
    <div className="confirm_product">
      <div className="title text-center d-flex">
        <span className="back_button rc_md_up">
          <span className="rc-icon rc-plus--xs rc-iconography icon_back"></span>
          <span
            className="rc-styled-link"
            onClick={() => {
              props.toOtherStep('step1');
            }}
          >
            <FormattedMessage id="smartFeederSubscription.backToProduct" />
          </span>
        </span>
        <span style={{ flex: 1 }}>
          <FormattedMessage id="smartFeederSubscription.backToProductTitle" />
        </span>
      </div>
      <div className="rc-layout-container rc-three-column wrap_container margin_for_1rem">
        <div className="rc-column wrap_item free_sampling">
          <div className="pad_3rem_pc d-flex column">
            <img
              className="height-for-mobile"
              src={detailInfo.planGifts?.[0].goodsInfoImg || foodDispenserPic}
              title={detailInfo.planGifts?.[0].goodsInfoName}
            />
            <div
              className="d-flex"
              style={{ flexDirection: 'column', justifyContent: 'center' }}
            >
              <h6>{detailInfo.planGifts?.[0].goodsInfoName}</h6>
              <p>
                x1{' '}
                <FormattedMessage id="smartFeederSubscription.shopmentTimes" />
              </p>
            </div>
          </div>
          <span className="rc-icon rc-plus--xs rc-iconography rc-quantity__btn side_icon"></span>
        </div>
        <div className="rc-column wrap_item food_info">
          <div className="pad_2rem_pc">
            <div className="for_h5_img">
              <img src={foodPic2} />
              <h6
                className="rc-hero__section--text product_name text-center"
                style={{ fontSize: '18px' }}
              >
                {detailInfo.planProds?.[0].goodsInfoName}
              </h6>
            </div>
            <div style={{ overflow: 'hidden' }}>
              {props.specList.map((item) => (
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
                        <FormattedMessage id={item.specName} />:
                      </div>
                      {item.chidren.map((sdItem) => (
                        <div
                          style={{
                            display: `${sdItem.selected ? 'initial' : 'none'}`
                          }}
                          className={`rc-swatch__item`}
                          // key={i2}
                          // onClick={() =>
                          //   this.handleChooseSize(sdItem, pitem, index)
                          // }
                        >
                          <span>
                            {sdItem.detailName}
                            <i></i>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div
                className="product-card-footer product-card-price d-flex"
                style={{ width: '62%' }}
              >
                <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
                  <div className="text-left ml-1 font_size12 pad_b_5">
                    <FormattedMessage id="quantityText" />:
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
            <p className="frequency">
              <FormattedMessage id="smartFeederSubscription.selectYourFrequency" />
            </p>
            <div>
              {selectedFrequency && (
                <Selection
                  customContainerStyle={{}}
                  selectedItemChange={(data) => handleSelectedItemChange(data)}
                  optionList={frequencyList}
                  selectedItemData={{
                    value: selectedFrequency
                  }}
                  customStyleType="select-one"
                />
              )}
            </div>
          </div>
          <span className="rc-icon rc-arrow--xs rc-iconography rc-quantity__btn side_icon"></span>
        </div>
        <div className="rc-column wrap_item check_order">
          <h5 className="text-center h5_left_text">Summary</h5>
          <div className="d-flex">
            <div style={{ width: '70%' }}>
              <h6>{detailInfo.planProds?.[0].goodsInfoName}</h6>
              <div className="font_size12 rc-margin-bottom--xs">
                <FormattedMessage id="smartFeederSubscription.smartFeederSubscription" />
              </div>
            </div>
            <div className="font_size20 flex-fill text-right">
              {formatMoney(detailInfo.planProds?.[0].settingPrice)}
            </div>
          </div>
          <div className="d-flex">
            <div style={{ width: '70%' }}>
              <h6>{detailInfo.planGifts?.[0].goodsInfoName}</h6>
              <div className="font_size12 rc-margin-bottom--xs">
                x1{' '}
                <FormattedMessage id="smartFeederSubscription.shopmentTimes" />
              </div>
            </div>
            <div></div>
          </div>
          <div className="d-flex font_size20 shipping">
            <div style={{ width: '70%' }}>
              <FormattedMessage id="shipping" />
            </div>
            <div className="flex-fill text-right">
              <FormattedMessage id="freeShipping" />
            </div>
          </div>
          <div className="d-flex total">
            <div style={{ width: '70%' }}>
              <FormattedMessage id="total" />
            </div>
            <div className="flex-fill text-right">
              {formatMoney(detailInfo.planProds?.[0].settingPrice)}
            </div>
          </div>
          <div>
            <div className="rc-layout-container rc-two-column step3-btn-box  rc-text--center">
              <div className="rc-column">
                <button
                  onClick={props.hanldeAddToCart}
                  className="rc-btn rc-btn--two wid100 11111"
                >
                  <FormattedMessage id="details.addToCart" />
                </button>
              </div>
              <div className="rc-column">
                {props.isLogin ? (
                  <button
                    onClick={() =>
                      props.hanldeAddToCart({ redirect: true, needLogin: true })
                    }
                    className="rc-btn rc-btn--one wid100"
                  >
                    <FormattedMessage id="checkout" />
                  </button>
                ) : (
                  <LoginButton
                    beforeLoginCallback={async () => props.handleCheckout()}
                    btnClass={`wid100 rc-btn rc-btn--one rc-btn--sm btn-block cart__checkout-btn checkout-btn ${
                      checkoutLoading ? 'ui-btn-loading' : ''
                    }`}
                    history={props.history}
                  >
                    <FormattedMessage id="checkout" />
                  </LoginButton>
                )}
              </div>
            </div>
          </div>
          {/* <button class="rc-btn rc-btn--one">
              <FormattedMessage id="details.addToCart" />
          </button>
            <button class="rc-btn rc-btn--two">
                  <FormattedMessage id="checkout" />
            </button>*/}
        </div>
      </div>
      <div
        className="rc_md_down text-center"
        style={{ background: '#f7f7f7', padding: '0 1rem' }}
      >
        <span>
          <span className="rc-icon rc-plus--xs icon_back rc-iconography"></span>
          <span
            className="rc-styled-link"
            onClick={() => {
              props.toOtherStep('step1');
            }}
          >
            <FormattedMessage id="smartFeederSubscription.backToProduct" />
          </span>
        </span>
      </div>

      <div className="rc_md_up">
        <br />
        <br />
      </div>
    </div>
  );
};

const ErrMsgForCheckoutPanel = ({ checkOutErrMsg }) => {
  return (
    <div className={`text-break mt-2 mb-2 ${checkOutErrMsg ? '' : 'hidden'}`}>
      <aside
        className="rc-alert rc-alert--error rc-alert--with-close"
        role="alert"
      >
        <span className="pl-0">{checkOutErrMsg}</span>
      </aside>
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
      planId: '',
      enableFlag: true,
      step3Choosed: {},
      quantity: 1,
      loading: false,
      headerHide: false,
      stepName: 'step1',
      addToCartLoading: false,
      isDisabled: true,
      productList: [],
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
      }, // 选中的商品
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
      foodFllType: '',
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
      breadCrumbs: []
    };
  }

  toScroll = (anchorName) => {
    let anchorElement = document.getElementById(anchorName);
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) {
      anchorElement.scrollIntoView();
    }
  };
  handleCheckout = () => {
    // 未登录情况下，直接跳转登录，food dispenser需要登录之后才能checkout
    // this.GAAccessToGuestCheck();
    try {
      sessionItemRoyal.set('okta-redirectUrl', '/cart');
      this.setState({ checkoutLoading: true });
    } catch (err) {
    } finally {
      this.setState({ checkoutLoading: false });
    }
  };

  toOtherStep = async (stepName = 'step1') => {
    if (stepName == 'step2' || stepName == 'step3') {
      this.getStep2Data().then(() => {
        this.setState({
          stepName
        });
        this.toScroll(stepName);
      });
    } else {
      this.setState({
        stepName
      });
      this.toScroll(stepName);
    }
  };
  clickItem = (item) => {
    let { planId } = this.state;
    let productLists = [...this.state.productList];
    let isDisabled = true;
    productLists.forEach((product) => {
      console.info(
        'item.goodsInfoId == product.goodsInfoId',
        item.goodsInfoId == product.goodsInfoId
      );
      if (item.goodsInfoId == product.goodsInfoId) {
        product.choosed = true;
        isDisabled = false;
      } else {
        product.choosed = false;
      }
    });
    this.setState({
      productList: productLists,
      isDisabled,
      details: { ...item, planId }
    });
    // this.details = item;
  };
  getStep2Data = () => {
    let { goodsInfoNo } = this.state.details;
    return new Promise((resovle, reject) => {
      getDetailsBySpuNo(goodsInfoNo)
        .then((resList) => {
          // .then(() => {
          let res = resList;
          console.info('..................', res);
          // const res = resList[0];
          if (res && res.context) {
            this.setState({
              productRate: res.context.avgEvaluate
            });
          }
          let petType = 'Cat';
          let foodType = 'Dry';
          if (res && res.context?.goodsAttributesValueRelList) {
            res.context.goodsAttributesValueRelList.forEach((item, idx) => {
              if (item.goodsAttributeName == 'Lifestages') {
                petType =
                  item.goodsAttributeValue.split('_') &&
                  item.goodsAttributeValue.split('_')[1];
              }
              if (item.goodsAttributeName == 'Technology') {
                foodType = item.goodsAttributeValue;
              }
            });
          }
          if (res && res.context && res.context.goods) {
            let pageLink = window.location.href.split('-');
            pageLink.splice(pageLink.length - 1, 1);
            pageLink = pageLink.concat(res.context.goods.goodsNo).join('-');

            this.setState({
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
                )[0],
                fromPrice: res.context.fromPrice,
                toPrice: res.context.toPrice
              }),
              spuImages: res.context.images,
              breadCrumbs: [{ name: res.context.goods.goodsName }],
              pageLink
            });
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
              (item) => item.goodsInfoNo == goodsInfoNo
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
                  let filterproducts = goodsInfos.filter((goodEl) =>
                    goodEl.mockSpecDetailIds.includes(sdItem.specDetailId)
                  );
                  sdItem.goodsInfoUnit = filterproducts[0].goodsInfoUnit;
                  sdItem.isEmpty = filterproducts.every(
                    (item) => item.stock === 0
                  );
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
                if (
                  process.env.REACT_APP_LANG === 'de' &&
                  sItem.chidren.length > 1 &&
                  !sItem.chidren[1].isEmpty
                ) {
                  sItem.chidren[0].selected = true;
                } else if (
                  sItem.chidren.length > 1 &&
                  !sItem.chidren[1].isEmpty
                ) {
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
                // let { form } = this.state;
                // form.buyWay = 0;
                // this.setState({ form });
              }
              return g;
            });
            console.log(sizeList, 'sizeList');
            let foodFllType = `${foodType} ${petType} Food`;
            console.info('foodFllType', foodFllType);
            // const selectedSize = find(sizeList, s => s.selected)
            const { goodsDetailTab, tabs } = this.state;
            this.setState({ foodFllType });
            try {
              let tmpGoodsDetail = res.context.goods.goodsDetail;
              if (tmpGoodsDetail) {
                tmpGoodsDetail = JSON.parse(tmpGoodsDetail);
                console.log(tmpGoodsDetail, 'tmpGoodsDetail');
                for (let key in tmpGoodsDetail) {
                  if (tmpGoodsDetail[key]) {
                    console.log(tmpGoodsDetail[key], 'ghaha');
                    if (
                      process.env.REACT_APP_LANG === 'fr' ||
                      process.env.REACT_APP_LANG === 'ru' ||
                      process.env.REACT_APP_LANG === 'tr'
                    ) {
                      let tempObj = {};
                      let tempContent = '';
                      try {
                        if (
                          key === 'Description' ||
                          key === 'Описание' ||
                          key === 'İçindekiler'
                        ) {
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
                        } else if (
                          key === 'Bénéfices' ||
                          key === 'Полезные свойства' ||
                          key === 'Yararları'
                        ) {
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
                        } else if (
                          key === 'Composition' ||
                          key === 'Ингредиенты'
                        ) {
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
              console.info(
                'goodsDetailTabgoodsDetailTabgoodsDetailTab',
                goodsDetailTab
              );
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
            images = res.context.goodsInfos;
            this.setState({
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
              specList
            });
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
            const { goodsDetailTab, tabs } = this.state;
            try {
              let tmpGoodsDetail = res.context.goods.goodsDetail;
              console.log(JSON.parse(tmpGoodsDetail), 'tmpGoodsDetail');
              if (tmpGoodsDetail) {
                tmpGoodsDetail = JSON.parse(tmpGoodsDetail);
                console.log(tmpGoodsDetail, 'tmpGoodsDetail');
                for (let key in tmpGoodsDetail) {
                  if (tmpGoodsDetail[key]) {
                    console.log(tmpGoodsDetail[key], 'ghaha');
                    if (
                      process.env.REACT_APP_LANG === 'fr' ||
                      process.env.REACT_APP_LANG === 'ru' ||
                      process.env.REACT_APP_LANG === 'tr'
                    ) {
                      let tempObj = {};
                      let tempContent = '';
                      try {
                        if (
                          key === 'Description' ||
                          key === 'Описание' ||
                          key === 'İçindekiler'
                        ) {
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
                            } else if (
                              Object.keys(JSON.parse(el))[0] ===
                              'Prescriber Blod Description'
                            ) {
                              tempContent =
                                tempContent +
                                `<p style="white-space: pre-line; font-weight: 400">${
                                  Object.values(JSON.parse(el))[0]
                                }</p>`;
                            } else if (
                              Object.keys(JSON.parse(el))[0] ===
                              'Prescriber Description'
                            ) {
                              tempContent =
                                tempContent +
                                `<p style="white-space: pre-line; font-weight: 400;">${
                                  Object.values(JSON.parse(el))[0]
                                }</p>`;
                            }
                          });
                        } else if (
                          key === 'Bénéfices' ||
                          key === 'Полезные свойства' ||
                          key === 'Yararları'
                        ) {
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
            let foodFllType = `${foodType} ${petType} Food`;
            console.info('foodFllType', foodFllType);
            let images = [];
            images = res.context.goodsInfos;
            this.setState({
              foodFllType,
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
            });
          }
          console.info('....');
          resovle();
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
          console.info('???????');
          reject();
        })
        .finally(() => {
          this.setState({
            loading: false,
            initing: false
          });
        });
      console.info('???-------------------------????');
    });
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
    const planId = getParaByName(search, 'planId');
    this.setState({ planId }, () => {
      this.getStep1List();
    });
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
  };
  hanldeAddToCart = ({ redirect = false, needLogin = false } = {}) => {
    try {
      console.info('redirect', redirect);
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
      loading,
      step3Choosed
    } = this.state;
    const { goodsId, sizeList } = details;
    // 加入购物车 埋点start
    this.GAAddToCar(quantity, details);
    // 加入购物车 埋点end
    this.setState({ checkOutErrMsg: '' });
    if (!this.btnStatus || loading) {
      throw new Error();
    }
    const currentSelectedSize = Object.assign(
      step3Choosed,
      find(sizeList, (s) => s.selected)
    );
    let quantityNew = quantity;
    let tmpData = Object.assign({}, details, {
      quantity: quantityNew
    });
    const cartDataCopy = cloneDeep(
      toJS(checkoutStore.cartData).filter((el) => el)
    );
    console.info('cartDataCopy', cartDataCopy);
    if (!instockStatus || !quantityNew) {
      throw new Error();
    }
    this.setState({ addToCartLoading: true });
    let flag = true;
    if (cartDataCopy && cartDataCopy.length) {
      // 同一个sku，有不同planid的时候，不能合并购物车
      const historyItem = find(
        cartDataCopy,
        (c) =>
          c.goodsId === goodsId &&
          currentSelectedSize.planId == c.planId &&
          currentSelectedSize.goodsInfoId ===
            c.sizeList.filter((s) => s.selected)[0].goodsInfoId
      );
      //  (((currentSelectedSize.planId || c.planId) &&
      // currentSelectedSize.planId != c.planId) ||
      // (!currentSelectedSize.planId && !c.planId)) &&
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
        currentSelectedSize.planId == c.planId &&
        currentSelectedSize.goodsInfoId ===
          find(c.sizeList, (s) => s.selected).goodsInfoId
    );
    let { planId, planGifts, joinPromoFlag } = this.state.step3Choosed;
    tmpData = Object.assign(tmpData, {
      currentAmount: currentUnitPrice * quantityNew,
      selected: true,
      subscriptionPlanId: planId,
      subscriptionPlanPromotionFlag: joinPromoFlag ? 1 : 0,
      subscriptionPlanGiftList: planGifts,
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
      console.info('tmpData', tmpData);
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
  getStep1List = async () => {
    // "joinPromoFlag": true, --是否可以加入其它promo的标识 true 是，false   否
    // "quantityStage": 100 --当前订阅计划的库存量
    // @ApiEnumProperty("0")
    // SUCCESS,
    // @ApiEnumProperty("1")
    // NOTEXIST,
    // @ApiEnumProperty("2")
    // PARAMETERERROR,
    // @ApiEnumProperty("3")
    // DISABLE,
    // @ApiEnumProperty("4")
    // DATAERROR,
    // @ApiEnumProperty("5")
    // SOLDUP,
    // @ApiEnumProperty("6")
    // NOTRELEASE,
    // @ApiEnumProperty("7")
    // EXPIRE;
    let res = await getFoodDispenserList('0');
    const productList = res.context?.goodInfos;
    const enableFlag = res.context?.enableFlag;
    const planId = res.context?.planId;
    this.setState({ productList, enableFlag, planId });
    console.info('...getFoodDispenserList', res);
  };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // this.getUrlParam();
    this.getStep1List();
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
  };
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
  };
  showCheckoutErrMsg = (msg) => {
    this.setState({
      checkOutErrMsg: msg
    });
    if (isMobile) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  updateInstockStatus = () => {
    this.setState({
      instockStatus: this.state.quantity <= this.state.stock
    });
  };
  hanldeLoginAddToCart = async ({ redirect }) => {
    try {
      const {
        configStore,
        checkoutStore,
        history,
        clinicStore,
        headerCartStore
      } = this.props;
      const { quantity, form, details, planId } = this.state;
      console.info('details', details);
      this.GAAddToCar(quantity, details);
      const { sizeList } = details;
      let currentSelectedSize;
      this.setState({ addToCartLoading: true });
      if (details.goodsSpecDetails) {
        currentSelectedSize = find(sizeList, (s) => s.selected);
      } else {
        currentSelectedSize = sizeList[0];
      }
      let param = {
        goodsInfoId: currentSelectedSize.goodsInfoId,
        goodsNum: quantity,
        goodsInfoFlag: parseInt(form.buyWay)
      };
      param.periodTypeId = this.state.step3Choosed.frequencyId;
      param.settingPrice = this.state.step3Choosed.planProds[0].settingPrice;
      if (Object.keys(this.state.requestJson).length > 0) {
        let { packageId } = this.state.details;
        param = {
          ...param,
          ...this.state.requestJson,
          subscriptionPlanId: planId,
          subscriptionPlanPromotionFlag: this.state.step3Choosed.joinPromoFlag
            ? 1
            : 0,
          packageId: packageId
        };
      }
      await sitePurchase(param);
      await checkoutStore.updateLoginCart();
      if (isMobile) {
        // this.refs.showModalButton.click();
      } else {
        if (!redirect) {
          headerCartStore.show();
          setTimeout(() => {
            headerCartStore.hide();
          }, 4000);
        }
      }
      console.info('redirect....', redirect);
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
        console.info('url', url);
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
  getStep3Choosed = (data) => {
    let { details } = this.state;
    details.sizeList = details.sizeList.map((item) => {
      if (item.goodsInfoId == data.planProds && data.planProds[0].goodsInfoId) {
        item = Object.assign({}, item, data);
        console.info(item, '000000000000000');
      }
      return item;
    });
    this.setState(
      {
        step3Choosed: data,
        details
      },
      () => {
        console.info('.....details', details);
      }
    );
  };
  getGoodsNo = () => find(this.state.productList, (el) => el.choosed == true);
  handleScroll = () => {
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 120 && this.state.stepName == 'step1') {
      this.setState({ headerHide: true });
    } else {
      this.setState({ headerHide: false });
    }
  };
  render() {
    const { location, history, match } = this.props;
    const {
      headerHide,
      stepName,
      checkOutErrMsg,
      goodsDetailTab,
      enableFlag
    } = this.state;
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
          <div
            className="rc-text--center rc-header rc-padding-y--sm border-bottom-shadow"
            style={{
              background: '#fff',
              height: isMobile ? '66.6px' : '120px'
            }}
          >
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
        <button
          ref="showModalButton"
          class="rc-btn rc-btn--one"
          data-modal-trigger="modal-example"
          style={{ position: 'absolute', visibility: 'hidden' }}
        >
          Open standard modal
        </button>
        <main className="rc-content--fixed-header smartfeedersubscription">
          {enableFlag ? (
            <React.Fragment>
              {isMobile && (
                <div className="detailHeader mt-3">
                  <ErrMsgForCheckoutPanel checkOutErrMsg={checkOutErrMsg} />
                </div>
              )}
              <StaticPage toScroll={this.toScroll} />
              <div className="scroll-position">
                <div id="step1"></div>
                <div id="step2"></div>
                <div id="step3"></div>
              </div>
              <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil h5_no_pad">
                <h2 className="smartfeedersubscription-title">
                  {stepName == 'step3' ? (
                    <FormattedMessage id="smartFeederSubscription.finaliseYourOrder" />
                  ) : (
                    <FormattedMessage id="smartFeederSubscription.selectYourProduct" />
                  )}
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
                          foodFllType={this.state.foodFllType}
                          goodsDetailTab={goodsDetailTab}
                          toOtherStep={this.toOtherStep}
                          details={this.state.details}
                          // goodsNo = {this.getGoodsNo()}
                        />
                      );
                      break;
                    case 'step3':
                      stepCom = (
                        <Step3
                          handleCheckout={this.handleCheckout}
                          history={this.props.history}
                          specList={this.state.specList}
                          getStep3Choosed={this.getStep3Choosed}
                          details={this.state.details}
                          toOtherStep={this.toOtherStep}
                          isLogin={this.isLogin}
                          hanldeAddToCart={this.hanldeAddToCart}
                        />
                      );
                      break;
                  }
                  return stepCom;
                })()}
                <ErrMsgForCheckoutPanel checkOutErrMsg={checkOutErrMsg} />
              </section>
              <div
                className="rc-border-bottom rc-border-colour--brand4"
                style={{
                  borderBottomWidth: '4px',
                  position: 'relative',
                  bottom: '-1.5rem'
                }}
              />
              <FAQ planId={this.state.planId} />
            </React.Fragment>
          ) : (
            <div className="text-center rc-padding-x--sm rc-padding-x--md--mobile">
              <div
                className="red rc-margin-y--lg"
                style={{ fontSize: '2.5rem' }}
              >
                Nous sommes désolé mais cette offre n'est actuellement plus
                disponible
              </div>
              <p>
                Vous pouvez contacter nos experts pour trouver la meilleure
                nourriture pour votre animal
              </p>
            </div>
          )}
          <Help isEmailUnderLine={true} />
          <AddCartSuccessMobile />
        </main>
        <Footer />
      </div>
    );
  }
}

export default SmartFeederSubscription;
