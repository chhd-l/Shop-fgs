import React, { Component } from 'react';
import Slider from 'react-slick';
import './index.less';
export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({});
  }
  navToSlide = (idx) => {
    console.info('idx', idx);
    this.slider.slickGoTo(idx);
  };

  render() {
    return (
      <div className="demo-css">
        <h2>Slider Syncing (AsNavFor)</h2>
        <h4>First Slider</h4>
        <Slider
          ref={(slider) => (this.slider = slider)}
          swipeToSlide={true}
          arrows={false}
          infinite={false}
        >
          {Array(6)
            .fill()
            .map((item, idx) => (
              <div>
                <h3>{idx + 1}</h3>
              </div>
            ))}
        </Slider>
        <h4>Second Slider</h4>
        <Slider
          slidesToShow={3}
          swipeToSlide={false}
          arrows={true}
          infinite={false}
        >
          {Array(6)
            .fill()
            .map((item, idx) => (
              <div
                onClick={() => {
                  this.navToSlide(idx);
                }}
              >
                <h3>{idx + 1}</h3>
              </div>
            ))}
        </Slider>
      </div>
    );
  }
}
