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
const productObj = {
  img: 'http://iph.href.lu/200x200',
  title: 'title',
  detail: 'detail'
};
const isMobile = getDeviceType() !== 'PC';
const productList = Array(6).fill(productObj);
const Step1Pc = (props) => {
  return (
    <>
      <div className="rc-card-grid rc-match-heights">
        {props.productList.map((item) => (
          <div className="rc-grid">
            <article className="rc-card rc-card--a">
              <picture className="rc-card__image">
                <img src={item.img} alt="A Dachshund jumping" />
              </picture>
              <div className="rc-card__body">
                <header>
                  <h1 className="rc-card__title">{item.title}</h1>
                </header>
                <p>{item.detail}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
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
      spaceBetween: 30
    });
  }
  render() {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">Slide 1</div>
          <div className="swiper-slide">Slide 2</div>
          <div className="swiper-slide">Slide 3</div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    );
  }
}
const Step1 = (props) => {
  return (
    <>
      {isMobile ? (
        <Step1H5
          productList={props.productList}
          toOtherStep={props.toOtherStep}
        />
      ) : (
        <Step1Pc
          productList={props.productList}
          toOtherStep={props.toOtherStep}
        />
      )}
      <div className="rc-layout-container rc-two-column  rc-text--center">
        <div className="rc-column">
          <button
            className="rc-btn rc-btn--two"
            onClick={() => {
              props.toOtherStep('step2');
            }}
          >
            view product details
          </button>
        </div>
        <div className="rc-column">
          <button
            className="rc-btn rc-btn--one"
            onClick={() => {
              props.toOtherStep('step3');
            }}
          >
            choose product
          </button>
        </div>
      </div>
      {/* <div className="rc-text--center"></div> */}
    </>
  );
};
const Step2 = (props) => {
  return (
    <>
      <div className="rc-layout-container rc-five-column">
        <div className="rc-column" style={{ background: 'red' }}>
          <h1> 1 / 2 </h1>
        </div>
        <div className="rc-column rc-double-width">
          <h1> 1 / 2 </h1>
        </div>
      </div>
      <Details goodsDetailTab={props.goodsDetailTab} />
      <div className="rc-text--center">
        <button
          className="rc-btn rc-btn--sm rc-btn--two"
          onClick={() => {
            props.toOtherStep('step1');
          }}
        >
          select another product
        </button>
        <button
          className="rc-btn rc-btn--sm rc-btn--one"
          onClick={() => {
            props.toOtherStep('step3');
          }}
        >
          choose product
        </button>
      </div>
    </>
  );
};
const Step3 = () => {
  const computedList = [{ name: 'test', value: 1 }];
  return (
    <>
      <div className="rc-layout-container rc-three-column">
        <div className="rc-column">
          <img src="http://iph.href.lu/200x200" />
          <h6>title</h6>
          <p>description</p>
        </div>
        <div className="rc-column">
          <img src="http://iph.href.lu/200x200" />
          <h6>jack russel terrier</h6>
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
                  <div className="text-left ml-1">test</div>
                  <div
                    className={`rc-swatch__item`}
                    // key={i2}
                    // onClick={() =>
                    //   this.handleChooseSize(sdItem, pitem, index)
                    // }
                  >
                    <span>
                      teste
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
                <div className="text-left ml-1">test</div>
                <div className="rc-quantity d-flex">
                  <span
                    className=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
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
                    className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                    data-quantity-error-msg="Вы не можете заказать больше 10"
                    // onClick={() => this.addQuantity(pitem)}
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <p>select your frequency</p>
          <div>
            <Selection
              customContainerStyle={{
                display: 'inline-block',
                textAlign: 'right'
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
        <div className="rc-column">
          <h5>summary</h5>
          <div className="d-flex">
            <div style={{ width: '70%' }}>
              <h6>title</h6>
              <div>smart feeder subscription</div>
            </div>
            <div>price</div>
          </div>
          <div className="d-flex">
            <div style={{ width: '70%' }}>
              <h6>title</h6>
              <div>smart feeder subscription</div>
            </div>
            <div></div>
          </div>
          <div className="d-flex">
            <div style={{ width: '70%' }}>shipping</div>
            <div>free</div>
          </div>
          <div className="d-flex">
            <div style={{ width: '70%' }}>shipping</div>
            <div>free</div>
          </div>
        </div>
      </div>
    </>
  );
};
class SmartFeederSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerHide: false,
      stepName: 'step1'
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
          <div id="step1">dsdsdsdsdsds</div>
          <div id="step2"></div>
          <div id="step3"></div>
          <section className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobil">
            <h2 className="smartfeedersubscription-title">
              Select your product
            </h2>
            {(() => {
              switch (stepName) {
                case 'step1':
                  stepCom = (
                    <Step1
                      productList={productList}
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
                  stepCom = <Step3 />;
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
