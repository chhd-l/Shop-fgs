import React from 'react';
import { slickList } from '../../Sustainability/mock';
import './index.less';

const Slick = () => {
  return (
    <div className="rc-carousel rc-carousel--a rc-carousel--nav-center">
      <div className="rc-carousel__section">
        <div className="rc-carousel__slides">
          {slickList.map((item) => (
            <div className="rc-carousel__slide" key={item.desc}>
              <div className="rc-carousel__slide-anim-wrap">
                <h2 className="rc-carousel__slide-title rc-beta">
                  {item.desc}
                </h2>
              </div>
              <div className="rc-carousel__slide-anim-wrap">
                <p className="rc-carousel__slide-desc">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rc-carousel__section">
        <div data-js-carousel="" data-has-slides="true">
          {slickList.map((item) => (
            <div key={item.path}>
              <img src={item.path} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slick;
