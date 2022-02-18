import React from 'react';
import LazyLoad from 'react-lazyload';
import './index.css';
import { getDeviceType, optimizeImage } from '@/utils/utils';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const SubscriptionBenefitsBanner = ({
  SubscriptionItem,
  Subtitle,
  LogoShow
}) => {
  return (
    <div className="row rc-margin-x--none">
      <div className="rc-full-width">
        <div className="experience-component experience-assets-contentBlock margintopmobile">
          <div
            className={`${
              window.__.env.REACT_APP_COUNTRY == 'ru'
                ? 'runewmargin rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile'
                : 'rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile '
            }`}
          >
            <div
              style={{ backgroundColor: '#ffffff' }}
              className="mobileBoxshadow"
            >
              <div
                className="flex "
                style={{ justifyContent: 'center', padding: '20px' }}
              >
                {window.__.env.REACT_APP_COUNTRY == 'fr' && !isMobile
                  ? null
                  : LogoShow.logo}
              </div>
              <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
                <h3 className="rc-beta" style={{ fontWeight: '550' }}>
                  {Subtitle.title}
                </h3>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-around' }}
                className="flexwrap"
              >
                {SubscriptionItem.map((items, i) => (
                  <div className="text-center " key={i}>
                    <article>
                      <LazyLoad className="mobileCenter">
                        <img
                          className="w-90 lazyloaded 3"
                          src={optimizeImage({
                            originImageUrl: items.SubscriptionImg,
                            width: 150
                          })}
                          style={{ height: '150px', borderRadius: '50%' }}
                        />
                      </LazyLoad>
                      <h5 style={{ fontSize: '24px' }}>
                        {items.SubscriptionTitle}
                      </h5>
                      <div
                        className="rc-card__body"
                        style={{ paddingTop: '0.5rem' }}
                      >
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
