import React from 'react';
import SubscriptionBenefitsBanner from './SubscriprionBenefitsBanner';
import './index.css';
import { FormattedMessage } from 'react-intl';
import benefitsone from './image/benefitsone.png';
import benefitstwo from './image/benefitstwo.png';
import benefitsthree from './image/benefitsthree.png';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import clublogo from './image/clublogo.png';
import clubru from './image/Clubru.png';
import { getDeviceType } from '../../../../utils/utils';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const SubTitles = {
  title: (
    <FormattedMessage
      id="ClubLP.LongBanner.SubscriptionTitle"
      values={{ val: isMobile ? <></> : <br /> }}
    />
  )
};
const LogoShows = {
  logo: (
    <img
      style={{ width: '100px' }}
      src={window.__.env.REACT_APP_COUNTRY == 'ru' ? clubru : clublogo}
    />
  )
};
const SubscriptionItems = [
  {
    SubscriptionImg: benefitsone,
    SubscriptionTitle: (
      <a style={{ fontWeight: 'bold', fontSize: '18px' }}>
        <FormattedMessage
          id="ClubLP.LongBanner.SubscriptionTitle1"
          values={{ val: <br /> }}
        />
      </a>
    ),
    SubscriptionContent: (
      <FormattedMessage
        id="ClubLP.LongBanner.SubscriptionContent1"
        values={{ val: <br /> }}
      />
    )
  },
  {
    SubscriptionImg: benefitstwo,
    SubscriptionTitle: (
      <a style={{ fontWeight: 'bold', fontSize: '18px' }}>
        <FormattedMessage
          id="ClubLP.LongBanner.SubscriptionTitle2"
          values={{ val: <br /> }}
        />
      </a>
    ),
    SubscriptionContent: (
      <FormattedMessage
        id="ClubLP.LongBanner.SubscriptionContent2"
        values={{ val1: <br />, val2: <br /> }}
      />
    )
  },
  {
    SubscriptionImg: benefitsthree,
    SubscriptionTitle: (
      <a style={{ fontWeight: 'bold', fontSize: '18px' }}>
        <FormattedMessage
          id="ClubLP.LongBanner.SubscriptionTitle3"
          values={{ val: <br /> }}
        />
      </a>
    ),
    SubscriptionContent: (
      <FormattedMessage
        id="ClubLP.LongBanner.SubscriptionContent3"
        values={{ val: <br /> }}
      />
    )
  }
];

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
                  className="rc-beta  rc-margin-bottom--sm rc-margin-bottom--lg--mobile fontheight transformmobile10px"
                  style={{
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
                    <FormattedMessage
                      id="ClubLP.LongBanner.title"
                      values={{ val1: <br />, val2: <br /> }}
                    ></FormattedMessage>
                  </p>
                  <p style={{ fontSize: '0.7em', color: '#ffffff' }}>
                    <FormattedMessage id="ClubLP.LongBanner.content" />
                  </p>
                  <DistributeHubLinkOrATag
                    href={'/product-finder'}
                    ariaLabel="Links to product finder"
                  >
                    <button
                      style={{
                        padding: '0',
                        paddingLeft: '80px',
                        paddingRight: '80px'
                      }}
                      className="rc-btn rc-btn--one "
                    >
                      <FormattedMessage id="ClubLP.LongBanner.button" />
                    </button>
                  </DistributeHubLinkOrATag>
                  <p
                    style={{
                      color: '#ffffff',
                      marginBottom: '0px'
                    }}
                    className={`longbannerwidth266 ${
                      window.__.env.REACT_APP_COUNTRY == 'tr'
                        ? `trmarginleft10vw`
                        : null
                    }`}
                  >
                    <FormattedMessage
                      id="ClubLP.LongBanner.content2"
                      values={{ val: <br /> }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SubscriptionBenefitsBanner
          SubscriptionItem={SubscriptionItems}
          Subtitle={SubTitles}
          LogoShow={LogoShows}
        />
      </div>
    </>
  );
};

export default LongBanner;
