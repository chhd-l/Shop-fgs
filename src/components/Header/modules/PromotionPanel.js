import React from 'react';
import LazyLoad from 'react-lazyload';

export default function PromotionPanel({ item }) {
  return (
    <div className="p-4 pt-sm-0 pb-sm-0 dropdown-nav__ad__card">
      <div className="border d-flex align-items-center p-4">
        <div className="container-text">
          <p className="title-text red">{item.title}</p>
          <p className="medium">{item.subtitle}</p>
          <a link={item.link.url} className="rc-btn rc-btn--two red">
            {item.link.text}
          </a>
        </div>
        <LazyLoad style={{ flex: 1, width: '100%', height: '100%' }}>
          <img
            className="ad-img"
            src={item.image.url}
            alt={item.image.altText}
            srcSet={item.image.srcset}
          />
        </LazyLoad>
      </div>
    </div>
  );
}
