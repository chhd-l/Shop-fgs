import React from 'react';
import { FormattedMessage } from 'react-intl';
import howitworknew1 from './image/howitworksnew1.png';
import howitworknew2 from './image/howitworksnew2.png';
import howitworknew3 from './image/howitworksnew3.png';
import howitworknew4 from './image/howitworksnew4.png';
import LazyLoad from 'react-lazyload';

const HowItWorksNew = () => {
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-assets-contentBlock">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
              <div>
                <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                  HOW IT WORKS
                </h4>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                  <LazyLoad height={180}>
                    <img className="w-90 lazyloaded" src={howitworknew1} />
                  </LazyLoad>
                </div>
                <div>
                  <LazyLoad height={180}>
                    <img className="w-90 lazyloaded" src={howitworknew2} />
                  </LazyLoad>
                </div>
                <div>
                  <LazyLoad height={180}>
                    <img className="w-90 lazyloaded" src={howitworknew3} />
                  </LazyLoad>
                </div>
                <div>
                  <LazyLoad height={180}>
                    <img className="w-90 lazyloaded" src={howitworknew4} />
                  </LazyLoad>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksNew;
