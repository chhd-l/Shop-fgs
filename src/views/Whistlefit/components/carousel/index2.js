import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/assets/css/heroCarousel.css';
import './index2.less';
import { getBanner } from '@/api/home.js';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import { stgShowAuth, optimizeImage } from '@/utils/utils';
import carousel1 from '../../images/carousel1.png';
import Shape01 from '../../images/Shape01.png';
import Shape02 from '../../images/Shape02.png';

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
      className={`${className} invisible d-none d-md-block rc-carousel__direction rc-carousel__direction--next iconfont font-weight-bold icon-direction ui-cursor-pointer`}
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
      className={`${className} invisible d-none d-md-block rc-carousel__direction rc-carousel__direction--prev iconfont font-weight-bold icon-direction ui-cursor-pointer`}
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
      banner: [],
      list1: [
        {
          img: carousel1,
          alt: carousel1,
          title: `"Cela m'a aidé à suivre son niveau d’activité quotidienne. Elle
          a perdu le poids recommandé par le vétérinaire. Je recommande
          définitivement Whistle Fit à mes amis et à ma famille »`,
          author: `— Fabiola S.Propriétaire de chien`
        },
        {
          img: carousel1,
          alt: carousel1,
          title: `"Cela m'a aidé à suivre son niveau d’activité quotidienne. Elle
          a perdu le poids recommandé par le vétérinaire. Je recommande
          définitivement Whistle Fit à mes amis et à ma famille »`,
          author: `— Charles V.Propriétaire de chien`
        },
        {
          img: carousel1,
          alt: carousel1,
          title: `"Suivez non seulement son activité, mais aussi ses habitudes de
          sommeil et sa consommation d’eau. Nous adorons l'application -
          elle est très simple à prendre en main. En plus d’être un
          excellent produit, le service client de Whistle est fantastique
          !`,
          author: `— Laura P.Propriétaire de chien`
        }
      ]
    };
    // this.GABannerClick = this.GABannerClick.bind(this);
  }
  componentDidMount() {
    getBanner().then((res) => {
      let bannerList = stgShowAuth()
        ? res.context
        : res.context.filter(
            (el) => el.webSkipUrl !== '/precise-cat-nutrition'
          );
      this.setState({
        banner: bannerList.map((ele) => {
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
    window?.dataLayer?.push({
      event: 'homepageCarousselDisplay',
      slideName: cur_banner.bannerName,
      slidePosition: idx
    });
    // dataLayer.push({
    //   event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComPromotionImpression`,
    //   ecommerce: {
    //     promoClick: {
    //       promotions: [
    //         {
    //           id: cur_banner.bannerId, // Name or ID is required
    //           name: cur_banner.bannerName,
    //           creative: cur_banner.bannerName,
    //           position: idx
    //         }
    //       ]
    //     }
    //   }
    // });
  }
  // 点击banner跳转时触发
  GABannerClick(idx) {
    const cur_banner = this.state.banner[idx];
    window?.dataLayer?.push({
      event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComPromotionClick`,
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
      autoplay: ['de', 'ru', 'fr'].includes(window.__.env.REACT_APP_COUNTRY),
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
            <video autoPlay={true} muted={true} loop={true}>
              <source src={el.webUrl} type="video/mp4" />
            </video>
            {el.mobiSkipUrl ? (
              <ATagContainer
                className="h-100 mobileBanner"
                // onClick={this.GABannerClick.bind(this, i)}
                to={el.mobiSkipUrl}
                href={el.mobiSkipUrl}
                isOuterLink={el.isOuterLinkForMobile}
              >
                <img
                  className="w-100 mh-100"
                  src={optimizeImage(el.mobiUrl, 440)}
                  alt="heroCarousel banner"
                />
              </ATagContainer>
            ) : (
              <img
                className="w-100 mh-100"
                src={optimizeImage(el.mobiUrl, 440)}
                alt="heroCarousel banner"
              />
            )}
          </div>
          <div className="hero-carousel__slide__content">
            <div className="rc-gamma inherit-fontsize">
              <div style={{ lineHeight: 1.2 }}>
                <FormattedMessage id="header.carouselInfo1" />
              </div>
            </div>
            <div className="rc-body inherit-fontsize">
              <FormattedMessage id="header.carouselInfo2" />
            </div>
            <div className="hero-carousel__slide__content__btn text-center">
              <ATagContainer
                className="rc-btn rc-btn--one gtm-hero-carousel-btn font-16 rc-text-colour--brand3"
                href={el.mobiSkipUrl}
                to={el.mobiSkipUrl}
                // onClick={this.GABannerClick.bind(this, i)}
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
      <>
        <Slider {...settings}>
          {this.state.list1.map((item, index) => {
            return (
              <div className="flex flex-col md:flex-row" key={index}>
                <div className="w-full md:w-1/2">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="h-18 p-10 md:p-0 pt-0"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col ml-0 md:ml-10  md:mr-20 p-10 pt-0 md:pl-10">
                  <img
                    src={Shape01}
                    alt="Shape01"
                    className="w-10 md:w-16 mb-3"
                  />
                  <div className="md:leading-17.5 text-16 md:text-24">
                    {item.title}
                  </div>
                  <div className="flex justify-between mt-3">
                    <div className="flex flex-col items-center">
                      <div
                        style={{ color: '#E2001A' }}
                        className="font-normal text-16 md:text-20"
                      >
                        {item.author}
                      </div>
                    </div>
                    <img src={Shape02} alt="Shape02" className="w-10 md:w-16" />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
        {/* 不要删除，seo用 */}
        <h1 style={{ display: 'none' }}>
          <FormattedMessage id="header.carouselInfo1" />
        </h1>
      </>
    );
  }
}

export default HeroCarousel;
