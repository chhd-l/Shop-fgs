import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import howitworknew1 from './image/howitworksnew1.png';
import howitworknew2 from './image/howitworksnew2.png';
import howitworknew3 from './image/howitworksnew3.png';
import howitworknew4 from './image/howitworksnew4.png';
import howitworknewmobile1 from './image/howitworksmobile1.png';
import howitworknewmobile2 from './image/howitworksmobile2.png';
import howitworknewmobile3 from './image/howitworksmobile3.png';
import howitworknewmobile4 from './image/howitworksmobile4.png';
import trhowitworknew1 from './image/trhowitworksnew1.png';
import trhowitworknew2 from './image/trhowitworksnew2.png';
import trhowitworknew3 from './image/trhowitworksnew3.png';
import trhowitworknew4 from './image/trhowitworksnew4.png';
import trhowitworknewmobile1 from './image/trhowitworksmobile1.png';
import trhowitworknewmobile2 from './image/trhowitworksmobile2.png';
import trhowitworknewmobile3 from './image/trhowitworksmobile3.png';
import trhowitworknewmobile4 from './image/trhowitworksmobile4.png';

import LazyLoad from 'react-lazyload';
import './index.css';

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
    HowitworksStep: trhowitworknewmobile4
  }
];

const ru = window.__.env.REACT_APP_COUNTRY == 'ru';
const tr = window.__.env.REACT_APP_COUNTRY == 'tr';
const fr = window.__.env.REACT_APP_COUNTRY == 'fr';

const HowItWorksNew = ({
  RuhowitworksnewList,
  RuhowitworksnewListmobile,
  FrhowitworksnewList,
  FrhowitworksnewListmobile
}) => {
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-assets-contentBlock">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
              <div>
                <h4
                  className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile rc-alpha"
                  style={{ fontWeight: '550' }}
                >
                  <FormattedMessage id="ClubLP.NewHowItWorks.title" />
                </h4>
              </div>
              {/*这里手机移动适配写得不好,有空再改*/}
              <div className="desktopnone">
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                  className="flexwrapHow "
                >
                  {ru
                    ? RuhowitworksnewList?.map((step) => (
                        <div>
                          <LazyLoad height={180}>
                            <img
                              className="w-90 lazyloaded desktopnone"
                              src={step.HowitworksStep}
                            />
                          </LazyLoad>
                        </div>
                      ))
                    : tr
                    ? TrhowitworksnewList?.map((step) => (
                        <div>
                          <LazyLoad height={180}>
                            <img
                              className="w-90 lazyloaded desktopnone"
                              src={step.HowitworksStep}
                            />
                          </LazyLoad>
                        </div>
                      ))
                    : fr
                    ? FrhowitworksnewList?.map((step) => (
                        <div>
                          <LazyLoad height={180}>
                            <img
                              className="w-90 lazyloaded desktopnone"
                              src={step.HowitworksStep}
                            />
                          </LazyLoad>
                        </div>
                      ))
                    : EnhowitworksnewList?.map((step) => (
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
                {ru
                  ? RuhowitworksnewListmobile?.map((step) => (
                      <div>
                        <LazyLoad height={180}>
                          <img
                            className="w-90 lazyloaded"
                            src={step.HowitworksStep}
                          />
                        </LazyLoad>
                      </div>
                    ))
                  : tr
                  ? TrhowitworksnewListmobile?.map((step) => (
                      <div>
                        <LazyLoad height={180}>
                          <img
                            className="w-90 lazyloaded"
                            src={step.HowitworksStep}
                          />
                        </LazyLoad>
                      </div>
                    ))
                  : fr
                  ? FrhowitworksnewListmobile?.map((step) => (
                      <div>
                        <LazyLoad height={180}>
                          <img
                            className="w-90 lazyloaded"
                            src={step.HowitworksStep}
                          />
                        </LazyLoad>
                      </div>
                    ))
                  : EnhowitworksnewListmobile?.map((step) => (
                      <div>
                        <LazyLoad height={180}>
                          <img
                            className="w-90 lazyloaded"
                            src={step.HowitworksStep}
                          />
                        </LazyLoad>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksNew;
