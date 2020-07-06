<<<<<<< .mine
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/assets/css/heroCarousel.css'
import Banner_Horizontal_Hot_Sale from "@/assets/images/Banner_Horizontal_Hot_Sale.jpg";
import Pomotion25offImg from "@/assets/images/pomotion_25off.png";
import Banner_recommend_item from "@/assets/images/Banner_recommend_item.jpg";
import './index.less'

function SampleNextArrow (props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--next rc-btn rc-btn--icon rc-icon rc-interactive rc-right rc-iconography`}
      style={{ ...style, right: '3%', zIndex: 1, top: '50%', position: 'absolute', transform: 'translateY(-50%)' }}
      onClick={onClick} />
  );
}

function SamplePrevArrow (props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--prev rc-btn rc-btn--icon rc-icon rc-interactive rc-left rc-iconography`}
      style={{ ...style, left: '3%', zIndex: 1, top: '50%', position: 'absolute', transform: 'translateY(-50%)' }}
      onClick={onClick} />
  );
}

class HeroCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeVisible: true
    }
    this.hanldeClick = this.hanldeClick.bind(this)
    this.hideNotice = this.hideNotice.bind(this)
  }
  hideNotice () {
    this.setState({
      noticeVisible: false
    })
  }
  hanldeClick () {
    const { history } = this.props;
    history.push("/list/keywords");
  }
  render () {
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
      dotsClass: "dots-custom"
    };
    return (
      <div className="hero-carousel with-shadow">
        <div className="rc-max-width--xl">
          {
            this.state.noticeVisible
              ? <div className="red font-weight-normal p-1 position-relative text-center pr-4 pl-4" style={{ background: '#f6f6f6' }}>
                <span
                  className="rc-icon rc-close--xs rc-iconography searchBtnToggle rc-stick-right rc-vertical-align"
                  style={{ transform: 'translateY(-40%)' }} onClick={this.hideNotice}></span>
                {/* <div className="text-center" style={{ fontSize: '1.15em' }}>
                  <span className="pr-2 pl-2" style={{ background: '#ec001a', color: '#fff', borderRadius: '.3rem' }}>25% OFF</span> Hasta el 1ero de Junio 2020 o agotar existencias
                </div> */}
                <FormattedMessage id="home.note1" />&nbsp;
                <FormattedMessage id="home.note2" />
              </div>
              : null
          }

          <Slider {...settings}>
            {/* <div className="hero-carousel__slide">
              <div className="d-md-flex align-items-center hero-carousel__slide__inner hero-carousel__slide__inner-custom">
                <img src={Banner_Horizontal_Hot_Sale} className="rc-md-up" />
                <span className="btn-cheat-md-down" onClick={this.hanldeClick}></span>
                <span className="btn-cheat-md-up" onClick={this.hanldeClick}></span>
                <img src={Pomotion25offImg} className="rc-md-down" />
              </div>
            </div> */}
            <div className="hero-carousel__slide">
              <div className="d-md-flex flex-wrap justify-content-center align-items-center hero-carousel__slide__inner hero-carousel__slide__inner-custom">
                <img
                  src={Banner_recommend_item}
                  style={{ maxHeight: '100%' }} />
                <span className="rc-md-up btn-cheat">
                  <Link
                    to="/details/8a80808671d968b10171e6d2ba8c0016"
                    className="rc-btn rc-btn--one gtm-hero-carousel-btn font-16">
                    <FormattedMessage id="header.toOrder" />
                  </Link>
                </span>
                <div className="hero-carousel__slide__text text-center d-md-flex align-items-center rc-md-down">
                  <div className="hero-carousel__slide__text__inner rc-padding-x--lg--mobile">
                    <div className="rc-delta inherit-fontsize children-nomargin">
                    </div>
                    <div className="rc-hero__description rc-body inherit-fontsize children-nomargin">
                    </div>
                    <Link
                      to="/details/8a80808671d968b10171e6d2ba8c0016"
                      className="rc-btn rc-btn--one gtm-hero-carousel-btn font-16">
                      <FormattedMessage id="header.toOrder" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-carousel__slide">
              <div className="d-flex align-items-center hero-carousel__slide__inner flex-column-reverse flex-column flex-md-row">
                <div className="hero-carousel__slide__video">
                  <img
                    src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw994156b8/homepage/01_Slider_img_Mobile@2x.jpg?sw=414&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw994156b8/homepage/01_Slider_img_Mobile@2x.jpg?sw=414&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw994156b8/homepage/01_Slider_img_Mobile@2x.jpg?sw=828&amp;sfrm=png 2x"
                    alt="cat and dog mobile hero image"
                    title="cat and dog mobile hero image" />
                  <video autoPlay={true} muted={true} loop={true} id="myVideo" poster="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw92b314b6/homepage/01_Slider_img_Desktop.jpg?sw=1400&amp;sfrm=png">
                    <source src="https://www.shop.royal-canin.ru/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw346c3179/homepage/Home page video_7s.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="hero-carousel__slide__content">
                  <div className="rc-gamma inherit-fontsize">
                    <h1><FormattedMessage id="header.carouselInfo1" /></h1>
                  </div>
                  <div className="rc-margin-bottom--sm rc-body inherit-fontsize">
                    <p><FormattedMessage id="header.carouselInfo2" /></p>
                  </div>
                  <div className="hero-carousel__slide__content__btn text-center">
                    <a className="rc-btn rc-btn--one gtm-hero-carousel-btn font-16" style={{ color: '#fff' }} onClick={this.hanldeClick}><FormattedMessage id="header.toBegin" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-carousel__slide">
              <div className="d-md-flex align-items-center hero-carousel__slide__inner">
                <div className="hero-carousel__slide__img" style={{ background: 'url(https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=1020&amp;sfrm=png)' }}>
                  <picture>
                    <source media="(max-width: 640px)" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=414&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=828&amp;sfrm=png 2x" />
                    <source media="(min-width: 640px) and (max-width: 769px)" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=768&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=1536&amp;sfrm=png 2x" />
                    <source media="(min-width: 769px)" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=1020&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=2040&amp;sfrm=png 2x" />
                    <FormattedMessage id="header.carouselInfo8">
                      {txt => (
                        <img
                          src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=1020&amp;sfrm=png"
                          alt={txt}
                          title={txt} />
                      )}
                    </FormattedMessage>
                  </picture>
                </div>
                <div className="hero-carousel__slide__text text-center d-md-flex align-items-center">
                  <div className="hero-carousel__slide__text__inner rc-padding-x--lg--mobile">
                    <div className="rc-delta inherit-fontsize children-nomargin">
                      <h2><FormattedMessage id="header.carouselInfo8" /></h2>
                    </div>
                    <FormattedMessage id="header.carouselInfo8">
                      {txt => (
                        <img
                          src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw83e0ebac/icons/expert.png?sw=80"
                          srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw83e0ebac/icons/expert.png?sw=80, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw83e0ebac/icons/expert.png?sw=160 2x"
                          alt={txt}
                          className="mx-auto rc-margin-bottom--xs rc-margin-bottom--sm--mobile icon" />
                      )}
                    </FormattedMessage>
                    <div className="rc-hero__description rc-body inherit-fontsize children-nomargin">
                      <p><FormattedMessage id="header.carouselInfo9" /></p>
                    </div>
                    <Link
                      to="/help"
                      className="rc-btn rc-btn--one rc-margin-bottom--lg--mobile rc-margin-top--xs gtm-hero-carousel-btn font-16">
                      <FormattedMessage id="header.toLearnMore" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
        {/* <input id="hero-carousel-scrolltime" type="hidden" value="7000" />
        <input id="hero-carousel-scrollspeed" type="hidden" value="1500" />
        <input id="hero-carousel-autoplay" type="hidden" value="false" /> */}
      </div>
    )
  }
}

