import React from 'react';
import LazyLoad from 'react-lazyload';

export default function PromotionPanel({ item }) {
  return (
    <div className="p-4 pt-sm-0 pb-sm-0 dropdown-nav__ad__card">
      <div className="border d-flex align-items-center p-4">
        <div className="container-text">
          <p className="title-text red">{item.Title}</p>
          <p className="medium">{item.Subtitle}</p>
          <a link={item.PrimaryLink.Url} className="rc-btn rc-btn--two red">
            {item.PrimaryLink.Text}
          </a>
        </div>
        <LazyLoad style={{ flex: 1, width: '100%', height: '100%' }}>
          <img
            className="ad-img"
            src={item.Image.Url}
            alt={item.Image.AltText}
            srcSet={item.Image.Srcset}
          />
        </LazyLoad>
      </div>
    </div>
  );
}
