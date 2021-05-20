import React from 'react';
import { FormattedMessage } from 'react-intl';
import Logo from '../../../../components/Logo';
import howitworknew1 from '../HowItWorksNew/image/howitworksnew1.png';
import LazyLoad from 'react-lazyload';
import logoad from './image/logoad.png';
import { Link } from 'react-router-dom';
import logoclubad from './image/CLUBLOGOSUBSCIPTION@4x.png';

const GetMoreAd = () => {
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-assets-contentBlock">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
              <div>
                <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                  <FormattedMessage id="club.subscription.titile" />
                </h4>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    height: '60vh',
                    boxShadow: ' 0vh 0vh 0.3vh 0.1vh #DCDCDE',
                    marginTop: '10vh'
                  }}
                >
                  <div
                    style={{
                      height: '20vh',
                      marginRight: '5vh'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        marginLeft: '10vh',
                        marginTop: '10vh'
                      }}
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
                        <p
                          style={{
                            fontSize: '28px',
                            marginBottom: '0',
                            fontWeight: 'bolder'
                          }}
                        >
                          SINGLE{' '}
                        </p>
                        <p style={{ fontSize: '28px', fontWeight: 'bolder' }}>
                          Purchase
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: '30vh' }}>
                    <div className="rc-column">
                      <div className="rc-padding-y--lg--mobile rc-full-width">
                        <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                          <li className="rc-list__item">
                            <em className="bingoWhite rc-margin-right--xs"></em>
                            <a style={{ marginLeft: '10px' }}>
                              Tailored nutrition
                            </a>
                          </li>
                          <li className="rc-list__item">
                            <em className="bingoWhite rc-margin-right--xs"></em>
                            <a style={{ marginLeft: '10px' }}>
                              Free shipping from $50
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    height: '80vh',
                    boxShadow: ' 0vh 0vh 0.3vh 0.1vh #ed001a'
                  }}
                >
                  <div
                    style={{
                      height: '20vh',
                      marginRight: '5vh'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        marginLeft: '25vh',
                        marginTop: '10vh'
                      }}
                    >
                      <div>
                        <LazyLoad>
                          <img
                            className="w-60 lazyloaded"
                            src={logoclubad}
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
                        <p
                          style={{
                            fontSize: '28px',
                            marginBottom: '0',
                            fontWeight: 'bolder',
                            color: '#E2001A'
                          }}
                        >
                          Club{' '}
                        </p>
                        <p
                          style={{
                            fontSize: '28px',
                            fontWeight: 'bolder',
                            color: '#E2001A'
                          }}
                        >
                          Subscription
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: '30vh', display: 'flex' }}>
                    <div className="rc-column">
                      <div className="rc-padding-y--lg--mobile rc-full-width">
                        <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                          <li className="rc-list__item">
                            <em className="bingoWhite rc-margin-right--xs"></em>
                            <a style={{ marginLeft: '10px' }}>
                              Tailored nutrition
                            </a>
                          </li>
                          <li className="rc-list__item">
                            <em className="bingoWhite rc-margin-right--xs"></em>
                            <a style={{ marginLeft: '10px' }}>
                              Free shipping from $50
                            </a>
                          </li>
                          <li className="rc-list__item">
                            <em className="bingoWhite rc-margin-right--xs"></em>
                            <a style={{ marginLeft: '10px' }}>
                              Tailored nutrition
                            </a>
                          </li>
                          <li className="rc-list__item">
                            <em className="bingoWhite rc-margin-right--xs"></em>
                            <a style={{ marginLeft: '10px' }}>
                              Free shipping from $50
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="rc-column">
                      <div className="rc-padding-y--lg--mobile rc-full-width">
                        <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                          <li className="rc-list__item">
                            <em className="bingoWhite rc-margin-right--xs"></em>
                            <a style={{ marginLeft: '10px' }}>
                              Tailored nutrition
                            </a>
                          </li>
                          <li className="rc-list__item">
                            <em className="bingoWhite rc-margin-right--xs"></em>
                            <a style={{ marginLeft: '10px' }}>
                              Free shipping from $50
                            </a>
                          </li>
                          <li className="rc-list__item">
                            <em className="bingoWhite rc-margin-right--xs"></em>
                            <a style={{ marginLeft: '10px' }}>
                              Free shipping from $50
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className=" rc-btn-group m-0 rc-column rc-padding-x--none">
                    <Link to="/">
                      <button
                        className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs"
                        style={{ marginLeft: '20vh' }}
                      >
                        Get started
                      </button>
                    </Link>
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

export default GetMoreAd;
