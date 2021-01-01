import React, { Component } from 'react';
import Help from './modules/Help';
// import FAQ from './modules/FAQ';
import Details from './modules/Details';
import StaticPage from './modules/StaticPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './index.less';
import goodsDetailTab from './modules/goodsDetailTab.json';
const productObj = {
  img: 'http://iph.href.lu/200x200',
  title: 'title',
  detail: 'detail'
};
const productList = Array(6).fill(productObj);
const Step1 = (props) => {
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
      <div className="rc-text--center">
        <button
          class="rc-btn rc-btn--sm rc-btn--two"
          onClick={() => {
            props.toOtherStep('step2');
          }}
        >
          view product details
        </button>
        <button
          class="rc-btn rc-btn--sm rc-btn--one"
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
          class="rc-btn rc-btn--sm rc-btn--two"
          onClick={() => {
            props.toOtherStep('step1');
          }}
        >
          select another product
        </button>
        <button
          class="rc-btn rc-btn--sm rc-btn--one"
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
  return <div>test</div>;
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
