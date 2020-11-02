import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/assets/css/heroCarousel.css';
import './index.less';
import { getBanner } from '@/api/home.js';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--next rc-btn rc-btn--icon rc-icon rc-interactive rc-right rc-iconography`}
      style={{
        ...style,
        right: '3%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--prev rc-btn rc-btn--icon rc-icon rc-interactive rc-left rc-iconography`}
      style={{
        ...style,
        left: '3%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    />
  );
}

class HeroCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeVisible: true,
      banner: []
    };
    this.hanldeClick = this.hanldeClick.bind(this);
    this.hideNotice = this.hideNotice.bind(this);
  }
  async UNSAFE_componentWillMount() {
    getBanner().then((res) => {
      this.setState({ banner: res.context });
    });
  }
  hideNotice() {
    this.setState({
      noticeVisible: false
    });
  }
  hanldeClick() {
    const { history } = this.props;
    history.push('/list/keywords');
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true,
      lazyLoad: true,
      adaptiveHeight: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      dotsClass: 'dots-custom'
    };
    const videoJSX = (el) => {
      return (
        <>
          <div className="hero-carousel__slide__video">
            <video autoPlay={true} muted={true} loop={true} id="myVideo">
              <source src={el.webUrl} type="video/mp4" />
            </video>
            {el.mobiSkipUrl ? (
              <a className="h-100 mobileBanner" href={el.mobiSkipUrl}>
                <img
                  className="w-100"
                  src={el.mobiUrl}
                  style={{ maxHeight: '100%' }}
                  alt=""
                />
              </a>
            ) : (
              <img
                className="w-100"
                src={el.mobiUrl}
                style={{ maxHeight: '100%' }}
                alt=""
              />
            )}
          </div>
          <div className="hero-carousel__slide__content">
            <div className="rc-gamma inherit-fontsize">
              <h1>
                <FormattedMessage id="header.carouselInfo1" />
              </h1>
            </div>
            <div className="rc-body inherit-fontsize">
              <FormattedMessage id="header.carouselInfo2" />
            </div>
            <div className="hero-carousel__slide__content__btn text-center">
              <Link
                className="rc-btn rc-btn--one gtm-hero-carousel-btn font-16 rc-text-colour--brand3"
                to={`/list/keywords`}
              >
                <FormattedMessage id="header.toBegin" />
              </Link>
            </div>
          </div>
        </>
      );
    };

    return (
      <div className="hero-carousel with-shadow">
        <div className="rc-max-width--xl">
          <Slider {...settings}>
            {this.state.banner.map((el, i) => (
              <div className="hero-carousel__slide" key={i}>
                <div className="d-md-flex flex-wrap justify-content-center align-items-center hero-carousel__slide__inner hero-carousel__slide__inner-custom">
                  {el.isVideo && el.isVideo === '1' ? (
                    videoJSX(el)
                  ) : (
                    <>
                      {el.webSkipUrl ? (
                        <a className="h-100" href={el.webSkipUrl}>
                          <img
                            className="rc-md-up"
                            src={el.webUrl}
                            style={{ maxHeight: '100%' }}
                            alt=""
                          />
                        </a>
                      ) : (
                        <img
                          className="rc-md-up"
                          src={el.webUrl}
                          style={{ maxHeight: '100%' }}
                          alt=""
                        />
                      )}

                      {el.mobiSkipUrl ? (
                        <a className="h-100" href={el.mobiSkipUrl}>
                          <img
                            className="rc-md-down w-100"
                            src={el.mobiUrl}
                            style={{ maxHeight: '100%' }}
                            alt=""
                          />
                        </a>
                      ) : (
                        <img
                          className="rc-md-down w-100"
                          src={el.mobiUrl}
                          style={{ maxHeight: '100%' }}
                          alt=""
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default HeroCarousel;
