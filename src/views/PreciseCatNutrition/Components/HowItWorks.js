import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import '../index.less';
import temp from '../images/temp.png';
import introTBRHNC from '../images/Intro to Breed Health Nutrition Course.png';
import subscribe from '../images/Subscribe.png';
import stayIC from '../images/stay in control.png';
import group from '../images/Group 25.png';
import borderBG1 from '../images/borderBG1.jpg';
import borderBG4 from '../images/borderBG4.jpg';
import borderBG2 from '../images/borderBG2.jpg';
import borderBG5 from '../images/borderBG5.jpg';
import borderBG3 from '../images/borderBG3.jpg';
import borderBG6 from '../images/borderBG6.jpg';

import { getDeviceType } from '../../../utils/utils';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const HowItWorks = () => {
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="rc-max-width--lg rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
            <div className="rc-margin-top--md rc-margin-top--none--mobile rc-padding-x--lg--mobile">
              <h2
                className="font-weight-bold rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile rc-alpha"
                style={{ fontSize: 28 }}
              >
                <FormattedMessage id="PreciseCatNutrition.HowItWorks.title" />
              </h2>
              <div className="value-proposition__container">
                <div className="row mx-0 justify-content-between">
                  {/*<div className="row rc-content-v-middle text-center rc-padding-top--md rc-margin-x--none">*/}
                  <div
                    className="borderBack1 col-12 col-md-3 col-xxl-3 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-3 pl-xxl-0 justify-content-center"
                    style={{
                      backgroundImage: `url('${
                        isMobile ? borderBG4 : borderBG1
                      }')`
                    }}
                  >
                    <div className="howItWorkBorder centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                      <div className="howItWorkStyle">
                        <div className="howItWorkNum">1</div>
                        <LazyLoad height={110}>
                          {/*<img*/}
                          {/*  className="m-auto w-auto lazyloaded"*/}
                          {/*  src={temp}/>*/}

                          <div className="howItWorkImg">
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={introTBRHNC}
                            />
                          </div>
                        </LazyLoad>
                      </div>
                      <div className="text-center">
                        <h7>
                          <FormattedMessage id="PreciseCatNutrition.HowItWorks.plate1" />
                        </h7>
                      </div>
                      {isMobile ? <br /> : null}
                    </div>
                  </div>
                  <div
                    className="borderBack2 col-12 col-md-3 col-xxl-3 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-3 pl-xxl-0 justify-content-center"
                    style={{
                      backgroundImage: `url('${
                        isMobile ? borderBG5 : borderBG2
                      }')`
                    }}
                  >
                    <div className="howItWorkBorder centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                      <div className="howItWorkStyle">
                        <div className="howItWorkNum">2</div>
                        <LazyLoad height={110}>
                          <div className="howItWorkImg">
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={subscribe}
                            />
                          </div>
                        </LazyLoad>
                      </div>
                      <div className="text-center">
                        <h7>
                          <FormattedMessage id="PreciseCatNutrition.HowItWorks.plate2" />
                        </h7>
                      </div>
                    </div>
                  </div>
                  <div className="borderBack2 col-12 col-md-3 col-xxl-3 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                    <div className="howItWorkBorder centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                      <div className="howItWorkStyle">
                        <div className="howItWorkNum">3</div>
                        <LazyLoad height={110}>
                          <div className="howItWorkImg">
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={stayIC}
                            />
                          </div>
                        </LazyLoad>
                      </div>
                      <div className="text-center">
                        <h7>
                          <FormattedMessage id="PreciseCatNutrition.HowItWorks.plate3" />
                        </h7>
                      </div>
                    </div>
                  </div>
                  <div
                    className="borderBack3 col-12 col-md-3 col-xxl-3 d-flex px-0 md:pl-0 md:pr-2  pr-xxl-3 pl-xxl-0 justify-content-center"
                    style={{
                      backgroundImage: `url('${
                        isMobile ? borderBG6 : borderBG3
                      }')`
                    }}
                  >
                    <div className="howItWorkBorder centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow">
                      <div className="howItWorkStyle">
                        <div className="howItWorkNum">4</div>
                        <LazyLoad height={110}>
                          <div className="howItWorkImg">
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={group}
                            />
                          </div>
                        </LazyLoad>
                      </div>
                      <div className="text-center">
                        <h7>
                          <FormattedMessage id="PreciseCatNutrition.HowItWorks.plate4" />
                        </h7>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
