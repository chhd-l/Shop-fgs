import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import BannerFRLg from '@/assets/images/home/Banner-FR-lg@2x.png';
import BannerFRMd from '@/assets/images/home/Banner-mob-FR-md@2x.png';
import BannerFRSm from '@/assets/images/home/Banner-mob-sm-FR@2x.png';

function Divider() {
  return (
    <div className="experience-component experience-assets-divider">
      <div
        className="rc-border-bottom rc-border-colour--brand4"
        style={{ borderBottomWidth: '4px' }}
      />
    </div>
  );
}
export function Ads() {
  return (
    {
      fr: (
        <>
          <Divider />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-banner">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-margin-y--sm rc-margin-y--lg--mobile portfolio-content">
                    <Link to="/cat-range/wet-products">
                      <picture data-rc-feature-objectfillpolyfill-setup="true">
                        <source
                          media="(max-width: 640px)"
                          srcSet={BannerFRSm}
                        />
                        <source
                          media="(min-width: 640px) and (max-width: 769px)"
                          srcSet={BannerFRMd}
                        />
                        <source
                          media="(min-width: 769px)"
                          srcSet={BannerFRLg}
                        />
                        <img
                          className="w-100 lazyloaded"
                          alt="Large Gamme De Produits Royal Canin"
                          title="Large Gamme De Produits Royal Canin"
                          src={BannerFRLg}
                        />
                      </picture>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider />
        </>
      )
    }[process.env.REACT_APP_LANG] || null
  );
}

export function TopAds() {
  // todo 小屏幕不会用匹配source
  return (
    {
      en: (
        <>
          <Divider />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-banner">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-margin-y--sm rc-margin-y--lg--mobile portfolio-content">
                    <Link to="/Tailorednutrition">
                      <LazyLoad height={200}>
                        <picture data-rc-feature-objectfillpolyfill-setup="true">
                          <source
                            media="(max-width: 640px)"
                            data-srcset={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x.png, ${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x1.png 1.5x, ${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x2.png 2x`}
                            srcSet={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x.png, ${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x1.png 1.5x, ${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x2.png 2x`}
                          />
                          <source
                            media="(min-width: 640px) and (max-width: 769px)"
                            data-srcset={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x3.png,${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x4.png  1.5x, ${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x5.png 2x`}
                            srcSet={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x3.png,${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x4.png  1.5x, ${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x5.png 2x`}
                          />
                          <source
                            media="(min-width: 769px)"
                            data-srcset={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x1.png,${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x.webp  1.5x,${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x2.png  2x`}
                            srcSet={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x1.png,${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x.webp  1.5x,${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x2.png  2x`}
                          />
                          <img
                            className="w-100 lazyloaded"
                            alt="Royal Canin Extensive Product Range"
                            title="Royal Canin Extensive Product Range"
                            src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/detail/Banner_USA@2x.png`}
                          />
                        </picture>
                      </LazyLoad>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }[process.env.REACT_APP_LANG] || null
  );
}
