import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { optimizeImage } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import './index.css';

// En Image
const EnhowitworksnewList = [
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/howitworksnew1.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/howitworksnew2.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/howitworksnew3.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/howitworksnew4.png`
  }
];

const EnhowitworksnewListmobile = [
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/howitworksmobile1.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/howitworksmobile2.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/howitworksmobile3.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/howitworksmobile4.png`
  }
];

//Tr Image
const TrhowitworksnewList = [
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/trhowitworksnew1.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/trhowitworksnew2.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/trhowitworksnew3.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/trhowitworksnew4.png`
  }
];

const TrhowitworksnewListmobile = [
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/trhowitworksmobile1.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/trhowitworksmobile2.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/trhowitworksmobile3.png`
  },
  {
    HowitworksStep: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/club/trhowitworksmobile4.png`
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
                  className="flexwrapHow 1"
                >
                  {ru
                    ? RuhowitworksnewList?.map((step, i) => (
                        <div key={i}>
                          <LazyLoad height={180}>
                            <img
                              className="w-90 lazyloaded desktopnone 1"
                              src={optimizeImage({
                                originImageUrl: step.HowitworksStep,
                                width: 331
                              })}
                            />
                          </LazyLoad>
                        </div>
                      ))
                    : tr
                    ? TrhowitworksnewList?.map((step, i) => (
                        <div key={i}>
                          <LazyLoad height={180}>
                            <img
                              className="w-90 lazyloaded desktopnone 2"
                              src={optimizeImage({
                                originImageUrl: step.HowitworksStep,
                                width: 331
                              })}
                            />
                          </LazyLoad>
                        </div>
                      ))
                    : fr
                    ? FrhowitworksnewList?.map((step, i) => (
                        <div key={i}>
                          <LazyLoad height={180}>
                            <img
                              className="w-90 lazyloaded desktopnone 3"
                              src={optimizeImage({
                                originImageUrl: step.HowitworksStep,
                                width: 331
                              })}
                            />
                          </LazyLoad>
                        </div>
                      ))
                    : EnhowitworksnewList?.map((step, i) => (
                        <div key={i}>
                          <LazyLoad height={180}>
                            <img
                              className="w-90 lazyloaded desktopnone 4"
                              src={optimizeImage({
                                originImageUrl: step.HowitworksStep,
                                width: 331
                              })}
                            />
                          </LazyLoad>
                        </div>
                      ))}
                </div>
              </div>
              <div className="mobilenone">
                {ru
                  ? RuhowitworksnewListmobile?.map((step, i) => (
                      <div key={i}>
                        <LazyLoad height={180}>
                          <img
                            className="w-90 lazyloaded"
                            src={optimizeImage({
                              originImageUrl: step.HowitworksStep,
                              width: 331
                            })}
                          />
                        </LazyLoad>
                      </div>
                    ))
                  : tr
                  ? TrhowitworksnewListmobile?.map((step, i) => (
                      <div key={i}>
                        <LazyLoad height={180}>
                          <img
                            className="w-90 lazyloaded"
                            src={optimizeImage({
                              originImageUrl: step.HowitworksStep,
                              width: 331
                            })}
                          />
                        </LazyLoad>
                      </div>
                    ))
                  : fr
                  ? FrhowitworksnewListmobile?.map((step, i) => (
                      <div key={i}>
                        <LazyLoad height={180}>
                          <img
                            className="w-90 lazyloaded"
                            src={optimizeImage({
                              originImageUrl: step.HowitworksStep,
                              width: 331
                            })}
                          />
                        </LazyLoad>
                      </div>
                    ))
                  : EnhowitworksnewListmobile?.map((step, i) => (
                      <div key={i}>
                        <LazyLoad height={180}>
                          <img
                            className="w-90 lazyloaded"
                            src={optimizeImage({
                              originImageUrl: step.HowitworksStep,
                              width: 331
                            })}
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
