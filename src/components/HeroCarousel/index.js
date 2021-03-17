import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/assets/css/heroCarousel.css';
import './index.less';
import { getBanner } from '@/api/home.js';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

function ATagContainer({
  children,
  href,
  to,
  isOuterLink,
  className,
  onClick
}) {
  return isOuterLink ? (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--next iconfont font-weight-bold icon-direction ui-cursor-pointer`}
      style={{
        ...style,
        right: '3%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    >
      &#xe6f9;
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--prev iconfont font-weight-bold icon-direction ui-cursor-pointer`}
      style={{
        ...style,
        left: '3%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    >
      &#xe6fa;
    </div>
  );
}

class HeroCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: []
    };
    this.GABannerClick = this.GABannerClick.bind(this);
  }
  componentDidMount() {
    getBanner().then((res) => {
      this.setState({
        banner: res.context.map((ele) => {
          return Object.assign(ele, {
            isOuterLinkForMobile: /^[http|https]/.test(ele.mobiSkipUrl),
            isOuterLinkForPC: /^[http|https]/.test(ele.webSkipUrl)
          });
        })
      });
    });
  }
  // 切换slider触发
  GABannerImpression(idx) {
    const cur_banner = this.state.banner[idx];
    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComPromotionImpression`,
      ecommerce: {
        promoClick: {
          promotions: [
            {
              id: cur_banner.bannerId, // Name or ID is required
              name: cur_banner.bannerName,
              creative: cur_banner.bannerName,
              position: idx
            }
          ]
        }
      }
    });
  }
  // 点击banner跳转时触发
  GABannerClick(idx) {
    const cur_banner = this.state.banner[idx];
    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComPromotionClick`,
      ecommerce: {
        promoClick: {
          promotions: [
            {
              id: cur_banner.bannerId, // Name or ID is required
              name: cur_banner.bannerName,
              creative: cur_banner.bannerName,
              position: idx
            }
          ]
        }
      }
    });
  }
  render() {
    const { banner } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: process.env.REACT_APP_LANG == 'de' ? true : false,
      pauseOnHover: true,
      lazyLoad: true,
      adaptiveHeight: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      dotsClass: 'dots-custom',
      afterChange: (idx) => {
        this.GABannerImpression(idx);
      }
    };

    const videoJSX = (el, i) => {
      return (
        <>
          <div className="hero-carousel__slide__video">
            <video autoPlay={true} muted={true} loop={true} id="myVideo">
              <source src={el.webUrl} type="video/mp4" />
            </video>
            {el.mobiSkipUrl ? (
              <ATagContainer
                className="h-100 mobileBanner"
                onClick={this.GABannerClick.bind(this, i)}
                to={el.mobiSkipUrl}
                href={el.mobiSkipUrl}
                isOuterLink={el.isOuterLinkForMobile}
              >
                <img className="w-100 mh-100" src={el.mobiUrl} alt="" />
              </ATagContainer>
            ) : (
              <img className="w-100 mh-100" src={el.mobiUrl} alt="" />
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
              <ATagContainer
                className="rc-btn rc-btn--one gtm-hero-carousel-btn font-16 rc-text-colour--brand3"
                href={el.mobiSkipUrl}
                to={el.mobiSkipUrl}
                onClick={this.GABannerClick.bind(this, i)}
                isOuterLink={el.isOuterLinkForMobile}
              >
                <FormattedMessage id="header.toBegin" />
              </ATagContainer>
            </div>
          </div>
        </>
      );
    };

    return (
      banner.length > 0 && (
        <Slider {...settings}>
          {banner.map((el, i) => (
            <div className="hero-carousel__slide" key={i}>
              <div className="d-md-flex flex-wrap justify-content-center align-items-center hero-carousel__slide__inner hero-carousel__slide__inner-custom">
                {el.isVideo && el.isVideo === '1' ? (
                  videoJSX(el, i)
                ) : (
                  <>
                    {el.webSkipUrl ? (
                      <ATagContainer
                        className="h-100"
                        to={el.webSkipUrl}
                        href={el.webSkipUrl}
                        isOuterLink={el.isOuterLinkForPC}
                        onClick={this.GABannerClick.bind(this, i)}
                      >
                        <img
                          className="rc-md-up mh-100"
                          src={el.webUrl}
                          alt=""
                        />
                      </ATagContainer>
                    ) : (
                      <img className="rc-md-up mh-100" src={el.webUrl} alt="" />
                    )}

                    {el.mobiSkipUrl ? (
                      <ATagContainer
                        className="h-100"
                        to={el.mobiSkipUrl}
                        href={el.mobiSkipUrl}
                        isOuterLink={el.isOuterLinkForMobile}
                        onClick={this.GABannerClick.bind(this, i)}
                      >
                        <img
                          className="rc-md-down w-100 mh-100"
                          src={el.mobiUrl}
                          alt=""
                        />
                      </ATagContainer>
                    ) : (
                      <img
                        className="rc-md-down w-100 mh-100"
                        src={el.mobiUrl}
                        alt=""
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </Slider>
      )
    );
  }
}

export default HeroCarousel;
