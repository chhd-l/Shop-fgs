import React from 'react';
import callImgNew from './img/phoneicon@4x.png';
import emailImgNew from './img/emailicon@4x.png';
import faqImgNew from './img/FAQicon@4x.png';
import { FormattedMessage, injectIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';
import './index.css';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { Link } from 'react-router-dom';

const HelpComponentsNew = (props) => {
  const RU = process.env.REACT_APP_COUNTRY == 'RU';
  const TR = process.env.REACT_APP_COUNTRY == 'TR';
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-layouts-cardcarousel">
            <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                <div>
                  <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                    <FormattedMessage id="ClubLP.Help.title" />
                  </h4>
                </div>
                <p>
                  <span>
                    <FormattedMessage id="ClubLP.Help.subtitle1" />
                  </span>
                </p>
                <p>
                  <FormattedMessage id="ClubLP.Help.subtitle2" />
                </p>
                <div className="experience-component experience-layouts-1to2columnRatio">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className=" rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center text-md-left">
                      <div className="rc-padding--none flex justify-content-center margin-auto mobilehelp">
                        <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                          <div className="rc-border-all rc-border-colour--interface fullHeight">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                <div className="w-100">
                                  <b style={{ color: '#E2001A' }}>
                                    <FormattedMessage id="ClubLP.Help.call.title" />
                                  </b>
                                  <p>
                                    <FormattedMessage id="ClubLP.Help.call.content" />
                                  </p>
                                  <div className="rc-margin-top--xs">
                                    <p
                                      style={{ color: '#00BCA3' }}
                                      className="rc-numeric rc-md-up"
                                    >
                                      <a style={{ color: '#E2001A' }}>
                                        <FormattedMessage id="ClubLP.Help.call.number" />
                                      </a>
                                    </p>
                                  </div>
                                  <div className="rc-margin-top--xs">
                                    <p
                                      style={{ color: '#00BCA3' }}
                                      className="rc-alpha rc-border--none rc-md-down"
                                    >
                                      <FormattedMessage id="ClubLP.Help.call.mobile.number" />
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle">
                                <LazyLoad>
                                  <img
                                    className="align-self-center "
                                    style={{width:'25vw'}}
                                    src={callImgNew}
                                    alt={props.intl.formatMessage({
                                      id: 'club.wheretohelp.alt1'
                                    })}
                                    title="By telephone"
                                  />
                                </LazyLoad>
                              </div>
                            </div>
                          </div>
                        </article>
                        <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                          <div className="rc-border-all rc-border-colour--interface fullHeight">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                <div className="w-100 ">
                                  <b style={{ color: '#E2001A' }}>
                                    <FormattedMessage id="ClubLP.Help.email.title" />
                                  </b>
                                  <p>
                                    <FormattedMessage id="ClubLP.Help.email.content" />
                                  </p>
                                  {TR || RU ? (
                                    <DistributeHubLinkOrATag
                                      href={'/contact-us'}
                                      ariaLabel="Links to contact us"
                                    >
                                      <p
                                        style={{ textDecoration: 'underline' }}
                                      >
                                        <FormattedMessage id="ClubLP.Help.email.address" />
                                      </p>
                                    </DistributeHubLinkOrATag>
                                  ) : (
                                    <Link to="/help/contact">
                                      <p
                                        style={{ textDecoration: 'underline' }}
                                      >
                                        <FormattedMessage id="ClubLP.Help.email.title" />
                                      </p>
                                    </Link>
                                  )}
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle">
                                <LazyLoad>
                                  <img
                                    className="align-self-center "
                                    style={{width:'25vw'}}
                                    src={emailImgNew}
                                    alt={props.intl.formatMessage({
                                      id: 'club.wheretohelp.alt2'
                                    })}
                                    title="By telephone"
                                  />
                                </LazyLoad>
                              </div>
                            </div>
                          </div>
                        </article>
                        <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                          <div className="rc-border-all rc-border-colour--interface fullHeight">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                <div className="w-100">
                                  <p>
                                    <FormattedMessage id="ClubLP.Help.faq.content" />
                                  </p>

                                  <div className="rc-margin-top--xs">
                                    <p
                                      style={{ color: '#00BCA3' }}
                                      className="rc-numeric rc-md-up"
                                    >
                                      <a style={{ color: '#00BCA3' }}>
                                        {/* <FormattedMessage id="help.tel" /> */}
                                      </a>
                                    </p>
                                  </div>
                                  <div className="rc-margin-top--xs">
                                    <p
                                      style={{ color: '#00BCA3' }}
                                      className="rc-alpha rc-border--none rc-md-down"
                                    ></p>
                                  </div>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle">
                                <LazyLoad>
                                  <img
                                    className="align-self-center "
                                    style={{width:'25vw'}}
                                    src={faqImgNew}
                                    alt={props.intl.formatMessage({
                                      id: 'club.wheretohelp.alt3'
                                    })}
                                    title="By telephone"
                                  />
                                </LazyLoad>
                              </div>
                            </div>
                          </div>
                        </article>
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

export default injectIntl(HelpComponentsNew);
