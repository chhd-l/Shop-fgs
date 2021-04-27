import React from 'react';
import LazyLoad from 'react-lazyload';

export default function PromotionPanel({ item }) {
  return (
    <div className="p-4 pt-sm-0 pb-sm-0 dropdown-nav__ad__card">
      <div className="border  p-4">
        <div className="d-flex align-items-center">
          <div className="container-text">
            <p className="title-text red">{item.Title}</p>
            <p className="medium">{item.Subtitle}</p>
          </div>
          <div
            // scrollContainer=".rc-nav"
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              className="ad-img"
              src={item.Image.Url}
              alt={item.Image.AltText}
              srcSet={item.Image.Srcset}
            />
          </div>
        </div>
        <a href={item.PrimaryLink.Url} className="rc-btn rc-btn--two red">
          {item.PrimaryLink.Text}
        </a>
      </div>
    </div>
  );
}
