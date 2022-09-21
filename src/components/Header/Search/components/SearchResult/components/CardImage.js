import React from 'react';
import './CardImage.less';

const CardImage = ({ fullImage = false, item = {} }) => {
  return (
    <div
      className={`search-card-image-box ${
        fullImage ? 'search-card-image-full' : ''
      }`}
    >
      <a href={item.url} className="search-card-image-wrap">
        <div className="card-image-content">
          <img
            src={`https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg`}
            alt=""
          />
        </div>
        <div className="card-image-title">{item.title}</div>
        <div className="card-image-desc">{item.desc}</div>
      </a>
    </div>
  );
};

export default CardImage;
