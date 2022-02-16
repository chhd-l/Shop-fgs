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
              <img
                src={carousel1}
                alt="carousel1"
                className="h-18 p-10 pt-0 mt-0 md:mt-20"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col ml-10 mr-20 p-10">
              <img src={Shape01} alt="Shape01" className="w-16 mb-3" />
              <div className="md:leading-17.5 md:text-24">
                "Cela vous met au défi, vous et votre chien, de faire plus
                d'exercice et de rester actifs. Il fournit également des
                informations sur le comportement de votre chien, le nombre de
                fois où il se gratte, se lèche et dort. On comprend également
                s’il s’hydrate assez. »
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col items-center">
                  <div
                    style={{ color: '#E2001A' }}
                    className="font-normal text-20"
                  >
                    — Fabiola S.Propriétaire de chien
                  </div>
                  {/* <div style={{ color: '#E2001A' }} className="font-normal">
                    Propriétaire de chien
                  </div> */}
                </div>
                <img src={Shape02} alt="Shape02" className="w-16" />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img src={carousel1} alt="carousel1" className="h-18 p-10 pt-0" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col ml-10 mr-20 p-10">
              <img src={Shape01} alt="Shape01" className="w-16 mb-3" />
              <div className="md:leading-17.5 md:text-24">
                "Cela m'a aidé à suivre son niveau d’activité quotidienne. Elle
                a perdu le poids recommandé par le vétérinaire. Je recommande
                définitivement Whistle Fit à mes amis et à ma famille »
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col items-center">
                  <div
                    style={{ color: '#E2001A' }}
                    className="font-normal text-20"
                  >
                    — Charles V.Propriétaire de chien
                  </div>
                  {/* <div style={{ color: '#E2001A' }} className="font-normal">
                    Propriétaire de chien
                  </div> */}
                </div>
                <img src={Shape02} alt="Shape02" className="w-16" />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img src={carousel1} alt="carousel1" className="h-18 p-10 pt-0" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col ml-10 mr-20 p-10">
              <img src={Shape01} alt="Shape01" className="w-16 mb-3" />
              <div className="md:leading-17.5 md:text-24">
                "Suivez non seulement son activité, mais aussi ses habitudes de
                sommeil et sa consommation d’eau. Nous adorons l'application -
                elle est très simple à prendre en main. En plus d’être un
                excellent produit, le service client de Whistle est fantastique
                !
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col items-center">
                  <div
                    style={{ color: '#E2001A' }}
                    className="font-normal text-20"
                  >
                    — Laura P.Propriétaire de chien
                  </div>
                  {/* <div style={{ color: '#E2001A' }} className="font-normal">
                    Propriétaire de chien
                  </div> */}
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
