import React from 'react';
import SubscriptionBenefitsBanner from './SubscriprionBenefitsBanner';
import './index.css';

const LongBanner = () => {
  return (
    <>
      <div className="clubdesktop clubmobile">
        <div className="row rc-margin-x--none">
          <div className="rc-full-width">
            <div className="experience-component experience-assets-contentBlock">
              <div
                className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile"
                style={{ marginBottom: '0px' }}
              >
                <div
                  className="rc-beta  rc-margin-bottom--sm rc-margin-bottom--lg--mobile"
                  style={{
                    marginLeft: '13vw',
                    marginTop: '30px',
                    marginBottom: '0px'
                  }}
                >
                  <p
                    style={{
                      fontSize: '1.2em',
                      color: '#ffffff',
                      fontWeight: 'bold'
                    }}
                  >
                    GIVE YOUR PET A<br />
                    COMPLETE HEALTH SOLUTION,
                    <br />
                    BY SUBSCRIPTION
                  </p>
                  <p style={{ fontSize: '0.7em', color: '#ffffff' }}>
                    starting from 19.90€ /refill
                  </p>
                  <button
                    style={{
                      padding: '0',
                      paddingLeft: '80px',
                      paddingRight: '80px'
                    }}
                    className="rc-btn rc-btn--one"
                  >
                    Try it now
                  </button>
                  <p
                    style={{
                      color: '#ffffff',
                      marginLeft: '40px',
                      marginBottom: '0px'
                    }}
                  >
                    Free from engagement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SubscriptionBenefitsBanner />
      </div>
    </>
  );
};

export default LongBanner;
