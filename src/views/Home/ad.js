import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { optimizeImage } from '@/utils/utils';

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
                    <Link
                      // to="/dogs/retail-products?prefn1=Technology&prefv1=Aliment-humide"
                      // to="/cats/retail-products?prefn1=New%20Products&prefv1=La-Semaine-Du-Chat"
                      to="/retail-products?prefn1=Samples%20bundles%20for%20banners&prefv1=Offre-Echantillons-Care-Chien"
                    >
                      <picture data-rc-feature-objectfillpolyfill-setup="true">
                        <source
                          media="(max-width: 640px)"
                          // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_shop_FR_md.jpg`}
                          // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/FLAGSHIP_RC_PACK_COM_BANNIERE_JEU_MOBILE.jpg`}
                          srcSet={optimizeImage({
                            originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_shop__md_FR_211101_v2.jpg`,
                            width: 440
                          })}
                        />
                        <source
                          media="(min-width: 640px) and (max-width: 769px)"
                          srcSet={optimizeImage({
                            originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_shop__md_FR_211101_v2.jpg`,
                            width: 440
                          })}
                          // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_shop_FR_md.jpg`}
                          // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/FLAGSHIP_RC_PACK_COM_BANNIERE_JEU_MOBILE.jpg`}
                        />
                        <source
                          media="(min-width: 769px)"
                          // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_shop_FR@2x.jpg`}
                          // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/FLAGSHIP_RC_PACK_COM_BANNIERE_JEU_DESKTOP.jpg`}
                          srcSet={optimizeImage({
                            originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_shop_FR_211101_v2.jpg`,
                            width: 1440
                          })}
                        />
                        <img
                          className="w-100 lazyloaded"
                          alt="Large Gamme De Produits Royal Canin"
                          title="Large Gamme De Produits Royal Canin"
                          // src={BannerFRLg}
                          // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/FLAGSHIP_RC_PACK_COM_BANNIERE_JEU_DESKTOP.jpg`}
                          src={optimizeImage({
                            originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_shop_FR_211101_v2.jpg`,
                            width: 1440
                          })}
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
    }[window.__.env.REACT_APP_COUNTRY] || null
  );
}

export function TopAds() {
  return (
    {
      us: (
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
                            // data-srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x.png  1x, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x1.png 1.5x, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x2.png 2x`}
                            // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x.png  1x, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x1.png 1.5x, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x2.png 2x`}
                            srcSet={optimizeImage({
                              originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x.webp`,
                              width: 440
                            })}
                          />
                          <source
                            media="(min-width: 640px) and (max-width: 769px)"
                            // data-srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x3.png  1x,${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x4.png  1.5x, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x5.png 2x`}
                            // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x3.png  1x,${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x4.png  1.5x, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/banner_mob_USA@2x5.png 2x`}
                            srcSet={optimizeImage({
                              originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x.webp`,
                              width: 440
                            })}
                          />
                          <source
                            media="(min-width: 769px)"
                            // data-srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x1.png 1x,${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x.webp  1.5x,${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x2.png  2x`}
                            // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x1.png 1x,${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x.webp  1.5x,${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x2.png  2x`}
                            srcSet={optimizeImage({
                              originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x.webp`,
                              width: 1440
                            })}
                          />
                          <img
                            className="w-100 lazyloaded"
                            alt="Royal Canin Extensive Product Range"
                            title="Royal Canin Extensive Product Range"
                            src={optimizeImage({
                              originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Banner_USA@2x.webp`,
                              width: 1440
                            })}
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
    }[window.__.env.REACT_APP_COUNTRY] || null
  );
}
