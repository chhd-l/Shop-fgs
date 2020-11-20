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
                        <a className="h-100" href="javascript:;">
                            <img
                            className="rc-md-down w-100"
                            src={el.mobiUrl}
                            style={{ maxHeight: '100%' }}
                            alt={i}
                            />
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
