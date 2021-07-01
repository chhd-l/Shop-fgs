import React from 'react';
import LazyLoad from 'react-lazyload';
import logoad from './image/logoad.png';
import logoclubad from './image/CLUBLOGOSUBSCIPTION@4x.png';
import rulogo from '../../image/CLUB_logoRU@2x.png';
import './index.css';
import { FormattedMessage } from 'react-intl';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';

const GetMoreAd = () => {
  return (
    <>
      <div className="experience-component experience-layouts-1column">
        <div className="row rc-margin-x--none">
          <div className="rc-full-width">
            <div className="experience-component experience-assets-contentBlock">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                <div>
                  <h4
                    className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile"
                    style={{ fontWeight: '550' }}
                  >
                    <FormattedMessage id="ClubLP.GetMoreAd.title" />
                  </h4>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'center' }}
                  className="flexColumn"
                >
                  <div
                    style={{
                      boxShadow: ' 0vh 0vh 0.3vh 0.1vh #DCDCDE'
                    }}
                    className={`${
                      window.__.env.REACT_APP_COUNTRY == 'tr'
                        ? 'trwithsmall margintoppx'
                        : 'widthsmall margintoppx'
                    }`}
                  >
                    <div
                      style={{
                        marginRight: '5vh'
                      }}
                      className="margintop15vh"
                    >
                      <div
                        style={{
                          display: 'flex',
                          marginLeft: '5vw'
                        }}
                        className="margintop10vh margintop3vh"
                      >
                        <div>
                          <LazyLoad>
                            <img
                              className="w-60 lazyloaded"
                              src={logoad}
                              style={{ width: '100px' }}
                            />
                          </LazyLoad>
                        </div>
                        <div
                          style={{
                            marginLeft: '5vh',
                            transform: 'translateY(-10px)'
                          }}
                        >
                          <p style={{ fontSize: '28px', fontWeight: 'bolder' }}>
                            <FormattedMessage
                              id="ClubLP.GetMoreAd.subtitle1"
                              values={{ val: <br /> }}
                            />
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ height: '135px' }}>
                      <div className="rc-column">
                        <div className="rc-full-width">
                          <ul className="rc-list rc-list--blank rc-list--large-icon textmobile15vw text21vw">
                            <li className="rc-list__item flex">
                              <div>
                                <em className="bingoWhite rc-margin-right--xs"></em>
                              </div>
                              <div style={{ marginLeft: '10px' }}>
                                <a>
                                  <FormattedMessage id="ClubLP.GetMoreAd.Single.tip1" />
                                </a>
                              </div>
                            </li>
                            <li className="rc-list__item flex">
                              <div>
                                <em className="bingoWhite rc-margin-right--xs"></em>
                              </div>
                              <div style={{ marginLeft: '10px' }}>
                                <a>
                                  <FormattedMessage id="ClubLP.GetMoreAd.Single.tip2" />
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      boxShadow: ' 0vh 0vh 0.3vh 0.1vh #ed001a'
                    }}
                    className="getmore83vh"
                  >
                    <div>
                      <div
                        style={{
                          height: '15vh',
                          marginRight: '5vh'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            marginLeft: '10vw',
                            marginTop: '5vh'
                          }}
                        >
                          <div>
                            <LazyLoad>
                              {window.__.env.REACT_APP_COUNTRY == 'ru' ? (
                                <img
                                  className="w-60 lazyloaded"
                                  src={rulogo}
                                  style={{ width: '100px' }}
                                />
                              ) : (
                                <img
                                  className="w-60 lazyloaded"
                                  src={logoclubad}
                                  style={{ width: '100px' }}
                                />
                              )}
                            </LazyLoad>
                          </div>
                          <div
                            style={{
                              marginLeft: '5vh',
                              transform: 'translateY(-10px)'
                            }}
                          >
                            <p
                              style={{
                                fontSize: '28px',
                                fontWeight: 'bolder',
                                color: '#E2001A'
                              }}
                            >
                              <FormattedMessage
                                id="ClubLP.GetMoreAd.subtitle2"
                                values={{ val: <br /> }}
                              />
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="mobileflex getmore30vh "
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div className="rc-column" style={{ padding: '0' }}>
                          <div className=" rc-full-width ">
                            <ul className="rc-list rc-list--blank rc-list--large-icon text21vw textmobile15vw">
                              <li className="rc-list__item flex">
                                <div>
                                  <em className="bingo rc-margin-right--xs"></em>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                  <a>
                                    <FormattedMessage id="ClubLP.GetMoreAd.Club.tip1" />
                                  </a>
                                </div>
                              </li>
                              <li className="rc-list__item flex">
                                <div>
                                  <em className="bingo rc-margin-right--xs"></em>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                  <a>
                                    <FormattedMessage id="ClubLP.GetMoreAd.Club.tip2" />
                                  </a>
                                </div>
                              </li>
                              <li className="rc-list__item flex">
                                <div>
                                  <em className="bingo rc-margin-right--xs"></em>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                  <a>
                                    <FormattedMessage id="ClubLP.GetMoreAd.Club.tip3" />
                                  </a>
                                </div>
                              </li>
                              <li className="rc-list__item flex">
                                <div>
                                  <em className="bingo rc-margin-right--xs"></em>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                  <a>
                                    <FormattedMessage id="ClubLP.GetMoreAd.Club.tip4" />
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="rc-column" style={{ padding: '0' }}>
                          <div className=" rc-full-width ">
                            <ul className="rc-list rc-list--blank  rc-list--large-icon text21vw textmobile15vw rc-list--align">
                              <li className="rc-list__item flex">
                                <div>
                                  <em className="bingo rc-margin-right--xs"></em>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                  <a>
                                    <FormattedMessage id="ClubLP.GetMoreAd.Club.tip5" />
                                  </a>
                                </div>
                              </li>
                              <li className="rc-list__item flex">
                                <div>
                                  <em className="bingo rc-margin-right--xs"></em>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                  <a>
                                    <FormattedMessage id="ClubLP.GetMoreAd.Club.tip6" />
                                  </a>
                                </div>
                              </li>
                              <li className="rc-list__item flex">
                                <div>
                                  <em className="bingo rc-margin-right--xs"></em>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                  <a>
                                    <FormattedMessage id="ClubLP.GetMoreAd.Club.tip7" />
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div
                      className=" rc-btn-group m-0 rc-column rc-padding-x--none "
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <DistributeHubLinkOrATag
                        href={'/product-finder'}
                        ariaLabel="Links to product finder"
                      >
                        <button
                          className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs "
                          style={{ padding: '10px 90px' }}
                        >
                          <FormattedMessage id="ClubLP.GetMoreAd.button" />
                        </button>
                      </DistributeHubLinkOrATag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetMoreAd;
