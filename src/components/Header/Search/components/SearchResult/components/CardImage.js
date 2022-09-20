import React from 'react';
import './CardImage.less';

const CardImage = () => {
  return (
    <div className="search-card-image-box">
      <a className="search-card-image-wrap">
        <div className="card-image-content">
          <img
            src="https://d2cstgstorage.z13.web.core.windows.net/202102240856559776.jpg"
            alt=""
          />
        </div>
        <div className="card-image-title">
          Display the number of results with parenthesis
        </div>
        <div className="card-image-desc">Puppy</div>
      </a>
    </div>
  );
};

export default CardImage;
