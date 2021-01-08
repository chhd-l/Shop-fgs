import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom'

const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class CadeauCoussinChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {

  }

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      }
    };
    return (
      <div className="recommendation">
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
          <BreadCrumbs />
          <div className="experience-region experience-main">
            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-pawListBlock">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                      <div className="rc-max-width--lg rc-padding-y--sm">
                        <div className="rc-max-width--md text-center rc-padding-x--sm">
                          <h2 className="rc-beta text-center">Recevez en cadeau un coussin pour votre chat*</h2>
                          <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--md--mobile">
                            <p>Avec le code promotionnel qui vous a été communiqué vous pouvez à la fin de votre commande obtenir un cadeau spécial pour votre chat : un super coussin parfait pour les longues siestes de votre félin.</p>
                            <p className="rc-md-down"><br/></p>
                            <h3>
                              <strong>Comment obtenir votre cadeau ?</strong>
                            </h3>
                            <p>
                              <span style={{color:'rgb(0,0,0,0)'}}>Comment obtenir votre cadeau ?</span>
                            </p>
                          </div>
                          <div className="d-block d-md-none rc-text--center"></div>
                        </div>
                        <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                          <div
                            className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">

                            <div className="rc-column">
                              <div className="rc-padding-y--lg--mobile rc-full-width">
                                <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                                  <li className="rc-list__item">
                                  <i className="wof rc-margin-right--xs"
                                    style={{
                                      position: 'relative',
                                      left: '-6px',
                                      marginRight: 0
                                    }}></i>
                                    Choisissez
                                    l'aliment adapté à votre chat et ajoutez-le à votre panier
                                  </li>
                                  <li className="rc-list__item">
                                    <i className="wof rc-margin-right--xs"
                                    style={{
                                      position: 'relative',
                                      left: '-6px',
                                      marginRight: 0
                                    }}
                                    ></i>
                                    Rendez-vous
                                    dans votre panier pour finaliser votre commande
                                  </li>
                                  <li className="rc-list__item">
                                    <i className="wof rc-margin-right--xs"
                                    style={{
                                      position: 'relative',
                                      left: '-6px',
                                      marginRight: 0
                                    }}></i>
                                    Ajoutez
                                    votre code promotionnel en dessous du panier et cliquez sur "Appliquer"
                                  </li>
                                  <li className="rc-list__item">
                                    <i className="wof rc-margin-right--xs"
                                    style={{
                                      position: 'relative',
                                      left: '-6px',
                                      marginRight: 0
                                    }}></i>
                                    Créez
                                    votre compte et passez votre commande
                                  </li>
                                </ul>
                                <div className="textcenter--mobile">
                                  <Link to="/cats"
                                     className="rc-btn rc-btn--one rc-margin-top--xs ">J'en profite</Link>
                                </div>
                              </div>
                            </div>

                            <div className="rc-column">
                              <img
                                alt=" " 
                                className="w-100 lazyloaded"
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CAT-ANTIBACTERIAL-MAT.png`}
                                />
                            </div>
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
                  <div className="experience-component experience-assets-textContent">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext  ">
                      <p>
                        <em>*Offre valable uniquement en France métropolitaine hors îles françaises et uniquement sur le site </em>
                        <Link to="/" target="_self" data-link-type="external" data-link-label="/">
                          <strong>
                            <em>https://shop.royalcanin.fr</em>
                          </strong>
                        </Link>
                        <em>, Code valable du 23/11/2020 au 23/12/2020 pour l'achat au minimum d'un aliment chat. Dans la limite des stocks disponibles. Code promotionnel non-cumulable avec d’autres offres promotionnelles en cours.</em>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default CadeauCoussinChat;
