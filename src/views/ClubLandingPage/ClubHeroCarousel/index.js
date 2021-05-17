import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/assets/css/heroCarousel.css';
import './index.less';
import { getBanner } from '@/api/home.js';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Sliderone from './ClubHeroCarouselImg/SliderOne.jpg';
import Slidertwo from './ClubHeroCarouselImg/SliderTwo.png';
import Sliderthree from './ClubHeroCarouselImg/SliderThree.png';
import Sliderfive from './ClubHeroCarouselImg/SliderFive.png';
import Sliderseven from './ClubHeroCarouselImg/SliderSeven.png';
import Slidermobile1 from './ClubHeroCarouselImg/Slidermobile1.png';
import Slidermobile2 from './ClubHeroCarouselImg/Slidermobile2.png';
import Slidermobile3 from './ClubHeroCarouselImg/Slidermobile3.png';
import Slidermobile5 from './ClubHeroCarouselImg/Slidermobile5.png';
import Slidermobile7 from './ClubHeroCarouselImg/Slidermobile7.png';
import trsliderone from './ClubHeroCarouselImg/trsliderone.png';
import trslidertwo from './ClubHeroCarouselImg/trslidertwo.png';
import trsliderthree from './ClubHeroCarouselImg/trsliderthree.png';
import trsliderfive from './ClubHeroCarouselImg/trsliderfive.png';
import trsliderseven from './ClubHeroCarouselImg/trsliderseven.png';

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
    process.env.REACT_APP_COUNTRY == 'RU'
      ? this.setState({
          banner: [
            {
              isShow: true,
              bannerId: '2c91808577d880600177d8837f730004',
              storeId: 123457910,
              bannerName: 'us_002',
              webUrl: `${Sliderone}`,
              webImgName: 'WeChat Image_20210225172634.jpg',
              // webSkipUrl: '/subscription-landing',
              webSkipUrl: '',
              webUuid: 'rc-upload-1614234945878-9',
              mobiUrl: `${Slidermobile1}`,
              mobiImgName: 'WeChat Image_20210225172628.jpg',
              mobiSkipUrl: '/subscription-landing',
              mobiUuid: 'rc-upload-1614234945878-11',
              isMobiVideo: '0',
              isVideo: '0',
              delFlag: 0,
              createTime: '2021-02-26 07:05:24.000',
              updateTime: '2021-02-26 07:05:24.000',
              bannerNo: 1,
              sliderTitle:
                'Специализированное питание по подписке для поддержания здоровья',
              sliderContent: '',
              alt: 'Клуб Royal Canin'
            },
            {
              isShow: true,
              bannerId: '2c91808577d880600177d8837f730004',
              storeId: 123457910,
              bannerName: 'us_002',
              webUrl: `${Slidertwo}`,
              webImgName: 'WeChat Image_20210225172634.jpg',
              webSkipUrl: '',
              webUuid: 'rc-upload-1614234945878-9',
              mobiUrl: `${Slidermobile2}`,
              mobiImgName: 'WeChat Image_20210225172628.jpg',
              mobiSkipUrl: '/subscription-landing',
              mobiUuid: 'rc-upload-1614234945878-11',
              isMobiVideo: '0',
              isVideo: '0',
              delFlag: 0,
              createTime: '2021-02-26 07:05:24.000',
              updateTime: '2021-02-26 07:05:24.000',
              bannerNo: 2,
              sliderTitle: 'Специализированное питание',
              sliderContent:
                'Мы подберем специализированное питание, поддерживающее здоровое развитие Вашего питомца с учетом его особенностей',
              alt: 'Специализированное питание Royal Canin'
            },

            // {
            //   isShow: true,
            //   bannerId: '2c918085751fa3ad01752099f30a0002',
            //   storeId: 123457910,
            //   bannerName: 'us_003',
            //   webUrl: `${Sliderfive}`,
            //   webImgName: 'us_003_a.jpg',
            //   webSkipUrl: '',
            //   webUuid: 'rc-upload-1602569663057-13',
            //   mobiUrl: `${Slidermobile5}`,
            //   mobiImgName: 'us_003_b.jpg',
            //   mobiSkipUrl: '/help',
            //   mobiUuid: 'rc-upload-1602569663057-15',
            //   isMobiVideo: '0',
            //   isVideo: '0',
            //   delFlag: 0,
            //   createTime: '2021-02-24 05:55:42.000',
            //   updateTime: '2021-02-24 05:55:42.000',
            //   bannerNo: 4,
            //   sliderTitle: 'Сделайте свою жизнь проще ',
            //   sliderContent:
            //     'С автоматической доставкой Вы забудете о том, что корм может закончиться.',
            //   alt: 'Доставка корма'
            // },
            {
              isShow: true,
              bannerId: '2c918085751fa3ad01752099f30a0002',
              storeId: 123457910,
              bannerName: 'us_003',
              webUrl: `${Sliderseven}`,
              webImgName: 'us_003_a.jpg',
              webSkipUrl: '',
              webUuid: 'rc-upload-1602569663057-13',
              mobiUrl: `${Slidermobile7}`,
              mobiImgName: 'us_003_b.jpg',
              mobiSkipUrl: '/help',
              mobiUuid: 'rc-upload-1602569663057-15',
              isMobiVideo: '0',
              isVideo: '0',
              delFlag: 0,
              createTime: '2021-02-24 05:55:42.000',
              updateTime: '2021-02-24 05:55:42.000',
              bannerNo: 5,
              sliderTitle: 'Эксклюзивные подарки и сервисы',
              sliderContent:
                'Получайте подарки для поддержания здоровья и активности Вашего питомца, а также пользуйтесь онлайн-консультациями Petstory',
              alt: 'Подарки для питомцев'
            }
            // {
            //   isShow: true,
            //   bannerId: '2c918085751fa3ad01752099f30a0002',
            //   storeId: 123457910,
            //   bannerName: 'us_003',
            //   webUrl: `${Sliderthree}`,
            //   webImgName: 'us_003_a.jpg',
            //   webSkipUrl: '',
            //   webUuid: 'rc-upload-1602569663057-13',
            //   mobiUrl: `${Slidermobile3}`,
            //   mobiImgName: 'us_003_b.jpg',
            //   mobiSkipUrl: '/help',
            //   mobiUuid: 'rc-upload-1602569663057-15',
            //   isMobiVideo: '0',
            //   isVideo: '0',
            //   delFlag: 0,
            //   createTime: '2021-02-24 05:55:42.000',
            //   updateTime: '2021-02-24 05:55:42.000',
            //   bannerNo: 3,
            //   sliderTitle:
            //     'Советы научных сотрудников и экспертов в области питания',
            //   sliderContent:
            //     'Воспользуйтесь услугами персонального помощника Службы Заботы  ежедневно с 9 до 21',
            //   alt: 'Эксперт в области питания животных'
            // }
          ]
        })
      : this.setState({
          banner: [
            {
              isShow: true,
              bannerId: '2c91808577d880600177d8837f730004',
              storeId: 123457910,
              bannerName: 'us_002',
              webUrl: `${trsliderone}`,
              webImgName: 'WeChat Image_20210225172634.jpg',
              webSkipUrl: '',
              webUuid: 'rc-upload-1614234945878-9',
              mobiUrl: `${Slidermobile1}`,
              mobiImgName: 'WeChat Image_20210225172628.jpg',
              mobiSkipUrl: '/subscription-landing',
              mobiUuid: 'rc-upload-1614234945878-11',
              isMobiVideo: '0',
              isVideo: '0',
              delFlag: 0,
              createTime: '2021-02-26 07:05:24.000',
              updateTime: '2021-02-26 07:05:24.000',
              bannerNo: 1,
              sliderTitle:
                'Evcil hayvanınıza tam bir sağlık çözümü sunabilmek için abone olun.',
              sliderContent: ''
            },
            {
              isShow: true,
              bannerId: '2c91808577d880600177d8837f730004',
              storeId: 123457910,
              bannerName: 'us_002',
              webUrl: `${trslidertwo}`,
              webImgName: 'WeChat Image_20210225172634.jpg',
              webSkipUrl: '',
              webUuid: 'rc-upload-1614234945878-9',
              mobiUrl: `${Slidermobile2}`,
              mobiImgName: 'WeChat Image_20210225172628.jpg',
              mobiSkipUrl: '/subscription-landing',
              mobiUuid: 'rc-upload-1614234945878-11',
              isMobiVideo: '0',
              isVideo: '0',
              delFlag: 0,
              createTime: '2021-02-26 07:05:24.000',
              updateTime: '2021-02-26 07:05:24.000',
              bannerNo: 2,
              sliderTitle: 'İhtiyaca göre beslenme',
              sliderContent:
                'Kaliteli besin içeriğine sahip 160 formül arasından evcil hayvanınızın özel ihtiyaçlarına en uygun beslenme çözümünü alın'
            },
            {
              isShow: process.env.REACT_APP_COUNTRY == 'RU' ? false : true,
              bannerId: '2c918085751fa3ad01752099f30a0002',
              storeId: 123457910,
              bannerName: 'us_003',
              webUrl: `${trsliderthree}`,
              webImgName: 'us_003_a.jpg',
              webSkipUrl: '',
              webUuid: 'rc-upload-1602569663057-13',
              mobiUrl: `${Slidermobile3}`,
              mobiImgName: 'us_003_b.jpg',
              mobiSkipUrl: '/help',
              mobiUuid: 'rc-upload-1602569663057-15',
              isMobiVideo: '0',
              isVideo: '0',
              delFlag: 0,
              createTime: '2021-02-24 05:55:42.000',
              updateTime: '2021-02-24 05:55:42.000',
              bannerNo: 3,
              sliderTitle: 'Uzmanlardan bilimsel kaynaklı güvenilir tavsiyeler',
              sliderContent:
                'Sağlıklı yaşam ve ideal bakım için beslenme danışmanınızdan destek alın'
            },
            {
              isShow: true,
              bannerId: '2c918085751fa3ad01752099f30a0002',
              storeId: 123457910,
              bannerName: 'us_003',
              webUrl: `${trsliderfive}`,
              webImgName: 'us_003_a.jpg',
              webSkipUrl: '',
              webUuid: 'rc-upload-1602569663057-13',
              mobiUrl: `${Slidermobile5}`,
              mobiImgName: 'us_003_b.jpg',
              mobiSkipUrl: '/help',
              mobiUuid: 'rc-upload-1602569663057-15',
              isMobiVideo: '0',
              isVideo: '0',
              delFlag: 0,
              createTime: '2021-02-24 05:55:42.000',
              updateTime: '2021-02-24 05:55:42.000',
              bannerNo: 4,
              sliderTitle: 'Mamanız asla bitmesin',
              sliderContent:
                'Kapınıza otomatik gelecek mama gönderimiyle hayatınız kolaylaşsın; teslim takviminizi size en uygun olacak şekilde kendiniz belirleyin.'
            },
            {
              isShow: true,
              bannerId: '2c918085751fa3ad01752099f30a0002',
              storeId: 123457910,
              bannerName: 'us_003',
              webUrl: `${trsliderseven}`,
              webImgName: 'us_003_a.jpg',
              webSkipUrl: '',
              webUuid: 'rc-upload-1602569663057-13',
              mobiUrl: `${Slidermobile7}`,
              mobiImgName: 'us_003_b.jpg',
              mobiSkipUrl: '/help',
              mobiUuid: 'rc-upload-1602569663057-15',
              isMobiVideo: '0',
              isVideo: '0',
              delFlag: 0,
              createTime: '2021-02-24 05:55:42.000',
              updateTime: '2021-02-24 05:55:42.000',
              bannerNo: 5,
              sliderTitle: 'Özel hediyeler ve hizmetler',
              sliderContent:
                'Aboneliğiniz boyunca evcil hayvanınızın sağlığını ve aktivitelerini en iyi şekilde destekleyecek hediyeler alın, online danışmanlık hizmetlerine erişin.'
            }
          ]
        });
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
  //点击滑到HowItWorks
  scrollToHowItWorks = () => {
    const widegt = document.querySelector('#how-it-works-box-inner');
    widegt && widegt.scrollIntoView();
  };

  render() {
    const { banner } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: process.env.REACT_APP_COUNTRY == 'DE' ? true : false,
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
                <img
                  className="w-100 mh-100"
                  src={el.mobiUrl}
                  alt="banner video"
                />
              </Link>
            ) : (
              <img
                className="w-100 mh-100"
                src={el.mobiUrl}
                alt="banner video"
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
              <>
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
                              alt={el.alt}
                            />
                            {/*<div>{el.bannerNo}</div>*/}
                          </Link>
                        ) : (
                          <span
                            className="h-100 rc-styled-link"
                            onClick={this.scrollToHowItWorks}
                          >
                            <img
                              className="rc-md-up mh-100"
                              src={el.webUrl}
                              alt={el.alt}
                            />
                            {/*<div>{el.bannerNo}</div>*/}
                          </span>
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
                              alt={el.alt}
                            />
                          </Link>
                        ) : (
                          <img
                            className="rc-md-down w-100 mh-100"
                            src={el.mobiUrl}
                            alt={el.alt}
                          />
                        )}
                      </>
                    )}
                  </div>
                  <div className="experience-component experience-layouts-1to2columnRatio indexmobile">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                      <div className="rc-max-width--md text-center rc-margin-y--md">
                        <div className="rc-alpha inherit-fontsize">
                          <h1>{el.sliderTitle}</h1>
                        </div>
                        <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                          <p>{el.sliderContent}</p>
                        </div>
                        <br />
                        {process.env.REACT_APP_COUNTRY == 'RU' ? (
                          <button className="rc-btn rc-btn--one">
                            Узнать больше
                          </button>
                        ) : (
                          <button className="rc-btn rc-btn--one">Keşfet</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </Slider>
        </div>
      )
    );
  }
}

export default ClubHeroCarousel;
