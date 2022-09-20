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
          <img src={item.img} alt="" />
        </div>
        <div className="card-image-title">{item.title}</div>
        <div className="card-image-desc">{item.desc}</div>
      </a>
    </div>
  );
};

export default CardImage;
