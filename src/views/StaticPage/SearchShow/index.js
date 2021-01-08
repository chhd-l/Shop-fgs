import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { setSeoConfig, getParaByName } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href
class SearchShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      searchWords: ''
    };
  }
  componentWillUnmount() {}
  componentDidMount() {
    const { search } = this.props.history.location;
    const searchWords = decodeURI(getParaByName(search, 'q'));
    setSeoConfig().then((res) => {
      this.setState({ seoConfig: res });
    });

    this.setState({
      searchWords
    });
  }

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div className="recommendation">
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
          {process.env.REACT_APP_LANG == 'fr' ? null : <BannerTip />}
          <BreadCrumbs />

          <div className="search-results rc-padding--sm rc-max-width--xl">
            <section className="rc-bg-colour--brand3">
              <div className="noSearch-result">
                <div className="rc-text--center rc-text--center rc-padding-top--sm--mobile">
                  <h2 className="rc-alpha rc-margin-bottom--none">Désolé!</h2>
                  <div className="rc-gamma textColor rc-margin-bottom--none rc-padding-y--sm rc-padding-y--lg--mobile">
                    Aucun résultat ne correspond à votre recherche :{' '}
                    <br className="d-block d-md-none" />“
                    <b>{this.state.searchWords}</b>”
                  </div>
                </div>
                <div className="content-asset">
                  <div className="rc-layout-container rc-one-column rc-max-width--md rc-padding-x--lg">
                    <div className="rc-full-width rc-text--center rc-padding-x--sm noSearch-desc">
                      <p>
                        Vous pouvez contacter nos spécialistes pour trouver la
                        nourriture la plus adaptée aux besoins de votre animal.
                      </p>
                    </div>
                    <div className="rc-layout-container rc-two-column">
                      <article className="rc-full-width rc-column">
                        <div className="rc-border-all rc-border-colour--interface fullHeight">
                          <div className="row rc-layout-container rc-three-column rc-margin--none rc-content-h-middle fullHeight">
                            <div className="col-8 rc-column rc-double-width rc-padding-top--md--mobile">
                              <div>
                                <b style={{ color: '#00A4A6' }}>
                                  Par téléphone
                                </b>
                                <p>
                                  Appel Gratuit - Du lundi au vendredi 8h-20h.
                                </p>
                                <div>
                                  <a
                                    href="tel:0800-005-360"
                                    style={{ color: '#00A4A6' }}
                                    className="rc-numeric"
                                  >
                                    0800-005-360
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col-4 rc-column rc-content-v-middle">
                              <img
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/customer-service@2x.png`}
                                className="align-self-center w-auto"
                              ></img>
                            </div>
                          </div>
                        </div>
                      </article>
                      <article className="rc-full-width rc-column">
                        <div className="rc-border-all rc-border-colour--interface fullHeight">
                          <div className="row rc-layout-container rc-three-column rc-margin--none rc-content-h-middle fullHeight">
                            <div className="col-8 rc-column rc-double-width rc-padding-top--md--mobile">
                              <div>
                                <b>Par mail</b>
                                <div>
                                  <a
                                    href="mailto:info.de@royalcanin.com"
                                    className="rc-styled-link"
                                  >
                                    Envoyer un email
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col-4 rc-column rc-content-v-middle">
                              <img
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/Emailus_icon@2x.png`}
                                className="align-self-center w-auto"
                              ></img>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default SearchShow;
