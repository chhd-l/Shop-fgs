import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { getFaq } from '../../api/faq';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import LazyLoad from 'react-lazyload';
import BreadCrumbs from '../../components/BreadCrumbs';
import { Link } from 'react-router-dom';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';

import './index.less';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFAQ: [],
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      // 当前展开的FAQ
      showCur: -1,
      loading: true
    };
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig({
      pageName: 'FAQ page'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    window.scrollTo({ top: 0 });
    getFaq({
      language: process.env.REACT_APP_LANG,
      storeId: process.env.REACT_APP_STOREID
    })
      .then((res) => {
        this.setState(
          {
            dataFAQ: res.context,
            loading: false
          },
          () => {
            const widget = document.querySelector(
              `#${this.props.match.params.catogery}`
            );
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
  handleSelect(index) {
    if (index === this.state.showCur) {
      this.setState({
        showCur: -1
      });
    } else {
      this.setState({
        showCur: index
      });
    }
  }

  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: 'Brand',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
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
                <div className="rc-one-column">
                  <div>
                    <div className="rc-max-width--md text-center rc-margin-y--md">
                      <h1
                        className="text-center"
                        className="rc-alpha inherit-fontsize"
                      >
                        <FormattedMessage id="faq.frequentQuestions" />
                      </h1>
                      <p className="text-center" style={{marginBottom: '4rem'}}>
                        <FormattedMessage
                          id="faq.title"
                          values={{
                            val1: (
                              <Link
                                rel="nofollow"
                                className="rc-styled-link ui-cursor-pointer"
                                target="_blank"
                                to="/help"
                                rel="nofollow"
                              >
                                <FormattedMessage id="here" />
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
                  <div className="rc-bg-colour--brand3 rc-margin-y--sm"
                  style={{marginTop: '3rem'}}
                  key={'p-' + index}>
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
                    className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
                    // className="rc-max-width--xl rc-padding-x--sm rc-padding-x--xl--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
                  >
                    <div className="experience-region experience-questions">
                      {pitem.storeFaqVo.map((item, index2) => (
                              <div
                                key={item.id}
                                className={`rc-list__accordion-item test-color
                        ${this.state.showCur === index2 ? 'showItem' : 'hiddenItem'}`}
                              >
                                <div
                                  className="rc-list__header"
                                  onClick={() => this.handleSelect(index2)}
                                  style={{
                                    display: 'flex',
                                    padding: '1rem 2.5rem 1rem 0.5rem',
                                    justifyContent: 'space-between'
                                  }}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{ __html: item.question }}
                                  ></div>

                                  <span
                                    className={`rc-vertical-align icon-change ${this.state.showCur === index2
                                      ? 'rc-icon rc-up rc-brand1'
                                      : 'rc-icon rc-down rc-iconography'
                                      }`}
                                      style={{right: '1rem',height: '28px'}}
                                  ></span>
                                </div>
                                <div className={`rc-list__content `}>
                                  <p
                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                  ></p>
                                  <LazyLoad>
                                    <img src={item.imgUl} alt="" />
                                  </LazyLoad>
                                </div>
                              </div>
                      ))}
                    </div>
                  </dl>
                </>
              ))
            )}
          </div>
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
                                <dl data-toggle-group data-toggle-effect="rc-expand--vertical" style={{marginBottom:'10px'}}>
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
        </main>
        <Footer />
      </div>
    );
  }
}

export default FAQ;
