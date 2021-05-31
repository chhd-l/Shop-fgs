import React from 'react';
import Logo from '../../components/Logo';
import Landingpagecat from './ClubImage/Landingpagecat.png';
import Landingpagedog from './ClubImage/landingpagedog.png';
import catanddog from './ClubImage/catanddog.PNG';
import howitworck4 from './ClubImage/howit4.png';
import LogoClub from './ClubImage/LogoClub.png';
import LazyLoad from 'react-lazyload';
import './index.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { Link } from 'react-router-dom';
import ruclublogo from './ClubImage/CLUB_logoRU@2x.png';

const JoinToday = (props) => {
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none ">
        <div className="rc-full-width">
          <div className="experience-component experience-assets-importContentAsset">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
              <div className="content-asset">
                <div className="rc-bg-colour--brand4">
                  <div className="row rc-max-width--lg rc-match-heights rc-padding-y--sm jointoday">
                    <div className="col-12 col-md-4 order-1 order-md-0  indexdesktop ">
                      <div className="rc-column rc-padding--none">
                        <LazyLoad>
                          <img
                            className="w-auto lazyloaded"
                            style={{
                              maxWidth: '85%',
                              maxHeight: '85%',
                              marginTop: '30px'
                            }}
                            alt={props.intl.formatMessage({
                              id: 'club.jointodayalt'
                            })}
                            src={Landingpagecat}
                          />
                        </LazyLoad>
                      </div>
                    </div>
                    <div className="col-12 col-md-4 m-auto rc-padding-x--sm rc-padding-x--lg--mobile rc-padding-top--lg--mobile order-0 order-md-1">
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        {process.env.REACT_APP_COUNTRY == 'RU' ? (
                          <img
                            style={{ width: '200px' }}
                            src={ruclublogo}
                            className="rc-logo-svg"
                            alt="Логотип ROYAL CANIN® КЛУБА"
                          />
                        ) : (
                          <img
                            src={LogoClub}
                            alt="rc-logo-club"
                            style={{ width: '180px' }}
                          />
                        )}
                      </div>
                      <br />
                      <div className="rc-gamma text-center">
                        <h2 style={{ fontWeight: '550' }}>
                          <FormattedMessage id="club.joinsubscription.title" />
                        </h2>
                      </div>
                      <div className="rc-intro inherit-fontsize rc-text--center">
                        <h5>
                          <FormattedMessage id="club.joinsubscription.description" />
                        </h5>
                      </div>
                      <DistributeHubLinkOrATag
                        href={'/product-finder'}
                        ariaLabel="Links to product finder"
                      >
                        <div style={{ display: 'flex' }}>
                          <button
                            style={{ margin: '0 auto' }}
                            className="rc-btn rc-btn--one"
                          >
                            <FormattedMessage id="club.joinsubscription.button" />
                          </button>
                        </div>
                      </DistributeHubLinkOrATag>
                    </div>
                    <div className="col-12 col-md-4 order-2 order-md-2 indexdesktop ">
                      <div className="rc-column rc-padding--none">
                        <img
                          src={Landingpagedog}
                          alt={props.intl.formatMessage({
                            id: 'club.jointodayalt'
                          })}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-4 order-2 order-md-2 indexmobile">
                      <div className="rc-column rc-padding--none">
                        <img src={catanddog} alt="Dog image" />
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
  );
};
export default injectIntl(JoinToday);
