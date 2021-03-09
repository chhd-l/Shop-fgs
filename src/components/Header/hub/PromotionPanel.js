import React from 'react';
import LazyLoad from 'react-lazyload';

export default function PromotionPanel({
  item,
  cItem,
  handleClickNavItem = () => {}
}) {
  return (
    <div className="p-4 pt-sm-0 pb-sm-0 dropdown-nav__ad__card">
      <div className="border d-flex align-items-center p-4">
        <div className="container-text">
          <p className="title-text red">{cItem.Title}</p>
          <p className="medium">{cItem.Subtitle}</p>
          <a
            href={cItem.PrimaryLink.Url}
            className="rc-btn rc-btn--two red"
            onClick={handleClickNavItem.bind(this, { item, cItem })}
          >
            {cItem.PrimaryLink.Text}
          </a>
        </div>
        {/* <LazyLoad style={{ flex: 1, width: '100%', height: '100%' }}> */}
        <div style={{ flex: 1, width: '100%', height: '100%' }}>
          <img
            className="ad-img"
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
