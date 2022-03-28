import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import GoogleTagManager from '@/components/GoogleTagManager';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';

@seoHoc()
class Mentionslegales extends React.Component {
  render() {
    const event = {
      page: {
        type: 'other',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          {window.__.env.REACT_APP_COUNTRY == 'fr' ? (
            <div
              className="mentionslegales-page"
              style={{ marginBottom: '1rem' }}
            >
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className="md:text-left rc-margin-top--lg--mobile text-center rc-margin-y--sm">
                      <div className="rc-padding-bottom--none--mobile text-center rc-padding-top--lg">
                        <h1 className="rc-beta">MENTIONS LEGALES</h1>
                      </div>
                      <div className="text-left">
                        <div className="rc-large-body inherit-fontsize children-nomargin">
                          <p>
                            <strong>
                              La plateforme accessible à{' '}
                              <Link to="https://shop.royalcanin.fr/">
                                https://shop.royalcanin.fr/
                              </Link>{' '}
                              (la « Plateforme ») est éditée par :
                            </strong>
                          </p>

                          <p className="rc-margin-y--sm">
                            La société ROYAL CANIN France SAS (ci-après « Royal
                            Canin »), société par actions simplifiée au capital
                            de 917 986 € immatriculée au Registre du Commerce et
                            des sociétés de Nîmes sous le numéro 380 824 888,
                            dont le siège social est situé 650, Avenue de la
                            Petite Camargue – BP 4 30470 AIMARGUES.{' '}
                          </p>

                          <p className="rc-margin-y--sm">
                            Numéro de TVA :{' '}
                            <span style={{ color: '#333333' }}>
                              FR43380824888
                            </span>
                          </p>
                          <p className="rc-margin-y--sm">
                            <strong>Contacts : </strong>
                          </p>
                          <p className="rc-margin-y--sm">
                            Téléphone :{' '}
                            <a
                              href="tel:0800005360"
                              style={{ color: 'rgb(0, 188, 163)' }}
                            >
                              0 800 005 360
                            </a>
                          </p>
                          <p className="rc-margin-y--sm">
                            Email :{' '}
                            <a
                              href="mailto:suivi.dtc.france@royalcanin.com"
                              style={{ color: 'rgb(0, 135, 189)' }}
                            >
                              suivi.dtc.france@royalcanin.com
                            </a>
                          </p>

                          <p className="rc-margin-y--sm">
                            <strong>Le directeur de publication est :</strong>
                          </p>
                          <p className="rc-margin-y--sm">
                            Monsieur Fabrice Ribourg agissant en qualité de
                            Président de Royal Canin France.{' '}
                          </p>

                          <p className="rc-margin-y--sm">
                            <strong>La Plateforme est hébergée par :</strong>
                          </p>
                          <p className="rc-margin-y--sm">
                            Mars, Incorporated ; située au 800 High Street,
                            Hackettstown, NJ 07840, États-Unis ; numéro de
                            téléphone : 916.445.1254.{' '}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <Footer />
        </main>
      </div>
    );
  }
}

export default Mentionslegales;
