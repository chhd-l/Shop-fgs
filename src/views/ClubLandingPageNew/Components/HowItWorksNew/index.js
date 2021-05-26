import React from 'react';
import { FormattedMessage } from 'react-intl';
import howitworknew1 from './image/howitworksnew1.png';
import howitworknew2 from './image/howitworksnew2.png';
import howitworknew3 from './image/howitworksnew3.png';
import howitworknew4 from './image/howitworksnew4.png';
import howitworknewmobile1 from './image/howitworksmobile1.png';
import howitworknewmobile2 from './image/howitworksmobile2.png';
import howitworknewmobile3 from './image/howitworksmobile3.png';
import howitworknewmobile4 from './image/howitworksmobile4.png';
import ruhowitworknew1 from './image/ruhowitworksnew1.png'
import ruhowitworknew2 from './image/ruhowitworksnew2.png'
import ruhowitworknew3 from './image/ruhowitworksnew3.png'
import ruhowitworknew4 from './image/ruhowitworksnew4.png'
import ruhowitworknewmobile1 from './image/ruhowitworksmobile1.png'
import ruhowitworknewmobile2 from './image/ruhowitworksmobile1.png'
import ruhowitworknewmobile3 from './image/ruhowitworksmobile1.png'
import ruhowitworknewmobile4 from './image/ruhowitworksmobile1.png'
import LazyLoad from 'react-lazyload';
import './index.css';

//写的不好好aaaaaaaa

//Ru Image
const RuhowitworksnewList=[
  {
    HowitworksStep:ruhowitworknew1,
  },
  {
    HowitworksStep:ruhowitworknew2,
  },
  {
    HowitworksStep:ruhowitworknew3,
  },
  {
    HowitworksStep:ruhowitworknew4,
  },
]

const RuhowitworksnewListmobile=[
  {
    HowitworksStep:ruhowitworknewmobile1,
  },
  {
    HowitworksStep:ruhowitworknewmobile2,
  },
  {
    HowitworksStep:ruhowitworknewmobile3,
  },
  {
    HowitworksStep:ruhowitworknewmobile4,
  },
]



// En Image
const EnhowitworksnewList=[
  {
    HowitworksStep:howitworknew1,
  },
  {
    HowitworksStep:howitworknew2,
  },
  {
    HowitworksStep:howitworknew3,
  },
  {
    HowitworksStep:howitworknew4,
  },
]

const EnhowitworksnewListmobile=[
  {
    HowitworksStep:howitworknewmobile1,
  },
  {
    HowitworksStep:howitworknewmobile2,
  },
  {
    HowitworksStep:howitworknewmobile3,
  },
  {
    HowitworksStep:howitworknewmobile4,
  },
]


const RU = process.env.REACT_APP_COUNTRY == 'RU';
const TR = process.env.REACT_APP_COUNTRY == 'TR';
const FR = process.env.REACT_APP_COUNTRY == 'FR';

const HowItWorksNew = () => {
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-assets-contentBlock">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
              <div>
                <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                  <FormattedMessage id="ClubLP.NewHowItWorks.title"/>
                </h4>
              </div>
              {/*这里手机移动适配写得不好,有空再改*/}
              <div className="desktopnone">
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                  className="flexwrapHow "
                >

                  {
                    RU?RuhowitworksnewList.map(step=>(
                      <div>
                        <LazyLoad height={180}>
                          <img
                            className="w-90 lazyloaded desktopnone"
                            src={step.HowitworksStep}
                          />
                        </LazyLoad>
                      </div>
                    )):TR?null:FR?null:
                    EnhowitworksnewList.map(step=>(
                    <div>
                    <LazyLoad height={180}>
                      <img
                        className="w-90 lazyloaded desktopnone"
                        src={step.HowitworksStep}
                      />
                    </LazyLoad>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mobilenone">
                {
                  RU?RuhowitworksnewListmobile.map(step=>(<div>
                    <LazyLoad height={180}>
                      <img
                        className="w-90 lazyloaded"
                        src={step.HowitworksStep}
                      />
                    </LazyLoad>
                  </div>)):TR?null:FR?null:
                  EnhowitworksnewListmobile.map(step=>(<div>
                  <LazyLoad height={180}>
                    <img
                      className="w-90 lazyloaded"
                      src={step.HowitworksStep}
                    />
                  </LazyLoad>
                </div>))}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksNew;
