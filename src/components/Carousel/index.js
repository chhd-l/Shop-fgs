import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.less';
import chunk from 'lodash/chunk';
import { getGoodsRelation } from '@/api/details';

export default class Responsive extends Component {
  static defaultProps = {
    location: '',
    history: '',
    goodsId: '',
    key: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      windowWidth: 0
    };
  }
  render() {
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
    return (
      <div className="responsive-carousel">
        <h2>Recommanded for you</h2>
        <Slider {...settings}>
          {this.state.goodsList.map((index, item) => {
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
  componentDidMount() {
    const { goodsId } = this.props;
    getGoodsRelation(goodsId).then((res) => {
      this.setState(
        {
          goodsList: res.context.goods
        },
        () => {
          console.log(this.state.goodsList);
          debugger;
        }
      );
    });
  }
}
