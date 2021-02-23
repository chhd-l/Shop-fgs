import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import GoogleTagManager from '@/components/GoogleTagManager';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href;

class Mentionslegales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      }
    }
  }
  componentDidMount() {
    setSeoConfig().then(res => {
      this.setState({ seoConfig: res })
    });
  }
  render() {
    const event = {
      page: {
        type: 'other',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      }
    };
    return (

      <div style={{ width: '100%', height: '100%' }}>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription} />
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
          {process.env.REACT_APP_LANG == 'fr' ? (
            <div className="mentionslegales-page" style={{ marginBottom: '1rem' }}>
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className="text-md-left rc-margin-top--lg--mobile text-center rc-margin-y--sm">
                      <div className="rc-padding-bottom--none--mobile text-center rc-padding-top--lg">
                        <h1 className="rc-beta">MENTIONS LEGALES</h1>
                      </div>
                      <div className="text-left">
                        <div className="rc-large-body inherit-fontsize children-nomargin">
                          <p>
                            <b>La plateforme accessible à <Link to="https://shop.royalcanin.fr/">https://shop.royalcanin.fr/</Link> (la « Plateforme ») est éditée par :</b>
                          </p>

                          <p className="rc-margin-y--sm">La société ROYAL CANIN France SAS (ci-après « Royal Canin »), société par actions simplifiée au capital de 917 986 € immatriculée au Registre du Commerce et des sociétés de Nîmes sous le numéro 380 824 888, dont le siège social est situé 650, Avenue de la Petite Camargue – BP 4 30470 AIMARGUES. </p>

                          <p className="rc-margin-y--sm">Numéro de TVA : <span style={{ color: '#333333' }}>FR43380824888</span></p>
                          <p className="rc-margin-y--sm"><b>Contacts : </b></p>
                          <p className="rc-margin-y--sm">Téléphone <a href="tel:0800005360" style={{ color: 'rgb(0, 188, 163)' }}>0 800 005 360</a></p>
                          <p className="rc-margin-y--sm">Email : <a href="mailto:suivi.dtc.france@royalcanin.com" style={{ color: 'rgb(0, 135, 189)' }}>suivi.dtc.france@royalcanin.com</a></p>

                          <p className="rc-margin-y--sm"><b>Le directeur de publication est :</b></p>
                          <p className="rc-margin-y--sm">Monsieur Fabrice Ribourg agissant en qualité de Président de Royal Canin France. </p>

                          <p className="rc-margin-y--sm"><b>La Plateforme est hébergée par :</b></p>
                          <p className="rc-margin-y--sm">Mars, Incorporated ; située au 800 High Street, Hackettstown, NJ 07840, États-Unis ; numéro de téléphone 916.445.1254. </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </main>
        <Footer />
      </div>

    );
  }
}

export default Mentionslegales;
