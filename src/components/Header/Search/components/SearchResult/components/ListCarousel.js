import React, { useRef } from 'react';
import Slider from 'react-slick';
import CardImage from './CardImage';

import './ListCarousel.less';

const pcSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 840,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    }
  ]
};

const mobileSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: false,
  initialSlide: 0,
  centerMode: false,
  variableWidth: true
};

const ListCarousel = ({ title = '', total = '', list = [], onViewMore }) => {
  const sliderRef = useRef();

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const renderList = () => {
    if (list.length === 0) {
      return <div className="list-carousel-empty">No results</div>;
    }

    return (
      <div className="list-carousel-list">
        <div
          className="carousel-arrow-prev iconfont iconjiantouyou1"
          onClick={handlePrev}
        />
        <Slider ref={(ref) => (sliderRef.current = ref)} {...settings}>
          {list.map((item, index) => {
            if (index > 11) {
              return null;
            }
            return <CardImage item={item} key={index} />;
          })}
        </Slider>
        <div
          className="carousel-arrow-next iconfont iconjiantouyou1"
          onClick={handleNext}
        />
      </div>
    );
  };

  const renderMoreAction = () => {
    if (list.length <= 3) {
      return null;
    }
    return (
      <div className="list-carousel-actions" onClick={() => onViewMore?.()}>
        {`View more (${total})`}
      </div>
    );
  };

  const settings = window.innerWidth > 640 ? pcSettings : mobileSettings;

  return (
    <div className="search-list-carousel-box">
      <div className="list-carousel-title">{title}</div>
      {renderList()}
      {renderMoreAction()}
    </div>
  );
};

export default ListCarousel;
