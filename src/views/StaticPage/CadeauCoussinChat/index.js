import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';

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
        theme: 'Brand'
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
                            <p><br/></p>
                            <h3>
                              <strong>Comment obtenir votre cadeau ?</strong>
                            </h3>
                            <p>
                              <span style={{color:'rgb(0,0,0,0)'}}>Comment obtenir votre cadeau ?</span>
                            </p>
                          </div>
                          <div className="d-block d-md-none rc-text--center"></div>
                        </div>
                      </div>
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
