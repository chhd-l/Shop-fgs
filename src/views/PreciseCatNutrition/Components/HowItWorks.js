import React from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import '../index.less';
import temp from '../images/temp.png';
import introTBRHNC from '../images/Intro to Breed Health Nutrition Course.png';
import subscribe from '../images/Subscribe.png';
import stayIC from '../images/stay in control.png';
import group from '../images/Group 25.png';
import picto_welcome_pack from '../images/picto_welcome-pack.png';
const HowItWorks = () => {
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="rc-max-width--lg rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
            <div className="rc-margin-top--md rc-margin-top--none--mobile rc-padding-x--lg--mobile">
              <h2
                className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile rc-alpha"
                style={{ fontWeight: '550' }}
              >
                HOW IT WORKS
                {/*<FormattedMessage id="ClubLP.NewHowItWorks.title" />*/}
              </h2>
              <div className="value-proposition__container">
                <div className="row mx-0 justify-content-between">
                  {/*<div className="row rc-content-v-middle text-center rc-padding-top--md rc-margin-x--none">*/}
                  <div className="col-12 col-md-1 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                    <div
                      style={{ border: '2px solid #cccccc' }}
                      className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow"
                    >
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <div
                          style={{
                            borderRadius: '50%',
                            backgroundColor: '#E2001A',
                            color: 'white'
                          }}
                        >
                          1
                        </div>
                        <LazyLoad>
                          {/*<img*/}
                          {/*  className="m-auto w-auto lazyloaded"*/}
                          {/*  src={temp}/>*/}

                          <div style={{ height: 100 }}>
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={introTBRHNC}
                            />
                          </div>
                        </LazyLoad>
                      </div>
                      <div className="text-center">
                        <a>
                          Tell us about your cat and help us shape the perfect
                          recipe for him
                          {/*<FormattedMessage*/}
                          {/*  id="subscription.ad.list1"*/}
                          {/*  values={{*/}
                          {/*    val1: <br />,*/}
                          {/*    val2: (*/}
                          {/*      <strong>*/}
                          {/*        répondant aux besoins de votre animal*/}
                          {/*      </strong>*/}
                          {/*    ),*/}
                          {/*    val3: <br />*/}
                          {/*  }}*/}
                          {/*/>*/}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-1 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                    <div
                      style={{ border: '2px solid #cccccc' }}
                      className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow"
                    >
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <LazyLoad>
                          <img
                            className="m-auto w-auto lazyloaded"
                            src={temp}
                          />
                          <div style={{ height: 100 }}>
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={subscribe}
                            />
                          </div>
                        </LazyLoad>
                      </div>
                      <div className="text-center">
                        <h7>
                          Subscribe and receive every month your cat's
                          personalized food
                          {/*<FormattedMessage*/}
                          {/*  id="subscription.ad.list1"*/}
                          {/*  values={{*/}
                          {/*    val1: <br />,*/}
                          {/*    val2: (*/}
                          {/*      <strong>*/}
                          {/*        répondant aux besoins de votre animal*/}
                          {/*      </strong>*/}
                          {/*    ),*/}
                          {/*    val3: <br />*/}
                          {/*  }}*/}
                          {/*/>*/}
                        </h7>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-1 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                    <div
                      style={{ border: '2px solid #cccccc' }}
                      className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow"
                    >
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <LazyLoad>
                          <img
                            className="m-auto w-auto lazyloaded"
                            src={temp}
                          />
                          <div style={{ height: 100 }}>
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={stayIC}
                            />
                          </div>
                        </LazyLoad>
                      </div>
                      <div style={{ height: 72 }} className="text-center">
                        <h7>
                          Stay in control; pause. move or skip your deliveries
                          {/*<FormattedMessage*/}
                          {/*  id="subscription.ad.list1"*/}
                          {/*  values={{*/}
                          {/*    val1: <br />,*/}
                          {/*    val2: (*/}
                          {/*      <strong>*/}
                          {/*        répondant aux besoins de votre animal*/}
                          {/*      </strong>*/}
                          {/*    ),*/}
                          {/*    val3: <br />*/}
                          {/*  }}*/}
                          {/*/>*/}
                        </h7>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-1 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                    <div
                      style={{ border: '2px solid #cccccc' }}
                      className=" centered-icon-list__icon justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content flex Lpflexcolumn Lpflexrow"
                    >
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <LazyLoad>
                          <img
                            className="m-auto w-auto lazyloaded"
                            src={temp}
                          />

                          <div className="d-flex" style={{ height: 100 }}>
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={group}
                            />
                          </div>
                        </LazyLoad>
                      </div>
                      <div className="text-center">
                        <h7>
                          Beneft from exclusne subscription services and perks
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
