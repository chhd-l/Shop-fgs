import React from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import benefitsone from './image/benefitsone.png';
import benefitstwo from './image/benefitstwo.png';
import benefitsthree from './image/benefitsthree.png';
import './index.css';

const SubscriptionBenefitsBanner = (SubscriptionItem) => {
  return (
    <div className="row rc-margin-x--none">
      <div className="rc-full-width">
        <div className="experience-component experience-assets-contentBlock margintopmobile">
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile ">
            <div style={{ backgroundColor: '#ffffff', borderRadius: '25px' }}>
              <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
                <div
                  className="rc-beta"
                  style={{ fontWeight: 'bold', fontSize: '23px' }}
                >
                  SUBSCRIPTION BENEFITS FOR CATS & DOGS
                </div>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-around' }}
                className="flexwrap"
              >
                {SubscriptionItem.SubscriptionItem.map((items) => (
                  <div className="text-center">
                    <article>
                      <LazyLoad>
                        <img
                          className="w-90 lazyloaded"
                          src={items.SubscriptionImg}
                          style={{ height: '150px' }}
                        />
                      </LazyLoad>
                      <h5 style={{ fontSize: '24px' }}>
                        {items.SubscriptionTitle}
                      </h5>
                      <div className="rc-card__body">
                        <p
                          className="rc-card__meta club_subscription_intro_center"
                          style={{ fontSize: '1rem' }}
                        >
                          {items.SubscriptionContent}
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBenefitsBanner;
