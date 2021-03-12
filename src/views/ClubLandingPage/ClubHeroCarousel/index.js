import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/assets/css/heroCarousel.css';
import './index.less';
import { getBanner } from '@/api/home.js';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Sliderone from './ClubHeroCarouselImg/SliderOne.png'
import Slidertwo from './ClubHeroCarouselImg/SliderTwo.png'
import Sliderthree from './ClubHeroCarouselImg/SliderThree.png'
import Sliderfive from './ClubHeroCarouselImg/SliderFive.png'
import Sliderseven from './ClubHeroCarouselImg/SliderSeven.png'
import Slidermobile1 from './ClubHeroCarouselImg/Slidermobile1.png'
import Slidermobile2 from './ClubHeroCarouselImg/Slidermobile2.png'
import Slidermobile3 from './ClubHeroCarouselImg/Slidermobile3.png'
import Slidermobile5 from './ClubHeroCarouselImg/Slidermobile5.png'
import Slidermobile7 from './ClubHeroCarouselImg/Slidermobile7.png'



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

class ClubHeroCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: []
    };
    this.GABannerClick = this.GABannerClick.bind(this);
  }
  componentDidMount() {
    // getBanner().then((res) => {
    //   console.log(res.context,'🌙🌙🌙');
      this.setState({ banner: [{"bannerId":"2c91808577d880600177d8837f730004","storeId":123457910,"bannerName":"us_002","webUrl":`${Sliderone}`,"webImgName":"WeChat Image_20210225172634.jpg","webSkipUrl":"/subscription-landing","webUuid":"rc-upload-1614234945878-9","mobiUrl":`${Slidermobile1}`,"mobiImgName":"WeChat Image_20210225172628.jpg","mobiSkipUrl":"/subscription-landing","mobiUuid":"rc-upload-1614234945878-11","isMobiVideo":"0","isVideo":"0","delFlag":0,"createTime":"2021-02-26 07:05:24.000","updateTime":"2021-02-26 07:05:24.000","bannerNo":1,"sliderTitle":"GIVE YOUR PET A COMPLETE HEALTH SOLUTION, BY SUBSCRIPTION","sliderContent":""}
      ,{"bannerId":"2c91808577d880600177d8837f730004","storeId":123457910,"bannerName":"us_002","webUrl":`${Slidertwo}`,"webImgName":"WeChat Image_20210225172634.jpg","webSkipUrl":"/subscription-landing","webUuid":"rc-upload-1614234945878-9","mobiUrl":`${Slidermobile2}`,"mobiImgName":"WeChat Image_20210225172628.jpg","mobiSkipUrl":"/subscription-landing","mobiUuid":"rc-upload-1614234945878-11","isMobiVideo":"0","isVideo":"0","delFlag":0,"createTime":"2021-02-26 07:05:24.000","updateTime":"2021-02-26 07:05:24.000","bannerNo":2,"sliderTitle":"Tailor-made nutrition","sliderContent":"Get the right diet from 210 formulas with premium ingredients to fit your pet's unique health needs"},
          {"bannerId":"2c918085751fa3ad01752099f30a0002","storeId":123457910,"bannerName":"us_003","webUrl":`${Sliderthree}`,"webImgName":"us_003_a.jpg","webSkipUrl":"/help","webUuid":"rc-upload-1602569663057-13","mobiUrl":`${Slidermobile3}`,"mobiImgName":"us_003_b.jpg","mobiSkipUrl":"/help","mobiUuid":"rc-upload-1602569663057-15","isMobiVideo":"0","isVideo":"0","delFlag":0,"createTime":"2021-02-24 05:55:42.000","updateTime":"2021-02-24 05:55:42.000","bannerNo":3,"sliderTitle":"Trusted advice from science and experts","sliderContent":"Get the right diet from 210 formulas with premium ingredients to fit your pet's unique health needs"}
          ,{"bannerId":"2c918085751fa3ad01752099f30a0002","storeId":123457910,"bannerName":"us_003","webUrl":`${Sliderfive}`,"webImgName":"us_003_a.jpg","webSkipUrl":"/help","webUuid":"rc-upload-1602569663057-13","mobiUrl":`${Slidermobile5}`,"mobiImgName":"us_003_b.jpg","mobiSkipUrl":"/help","mobiUuid":"rc-upload-1602569663057-15","isMobiVideo":"0","isVideo":"0","delFlag":0,"createTime":"2021-02-24 05:55:42.000","updateTime":"2021-02-24 05:55:42.000","bannerNo":4,"sliderTitle":"Never run out of pet food","sliderContent":"Make your life easier with automatic refills to your door, and keep control of your delivery schedule to fit your needs."}
          ,{"bannerId":"2c918085751fa3ad01752099f30a0002","storeId":123457910,"bannerName":"us_003","webUrl":`${Sliderseven}`,"webImgName":"us_003_a.jpg","webSkipUrl":"/help","webUuid":"rc-upload-1602569663057-13","mobiUrl":`${Slidermobile7}`,"mobiImgName":"us_003_b.jpg","mobiSkipUrl":"/help","mobiUuid":"rc-upload-1602569663057-15","isMobiVideo":"0","isVideo":"0","delFlag":0,"createTime":"2021-02-24 05:55:42.000","updateTime":"2021-02-24 05:55:42.000","bannerNo":5,"sliderTitle":"Exclusive rewards and services","sliderContent":"Receive gifts that support your pet's wellbeing and activity throughout your subscription, and have access to online consultations."}
          ] });
    }
  //   );
  // }
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
              <Link
                className="h-100 mobileBanner"
                onClick={this.GABannerClick.bind(this, i)}
                to={el.mobiSkipUrl}
              >
                <img className="w-100 mh-100" src={el.mobiUrl} alt="" />
              </Link>
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
              <Link
                className="rc-btn rc-btn--one gtm-hero-carousel-btn font-16 rc-text-colour--brand3"
                to={el.mobiSkipUrl}
                onClick={this.GABannerClick.bind(this, i)}
              >
                <FormattedMessage id="header.toBegin" />
              </Link>
            </div>
          </div>
        </>
      );
    };

    return (
      banner.length > 0 && (
        <div>
        <Slider {...settings}>
          {banner.map((el, i) => (
            <div className="hero-carousel__slide" key={i}>
              <div className="d-md-flex flex-wrap justify-content-center align-items-center hero-carousel__slide__inner hero-carousel__slide__inner-custom">
                {el.isVideo && el.isVideo === '1' ? (
                  videoJSX(el, i)
                ) : (
                  <>
                    {el.webSkipUrl ? (
                      <Link
                        className="h-100"
                        to={el.webSkipUrl}
                        onClick={this.GABannerClick.bind(this, i)}
                      >
                        <img
                          className="rc-md-up mh-100"
                          src={el.webUrl}
                          alt=""
                        />
                        <div>{el.bannerNo}</div>
                      </Link>
                    ) : (
                      <img className="rc-md-up mh-100" src={el.webUrl} alt="" />
                    )}

                    {el.mobiSkipUrl ? (
                      <Link
                        className="h-100"
                        to={el.mobiSkipUrl}
                        onClick={this.GABannerClick.bind(this, i)}
                      >
                        <img
                          className="rc-md-down w-100 mh-100"
                          src={el.mobiUrl}
                          alt=""
                        />
                      </Link>
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
              <div className='experience-component experience-layouts-1to2columnRatio indexmobile'>
                <div className='rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile'>
                  <div className="rc-max-width--md text-center rc-margin-y--md">
                    <div className="rc-alpha inherit-fontsize"><h1>{el.sliderTitle}</h1></div>
                    <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                      <p>{el.sliderContent}</p>
                    </div>
                    <br/>
                    <button className="rc-btn rc-btn--one">Learn more</button>
                  </div>
                </div>
              </div>
            </div>

          ))}
        </Slider>

        </div>
      )
    );
  }
}

export default ClubHeroCarousel;
