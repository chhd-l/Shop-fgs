import React from 'react';
import LazyLoad from 'react-lazyload';

export default function PromotionPanel({
  item,
  cItem,
  handleClickNavItem = () => {}
}) {
  return (
    <div className="rc-list__item-sub-menu__container rc-border-all rc-border-colour--interface rc-margin--md--mobile">
      <div className="rc-layout-container rc-two-column rc-no-stack rc-margin-x--none rc-self-h-middle rc-padding-y--sm rc-padding--md--mobile">
        <div className="rc-column rc-self-h-middle rc-flex-wrap--wrap rc-padding-y--none">
          <h4 className="rc-delta">{cItem.Title}</h4>
          <p className="rc-body">{cItem.Subtitle}</p>
          <a
            href={cItem.PrimaryLink.Url}
            className="rc-btn rc-btn--two"
            data-ref="nav-link"
            onClick={handleClickNavItem.bind(this, item, cItem)}
          >
            {cItem.PrimaryLink.Text}
          </a>
        </div>
        <div className="rc-column rc-padding-y--none">
          <img
            src={cItem.Image.Url}
            alt={cItem.Image.AltText}
            srcSet={cItem.Image.Srcset}
          />
        </div>
      </div>
    </div>
  );
}
