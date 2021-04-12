import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.less';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default class Responsive extends Component {
  static defaultProps = {
    location: '',
    history: '',
    key: '',
    goodsList: [1, 2]
  };
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0
    };
  }
  render() {
    const { goodsList } = this.props;
    return (
      <div className="responsive-carousel">
        <h2>Recommanded for you</h2>
        <Slider {...settings}>
          {goodsList.map((index, item) => {
            return (
              <div>
                <h3>{index}</h3>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
