import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/assets/css/heroCarousel.css';
import './index.less';
import { getBanner } from '@/api/home.js';

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
      autoplay: false,
      pauseOnHover: true,
      lazyLoad: true,
      adaptiveHeight: true,
      dotsClass: 'dots-custom'
    };

    return (
      <div className="hero-carousel with-shadow">
        <div className="rc-max-width--xl">
          <Slider {...settings}>
            {this.state.banner.map((el, i) => (
              <div className="hero-carousel__slide" key={i} style={{position:'relative'}}>
                <div className="d-md-flex flex-wrap justify-content-center align-items-center hero-carousel__slide__inner hero-carousel__slide__inner-custom">(
                    {
                        i==0?
                        <a className="h-100" href="javascript:;">
                            <div style={{margin:'0 70px'}}>
                                <div className="rc-gamma inherit-fontsize">
                                    <h1 style={{fontWeight:'bold',marginTop:'40px'}}>Royal Canin reste mobilisé pour vous aider durant cette période de pandémie COVID-19</h1>
                                </div>
                                <div className="rc-margin-bottom--sm rc-body inherit-fontsize">
                                    <p>Trouvez la nutrition adaptée aux besoins spécifiques de votre animal</p>
                                </div>
                            </div>

                            <a href="/product-finder" style={{position:'absolute',bottom:'80px',left:'50%',transform:'translateX(-50%)'}}>
                                <button class="rc-btn rc-btn--one"><FormattedMessage id="header.toBegin" /></button>
                            </a>
                            <img
                            className="rc-md-down w-100"
                            src={el.mobiUrl}
                            style={{ maxHeight: '100%',paddingTop:"80px" }}
                            alt={i}
                            />
                        </a>
                        :
                        <a className="h-100" href="javascript:;">
                            <img
                            className="rc-md-down w-100"
                            src={el.mobiUrl}
                            style={{ maxHeight: '100%',paddingBottom:"100px" }}
                            alt={i}
                            />
                            <div style={{margin:'30px'}}>
                                <div className="rc-delta inherit-fontsize children-nomargin">
                                    <p>Nos packs ROYAL CANIN® combinant croquettes et bouchées</p>
                                </div>
                                <div className="rc-hero__description rc-body inherit-fontsize children-nomargin">
                                    <p>Découvrez nos packs de croquettes et de bouchées sur la boutique en ligne Royal Canin. Pour chats et chiens, trouvez l'assortiment qui convient le mieux à votre animal.</p>
                                </div>
                            </div>
                           
                            <a href="/product-finder" style={{margin:'20px 0'}}>
                                <button class="rc-btn rc-btn--one"><FormattedMessage id="header.toBegin" /></button>
                            </a>
                        </a>
                    }
                    
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
