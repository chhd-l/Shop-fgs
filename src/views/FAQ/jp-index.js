import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { getFaq } from '@/api/staticPageApi';
import { FormattedMessage } from 'react-intl-phraseapp';
import Skeleton from 'react-skeleton-loader';
import LazyLoad from 'react-lazyload';
import BreadCrumbs from '@/components/BreadCrumbs';
import { Link } from 'react-router-dom';
import { seoHoc } from '@/framework/common';
import { funcUrl } from '@/lib/url-utils';
import './index.less';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;

@seoHoc('FAQ page')
class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFAQ: [],
      // 当前展开的FAQ
      showCur: -1,
      loading: true
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillUnmount() {}
  componentDidMount() {
    window.scrollTo({ top: 0 });
    getFaq()
      .then((res) => {
        this.setState(
          {
            dataFAQ: res.context,
            loading: false
          },
          () => {
            const catogeryType = funcUrl({ name: 'type' });
            const { state } = this.props.history.location;
            const widget =
              document.querySelector(`#${state?.catogery}`) ||
              document.querySelector(`#${catogeryType}`);
            if (widget) {
              setTimeout(() => {
                window.scrollTo({ top: widget.offsetTop - 90 });
              });
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  handleSelect(id) {
    // debugger;
    if (id === this.state.showCur) {
      this.setState({
        showCur: -1
      });
    } else {
      this.setState({
        showCur: id
      });
    }
  }
  scrollToAnchor(anchorName) {
    console.log('anchorName', anchorName);
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        console.log('anchorElement', anchorElement);
        // debugger;
        anchorElement.scrollIntoViewIfNeeded();
        // anchorElement.scrollIntoView(false);
        this.handleSelect(anchorName - 0);
        // anchorElement.offsetTop = 433 + 'px';
      }
    }
  }

  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: 'Brand',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          {/* <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"> */}
          <div
          // className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
          >
            <div className="rc-bg-colour--brand3">
              <div>
                <div className="rc-padding-y--md rc-md-down" />
                <div className="rc-one-column rc-padding-x--md--mobile">
                  <div>
                    <div className="rc-max-width--md text-center rc-margin-y--md">
                      <h1 className="text-center rc-alpha md:text-30 md:leading-10 font-medium">
                        <FormattedMessage id="faq.frequentQuestions" />
                      </h1>
                      <p
                        className="rc-alpha text-center md:text-26 md:leading-56"
                        style={{ marginBottom: '4rem', fontSize: 'large' }}
                      >
                        <FormattedMessage id="faq.title" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-920 m-auto">
              <h1 className="font-medium md:mb-4 md:text-26 md:leading-26 text-primary-gray">
                よくあるお問合せ
              </h1>
              <p className="text-primary-gray md:text-18 md:leading-26">
                配送について <br />
                お支払について <br />
                返品・交換について <br />
                ポイントプログラムについて <br />
                定期購入について <br />
              </p>
            </div>
            <div className="md:w-920 m-auto md:mt-80">
              <h1 className="font-medium md:mb-6 md:text-26 md:leading-26 text-primary-gray">
                ショッピングに関するご利用ガイド
              </h1>
              <p className="text-primary-gray font-medium md:text-18 md:leading-26">
                初めてショッピングされる方へ
                <br />
                マイ ロイヤルカナンのショッピングについて
              </p>
            </div>
            {this.state.loading ? (
              <div className="pb-4">
                <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
              </div>
            ) : (
              this.state.dataFAQ.map((pitem, index) => (
                <div className="md:w-920 m-auto">
                  <div
                    className="rc-bg-colour--brand3 rc-margin-y--sm"
                    style={{ marginTop: '3rem' }}
                    key={'p-' + index}
                  >
                    <h2
                      name={`catogery-${index}`}
                      id={`catogery-${index}`}
                      className="text-primary-gray font-medium md:mt-20 md:mb-10 md:text-20 md:leading-26"
                    >
                      {pitem.faqType}
                    </h2>
                  </div>
                  <dl
                    data-toggle-group=""
                    data-toggle-effect="rc-expand--vertical"
                    className=""
                  >
                    <div className="experience-region experience-questions">
                      {pitem.storeFaqVo.map((item) => (
                        <div
                          key={item.id}
                          id={item.id}
                          className={`rc-list__accordion-item test-color
                        ${
                          this.state.showCur === item.id
                            ? 'showItem'
                            : 'hiddenItem'
                        }`}
                        >
                          <div
                            className="rc-list__header"
                            // id={item.id}
                            onClick={this.handleSelect.bind(this, item.id)}
                            style={{
                              display: 'flex',
                              padding: '2rem 2.5rem 2rem 0.5rem',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div
                              className={`font-medium md:text-18 md:leading-60 ${
                                this.state.showCur === item.id
                                  ? 'text-primary'
                                  : 'text-primary-gray'
                              }`}
                              dangerouslySetInnerHTML={{
                                __html: item.question
                              }}
                            />
                            {this.state.showCur === item.id ? (
                              <span
                                className={`text-primary-gray rc-vertical-align h4 icon iconfont`}
                                style={{ right: '1rem', height: '28px' }}
                              >
                                &#xe604;
                              </span>
                            ) : (
                              <span
                                className={`text-primary-gray rc-vertical-align h4 icon iconfont`}
                                style={{ right: '1rem', height: '28px' }}
                              >
                                &#xe60f;
                              </span>
                            )}
                          </div>
                          <div className={`rc-list__content `}>
                            <p
                              className="text-primary-gray md:text-18 md:leading-34 md:mb-10"
                              dangerouslySetInnerHTML={{ __html: item.answer }}
                            />
                            {item.imgUl ? (
                              <LazyLoad>
                                <img src={item.imgUl} alt="storeFaq image" />
                              </LazyLoad>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </dl>
                </div>
              ))
            )}
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default FAQ;