export default HeroCarousel

















=======
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/assets/css/heroCarousel.css'
import Banner_Horizontal_Hot_Sale from "@/assets/images/Banner_Horizontal_Hot_Sale.jpg";
import Pomotion25offImg from "@/assets/images/pomotion_25off.png";
import Banner_recommend_item from "@/assets/images/Banner_recommend_item.jpg";
import Banner_recommend_item_m from "@/assets/images/Banner_recommend_item_m.jpg";
import './index.less'

function SampleNextArrow (props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--next rc-btn rc-btn--icon rc-icon rc-interactive rc-right rc-iconography`}
      style={{ ...style, right: '3%', zIndex: 1, top: '50%', position: 'absolute', transform: 'translateY(-50%)' }}
      onClick={onClick} />
  );
}

function SamplePrevArrow (props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--prev rc-btn rc-btn--icon rc-icon rc-interactive rc-left rc-iconography`}
      style={{ ...style, left: '3%', zIndex: 1, top: '50%', position: 'absolute', transform: 'translateY(-50%)' }}
      onClick={onClick} />
  );
}

class HeroCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeVisible: true
    }
    this.hanldeClick = this.hanldeClick.bind(this)
    this.hideNotice = this.hideNotice.bind(this)
  }
  hideNotice () {
    this.setState({
      noticeVisible: false
    })
  }
  hanldeClick () {
    const { history } = this.props;
    history.push("/list/keywords");
  }
  render () {
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
      dotsClass: "dots-custom"
    };
    return (
      <div className="hero-carousel with-shadow">
        <div className="rc-max-width--xl">
          {
            this.state.noticeVisible
              ? <div className="red font-weight-normal p-1 position-relative text-center pr-4 pl-4" style={{ background: '#f6f6f6' }}>
                <span
                  className="rc-icon rc-close--xs rc-iconography searchBtnToggle rc-stick-right rc-vertical-align"
                  style={{ transform: 'translateY(-40%)' }} onClick={this.hideNotice}></span>
                {/* <div className="text-center" style={{ fontSize: '1.15em' }}>
                  <span className="pr-2 pl-2" style={{ background: '#ec001a', color: '#fff', borderRadius: '.3rem' }}>25% OFF</span> Hasta el 1ero de Junio 2020 o agotar existencias
                </div> */}
                <FormattedMessage id="home.note1" />&nbsp;
                <FormattedMessage id="home.note2" />
              </div>
              : null
          }

          <Slider {...settings}>
            {/* <div className="hero-carousel__slide">
              <div className="d-md-flex align-items-center hero-carousel__slide__inner hero-carousel__slide__inner-custom">
                <img src={Banner_Horizontal_Hot_Sale} className="rc-md-up" />
                <span className="btn-cheat-md-down" onClick={this.hanldeClick}></span>
                <span className="btn-cheat-md-up" onClick={this.hanldeClick}></span>
                <img src={Pomotion25offImg} className="rc-md-down" />
              </div>
            </div> */}
            <div className="hero-carousel__slide">
              <div className="d-md-flex flex-wrap justify-content-center align-items-center hero-carousel__slide__inner hero-carousel__slide__inner-custom">
                <img
                  className="rc-md-up"
                  src={Banner_recommend_item}
                  style={{ maxHeight: '100%' }} />
                <img
                  className="rc-md-down w-100"
                  src={Banner_recommend_item_m}
                  style={{ maxHeight: '100%' }} />
                <span className="font-weight-normal red font-16 mb-1 ml-3 mr-3 text-center inlineblock">
                  Monitorea en casa la salud urinaria de tu gato con Hematuria Detection(Detecta sangre en la orina)
                </span>
                <span className="rc-md-up btn-cheat">
                  <Link
                    to="/details/8a80808671d968b10171e6d2ba8c0016"
                    className="rc-btn rc-btn--one gtm-hero-carousel-btn font-16">
                    <FormattedMessage id="header.toOrder" />
                  </Link>
                </span>
                <span className="rc-md-down">
                  <Link
                    to="/details/8a80808671d968b10171e6d2ba8c0016"
                    style={{ marginBottom: '3.5rem' }}
                    className="rc-btn rc-btn--one gtm-hero-carousel-btn font-16 mt-2">
                    <FormattedMessage id="header.toOrder" />
                  </Link>
                </span>
                {/* <div className="hero-carousel__slide__text text-center d-md-flex align-items-center rc-md-up">
                  <div className="hero-carousel__slide__text__inner rc-padding-x--lg--mobile">
                    <div className="rc-delta inherit-fontsize children-nomargin">
                    </div>
                    <div className="rc-hero__description rc-body inherit-fontsize children-nomargin">
                    </div>
                    <Link
                      to="/details/8a80808671d968b10171e6d2ba8c0016"
                      className="rc-btn rc-btn--one gtm-hero-carousel-btn font-16">
                      <FormattedMessage id="header.toOrder" />
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="hero-carousel__slide">
              <div className="d-flex align-items-center hero-carousel__slide__inner flex-column-reverse flex-column flex-md-row">
                <div className="hero-carousel__slide__video">
                  <img
                    src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw994156b8/homepage/01_Slider_img_Mobile@2x.jpg?sw=414&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw994156b8/homepage/01_Slider_img_Mobile@2x.jpg?sw=414&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw994156b8/homepage/01_Slider_img_Mobile@2x.jpg?sw=828&amp;sfrm=png 2x"
                    alt="cat and dog mobile hero image"
                    title="cat and dog mobile hero image" />
                  <video autoPlay={true} muted={true} loop={true} id="myVideo" poster="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw92b314b6/homepage/01_Slider_img_Desktop.jpg?sw=1400&amp;sfrm=png">
                    <source src="https://www.shop.royal-canin.ru/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw346c3179/homepage/Home page video_7s.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="hero-carousel__slide__content">
                  <div className="rc-gamma inherit-fontsize">
                    <h1><FormattedMessage id="header.carouselInfo1" /></h1>
                  </div>
                  <div className="rc-margin-bottom--sm rc-body inherit-fontsize">
                    <p><FormattedMessage id="header.carouselInfo2" /></p>
                  </div>
                  <div className="hero-carousel__slide__content__btn text-center">
                    <a className="rc-btn rc-btn--one gtm-hero-carousel-btn font-16" style={{ color: '#fff' }} onClick={this.hanldeClick}><FormattedMessage id="header.toBegin" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-carousel__slide">
              <div className="d-md-flex align-items-center hero-carousel__slide__inner">
                <div className="hero-carousel__slide__img" style={{ background: 'url(https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=1020&amp;sfrm=png)' }}>
                  <picture>
                    <source media="(max-width: 640px)" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=414&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=828&amp;sfrm=png 2x" />
                    <source media="(min-width: 640px) and (max-width: 769px)" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=768&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=1536&amp;sfrm=png 2x" />
                    <source media="(min-width: 769px)" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=1020&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=2040&amp;sfrm=png 2x" />
                    <FormattedMessage id="header.carouselInfo8">
                      {txt => (
                        <img
                          src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e497bea/homepage/slider-img-help.jpg?sw=1020&amp;sfrm=png"
                          alt={txt}
                          title={txt} />
                      )}
                    </FormattedMessage>
                  </picture>
                </div>
                <div className="hero-carousel__slide__text text-center d-md-flex align-items-center">
                  <div className="hero-carousel__slide__text__inner rc-padding-x--lg--mobile">
                    <div className="rc-delta inherit-fontsize children-nomargin">
                      <h2><FormattedMessage id="header.carouselInfo8" /></h2>
                    </div>
                    <FormattedMessage id="header.carouselInfo8">
                      {txt => (
                        <img
                          src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw83e0ebac/icons/expert.png?sw=80"
                          srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw83e0ebac/icons/expert.png?sw=80, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw83e0ebac/icons/expert.png?sw=160 2x"
                          alt={txt}
                          className="mx-auto rc-margin-bottom--xs rc-margin-bottom--sm--mobile icon" />
                      )}
                    </FormattedMessage>
                    <div className="rc-hero__description rc-body inherit-fontsize children-nomargin">
                      <p><FormattedMessage id="header.carouselInfo9" /></p>
                    </div>
                    <Link
                      to="/help"
                      className="rc-btn rc-btn--one rc-margin-bottom--lg--mobile rc-margin-top--xs gtm-hero-carousel-btn font-16">
                      <FormattedMessage id="header.toLearnMore" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
        {/* <input id="hero-carousel-scrolltime" type="hidden" value="7000" />
        <input id="hero-carousel-scrollspeed" type="hidden" value="1500" />
        <input id="hero-carousel-autoplay" type="hidden" value="false" /> */}
      </div>
    )
  }
}

export default HeroCarousel
>>>>>>> .theirs
