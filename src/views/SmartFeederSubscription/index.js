import React, { Component } from 'react';
import Help from './modules/Help';
// import FAQ from './modules/FAQ';
import Details from './modules/Details';
import StaticPage from './modules/StaticPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './index.less';
import Swiper from 'swiper';
import Selection from '@/components/Selection';
import 'swiper/swiper-bundle.min.css';
import { getDeviceType } from '@/utils/utils';
import goodsDetailTab from './modules/goodsDetailTab.json';
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
  const computedList = [{ name: 'test', value: 1 },{ name: 'test1', value: 11 },{ name: 'test11', value: 111 }];
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
          <div style={{ padding: '0 3rem' }}>
            <img src={foodDispenserPic} />
            <h6>PETKIT FRESH ELEMENT Mini</h6>
            <p>x1 Delivered at the first shipment</p>
          </div>
          <span className="rc-icon rc-plus--xs rc-iconography rc-quantity__btn side_icon"></span>
        </div>
        <div className="rc-column wrap_item food_info">
          <div style={{ padding: '0 2.2rem' }}>
            <img src={foodPic2} />
            <h6 className="rc-hero__section--text">Jack Russel Terrier</h6>
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
                      style={{transform: 'scale(0.8)' }}
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
                      style={{transform: 'scale(0.8)' }}
                      // onClick={() => this.addQuantity(pitem)}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <p className="frequency">select your frequency</p>
            <div>
              <Selection
                customContainerStyle={{
                }}
                // selectedItemChange={(data) =>
                //   this.handleSelectedItemChange(pitem, data)
                // }
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
                <button className="rc-btn rc-btn--two wid100">
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
      <div className="rc_md_down" style={{background:'#f7f7f7',padding: '1rem'}}>
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
class SmartFeederSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerHide: false,
      stepName: 'step3',
      isDisabled: true,
      productList: [...productList]
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
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
      isDisabled
    });
    this.chooseProduct = item;
  };
  handleScroll = () => {
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    console.info('scrollTop', scrollTop);
    if (scrollTop > 120) {
      this.setState({ headerHide: true });
    } else {
      this.setState({ headerHide: false });
    }
  };
  render() {
    const { location, history, match } = this.props;
    const { headerHide, stepName } = this.state;
    let stepCom = null;
    console.info('this.productList', this.state.productList);

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
                  stepCom = <Step3 toOtherStep={this.toOtherStep} />;
                  break;
              }
              return stepCom;
            })()}
          </section>
          {/* <FAQ /> */}
          <Help />
        </main>
        <Footer />
      </div>
    );
  }
}

export default SmartFeederSubscription;
