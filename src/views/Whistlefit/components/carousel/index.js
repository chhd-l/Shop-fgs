import React, { Component } from 'react';
import Slider from 'react-slick';
import carousel1 from '../../images/carousel1.png';
import Shape01 from '../../images/Shape01.png';
import Shape02 from '../../images/Shape02.png';
import './index.less';

export default class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      autoplay: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      dotsClass: 'dots-custom2'
    };
    return (
      <div>
        <Slider {...settings}>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img src={carousel1} alt="carousel1" className="h-18 p-10 pt-0" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col ml-10 mr-20 p-10 pr-36">
              <img src={Shape01} alt="Shape01" className="w-16 mb-3" />
              <div>
                It challenges you and your dog to exercise more and stay active.
                It also provides information about how much yout dog is
                drinking, scratching, licking and sleeping
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col items-center">
                  <div style={{ color: '#E2001A' }} className="font-normal">
                    — Fabiola S. Pet
                  </div>
                  <div style={{ color: '#E2001A' }} className="font-normal">
                    Owner
                  </div>
                </div>
                <img src={Shape02} alt="Shape02" className="w-16" />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img src={carousel1} alt="carousel1" className="h-18 p-10 pt-0" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col ml-10 mr-20 p-10 pr-36">
              <img src={Shape01} alt="Shape01" className="w-16 mb-3" />
              <div>
                It challenges you and your dog to exercise more and stay active.
                It also provides information about how much yout dog is
                drinking, scratching, licking and sleeping
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col items-center">
                  <div style={{ color: '#E2001A' }} className="font-normal">
                    — Fabiola S. Pet
                  </div>
                  <div style={{ color: '#E2001A' }} className="font-normal">
                    Owner
                  </div>
                </div>
                <img src={Shape02} alt="Shape02" className="w-16" />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img src={carousel1} alt="carousel1" className="h-18 p-10 pt-0" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col ml-10 mr-20 p-10 pr-36">
              <img src={Shape01} alt="Shape01" className="w-16 mb-3" />
              <div>
                It challenges you and your dog to exercise more and stay active.
                It also provides information about how much yout dog is
                drinking, scratching, licking and sleeping
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col items-center">
                  <div style={{ color: '#E2001A' }} className="font-normal">
                    — Fabiola S. Pet
                  </div>
                  <div style={{ color: '#E2001A' }} className="font-normal">
                    Owner
                  </div>
                </div>
                <img src={Shape02} alt="Shape02" className="w-16" />
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
