import React from 'react';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';

export function StaticItemTemplateH5ForGlobalStyle({
  title,
  description,
  buttonText,
  link,
  image
}) {
  return (
    <article
      className="rc-card--product overflow-hidden"
      style={{ minHeight: '120px' }}
    >
      <div className="fullHeight">
        <span className="ui-cursor-pointer-pure">
          <article className="rc-card--a  margin-top--5">
            <div className="rc-card__body rc-padding-top--md pb-0 justify-content-start d-flex flex-wrap">
              <div className="height-product-tile-plpOnly margin-top-mobile-20">
                <h3 className="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop product-title text-break ">
                  {title}
                </h3>
              </div>
              <div>
                <div
                  className="d-flex rc-padding-top--md margin-top-mobile-20 position-relative"
                  style={{ fontSize: 'large', zIndex: 2 }}
                >
                  {description}
                </div>
                <DistributeHubLinkOrATag href={link} to={link}>
                  <button
                    className="rc-btn rc-btn--two margin-top-mobile-20"
                    style={{ marginTop: '1.1875rem' }}
                  >
                    {buttonText}
                  </button>
                </DistributeHubLinkOrATag>
              </div>
              <picture className="rc-card__image" style={{ flex: 1 }}>
                <div className="rc-padding-bottom--xs justify-content-center ">
                  <div
                    className="lazyload-wrapper"
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    {image}
                  </div>
                </div>
              </picture>
            </div>
          </article>
        </span>
      </div>
    </article>
  );
}

export function StaticItemTemplate({
  title,
  description,
  buttonText,
  link,
  image
}) {
  return (
    <article
      className="rc-card--product overflow-hidden"
      style={{ minHeight: '120px' }}
    >
      <div className="fullHeight">
        <span className="ui-cursor-pointer-pure">
          <article className="rc-card--a rc-text--center text-center">
            <div className="pb-0 justify-content-start rc-padding-top--md">
              <div className="height-product-tile-plpOnly">{title}</div>
              <div
                className=" text-center rc-padding-top--xs"
                style={{ fontSize: 'large' }}
              >
                {description}
              </div>
              <div style={{ margin: '0 auto' }}>
                <DistributeHubLinkOrATag href={link} to={link}>
                  <button
                    className="rc-btn rc-btn--two "
                    style={{ marginTop: '1.1875rem' }}
                  >
                    {buttonText}
                  </button>
                </DistributeHubLinkOrATag>
              </div>
            </div>
            <picture className="rc-card__image">
              <div className="rc-padding-bottom--xs d-flex justify-content-center align-items-center ImgBoxFitScreen">
                <div
                  className="lazyload-wrapper"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                >
                  {image}
                </div>
              </div>
            </picture>
          </article>
        </span>
      </div>
    </article>
  );
}
