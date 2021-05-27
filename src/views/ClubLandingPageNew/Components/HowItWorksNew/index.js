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
import ruhowitworknewmobile2 from './image/ruhowitworksmobile2.png'
import ruhowitworknewmobile3 from './image/ruhowitworksmobile3.png'
import ruhowitworknewmobile4 from './image/ruhowitworksmobile4.png'
import frhowitworknew1 from './image/frhowitworknew1.png'
import frhowitworknew2 from './image/frhowitworknew2.png'
import frhowitworknew3 from './image/frhowitworknew3.png'
import frhowitworknew4 from './image/frhowitworknew4.png'
import frhowitworknewmobile1 from './image/frhowitworknewmobile1.png'
import frhowitworknewmobile2 from './image/frhowitworknewmobile2.png'
import frhowitworknewmobile3 from './image/frhowitworknewmobile3.png'
import frhowitworknewmobile4 from './image/frhowitworknewmobile4.png'
import trhowitworknew1 from './image/trhowitworksnew1.png'
import trhowitworknew2 from './image/trhowitworksnew2.png'
import trhowitworknew3 from './image/trhowitworksnew3.png'
import trhowitworknew4 from './image/trhowitworksnew4.png'
import trhowitworknewmobile1 from './image/trhowitworksmobile1.png'
import trhowitworknewmobile2 from './image/trhowitworksmobile2.png'
import trhowitworknewmobile3 from './image/trhowitworksmobile3.png'
import trhowitworknewmobile4 from './image/trhowitworksmobile4.png'



import LazyLoad from 'react-lazyload';
import './index.css';

//写的不好好aaaaaaaa

//Ru Image
const RuhowitworksnewList = [
  {
    HowitworksStep: ruhowitworknew1
  },
  {
    HowitworksStep: ruhowitworknew2
  },
  {
    HowitworksStep: ruhowitworknew3
  },
  {
    HowitworksStep: ruhowitworknew4
  }
];

const RuhowitworksnewListmobile = [
  {
    HowitworksStep: ruhowitworknewmobile1
  },
  {
    HowitworksStep: ruhowitworknewmobile2
  },
  {
    HowitworksStep: ruhowitworknewmobile3
  },
  {
    HowitworksStep:ruhowitworknewmobile4,
  },
]

//Fr Image
const FrhowitworksnewList=[
  {
    HowitworksStep:frhowitworknew1,
  },
  {
    HowitworksStep:frhowitworknew2,
  },
  {
    HowitworksStep:frhowitworknew3,
  },
  {
    HowitworksStep:frhowitworknew4,
  },
]

const FrhowitworksnewListmobile=[
  {
    HowitworksStep:frhowitworknewmobile1,
  },
  {
    HowitworksStep:frhowitworknewmobile2,
  },
  {
    HowitworksStep:frhowitworknewmobile3,
  },
  {
    HowitworksStep:frhowitworknewmobile4,
  },
]

// En Image
const EnhowitworksnewList = [
  {
    HowitworksStep: howitworknew1
  },
  {
    HowitworksStep: howitworknew2
  },
  {
    HowitworksStep: howitworknew3
  },
  {
    HowitworksStep: howitworknew4
  }
];

const EnhowitworksnewListmobile = [
  {
    HowitworksStep: howitworknewmobile1
  },
  {
    HowitworksStep: howitworknewmobile2
  },
  {
    HowitworksStep: howitworknewmobile3
  },
  {
    HowitworksStep: howitworknewmobile4
  }
];

//Tr Image
const TrhowitworksnewList = [
  {
    HowitworksStep: trhowitworknew1
  },
  {
    HowitworksStep: trhowitworknew2
  },
  {
    HowitworksStep: trhowitworknew3
  },
  {
    HowitworksStep: trhowitworknew4
  }
];

const TrhowitworksnewListmobile = [
  {
    HowitworksStep: trhowitworknewmobile1
  },
  {
    HowitworksStep: trhowitworknewmobile2
  },
  {
    HowitworksStep: trhowitworknewmobile3
  },
  {
    HowitworksStep:trhowitworknewmobile4,
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
                  <FormattedMessage id="ClubLP.NewHowItWorks.title" />
                </h4>
              </div>
              {/*这里手机移动适配写得不好,有空再改*/}
              <div className="desktopnone">
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                  className="flexwrapHow "
                >
                  {RU
                    ? RuhowitworksnewList.map((step) => (
                        <div>
                          <LazyLoad height={180}>
                            <img
                              className="w-90 lazyloaded desktopnone"
                              src={step.HowitworksStep}
                            />
                          </LazyLoad>
                        </div>
                      ))
                    : TR
                    ? TrhowitworksnewList.map((step) => (
                        <div>
                          <LazyLoad height={180}>
                            <img
                              className="w-90 lazyloaded desktopnone"
                              src={step.HowitworksStep}
                            />
                          </LazyLoad>
                        </div>
                      ))
                    : FR
                    ? FrhowitworksnewList.map((step) => (
                          <div>
                            <LazyLoad height={180}>
                              <img
                                className="w-90 lazyloaded desktopnone"
                                src={step.HowitworksStep}
                              />
                            </LazyLoad>
                          </div>
                        ))
                    : EnhowitworksnewList.map((step) => (
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
                  </div>)):TR?TrhowitworksnewListmobile.map(step=>(<div>
                    <LazyLoad height={180}>
                      <img
                        className="w-90 lazyloaded"
                        src={step.HowitworksStep}
                      />
                    </LazyLoad>
                  </div>)):FR?FrhowitworksnewListmobile.map(step=>(<div>
                      <LazyLoad height={180}>
                        <img
                          className="w-90 lazyloaded"
                          src={step.HowitworksStep}
                        />
                      </LazyLoad>
                    </div>)):
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
