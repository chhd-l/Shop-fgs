import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
    return (
      <div className="responsive-carousel">
        <h2>Recommanded for you</h2>
        <Slider {...settings}>
          {goodsList.map((item, index) => {
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
