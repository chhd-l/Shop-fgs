import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import newtrcommentone from './img/FeedbackImage1.webp';
import newtrcommenttwo from './img/CommentFour.webp';
import newtrcommentthree from './img/CommentOne.webp';
import newtrcommentFour from './img/FeedbackImage4.jpeg';

import LazyLoad from 'react-lazyload';
import { getDeviceType } from '@/utils/utils';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--next iconfont font-weight-bold icon-direction ui-cursor-pointer`}
      style={{
        ...style,
        right: '-5%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    >
      <span className="iconjiantouyou1 iconfont rc-text-colour--text font-weight-bold ui-cursor-pointer" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--prev icon-direction ui-cursor-pointer`}
      style={{
        ...style,
        left: '-5%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    >
      <span className="iconjiantouzuo1 iconfont rc-text-colour--text font-weight-bold ui-cursor-pointer" />
    </div>
  );
}

const CommentCarouselNew = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    autoplay: true,
    onLazyLoad: true,
    accessibility: true,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-layouts-cardcarousel">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
              <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
                <h3 className="rc-beta" style={{ fontWeight: '550' }}>
                  <FormattedMessage id="ClubLP.OurCustomers.title" />
                </h3>
              </div>
              {/*轮播图*/}
              <Slider {...settings}>
                <div className="rc-carousel__card-gal px-2">
                  <article className="rc-card rc-card--b">
                    <picture className="rc-card__image">
                      <LazyLoad>
                        <img
                          src={newtrcommentone}
                          alt="alt text"
                          style={{
                            borderRadius: '50%',
                            width: '50%',
                            marginTop: '30px',
                            marginBottom: '30px'
                          }}
                        />
                      </LazyLoad>
                    </picture>
                  </article>
                </div>
                <div className="rc-carousel__card-gal px-2">
                  <article className="rc-card rc-card--b">
                    <picture className="rc-card__image">
                      <LazyLoad>
                        <img
                          src={newtrcommenttwo}
                          alt="alt text"
                          style={{
                            borderRadius: '50%',
                            width: '50%',
                            marginTop: '30px',
                            marginBottom: '30px'
                          }}
                        />
                      </LazyLoad>
                    </picture>
                  </article>
                </div>
                <div className="rc-carousel__card-gal px-2">
                  <article className="rc-card rc-card--b">
                    <picture className="rc-card__image">
                      <LazyLoad>
                        <img
                          src={newtrcommentthree}
                          alt="alt text"
                          style={{
                            borderRadius: '50%',
                            width: '50%',
                            marginTop: '30px',
                            marginBottom: '30px'
                          }}
                        />
                      </LazyLoad>
                    </picture>
                  </article>
                </div>
                <div className="rc-carousel__card-gal px-2">
                  <article className="rc-card rc-card--b">
                    <picture className="rc-card__image">
                      <LazyLoad>
                        <img
                          src={newtrcommentFour}
                          alt="alt text"
                          style={{
                            borderRadius: '50%',
                            width: '50%',
                            marginTop: '30px',
                            marginBottom: '30px'
                          }}
                        />
                      </LazyLoad>
                    </picture>
                  </article>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCarouselNew;
