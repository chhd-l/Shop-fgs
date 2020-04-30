import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import '@/assets/css/heroCarousel.css'

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
    return (
      <div className="hero-carousel with-shadow">
        <div className="rc-max-width--xl">
          {
            this.state.noticeVisible
              ? <div className="red text-center font-weight-normal p-1 position-relative pr-4 pl-4" style={{ background: '#f6f6f6' }}>
                <span
                  className="rc-icon rc-close--xs rc-iconography searchBtnToggle rc-stick-right rc-vertical-align"
                  style={{ transform: 'translateY(-40%)' }} onClick={this.hideNotice}></span>
                <FormattedMessage id="home.note1" />&nbsp;
                <FormattedMessage id="home.note2" />
              </div>
              : null
          }

          <div data-js-carousel="" className="rc-carousel js-hero-carousel">
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
                    <Link className="rc-btn rc-btn--one gtm-hero-carousel-btn" onClick={this.hanldeClick}><FormattedMessage id="header.toBegin" /></Link>
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
                          src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw83e0ebac/icons/expert.png?sw=80" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw83e0ebac/icons/expert.png?sw=80, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw83e0ebac/icons/expert.png?sw=160 2x"
                          alt={txt}
                          className="mx-auto rc-margin-bottom--xs rc-margin-bottom--sm--mobile icon" />
                      )}
                    </FormattedMessage>
                    <div className="rc-hero__description rc-body inherit-fontsize children-nomargin">
                      <p><FormattedMessage id="header.carouselInfo9" /></p>
                    </div>
                    <Link to="/help" className="rc-btn rc-btn--one rc-margin-bottom--lg--mobile rc-margin-top--xs gtm-hero-carousel-btn">
                      <FormattedMessage id="header.toLearnMore" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input id="hero-carousel-scrolltime" type="hidden" value="7000" />
        <input id="hero-carousel-scrollspeed" type="hidden" value="1500" />
        <input id="hero-carousel-autoplay" type="hidden" value="false" />
      </div>
    )
  }
}

export default HeroCarousel