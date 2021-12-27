import React, { useState, useEffect } from 'react';
import { getDeviceType } from '@/utils/utils';
import { getMarketingBanner } from '@/api/home';
import { DistributeLinkOrATag } from '@/components/DistributeLink';
import MktMessage from './MktMessage';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

function Container({ children }) {
  return isMobile ? (
    <marquee style={{ display: 'flex', alignItems: 'center' }}>
      {children}
    </marquee>
  ) : (
    <div
      className="rc-column rc-content-v-middle rc-zeta rc-margin--none rc-padding--xs"
      style={{ padding: '.3rem .5rem' }}
    >
      {children}
    </div>
  );
}

const bannerTips = () => {
  const [marketingBannerCfg, setMarketingBannerCfg] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getMarketingBanner();
      setMarketingBannerCfg(res?.context);
    };
    fetchData();
  }, []);

  return (
    <div
      // id="bannerTip"
      className="red font-weight-normal position-relative text-center px-2 md:px-4 rc-bg-colour--brand4 rc-bannertip-containner"
    >
      <div>
        <MktMessage className="py-1" />
        {marketingBannerCfg?.status ? (
          <div className="rc-bg-colour--brand4 text-center py-1">
            <div className="rc-layout-container rc-content-h-middle">
              <Container>
                {/* 订阅图标 */}
                {marketingBannerCfg?.iconStatus ? (
                  <span className="rc-icon rc-refresh rc-brand1 rc-iconography" />
                ) : null}

                <span className="align-middle">
                  <span
                    className="rc-margin-right--xs rc-margin-left--xs"
                    dangerouslySetInnerHTML={{
                      __html: marketingBannerCfg?.content
                    }}
                  />

                  {marketingBannerCfg?.buttonStatus ? (
                    <DistributeLinkOrATag
                      url={marketingBannerCfg?.buttonHyperlink}
                      className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
                      dangerouslySetInnerHTML={{
                        __html: marketingBannerCfg?.buttonContent
                      }}
                    />
                  ) : null}
                </span>
              </Container>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default bannerTips;
