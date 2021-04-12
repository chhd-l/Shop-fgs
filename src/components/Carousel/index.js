import React, { Component } from 'react';
import Slider from 'react-slick';
import './index.less';
import { settings } from './config';

export default class Responsive extends Component {
  static defaultProps = {
    location: '',
    history: '',
    goodsList: []
  };
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0
    };
  }
  render() {
    const { goodsList } = this.props;
    if (goodsList.length > 0) {
      console.log({ goodsList });
    }
    return (
      <div className="responsive-carousel">
        <h2>Recommanded for you</h2>
        <Slider {...settings}>
          {goodsList.map((item, index) => {
            return (
              <a key={index} className="goods" href="javascript:;">
                <h3>{index}</h3>
              </a>
            );
          })}
        </Slider>
      </div>
    );
  }
}
