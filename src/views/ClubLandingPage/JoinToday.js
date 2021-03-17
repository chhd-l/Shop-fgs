import React from 'react';
import Logo from '../../components/Logo';
import Landingpagecat from './ClubImage/Landingpagecat.png';
import Landingpagedog from './ClubImage/landingpagedog.png';
import catanddog from './ClubImage/catanddog.PNG';
import howitworck4 from './ClubImage/howit4.png';
import LazyLoad from 'react-lazyload';
import './index.css';

const JoinToday = () => {
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
                            src={Landingpagecat}
                            alt=""
                          />
                        </LazyLoad>
                      </div>
                    </div>
                    <div className="col-12 col-md-4 m-auto rc-padding-x--sm rc-padding-x--lg--mobile rc-padding-top--lg--mobile order-0 order-md-1">
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Logo />
                      </div>
                      <br />
                      <div className="rc-gamma text-center">
                        <h2 style={{ fontWeight: '550' }}>
                          Join our subscription today
                        </h2>
                      </div>
                      <div className="rc-intro inherit-fontsize rc-text--center">
                        <h5>
                          Tell us about your pet to get a precise nutritional
                          recommendation.
                        </h5>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <button
                          style={{ margin: '0 auto' }}
                          className="rc-btn rc-btn--one"
                        >
                          Get started
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-md-4 order-2 order-md-2 indexdesktop ">
                      <div className="rc-column rc-padding--none">
                        <img src={Landingpagedog} alt="Dog image" />
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
export default JoinToday;
