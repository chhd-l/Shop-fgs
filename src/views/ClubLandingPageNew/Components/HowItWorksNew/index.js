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
//RuImage

import LazyLoad from 'react-lazyload';
import './index.css';

//写的不好好aaaaaaaa

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
                  {EnhowitworksnewList.map((step) => (
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
                {EnhowitworksnewListmobile.map((step) => (
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
