import React from 'react';
import LazyLoad from 'react-lazyload';
import Landingpagecat from '../../../ClubLandingPage/ClubImage/Landingpagecat.png';
import LogoClub from '../../../ClubLandingPage/ClubImage/LogoClub.png';
import { FormattedMessage } from 'react-intl';
import joinusnewlogo from './image/joinusnewlogo.png';
import joinusnewright from './image/joinusnewright.png';
import howitworknew1 from '../HowItWorksNew/image/howitworksnew1.png';

const JoinTodayNew = () => {
  return (
    <div
      className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-top--sm rc-margin-top--lg--mobile three-column-content-block"
      style={{ marginTop: '0' }}
    >
      <div
        className="rc-bg-colour--brand3"
        id="benefits-box"
        style={{ padding: '1px 0' }}
      >
        <div className="rc-full-width">
          <div>
            <div className="experience-component experience-assets-importContentAsset">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                <div className="content-asset">
                  <div
                    className="row rc-max-width--lg rc-match-heights rc-padding-y--sm jointoday"
                    style={{ margin: '0', padding: '0' }}
                  >
                    <div className="col-12 col-md-4 order-1 order-md-0  indexdesktop ">
                      <div className="rc-column rc-padding--none">
                        <LazyLoad>
                          <img
                            className="w-auto lazyloaded"
                            style={{
                              maxWidth: '59%',
                              maxHeight: '59%',
                              marginTop: '120px',
                              marginLeft: '15vh'
                            }}
                            src={joinusnewlogo}
                          />
                        </LazyLoad>
                      </div>
                    </div>
                    <div className="col-12 col-md-4 m-auto rc-padding-x--sm rc-padding-x--lg--mobile rc-padding-top--lg--mobile order-0 order-md-1">
                      <div className="text-center">
                        <h2 style={{ fontWeight: '550' }}>
                          Tell us about your pet
                        </h2>
                      </div>
                      <div className="rc-intro inherit-fontsize rc-text--center">
                        <h5>to get a precise nutritional recommendation.</h5>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <button
                          style={{ margin: '0 auto' }}
                          className="rc-btn rc-btn--one"
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-md-4 order-2 order-md-2 indexdesktop ">
                      <div className="rc-column rc-padding--none">
                        <LazyLoad height={180}>
                          <img
                            src={joinusnewright}
                            style={{
                              maxHeight: '90%',
                              maxWidth: '90%',
                              marginLeft: '60px'
                            }}
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
  );
};

export default JoinTodayNew;
