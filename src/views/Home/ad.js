import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import BannerFR from '@/assets/images/home/Banner-FR@2x.webp';

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
      en: (
        <>
          <Divider />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-banner">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-margin-y--sm rc-margin-y--lg--mobile portfolio-content">
                    <Link to="/cats">
                      <picture data-rc-feature-objectfillpolyfill-setup="true">
                        <source
                          media="(max-width: 640px)"
                          data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=400, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=600 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=800 2x"
                          srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=400, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=600 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=800 2x"
                        />
                        <source
                          media="(min-width: 640px) and (max-width: 769px)"
                          data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=750, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=1125 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=1500 2x"
                          srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=750, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=1125 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=1500 2x"
                        />
                        <source
                          media="(min-width: 769px)"
                          data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=1336, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=2004 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=2380 2x"
                          srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=1336, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=2004 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=2380 2x"
                        />
                        <LazyLoad height={200}>
                          <img
                            className="w-100 lazyloaded"
                            alt="Royal Canin Extensive Product Range"
                            title="Royal Canin Extensive Product Range"
                            src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=2004"
                          />
                        </LazyLoad>
                      </picture>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
      fr: (
        <>
          <Divider />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-banner">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-margin-y--sm rc-margin-y--lg--mobile portfolio-content">
                    <Link to="/cats">
                      <picture data-rc-feature-objectfillpolyfill-setup="true">
                        <source
                          media="(max-width: 640px)"
                          data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=400, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=600 1.5x, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=800 2x"
                          srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=400, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=600 1.5x, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=800 2x"
                        />
                        <source
                          media="(min-width: 640px) and (max-width: 769px)"
                          data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=750, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=1125 1.5x, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=1500 2x"
                          srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=750, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=1125 1.5x, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc5ac2a12/Homepage/Banner-mob-FR@2x.png?sw=1500 2x"
                        />
                        <source
                          media="(min-width: 769px)"
                          data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc9d19f40/Homepage/Banner-FR@2x.png?sw=1336, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc9d19f40/Homepage/Banner-FR@2x.png?sw=2004 1.5x, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc9d19f40/Homepage/Banner-FR@2x.png?sw=2380 2x"
                          srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc9d19f40/Homepage/Banner-FR@2x.png?sw=1336, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc9d19f40/Homepage/Banner-FR@2x.png?sw=2004 1.5x, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc9d19f40/Homepage/Banner-FR@2x.png?sw=2380 2x"
                        />
                        <img
                          className="w-100 lazyloaded"
                          alt="Large Gamme De Produits Royal Canin"
                          title="Large Gamme De Produits Royal Canin"
                          src={BannerFR}
                        />
                      </picture>
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
