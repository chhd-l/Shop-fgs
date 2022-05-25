import React from 'react';
import LazyLoad from 'react-lazyload';
import cn from 'classnames';

export default function PromotionPanel({
  item,
  cItem,
  handleClickNavItem = () => {},
  className,
  borderFix
}) {
  return (
    <div className={`p-31 pt-sm-0 pb-sm-0 dropdown-nav__ad__card ${className}`}>
      <div
        className={cn(
          'd-flex align-items-center1 p-411 pl-10 h-full',
          borderFix
        )}
      >
        <div className="container-text" style={{ minWidth: 0, flexGrow: 1 }}>
          <p className="title-text text-rc-red text-lg ui-text-overflow-line1">
            {cItem.Title}
          </p>
          <p className="ui-text-overflow-line3 my-5" aria-hidden="true">
            {cItem.Subtitle}
          </p>
          <a
            href={cItem.PrimaryLink.Url}
            className="rc-btn rc-btn--two red truncate"
            onClick={handleClickNavItem.bind(this, { item, cItem })}
            style={{ maxWidth: '290px' }}
          >
            {cItem.PrimaryLink.Text}
          </a>
        </div>
        {/* <LazyLoad style={{ flex: 1, width: '100%', height: '100%' }}> */}
        <div style={{ width: '222px', height: '222px', flexShrink: 0 }}>
          <img
            className="ad-img111 h-full"
            style={{ margin: '0 auto' }}
            src={cItem.Image.Url}
            alt={cItem.Image.AltText}
            srcSet={cItem.Image.Srcset}
          />
        </div>

        {/* </LazyLoad> */}
      </div>
    </div>
  );
}
