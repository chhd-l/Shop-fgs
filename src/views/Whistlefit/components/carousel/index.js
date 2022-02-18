import React, { Component } from 'react';
import Slider from 'react-slick';
import carousel1 from '../../images/carousel1.png';
import Shape01 from '../../images/Shape01.png';
import Shape02 from '../../images/Shape02.png';
import './index.less';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list1: [
        {
          img: carousel1,
          alt: carousel1,
          title: `"Cela m'a aidé à suivre son niveau d’activité quotidienne. Elle
          a perdu le poids recommandé par le vétérinaire. Je recommande
          définitivement Whistle Fit à mes amis et à ma famille »`,
          author: `— Fabiola S.Propriétaire de chien`
        },
        {
          img: carousel1,
          alt: carousel1,
          title: `"Cela m'a aidé à suivre son niveau d’activité quotidienne. Elle
          a perdu le poids recommandé par le vétérinaire. Je recommande
          définitivement Whistle Fit à mes amis et à ma famille »`,
          author: `— Charles V.Propriétaire de chien`
        },
        {
          img: carousel1,
          alt: carousel1,
          title: `"Suivez non seulement son activité, mais aussi ses habitudes de
          sommeil et sa consommation d’eau. Nous adorons l'application -
          elle est très simple à prendre en main. En plus d’être un
          excellent produit, le service client de Whistle est fantastique
          !`,
          author: `— Laura P.Propriétaire de chien`
        }
      ]
      //intl: this.props.intl.messages
    };
  }
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
          {this.state.list1.map((item, index) => {
            return (
              <div className="flex flex-col md:flex-row" key={index}>
                <div className="w-full md:w-1/2">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="h-18 p-10 md:p-0 pt-0"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col ml-0 md:ml-10  md:mr-20 p-10 pt-0 md:pl-10">
                  <img
                    src={Shape01}
                    alt="Shape01"
                    className="w-10 md:w-16 mb-3"
                  />
                  <div className="md:leading-17.5 text-16 md:text-24">
                    {item.title}
                  </div>
                  <div className="flex justify-between mt-3">
                    <div className="flex flex-col items-center">
                      <div
                        style={{ color: '#E2001A' }}
                        className="font-normal text-16 md:text-20"
                      >
                        {item.author}
                      </div>
                    </div>
                    <img src={Shape02} alt="Shape02" className="w-10 md:w-16" />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
