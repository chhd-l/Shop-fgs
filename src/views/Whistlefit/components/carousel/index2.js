import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/assets/css/heroCarousel.css';
import './index2.less';
import { getBanner } from '@/api/home.js';
import { FormattedMessage } from 'react-intl-phraseapp';
import { stgShowAuth } from '@/utils/utils';
import carousel1 from '../../images/carousel1.png';
import Shape01 from '../../images/Shape01.png';
import Shape02 from '../../images/Shape02.png';

function SamplePrevOrNextArrow(props) {
  const { className, style, onClick, type } = props;
  return (
    <div
      className={`${className} invisible absolute top-1/2 d-none d-md-block rc-carousel__direction iconfont font-weight-bold icon-direction ui-cursor-pointer`}
      style={{
        ...style,
        zIndex: 1,
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    >
      {type === 'prev' ? <span>&#xe6fa;</span> : <span>&#xe6f9;</span>}
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
  }
  render() {
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
      nextArrow: (
        <SamplePrevOrNextArrow
          className="rc-carousel__direction--next"
          style={{ right: '3%' }}
          type="next"
        />
      ),
      prevArrow: (
        <SamplePrevOrNextArrow
          className="rc-carousel__direction--prev"
          style={{ left: '3%' }}
          type="prev"
        />
      ),
      dotsClass: 'dots-custom',
      afterChange: (idx) => {
        //this.GABannerImpression(idx);
      }
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
