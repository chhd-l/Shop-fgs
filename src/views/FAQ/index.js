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
                      <h1
                        // className="text-center"
                        className="rc-alpha inherit-fontsize"
                      >
                        <FormattedMessage id="faq.frequentQuestions" />
                      </h1>
                      <p
                        className="text-center"
                        style={{ marginBottom: '4rem', fontSize: 'large' }}
                      >
                        <FormattedMessage
                          id="faq.title"
                          values={{
                            val1: (
                              <Link
                                rel="nofollow"
                                className="rc-styled-link ui-cursor-pointer faq_rc_styled_link"
                                target="_blank"
                                to="/help"
                                // rel="nofollow"
                              >
                                <ins>
                                  <FormattedMessage id="here2" />
                                </ins>
                                {Boolean(
                                  window.__.env
                                    .REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                                ) && (
                                  <span className="warning_blank">
                                    <FormattedMessage id="opensANewWindow" />
                                  </span>
                                )}
                              </Link>
                            )
                          }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.state.loading ? (
              <div className="pb-4">
                <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
              </div>
            ) : (
              this.state.dataFAQ.map((pitem, index) => (
                <>
                  <div
                    className="rc-bg-colour--brand3 rc-margin-y--sm"
                    style={{ marginTop: '3rem' }}
                    key={'p-' + index}
                  >
                    <h2
                      name={`catogery-${index}`}
                      id={`catogery-${index}`}
                      className="text-center"
                    >
                      {pitem.faqType}
                    </h2>
                  </div>
                  <dl
                    data-toggle-group=""
                    data-toggle-effect="rc-expand--vertical"
                    className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
                    // className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
                  >
                    <div className="experience-region experience-questions">
                      {pitem.storeFaqVo.map((item) => (
                        <div
                          key={item.id}
                          className={`rc-list__accordion-item test-color
                        ${
                          this.state.showCur === item.id
                            ? 'showItem'
                            : 'hiddenItem'
                        }`}
                        >
                          <div
                            className="rc-list__header"
                            onClick={this.handleSelect.bind(this, item.id)}
                            style={{
                              display: 'flex',
                              padding: '1rem 2.5rem 1rem 0.5rem',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.question
                              }}
                            />

                            {/*<span*/}
                            {/*  className={`rc-vertical-align icon-change ${*/}
                            {/*    this.state.showCur === item.id*/}
                            {/*      ? 'rc-icon rc-up rc-brand1'*/}
                            {/*      : 'rc-icon rc-down rc-iconography'*/}
                            {/*  }`}*/}
                            {/*  style={{ right: '1rem', height: '28px' }}*/}
                            {/*></span>*/}
                            {this.state.showCur === item.id ? (
                              <span
                                className={`rc-vertical-align h4 icon iconfont`}
                                style={{ right: '1rem', height: '28px' }}
                              >
                                &#xe604;
                              </span>
                            ) : (
                              <span
                                className={` rc-vertical-align h4 icon iconfont`}
                                style={{ right: '1rem', height: '28px' }}
                              >
                                &#xe60f;
                              </span>
                            )}
                          </div>
                          <div className={`rc-list__content `}>
                            <p
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
                </>
              ))
            )}
          </div>
          {/* 暂时别删 */}
          {/* {
            this.state.loading
              ? (
                <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg">
                    <div className="pb-4">
                    <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
                  </div>
                </div>
              ) : (
                <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg" style={{marginBottom: '100px'}}>
                  {
                    this.state.dataFAQ.map((pitem,index) => {
                      return (
                        <div id={`catogery-${index}`}>
                          <div className="rc-bg-colour--brand3">
                            <div className="rc-padding--sm rc-padding-left--none">
                              <div className="rc-padding-y--md rc-md-down"></div>
                              <div className="rc-one-column">
                                <div className="rc-column rc-padding-left--none">
                                  <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">
                                    <h1 style={{ textAlign: "center" }}>{pitem.faqType}</h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {
                            pitem.storeFaqVo.map((item, idx) => {
                              return (
                                <dl data-toggle-group data-toggle-effect="rc-expand--vertical" style={{marginBottom:'.625rem'}}>
                                  <div className="rc-list__accordion-item" style={{borderBottom:0}}>
                                    <dt>
                                      <button className="rc-list__header FAQ_header" id={`heading-${item.id}`} data-toggle={`content-${item.id}`} data-js-open="false" data-depth="1" aria-haspopup="true" aria-selected="false" dangerouslySetInnerHTML={{ __html: item.question }}></button>
                                    </dt>
                                    <dd className="rc-list__content rc-expand--vertical" id={`content-${item.id}`} aria-labelledby={`heading-${item.id}`} aria-expanded="false" aria-hidden="true" style={{ maxHeight: 0 }}>
                                      <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                                    </dd>
                                  </div>
                                </dl>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }
                </div>
              )
          } */}
          <Footer />
        </main>
      </div>
    );
  }
}

export default FAQ;
