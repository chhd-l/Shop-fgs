import React from 'react';
import './index.less';

type SlickProps = {
  slickList: {
    desc: string;
    label: string;
    path: string;
  }[];
};
const Slick = ({ slickList }: SlickProps) => {
  return (
    <div className="rc-carousel rc-carousel--a rc-carousel--nav-center">
      <div className="rc-carousel__section">
        <div className="rc-carousel__slides">
          {slickList.map((item, index) => (
            <div className="rc-carousel__slide" key={index}>
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
          {slickList.map((item, index) => (
            <div key={index}>
              <img src={item.path} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slick;
