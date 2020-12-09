import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/assets/css/heroCarousel.css';
import './index.less';
import { getBanner } from '@/api/home.js';
import indeximage1 from './image/indexmobile1.png'
import indeximage2 from './image/indexmobile2.png'
import indeximage3 from './image/indexmobile3.png'

class HeroCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: []
    };
  }
  componentDidMount() {
    getBanner().then((res) => {
      this.setState({ banner: res.context });
    });
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      pauseOnHover: true,
      lazyLoad: true,
      adaptiveHeight: true,
      dotsClass: 'dots-custom'
    };

    return (
      // <div className="hero-carousel with-shadow">
      //   <div className="rc-max-width--xl">
      //     <Slider {...settings}>
      //       {this.state.banner.map((el, i) => (
      //         <div
      //           className="hero-carousel__slide"
      //           key={i}
      //           style={{ position: 'relative' }}
      //         >
      //           <div className="d-md-flex flex-wrap justify-content-center align-items-center hero-carousel__slide__inner hero-carousel__slide__inner-custom">
      //             (
      //             {
      //               <span className="h-100">
      //                 <a  href='/product-finder'>
      //                 <img
      //                   className="rc-md-down w-100"
      //                   src={el.mobiUrl}
      //                   style={{ maxHeight: '100%' }}
      //                   alt={i}
      //                 />
      //                 </a>
      //               </span>
      //             }
      //           </div>
      //         </div>
      //       ))}
      //     </Slider>
      //   </div>
      // </div>
      <div data-js-carousel="" className="rc-carousel rc-carousel--hero">
        <div className="rc-hero rc-hero__layout--3" data-thumb="interactive--pager">
          <div className="rc-hero__fg">
            <div className="rc-hero__section rc-hero__section--img">
              <a href="product-finder"><img src={indeximage1}/></a>
            </div>
          </div>
        </div>
        <div className="rc-hero rc-hero__layout--3" data-thumb="interactive--pager">
          <div className="rc-hero__fg">
            <div className="rc-hero__section rc-hero__section--img">
              <a href="packmixfeedingwetdry"><img src={indeximage2}/></a>
            </div>
          </div>
        </div>
        <div className="rc-hero rc-hero__layout--3" data-thumb="interactive--pager">
          <div className="rc-hero__fg">
            <div className="rc-hero__section rc-hero__section--img">
              <img src={indeximage3}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeroCarousel;
