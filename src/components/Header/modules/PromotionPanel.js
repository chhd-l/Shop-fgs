import React from 'react';
import LazyLoad from 'react-lazyload';

export default function PromotionPanel({ item }) {
  return (
    <div className="px-4 pb-8 pt-6 pt-sm-0 pb-sm-0 dropdown-nav__ad__card">
      <div className="">
        <div className="d-flex align-items-center">
          <div className="container-text">
            <p className="title-text text-rc-red text-lg">{item.Title}</p>
            <p className="py-4 text-base">{item.Subtitle}</p>
          </div>
        </div>
        <a
          href={item.PrimaryLink.Url}
          className="rc-btn rc-btn--two text-rc-red w-full"
        >
          {item.PrimaryLink.Text}
        </a>
      </div>
    </div>
  );
}
