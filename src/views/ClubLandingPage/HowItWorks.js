import React from 'react';
import LazyLoad from 'react-lazyload';
import howitworck1 from './ClubImage/howit1.png';
import howitworck2 from './ClubImage/howIt2.png';
import howitworck3 from './ClubImage/howit3.png';
import howitworck4 from './ClubImage/howit4.png';
import how02 from './ClubImage/How02@2x.png';
import how04 from './ClubImage/How04@2x.png';
import workflowicon from './ClubImage/howitworkflow.png';
import { FormattedMessage, injectIntl } from 'react-intl';
import './index.css';

const HowItWorks = (props) => {
  const RU = process.env.REACT_APP_COUNTRY == 'RU';
  const TR = process.env.REACT_APP_COUNTRY == 'YR';
  const headerHeight =
    document.querySelector('.rc-header')?.offsetHeight || 150;
  return (
    <div
      style={{ position: 'relative' }}
      className="experience-component experience-layouts-1column how_it_work"
      id={props.id}
    >
      <div
        style={{ position: 'absolute', top: -headerHeight }}
        id="how-it-works-box-inner"
      ></div>
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-assets-contentBlock">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
              <br />
              <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
                <h3 className="rc-beta">
                  <FormattedMessage id="club.howitworks.title" />
                </h3>
              </div>
              <div
                style={{ display: 'flex' }}
                className="justify-content-between howitworks"
              >
                <div className="text-center">
                  <article>
                    <div className="rc-card__body textheight">
                      <p className="rc-card__meta club_subscription_intro_center">
                        <h5>
                          <FormattedMessage id="club.howitworks.img1.titile" />
                        </h5>
                      </p>
                    </div>
                    <LazyLoad height={180}>
                      <img
                        className="w-90 lazyloaded"
                        src={howitworck1}
                        alt={props.intl.formatMessage({
                          id: 'club.howitworks.alt1'
                        })}
                      />
                    </LazyLoad>
                    <div className="rc-card__body">
                      <p
                        className="rc-card__meta club_subscription_intro_center"
                        style={{ fontSize: '1rem' }}
                      >
                        <FormattedMessage id="club.howitworks.img1.description" />
                      </p>
                    </div>
                  </article>
                </div>
                <div
                  style={{
                    alignSelf: 'center',
                    marginLeft: '.625rem',
                    marginRight: '.625rem',
                    marginTop: '-1.5rem'
                  }}
                >
                  <article>
                    <img className="imagetransform" src={workflowicon} />
                  </article>
                </div>
                <div>
                  <article>
                    <div className="rc-card__body textheight">
                      <p className="rc-card__meta club_subscription_intro_center">
                        <h5>
                          <FormattedMessage id="club.howitworks.img2.titile" />
                        </h5>
                      </p>
                    </div>
                    {RU ? (
                      <LazyLoad height={180}>
                        <img
                          className="w-90 lazyloaded"
                          src={howitworck2}
                          alt={props.intl.formatMessage({
                            id: 'club.howitworks.alt2'
                          })}
                        />
                      </LazyLoad>
                    ) : TR ? (
                      <LazyLoad height={180}>
                        <img
                          className="w-90 lazyloaded"
                          src={how02}
                          alt={props.intl.formatMessage({
                            id: 'club.howitworks.alt2'
                          })}
                        />
                      </LazyLoad>
                    ) : (
                      <LazyLoad height={180}>
                        <img
                          className="w-90 lazyloaded"
                          src={howitworck2}
                          alt={props.intl.formatMessage({
                            id: 'club.howitworks.alt2'
                          })}
                        />
                      </LazyLoad>
                    )}
                    <div className="rc-card__body">
                      <p
                        className="rc-card__meta club_subscription_intro_center"
                        style={{ fontSize: '1rem' }}
                      >
                        <FormattedMessage id="club.howitworks.img2.description" />
                      </p>
                    </div>
                  </article>
                </div>
                <div
                  style={{
                    alignSelf: 'center',
                    marginLeft: '.625rem',
                    marginRight: '.625rem',
                    marginTop: '-1.5rem'
                  }}
                >
                  <article>
                    {' '}
                    <img className="imagetransform" src={workflowicon} />{' '}
                  </article>{' '}
                </div>
                <div>
                  <article>
                    <div className="rc-card__body textheight">
                      <p className="rc-card__meta club_subscription_intro_center">
                        <h5>
                          <FormattedMessage id="club.howitworks.img3.titile" />
                        </h5>
                      </p>
                    </div>
                    <LazyLoad height={180}>
                      <img
                        className="w-90 lazyloaded"
                        src={howitworck3}
                        alt={props.intl.formatMessage({
                          id: 'club.howitworks.alt3'
                        })}
                      />
                    </LazyLoad>
                    <div className="rc-card__body">
                      <p
                        className="rc-card__meta club_subscription_intro_center"
                        style={{ fontSize: '1rem' }}
                      >
                        <FormattedMessage id="club.howitworks.img3.description" />
                      </p>
                    </div>
                  </article>
                </div>
                <div
                  style={{
                    alignSelf: 'center',
                    marginLeft: '.625rem',
                    marginRight: '.625rem',
                    marginTop: '-1.5rem'
                  }}
                >
                  <article>
                    {' '}
                    <img className="imagetransform" src={workflowicon} />{' '}
                  </article>{' '}
                </div>
                <div>
                  <article>
                    <div className="rc-card__body textheight">
                      <p className="rc-card__meta club_subscription_intro_center">
                        <h5>
                          <FormattedMessage id="club.howitworks.img4.titile" />
                        </h5>
                      </p>
                    </div>
                    {RU ? (
                      <LazyLoad height={180}>
                        <img
                          className="w-90 lazyloaded"
                          src={howitworck4}
                          alt={props.intl.formatMessage({
                            id: 'club.howitworks.alt4'
                          })}
                        />
                      </LazyLoad>
                    ) : TR ? (
                      <LazyLoad height={180}>
                        <img
                          className="w-90 lazyloaded"
                          src={how04}
                          alt={props.intl.formatMessage({
                            id: 'club.howitworks.alt4'
                          })}
                        />
                      </LazyLoad>
                    ) : (
                      <LazyLoad height={180}>
                        <img
                          className="w-90 lazyloaded"
                          src={howitworck4}
                          alt={props.intl.formatMessage({
                            id: 'club.howitworks.alt4'
                          })}
                        />
                      </LazyLoad>
                    )}
                    <div className="rc-card__body">
                      <p
                        className="rc-card__meta club_subscription_intro_center"
                        style={{ fontSize: '1rem' }}
                        onClick={() => {
                          window.PetStoryWC.start();
                        }}
                      >
                        <FormattedMessage id="club.howitworks.img4.description" />
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(HowItWorks);
