import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import Help from './Fr/help';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import autoship from './images/autoship.png';
import icon1 from './images/icon1.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import icon4 from './images/icon4.png';
import wof from './images/wof.png';
import { inject, observer } from 'mobx-react';
import { setSeoConfig } from '@/utils/utils';
import './index.css';
import imagecat from '../PackmixfeedingwetDry/images/cat-autoship.png';
import imagedog from '../PackmixfeedingwetDry/images/dog-autoship.png';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';
const pageLink = window.location.href
@inject('configStore')
@observer
@injectIntl
class SubscriptionLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      }
    };
  }
  componentDidMount() {
    setSeoConfig({
      goodsId: '',
      categoryId: '',
      pageName: 'Subscription Page'
    }).then(res => {
      this.setState({seoConfig: res})
    });
  }
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: '',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      }
    };
    
    return (
      <div className="recommendation">
        <Helmet>
        <link rel="canonical" href={pageLink}/>
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription}/>
          <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
        </Helmet>
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
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-pawListBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className="rc-max-width--lg rc-padding-y--sm">
                      <div className="rc-max-width--md text-center rc-padding-x--sm">
                        <h2 className="rc-beta text-center">
                          <FormattedMessage id="subscription.title" />
                        </h2>
                        <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--md--mobile">
                          <h2>
                            <FormattedMessage id="subscription.subTitle" />
                          </h2>
                        </div>
                        <div className="d-block d-md-none rc-text--center">
                          <Link to="/cats">
                            <button className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs">
                              Voir les formules pour chat
                            </button>
                          </Link>
                          <Link to="/dogs">
                            <button className="rc-btn rc-btn--one rc-margin-bottom--xs">
                              Voir les formules pour chien
                            </button>
                          </Link>
                        </div>
                      </div>

                      <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                        <div className="rc-column">
                          <div className="rc-padding-y--lg--mobile rc-full-width">
                            <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                <FormattedMessage id="subscription.list1" />
                              </li>
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                <FormattedMessage id="subscription.list2" />
                              </li>
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                <FormattedMessage id="subscription.list3" />
                              </li>
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                <FormattedMessage id="subscription.list4" />
                              </li>
                            </ul>
                            <div className="d-none d-md-block rc-btn-group m-0 rc-column rc-padding-x--none">
                              <Link to="/cats">
                                <button className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs">
                                  <FormattedMessage id="subscription.list.btn1" />
                                </button>
                              </Link>
                              <Link to="/dogs">
                                <button className="rc-btn rc-btn--one rc-margin-bottom--xs">
                                  <FormattedMessage id="subscription.list.btn2" />
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="rc-column">
                        <LazyLoad>
                          <img
                            alt="Avec l'Abonnement, ils auront toujours ce dont ils ont besoin"
                            className="w-100 lazyloaded"
                            src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship_dog.png`}
                          ></img>
                          </LazyLoad>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-twoColImgText">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className="rc-margin-top--md rc-margin-top--none--mobile rc-padding-x--lg--mobile">
                      <h2 className="rc-beta rc-margin--none text-center rc-padding-x--lg--mobile">
                        Comment cela fonctionne-t-il ?
                      </h2>
                    </div>
                    <div className="row rc-content-v-middle text-center rc-padding-top--md rc-margin-x--none">
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                        <LazyLoad>
                          <img
                            className="m-auto w-auto lazyloaded"
                            alt="image-one"
                            title="image-one"
                            src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon1@1x.png`}
                          ></img>
                        </LazyLoad>
                        </div>

                        <h7>
                          <FormattedMessage id="subscription.ad.list1" values={{
                            val1:(<br/>),val2:(<strong>répondant aux besoins de votre animal</strong>),val3:(<br/>)
                          }}/>
                        </h7>

                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                        <LazyLoad>
                          <img
                            className="m-auto w-auto lazyloaded"
                            src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon2.png`}
                            alt="image two"
                            title="image two"
                          ></img>
                          </LazyLoad>
                        </div>
                        <h7>
                          <FormattedMessage id="subscription.ad.list2" values={{
                            val1:(<strong>l'expédition automatique</strong>)
                          }}/>
                        </h7>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <LazyLoad>
                          <img
                            className="m-auto w-auto lazyloaded"
                            src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon3.png`}
                            alt="image three"
                            title="image three"
                          ></img>
                          </LazyLoad>
                        </div>

                        <h7>
                          <FormattedMessage id="subscription.ad.list3" values={{
                            val1:(<strong>Recevez votre produit automatiquement</strong>)
                          }}/>
                        </h7>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <img
                            className="m-auto w-auto lazyloaded"
                            alt="image four"
                            src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon4.png`}
                            title="image four"
                          ></img>
                        </div>
                        <h7>
                          <FormattedMessage id="subscription.ad.list4" values={{
                            val1:(<strong>tout moment</strong>)
                          }}/>
                        </h7>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-categoryCtaBlock">
                  <div className="rc-bg-colour--brand4">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                      <div className="row rc-max-width--lg rc-match-heights rc-padding-y--sm">
                        <div className="col-12 col-md-4 order-1 order-md-0">
                          <div className="rc-column rc-padding--none">
                            <LazyLoad>
                            <img className="mx-auto lazyloaded"
                                 src={imagecat}>
                            </img>
                            </LazyLoad>
                          </div>
                          <div className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <Link
                              className="rc-btn rc-btn--sm rc-btn--two w-50"
                              to="/cats"
                            >
                              <FormattedMessage id="account.cat" />
                            </Link>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 m-auto rc-padding-x--sm rc-padding-x--lg--mobile rc-padding-top--lg--mobile order-0 order-md-1">
                          <div className="rc-gamma rc-text--center rc-margin-bottom--xs">
                            <FormattedMessage id="subscription.banner.title" />
                          </div>
                          <div className="rc-intro inherit-fontsize rc-text--center rc-padding-x--sm rc-margin-bottom--sm">
                            <p>
                              <FormattedMessage id="subscription.banner.subTitle" />
                            </p>
                          </div>
                          <div className="rc-btn-group rc-margin--none rc-padding-x--xs d-none d-md-flex">
                            <Link
                              to="/product-finder"
                              className="rc-btn rc-btn--one"
                            >
                              <FormattedMessage id="header.toBegin" />
                            </Link>
                            {/* <Link className="rc-btn rc-btn--sm rc-btn--two"
                               to="/cats"><FormattedMessage id="account.cat" /></Link>
                            <Link className="rc-btn rc-btn--sm rc-btn--two"
                               to="/dogs"><FormattedMessage id="account.dog" /></Link> */}
                          </div>
                        </div>
                        <div className="col-12 col-md-4 order-2 order-md-2">
                          <div className="rc-column rc-padding--none">
                            <LazyLoad>
                            <img className="mx-auto lazyloaded"
                                 src={imagedog}>
                            </img>
                            </LazyLoad>
                          </div>
                          <div className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <Link
                              className="rc-btn rc-btn--sm rc-btn--two w-50"
                              to="/dogs"
                            >
                              <FormattedMessage id="account.dog" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="help-page" style={{ marginBottom: '1rem' }}>
            <section style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                <FormattedMessage id="subscription.help.title" />

              </h2>
              <p>
                <FormattedMessage id="subscription.help.subTitle" />
              </p>
            </section>
            {process.env.REACT_APP_LANG == 'fr' ? (
              <Help />
            ) : (
              <div className="experience-region experience-main">
                <div className="experience-component experience-layouts-1column">
                  <div className="row rc-margin-x--none">
                    <div className="rc-full-width">
                      <div className="experience-component experience-assets-contactUsBlock">
                        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                          <div className="rc-layout-container rc-two-column rc-margin-y--sm text-center text-md-left rc-margin-top--lg--mobile"></div>
                          <div className="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center text-md-left">
                            <div className="rc-column rc-double-width rc-padding--none">
                              <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <b style={{ color: '#00BCA3' }}>
                                          <FormattedMessage id="help.byTelephone" />
                                        </b>
                                        <p>
                                          {
                                            this.props.configStore
                                              .contactTimePeriod
                                          }
                                        </p>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-numeric rc-md-up"
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-alpha rc-border--none rc-md-down"
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rc-column rc-content-v-middle">
                                      <LazyLoad>
                                      <img
                                        className="align-self-center widthAuto"
                                        src={callImg}
                                        alt="By telephone"
                                        title="By telephone"
                                      />
                                      </LazyLoad>
                                    </div>
                                  </div>
                                </div>
                              </article>
                              <article className="rc-full-width rc-column">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
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
                                        <div className="rc-margin-top--xs">
                                          <p
                                            className="rc-numeric rc-md-up"
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
                                    <div className="rc-column rc-content-v-middle">
                                      <LazyLoad>
                                      <img
                                        className="align-self-center widthAuto"
                                        src={emailImg}
                                        alt="By email"
                                        title="By email"
                                      />
                                      </LazyLoad>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </div>
                            <div className="rc-column rc-triple-width">
                              <div
                                className="background-cover"
                                style={{
                                  backgroundImage: `url(${require('@/assets/images/slider-img-help.jpg?sw=802&amp;sh=336&amp;sm=cut&amp;sfrm=png')})`
                                }}
                              >
                                <picture className="rc-card__image">
                                  <LazyLoad>
                                  <img src={helpImg} alt=" " title=" " />
                                  </LazyLoad>
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
            )}
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default SubscriptionLanding;
