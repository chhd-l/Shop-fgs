import React from 'react';
// import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { Helmet } from 'react-helmet';
import HelpComponentsNew from '../../components/HelpComponentsNew/HelpComponents';
import './index.css';
import LazyLoad from 'react-lazyload';
import DetailsDisplay from './DetailsDisplay';
import ProductSpecialities from './ProductSpecialities';
import Banner from './components/Banner';
import productList from './productList.json';
console.info('productList', productList);
const pageLink = window.location.href;

class PreciseRecommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {},
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      }
    };
  }
  componentDidMount = () => {
    const id = 'IND1001';
    let productInfo = Object.assign(
      {},
      this.state.productInfo,
      productList[id]
    );
    console.info(productList[id]);
    this.setState({
      productInfo
    });
  };

  render() {
    const ru = window.__.env.REACT_APP_COUNTRY == 'ru';
    const tr = window.__.env.REACT_APP_COUNTRY == 'tr';
    const firstText = {
      content: <FormattedMessage id="preciseNutrition.Top.title" />
    };
    const list = {
      phone: {
        title: <FormattedMessage id="ClubLP.Help.call.title" />,
        desc: <FormattedMessage id="preciseNutrition.call.content" />,
        btnText: <FormattedMessage id="preciseNutrition.call.number" />
      },
      email: {
        title: <FormattedMessage id="ClubLP.Help.email.title" />,
        desc: <FormattedMessage id="ClubLP.Help.email.content" />,
        btnText: <FormattedMessage id="ClubLP.Help.email.address" />
      },
      faq: {
        desc: (
          <FormattedMessage
            id="preciseNutrition.faq.content"
            values={{
              val: ru ? (
                <DistributeHubLinkOrATag
                  href={'/about-us/faqs'}
                  ariaLabel="Links to faq"
                >
                  <a
                    style={{
                      textDecoration: 'underline',
                      color: '#E2001A'
                    }}
                  >
                    часто задаваемые вопросы:
                  </a>
                </DistributeHubLinkOrATag>
              ) : tr ? (
                <DistributeHubLinkOrATag
                  href={'/about-us/faqs'}
                  ariaLabel="Links to faq"
                >
                  <a
                    style={{
                      textDecoration: 'underline',
                      color: '#E2001A'
                    }}
                  >
                    Sıkça Sorulan Sorular
                  </a>
                </DistributeHubLinkOrATag>
              ) : (
                <DistributeHubLinkOrATag
                  href={'/about-us/faqs'}
                  ariaLabel="Links to faq"
                >
                  <a
                    style={{
                      textDecoration: 'underline',
                      color: '#E2001A'
                    }}
                  >
                    FAQ pour
                  </a>
                </DistributeHubLinkOrATag>
              )
            }}
          />
        )
      }
    };
    const lastText = {
      title: <FormattedMessage id="preciseNutrition.Address.title" />,
      fline: <FormattedMessage id="preciseNutrition.Address.firstLine" />,
      sline: <FormattedMessage id="preciseNutrition.Address.secondLine" />,
      tline: <FormattedMessage id="preciseNutrition.Address.thirdLine" />
    };
    const { history, match, location } = this.props;

    const event = {
      page: {
        type: 'Homepage',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };

    return (
      <div>
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <GoogleTagManager
          additionalEvents={event}
          searchEvent={this.state.searchEvent}
        />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          match={match}
          location={location}
          history={history}
          sendGAHeaderSearch={this.sendGAHeaderSearch}
        />
        <main className={'rc-content--fixed-header'}>
          <Banner productInfo={this.state.productInfo} />
          <div
            className="rc-border-bottom rc-border-colour--brand4"
            style={{ borderBottomWidth: '8px' }}
          ></div>
          <ProductSpecialities />
          <DetailsDisplay />

          <div style={{ height: '5vh', backgroundColor: '#eee' }}></div>
          <div style={{ backgroundColor: '#eee' }}>
            <div
              className="rc-max-width--lg rc-padding-x--sm rc-padding-x--md--mobile rc-margin-top--sm rc-margin-top--lg--mobile three-column-content-block"
              style={{ marginTop: '0' }}
            >
              <div
                className="rc-bg-colour--brand3"
                // id="benefits-box"
                style={{ padding: '1px 0' }}
              >
                <div className="rc-full-width">
                  <div>
                    <div className="experience-component experience-assets-importContentAsset">
                      <div className="rc-max-width--xl rc-padding-x--lg rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                        <div className="content-asset">
                          <div
                            className="rc-column row rc-max-width--lg rc-match-heights rc-padding-y--sm flexwrapJoin"
                            style={{
                              margin: '0',
                              padding: '0',
                              display: 'flex',
                              flexWrap: 'wrap'
                            }}
                          >
                            <div className="col-12 col-md-6 order-1 order-md-0  orderJoin1">
                              <div className="rc-column rc-padding--none">
                                <h4
                                  className="rc-beta text-left"
                                  style={{ fontWeight: '550' }}
                                >
                                  <FormattedMessage id="preciseNutrition.Below.title" />
                                </h4>
                                <div className="text-left pr-5">
                                  <FormattedMessage id="preciseNutrition.Below.content" />
                                </div>
                                <div className="mb-3">
                                  <FormattedMessage id="preciseNutrition.Below.list" />
                                </div>
                                <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                                  <li className="rc-list__item pl-0 flex">
                                    <div>
                                      <em className="bingo rc-margin-right--xs mr-3"></em>
                                    </div>
                                    <div className="font-weight-normal">
                                      <FormattedMessage id="preciseNutrition.Below.list1" />
                                    </div>
                                  </li>
                                  <li className="rc-list__item pl-0 flex">
                                    <div>
                                      <em className="bingo rc-margin-right--xs mr-3"></em>
                                    </div>
                                    <div className="font-weight-normal">
                                      <FormattedMessage id="preciseNutrition.Below.list2" />
                                    </div>
                                  </li>
                                  <li className="rc-list__item pl-0 flex">
                                    <div>
                                      <em className="bingo rc-margin-right--xs mr-3"></em>
                                    </div>
                                    <div className="font-weight-normal">
                                      <FormattedMessage id="preciseNutrition.Below.list3" />
                                    </div>
                                  </li>
                                  <li className="rc-list__item pl-0 flex">
                                    <div>
                                      <em className="bingo rc-margin-right--xs mr-3"></em>
                                    </div>
                                    <div className="font-weight-normal">
                                      <FormattedMessage id="preciseNutrition.Below.list4" />
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-12 col-md-6 order-1 order-md-0  orderJoin1">
                              <div className="rc-column rc-padding--none">
                                <LazyLoad>
                                  <img
                                    className="w-100"
                                    src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/Group%206-1.png`}
                                  />
                                </LazyLoad>
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
          <div style={{ height: '5vh', backgroundColor: '#eee' }}></div>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-layouts-cardcarousel">
                  <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
                    <div className="rc-max-width--lg rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                      <div className="rc-padding-x--xl">
                        <div>
                          <h4
                            className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile"
                            style={{ fontWeight: '550' }}
                          >
                            <FormattedMessage id="preciseNutrition.commitment.title" />
                          </h4>
                        </div>
                        <div className="d-flex justify-content-center bottom-content__icon-list text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                          <div className="rc-card--product mx-3">
                            <LazyLoad>
                              <img
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/Image%201-1.png`}
                              />
                            </LazyLoad>
                          </div>
                          <div className="rc-card--product mx-3">
                            <LazyLoad>
                              <img
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/Image%201-2.png`}
                              />
                            </LazyLoad>
                          </div>
                          <div className="rc-card--product mx-3">
                            <LazyLoad>
                              <img
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/Image%201-3.png`}
                              />
                            </LazyLoad>
                          </div>
                          <div className="rc-card--product mx-3">
                            <LazyLoad>
                              <img
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/Image%201-4.png`}
                              />
                            </LazyLoad>
                          </div>
                        </div>
                        <p>
                          <span>
                            <FormattedMessage id="preciseNutrition.commitment.content1" />
                          </span>
                        </p>
                        <p>
                          <FormattedMessage id="preciseNutrition.commitment.content2" />
                        </p>
                        <p>
                          <FormattedMessage id="preciseNutrition.commitment.content3" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rc-border-bottom rc-border-colour--brand4"
            style={{ borderBottomWidth: '8px' }}
          ></div>

          <HelpComponentsNew
            firstText={firstText}
            list={list}
            lastText={lastText}
          />
          <Footer />
        </main>
      </div>
    );
  }
}

export default PreciseRecommendation;
